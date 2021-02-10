/* eslint-disable @typescript-eslint/ban-types */
/*
    Definition: 
    1. A pipe is a set of functions that is executed from left to right
    2. Each input of a function is the output of the previous function except for the first function
    3. The arguments of the first function is the one from the HOC function (e.g: pipe(...functions)(...initialArguments))
*/
type Pipe = <K extends Function[], V>(...fns: K) => (...args: any[]) => V;
export const pipe: Pipe = (...fns) => (initalInput) =>
  fns.reduce((args, fn) => (args['then'] ? args['then'](fn) : fn(args)), initalInput);
