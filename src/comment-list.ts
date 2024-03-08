import { CSSResultGroup, html, LitElement, css } from "lit";
import { customElement, state } from "lit/decorators.js";

export type CommentType = {
    text: string;
    start: number;
    end?: number
}

@customElement('app-comment-list')
export class CommentList extends LitElement{
    static styles?: CSSResultGroup | undefined = [
        css`
            div {
                height: 100%;
            }

            .comment {
                position: absolute
            }
        `
    ]

    constructor(){
        super();
        this.comments = [{
            text: 'comment',
            start: 12
        }, {
            text: 'autre comment',
            start: 20,
            end: 24
        }];
    }

    @state()
    comments: Array<CommentType>

    render() {
        return html`
            <div>
                    ${
                        this.comments.map(
                            c => html`<app-comment .comment="${c}"></app-comment>`
                        )   
                    }                    
            </div>
        `
    }
}