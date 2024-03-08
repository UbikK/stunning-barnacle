import { css, CSSResultGroup, html, LitElement, unsafeCSS } from "lit";
import { customElement } from "lit/decorators.js";
import videojs from "video.js";
import videojsStyle from 'video.js/dist/video-js.min.css';

const player = videojs.getAllPlayers()[0];

const playButtonFact = videojs.getComponent('PlayToggle');
const volumeFact = videojs.getComponent('VolumePanel');
const spacerFact = videojs.getComponent('CustomControlSpacer');
const fsButtonFact = videojs.getComponent('FullscreenToggle');
const playbackFact = videojs.getComponent('PlaybackRateMenuButton');
const currentTimeFact = videojs.getComponent('CurrentTimeDisplay');
const timeDividerFact = videojs.getComponent('TimeDivider');
const durationDisplayFact =  videojs.getComponent('DurationDisplay');

@customElement('app-video-controls')
export class VideoControls extends LitElement {
    static styles?: CSSResultGroup | undefined = [
        unsafeCSS(videojsStyle),
        css`
            #controls {
                width: 100%;
                min-height: 50px;
                display: flex;
            }

            .spacer{
                display: flex !important;
                flex-grow: 1
            }

            .playback {
                height: 50px !important;
            }

            .playbackMenu {
                display: block !important;
                bottom: 2em !important;
            }
            
        `
    ]
    constructor() {
        super();
    }

    protected firstUpdated(): void {
        const container = this.shadowRoot?.querySelector('#controls');

        container?.appendChild(new playButtonFact(player).el());

        container?.appendChild(new volumeFact(player).el());

        container?.appendChild(new currentTimeFact(player).el());
        container?.appendChild(new timeDividerFact(player).el());
        container?.appendChild(new durationDisplayFact(player).el());

        const spacer = new spacerFact(player);
        spacer.addClass('spacer');
        container?.appendChild(spacer.el());

        const playBackButton = new playbackFact(player);
        playBackButton.addClass('playback')
        
        playBackButton.on('mouseenter', () =>  {
            this.shadowRoot?.querySelector('.vjs-menu')?.classList.add('playbackMenu')
        })

        playBackButton.on('mouseleave', () =>  {
            this.shadowRoot?.querySelector('.vjs-menu')?.classList.remove('playbackMenu')
        })

        container?.appendChild(playBackButton.el());
        container?.appendChild(new fsButtonFact(player).el());
    }

    render() {
        return html`
            <div id="controls" class="video-js"></div>
        `
    }
}