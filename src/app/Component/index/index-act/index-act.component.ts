import { ActService } from 'src/app/Service/actService/act.service';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { ActList } from 'src/app/Interface/actInterface/ActInterface';

@Component({
  selector: 'app-index-act',
  templateUrl: './index-act.component.html',
  styleUrls: ['./index-act.component.css'],
})
export class IndexActComponent implements OnInit {
  actIndexList: ActList[] = [];
  constructor(private actService: ActService, private renderer: Renderer2) { }
  ngOnInit(): void {
    // debugger
    this.loadScript();
    this.getActGallery();
  }

  getActGallery() {
    this.actService.getIndexAct().subscribe((data: any) => {
      this.actIndexList = data;
      console.log(this.actIndexList);
    })
  }

  loadScript() {

    const script = this.renderer.createElement('script');
    script.src = 'assets/js/act-script.js'; // 指向正確的路徑
    script.onload = () => {
      console.log('Script loaded successfully.');
    };
    script.onerror = () => {
      console.error('Error loading script.');
    };
    this.renderer.appendChild(document.body, script);
  }
}
