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

Open it with an editor of your liking and change the values below.
The only required values here are the following:

- streamers
- authentication
- hideInfo
- If hideInfo is false, information is mandatory

You can delete everything else. Please note, that this must be a valid JSON format. In case you need help figuring out how this should look like, you can search for "JSON validator" on your favorite search engine.

Full Configuration example:
```html

<script id="config-data" type="application/json">
    {
        "streamers": ["streamer1", "streamer2", "etc..."],
        "authentication": {
            "clientId": "",
            "clientSecret": ""
        },
        "allowedClipCreators": "",
        "deniedClipCreators": "",
        "allowedGame": "",
        "deniedGame": "",
        "hideInfo": false,
        "information": {
            "streamer": true,
            "game": true,
            "clip": true
        },
        "startedAt": 0,
        "endedAt": 0,
        "quality": ""
    }
</script>
```

Reduced Configuration:

```html

<script id="config-data" type="application/json">
    {
        "streamers": ["streamer1", "streamer2", "etc..."],
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
</script>
```

Using an access token:


```html

<script id="config-data" type="application/json">
    {
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
</script>
```

You're done. Put it as local BrowserSource into your OBS scene and don't forget to check the "Disable, when source is
not visible" checkbox!

In case you need help configuring this, don't hesitate to ask me on Discord, Twitter (I'll never call it by its shitty new name) or GitHub!
