# fast-cosine-similarity

Compute the cosine-similarity of two vectors.
Super simple and fast implementation.

* Up to 3x faster than the `compute-cosine-similarity` package from simple testing of 40k vectors to a query vector. 
* Full typescript support. 
* Incredibly small package size.
* No external dependencies

## Installation
### npm
```bash
npm install fast-cosine-similarity
```

### yarn
```bash
yarn add fast-cosine-similarity
```
    

## How to use
### ES6
```typescript
import { cosineSimilarity } from "fast-cosine-similarity";

const vector1 = [0.2, 0.5, 0.4, 0.1, 0.7];
const vector2 = [0.1, 0.6, 0.3, 0.2, 0.8];

const similarity = cosineSimilarity(vector1, vector2);
```

### CommonJS
```typescript
const { cosineSimilarity } = require("fast-cosine-similarity");

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


## Testing speed
When benchmarking it to the `compute-cosine-similarity` library, the following code was used:

```typescript
import computeCosineSimilarity from "compute-cosine-similarity";
import { cosineSimilarity as fastCosineSimilarity } from "fast-cosine-similarity";

const num_dimensions = 3072;
const haystack_size = 50_000;

const generateVector = (dimensions) =>
  Array.from(Array(dimensions), () => Math.random());

// array of vectors to search
const haystack = Array.from(Array(haystack_size), () =>
  generateVector(num_dimensions)
);

// the query vector
const needle = generateVector(num_dimensions);

// Test the compute-cosine-similarity library
const ccs_start = process.hrtime.bigint();
const ccs_similarities = haystack.map((vector) =>
  computeCosineSimilarity(needle, vector)
);
const ccs_end = process.hrtime.bigint();
const ccs_duration = Number(ccs_end - ccs_start) / 10e6;

// Test the fast-cosine-similarity library
const fcs_start = process.hrtime.bigint();
const fcs_similarities = haystack.map((vector) =>
  fastCosineSimilarity(needle, vector)
);
const fcs_end = process.hrtime.bigint();
const fcs_duration = Number(fcs_end - fcs_start) / 10e6;

// Ensure they're both the same values
// We have a threshold because the packages calculate the math in different orders and so the values are susceptible to floating point imprecision
const equality_delta_threshold = 10e-12;
const all_values_are_within_threshold = ccs_similarities.every(
  (ccs_val, i) =>
    Math.abs(fcs_similarities[i] - ccs_val) < equality_delta_threshold
);

console.log(
  "All calculated values are the same: ",
  all_values_are_within_threshold
);

console.log("compute-cosine-similarity: ", ccs_duration, "ms");
console.log("fast-cosine-similarity", fcs_duration, "ms");
```

### Output:
```
All calculations match:          true
compute-cosine-similarity:       37.46855 ms
fast-cosine-similarity:          13.7506125 ms
```
