#!/usr/bin/env node
const {program, exit_error, exit_success, get_input_json, get_input, put_output } = require("./util.js")
const Stbx = require("@statebox/stbx-js")

program
    .parse(process.argv);

async function main () {
    let inputHex = (await get_input()).toString().trim()
    put_output(Stbx.hash(inputHex))
    exit_success()
}

main()