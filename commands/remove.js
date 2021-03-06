const discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    var catergoryID = "765230622179328050";

    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("Jij kan dit niet doen!");

    if (message.channel.parentID != catergoryID) return message.reply("Je doet dit in een verkeerd kanaal.");

    var addUser = message.guild.member(message.mentions.users.first()) || message.guild.members.cache.get(args[0]);

    if (!addUser) return message.reply("Geen gebruiker meegegeven.");

    var embedPrompt = new discord.MessageEmbed()
        .setColor("GREEN")
        .setTitle("Antwoord binnen 30 seconden!")
        .setDescription(`Wil je ${addUser} verwijderen?`);

    var embedAdd = new discord.MessageEmbed()
        .setTitle("Gebruiker is verwijderd")
        .setColor("GREEN")
        .setTimestamp()
        .addField("Verwijderde gebruiker", `${addUser}`)
        .addField("Persoon verwijderd door", message.author);

    message.channel.send(embedPrompt).then(async msg => {

        message.delete();

        var emoji = await promptMessage(msg, message.author, 30, ["✅", "❌"]);

        if (emoji == "✅") {

            msg.delete();

            message.channel.updateOverwrite(addUser, {
                SEND_MESSAGES: false,
                CREATE_INSTANT_INVITE: false,
                READ_MESSAGES: false,
                ATTACH_FILES: false,
                ADD_REACTIONS: false,
                CONNECT: false,
                READ_MESSAGES_HISTORY: false,
                VIEW_CHANNEL: false
            });

            message.channel.send(embedAdd).then(mesg => msg.delete({ timeout: 10000 }));

        } else if (emoji == "❌") {

            msg.delete();

            message.reply("Verwijdering van persoon geanuleerd").then(msg => msg.delete({ timeout: 5000 }));
        }

    });

    // Emojis aan teksten kopellen.
    async function promptMessage(message, author, time, reactions) {
        // We gaan eerst de tijd * 1000 doen zodat we seconden uitkomen.
        time *= 1000;

        // We gaan ieder meegegeven reactie onder de reactie plaatsen.
        for (const reaction of reactions) {
            await message.react(reaction);
        }

        // Als de emoji de juiste emoji is die men heeft opgegeven en als ook de auteur die dit heeft aangemaakt er op klikt
        // dan kunnen we een bericht terug sturen.
        const filter = (reaction, user) => reactions.includes(reaction.emoji.name) && user.id === author.id;

        // We kijken als de reactie juist is, dus met die filter en ook het aantal keren en binnen de tijd.
        // Dan kunnen we bericht terug sturen met dat icoontje dat is aangeduid.
        return message.awaitReactions(filter, { max: 1, time: time }).then(collected => collected.first() && collected.first().emoji.name);
    }

}

module.exports.help = {

    name: "remove",
    description: "Remove iemand in een ticket",
    category: "Staff Commands"

}