import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActRegComponent } from './Component/act/act-reg/act-reg.component';
import { Err404Component } from './Component/err404/err404.component';
import { IndexActComponent } from './Component/index/index-act/index-act.component';
import { ActIndexComponent } from './Component/act/act-index/act-index.component';
import { ActDetailComponent } from './Component/act/act-detail/act-detail.component';
import { ProductlistComponent } from './Component/productlist/productlist.component';
import { ProductdetailComponent } from './Component/productdetail/productdetail.component';
import { CartlistComponent } from './Component/cartlist/cartlist.component';
import { ExorciseComponent } from './Component/exorcise/exorcise.component';
import { LightComponent } from './Component/light/light.component';
import { MatchComponent } from './Component/match/match/match.component';
import { MatchIndexComponent } from './Component/match/match-index/match-index.component';
import { MatchEditComponent } from './Component/match/match-edit/match-edit.component';
import { UserLoginComponent } from './Component/user/user-login/user-login.component';
import { UserSignupComponent } from './Component/user/user-signup/user-signup.component';
import { UserPersonelinfoComponent } from './Component/user/user-personelinfo/user-personelinfo.component';
import { UserForgotpasswordComponent } from './Component/user/user-forgotpassword/user-forgotpassword.component';
import { UserChangepasswordComponent } from './Component/user/user-changepassword/user-changepassword.component';
import { DonateComponent } from './Component/order/donate/donate.component';
import { DonaterecordComponent } from './Component/order/donaterecord/donaterecord.component';
import { OrderComponent } from './Component/order/order/order.component';
import { OrderdetailComponent } from './Component/order/orderdetail/orderdetail.component';
import { OrderlistComponent } from './Component/order/orderlist/orderlist.component';
import { OrdercompleteComponent } from './Component/order/ordercomplete/ordercomplete.component';
import { OrderconfirmComponent } from './Component/order/orderconfirm/orderconfirm.component';
import { UserAreaComponent } from './Component/act/user-area/user-area.component';
import { ForumstartComponent } from './Component/forum/forumstart/forumstart.component';
import { ForumproductComponent } from './Component/forum/forumproduct/forumproduct.component';
import { ForumpostComponent } from './Component/forum/forumpost/forumpost.component';
import { ForumactivityComponent } from './Component/forum/forumactivity/forumactivity.component';
import { ForumlightComponent } from './Component/forum/forumlight/forumlight.component';
import { ForumstoryComponent } from './Component/forum/forumstory/forumstory.component';
import { UserresetpasswordComponent } from './Component/user/userresetpassword/userresetpassword.component';
import { ActPayComponent } from './Component/act/act-pay/act-pay.component';
import { ActOkpayComponent } from './Component/act/act-okpay/act-okpay.component';

const routes: Routes = [
  { path: '', redirectTo: '/index', pathMatch: 'full' },
  {
    path: 'index',
    component: IndexActComponent
  },
  {
    path: 'user',
    children: [
      {  // 子路由
        path: 'login',
        component: UserLoginComponent
      },
      {  // 子路由
        path: 'signup',
        component: UserSignupComponent
      }, {  // 子路由
        path: 'personelinfo',
        component: UserPersonelinfoComponent
      }, {  // 子路由
        path: 'forgotpassword',
        component: UserForgotpasswordComponent
      }, {  // 子路由
        path: 'changepassword',
        component: UserChangepasswordComponent
      }, {  // 子路由
        path: 'resetpassword',
        component: UserresetpasswordComponent
      }]
  },
  {
    path: 'act',
    children: [
      {
        path: 'index',
        component: ActIndexComponent
      },
      {
        path: 'detail/:id',
        component: ActDetailComponent
      },
      {
        path: 'reg/:id/:selectFActDetailId',
        component: ActRegComponent
      },
      {
        path: 'pay',
        component: ActPayComponent
      },
      {
        path: 'userarea',
        component: UserAreaComponent
      },
      {
        path: 'okpay/:RegNum',
        component: ActOkpayComponent
      },
    ]
  },
  {
    path: 'productlist',
    component: ProductlistComponent
  },
  {
    path: 'productdetail',
    component: ProductdetailComponent
  },
  {
    path: 'cartlist',
    component: CartlistComponent
  },
  {
    path: 'exorcise',
    component: ExorciseComponent
  },
  {
    path: 'light',
    component: LightComponent
  },
  {
    path: 'match',
    component: MatchComponent
  },
  {
    path: 'matchIndex',
    component: MatchIndexComponent
  },
  {
    path: 'match-edit',
    component: MatchEditComponent
  },
  {
    path: 'donateIndex',
    component: DonateComponent
  },
  {
    path: 'donaterecord',
    component: DonaterecordComponent
  },
  {
    path: 'orderdetail/:orderId',
    component: OrderdetailComponent
  },
  {
    path: 'orderlist',
    component: OrderlistComponent
  },
  {
    path: 'Forumstart',
    component: ForumstartComponent
  },
  {
    path: 'Forumproduct',
    component: ForumproductComponent
  },
  {
    path: 'Forumproduct/:id',
    component: ForumproductComponent
  },
  {
    path: 'Forumpost',
    component: ForumpostComponent
  },
  {
    path: 'Forumactivity',
    component: ForumactivityComponent
  },
  {
    path: 'Forumlight',
    component: ForumlightComponent
  },
  {
    path: 'Forumstory',
    component: ForumstoryComponent
  },
  {
    path: 'order',
    component: OrderComponent
  },

  {
    path: 'ordercomplete/:orderId',
    component: OrdercompleteComponent
  },
  {
    path: 'orderconfirm',
    component: OrderconfirmComponent
  },

  {
    // 放最下面，任何找不到的都會進這路徑
    path: '**',
    component: Err404Component
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled',  // 啟用滾動位置恢復
    anchorScrolling: 'enabled'  // 啟用 anchor 滾動功能
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
