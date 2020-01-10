# Statebox Commandline Tool

This is a (temporary) tool that is supposed to do various useful thingss.

- Encode & decode transactions
- Convert file formats
- Compute hashes
- ~~Communicate with the API~~
- ~~Create EC keypairs~~
- ~~Sign transactions & Verify signatures~~

## Installation

Can install tool locally or globally (`-g`) or run once using `npx`.

```
npm i stbx # install locally
npm i -g stbx # or install globally
npx stbx -V # or run once using npx
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

```
Usage: stbx-cli-convert [options]

Options:
  -V, --version            output the version number
  -i, --input [filename]   File to read input from
  -o, --output [filename]  File to write output to
  -F, --force              Force file overwrite
  -l, --list               List available pages (Petri nets) in PNPRO project file.
  -1, --one [name]         Extract single net by name.
  -a, --all                Extract all nets as a dictionary.
  -f, --format [format]    Specify output format: `nll` or `nbpt`.
  -h, --help               output usage information
```

The output format is specified with `--format` and is either either:

- `nbpt` ~ Nano-Bipartite Graph
- `nll` ~ Number List List

Usage:

```sh
# list all nets
stbx convert -i myProject.pnpro --list 

# pick one and output as NBPT
stbx convert -i myProject.pnpro --one "name" --format=nbpt
```

```
# convert all and write to `myProject.nets` as NLL
stbx convert -i myProject.pnpro --all -o myProject.nets
```

If you convert with `--all`, the output format is a JSON dictionary of either `nbpt` or `nll` object, indexed by page title.
