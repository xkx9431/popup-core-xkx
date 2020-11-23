// @flow
import getWindowScroll from './getWindowScroll';

it('returns the scrollTop and scrollLeft of the window', () => {
    // scrollBy
    //@ts-ignore
    window.pageXOffset = 100;
    //@ts-ignore
    window.pageYOffset = 200;
    const element = document.createElement('div');
    window.document.documentElement.appendChild(element);

    expect(getWindowScroll(element)).toMatchSnapshot();
});
