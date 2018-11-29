import * as nock from "nock";
import {
  GetBalancesCommand,
  GetBalancesResponse,
  ProtocolCommand
} from "../../../../types";
import headers from "./headers";

export const getBalancesCommand: GetBalancesCommand = {
  command: ProtocolCommand.GET_BALANCES,
  addresses: [
    "0219c68a8de8a82504832a8d17d64466453689dae9bbc21affe5f25efa3202c90e",
    "025dac12f2de9f9ea7848a0ede74657b24ecdf966505dae2a6bbe410c08a69bd14",
    "03dbff15092f382870dfdb21b5e3e9077ce5e43be8bff82dbd575c6eb5237f664c"
  ],
  threshold: 100
};

const getBalancesResponse: GetBalancesResponse = {
  balances: ["3", "4", "10"],
  milestone: "f".repeat(2 * 32),
  milestoneIndex: 1,
  duration: 10
};

nock("http://localhost:14265", headers)
  .persist()
  .post("/", {
    command: ProtocolCommand.WERE_ADDRESSES_SPENT_FROM,
    addresses: [
      "0219c68a8de8a82504832a8d17d64466453689dae9bbc21affe5f25efa3202c90e"
    ]
  })
  .reply(200, {
    states: [true]
  });

nock("http://localhost:14265", headers)
  .persist()
  .post("/", {
    command: ProtocolCommand.WERE_ADDRESSES_SPENT_FROM,
    addresses: [
      "025dac12f2de9f9ea7848a0ede74657b24ecdf966505dae2a6bbe410c08a69bd14"
    ]
  })
  .reply(200, {
    states: [false]
  });

nock("http://localhost:14265", headers)
  .persist()
  .post("/", {
    command: ProtocolCommand.WERE_ADDRESSES_SPENT_FROM,
    addresses: [
      "03dbff15092f382870dfdb21b5e3e9077ce5e43be8bff82dbd575c6eb5237f664c"
    ]
  })
  .reply(200, {
    states: [false]
  });

nock("http://localhost:14265", headers)
  .persist()
  .post("/", getBalancesCommand)
  .reply(200, getBalancesResponse);

nock("http://localhost:14265", headers)
  .persist()
  .post("/", {
    command: ProtocolCommand.FIND_TRANSACTIONS,
    addresses: [
      "025dac12f2de9f9ea7848a0ede74657b24ecdf966505dae2a6bbe410c08a69bd14"
    ]
  })
  .reply(200, {
    hashes: ["a".repeat(2 * 32)]
  });

nock("http://localhost:14265", headers)
  .persist()
  .post("/", {
    command: ProtocolCommand.FIND_TRANSACTIONS,
    addresses: [
      "03dbff15092f382870dfdb21b5e3e9077ce5e43be8bff82dbd575c6eb5237f664c"
    ]
  })
  .reply(200, {
    hashes: []
  });
