import { Observable, Subscription } from "rxjs";

export interface Post {
  id: string;
  email: string;
  image: string;
  description: string;
  date: string;
  storageid: string;
  url: string;
  nbLikes : Observable<number>;
}

export interface PostWithoutId {
  email: string;
  image: string;
  description: string;
  date: string;
  storageid: string;
  url: string;
}
