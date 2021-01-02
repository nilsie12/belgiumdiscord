const discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    var categoryID = "794843393708261376";
    var staff = "794842182858047512";
    var person = message.author;

    var channelName = "Sollicitatie-" + message.author.username;

    var ticket = false;

    message.guild.channels.cache.forEach(channel => {

        if (channel.name.toLowerCase() === channelName.toLowerCase()) {
            ticket = true;
            return message.reply("Je hebt al een sollicitatie ticket!").then(msg => msg.delete({ timeout: 3000 }));
        }

    });

    if (ticket) return;

    var embed = new discord.MessageEmbed()
        .setTitle("Hoi " + message.author.username)
        .setColor("#00BFFF")
        .setFooter("Kanaal wordt aangemaakt.")

    message.channel.send(embed).then(msg => msg.delete({ timeout: 3000 }));

    message.guild.channels.create(channelName, { type: 'text' }).then(
        (createdChannel) => {
            createdChannel.setParent(categoryID).then(
                (settedParent) => {

                    settedParent.updateOverwrite(message.guild.roles.cache.find(role => role.name === "@everyone"), {
                        SEND_MESSAGES: false,
                        VIEW_CHANNEL: false
                    });

                    settedParent.updateOverwrite(message.author.id, {
                        SEND_MESSAGES: true,
                        CREATE_INSTANT_INVITE: false,
                        READ_MESSAGES: true,
                        ATTACH_FILES: true,
                        ADD_REACTIONS: true,
                        CONNECT: true,
                        READ_MESSAGE_HISTORY: true,
                        VIEW_CHANNEL: false
                    });

                    settedParent.updateOverwrite(message.guild.roles.cache.get(staff), {
                        SEND_MESSAGES: true,
                        VIEW_CHANNEL: true,
                        READ_MESSAGES: true,
                        READ_MESSAGES_HISTORY: true
                    });
                

        }).catch(err => {
            message.channel.send("Er is een fout.");
        })

})


}

module.exports.help = {

    name: "solliciteer",
    description: "Doe een sollicitatie",
    category: "Informatie"

}