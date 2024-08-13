import { FirstNamePipe } from './first-name.pipe';

describe('FirstNamePipe', () => {
  let pipe: FirstNamePipe;

  beforeEach(() => {
    pipe = new FirstNamePipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should transform "John Doe" to "John"', () => {
    expect(pipe.transform('John Doe')).toBe('John');
  });

  it('should transform "Alice Bob Carol" to "Alice"', () => {
    expect(pipe.transform('Alice Bob Carol')).toBe('Alice');
  });

  it('should transform "Single" to "Single"', () => {
    expect(pipe.transform('Single')).toBe('Single');
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

  it('should transform " multiple  spaces " to "multiple"', () => {
    expect(pipe.transform(' multiple  spaces ')).toBe('multiple');
  });
});
