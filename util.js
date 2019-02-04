#!/usr/bin/env node
const fs = require('fs')

// setup basic options `ioFV`
const program = require('commander')
    .version('0.1.0')
    .option('-i, --input [filename]', 'File to read data from')
    .option('-o, --output [filename]', 'File to write transaction to')
    .option('-F, --force', 'Force file overwrite')

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
        return fs.readFileSync(fn)
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

// function encode_or_fail(obj) {
//     try {
//         console.log(JSON.stringify(obj.wiring))
//         const Stbx = require("@statebox/stbx-js")
//         if (!obj.wiring && !obj.firing) {
//             exit_error('tx must have .firing or .wiring property')
//         } else {
//             console.log(obj)
//             let e = Stbx.encode(obj)
//             if (e.trim() === "") {
//                 exit_error('something went wrong encoding, returned empty string!')
//             } else {
//                 return Buffer.from(e, 'hex')
//             }
//         }
//     } catch(e) {
//         exit_error(`failed to encode, ${e.message}`)
//     }
// }

// function decode_or_fail(buf) {
//     try {
//         const Stbx = require("@statebox/stbx-js")
//         return Stbx.decode(buf.toString('hex'))
//     } catch(e) {
//         exit_error(`failed to decode, ${e.message}`)
//     }
// }

// async function main () {
//     if(program.encode && program.decode) {
//         exit_error('must pass either --encode or --decode, not both')    
//     }
//     // get input
//     let input = await get_input()

//     if(input.toString('utf8').trim() === "") {
//         exit_error('You must pass non empty input')
//     }

//     // run encoding
//     if(program.encode) {
//         let parsed = parse_json_or_fail(input)
//         let output = encode_or_fail(parsed)
//         put_output(output.toString('hex'))
//         process.exit(0)
//     }

//     if(program.decode) {
//         let buf = Buffer.from(input.toString('utf8'), 'hex')
//         let obj = decode_or_fail(buf)
//         put_output(JSON.stringify(obj))
//         process.exit(0)
//     }
// }

// main()
