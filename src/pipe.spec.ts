import { pipe } from './pipe';

describe('Execute a set of synchronous functions', () => {
  it('should call each function from left to right', () => {
    // Arrange
    const now = Date.now();
    const initalInput = 'test';
    type Str2Str = (str: string) => string;
    const str2Str: Str2Str = (str) => `str2Str::${str}`;
    const spy1 = jest.fn(str2Str);

    type Str2Number = (str: string) => number;
    const str2Number: Str2Number = (str) => parseInt(str, 10) || now;
    const spy2 = jest.fn(str2Number);

    type Number2Date = (timestamp: number) => Date;
    const number2Date: Number2Date = (timestamp) => {
      try {
        return new Date(timestamp);
      } catch (error) {
        return new Date();
      }
    };
    const spy3 = jest.fn(number2Date);

    // Act
    type SimplePipe = [Str2Str, Str2Number, Number2Date];
    pipe<SimplePipe, Date>(spy1, spy2, spy3)(initalInput);

    // Assert
    expect(spy1.mock.invocationCallOrder[0]).toBeLessThan(spy2.mock.invocationCallOrder[0]);
    expect(spy1.mock.invocationCallOrder[0]).toBeLessThan(spy3.mock.invocationCallOrder[0]);
    expect(spy2.mock.invocationCallOrder[0]).toBeLessThan(spy3.mock.invocationCallOrder[0]);
  });

  it('should call each function with the previous output', () => {
    // Arrange
    const now = Date.now();
    const initalInput = 'test';

    type Str2Str = (str: string) => string;
    const str2Str: Str2Str = (str) => `str2Str::${str}`;
    const output1 = str2Str(initalInput);
    const spy1 = jest.fn(str2Str);

    type Str2Number = (str: string) => number;
    const str2Number: Str2Number = (str) => parseInt(str, 10) || now;
    const output2 = str2Number(output1);
    const spy2 = jest.fn(str2Number);

    type Number2Date = (timestamp: number) => Date;
    const number2Date: Number2Date = (timestamp) => {
      try {
        return new Date(timestamp);
      } catch (error) {
        return new Date();
      }
    };
    const spy3 = jest.fn(number2Date);

    // Act
    type SimplePipe = [Str2Str, Str2Number, Number2Date];
    pipe<SimplePipe, Date>(spy1, spy2, spy3)(initalInput);

    // Assert
    expect(spy1).toHaveBeenCalledWith(initalInput);
    expect(spy2).toHaveBeenCalledWith(output1);
    expect(spy3).toHaveBeenCalledWith(output2);
  });

  it('should generate the same output for last function and pipe result', () => {
    // Arrange
    const now = Date.now();
    const initalInput = 'test';

    type Str2Str = (str: string) => string;
    const str2Str: Str2Str = (str) => `str2Str::${str}`;
    const output1 = str2Str(initalInput);

    type Str2Number = (str: string) => number;
    const str2Number: Str2Number = (str) => parseInt(str, 10) || now;
    const output2 = str2Number(output1);

    type Number2Date = (timestamp: number) => Date;
    const number2Date: Number2Date = (timestamp) => {
      try {
        return new Date(timestamp);
      } catch (error) {
        return new Date();
      }
    };
    const output3 = number2Date(output2);

    // Act
    type SimplePipe = [Str2Str, Str2Number, Number2Date];
    const date = pipe<SimplePipe, Date>(str2Str, str2Number, number2Date)(initalInput);

    // Assert
    expect(date).toBeInstanceOf(Date);
    expect(date).toEqual(output3);
  });
});

describe('Execute a set of asynchronous functions', () => {
  it('should handle asynchrous function', async () => {
    // Arrange
    const initalInput = 'test';

    type AsyncStr2Str = (str: string) => Promise<string>;
    const asyncStr2Str: AsyncStr2Str = async (str) => `str2Str::${str}`;
    const output1 = asyncStr2Str(initalInput);
    const spy1 = jest.fn(asyncStr2Str);

    type Str2Object = (str: string) => { str: string };
    const str2Object: Str2Object = (str) => ({ str });
    const output2 = str2Object(await output1);
    const spy2 = jest.fn(str2Object);

    // Act
    type AsyncPipe = [AsyncStr2Str, Str2Object];
    const result = pipe<AsyncPipe, Date>(spy1, spy2)(initalInput);

    // Assert
    expect(output1).toBeInstanceOf(Promise);
    expect(output2).not.toBeInstanceOf(Promise);
    expect(result).toBeInstanceOf(Promise);
    expect(output2).toEqual(await result);
  });
});
