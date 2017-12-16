const { expect } = require('chai');
const { readFileSync } = require('fs');
const parsePdb = require('../index');

describe('parsePdb', () => {
  let pdb;

  describe('when given 3AID', () => {
    beforeEach(() => {
      pdb = readFileSync('./dat/3aid.pdb', 'utf8');
    });

    it('does it', () => {
      const parsed = parsePdb(pdb);
      expect(typeof parsed).to.equal('object');
    });
  });
});
