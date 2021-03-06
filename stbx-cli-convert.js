#!/usr/bin/env node
let R = require('ramda')
let {program, exit_error, exit_success, get_input_json, get_input, put_output } = require("./util.js")
let parse = require("@statebox/pnpro.js")

let help = () => console.log(`
Examples:
        
    # Convert all Petri nets in a GreatSPN project:    
    stbx convert -i project.pnpro --all --format nbpt -o project.nets.json

    # Extract single petrinet net
    stbx convert -i project.pnpro --one "testNet" --format nll
`)

program
    .on('--help', help)
    .option('-l, --list', 'List available pages (Petri nets) in PNPRO project file')
    .option('--one [name]', 'Extract single net by name')
    .option('--all', 'Extract all nets as a dictionary')
    .option('-f, --format [format]', 'Specify output format: `nll` or `nbpt` (default)', 'nbpt')
    .parse(process.argv);

function list_available(project) {
    for(let net of project.nets) {
        console.log(`- "${net.name}"`)
    }
}

async function main () {
    if(program.all && program.one) {
        exit_error('must pass either --all or --one, not both')    
    }

    if(program.list && program.all) {
        exit_error('must pass either --list or --all, not both')    
    }

    if(program.list && program.one) {
        exit_error('must pass either --list or --one, not both')    
    }
    
    // lets read the input and parse the file
    let pnproFile = await get_input()
    let project = parse(pnproFile)

    if(program.list) {
        list_available(project);
        exit_success()
    }

    // let converter =  R.toLower(program.format) === "nll" ? to_nll : to_nbpt

    if(program.one) {
        exit_error(`Lol, just kidding, exporting single net is not supported`)
    }
    
    if(program.all) {
        put_output(JSON.stringify(project))
    }
}

main()
