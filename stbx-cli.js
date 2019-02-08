#!/usr/bin/env node
var program = require('commander');

// provide title for the `ps` command
process.title = 'stbx'

program
    .version('0.0.1')
    .command('codec', 'encode and decode transactions')
    .command('hash', 'compute hash of hexadecimal input')
    .command('convert', 'convert PNPRO files to statebox Petri nets')
    //.command('keypair','work with keypairs')
    .parse(process.argv);

const fs = require('fs')
// const JSgn = require('json-signatures')

// const myMessage = { hello: "world, this is just an example" }

// const keypair = JSgn.keypair() // => {public, secret}
// JSgn.verify(signed) //=> true

// also
// signed.data === myMessage
// keypair.public === signed.signedBy.pubkey

const mkTimestamp = (d) => d
    .toISOString()
    .replace(/\d\d\..+$/, '')
    .replace(/\D/g, '');

// if (program.input) {
//     keypair = {
//         secret: fs.readFileSync(`${program.input}.secret`),
//         public: fs.readFileSync(`${program.input}.public`)
//     }
// }

// if (program.sign) {
//     const signed = JSgn.sign(keypair.secret, myMessage)  //=> {data, signature}
// }

// if (program.generate) {
//     console.log('generating keypair')

//     const fn = program.output || `key-${mkTimestamp(new Date())}`
//     const keypair = JSgn.keypair()
//     fs.writeFileSync(`${fn}.public`, keypair.public, { encoding: 'utf8' })
//     console.log(`stored public key in ${fn}.public`)
//     fs.writeFileSync(`${fn}.secret`, keypair.secret, { encoding: 'utf8' })
//     console.log(`stored secret key in ${fn}.secret`)
// }
