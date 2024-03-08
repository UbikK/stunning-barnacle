import { html, css, LitElement, PropertyValueMap, unsafeCSS } from 'lit'
import { customElement } from 'lit/decorators.js'
import videojs from 'video.js';
import videojsStyle from 'video.js/dist/video-js.min.css';
import { ProgressBar } from './progress-bar';

@customElement('my-element')
export class MyElement extends LitElement {
  static styles = [
    unsafeCSS(videojsStyle),
    css`
    :host {
      display: block;
      border: solid 1px gray;
      padding: 16px;
      max-width:100%;
    }

    .player {
      height: 500px;
      width: 100%;
    }

    .subpanel {
      background-color: black;
    }
  `]

  protected firstUpdated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
    const player = this.shadowRoot?.querySelector('#vid1') as Element;
    videojs(player, {
      // controls: true,
      preload: 'auto',
      playbackRates:[0.5, 1, 2],
      bigPlayButton: true,
      muted: true,
      controlBar: {
        currentTimeDisplay: true,
        durationDisplay: true,
        timeDivider: true
      }
    });
  }


  render() {
    return html`
      <video id="vid1" class="player video-js">
        <source src="//vjs.zencdn.net/v/oceans.mp4">
      </video>
      <!-- <slot name="app-control-bar"></slot>
      <slot name="app-comment-list"></slot> -->

      <div class="subpanel">
        <app-progress-bar></app-progress-bar>
        <app-comment-list></app-comment-list>
        <app-video-controls></app-video-controls>
      </div>
      
    `
  }

}

declare global {
  interface HTMLElementTagNameMap {
    'my-element': MyElement,
    'app-control-bar': ProgressBar
  }
}
