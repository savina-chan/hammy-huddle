import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { GuidePageComponent } from './guide-page/guide-page.component';
import { ForumPageComponent } from './forum-page/forum-page.component';
import { PostDetailsComponent } from './post-details/post-details.component';

const routes: Routes = [
  {path:"", component:HomePageComponent},
  {path:"login", component:LoginPageComponent},
  {path:"register", component:RegisterPageComponent},
  {path:"profile", component:ProfilePageComponent},
  {path:"guide", component:GuidePageComponent},
  {path:"forum", component:ForumPageComponent},
  {path:"post/:id", component:PostDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
