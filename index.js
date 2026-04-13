const fs = require("fs");
const path = require("path");
const { Client, GatewayIntentBits, Collection, Events, MessageFlags } = require("discord.js");

require('dotenv').config();


// function getBotToken() {   //function to preprocess Bot Token from .env file {we can also use dotenv to simpplify this process }
//     if (process.env.BOT_TOKEN) {
//         return process.env.BOT_TOKEN;
//     }

//     const envPath = path.join(__dirname, ".env");
//     if (!fs.existsSync(envPath)) {
//         return undefined;
//     }

//     const envFile = fs.readFileSync(envPath, "utf8");
//     const tokenLine = envFile
//         .split(/\r?\n/)
//         .find((line) => line.trim().startsWith("BOT_TOKEN="));

//     if (!tokenLine) {
//         return undefined;
//     }

//     return tokenLine.split("=")[1]?.trim().replace(/^"(.*)"$/, "$1");
// }

//const token = getBotToken();

const token = process.env.BOT_TOKEN;


if (!token) {
    console.error("BOT_TOKEN was not found in environment variables or .env");
    process.exit(1);
}

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
});

client.commands = new Collection();

client.once("ready", () => {
    console.log(`Logged in as ${client.user.tag}`);
});

client.on("messageCreate", (message) => {
    if (message.author.bot) return;

    console.log(`[${message.guild?.name || "DM"}] ${message.author.tag}: ${message.content}`);
});



const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);
for (const folder of commandFolders) {
    const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter((file) => file.endsWith('.js'));
	for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		// Set a new item in the Collection with the key as the command name and the value as the exported module
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		} else {
            console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}


client.on(Events.InteractionCreate, async (interaction) => {
    if (!interaction.isChatInputCommand()) return; 
	console.log(interaction);
    const command = interaction.client.commands.get(interaction.commandName);
	if (!command) {
        console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}
	try {
        await command.execute(interaction);
	} catch (error) {
        console.error(error);
		if (interaction.replied || interaction.deferred) {
            await interaction.followUp({
                content: 'There was an error while executing this command!',
				flags: MessageFlags.Ephemeral,
			});
		} else {
			await interaction.reply({
                content: 'There was an error while executing this command!',
				flags: MessageFlags.Ephemeral,
			});
		}
	}
});


client.login(token);