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

    var argsList = args.join(" ").split(scheiding);


    var options = {

        Type: argsList[0],
        tijd: argsList[1],
        datum: argsList[2],
        cohost: argsList[3],
        opmerkingen: argsList[4]


    }

    var meldingEmbed = new discord.MessageEmbed()
        .setTitle("Training")
        .setColor("#000000")
        .setDescription(`Type: ${options.Type} \n Tijd: ${options.tijd} \n Datum: ${options.datum} \n Co-Host: ${options.cohost} \n Opmerkingen: ${options.opmerkingen}`);

    var ideeChannel = message.member.guild.channels.cache.get("764580691370311710");
    if (!ideeChannel) return message.channel.send("Dit kanaal bestaat niet!"); 

    ideeChannel.send(meldingEmbed);

}

module.exports.help = {

    name: "training1",
    description: "Maak een politie training",
    category: "Staff Commands"

}