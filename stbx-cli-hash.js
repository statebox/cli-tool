#!/usr/bin/env node
const {program, exit_error, exit_success, get_input_json, get_input, put_output } = require("./util.js")
const Stbx = require("@statebox/stbx-js")

let help = () => console.log(`
Examples:

    # Computing a hash from a hexadecimally encoded buffer
    echo "c0dec0dec0de" | stbx hash

    # Read data from file, containg a *hex string*!
    stbx hash --input tx.hex
`)

program
    .on('--help', help)
    .parse(process.argv);

async function main () {
    let inputHex = (await get_input()).toString().trim()
    put_output(Stbx.hash(inputHex))
    exit_success()
}

main()