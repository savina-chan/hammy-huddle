import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpHeaders,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpParams,
} from "@angular/common/http";
import { Observable } from "rxjs";
import { Login } from "./login";
import { Post } from "./forum-page/forum-page.component"
import { supervisor } from "./supervisor.service";

@Injectable({
  providedIn: "root",
})
export class ApiService {
  constructor(private http: HttpClient) {}

  url: string = "http://localhost:8080/";

  /* ***************** API ROUTES ******************* */

  sendRegister(data: { username: string; email: string; password: string }) {
    return this.http.post(this.url + "api/register", data);
  }

  sendLogin(data: { email: string; password: string }) {
    return this.http.post<Login>(this.url + "api/login", data);
  }

  sendForumPost(data:{title: string, content: string, tags: Array<string>, images: Array<string>}){
    const token = supervisor.getItem("token");
    if (token) {
      const headers = new HttpHeaders({
        authorization: token,
      });
      return this.http.post(this.url + "api/forumPost", data, {
        headers,
      });
    }
    // return an empty object
    return new Observable<Object>();
  }

  getForumPost(): Observable<Post[]>{
    return this.http.get<Post[]>(this.url + "api/getForumPosts");
  }

  /* ************* LOGIN HELPERS ************** */

  logout() {
    supervisor.removeItem("username");
    supervisor.removeItem("token");
  }

  checkLogInStatus() {
    const user = supervisor.getItem('username');
    const token = supervisor.getItem('token');
    if(user && token) {
      return [user, token]
    }
    return []
  }
}
