import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-act-okpay',
  templateUrl: './act-okpay.component.html',
  styleUrls: ['./act-okpay.component.css']
})
export class ActOkpayComponent implements OnInit {
  RegNum: string | null = null;

  constructor(private route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.RegNum = this.route.snapshot.paramMap.get('RegNum');
  }

}
