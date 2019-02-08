# Statebox Commandline Tool

This is a (temporary) tool that is supposed to do various useful thingss.

- Encode & decode transactions
- ~~Compute hashes~~
- ~~Create EC keypairs~~
- ~~Sign transactions~~
- ~~Verify signatures~~
- ~~Communicate with the API~~

## Installation

```
npm i -g @statebox/stbx-cli
```

## Usage

See  `node stbx-cli.js --help`

```
Usage: stbx-cli [options] [command]

Options:
  -V, --version  output the version number
  -h, --help     output usage information

Commands:
  codec          work with transactions
  help [cmd]     display help for [cmd]
```

### `codec`: Transaction Encoding & Decoding

When you type `stbx codec --help` you get this:

```
Usage: stbx-codec [options]

Options:
  -V, --version            output the version number
  -e, --encode             Encode message
  -d, --decode             Decode message
  -i, --input [filename]   File to read data from
  -o, --output [filename]  File to write transaction to
  -f, --force              Force file overwrite
  -h, --help               output usage information
```

Examples:

```sh
$ echo '{"previous":"deadc0de","firing":{"execution":"beefbabe","path":[0]}}' > file
$ cat file | stbx codec --encode
0a04deadc0de12080a04beefbabe1000
```

```sh
$ echo "0a04deadc0de12080a04beefbabe1000" | stbx codec --decode
{"previous":"deadc0de","firing":{"execution":"beefbabe","path":[0]}}
```

```sh
echo 0a04deadbeef1a420a2b0a0161100010011000100110001002100010021000100310001003100010001a01781a01791a017a1a0177120f0a017a10011801180222017322017418001800 | stbx codec --decode
{"nets":[{"name":"a","partition":[0,1,0,1,0,2,0,2,0,3,0,3,0,0],"names":["x","y","z","w"]}],"diagrams":[{"name":"z","width":1,"pixels":[1,2],"names":["s","t"]}],"labels":[0,0]}
```

### `hash`: Compute Hashes

Computes hashes, pass a hexadecimal string via stdin or using a file (with `-i`).

```sh
$ echo 'feedc0de' | stbx hash                                     fafec8b68b40c948930d7e4f7263a1b8e9bbd543ec37d0f7b3403b6fd6066737fb75b56ac43290b9d8c1191882fc2f0c055eb06f6155c4a462c4f61d71b92e7e
```

### `convert`: Conversion from GreatSPN

Convert PNPRO to statebox petrinet representation.

The output format is specified with `--format` and is either either:

- `nbpt` ~ Nano-Bipartite Graph
- `nll` ~ Number List List

Usage:

```sh
# list all nets
stbx convert -i myProject.pnpro --list 

# pick one and output as NBPT
stbx convert -i myProject.pnpro --net "name" --format=nbpt
```

```
# convert all and write to `myProject.nets`
stbx convert -i myProject.pnpro --all -o myProject.nets
```



If you convert with `--all`, the output format is a JSON list of either `nbpt` or `nll` object.
