import { Component } from '@angular/core';

@Component({
  selector: 'app-forumactivity',
  templateUrl: './forumactivity.component.html',
  styleUrls: ['./forumactivity.component.css']
})
export class ForumactivityComponent {

  

  // 假資料，每個標籤 14 筆
  posts: any[] = [
    // 商品心得
    { 標題: '登山挑戰的心得分享', 作者: 'user001', 時間: '2024-11-05', 回覆數: 12, 瀏覽數: 3274, 標籤: '戶外冒險' },
    { 標題: '沙漠探險的準備', 作者: 'user002', 時間: '2024-11-06', 回覆數: 8, 瀏覽數: 2400, 標籤: '戶外冒險' },
    { 標題: '海上皮划艇初體驗', 作者: 'user003', 時間: '2024-11-07', 回覆數: 5, 瀏覽數: 1800, 標籤: '戶外冒險' },
    { 標題: '極限攀岩須知', 作者: 'user004', 時間: '2024-11-08', 回覆數: 10, 瀏覽數: 2900, 標籤: '戶外冒險' },
    { 標題: '森林徒步探險', 作者: 'user005', 時間: '2024-11-09', 回覆數: 7, 瀏覽數: 2300, 標籤: '戶外冒險' },
    { 標題: '北極圈之旅', 作者: 'user006', 時間: '2024-11-10', 回覆數: 14, 瀏覽數: 4200, 標籤: '戶外冒險' },
    { 標題: '雪山攀登挑戰', 作者: 'user007', 時間: '2024-11-11', 回覆數: 9, 瀏覽數: 2800, 標籤: '戶外冒險' },
    { 標題: '夜間探險心得', 作者: 'user008', 時間: '2024-11-12', 回覆數: 4, 瀏覽數: 1500, 標籤: '戶外冒險' },
    { 標題: '露營生存技巧', 作者: 'user009', 時間: '2024-11-13', 回覆數: 15, 瀏覽數: 3600, 標籤: '戶外冒險' },
    { 標題: '叢林探險注意事項', 作者: 'user010', 時間: '2024-11-14', 回覆數: 6, 瀏覽數: 2100, 標籤: '戶外冒險' },
    { 標題: '山間急流划船體驗', 作者: 'user011', 時間: '2024-11-15', 回覆數: 11, 瀏覽數: 2700, 標籤: '戶外冒險' },
    { 標題: '高山滑雪初體驗', 作者: 'user012', 時間: '2024-11-16', 回覆數: 13, 瀏覽數: 3000, 標籤: '戶外冒險' },
    { 標題: '沙灘沙雕比賽', 作者: 'user013', 時間: '2024-11-17', 回覆數: 9, 瀏覽數: 2600, 標籤: '戶外冒險' },
    { 標題: '叢林夜間生存技巧', 作者: 'user014', 時間: '2024-11-18', 回覆數: 10, 瀏覽數: 3400, 標籤: '戶外冒險' },
    { 標題: '野外動植物辨識', 作者: 'user015', 時間: '2024-11-19', 回覆數: 5, 瀏覽數: 2200, 標籤: '戶外冒險' },
    { 標題: '夜市必吃美食推薦', 作者: 'user101', 時間: '2024-11-05', 回覆數: 20, 瀏覽數: 5200, 標籤: '美食聚餐' },
    { 標題: '聚餐場地推薦', 作者: 'user102', 時間: '2024-11-06', 回覆數: 15, 瀏覽數: 4100, 標籤: '美食聚餐' },
    { 標題: '頂級燒肉體驗', 作者: 'user103', 時間: '2024-11-07', 回覆數: 25, 瀏覽數: 6200, 標籤: '美食聚餐' },
    { 標題: '無菜單料理分享', 作者: 'user104', 時間: '2024-11-08', 回覆數: 30, 瀏覽數: 7400, 標籤: '美食聚餐' },
    { 標題: '聚餐新選擇-異國料理', 作者: 'user105', 時間: '2024-11-09', 回覆數: 22, 瀏覽數: 5400, 標籤: '美食聚餐' },
    { 標題: '餐車美食之旅', 作者: 'user106', 時間: '2024-11-10', 回覆數: 18, 瀏覽數: 4300, 標籤: '美食聚餐' },
    { 標題: '米其林餐廳初體驗', 作者: 'user107', 時間: '2024-11-11', 回覆數: 28, 瀏覽數: 8000, 標籤: '美食聚餐' },
    { 標題: '家庭聚餐推薦餐廳', 作者: 'user108', 時間: '2024-11-12', 回覆數: 12, 瀏覽數: 3200, 標籤: '美食聚餐' },
    { 標題: '自助餐美食分享', 作者: 'user109', 時間: '2024-11-13', 回覆數: 7, 瀏覽數: 2600, 標籤: '美食聚餐' },
    { 標題: '大胃王挑戰', 作者: 'user110', 時間: '2024-11-14', 回覆數: 35, 瀏覽數: 9100, 標籤: '美食聚餐' },
    { 標題: '火鍋吃到飽推薦', 作者: 'user111', 時間: '2024-11-15', 回覆數: 40, 瀏覽數: 10200, 標籤: '美食聚餐' },
    { 標題: '地方美食推薦', 作者: 'user112', 時間: '2024-11-16', 回覆數: 18, 瀏覽數: 3800, 標籤: '美食聚餐' },
    { 標題: '美食節活動心得', 作者: 'user113', 時間: '2024-11-17', 回覆數: 14, 瀏覽數: 4000, 標籤: '美食聚餐' },
    { 標題: '生日派對餐廳推薦', 作者: 'user114', 時間: '2024-11-18', 回覆數: 9, 瀏覽數: 2200, 標籤: '美食聚餐' },
    { 標題: '特色咖啡館分享', 作者: 'user115', 時間: '2024-11-19', 回覆數: 5, 瀏覽數: 2600, 標籤: '美食聚餐' },
    { 標題: '健身房新手入門指南', 作者: 'user201', 時間: '2024-11-05', 回覆數: 16, 瀏覽數: 5400, 標籤: '運動健身' },
    { 標題: '戶外跑步的好處與技巧', 作者: 'user202', 時間: '2024-11-06', 回覆數: 12, 瀏覽數: 4600, 標籤: '運動健身' },
    { 標題: '瑜伽的健康益處', 作者: 'user203', 時間: '2024-11-07', 回覆數: 10, 瀏覽數: 3000, 標籤: '運動健身' },
    { 標題: '增肌飲食搭配攻略', 作者: 'user204', 時間: '2024-11-08', 回覆數: 18, 瀏覽數: 5500, 標籤: '運動健身' },
    { 標題: 'HIIT高強度間歇訓練', 作者: 'user205', 時間: '2024-11-09', 回覆數: 20, 瀏覽數: 6200, 標籤: '運動健身' },
    { 標題: '運動恢復的有效方法', 作者: 'user206', 時間: '2024-11-10', 回覆數: 15, 瀏覽數: 4800, 標籤: '運動健身' },
    { 標題: '核心訓練必備動作', 作者: 'user207', 時間: '2024-11-11', 回覆數: 14, 瀏覽數: 5300, 標籤: '運動健身' },
    { 標題: '健身房器材使用指南', 作者: 'user208', 時間: '2024-11-12', 回覆數: 8, 瀏覽數: 3100, 標籤: '運動健身' },
    { 標題: '長跑與耐力訓練技巧', 作者: 'user209', 時間: '2024-11-13', 回覆數: 22, 瀏覽數: 6400, 標籤: '運動健身' },
    { 標題: '自由重量與機械訓練', 作者: 'user210', 時間: '2024-11-14', 回覆數: 9, 瀏覽數: 2900, 標籤: '運動健身' },
    { 標題: '減脂運動建議', 作者: 'user211', 時間: '2024-11-15', 回覆數: 25, 瀏覽數: 7200, 標籤: '運動健身' },
    { 標題: '快速瘦身的訓練計劃', 作者: 'user212', 時間: '2024-11-16', 回覆數: 27, 瀏覽數: 8500, 標籤: '運動健身' },
    { 標題: '心肺訓練的好處', 作者: 'user213', 時間: '2024-11-17', 回覆數: 11, 瀏覽數: 3900, 標籤: '運動健身' },
    { 標題: '力量訓練入門', 作者: 'user214', 時間: '2024-11-18', 回覆數: 19, 瀏覽數: 6100, 標籤: '運動健身' },
    { 標題: '柔軟度提升技巧', 作者: 'user215', 時間: '2024-11-19', 回覆數: 6, 瀏覽數: 2700, 標籤: '運動健身' },
    { 標題: '第一次包車進香的注意事項', 作者: 'user301', 時間: '2024-11-05', 回覆數: 15, 瀏覽數: 3400, 標籤: '包車進香' },
    { 標題: '如何選擇合適的進香車隊', 作者: 'user302', 時間: '2024-11-06', 回覆數: 12, 瀏覽數: 2800, 標籤: '包車進香' },
    { 標題: '媽祖遶境包車經驗分享', 作者: 'user303', 時間: '2024-11-07', 回覆數: 20, 瀏覽數: 4100, 標籤: '包車進香' },
    { 標題: '進香路線規劃小技巧', 作者: 'user304', 時間: '2024-11-08', 回覆數: 18, 瀏覽數: 3700, 標籤: '包車進香' },
    { 標題: '進香時包車服務的選擇指南', 作者: 'user305', 時間: '2024-11-09', 回覆數: 10, 瀏覽數: 3200, 標籤: '包車進香' },
    { 標題: '進香必備物品清單', 作者: 'user306', 時間: '2024-11-10', 回覆數: 14, 瀏覽數: 2950, 標籤: '包車進香' },
    { 標題: '如何確保進香旅途的安全', 作者: 'user307', 時間: '2024-11-11', 回覆數: 25, 瀏覽數: 4500, 標籤: '包車進香' },
    { 標題: '進香車隊的費用和報價比較', 作者: 'user308', 時間: '2024-11-12', 回覆數: 9, 瀏覽數: 2800, 標籤: '包車進香' },
    { 標題: '夜間進香包車服務的優缺點', 作者: 'user309', 時間: '2024-11-13', 回覆數: 7, 瀏覽數: 3100, 標籤: '包車進香' },
    { 標題: '與友人包車進香的歡樂回憶', 作者: 'user310', 時間: '2024-11-14', 回覆數: 17, 瀏覽數: 3700, 標籤: '包車進香' },
    { 標題: '包車進香時的文化禮儀', 作者: 'user311', 時間: '2024-11-15', 回覆數: 8, 瀏覽數: 2500, 標籤: '包車進香' },
    { 標題: '進香車隊和巴士的比較', 作者: 'user312', 時間: '2024-11-16', 回覆數: 13, 瀏覽數: 3400, 標籤: '包車進香' },
    { 標題: '適合全家進香的包車方案', 作者: 'user313', 時間: '2024-11-17', 回覆數: 10, 瀏覽數: 2900, 標籤: '包車進香' },
    { 標題: '進香包車的最佳路線推薦', 作者: 'user314', 時間: '2024-11-18', 回覆數: 19, 瀏覽數: 4100, 標籤: '包車進香' },
    { 標題: '包車進香時如何安排行程', 作者: 'user315', 時間: '2024-11-19', 回覆數: 11, 瀏覽數: 2700, 標籤: '包車進香' },
    { 標題: '第一次參加媽祖繞境的心得', 作者: 'user401', 時間: '2024-11-05', 回覆數: 15, 瀏覽數: 4250, 標籤: '媽祖繞境' },
    { 標題: '媽祖繞境的路線推薦', 作者: 'user402', 時間: '2024-11-06', 回覆數: 18, 瀏覽數: 3875, 標籤: '媽祖繞境' },
    { 標題: '參加繞境前的準備事項', 作者: 'user403', 時間: '2024-11-07', 回覆數: 22, 瀏覽數: 4523, 標籤: '媽祖繞境' },
    { 標題: '夜間跟隨媽祖的體驗分享', 作者: 'user404', 時間: '2024-11-08', 回覆數: 17, 瀏覽數: 4012, 標籤: '媽祖繞境' },
    { 標題: '如何選擇適合的繞境裝備', 作者: 'user405', 時間: '2024-11-09', 回覆數: 13, 瀏覽數: 3758, 標籤: '媽祖繞境' },
    { 標題: '跟隨媽祖繞境的感人故事', 作者: 'user406', 時間: '2024-11-10', 回覆數: 19, 瀏覽數: 4221, 標籤: '媽祖繞境' },
    { 標題: '媽祖繞境的意義與文化', 作者: 'user407', 時間: '2024-11-11', 回覆數: 25, 瀏覽數: 4780, 標籤: '媽祖繞境' },
    { 標題: '媽祖繞境沿途的美食分享', 作者: 'user408', 時間: '2024-11-12', 回覆數: 10, 瀏覽數: 3354, 標籤: '媽祖繞境' },
    { 標題: '親友團一起參加媽祖繞境', 作者: 'user409', 時間: '2024-11-13', 回覆數: 20, 瀏覽數: 4155, 標籤: '媽祖繞境' },
    { 標題: '繞境過程中不可錯過的景點', 作者: 'user410', 時間: '2024-11-14', 回覆數: 8, 瀏覽數: 3290, 標籤: '媽祖繞境' },
    { 標題: '跟隨媽祖保平安的真實故事', 作者: 'user411', 時間: '2024-11-15', 回覆數: 18, 瀏覽數: 4001, 標籤: '媽祖繞境' },
    { 標題: '繞境中遇到的神奇經驗分享', 作者: 'user412', 時間: '2024-11-16', 回覆數: 12, 瀏覽數: 3612, 標籤: '媽祖繞境' },
    { 標題: '媽祖繞境時的注意事項', 作者: 'user413', 時間: '2024-11-17', 回覆數: 16, 瀏覽數: 3765, 標籤: '媽祖繞境' },
    { 標題: '最有趣的繞境活動回顧', 作者: 'user414', 時間: '2024-11-18', 回覆數: 21, 瀏覽數: 4256, 標籤: '媽祖繞境' },
    { 標題: '媽祖繞境的護駕故事', 作者: 'user415', 時間: '2024-11-19', 回覆數: 14, 瀏覽數: 3902, 標籤: '媽祖繞境' }
  ];

  currentTag: string = '商品心得';
  currentPage: number = 1;
  itemsPerPage: number = 5;
  randomPosts: any[] = [];
  ngOnInit(): void {
    this.filterPosts(this.currentTag);
    this.displayRandomPosts();  // 在初始化時顯示隨機貼文
  }

  // 過濾貼文
  filterPosts(tag: string) {
    console.log('rttt')
    this.currentTag = tag;
    this.currentPage = 1;
    this.renderPosts();
  }
  // 渲染隨機貼文
  displayRandomPosts() {
    const randomPostsContainer: any = document.getElementById('randomPostsContainer');
    randomPostsContainer.innerHTML = '';
  
 // 隨機選取5篇貼文
 this.randomPosts = this.getRandomPosts(5);

 this.randomPosts.forEach(post => {
   const postDiv = document.createElement('div');
   postDiv.className = 'single_review';
   postDiv.innerHTML = `
     <div class="img">
         <img src="/assets/images/default.jpg" alt="Reviewer" class="img-fluid w-100">
     </div>
     <div class="text">
         <h4><a href="#">${post.標題}</a></h4> <span>${post.時間}</span>
         <p>作者: ${post.作者} | 回覆: ${post.回覆數} | 瀏覽: ${post.瀏覽數}</p>
     </div>
   `;
   randomPostsContainer.appendChild(postDiv);
 });
}

// 隨機選取 n 篇貼文
getRandomPosts(n: number): any[] {
 const shuffled = [...this.posts].sort(() => 0.5 - Math.random());
 return shuffled.slice(0, n);
}
  // 渲染貼文
  renderPosts() {
    const filteredPosts = this.posts.filter(post => post.標籤 === this.currentTag);
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const paginatedPosts = filteredPosts.slice(startIndex, startIndex + this.itemsPerPage);

    const postContainer: any = document.getElementById('postContainer');
    postContainer.innerHTML = '';


    paginatedPosts.forEach(post => {
      const postDiv = document.createElement('div');
      postDiv.className = 'single_review';
      postDiv.innerHTML = `
                  <div class="img">
                      <img src="/assets/images/default.jpg" alt="Reviewer" class="img-fluid w-100">
                  </div>
                  <div class="text">
                      <h4><a href="#">${post.標題}</a></h4> <span>${post.時間}</span>
                      <p>作者: ${post.作者} | 回覆: ${post.回覆數} | 瀏覽: ${post.瀏覽數}</p>
                  </div>
              `;
      postContainer.appendChild(postDiv);
    });
    const pageDisplay: any = document.getElementById('pageDisplay')

    pageDisplay.innerText = this.currentPage;


      // // 切換頁面
      // changePage(direction) {
      //   const filteredPosts = posts.filter(post => post.標籤 === currentTag);
      //   const totalPages = Math.ceil(filteredPosts.length / itemsPerPage);
      //   currentPage = Math.min(Math.max(1, currentPage + direction), totalPages);
      //   renderPosts();
      // }

    // // 初次渲染
    // document.addEventListener('DOMContentLoaded', () => {
    //   renderPosts();
    // });

  }
}