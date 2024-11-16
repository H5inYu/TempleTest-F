import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // 導入 FormsModule
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatchComponent } from './Component/match/match/match.component';
import { MatchEditComponent } from './Component/match/match-edit/match-edit.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DonateComponent } from './Component/order/donate/donate.component';
import { ActIndexComponent } from './Component/act/act-index/act-index.component';
import { ActDetailComponent } from './Component/act/act-detail/act-detail.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { IndexActComponent } from './Component/index/index-act/index-act.component';
import { ActRegComponent } from './Component/act/act-reg/act-reg.component';
import { ActindexContentPipe, forMoneyPipe } from './Pipe/actPipe/act.pipe';
import { Err404Component } from './Component/err404/err404.component';
import { ForumproductComponent } from './Component/forum/forumproduct/forumproduct.component';
import { MatchIndexComponent } from './Component/match/match-index/match-index.component';
import { HeaderComponent } from './Shared/header/header.component';
import { FooterComponent } from './Shared/footer/footer.component';
import { OrderComponent } from './Component/order/order/order.component';
import { OrderdetailComponent } from './Component/order/orderdetail/orderdetail.component';
import { OrderlistComponent } from './Component/order/orderlist/orderlist.component';
import { DonaterecordComponent } from './Component/order/donaterecord/donaterecord.component';
import { ForumComponent } from './Component/forum/forum/forum.component';
import { ProductlistComponent } from './Component/productlist/productlist.component';
import { ProductdetailComponent } from './Component/productdetail/productdetail.component';
import { CartlistComponent } from './Component/cartlist/cartlist.component';
import { ExorciseComponent } from './Component/exorcise/exorcise.component';
import { LightComponent } from './Component/light/light.component';
import { UserLoginComponent } from './Component/user/user-login/user-login.component';
import { UserSignupComponent } from './Component/user/user-signup/user-signup.component';
import { UserForgotpasswordComponent } from './Component/user/user-forgotpassword/user-forgotpassword.component';
import { UserPersonelinfoComponent } from './Component/user/user-personelinfo/user-personelinfo.component';
import { UserChangepasswordComponent } from './Component/user/user-changepassword/user-changepassword.component';
import { CommonModule } from '@angular/common';
import { ActRegrecordComponent } from './Component/act/act-regrecord/act-regrecord.component';
import { UserAreaComponent } from './Component/act/user-area/user-area.component';
import { UserresetpasswordComponent } from './Component/user/userresetpassword/userresetpassword.component';
import { AuthInterceptor } from './Interface/userInterface/AuthInterceptor';
import { OrdercompleteComponent } from './Component/order/ordercomplete/ordercomplete.component';
import { ForumpostComponent } from './Component/forum/forumpost/forumpost.component';
import { ForumstoryComponent } from './Component/forum/forumstory/forumstory.component';
import { ForumlightComponent } from './Component/forum/forumlight/forumlight.component';
import { PostFormComponent } from './Component/forum/post-form/post-form.component';
import { ActPayComponent } from './Component/act/act-pay/act-pay.component';
import { ActOkpayComponent } from './Component/act/act-okpay/act-okpay.component';
import { OrderconfirmComponent } from './Component/order/orderconfirm/orderconfirm.component';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    AppComponent,
    MatchComponent,
    MatchEditComponent,
    ActIndexComponent,
    ActDetailComponent,
    IndexActComponent,
    ActRegComponent,
    ActindexContentPipe,
    forMoneyPipe,
    Err404Component,
    DonateComponent,
    OrderComponent,
    OrderdetailComponent,
    OrderlistComponent,
    DonaterecordComponent,
    MatchIndexComponent,
    ForumComponent,
    ForumproductComponent,
    ProductlistComponent,
    ProductdetailComponent,
    CartlistComponent,
    ExorciseComponent,
    LightComponent,
    UserLoginComponent,
    UserSignupComponent,
    UserForgotpasswordComponent,
    UserPersonelinfoComponent,
    UserChangepasswordComponent,
    UserresetpasswordComponent,
    OrdercompleteComponent,
    ActRegrecordComponent,
    UserAreaComponent,
    ForumpostComponent,
    ForumlightComponent,
    ForumstoryComponent,
    PostFormComponent,
    ActPayComponent,
    ActOkpayComponent,
    OrderconfirmComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule, // 將 FormsModule 添加到這裡
    HttpClientModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
