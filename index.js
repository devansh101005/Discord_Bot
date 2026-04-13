const fs = require("fs");
const path = require("path");
const { Client, GatewayIntentBits } = require("discord.js");

function getBotToken() {   //function to preprocess Bot Token from .env file {we can also use dotenv to simpplify this process }
    if (process.env.BOT_TOKEN) {
        return process.env.BOT_TOKEN;
    }

    const envPath = path.join(__dirname, ".env");
    if (!fs.existsSync(envPath)) {
        return undefined;
    }

    const envFile = fs.readFileSync(envPath, "utf8");
    const tokenLine = envFile
        .split(/\r?\n/)
        .find((line) => line.trim().startsWith("BOT_TOKEN="));

    if (!tokenLine) {
        return undefined;
    }

    return tokenLine.split("=")[1]?.trim().replace(/^"(.*)"$/, "$1");
}

const token = getBotToken();

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

client.once("ready", () => {
    console.log(`Logged in as ${client.user.tag}`);
});

client.on("messageCreate", (message) => {
    if (message.author.bot) return;

    console.log(`[${message.guild?.name || "DM"}] ${message.author.tag}: ${message.content}`);
});

client.login(token);

