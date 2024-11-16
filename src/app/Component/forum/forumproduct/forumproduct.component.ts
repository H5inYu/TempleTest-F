import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavigationService } from 'src/app/Service/ForumService/Forum.service';

@Component({
  selector: 'app-forumproduct',
  templateUrl: './forumproduct.component.html',
  styleUrls: ['./forumproduct.component.css']
})
export class ForumproductComponent {

  posts: any[] = []; // 從 API 獲取的貼文
  currentTag: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 5;
  filteredPosts: any[] = [];
  paginatedPosts: any[] = [];
  totalPages: number = 1;
  randomPosts: any[] = [];

  constructor(private route: ActivatedRoute, private NavigationService: NavigationService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    switch (id) {
      case '1': this.currentTag = '商品心得'; break;
      case '2': this.currentTag = '購買建議'; break;
      case '3': this.currentTag = '促銷分享'; break;
      case '4': this.currentTag = '限時優惠'; break;
      case '5': this.currentTag = '隱藏版周邊'; break;
      default: this.currentTag = ''; break;
    }

    this.getPosts();
  }

  getPosts(): void {
    this.NavigationService.posts().subscribe({
      next: (data) => {
        this.posts = data;
        this.filterPosts(this.currentTag); // 獲取資料後過濾
        this.updatePaginatedPosts(); // 更新分頁
        this.displayRandomPosts(); // 更新隨機貼文顯示
      },
      error: (error) => {
        console.error('Failed to fetch posts:', error);
      }
    });
  }

  updatePaginatedPosts() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    this.paginatedPosts = this.filteredPosts.slice(startIndex, startIndex + this.itemsPerPage);
    this.totalPages = Math.ceil(this.filteredPosts.length / this.itemsPerPage);
  }

  goToPreviousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedPosts();
    }
  }

  goToNextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedPosts();
    }
  }

  filterPosts(tag: string) {
    this.currentTag = tag;
    this.currentPage = 1;
    this.filteredPosts = this.posts.filter(post => post.tag === this.currentTag);
    this.updatePaginatedPosts();
  }

  searchPosts(event: Event) {
    const input = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredPosts = this.posts.filter(post =>
      post.tag === this.currentTag && post.poTitle.toLowerCase().includes(input)
    );
    this.updatePaginatedPosts();
  }

  // 隨機選取 n 篇貼文
  getRandomPosts(n: number): any[] {
    const shuffled = [...this.posts].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, n);
  }

  displayRandomPosts() {
    this.randomPosts = this.getRandomPosts(5);
  }
}
