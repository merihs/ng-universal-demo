import { Injectable } from '@angular/core';

import { data } from './data';
import { PostService } from './post.service';

@Injectable()
export class Api {
  /**
   * Creates a new Api with the injected PostService.
   * @param {PostService} postService - The injected PostService.
   * @constructor
   */
  constructor(public postService: PostService) {}

  getData() {
    return data;
  }

  getPosts() {
    return this.postService.getPosts();
  }
}
