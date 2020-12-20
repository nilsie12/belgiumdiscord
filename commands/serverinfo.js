const discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    var botEmbed = new discord.MessageEmbed()
    .setTitle("Belgium Roleplay Informatie")
    .setDescription("Dit is de informatie van deze server!")
    .setColor("#fc0303")
    .addField("Discord server naam", message.guild.name)
    .addField("Totaal aantal mensen", message.guild.memberCount)
    .addField("Je bent gejoind op: ", message.member.joinedAt)

return message.channel.send(botEmbed);

}

module.exports.help = {

    name: "serverinfo",
    description: "Geeft de serverinfo",
    category: "Informatie"

}