#!/usr/bin/env node
let program = require('commander')

// provide title for the `ps` command
process.title = 'stbx'

program
    .version('0.0.1')
    .command('codec', 'encode and decode transactions')
    .command('hash', 'compute hash of hexadecimal input')
    .command('convert', 'convert PNPRO files to statebox Petri nets')
    .command('serve', 'start webserver')
    //.command('crypto','work with keypairs')
    .parse(process.argv);