import { ApiClient, ClientCredentialsAuthProvider } from 'twitch';

export class TwitchClipsRandomizer {
    protected readonly twitchApi: ApiClient;
    protected streamers$: Promise<{ name: string, id: string, displayName: string }[]>;
    protected streamerIterator: { name: string, id: string, displayName: string }[] = [];
    protected videoSource: HTMLVideoElement;
    protected loadingSpinner: HTMLElement;
    protected quality?: number;

    protected displayConfiguration: { hideAll: boolean, gameName: boolean, clipTitle: boolean, streamerName: boolean } = {
        hideAll: false,
        gameName: true,
        clipTitle: true,
        streamerName: true,
    };

    constructor(options: { clientId: string, clientSecret: string, streamers: string[], quality?: number, container?: string, displayConfiguration: { hideAll: boolean, gameName: boolean, clipTitle: boolean, streamerName: boolean } }) {
        const {streamers, quality, clientId, clientSecret, displayConfiguration} = options;
        const authProvider = new ClientCredentialsAuthProvider(clientId, clientSecret);
        this.twitchApi = new ApiClient({authProvider});

        if (streamers.length > 100) {
            throw Error('You are only allowed to have less than 100 streamers');
        }

        this.displayConfiguration = Object.assign({}, this.displayConfiguration, displayConfiguration);

        this.quality = quality;
        this.streamers$ = this.twitchApi.helix.users.getUsersByNames(streamers).then(helixUsers => {
            return helixUsers.map(streamer => ({
                name: streamer.name,
                id: streamer.id,
                displayName: streamer.displayName,
            }));
        });

        this.loadingSpinner = document.getElementById('loadingSpinner');

        this.videoSource = document.getElementById('twitchClip') as HTMLVideoElement;
        this.videoSource.onended = this.loop.bind(this);
        this.videoSource.onplaying = () => this.loadingSpinner.hidden = true;
        this.videoSource.onwaiting = () => this.loadingSpinner.hidden = false;
        this.videoSource.oncanplaythrough = () => {
            this.loadingSpinner.hidden = true;
            this.videoSource.play();
        };

        if (displayConfiguration.hideAll) {
            document.getElementById('backdrop').style.visibility = 'hidden';
        }
    }

    public start(): void {
        this.loop();
    }

    protected async loop(): Promise<void> {
        if (this.streamerIterator.length === 0) {
            this.streamerIterator = [...(await this.streamers$)];
        }

        let index = Math.floor(Math.random() * this.streamerIterator.length);
        const streamer = this.streamerIterator[index];
        this.streamerIterator.splice(index, 1);

        const {data} = await this.twitchApi.helix.clips.getClipsForBroadcaster(streamer.id, {limit: 100});
        const clip = data[Math.floor(Math.random() * data.length)];

        const clipElement = document.getElementById('clip');
        const gameElement = document.getElementById('game');
        const streamerNameElement = document.getElementById('streamerName');

        if (!this.displayConfiguration.hideAll) {
            if (this.displayConfiguration.gameName) {
                const game = await clip.getGame();
                gameElement.innerHTML = game.name;

                if (this.displayConfiguration.clipTitle) {
                    gameElement.innerHTML += ' - ';
                }
            }

            if (this.displayConfiguration.streamerName) {
                streamerNameElement.innerHTML = streamer.displayName;
            }

            if (this.displayConfiguration.clipTitle) {
                clipElement.innerHTML = clip.title;
            }
        }

        this.videoSource.poster = clip.thumbnailUrl;
        this.videoSource.setAttribute('src', clip.thumbnailUrl.replace('-preview-480x272.jpg', `${this.quality ? '-' + this.quality : ''}.mp4`));
        this.videoSource.load();
    }
}
