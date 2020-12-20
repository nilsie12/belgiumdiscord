const discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    var ledenTotal = message.guild.memberCount;
    var bots = message.guild.members.cache.filter(m => m.user.bot).size;
    var people = ledenTotal - bots;
    var online = message.guild.members.cache.filter(m => m.user.presence.status == "online" || m.user.presence.status == "dnd" || m.user.presence.status == "idle").size;

    var ledenembed = new discord.MessageEmbed()
        .setColor("#00FF00")
        .setTitle("Leden informatie")
        .addField("Leden", ledenTotal, true)
        .addField("Bots", bots, true)
        .addField("Mensen", people, true)
        .addField("Online", online, true);

        message.channel.send(ledenembed);
}

module.exports.help = {

    name: "leden",
    description: "Zie je hoeveel leden er in de server zitten.",
    category: "Informatie"

}