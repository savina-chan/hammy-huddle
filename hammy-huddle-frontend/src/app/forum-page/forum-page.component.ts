import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

export interface Post {
  title: string;
  author: string;
  content: string;
  tags: string[];
  images: [];
  postId: string;
  showFullContent: boolean;
}

@Component({
  selector: 'app-forum-page',
  templateUrl: './forum-page.component.html',
  styleUrl: './forum-page.component.scss'
})

export class ForumPageComponent implements OnInit {

  constructor(private apiService: ApiService, private router: Router) {}

  displayTags: Array<string> = ["Rainbow Bridge", "Setup Tour", "Discussions", "Funny Hammy", "Cute Hammy"];

  posts: Post[] = [];
  filteredPosts: Post[] = [];
  paginatedPosts: Post[] = [];
  pageSize: number = 5;
  currentPage: number = 0;
  filters: string[] = [];

  editing: boolean = false;

  // Form Data
  title: string = ""
  content: string = ""
  tags: string[] = [];
  images: [] = []; // ?

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  ngOnInit(): void {
    this.getPosts();
  }

  toggleEditing(): void {
    this.editing = !this.editing
  }

  filterSet(tag: string) {
    const index = this.filters.indexOf(tag);
    if (index === -1) {
      this.filters.push(tag);
    } else {
      this.filters.splice(index, 1);
    }
    this.applyFilters();
  }

  applyFilters() {
    if (this.filters.length === 0) {
      this.filteredPosts = this.posts;
    } else {
      this.filteredPosts = this.posts.filter(post =>
        post.tags.some(tag => this.filters.includes(tag))
      );
    }
    this.updatePaginatedPosts();
  }

  tagSet(tag: string) {
    const index = this.tags.indexOf(tag);
    if (index === -1) {
      this.tags.push(tag);
    } else {
      this.tags.splice(index, 1);
    }
  }

  sendPost() {
    const payload = {
      // username will be determined at the server
      title: this.title,
      content: this.content,
      tags: this.tags,
      images: this.images
    }

    this.apiService.sendForumPost(payload)
      .subscribe((response: any) => {
        null;
      }, (error: any) => {
        console.error('Error:', error);
      });

    this.clearForm();
    this.toggleEditing();
    this.getPosts();
  }

  parsePostData(response: Post[]) {
    this.posts = [];
    for (let i of response) {
      const post: Post = {
        title: i.title,
        author: i.author,
        content: i.content,
        tags: i.tags,
        images: i.images,
        postId: i.postId,
        showFullContent: false
      };
      this.posts.unshift(post);
    }
    this.filteredPosts = this.posts;
    this.updatePaginatedPosts();
  }

  getPosts() {
    this.apiService.getForumPost()
      .subscribe((response: any) => {
        if (response && Array.isArray(response)) {
          this.parsePostData(response);
        }
      }, (error: any) => {
        console.error('Error:', error);
      });
  }

  clearForm() {
    this.title = "";
    this.content = "";
    this.tags = [];
    this.images = [];
  }

  updatePaginatedPosts(): void {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedPosts = this.filteredPosts.slice(startIndex, endIndex);
  }

  handlePageEvent(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.updatePaginatedPosts();
  }

  toggleContent(post: Post) {
    post.showFullContent = !post.showFullContent;
  }

  navToPost(id: string) {
    this.router.navigate(["/post",id])
  }
}
