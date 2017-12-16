const ATOM_NAME = 'ATOM  ';

/**
 * Parses the given PDB string into json
 * @param {String} pdb
 * @returns {Object}
 */
module.exports = function parsePdb(pdb) {
  const pdbLines = pdb.split('\n');
  const atoms = [];

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
    }
  });

  return {
    atoms,
  };
}
