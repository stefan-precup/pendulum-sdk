import { createHttpClient } from "@helixnetwork/http-client";

import { seed, transfers } from "@helixnetwork/samples";
import test from "ava";
import {
  INVALID_SECURITY_LEVEL,
  INVALID_SEED,
  INVALID_START_END_OPTIONS,
  INVALID_START_OPTION
} from "../../../errors";
import { createGetTransfers } from "../../src/createGetTransfers";
import "./nocks/findTransactions";
import "./nocks/getInclusionStates";
import "./nocks/getNodeInfo";
import "./nocks/getTransactionStrings";
import "./nocks/wereAddressesSpentFrom";

const getTransfers = createGetTransfers(createHttpClient(), "lib");

test("getTransfers() resolves to correct account data", async t => {
  t.deepEqual(
    transfers,
    await getTransfers(seed, { start: 0, inclusionStates: true }),
    "getTransfers() should resolve to correct account data"
  );
});

test("getTransfers() rejects with correct errors for invalid inputs", t => {
  const invalidSeed = "asdasDSFDAFD";
  const invalidStartEndOptions = {
    start: 10,
    end: 9
  };

  t.is(
    t.throws(() => getTransfers(invalidSeed, { start: 0 }), Error).message,
    `${INVALID_SEED}: ${invalidSeed}`,
    "getTransfers() should throw correct error for invalid seed"
  );

  t.is(
    t.throws(() => getTransfers(seed, { start: -1 }), Error).message,
    `${INVALID_START_OPTION}: ${-1}`,
    "getTransfers() should throw correct error for invalid start option"
  );

  t.is(
    t.throws(() => getTransfers(seed, invalidStartEndOptions), Error).message,
    `${INVALID_START_END_OPTIONS}: ${invalidStartEndOptions}`,
    "getTransfers() should throw correct error for invalid start & end options"
  );

  t.is(
    t.throws(() => getTransfers(seed, { start: 0, security: -1 }), Error)
      .message,
    `${INVALID_SECURITY_LEVEL}: ${-1}`,
    "getTransfers() should throw correct error for invalid security level"
  );
});

test.cb("getTransfers() invokes callback", t => {
  getTransfers(seed, { start: 0 }, t.end);
});

test.cb("getTransfers() passes correct arguments to callback", t => {
  getTransfers(seed, { start: 0, inclusionStates: true }, (err, res) => {
    t.is(
      null,
      err,
      "getTransfers() should pass null as first argument in callback for successuful requests"
    );

    t.deepEqual(
      transfers,
      res,
      "getTransfers() should pass the correct response as second argument in callback"
    );

    t.end();
  });
});
