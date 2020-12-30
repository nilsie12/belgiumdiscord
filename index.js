const discord = require("discord.js");
const botConfig = require("./botconfig.json");
const levelFile = require("./data/levels.json");

const fs = require("fs");
const { IncomingMessage } = require("http");

const bot = new discord.Client();
bot.commands = new discord.Collection();


fs.readdir("./commands/", (err, files) => {

    if (err) console.log(err);

    var jsFiles = files.filter(f => f.split(".").pop() === "js");

    if (jsFiles.length <= 0) {
        console.log("Kon geen files vinden");
        return
    }

    jsFiles.forEach((f, i) => {

        var fileGet = require(`./commands/${f}`)
        console.log(`De file ${f} is geladen!`);

        bot.commands.set(fileGet.help.name, fileGet);

    })

});


bot.on("ready", async () => {

    console.log(`${bot.user.username} is online`)

    bot.user.setActivity("Brussel Roleplay", { type: "PLAYING" });

});

bot.on("guildMemberAdd", member => {

    var role = member.guild.roles.cache.get('764075893852733480');

    if (!role) return;

    member.roles.add(role);

});

//var swearWords = ["kanker", "mogool", "mongool", "tering", "kut", "kkr", "fack", "fuck"];

bot.on("message", async message => {

    if (message.author.bot) return;

    if (message.channel.type === "dm") return;


    // var msg = message.content.toLowerCase();


    // for (let i = 0; i < swearWords["vloekwoorden"].length; i++) {

    //     if (msg.includes(swearWords["vloekwoorden"][i])) {

    //         message.delete();

    //         return message.reply("Gelieve niet te schelden!");

    //     }

    // }



    var prefix = botConfig.prefix;

    var messageArray = message.content.split(" ");


    var swearWords = JSON.parse(fs.readFileSync("./data/swearWords.json"));

    var senteceUser = "";
    var amountSwearWords = 0;

    for (let y = 0; y < messageArray.length; y++) {

        const word = messageArray[y].toLowerCase();

        var changeWord = "";

        for (let i = 0; i < swearWords["vloekwoorden"].length; i++) {

            if (word.includes(swearWords["vloekwoorden"][i])) {

                changeWord = word.replace(swearWords["vloekwoorden"][i], "************************");

                senteceUser += " " + changeWord;

                amountSwearWords++;

            }

        }


        if (!changeWord) {
            senteceUser += " " + messageArray[y];
        }

    }

    if (amountSwearWords != 0) {

        message.delete();
        message.channel.send(senteceUser);

        message.channel.send("Niet vloeken alstublieft!");


    }







    var command = messageArray[0];

    RandomXp(message);



    if (!message.content.startsWith(prefix)) return;

    var arguments = messageArray.slice(1);

    var commands = bot.commands.get(command.slice(prefix.length));

    if (commands) commands.run(bot, message, arguments);

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
    function RandomXp(message) {

        var randomNumber = Math.floor(Math.random() * 15) + 1;

        var idUser = message.author.id;

        if (!levelFile[idUser]) {
            levelFile[idUser] = {
                xp: 0,
                level: 0
            }
        }

        levelFile[idUser].xp += randomNumber;

        var levelUser = levelFile[idUser].level;
        var xpUser = levelFile[idUser].xp;

        var nextLevelXp = levelUser * 300;

        if (nextLevelXp == 0) nextLevelXp = 100;

        if (xpUser >= nextLevelXp) {

            levelFile[idUser].level += 1;

            fs.writeFile("./data/levels.json", JSON.stringify(levelFile), err => {
                if (err) console.log(err);
            });

            var embedLevel = new discord.MessageEmbed()
                .setTitle(message.author.username)
                .setDescription("***Level Hoger***", idUser)
                .setColor("#00ff00")
                .addField("Nieuw level: ", levelFile[idUser].level);

            message.channel.send(`Je bent een level hoger!`, embedLevel);

        }

    }

});



bot.login(process.env.token);