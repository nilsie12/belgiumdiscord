const discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

        return message.channel.send("Dit is de link van de solicitaie server: https://discord.gg/GCAy9tAJJU");

}

module.exports.help = {

    name: "solicitatie",
    description: "Krijg de solicitatie server link.",
    category: "Informatie"

}