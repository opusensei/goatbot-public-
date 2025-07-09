const axios = require("axios");
const fs = require("fs");

const baseApiUrl = async () => {
  const base = await axios.get(
    `https://raw.githubusercontent.com/Mostakim0978/D1PT0/refs/heads/main/baseApiUrl.json`
  );
  return base.data.api;
};

const config = {
  name: "cdp",
  aliases: ["coupledp"],
  version: "1.0",
  author: "opu",
  credits: "opu",
  countDown: 2,
  role: 0,
  hasPermission: 0,
  usePrefix: true,
  prefix: true,
  description: "Get random couple DP",
  category: "FUN",
  commandCategory: "FUN",
  usages: "coupledp",
  guide: "{pn}"
};

const onStart = async ({ event, api }) => {
  try {
    const w = await api.sendMessage("Wait Bby <😘", event.threadID);

    const response = await axios.get(`${await baseApiUrl()}/coupledp?random=dipto`);
    const maleLink = response.data.male;
    const femaleLink = response.data.female;

    const malePath = `${__dirname}/cache/male.jpg`;
    const femalePath = `${__dirname}/cache/female.jpg`;

    // Download images as arraybuffer and save using fs
    const [maleImage, femaleImage] = await Promise.all([
      axios.get(maleLink, { responseType: "arraybuffer" }),
      axios.get(femaleLink, { responseType: "arraybuffer" })
    ]);

    fs.writeFileSync(malePath, maleImage.data);
    fs.writeFileSync(femalePath, femaleImage.data);

    api.unsendMessage(w.messageID);

    await api.sendMessage({
      body: "Here's your couple DP <😘",
      attachment: [
        fs.createReadStream(malePath),
        fs.createReadStream(femalePath)
      ]
    }, event.threadID, () => {
      fs.unlinkSync(malePath);
      fs.unlinkSync(femalePath);
    }, event.messageID);

  } catch (error) {
    api.sendMessage(`Error: ${error.message}`, event.threadID, event.messageID);
    console.error(error);
  }
};

module.exports = {
  config,
  onStart,
  run: onStart
};
