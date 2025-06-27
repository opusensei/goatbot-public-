const axios = require("axios");

module.exports = {
  config: {
    name: "4k",
    aliases: ["4k", "remini"],
    version: "1.0",
    author: "Rasin",
    usePrefix: false,
    countDown: 5,
    role: 0,
    shortDescription: {
      vi: "",
      en: "Enhance your images"
    },
    longDescription: {
      vi: "",
      en: "Use this command to upscale images to 4K resolution, simply reply to an image message."
    },
    category: "4k",
    guide: {
      en: "{pn} reply to an image to enhance it."
    }
  },

  onStart: async function ({ api, event, args }) {
    if (!event.messageReply || !event.messageReply.attachments || !event.messageReply.attachments[0]) {
      return api.sendMessage("𝐏𝐥𝐞𝐚𝐬𝐞 𝐫𝐞𝐩𝐥𝐲 𝐭𝐨 𝐚𝐧 𝐢𝐦𝐚𝐠𝐞!", event.threadID, event.messageID);
    }

    const imageUrl = event.messageReply.attachments[0].url;

    const apiUrl = `https://rasin-x-apis.onrender.com/api/rasin/upscale?url=${encodeURIComponent(imageUrl)}`;

    try {
      const imageStream = await axios.get(apiUrl, { responseType: 'stream' });

      api.sendMessage({
        body: "✅ 𝐇𝐞𝐫𝐞 𝐢𝐬 𝐲𝐨𝐮𝐫 4𝐊 𝐩𝐡𝐨𝐭𝐨",
        attachment: imageStream.data
      }, event.threadID, event.messageID);
    } catch (error) {
      console.error("Error processing the image:", error);
      return api.sendMessage(`❌ | An error occurred: ${error.message}`, event.threadID, event.messageID);
    }
  }
};
