#!/usr/bin/env node
let program = require('commander')

// load package.json to get version
let path = require('path')
let packageJson = require(path.join(__dirname, 'package.json'))

// provide title for the `ps` command
process.title = 'stbx'


program
    .version(packageJson.version)
    .command('codec', 'encode and decode transactions')
    .command('hash', 'compute hash of hexadecimal input')
    .command('convert', 'convert PNPRO files to statebox Petri nets')
    .command('discrete-wiring', 'create wiring transactions')
    .command('contract-api', 'create API wrapper for contract')
    // .command('serve', 'start webserver')
    //.command('crypto','work with keypairs')
    .parse(process.argv);