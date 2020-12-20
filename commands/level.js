const discord = require("discord.js");
const levelFile = require("../data/levels.json");

module.exports.run = async (bot, message, args) => {

    var idUser = message.author.id;

    if (!levelFile[idUser]) {
        levelFile[idUser] = {
            xp: 0,
            level: 0
        }
    }

    var levelUser = levelFile[idUser].level;
    var xpUser = levelFile[idUser].xp;
    var nextLevelXp = levelUser * 300;

    var whenNextLevel = nextLevelXp - xpUser;

    var embedLevel = new discord.MessageEmbed()
        .setTitle(message.author.username)
        .setColor("#00ff00")
        .addField("Level: ", levelUser, true)
        .addField("xp: ", xpUser, true)
        .setFooter(`${whenNextLevel} Xp tot volgend level`, message.author.displayAvatar);

        message.channel.send(embedLevel);



}

module.exports.help = {

    name: "level",
    description: "Zie welk level je bent.",
    category: "Informatie"

}