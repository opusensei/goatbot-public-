module.exports = {
  config: {
    name: "antiout",
    version: "1.0.0",
    author: "Adapted from DungUwU",
    category: "events",
    eventType: ["log:unsubscribe"],
    description: "Prevents members from leaving the group."
  },

  onStart: async ({ event, api, threadsData, usersData }) => {
    const { threadID, logMessageData } = event;

    // Fetch thread settings
    const threadData = await threadsData.get(threadID);
    if (!threadData.data.antiout) return;

    // If the bot is the one being removed, exit
    if (logMessageData.leftParticipantFbId === api.getCurrentUserID()) return;

    // Fetch user name
    const userID = logMessageData.leftParticipantFbId;
    const userName =
      global.data.userName.get(userID) ||
      (await usersData.getName(userID));

    // Check if the user left voluntarily or was removed
    const isSelfSeparation = event.author === userID;

    if (isSelfSeparation) {
      try {
        // Attempt to re-add the user to the group
        api.addUserToGroup(userID, threadID, async (error) => {
          if (error) {
            console.error("Error re-adding user to the group:", error);
            api.sendMessage(
              `Unable to re-add [ ${userName} ] to the group. 😔`,
              threadID
            );
          } else {
            api.sendMessage(
              `\n[ ${userName} ] ~ has been re-added to the Group 🌚`,
              threadID
            );
          }
        });
      } catch (error) {
        console.error("Unexpected error:", error);
        api.sendMessage(
          `Error occurred while trying to re-add [ ${userName} ] to the group. 😔`,
          threadID
        );
      }
    }
  }
};
