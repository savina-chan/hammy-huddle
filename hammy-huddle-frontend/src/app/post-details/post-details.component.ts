import { Component } from '@angular/core';
import { Post } from '../forum-page/forum-page.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrl: './post-details.component.scss'
})
export class PostDetailsComponent {

  // post: Post | undefined;

  // constructor(private route: ActivatedRoute) { }

  // ngOnInit(): void {
  //   this.route.paramMap.subscribe(params => {
  //     const postId = params.get('id');
  //     if(postId) {
  //       this.post = this.getPostById(postId);
  //     }
  //   });
  // }

  // getPostById(id: string) {
  //   return undefined;
  // }

}
