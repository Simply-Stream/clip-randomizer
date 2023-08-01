# 🚀 Welcome to the offline twitch clip randomizer!

This project is the offline version of https://simply-stream.com/tools/randomclips.

```
npm run build
```

or

```
yarn build
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

| Name                 | Description                                                                                                                                                                                                                                                         | Mandatory                   |
|----------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------|
| standalone           | Controls whether to communicate directly with Twitch.tv or through Simply-Stream.                                                                                                                                                                                   | No                          |
| streamers            | A list of streamers that the randomizer should show.                                                                                                                                                                                                                | Yes                         |
| authentication       | A `clientId` and `clientSecret` or `accessToken`. Required to communicate with Twitch.tv.                                                                                                                                                                           | Yes, when standalone = true |
| allowedClipCreators  | A list of users. Only clips from these users will be shown.                                                                                                                                                                                                         | No                          |
| deniedClipCreators   | The opposite of `allowedClipCreators`. Clips by these users will not be shown.                                                                                                                                                                                      | No                          |
| allowedGame          | A list of game ids of games to show in clip rotation. You can use the [Simply-Stream randomizer url generator](https://simply-stream.com/tools/random-clips/) to find out which ID you can place here.                                                              | No                          |
| deniedGame           | A list of game ids of games to ignore in clip rotation. You can use the [Simply-Stream randomizer url generator](https://simply-stream.com/tools/random-clips/) to find out which ID you can place here.                                                            | No                          |
| hideInfo             | This will control whether to show or hide the clip information completely.                                                                                                                                                                                          | No                          |
| information.streamer | Show the streamers display name. Requires `hideInfo` to be `false`.                                                                                                                                                                                                 | No                          |
| information.game     | Show the games name. Requires `hideInfo` to be `false`.                                                                                                                                                                                                             | No                          |
| information.clip     | Show the clips name. Requires `hideInfo` to be `false`.                                                                                                                                                                                                             | No                          |
| startedAt            | A time span in months. Defines how old a clip can be. For example, setting this to 2 will only show clips that are younger than 2 months + 1 week (1 week is default, if `endedAt` is not set)                                                                      | No                          |
| endedAt              | This is the other part of the `startedAt` time span and only works when setting `startedAt`. Setting `startedAt` to 6 and `endedAt` to 4 will only show clips that are 6 to 4 months old. Newer will be ignored. `endedAt` has to be lower than `startedAt` to work | No                          |
| quality              | One of the following values: 160, 360, 480, 720 or 1080. 1080 is default, when quality equals `null`, an empty string `""` or not existend                                                                                                                          | No                          |

Open it with an editor of your liking and change the values below.

Full Configuration example:

```json
{
    "standalone": true,
    "streamers": [
        "streamer1",
        "streamer2",
        "etc"
    ],
    "authentication": {
        "clientId": "YOUR_CLIENT_ID",
        "clientSecret": "YOUR_CLIENT_SECRET"
    },
    "allowedClipCreators": null,
    "deniedClipCreators": null,
    "allowedGame": null,
    "deniedGame": null,
    "hideInfo": false,
    "information": {
        "streamer": true,
        "game": true,
        "clip": true
    },
    "startedAt": null,
    "endedAt": null,
    "quality": null
}
```

Reduced Configuration:

```json
{
    "standalone": true,
    "streamers": [
        "streamer1",
        "streamer2",
        "etc..."
    ],
    "authentication": {
        "clientId": "",
        "clientSecret": ""
    },
    "hideInfo": false,
    "information": {
        "streamer": true,
        "game": true,
        "clip": true
    }
}
```

Using an access token:

```json
{
    "standalone": true,
    "streamers": ["streamer1", "streamer2", "etc..."],
    "authentication": {
        "clientId": "YOUR_CLIENT_ID",
        "accessToken": "oauth:YOUR_TOKEN"
    },
    "hideInfo": false,
    "information": {
        "streamer": true,
        "game": true,
        "clip": true
    }
}
```

You're done. Put it as local BrowserSource into your OBS scene and don't forget to check the "Disable, when source is
not visible" checkbox!

In case you need help configuring this, don't hesitate to ask me on Discord, Twitter (I'll never call it by its shitty
new name) or GitHub!
