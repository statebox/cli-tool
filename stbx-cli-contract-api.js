#!/usr/bin/env node
const {program, exit_error, exit_success, get_input_json, get_input, put_output } = require("./util.js")
const Stbx = require("@statebox/stbx-js")
let api = require("js-stbx-cloud-client")()

let help = () => console.log(`
Example:

    # Generate python API wrapper for contract
    echo zFsGM27zGaC8zxbyThtV9vwZYDTNT2t3F3o3VQHv5cKNB | stbx contract-api --lang python --output api.py
`)

program
    .on('--help', help)
    .parse(process.argv);

async function main () {
    let inputHash = (await get_input()).toString().trim()
    put_output(`
    hash: ${inputHash}
    python code:
      def lel():
         pass
    `)
    exit_success()
}


async function getLightProtocol(hash) {
    let tx = await api.get(hash)
    
    if  (tx.status !== "ok") {
        throw new Error("failed to get protocol", tx)
    }
    let t = tx.decoded.wiring
    if (!tx.decoded.wiring) {
        throw new Error("not a light protocol", tx)
    }

    let s = new Stbx(t)

    // // unique condition where we have just one petrinet
    // // TODO this is a temporary workaround, until we have support for full generality with labels
    // let isSingleton = (
    //     (t.diagrams.length == 1) &&
    //     (t.diagrams[0].pixels.length == 1) &&
    //     (t.diagrams[0].width == 1) &&
    //     (t.nets.length == 1)
    // )

    // TODO need to hack in the pass through
    // let net = tx.decoded.wiring.nets[0]
    return s
}

main()