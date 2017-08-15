import { Component, Input } from '@angular/core';

import { Post } from './post';

@Component({
  selector: 'posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.less']
})

export class PostsComponent {
  @Input() list: Post[];
}