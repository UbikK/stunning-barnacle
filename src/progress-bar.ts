import { css, CSSResultGroup, html, LitElement, unsafeCSS } from "lit";
import { customElement, state } from "lit/decorators.js";
import videojs, { VideoJsPlayer } from "video.js";
import videojsStyle from 'video.js/dist/video-js.min.css';

@customElement('app-progress-bar')
export class ProgressBar extends LitElement {
    static styles?: CSSResultGroup | undefined = [
        unsafeCSS(videojsStyle),
        css`
            #progressbar {
                width: 100%;
                height: 100%;
                display: flex;
                flex-direction: column;
            }

            .vjs-progress-control {
                width: 100% !important;
            }

            .comments {
                height: 100%;
                width: 100%;
            }
        `
    ]
    constructor() {
        super();
        this.player = videojs.getAllPlayers()[0];
    }
    @state()
    player: VideoJsPlayer;

    firstUpdated(): void {
        const container = this.shadowRoot?.querySelector('#progressbar');
        const controlsFactory = videojs.getComponent('ProgressControl')

        const controls = new controlsFactory(this.player);

        container?.appendChild(controls.el())
    }
    render() {
        return html`
            <div id="progressbar" class="video-js"></div>
        `
    }
}