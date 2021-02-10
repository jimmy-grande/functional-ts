type Sleep = (duration: number) => Promise<void>;
export const sleep: Sleep = (duration) => new Promise((resolve) => setTimeout(resolve, duration));

type Chunk = <T>(size: number) => (array: T[]) => Array<T[]>;
export const chunk: Chunk = (size) => (arr) => {
  const results = [];
  for (let i = 0, j = arr.length; i < j; i += size) {
    results.push(arr.slice(i, i + size));
  }
  return results;
};
