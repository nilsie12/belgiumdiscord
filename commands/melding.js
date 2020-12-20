const discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    if (!message.member.hasPermission("BAN_MEMBERS")) return message.reply("Jij kan dit niet doen!");

    var scheiding = "|";

    if (args[0] == null) {

        var embed = new discord.MessageEmbed()
            .setTitle("Gebruik")
            .setColor("#00ee00")
            .setDescription(`Maak een melding door gebruk te maken van: \n !melding titel ${scheiding} bericht ${scheiding} Kleur (HEX) ${scheiding} kanaal`);

        return message.reply(embed);
    }

    var argsList = args.join(" ").split(scheiding);

    if (argsList[2] === undefined) argsList[2] = "#eeeeee";
    if (argsList[3] === undefined) argsList[3] = "algemeen";

    var options = {

        title: argsList[0],
        bericht: argsList[1] || "Geen inhoud gegeven",
        kleur: argsList[2].trim(),
        kanaal: argsList[3].trim()


    }

    var meldingEmbed = new discord.MessageEmbed()
        .setTitle("Melding")
        .setColor(options.kleur)
        .setDescription(`Bericht van ${message.author} \n \n ${options.title} \n ${options.bericht}`)
        .setTimestamp()

    var channel = message.member.guild.channels.cache.find(channels => channels.name === options.kanaal);
    if(!channel) return message.reply("Kanaal bestaat niet!")

    channel.send(meldingEmbed);

}

module.exports.help = {

    name: "melding",
    description: "Geeft een bericht in kanaal naar keuze",
    category: "Staff Commands"

}