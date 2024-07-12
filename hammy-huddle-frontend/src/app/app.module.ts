import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { GuidePageComponent } from './guide-page/guide-page.component';
import { ForumPageComponent } from './forum-page/forum-page.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { HeaderComponent } from './header/header.component';
import { LoginRegisterButtonsComponent } from './login-register-buttons/login-register-buttons.component';
import { NavButtonsComponent } from './nav-buttons/nav-buttons.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    LoginPageComponent,
    RegisterPageComponent,
    GuidePageComponent,
    ForumPageComponent,
    ProfilePageComponent,
    HeaderComponent,
    LoginRegisterButtonsComponent,
    NavButtonsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
