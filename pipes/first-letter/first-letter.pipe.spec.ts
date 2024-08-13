import { FirstLetterPipe } from './first-letter.pipe';

describe('FirstLetterPipe', () => {
  let pipe: FirstLetterPipe;

  beforeEach(() => {
    pipe = new FirstLetterPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should transform "John Doe" to "JD"', () => {
    expect(pipe.transform('John Doe')).toBe('JD');
  });

  it('should transform "Alice Bob Carol" to "AB"', () => {
    expect(pipe.transform('Alice Bob Carol')).toBe('AB');
  });

  it('should transform "Single" to "S"', () => {
    expect(pipe.transform('Single')).toBe('S');
  });

  it('should return empty string for empty input', () => {
    expect(pipe.transform('')).toBe('');
  });

  it('should return null for null input', () => {
    expect(pipe.transform(null)).toBe(null);
  });

  it('should return undefined for undefined input', () => {
    expect(pipe.transform(undefined)).toBe(undefined);
  });

  it('should transform " multiple  spaces " to "ms"', () => {
    expect(pipe.transform(' multiple  spaces ')).toBe('ms');
  });
});
