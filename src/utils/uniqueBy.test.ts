import uniqueBy from './uniqueBy';

test( "check result value", () => {
    const a = { name: 'a' };
    const b = { name: 'b' };
    const c = { name: 'c' };
    const d = { name: 'd' };

    const items = [a, b, c, a, a, d, c, c, d, b];

    expect(uniqueBy(items, ({ name }) => name)).toEqual([a, b, c, d]);
});
