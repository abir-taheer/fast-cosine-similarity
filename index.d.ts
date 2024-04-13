export declare class EmptyVectorError extends Error {
  constructor();
}
export declare class InvalidVectorTypeError extends Error {
  constructor();
}
export declare class MissingVectorError extends Error {
  constructor();
}
export declare class ZeroVectorError extends Error {
  constructor();
}

export declare const cosineSimilarity: (a: number[], b: number[]) => number;
