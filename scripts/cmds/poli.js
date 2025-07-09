module.exports = {
  config: {
    name: "poli",
    version: "1.0.0",
    author: "opu",
    countDown: 5,
    role: 0,
    shortDescription: "Generate image from prompt",
    longDescription: "Generate image from text prompt using Pollinations AI",
    category: "AI",
    guide: {
      en: "{pn} [prompt]\n\nExample:\n.poli A flying house with balloons"
    }
  },

  onStart: async function ({ message, args, api }) {
    const prompt = args.join(" ");
    if (!prompt)
      return message.reply("🖼️ Please provide a prompt!\n\nExample:\n.poli A flying house with balloons");

    const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}`;
    
    try {
      const img = await global.utils.getStreamFromURL(imageUrl);
      message.reply({
        body: `🎨 Image generated for:\n"${prompt}"`,
        attachment: img
      });
    } catch (err) {
      message.reply("❌ Failed to fetch image. Try again later.");
    }
  }
};
