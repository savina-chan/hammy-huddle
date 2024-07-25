import { Component, OnInit } from '@angular/core';
import { Post } from '../forum-page/forum-page.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';

  export interface Replies {
    author: string;
    content: string;
    parentId: string;
    replyId: string;
  }

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss'] // Use 'styleUrls' instead of 'styleUrl'
})
export class PostDetailsComponent implements OnInit {

  // export interface Post {
  //   title: string;
  //   author: string;
  //   content: string;
  //   tags: string[];
  //   images: [];
  //   postId: string;
  //   showFullContent: boolean;
  // }

  post: Post | undefined;
  editing: boolean = false;
  pageId: string | undefined;
  replies: Replies[] = [];

  // Form Data
  content: string = ""

  constructor(private route: ActivatedRoute, private apiService: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const postId = params.get('id');
      if (postId) {
        this.getPostById(postId);
        this.getReplies(postId);
        this.pageId = postId;
      }
    });
  }

  toggleEditing(): void {
    this.editing = !this.editing
  }

  sendReply() {
    if(this.pageId){
      const payload = {
        // username will be determined at the server
        content: this.content,
        parentId: this.pageId
      }
  
      this.apiService.sendForumReply(payload)
        .subscribe((response: any) => {
          if(this.pageId){
            this.getReplies(this.pageId);
          }
        }, (error: any) => {
          console.error('Error:', error);
        });
    }
  }

  getPostById(id: string): void {
    this.apiService.getForumPostById(id).subscribe(
      (response: Post) => {
        this.post = response;
      },
      (error: any) => {
        console.error('Error:', error);
      }
    );
  }

  parseReplies(response: Replies[]){
    this.replies = response.map(reply => ({
      author: reply.author,
      content: reply.content,
      parentId: reply.parentId,
      replyId: reply.replyId,
    }));
    console.log(this.replies)
  }

  getReplies(id: string): void {
    this.apiService.getForumPostRepliesById(id).subscribe(
      (response: any) => {
        if(response && Array.isArray(response)) {
          this.parseReplies(response);
        }
      },
      (error: any) => {
        console.error('Error:', error);
      }
    );
  }

  navForum() {
    this.router.navigate(['/forum']);
  }
}
