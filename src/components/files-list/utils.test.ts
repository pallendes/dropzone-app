import {getSizeText} from './utils';

describe('utils', () => {
  it('should return the expected size text', () => {
    const zeroBytes = getSizeText(0);
    const bytesText = getSizeText(1);
    const kbText = getSizeText(1024);
    const mbText = getSizeText(1024 * 1024);
    const gbText = getSizeText(1024 * 1024 * 1024);

    expect(zeroBytes).toBe('0 Bytes');
    expect(bytesText).toBe('1 Bytes');
    expect(kbText).toBe('1 KB');
    expect(mbText).toBe('1 MB');
    expect(gbText).toBe('1 GB');
  });
});
