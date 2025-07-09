const { GoatWrapper } = require("fca-liane-utils");
const { getStreamFromURL } = require("fb-watchman");
module.exports = {
  config: {
    name: "owner",
    version: 2.0,
    author: "OtinXSandip",
    usePrefix: false,
    longDescription: "info about bot and owner",
    category: "tools",
    guide: {
      en: "{p}{n}",
    },
  },

  onStart: async function ({ api, event, args, message, usersData }) {
    const imgURL = "https://imgur.com/4XWKKPP.jpeg";
    const attachment = await global.utils.getStreamFromURL(imgURL);

    const id = event.senderID;
    const userData = await usersData.get(id);
    const name = userData.name;
    const ment = [{ id: id, tag: name }];
    const a = "";
    const b = "";
    const c = "";
const e = "";
    const d = "";
const f = "";
const g = "";

    message.reply({ 
      body: `🍒𝐎𝐰𝐧𝐞𝐫 𝐢𝐧𝐟𝐨𝐫𝐦𝐚𝐭𝐢𝐨𝐧🌸\n\n\n- 🙋‍♂️𝐍𝐚𝐦𝐞: 𝐎𝐏𝐔 𝐒𝐄𝐍𝐒𝐄(•◡•)\n\n- 🌸𝐀𝐠𝐞 : 17+ N/A\n\n- 🌸 𝗖𝗹𝗮𝘀𝘀: 10\n\n- 🌸 𝐅𝐫𝐨𝐦 : 𝐓𝐎𝐊𝐘𝐎, 𝐉𝐀𝐏𝐀𝐍\n\n - 🌸 𝐑𝐞𝐥𝐚𝐭𝐢𝐨𝐧𝐬𝐡𝐢𝐩: 𝐒𝐢𝐧𝐠𝐥𝐞\n\n- 🌸 𝐏𝐫𝐨𝐟𝐢𝐥𝐞: https://www.facebook.com/opusense \n\n- 🌸 𝐇𝐨𝐛𝐛𝐢𝐞𝐬: ✨𝐏𝐡𝐨𝐭𝐨𝐠𝐫𝐚𝐩𝐡𝐲✨ 𝗪𝗮𝘁𝗰𝗵𝗶𝗻𝗴 𝐀𝐧𝐢𝐦𝐞✨ 𝗚𝗼𝗶𝗻𝗴 𝗳𝗼𝗿 𝗹𝗮𝘁𝗲 𝗻𝗶𝗴𝗵𝘁 𝘄𝗮𝗹𝗸𝘀✨.\n\n- `,
mentions: ment,
      attachment: attachment });
  }
};

const wrapper = new GoatWrapper(module.exports);
wrapper.applyNoPrefix({ allowPrefix: true });
