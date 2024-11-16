import { Component, Renderer2 } from '@angular/core';
import { ActService } from '../../../Service/actService/act.service';
import { ActList, actPagesList } from '../../../Interface/actInterface/ActInterface';

@Component({
  selector: 'app-act-index',
  templateUrl: './act-index.component.html',
  styleUrls: ['./act-index.component.css'],
})
export class ActIndexComponent {
  constructor(private actService: ActService, private renderer: Renderer2) { }
  actPagesList: actPagesList | undefined;
  actIndexList: ActList[] = [];
  currentPage = 1;
  pages: number = 1;
  actsearch = {
    FActCategoryId: 0,
    txtKeyword: '',
    targetPage: 1,
  };
  pagesArray: number[] | undefined;


  ngOnInit(): void {
    // debugger
    this.loadScript();
    this.actInfoApi();
  };

  onPageChange(i: number) {
    if (i > this.pages) { i = this.pages };
    if (i < 1) { i = 1 };
    this.actsearch.targetPage = i;
    this.actInfoApi();
  }

  /**api取得篩選結果 */
  actInfoApi() {
    this.actService.getActIndex(this.actsearch).subscribe((data: any) => {
      // console.log(data);
      // debugger
      this.pages = data["pages"];
      this.generatePages(this.pages)
      this.actIndexList = data["actList"];
    }
      // ,
      //   error => {
      //     console.error('Error fetching data:', error); // 處理錯誤
      //   });
    )
  }

  /**加載失效script */
  loadScript() {
    const script = this.renderer.createElement('script');
    script.src = 'assets/js/act-script.js'; // 指向正確的路徑
    script.onload = () => {
      // console.log('Script loaded successfully.');
    };
    script.onerror = () => {
      // console.error('Error loading script.');
    };
    this.renderer.appendChild(document.body, script);
  }

  //加載完整script
  // loadScript() {
  //   // debugger
  //   const script = document.createElement('script');
  //   script.src = 'assets/js/script.js'; // 注意這是相對於根路徑的
  //   script.onload = () => {
  //     console.log('Script loaded successfully.');
  //   };
  //   script.onerror = () => {
  //     console.error('Error loading the script.');
  //   };
  //   document.body.appendChild(script);
  // }

  /**奐活動類別，並到第一頁*/
  selectActCategory(p: number) {
    // debugger
    this.actsearch.FActCategoryId = p;
    this.actsearch.targetPage = 1;
    this.actInfoApi();
  }

  /**分頁數，數字[] */
  generatePages(totalPages: number) {
    this.pagesArray = Array.from({ length: totalPages }, (_, i) => i + 1);
  }
}
