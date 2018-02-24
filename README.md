# parse-pdb
A simple utility for parsing PDB files into an easily useable JSON format that handles atoms ,residues, and chains.

## Getting Started

  npm install --save parse-pdb

```
const parsePdb = require('parse-pdb');
const { readFileSync } = require('fs');

const pdbString = readFileSync('./3aid.pdb', 'utf8');

const parsed = parsePdb(pdbString);

console.log(parsed.atoms);
/*
[ { serial: 1,
    name: 'N',
    altLoc: '',
    resName: 'PRO',
    chainID: 'A',
    resSeq: 1,
    iCode: '',
    x: -2.555,
    y: 9.253,
    z: 34.411,
    occupancy: 1,
    tempFactor: 30.6,
    element: 'N',
    charge: '' },
  ...1845 others
]
*/
```

## JSON Format
The output json is an object containing arrays of each structure keyed on record name, according to the [pdb spec](http://www.wwpdb.org/documentation/file-format-content/format33/sect9.html).

```
  atoms:
    serial: integer
    name: string
    altLoc: string
    resName: string
    chainID: string
    resSeq: integer
    iCode: string
    x: float
    y: float
    z: float
    occupancy: float
    tempFactor: float
    element: string
    charge: string
  seqRes:
    serNum: integer
    chainID: string
    numRes: integer
    resNames: array of strings
  residues:
    id: integer (count)
    serNum: integer
    chainID: string
    resName: string
    atoms: array of atoms
  chains: Map
    key: chainID
    value:
      id: integer (count)
      chainID: string
      residues: array of residues
```

## License
MIT.  See LICENSE file.
