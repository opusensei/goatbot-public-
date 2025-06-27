const DIG = require("discord-image-generation");
const fs = require("fs-extra");

module.exports = {
  config: {
    name: "lesbu",
    aliases: ["lesbu"],
    version: "2.0",
    author: "Rasin",
    countDown: 3,
    role: 0,
    shortDescription: "Find out who's gay",
    longDescription: "empty()",
    category: "fun",
    guide: "{pn} [reply | mention | uid"
  },

  onStart: async function ({ event, message, usersData, args, api }) {
    try {
      const input = args.join(" ");
      let uid = null;

      if (event.type === "message_reply") {
        uid = event.messageReply.senderID;
      } else if (event.mentions && Object.keys(event.mentions).length > 0) {
        uid = Object.keys(event.mentions)[0];
      } else if (/^\d+$/.test(input)) {
        uid = input;
      } else if (input.includes("facebook.com")) {
        try {
          const res = await api.getUID(input);
          if (!res) throw new Error("Invalid Facebook link.");
          uid = res;
        } catch (err) {
          console.error(" Error resolving Facebook link:", err);
          return message.reply(" Couldn't find the user from the Facebook link. Try using a UID instead.");
        }
      }

      if (!uid) {
        return message.reply("Mention someone or reply message😁");
      }

      if (uid === "100083520680035") {
        return message.reply("Lol amar boss re Target koros ken?😒");
      }

      const avatarUrl = await usersData.getAvatarUrl(uid);
      const imgBuffer = await new DIG.Gay().getImage(avatarUrl);
      const pathSave = `${__dirname}/tmp/gay_${uid}.png`;

      await fs.outputFile(pathSave, imgBuffer);

      const name = await usersData.getName(uid);

      return message.reply({
        body: `🏳️‍🌈 Look😐 I found a lesbu😁 \n ${name}`,
        mentions: [{ tag: name, id: uid }],
        attachment: fs.createReadStream(pathSave)
      }, () => fs.unlinkSync(pathSave));
    } catch (error) {
      console.error("Error in command:", error);
      return message.reply("An error occurred while generating the image.");
    }
  }
};