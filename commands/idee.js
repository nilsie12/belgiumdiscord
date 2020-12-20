const discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    // Vang het idee op.
    var idee = args.join(" ");

    // Kijk na als er een idee is meegegeven.
    if (!idee) return message.channel.send("Geen idee meegegeven, gelieve een idee mee te geven.");

    // Maak het embed aan.
    var ideeEmbed = new discord.MessageEmbed()
        .setTitle("Nieuw Idee")
        .setColor("#00FF00")
        .addField("Idee: ", idee)
        .addField("Ingezonden door: ", message.author);

    // Vind het kanaal.
    var ideeChannel = message.member.guild.channels.cache.get("790200562641403924");
    if (!ideeChannel) return message.channel.send("Dit kanaal bestaat niet!");

    // Verzend het bericht en voeg er reacties aan toe.
    ideeChannel.send(ideeEmbed).then(embedMessage => {
        embedMessage.react('👍');
        embedMessage.react('👎');
    });

    // Einde.

}

module.exports.help = {
    name: "idee",
    description: "Heb je een idee? Zet het dan hier en misschien passen we het toe.",
    category: "Informatie"
}