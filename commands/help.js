const discord = require("discord.js");
const botConfig = require("../botconfig.json");


module.exports.run = async (bot, message, args) => {

    // try{

    //     var text = "**Belgium Bot** \n \n **__Commands__** \n !hallo - Zegt hallo terug! \n !serverinfo - Geeft de serverinfo! \n !help - Geeft dit menu! \n\n **__Staff Commands__** \n !kick - Kick iemand! \n !ban - Ban iemand";

    //     message.author.send(text);

    //     message.reply("Alle commands kan je vinden in je prive berichten!");

    // }catch(error){
    //     message.reply("Er is iets fout gelopen.");
    // }

    var commandList = [];
    var prefix = botConfig.prefix;

    bot.commands.forEach(commands => {

        var constructor = {

            name: commands.help.name,
            description: commands.help.description,
            category: commands.help.category

        }

        commandList.push(constructor);

    });

    var response = "**__Bot Commands__** \n \n";
    var info = "**__Informatie__** \n";
    var staff_cmds = "\n**__Staff Commands__**\n";
    var fun = "\n **__Fun Commands__**\n";

    for (let i = 0; i < commandList.length; i++) {
        const command = commandList[i];

        if (command["category"] == "Informatie") {

            info += `${prefix}${command["name"]} - ${command["description"]}\n`;


        } else if (command["category"] == "Fun") {
            fun += `${prefix}${command["name"]} - ${command["description"]}\n`;


        } else if (command["category"] == "Staff Commands") {
            staff_cmds += `${prefix}${command["name"]} - ${command["description"]}\n`;
        }
    }

    response += info;
    response += fun;
    response += staff_cmds;

    message.author.send(response).then(() => {
        message.channel.send("Alle commands staan in je dm! :mailbox_with_mail:");
    }).catch(() => {
        message.channel.send("Je privé berichten staan uit, dus je hebt niets ontvangen.");
    })


}

module.exports.help = {

    name: "help",
    description: "Geeft dit menu",
    category: "Informatie"

}