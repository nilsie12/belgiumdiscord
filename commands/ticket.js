const discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    const categoryID = "765230622179328050";

    var userName = message.author.username;
    var userDiscriminator = message.author.discriminator;

    // var ticketBestaat = false;

    // message.guild.channels.chache.forEach(channel => {

    //     if (channel.name == userName.toLowerCase() + "-" + userDiscriminator) {
    //         ticketBestaat = true;

    //         message.reply("Je hebt al en ticket!");

    //         return;
    //     }

    // });

    // if (ticketBestaat) return;

    var ticketEmbed = new discord.MessageEmbed()
        .setTitle("Hoi " + message.author.username)
        .setFooter("Support ticket wordt aangemaakt!");

    message.channel.send(ticketEmbed);

    message.guild.channels.create(userName.toLowerCase() + "-" + userDiscriminator, { type: 'text' }).then(
        (createdChannel) => {
            createdChannel.setParent(categoryID).then(
                (settedParent) => {

                    settedParent.updateOverwrite(message.guild.roles.cache.find(x => x.name === '@everyone'), {
                        SEND_MESSAGES: false,
                        VIEW_CHANNEL: false
                    });

                    settedParent.updateOverwrite(message.guild.rolesID.cache.find(x => x.id === '764076021346598923'), {
                        CREATE_INSTANT_INVITE: false,
                        READ_MESSAGES: true,
                        ATTACH_FILES: true,
                        CONNECT: true,
                        SEND_MESSAGES: true,
                        ADD_REACTIONS: true,
                        VIEW_CHANNEL: true,
                        READ_MESSAGE_HISTORY: true
                    });

                    
                    settedParent.updateOverwrite(message.author.id, {
                        CREATE_INSTANT_INVITE: false,
                        READ_MESSAGES: true,
                        ATTACH_FILES: true,
                        CONNECT: true,
                        SEND_MESSAGES: true,
                        ADD_REACTIONS: true,
                        VIEW_CHANNEL: true,
                        READ_MESSAGE_HISTORY: true
                    });

                    

                    var embadParent = new discord.MessageEmbed()
                    .setTitle(`Hoi,  ${message.author.username}`)
                    .setDescription("Zet hier je vragen of klachten.");

                    settedParent.send(embadParent);
                }
            ).catch(err => {
                message.channel.send("Er is een fout");
            });
        }
    ).catch(err => {
        message.channel.send("Er is een fout.");
    });

    

}

module.exports.help = {

    name: "ticket",
    description: "Maak een ticket aan",
    category: "Informatie"

}