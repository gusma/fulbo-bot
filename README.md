# fulbo-bot

This is a bot created by me that sends a games list from librefutboltv.com to a Telegram channel of your choice. 

## Where can I find it?

If you do not wish to host it yourself, you can find our updates (in spanish, since our sources for live streams are also in spanish too) in our channel [DameFulbo](https://t.me/DameFulbo). There, we post the information twice a day.

## How to set-up for your own channel

If you wish to host our script on your instance or computer, you need to follow the following steps to obtain your channel to publish to, as well as the adequate ID for your bot to properly function. Here are the steps:

1. Create a New Bot with BotFather

    Start a chat with the BotFather on Telegram.
    Use the /newbot command to create a new bot.
    BotFather will ask you for a name for your bot. This is a display name and can be anything you like.
    Next, you'll be asked for a username for your bot. This has to end in bot (e.g., mySampleBot).
    Once the bot is created, BotFather will provide you with a token for your bot. This is the BOT_TOKEN you'll need.

Note: Keep your token private! Anyone with this token can control your bot.

2. Create a New Channel

    In Telegram, click on the hamburger menu (three horizontal lines) in the top left corner.
    Choose "New Channel".
    Provide a name and description for your channel.
    Choose the channel type (public or private). If public, you'll be asked to choose a permanent link (URL) for your channel.
    Invite members or skip the step.
    Your channel is now created!

3. Get the Channel ID

If your channel is public:

    Your CHANNEL_ID will be *@YourChannelUsername* (Replace YourChannelUsername with the username you chose when creating the channel).

If your channel is private:

    Add your bot to the channel as an administrator.
    Send any message in the channel.
    Use the following URL in a web browser, replacing BOT_TOKEN with your bot's token:

`https://api.telegram.org/botBOT_TOKEN/getUpdates`

    Look for the "chat" object in the returned JSON. The channel ID will be the "id" value. It will be a negative number and will look something like -1001234567890. This is your CHANNEL_ID.

4. Add the Bot to Your Channel

    Go to your channel's settings (click on the channel's name at the top).
    Click on "Administrators".
    Click "Add Administrator".
    Search for your bot by its username.
    Add it as an administrator.

5. Use the Token and Channel ID

In your .env file (or however you're managing environment variables):

```
BOT_TOKEN=YourBotTokenHere
CHANNEL_ID=YourChannelIDHere
```

Replace *YourBotTokenHere* with the token you got from BotFather and *YourChannelIDHere* with the channel ID you determined.

You should be all set by now then! 