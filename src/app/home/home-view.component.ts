import { Component, OnInit } from '@angular/core';
import { TransferHttp } from '../../modules/transfer-http/transfer-http';
import { Observable } from 'rxjs/Observable';
import { Post } from '../posts/post';

@Component({
  selector: 'home-view',
  templateUrl: './home-view.component.html'
})
export class HomeView implements OnInit {
  public subs: Observable<string>;

  public allPosts: Observable<Post[]>;

  constructor(private http: TransferHttp) {}


  getPostsWithObservable(): Observable<Post[]> {
    return this.http.get('http://localhost:8000/posts').map(data => {
      return data;
    });
  }

  ngOnInit() {
    this.subs = this.http.get('http://localhost:8000/data').map(data => {
      return `${data.greeting} ${data.name}`;
    });

    this.allPosts = this.getPostsWithObservable(); 
  }
}
