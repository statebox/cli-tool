# Statebox Commandline Tool

This is a (temporary) tool that is supposed to do various useful thingss.

- [x] Encode & decode transactions
- ~~[ ] Compute hashes~~
- ~~[ ] Create EC keypairs~~
- ~~[ ] Sign transactions~~
- ~~[ ] Verify signatures~~
- ~~[ ] Communicate with the API~~

## Installation

TODO ~~Just `npm i -g @statebox/stbx-cli`~~

## Usage

```sh
$ echo '{"previous":"deadc0de","firing":{"execution":"beefbabe","path":[0]}}' > file
$ cat file | node stbx-cli-codec.js --encode
0a04deadc0de12080a04beefbabe1000
```

```sh
$ echo "0a04deadc0de12080a04beefbabe1000" | node stbx-cli-codec.js --decode
{"previous":"deadc0de","firing":{"execution":"beefbabe","path":[0]}}
```

also `node stbx-cli.js --help`

```
Usage: stbx-cli [options] [command]

Options:
  -V, --version  output the version number
  -h, --help     output usage information

Commands:
  codec          work with transactions
  help [cmd]     display help for [cmd]
```