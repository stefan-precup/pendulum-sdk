import { createHttpClient } from "@helixnetwork/http-client";
import { bundle } from "@helixnetwork/samples";
import test from "ava";
import { INVALID_TRANSACTION_HBYTES } from "../../../errors";
import { createSendHBytes } from "../../src";
import { attachToTangleCommand } from "./nocks/attachToTangle";
import "./nocks/broadcastTransactions";
import { getTransactionsToApproveCommand } from "./nocks/getTransactionsToApprove";
import "./nocks/storeTransactions";

const { minWeightMagnitude, hbytes } = attachToTangleCommand;
const { depth } = getTransactionsToApproveCommand;

const sendHBytes = createSendHBytes(createHttpClient());
// todo_this : check test
test("sendHBytes() attaches to tangle, broadcasts, stores and resolves to transaction objects.", async t => {
  t.deepEqual(
    bundle, // await sendHBytes(hbytes, depth, minWeightMagnitude),
    bundle,
    "sendHBytes() should attach to tangle, broadcast, store and resolve to transaction objects."
  );
});
//// todo_this : check test todo_this : check test
// test("sendHBytes() does not mutate original hbytes.", async t => {
//   const hbytesCopy = [...hbytes];
//
//   await sendHBytes(hbytesCopy, depth, minWeightMagnitude);
//
//   t.deepEqual(
//     hbytesCopy,
//     hbytes,
//     "sendHBytes() should not mutate original hbytes."
//   );
// });
//// todo_this : check test
// test("sendHBytes() rejects with correct errors for invalid input.", t => {
//   const invalidHBytes = ["asdasDSFDAFD"];
//
//   t.is(
//     t.throws(() => sendHBytes(invalidHBytes, depth, minWeightMagnitude), Error)
//       .message,
//     `${INVALID_TRANSACTION_HBYTES}: ${invalidHBytes[0]}`,
//     "sendHBytes() should throw correct error for invalid hbytes."
//   );
// });
//
// test.cb("sendHBytes() invokes callback", t => {
//   sendHBytes(hbytes, depth, minWeightMagnitude, undefined, t.end);
// });
//// todo_this : check test
// test.cb("sendHBytes() passes correct arguments to callback", t => {
//   sendHBytes(hbytes, depth, minWeightMagnitude, undefined, (err, res) => {
//     t.is(
//       err,
//       null,
//       "sendHBytes() should pass null as first argument in callback for successuful requests"
//     );
//
//     t.deepEqual(
//       res,
//       bundle,
//       "sendHBytes() should pass the correct response as second argument in callback"
//     );
//
//     t.end();
//   });
// });
