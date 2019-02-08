#!/usr/bin/env node
const {program, exit_error, exit_success, get_input_json, get_input, put_output } = require("./util.js")

program
    .option('-l, --list', 'List available Petri nets in PNPRO file')
    .option('-n, --net [name]', 'Extract one net')
    .option('-d, --all', 'Extract all nets to a list of objects')
    .option('-f, --format', 'Specify output format: nll or nbpt')
    .parse(process.argv);

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

async function main () {
    if(program.all && program.name) {
        exit_error('must pass either --all or --name, not both')    
    }

    if(program.list && program.all) {
        exit_error('must pass either --list or --name/--all, not both')    
    }

    // run encoding
    if(program.list) {
        let pnproFile = await get_input()
        // let output = encode_or_fail(parsed)
        put_output('lol')
        exit_success()
    }
}

main()
