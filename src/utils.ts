type Sleep = (duration: Readonly<number>) => Promise<void>;
export const sleep: Sleep = (duration) => new Promise((resolve) => setTimeout(resolve, duration));
