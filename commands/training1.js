const discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("Je hebt geen toestemming");

    var scheiding = "|";


    if (args[0] == null) {

        var embed = new discord.MessageEmbed()
            .setTitle("Gebruik")
            .setColor("#00ee00")
            .setDescription(`Maak een politie training door gebruik te maken van: \n !training Type ${scheiding} tijd ${scheiding} datum ${scheiding} co-host ${scheiding} opmerkingen`);

        return message.reply(embed);

    }

}

module.exports.help = {

    name: "hallo",
    description: "Zegt hallo terug",
    category: "Fun"

}