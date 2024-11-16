import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ordercomplete',
  templateUrl: './ordercomplete.component.html',
  styleUrls: ['./ordercomplete.component.css']
})
export class OrdercompleteComponent implements OnInit {
  orderId: string | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // 從路由參數獲取訂單編號
    this.orderId = this.route.snapshot.paramMap.get('orderId');
  }
}
