# 🚀 Welcome to the offline twitch clip randomizer!

This project is the offline version of https://simply-stream.com/tools/randomclips.

```
npm run build
```

or

```
yarn build:prod
```

to bundle your application

# Configuration

## Twitch Client ID/Secret

First you need to create an application on https://dev.twitch.tv/console to make this work.
This so-called application is used to communicate with Twitch to receive a list of clips for a specific user.

First you need to click on `Register your application` (Deine Anwendung registrieren). This will open a new page to
create your application.

| Name                    | Description                                                                   |
|-------------------------|-------------------------------------------------------------------------------|
| **Name**                | Type in something that is unique twitch-wide. Like `YOURNAME-clip-randomizer` |
| **OAuth Redirect URLs** | Set it to `http://localhost`. We don't need it anyway                         |
| **Category**            | Set it to `Other`                                                             |
| **Organisation**        | Leave it empty                                                                |

Check the reCAPTCHA and click `Create`. The interface will close, click on the `Manage`-button right next to your newly
created application.

| Name       | Description                                                                                            |
|------------|--------------------------------------------------------------------------------------------------------|
| Client-ID  | Copy this value, we need it for later!                                                                 |
| New Secret | Click this button, an alert will popup, click OK and a secret will appear. Copy it, we need this, too! |

## Configuration in index.html

For simplicity, we already added all you need in index.html. 

Open it with an editor of your liking and change the values below.
Everything including the {{ and }} need to be replaces. For example, a list of streamers should look like `['aaricdev', 'someone_else']`,
**NOT** like this `['{{aaricdev}}']`. 

```javascript
const clipsRandomizer = new SimplyStream.TwitchClipsRandomizer({
    clientId: '{{CLIENT_ID}}', // This is the client id you copied the step before 
    clientSecret: '{{CLIENT_SECRET}}', // This is the client secret you copiet the step before
    streamers: ['{{STREAMER_1}}', '{{STREAMER_2}}'], // Just add all the streamers (max. 100) you want to show of, or just yourself
    quality: null, // 360, 480, 720, null for 1080
    displayConfiguration: {
        hideAll: false, // Completely hides the dark backdrop on top
        gameName: true, // Show/Hide the games game 
        clipTitle: true, // Show/Hide the clip title
        streamerName: true // Show/Hide the streamers name
    }
});
```

You're done. Put it as local browsersource into your OBS scene and don't forget to check the "Disable, when source is
not visible" checkbox!
