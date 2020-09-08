import { Client, ChatUserstate } from "tmi.js";
import { wsServer } from "./websocket";
import { testConfig } from "../testConfig";

import { CHANNELS } from "./env";

interface Connection {
  secure: boolean;
  reconnect: boolean;
  server?: string;
}

let connection: Connection = {
  secure: true,
  reconnect: true,
};

if (testConfig.connectToFdgt) {
  connection = {
    ...connection,
    server: "irc.fdgt.dev",
  };
}

export const tmi = new (Client as any)({
  options: { debug: process.env.NODE_ENV === "development" ? true : false },
  connection,
  identity: {
    username: process.env.BOT_NAME,
    password: process.env.BOT_AUTH,
  },
  channels: CHANNELS,
});
