# Discord Bot

A simple Discord bot built with `discord.js` that logs incoming server messages to the terminal.

## What It Does

- Connects to Discord using your bot token
- Logs a message when the bot is ready
- Listens for new messages with `messageCreate`
- Ignores bot messages
- Prints the server name, username, and message content in the terminal

## Project Files

- [index.js](/abs/path/e:/DiscordBot/index.js) contains the bot logic
- [.env](/abs/path/e:/DiscordBot/.env) stores your `BOT_TOKEN`
- [package.json](/abs/path/e:/DiscordBot/package.json) contains project metadata and scripts

## Setup

1. Install dependencies:

```powershell
npm install
```

2. Create a `.env` file in the project root:

```env
BOT_TOKEN="your-bot-token"
```

3. In the Discord Developer Portal, enable:

- `MESSAGE CONTENT INTENT`

4. Invite the bot to your server with the correct permissions.

## Run The Bot

```powershell
npm start
```

When the bot starts successfully, the terminal will show something like:

```txt
Logged in as YourBotName
```

When someone sends a message in a server the bot can access, the terminal will show something like:

```txt
[My Server] username: hello
```

## Notes

- Do not commit `.env` to GitHub
- If your token is ever exposed, regenerate it in the Discord Developer Portal
- This project reads `BOT_TOKEN` from either environment variables or `.env`
