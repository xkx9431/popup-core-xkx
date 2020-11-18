import getAltAxis   from './getAltAxis';
import { altAxis } from '../enums'

it('gets alternative axis', () => {
    expect(getAltAxis( altAxis.x )).toBe( altAxis.y );
    expect(getAltAxis( altAxis.y )).toBe( altAxis.x );
});