#!/usr/bin/env node
const {program, exit_error, exit_success, get_input_json, get_input, put_output, put_output_json} = require("./util.js")

const Z = require('zenschnorr')

let help = () => console.log(`
Examples:

    stbx crypto --keypair -o wires.keypair
    stbx crypto --sign feedc0de -i wires.keypair -o feedc0de-wires.signature
    stbx crypto --verify -i feedc0de-wires.signature
`)

program
    .on('--help', help)
    .option('--sign [message]', 'Signing a message with public key')
    .option('--keypair', 'Create a keypair')
    .option('--verify', 'Verify a signature')
    .parse(process.argv);

async function main () {
    if (program.keypair) {
        let keypair = await Z.keypair()
        put_output_json(keypair)
    }
    if (program.sign) {
        let message = program.sign
        let keypair = await get_input_json()
        let signature = await Z.sign(keypair, message)
        let pubkey = keypair.public
        put_output_json({...signature, pubkey, message})
    }
    if (program.verify) {
        let {R,s,pubkey,message} = await get_input_json()
        let isValid = await Z.verify({s,R}, pubkey, message)
        put_output_json({signatureValid: isValid})
    }
    exit_success()
}

main()