# Discord Bot

A simple Discord bot built with `discord.js` and `dotenv`.

It currently supports:
- logging in with a bot token from `.env`
- loading slash commands from the `commands/` folder
- deploying slash commands to a specific Discord server
- responding to `/ping` and `/user`

## Project Structure

- [index.js](/e:/DiscordBot/index.js) starts the bot, loads commands, and handles interactions
- [deploy-command.js](/e:/DiscordBot/deploy-command.js) registers slash commands with Discord
- [commands/utility/ping.js](/e:/DiscordBot/commands/utility/ping.js) replies with `Pong!`
- [commands/utility/user.js](/e:/DiscordBot/commands/utility/user.js) shows basic user information
- [.env](/e:/DiscordBot/.env) stores bot configuration values
- [package.json](/e:/DiscordBot/package.json) contains scripts and dependencies

## Requirements

- Node.js installed
- A Discord application and bot created in the Discord Developer Portal
- The bot invited to your test server
- See Piyush Garg's Discord video for complete setup 

## Environment Variables

Create a `.env` file in the project root with:

```env
BOT_TOKEN="your-bot-token"
CLIENT_ID="your-application-client-id"
GUILD_ID="your-test-server-id"
```

## Discord Setup

In the Discord Developer Portal:

- enable the `MESSAGE CONTENT INTENT` if you want message logging to work
- make sure the bot is invited to your server
- include the `applications.commands` scope when inviting the bot so slash commands can appear

## Install Dependencies

```powershell
npm install
```

## Deploy Slash Commands

Before testing slash commands, register them with Discord:

```powershell
npm run deploy
```

Expected success output:

```txt
Started refreshing 2 application (/) commands.
Successfully reloaded 2 application (/) commands.
```

This project currently deploys commands as guild commands, which means they are registered only in the server identified by `GUILD_ID`.

## Start The Bot

```powershell
npm start
```

Expected success output:

```txt
Logged in as YourBotName
```

## Test The Bot

After deploying and starting the bot:

1. Open the Discord server that matches your `GUILD_ID`.
2. Type `/` in a channel.
3. Confirm that `/ping` and `/user` appear in the slash command menu.
4. Run `/ping` and check that the bot replies with `Pong!`
5. Run `/user` and check that the bot replies with your username and join date.

## Available Scripts

- `npm start` runs the bot
- `npm run deploy` deploys slash commands to the configured guild

## Notes

- Do not commit `.env` to GitHub
- If your bot token is ever exposed, regenerate it immediately in the Discord Developer Portal
- Slash commands must be deployed before they will appear in Discord
- Command files in `commands/` are local code; Discord only knows about them after deployment
