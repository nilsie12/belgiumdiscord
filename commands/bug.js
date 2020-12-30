const discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    // Vang het idee op.
    var bug = args.join(" ");

    // Kijk na als er een idee is meegegeven.
    if (!bug) return message.channel.send("Geen bug meegegeven, gelieve een bug mee te geven.");

    // Maak het embed aan.
    var ideeEmbed = new discord.MessageEmbed()
        .setTitle("Nieuwe bug")
        .setColor("#00FF00")
        .addField("Bug: ", bug)
        .addField("Ingezonden door: ", message.author);

    // Vind het kanaal.
    var bugChannel = message.member.guild.channels.cache.get("765240285122658304");
    if (!bugChannel) return message.channel.send("Dit kanaal bestaat niet!");

    // Verzend het bericht en voeg er reacties aan toe.
    ideeChannel.send(ideeEmbed).then(embedMessage => {
        embedMessage.react('👍');
        embedMessage.react('👎');
    });

    // Einde.

}

module.exports.help = {
    name: "bug",
    description: "Heb je een bug? Zeg het en meestal fixen we dat!",
    category: "Informatie"
}