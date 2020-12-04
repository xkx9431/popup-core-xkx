// @flow

import { distanceAndSkiddingToXY } from './offset';
const createRectMock =  ({ width, height, x, y }) => ({
    width,
    height,
    x,
    y,
});

const reference = createRectMock({
    width: 0,
    height: 0,
    x: 0,
    y: 0,
});

const popper = createRectMock({
    width: 0,
    height: 0,
    x: 0,
    y: 0,
});

['top', 'right', 'bottom', 'left'].forEach(placement => {
    it(placement, () => {
    expect( // @ts-ignore
        distanceAndSkiddingToXY( placement, { reference, popper }, () => [10, 20])
    ).toMatchSnapshot();
    });
});
