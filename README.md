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

### Encoding / decoding

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