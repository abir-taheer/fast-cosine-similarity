import computeCosineSimilarity from "compute-cosine-similarity";
import { cosineSimilarity as fastCosineSimilarity } from "fast-cosine-similarity";

const num_dimensions = 3072;
const haystack_size = 50_000;

const generateVector = (dimensions: number) =>
  Array.from(Array(dimensions), () => Math.random());

// array of vectors to search
const haystack = Array.from(Array(haystack_size), () =>
  generateVector(num_dimensions),
);

// the query vector
const needle = generateVector(num_dimensions);

// Test the compute-cosine-similarity library
const ccs_start = process.hrtime.bigint();
const ccs_similarities = haystack.map((vector) =>
  computeCosineSimilarity(needle, vector),
);
const ccs_end = process.hrtime.bigint();
const ccs_duration = Number(ccs_end - ccs_start) / 10e6;

// Test the fast-cosine-similarity library
const fcs_start = process.hrtime.bigint();
const fcs_similarities = haystack.map((vector) =>
  fastCosineSimilarity(needle, vector),
);
const fcs_end = process.hrtime.bigint();
const fcs_duration = Number(fcs_end - fcs_start) / 10e6;

// Ensure they're both the same values
// We have a threshold because the packages calculate the math in different orders and so the values are susceptible to floating point imprecision
const equality_delta_threshold = 10e-12;
const all_values_are_within_threshold = ccs_similarities.every(
  (ccs_val, i) =>
    Math.abs(fcs_similarities[i] - ccs_val) < equality_delta_threshold,
);

console.log("All calculations match: \t", all_values_are_within_threshold);
console.log("compute-cosine-similarity: \t", ccs_duration, "ms");
console.log("fast-cosine-similarity: \t", fcs_duration, "ms");
