import { css, html, LitElement } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import videojs from "video.js";
import { CommentType } from "./comment-list";

@customElement('app-comment')
export class Comment extends LitElement{
    static styles = [
        css`
            .comment {
                width: 100%;
                height: 2em;
            }
        `
    ]

    @property({type: Object})
    comment: CommentType = {text: '', start: 0};

    constructor() {
        super();
    }

    protected firstUpdated(): void {
        console.info(this.comment);
        const player = videojs.getAllPlayers()[0];
        this.position = (this.comment.start / player.duration())*100;
        console.info('duration', player.duration())
        console.info(this.position)
    }

    @state()
    position: number = 0;

    handleClick = (time: number) => {
        console.info('clicked');
        // player.currentTime(time);
    }

    render() {
        return html`
            <div class="comment">
                <button @click=${() => this.handleClick(this.comment.start)}>${this.comment.text}</button>
            </div>
        `
    }
}