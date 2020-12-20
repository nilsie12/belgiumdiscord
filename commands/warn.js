const discord = require("discord.js");
const fs = require("fs");
const warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));

module.exports.run = async (bot, message, args) => {

    // const args = message.content.slice(prefix.length).split(/ +/);

    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("sorry jij kan dit niet");

    if (!args[0]) return message.reply("Geen gebruiker opgegeven.");

    if (!args[1]) return message.reply("Gelieve een redenen op te geven.");

    if (!message.guild.me.hasPermission("MANAGE_MESSAGES")) return message.reply("Geen perms");

    var warnUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));

    var reason = args.slice(1).join(" ");

    if (!warnUser) return message.reply("Kan de gebruiker niet vinden.");

    if (warnUser.hasPermission("MANAGE_MESSAGES")) return message.reply("Je kunt deze gebruiker niet warnen!");

    if (!warns[warnUser.id]) warns[warnUser.id] = {
        warns: 0
    };

    warns[warnUser.id].warns++;

    fs.writeFile("./warnings.json", JSON.stringify(warns), (err) => {
        if (err) console.log(err);
    });

    var warnEmbed = new discord.MessageEmbed()
        .setColor("#ff0000")
        .setFooter(message.member.displayName, message.author.displayAvatarURL)
        .setTimestamp()
        .setDescription(`**Gewarned:** ${warnUser} (${warnUser.id}
        **Warning door:** ${message.author}
        **Reden: **${reason}`)
        .addField("Aantal warns", warns[warnUser.id].warns);

    var channel = message.member.guild.channels.cache.get("789861555352109087");
    if (!channel) return message.reply("Dit kanaal bestaat niet");

    channel.send(warnEmbed);

    if (warns[warnUser.id].warns == 8) {

        var embed = new discord.MessageEmbed()
            .setColor("#ff0000")
            .setDescription("LET OP ")
            .addField("Bericht", "Deze gebruiker heeft al veel warns!")
            .addField("Aantal warns", warns[warnUser.id].warns);

        message.channel.send(embed);

    } else if (warns[warnUser.id].warns == 10) {
        message.guild.member(warnUser).ban(reason);
        message.member.send(`${warnUser} is verbannen door de bot wegens te veel warns!`);
    }

}

module.exports.help = {

    name: "warn",
    description: "Geef iemand een waarschuwing",
    category: "Staff Commands"

}