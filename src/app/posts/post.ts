export class Post {
  title: string;
  body: string;
}

export interface PostsResponse {
  results: Post[];
}