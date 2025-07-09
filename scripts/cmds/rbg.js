const axios = require("axios");
const { shorten } = require('tinyurl');
const baseApiUrl = async () => {
  const base = await axios.get(
    `https://raw.githubusercontent.com/Mostakim0978/D1PT0/refs/heads/main/baseApiUrl.json`
  );
  return base.data.api;
};

(async () => {
  global.apis = {
    diptoApi: await baseApiUrl()
  };
})();

module.exports = {
config: {
name: "removebg",
aliases: ["rbg"],
version: "1.0",
role: 0,
author: "opu", // khing Aryan and Aiyan mahi fan
category: "UTILITY",
cooldowns: 5,
countDown: 5,
guide: {
en: "removebg reply with a image"
}
},
onStart: async ({ api, event }) => {
try {
if (event.messageReply && event.messageReply.attachments[0]?.url) {
const imageUrl = event.messageReply.attachments[0].url;
const response = await axios.get(`${global.apis.diptoApi}/rmbg?url=${await shorten(imageUrl)}`, { responseType: 'stream' });
api.sendMessage({
attachment: response.data
}, event.threadID, event.messageID);
} else {
api.sendMessage("Please reply to an image to remove its background.", event.threadID);
}
} catch (e) {
api.sendMessage("An error occurred while processing the command.", event.threadID);
}
}
};
