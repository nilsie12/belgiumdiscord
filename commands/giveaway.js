const discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    var item = "";
    var time;
    var winnersCount;

    if (!message.member.hasPermission("BAN_USER")) return message.reply("JIj kan dit commando niet gebruiken.");

    winnersCount = args[0];
    time = args[1];
    item = args.slice(2, args.length).join(" ");

    if (!winnersCount) return message.reply("Geen aantal spelers die kunnen meedoen opgegeven!");
    if (!time) return message.reply("Geen tijd opgegeven!");
    if (!item) return message.reply("Geen item opgegeven die ze kunnen winnen!");

    message.delete();

    var date = new Date().getTime();
    var dateEnd = new Date(date + (time * 1000));

    var giveawayEmbed = new discord.MessageEmbed()
        .setTitle("🎉 **GIVEAWAY** 🎉")
        .setFooter(`Vervalt: ${dateEnd}`)
        .setDescription(item);

    var embedSend = await message.channel.send(giveawayEmbed);
    embedSend.react("🎉");

    setTimeout(function () {

        var random = 0;
        var winners = [];
        var inlist = false;

        var peopleReacted = embedSend.reactions.cache.get("🎉").users.cache.array();

        for (let i = 0; i < peopleReacted.length; i++) {

            if (peopleReacted[i].id == bot.user.id) {
                peopleReacted.splice(i, 1);
                continue;

            }

        }

        if (peopleReacted.length == 0) {
            return message.channel.send("Niemand heeft meegedaan dus niemand wint.");
        }

        if (peopleReacted.length < winnersCount) {
            return message.channel.send("Er zijn te weinig mensen die hebben meegedaan dus er is geen winaar!");
        }

        for (let y = 0; y < winnersCount; y++) {

            inList = false;

            random = Math.floor(Math.random() * peopleReacted.length);

            for (let o = 0; o < winners.length; o++) {

                if (winners[o] == peopleReacted[random]) {
                    inList = true;
                    y--;
                    break;
                }

            }

            if (!inList) {
                winners.push(peopleReacted[random]);
            }

        }

        for (let y = 0; y < winners.length; y++) {

            message.channel.send("Proficiat: " + winners[y].username + ` Je hebt dit gewonnen: ${item}`);

        }



    }, time * 1000)

}

module.exports.help = {

    name: "giveaway",
    description: "Host een giveaway",
    category: "Staff Commands"

}