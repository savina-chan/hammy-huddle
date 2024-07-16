import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

interface Post {
  title: string;
  author: string;
  content: string;
  tags: string[];
  images:[];
  showFullContent: boolean; // Add this property
}

@Component({
  selector: 'app-forum-page',
  templateUrl: './forum-page.component.html',
  styleUrl: './forum-page.component.scss'
})

export class ForumPageComponent implements OnInit {

  samplePost: Post[] = [
    {
      title: "Adorable Hamster Habits",
      author: "Jane Doe",
      content: "Hamsters are small, nocturnal rodents that are loved by many as pets. They have a variety of adorable habits that make them a joy to watch. One of the most entertaining behaviors is when they stuff their cheeks with food, storing it for later. Additionally, hamsters love to run on their exercise wheels, often spending hours doing so. They are also known for their curious nature, exploring every nook and cranny of their habitat. If you’re considering getting a hamster, be prepared for endless entertainment and cuteness!",
      tags: ["Cute Hammy", "Funny Hammy", "Discussions"],
      images: [],
      showFullContent: false
    },
    {
      title: "Setting Up the Perfect Hamster Habitat",
      author: "John Smith",
      content: "Creating a comfortable and stimulating environment for your hamster is crucial for its well-being. Start with a spacious cage, preferably with multiple levels. Provide bedding made from paper or aspen shavings. Add hiding spots, tunnels, and an exercise wheel. Make sure to include a water bottle and a food dish. Clean the habitat regularly to keep your hamster healthy and happy.",
      tags: ["Setup Tour", "Discussions"],
      images: [],
      showFullContent: false
    },
    {
      title: "Understanding the Rainbow Bridge",
      author: "Emily Johnson",
      content: "The Rainbow Bridge is a concept that many pet owners find comfort in. It's said that when a pet passes away, they cross the Rainbow Bridge and wait for their owners in a peaceful, beautiful place. For hamster owners, losing a small pet can be just as heartbreaking as losing a larger one. Remembering the joy they brought and thinking of them at the Rainbow Bridge can help in the grieving process.",
      tags: ["Rainbow Bridge", "Discussions"],
      images: [],
      showFullContent: false
    },
    {
      title: "Hamster Wheel Setup Tips",
      author: "Mike Brown",
      content: "One of the essential accessories for a hamster's habitat is an exercise wheel. Choose a wheel that is the right size for your hamster; it should be large enough so that the hamster's back does not arch while running. Silent wheels are preferable to avoid noise disturbance. Ensure the wheel is secure and does not have gaps where the hamster's feet could get caught.",
      tags: ["Setup Tour", "Discussions"],
      images: [],
      showFullContent: false
    },
    {
      title: "Funny Hamster Moments",
      author: "Sarah White",
      content: "Hamsters can be surprisingly funny with their antics. From stuffing their cheeks to the brim with food to running in their wheels with wild abandon, these little creatures can provide endless entertainment. Share your funniest hamster moments and let's enjoy some laughs together!",
      tags: ["Funny Hammy", "Discussions"],
      images: [],
      showFullContent: false
    },
    {
      title: "The Cutest Hamster Breeds",
      author: "Anna Green",
      content: "There are many breeds of hamsters, each with its own unique charm. Syrian hamsters, with their large size and docile nature, are often considered the cutest. Dwarf hamsters, like Roborovski and Campbell’s, are tiny and full of energy. Share pictures of your adorable hamsters and let's discuss which breed is the cutest!",
      tags: ["Cute Hammy", "Discussions"],
      images: [],
      showFullContent: false
    },
    {
      title: "Adorable Hamster Habits",
      author: "Jane Doe",
      content: "Hamsters are small, nocturnal rodents that are loved by many as pets. They have a variety of adorable habits that make them a joy to watch. One of the most entertaining behaviors is when they stuff their cheeks with food, storing it for later. Additionally, hamsters love to run on their exercise wheels, often spending hours doing so. They are also known for their curious nature, exploring every nook and cranny of their habitat. If you’re considering getting a hamster, be prepared for endless entertainment and cuteness!",
      tags: ["Cute Hammy", "Funny Hammy", "Discussions"],
      images: [],
      showFullContent: false
    },
    {
      title: "Setting Up the Perfect Hamster Habitat",
      author: "John Smith",
      content: "Creating a comfortable and stimulating environment for your hamster is crucial for its well-being. Start with a spacious cage, preferably with multiple levels. Provide bedding made from paper or aspen shavings. Add hiding spots, tunnels, and an exercise wheel. Make sure to include a water bottle and a food dish. Clean the habitat regularly to keep your hamster healthy and happy.",
      tags: ["Setup Tour", "Discussions"],
      images: [],
      showFullContent: false
    },
    {
      title: "Understanding the Rainbow Bridge",
      author: "Emily Johnson",
      content: "The Rainbow Bridge is a concept that many pet owners find comfort in. It's said that when a pet passes away, they cross the Rainbow Bridge and wait for their owners in a peaceful, beautiful place. For hamster owners, losing a small pet can be just as heartbreaking as losing a larger one. Remembering the joy they brought and thinking of them at the Rainbow Bridge can help in the grieving process.",
      tags: ["Rainbow Bridge", "Discussions"],
      images: [],
      showFullContent: false
    },
    {
      title: "Hamster Wheel Setup Tips",
      author: "Mike Brown",
      content: "One of the essential accessories for a hamster's habitat is an exercise wheel. Choose a wheel that is the right size for your hamster; it should be large enough so that the hamster's back does not arch while running. Silent wheels are preferable to avoid noise disturbance. Ensure the wheel is secure and does not have gaps where the hamster's feet could get caught.",
      tags: ["Setup Tour", "Discussions"],
      images: [],
      showFullContent: false
    },
    {
      title: "Funny Hamster Moments",
      author: "Sarah White",
      content: "Hamsters can be surprisingly funny with their antics. From stuffing their cheeks to the brim with food to running in their wheels with wild abandon, these little creatures can provide endless entertainment. Share your funniest hamster moments and let's enjoy some laughs together!",
      tags: ["Funny Hammy", "Discussions"],
      images: [],
      showFullContent: false
    },
    {
      title: "The Cutest Hamster Breeds",
      author: "Anna Green",
      content: "There are many breeds of hamsters, each with its own unique charm. Syrian hamsters, with their large size and docile nature, are often considered the cutest. Dwarf hamsters, like Roborovski and Campbell’s, are tiny and full of energy. Share pictures of your adorable hamsters and let's discuss which breed is the cutest!",
      tags: ["Cute Hammy", "Discussions"],
      images: [],
      showFullContent: false
    },
    {
      title: "Adorable Hamster Habits",
      author: "Jane Doe",
      content: "Hamsters are small, nocturnal rodents that are loved by many as pets. They have a variety of adorable habits that make them a joy to watch. One of the most entertaining behaviors is when they stuff their cheeks with food, storing it for later. Additionally, hamsters love to run on their exercise wheels, often spending hours doing so. They are also known for their curious nature, exploring every nook and cranny of their habitat. If you’re considering getting a hamster, be prepared for endless entertainment and cuteness!",
      tags: ["Cute Hammy", "Funny Hammy", "Discussions"],
      images: [],
      showFullContent: false
    },
    {
      title: "Setting Up the Perfect Hamster Habitat",
      author: "John Smith",
      content: "Creating a comfortable and stimulating environment for your hamster is crucial for its well-being. Start with a spacious cage, preferably with multiple levels. Provide bedding made from paper or aspen shavings. Add hiding spots, tunnels, and an exercise wheel. Make sure to include a water bottle and a food dish. Clean the habitat regularly to keep your hamster healthy and happy.",
      tags: ["Setup Tour", "Discussions"],
      images: [],
      showFullContent: false
    },
    {
      title: "Understanding the Rainbow Bridge",
      author: "Emily Johnson",
      content: "The Rainbow Bridge is a concept that many pet owners find comfort in. It's said that when a pet passes away, they cross the Rainbow Bridge and wait for their owners in a peaceful, beautiful place. For hamster owners, losing a small pet can be just as heartbreaking as losing a larger one. Remembering the joy they brought and thinking of them at the Rainbow Bridge can help in the grieving process.",
      tags: ["Rainbow Bridge", "Discussions"],
      images: [],
      showFullContent: false
    },
    {
      title: "Hamster Wheel Setup Tips",
      author: "Mike Brown",
      content: "One of the essential accessories for a hamster's habitat is an exercise wheel. Choose a wheel that is the right size for your hamster; it should be large enough so that the hamster's back does not arch while running. Silent wheels are preferable to avoid noise disturbance. Ensure the wheel is secure and does not have gaps where the hamster's feet could get caught.",
      tags: ["Setup Tour", "Discussions"],
      images: [],
      showFullContent: false
    },
    {
      title: "Funny Hamster Moments",
      author: "Sarah White",
      content: "Hamsters can be surprisingly funny with their antics. From stuffing their cheeks to the brim with food to running in their wheels with wild abandon, these little creatures can provide endless entertainment. Share your funniest hamster moments and let's enjoy some laughs together!",
      tags: ["Funny Hammy", "Discussions"],
      images: [],
      showFullContent: false
    },
    {
      title: "The Cutest Hamster Breeds",
      author: "Anna Green",
      content: "There are many breeds of hamsters, each with its own unique charm. Syrian hamsters, with their large size and docile nature, are often considered the cutest. Dwarf hamsters, like Roborovski and Campbell’s, are tiny and full of energy. Share pictures of your adorable hamsters and let's discuss which breed is the cutest!",
      tags: ["Cute Hammy", "Discussions"],
      images: [],
      showFullContent: false
    },
    {
      title: "Adorable Hamster Habits",
      author: "Jane Doe",
      content: "Hamsters are small, nocturnal rodents that are loved by many as pets. They have a variety of adorable habits that make them a joy to watch. One of the most entertaining behaviors is when they stuff their cheeks with food, storing it for later. Additionally, hamsters love to run on their exercise wheels, often spending hours doing so. They are also known for their curious nature, exploring every nook and cranny of their habitat. If you’re considering getting a hamster, be prepared for endless entertainment and cuteness!",
      tags: ["Cute Hammy", "Funny Hammy", "Discussions"],
      images: [],
      showFullContent: false
    },
    {
      title: "Setting Up the Perfect Hamster Habitat",
      author: "John Smith",
      content: "Creating a comfortable and stimulating environment for your hamster is crucial for its well-being. Start with a spacious cage, preferably with multiple levels. Provide bedding made from paper or aspen shavings. Add hiding spots, tunnels, and an exercise wheel. Make sure to include a water bottle and a food dish. Clean the habitat regularly to keep your hamster healthy and happy.",
      tags: ["Setup Tour", "Discussions"],
      images: [],
      showFullContent: false
    },
    {
      title: "Understanding the Rainbow Bridge",
      author: "Emily Johnson",
      content: "The Rainbow Bridge is a concept that many pet owners find comfort in. It's said that when a pet passes away, they cross the Rainbow Bridge and wait for their owners in a peaceful, beautiful place. For hamster owners, losing a small pet can be just as heartbreaking as losing a larger one. Remembering the joy they brought and thinking of them at the Rainbow Bridge can help in the grieving process.",
      tags: ["Rainbow Bridge", "Discussions"],
      images: [],
      showFullContent: false
    },
    {
      title: "Hamster Wheel Setup Tips",
      author: "Mike Brown",
      content: "One of the essential accessories for a hamster's habitat is an exercise wheel. Choose a wheel that is the right size for your hamster; it should be large enough so that the hamster's back does not arch while running. Silent wheels are preferable to avoid noise disturbance. Ensure the wheel is secure and does not have gaps where the hamster's feet could get caught.",
      tags: ["Setup Tour", "Discussions"],
      images: [],
      showFullContent: false
    },
    {
      title: "Funny Hamster Moments",
      author: "Sarah White",
      content: "Hamsters can be surprisingly funny with their antics. From stuffing their cheeks to the brim with food to running in their wheels with wild abandon, these little creatures can provide endless entertainment. Share your funniest hamster moments and let's enjoy some laughs together!",
      tags: ["Funny Hammy", "Discussions"],
      images: [],
      showFullContent: false
    },
    {
      title: "The Cutest Hamster Breeds",
      author: "Anna Green",
      content: "There are many breeds of hamsters, each with its own unique charm. Syrian hamsters, with their large size and docile nature, are often considered the cutest. Dwarf hamsters, like Roborovski and Campbell’s, are tiny and full of energy. Share pictures of your adorable hamsters and let's discuss which breed is the cutest!",
      tags: ["Cute Hammy", "Discussions"],
      images: [],
      showFullContent: false
    }];
  paginatedPosts: Post[] = [];
  pageSize: number = 5;
  currentPage: number = 0;

  editting:boolean = false;

  // Form Data
  title: string = ""
  content:string = ""
  tags:string[] = [];
  images:[] = []; // ?

  toggleEditting(): void {
    this.editting = !this.editting
  }

  tagSet(tag: string) {
    const index = this.tags.indexOf(tag);
    if(index == -1){
      this.tags.push(tag);
    } else {
      this.tags.splice(index, 1)
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

    console.log(payload)
    this.clearForm()
  
  }

  clearForm() {
    this.title = "";
    this.content = "";
    this.tags = [];
    this.images = [];
  }

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  ngOnInit(): void {
    this.updatePaginatedPosts();
  }

  updatePaginatedPosts(): void {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedPosts = this.samplePost.slice(startIndex, endIndex);
  }

  handlePageEvent(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.updatePaginatedPosts();
  }

  toggleContent(post: Post) {
    post.showFullContent = !post.showFullContent;
  }
}
