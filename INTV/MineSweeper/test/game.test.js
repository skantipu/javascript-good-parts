const ms = Minesweeper.test;
ms.initState(10, 10, 4);
describe('minesweeper game with 10 rows and 10 columns, square positions from 1 to 100', function () {
  it('clamp() should clamp result to a defined range with min (0) and max', () => {
    chai.expect(ms.clamp(22, 2)).to.equal(1);
    chai.expect(ms.clamp(-4, 2)).to.equal(0);
    chai.expect(ms.clamp(5, 10)).to.equal(5);
  });
  it('getPosition() should get position based on row and column index', () => {
    chai.expect(ms.getPosition(1, 1)).to.equal(12);
    chai.expect(ms.getPosition(9, 1)).to.equal(92);
  });
  it('getX() should return row index value based on position (1 to (sizeX * sizeY)) of the square', () => {
    chai.expect(ms.getX(1)).to.equal(0);
    chai.expect(ms.getX(11)).to.equal(1);
    chai.expect(ms.getX(100)).to.equal(9);
  });
  it('getY() should return column index value based on position (1 to (sizeX * sizeY)) of the square', () => {
    chai.expect(ms.getY(1)).to.equal(0);
    chai.expect(ms.getY(11)).to.equal(0);
    chai.expect(ms.getY(100)).to.equal(9);
  });
  it('getAdjacents() should return list of all my neighbor node positions', () => {
    chai.expect(ms.getAdjacents(1)).to.be.an('array');
    chai.expect(ms.getAdjacents(1)).to.have.members([2, 11, 12]);
    chai.expect(ms.getAdjacents(1)).to.have.lengthOf(3);

    chai.expect(ms.getAdjacents(12)).to.be.an('array');
    chai.expect(ms.getAdjacents(12)).to.have.members([1, 2, 3, 11, 13, 21, 22, 23]);
    chai.expect(ms.getAdjacents(12)).to.have.lengthOf(8);
  });
  it('getRandom() generates a unique random number between 1 and 100', () => {
    ms.setMines();
    chai.expect(ms.getRandom()).to.be.within(1, 10 * 10);
    chai.expect(ms.getRandom()).to.be.within(1, 10 * 10);
    chai.expect(ms.getRandom()).to.be.within(1, 10 * 10);
  });
});