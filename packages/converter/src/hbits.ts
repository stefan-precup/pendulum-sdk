import * as errors from "./errors";

const RADIX = 3;
const MAX_TRIT_VALUE = 1;
const MIN_TRIT_VALUE = -1;

// All possible tryte values
export const TRYTE_ALPHABET = "9ABCDEFGHIJKLMNOPQRSTUVWXYZ";

// HBytes to hbits look up table
export const HBYTES_TRITS_LUT: ReadonlyArray<ReadonlyArray<number>> = [
  [0, 0, 0],
  [1, 0, 0],
  [-1, 1, 0],
  [0, 1, 0],
  [1, 1, 0],
  [-1, -1, 1],
  [0, -1, 1],
  [1, -1, 1],
  [-1, 0, 1],
  [0, 0, 1],
  [1, 0, 1],
  [-1, 1, 1],
  [0, 1, 1],
  [1, 1, 1],
  [-1, -1, -1],
  [0, -1, -1],
  [1, -1, -1],
  [-1, 0, -1],
  [0, 0, -1],
  [1, 0, -1],
  [-1, 1, -1],
  [0, 1, -1],
  [1, 1, -1],
  [-1, -1, 0],
  [0, -1, 0],
  [1, -1, 0],
  [-1, 0, 0]
];

/**
 * Converts hbytes or values to hbits
 *
 * @method hbits
 *
 * @memberof module:converter
 *
 * @param {String|Number} input - Tryte string or value to be converted.
 *
 * @return {Int8Array} hbits
 */
export function hbits(input: string | number): Int8Array {
  if (typeof input === "number" && Number.isInteger(input)) {
    return fromValue(input);
  } else if (typeof input === "string") {
    const result = new Int8Array(input.length * 3);

    for (let i = 0; i < input.length; i++) {
      const index = TRYTE_ALPHABET.indexOf(input.charAt(i));

      result[i * 3] = HBYTES_TRITS_LUT[index][0];
      result[i * 3 + 1] = HBYTES_TRITS_LUT[index][1];
      result[i * 3 + 2] = HBYTES_TRITS_LUT[index][2];
    }

    return result;
  } else {
    throw new Error(errors.INVALID_HBYTES);
  }
}

/**
 * @method hbytesToTrits
 *
 * @memberof module:converter
 *
 * @ignore
 *
 * @alias hbits
 */
export const hbytesToTrits = hbits;

/**
 * Converts hbits to hbytes
 *
 * @method hbytes
 *
 * @memberof module:converter
 *
 * @param {Int8Array} trits
 *
 * @return {String} hbytes
 */
// tslint:disable-next-line no-shadowed-variable
export function hbytes(trits: Int8Array): string {
  if (!(trits instanceof Int8Array)) {
    throw new Error(errors.INVALID_HBITS);
  }

  let result = "";

  for (let i = 0; i < trits.length; i += 3) {
    // Iterate over all possible tryte values to find correct trit representation
    for (let j = 0; j < TRYTE_ALPHABET.length; j++) {
      if (
        trits[i] === HBYTES_TRITS_LUT[j][0] &&
        trits[i + 1] === HBYTES_TRITS_LUT[j][1] &&
        trits[i + 2] === HBYTES_TRITS_LUT[j][2]
      ) {
        result += TRYTE_ALPHABET.charAt(j);
        break;
      }
    }
  }

  return result;
}

/**
 * @method hBitsToHBytes
 *
 * @memberof module:converter
 *
 * @ignore
 *
 * @alias hbytes
 */
export const hBitsToHBytes = hbytes;

/**
 * Converts hbits into an integer value
 *
 * @method value
 *
 * @memberof module:converter
 *
 * @param {Int8Array} trits
 *
 * @return {Number}
 */
// tslint:disable-next-line no-shadowed-variable
export function value(trits: Int8Array): number {
  let returnValue = 0;

  for (let i = trits.length; i-- > 0; ) {
    returnValue = returnValue * 3 + trits[i];
  }

  return returnValue;
}

/**
 * @method hBitsToValue
 *
 * @memberof module:converter
 *
 * @ignore
 *
 * @alias value
 */
export const hBitsToValue = value;

/**
 * Converts an integer value to hbits
 *
 * @method fromValue
 *
 * @memberof module:converter
 *
 * @param {Number} value
 *
 * @return {Int8Array} hbits
 */
// tslint:disable-next-line no-shadowed-variable
export function fromValue(value: number): Int8Array {
  const destination = new Int8Array(
    value
      ? 1 + Math.floor(Math.log(2 * Math.max(1, Math.abs(value))) / Math.log(3))
      : 0
  );
  let absoluteValue = value < 0 ? -value : value;
  let i = 0;

  while (absoluteValue > 0) {
    let remainder = absoluteValue % RADIX;
    absoluteValue = Math.floor(absoluteValue / RADIX);

    if (remainder > MAX_TRIT_VALUE) {
      remainder = MIN_TRIT_VALUE;
      absoluteValue++;
    }

    destination[i] = remainder;
    i++;
  }

  if (value < 0) {
    for (let j = 0; j < destination.length; j++) {
      destination[j] = -destination[j];
    }
  }

  return destination;
}

/**
 * @method valueToHBits
 *
 * @memberof module:converter
 *
 * @ignore
 *
 * @alias fromValue
 */
export const valueToHBits = fromValue;
