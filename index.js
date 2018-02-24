const ATOM_NAME = 'ATOM  ';
const RESIDUE_NAME = 'SEQRES';

/**
 * Parses the given PDB string into json
 * @param {String} pdb
 * @returns {Object}
 */
module.exports = function parsePdb(pdb) {
  const pdbLines = pdb.split('\n');
  const atoms = [];
  const seqRes = []; // raw SEQRES entry data
  let residues = []; // individual residue data parsed from SEQRES
  const chains = new Map(); // individual rchaindata parsed from SEQRES

  // Iterate each line looking for atoms
  pdbLines.forEach((pdbLine) => {
    if (pdbLine.substr(0, 6) === ATOM_NAME) {
      // http://www.wwpdb.org/documentation/file-format-content/format33/sect9.html#ATOM
      atoms.push({
        serial: parseInt(pdbLine.substring(6, 11)),
        name: pdbLine.substring(12, 16).trim(),
        altLoc: pdbLine.substring(16, 17).trim(),
        resName: pdbLine.substring(17, 20).trim(),
        chainID: pdbLine.substring(21, 22).trim(),
        resSeq: parseInt(pdbLine.substring(22, 26)),
        iCode: pdbLine.substring(26, 27).trim(),
        x: parseFloat(pdbLine.substring(30, 38)),
        y: parseFloat(pdbLine.substring(38, 46)),
        z: parseFloat(pdbLine.substring(46, 54)),
        occupancy: parseFloat(pdbLine.substring(54, 60)),
        tempFactor: parseFloat(pdbLine.substring(60, 66)),
        element: pdbLine.substring(76, 78).trim(),
        charge: pdbLine.substring(78, 80).trim(),
      });
    } else if (pdbLine.substr(0, 6) === RESIDUE_NAME) {
      // http://www.wwpdb.org/documentation/file-format-content/format33/sect3.html#SEQRES
      const seqResEntry = {
        serNum: parseInt(pdbLine.substring(7, 10)),
        chainID: pdbLine.substring(11, 12).trim(),
        numRes: parseInt(pdbLine.substring(13, 17)),
        resNames: pdbLine.substring(19, 70).trim().split(' '),
      };
      seqRes.push(seqResEntry);

      residues = residues.concat(seqResEntry.resNames.map(resName => ({
        id: residues.length,
        serNum: seqResEntry.serNum,
        chainID: seqResEntry.chainID,
        resName,
      })));

      if (!chains.get(seqResEntry.chainID)) {
        chains.set(seqResEntry.chainID, {
          id: chains.size,
          chainID: seqResEntry.chainID,
          // No need to save numRes, can just do chain.residues.length
        });
      }
    }
  });

  // Add residues to chains
  chains.forEach((chain) => {
    chain.residues = residues.filter((residue) =>
      residue.chainID === chain.chainID,
    );
  });

  // Add atoms to residues
  residues.forEach((residue) => {
    residue.atoms = atoms.filter((atom) =>
      atom.chainID === residue.chainID && atom.resSeq === residue.serNum,
    );
  });

  return {
    // Raw data from pdb
    atoms,
    seqRes,
    // Derived
    residues, // Array of residue objects
    chains, // Map of chain objects keyed on chainID
  };
}
