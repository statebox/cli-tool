#!/usr/bin/env node
let fs = require('fs')

// setup basic options `ioFV`
const program = require('commander')
    .option('-i, --input [filename]', 'File to read input from')
    .option('-o, --output [filename]', 'File to write output to')
    .option('--force', 'Force file overwrite')

function exit_error(msg) {
    console.error(msg);
    process.exit(1);
}

function exit_success() {
    process.exit(0);
}

function parse_json_or_fail (buf) {
    try {
        return JSON.parse(buf.toString('utf8'))
    } catch (e) {
        exit_error(`filed to parse JSON input: ${e.message}`)
    }
}

// only load non-empty input
async function get_input () {
    let rawInput = await get_raw_input()
    if(rawInput.toString('utf8').trim() === "") {
        exit_error('You must pass non empty input')
    }
    return rawInput
}

// reads the input from STDIN or file
async function get_raw_input () {
    // read from input file
    let fn = program.input
    if (fn) {
        if (!fs.existsSync(fn)) {
            exit_error(`input file "${fn}" does not exist`)
        }
        // TODO check directory?
        return fs.readFileSync(fn, {encoding: 'utf-8'})
    } else {
        // read from standard input
        return require("get-stdin").buffer()
    }
}

// read the input as JSON
async function get_input_json () {
    let input = await get_input()
    let obj = parse_json_or_fail(input)
    return obj
}


async function put_output (out) {
    let fn = program.output
    if (fn) {
        if (fs.existsSync(fn) && !program.force) {
            exit_error(`output file "${fn}" already exists`)
        }
        return fs.writeFileSync(fn, out)
    } else {
        // write to standard output
        console.log(out)
    }
}

module.exports = { program, exit_error, exit_success, get_input, get_input_json, put_output }