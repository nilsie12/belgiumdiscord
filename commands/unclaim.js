const discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("Je hebt geen toestemming");

   if(message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(`Deze ticket is niet meer geclaimed door ${message.author}`);

}

module.exports.help = {

    name: "unclaim",
    description: "Unclaim een ticket",
    category: "Staff Commands"

}