const { expect } = require('chai');
const { readFileSync } = require('fs');
const parsePdb = require('../index');

describe('parsePdb', () => {
  let pdb;

  describe('when given 3AID', () => {
    beforeEach(() => {
      pdb = readFileSync('./dat/3aid.pdb', 'utf8');
    });

    it('reads the right number of atoms and reads the first atom correctly', () => {
      const { atoms } = parsePdb(pdb);
      const firstAtom = atoms[0];

      expect(atoms).to.have.lengthOf(1846);
      expect(firstAtom).to.have.property('serial', 1);
      expect(firstAtom).to.have.property('name', 'N');
      expect(firstAtom).to.have.property('altLoc', '');
      expect(firstAtom).to.have.property('resName', 'PRO');
      expect(firstAtom).to.have.property('chainID', 'A');
      expect(firstAtom).to.have.property('resSeq', 1);
      expect(firstAtom).to.have.property('iCode', '');
      expect(firstAtom).to.have.property('x', -2.555);
      expect(firstAtom).to.have.property('y', 9.253);
      expect(firstAtom).to.have.property('z', 34.411);
      expect(firstAtom).to.have.property('occupancy', 1.0);
      expect(firstAtom).to.have.property('tempFactor', 30.6);
      expect(firstAtom).to.have.property('element', 'N');
      expect(firstAtom).to.have.property('charge', '');
    });

    it('reads seqRes correctly', () => {
      const { seqRes } = parsePdb(pdb);
      const firstSeqRes = seqRes[0];

      expect(seqRes).to.have.lengthOf(16);
      expect(firstSeqRes).to.have.property('serNum', 1);
      expect(firstSeqRes).to.have.property('chainID', 'A');
      expect(firstSeqRes).to.have.property('numRes', 99);
      expect(firstSeqRes.resNames).to.have.length(13);
      expect(firstSeqRes.resNames[0]).to.equal('PRO');
    });

    it('reads residues correctly', () => {
      const { residues } = parsePdb(pdb);
      const firstResidue = residues[0];

      expect(residues).to.have.lengthOf(198);
      expect(firstResidue).to.have.property('id', 0);
      expect(firstResidue).to.have.property('serNum', 1);
      expect(firstResidue).to.have.property('chainID', 'A');
      expect(firstResidue).to.have.property('resName', 'PRO');
      expect(firstResidue).to.have.property('atoms');
      expect(firstResidue.atoms).to.have.lengthOf(9);
      expect(firstResidue.atoms[0]).to.have.property('resSeq', 1);
      expect(firstResidue.atoms[0]).to.have.property('chainID', 'A');
      expect(firstResidue.atoms[0]).to.have.property('resName', 'PRO');
    });

    it('reads chains correctly', () => {
      const { chains } = parsePdb(pdb);
      const chainA = chains.get('A');

      expect(chains).to.have.property('size', 2);
      expect(chainA).to.have.property('id', 0);
      expect(chainA).to.have.property('chainID', 'A');
      expect(chainA).to.have.property('residues');
      expect(chainA.residues).to.have.lengthOf(99);
      expect(chainA.residues[0]).to.have.property('id', 0);
    });
  });
});
