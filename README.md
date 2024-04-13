# fast-cosine-similarity

Compute the cosine-similarity of two vectors.
Super simple and fast implementation.

* Up to 6x faster than the `compute-cosine-similarity` package from simple testing of 40k vectors to a query vector. 
* Full typescript support. 
* Incredibly small package size.
* No external dependencies

## Installation
npm:
```bash
npm install fast-cosine-similarity
```

yarn:
```bash
yarn add fast-cosine-similarity
```
    

## How to use
```typescript
import { cosineSimilarity } from "fast-cosine-similarity";

const vector1 = [0.2, 0.5, 0.4, 0.1, 0.7];
const vector2 = [0.1, 0.6, 0.3, 0.2, 0.8];

const similarity = cosineSimilarity(vector1, vector2);
```


## Important things to know
* Will not work if any of the vectors are zero vectors (regardless of length).
* Different length vectors are supported. The shorter vector will be padded with zeros.
* All elements of the vectors must be numbers.
* The vectors must not be empty.

## Errors

The following errors might be thrown when using the package:
All error classes are exported from the package.

### EmptyVectorError
Thrown when one of the vectors is empty.

### InvalidVectorTypeError
Thrown when any of the vectors contains elements that are not numbers. All elements of both arrays must be numbers.

### MissingVectorError
Thrown when one of the vectors parameters is falsy (null, undefined). Both parameters must be arrays of numbers.

### InvalidParameterType
Thrown when either of the parameters is not an array. Both parameters must be arrays of numbers.

### ZeroVectorError
Thrown when one of the vectors is a zero vector. All the elements of a vector must not be zero.

