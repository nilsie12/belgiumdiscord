const discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    const categoryID = "789910252069584937";

    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("Jij kan dit niet doen!");

    if (message.channel.parentID == categoryID) {
        message.channel.delete();


        var embedCreateTicket = new discord.MessageEmbed()
            .setTitle("Ticket, " + message.channel.name)
            .setDescription("De ticket is afgehandeld!")
            .setFooter("Ticket gesloten");

        var ticketChannel = message.member.guild.channels.cache.find(channel => channel.name === "log");
        if (!ticketChannel) return message.reply("Kanaal bestaat niet!");

        ticketChannel.send(embedCreateTicket);


    } else {

        message.channel.send("Gelieve dit in een ticket te doen!");

    }


}

module.exports.help = {

    name: "tclose",
    description: "Close een ticket",
    category: "Staff Commands"

}