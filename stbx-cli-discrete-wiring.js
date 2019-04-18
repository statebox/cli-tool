#!/usr/bin/env node
const {program, exit_error, exit_success, get_input_json, put_output } = require("./util.js")
const Stbx = require("@statebox/stbx-js")
let R = require('ramda')

let help = () => console.log(`
Examples:

    # create a dictionary of nbpt nets
    stbx convert -i project.pnpro --all --format nbpt -o project.nets.json

    # create wiring transactions for specific root
    stbx discrete-wiring -i project.nets.json --message guts-test-1 --o
`)

program
    .on('--help', help)
    .option('--message [ascii]', 'Set root message')
    .parse(process.argv);

async function main () {
    let nets = (await get_input_json())
    let wiring = makeDiscreteWiring(program.message, nets)
    let tx = Stbx.encode(wiring)
    put_output(tx)
    exit_success()
}



function makeRootTx(rootMessage) {
    let message = Buffer.from(rootMessage, 'ascii').toString('hex')
    let tx = Stbx.encode({root: {message}})
    let hash = Stbx.hash(tx)
    return {tx,hash}
}

function discreteWiring(componentNets) {
    let pairs = R.toPairs(componentNets)
    let name = 'main'
    let width = R.length(pairs)
    let pixels = R.range(1, width + 1)
    let names = R.map(n => n[0], pairs)
    let nets = R.map(n => n[1], pairs)
    let labels = R.range(0, width)
    let diagrams = [{
        name,
        width,
        pixels,
        names
    }]
    return {
        wiring: {
            nets,
            diagrams,
            labels
        }
    }
}

function makeDiscreteWiring(rootMessage, nets) {
    let root = makeRootTx('guts-test')
    let wiring = R.assoc('previous', root.hash, discreteWiring(nets));
    return wiring
}

// console.log(JSON.stringify(wiring))

main()

// stbx convert -i project.pnpro --all --format nbpt -o project.nets.json
