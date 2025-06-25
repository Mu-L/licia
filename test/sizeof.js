const isBrowser = util.isBrowser;
const isNode = util.isNode;

it('basic', () => {
    expect(sizeof('a')).to.equal(2);
    expect(sizeof(8)).to.equal(8);
    expect(sizeof(false)).to.equal(4);
    expect(sizeof(function() {})).to.equal(0);
    expect(sizeof({ a: 'b' })).to.equal(4);
});

it('circular', () => {
    const a = { b: 'c' };
    a.d = a;
    expect(sizeof(a)).to.equal(6);
});

it('big object', () => {
    this.timeout(5000);
    if (isBrowser) {
        expect(sizeof(location)).to.be.above(0);
    } else if (isNode) {
        expect(sizeof(process)).to.be.above(0);
    }
});

if (isNode) {
    it('buffer', () => {
        expect(sizeof(Buffer.alloc(10))).to.equal(10);
    });
}
