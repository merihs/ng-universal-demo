import { Component, Input } from '@angular/core';

import { Post } from './post';

@Component({
 selector: 'post',
 template: `
   <div *ngIf="post">
    <div class="title">{{post.title}}</div>
    <div class="body">{{post.body}}</div>
  </div>
 `,
 styleUrls: ['./post.component.less']
})
export class PostComponent {
 @Input() post: Post;
}