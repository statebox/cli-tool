#!/usr/bin/env node
const {program, exit_error, exit_success, get_input_json, get_input, put_output } = require("./util.js")

let help = () => console.log(`
Examples:

    # Encoding a transition firing:
    echo '{"firing":{"execution":"aabbeeff","path":[0]},"previous":"00aaff22"}' > tx.json
    cat tx.json | stbx codec -e -o tx.hex
    
    # Decoding a hexadecimally encoded transaction back to JSON:
    stbx codec -d -i tx.hex
`)

program
    .on('--help', help)
    .option('-e, --encode', 'Encode message')
    .option('-d, --decode', 'Decode message')
    .parse(process.argv);

function encode_or_fail(obj) {
    try {
        console.log(JSON.stringify(obj.wiring))
        const Stbx = require("@statebox/stbx-js")
        if (!obj.wiring && !obj.firing) {
            exit_error('tx must have .firing or .wiring property')
        } else {
            console.log(obj)
            let e = Stbx.encode(obj)
            if (e.trim() === "") {
                exit_error('something went wrong encoding, returned empty string!')
            } else {
                return Buffer.from(e, 'hex')
            }
        }
    } catch(e) {
        exit_error(`failed to encode, ${e.message}`)
    }
}

function decode_or_fail(buf) {
    try {
        const Stbx = require("@statebox/stbx-js")
        return Stbx.decode(buf.toString('hex'))
    } catch(e) {
        exit_error(`failed to decode, ${e.message}`)
    }
}

async function main () {
    if(program.encode && program.decode) {
        exit_error('must pass either --encode or --decode, not both')    
    }

    // run encoding
    if(program.encode) {
        let parsed = await get_input_json()
        let output = encode_or_fail(parsed)
        put_output(output.toString('hex'))
        exit_success()
    }

    if(program.decode) {
        let input = await get_input()
        let buf = Buffer.from(input.toString('utf8'), 'hex')
        let obj = decode_or_fail(buf)
        put_output(JSON.stringify(obj))
        exit_success()
    }
}

main()
