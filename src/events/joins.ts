import { tmi } from "../tmi";
import WebSocketServer from "../WebSocketServer";
import { Packet, TwitchEvent } from "../data/types";
import { config } from "../config";

const sendSpecialUserJoinEvent = async (username: string) => {
  try {
    const specialUserJoin: Packet = {
      broadcaster: config.broadcaster.name,
      event: TwitchEvent.specialUserJoin,
      id: username + "-" + Date.now(),
      data: {
        username: username,
      },
    };

    WebSocketServer.sendData(specialUserJoin);
  } catch (error) {
    console.log(error);
  }
};

tmi.on("join", async (channel: string, username: string, self: boolean) => {
  if (config.specialUsers.includes(username)) {
    sendSpecialUserJoinEvent(username);
  }
});
