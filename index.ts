export class EmptyVectorError extends Error {
  constructor() {
    super("EmptyVectorError::the vectors being compared cannot be empty.");
  }
}

export class InvalidParameterType extends Error {
  constructor() {
    super("InvalidParameterType::the parameters must be arrays of numbers.");
  }
}

export class InvalidVectorTypeError extends Error {
  constructor() {
    super(
      "NotNumberVectorError::the vectors being compared must contain only numbers.",
    );
  }
}

export class MissingVectorError extends Error {
  constructor() {
    super("MissingVectorError::the vectors being compared must be provided.");
  }
}

export class ZeroVectorError extends Error {
  constructor() {
    super("ZeroVectorError::the vectors being compared cannot be all zeros.");
  }
}

export const cosineSimilarity = (a: number[], b: number[]) => {
  let product_sum = 0;
  let norm_sum_a = 0;
  let norm_sum_b = 0;

  if (!a || !b) {
    throw new MissingVectorError();
  }

  if (!Array.isArray(a) || !Array.isArray(b)) {
    throw new InvalidParameterType();
  }

  if (!a.length || !b.length) {
    throw new EmptyVectorError();
  }

  const max_len = Math.max(a.length, b.length);

  // the vector that is smaller is effectively padded with 0s
  for (let i = 0; i < max_len; i++) {
    let a_val = a[i] || 0;
    let b_val = b[i] || 0;

    if (typeof a_val !== "number" || typeof b_val !== "number") {
      throw new InvalidVectorTypeError();
    }

    product_sum += a_val * b_val;

    if (i < a.length) {
      norm_sum_a += a[i] * a[i];
    }

    if (i < b.length) {
      norm_sum_b += b[i] * b[i];
    }
  }

  if (!norm_sum_a || !norm_sum_b) {
    throw new ZeroVectorError();
  }

  return product_sum / (Math.sqrt(norm_sum_a) * Math.sqrt(norm_sum_b));
};
