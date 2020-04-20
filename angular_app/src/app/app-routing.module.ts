import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ChatShowcaseComponent } from './chat-showcase/chat-showcase.component';
import { AuthGuardService } from './services/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'chat', component: ChatShowcaseComponent,canActivate:[AuthGuardService] },
  { path: '', redirectTo: 'login', pathMatch: 'full'}, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  
exports: [RouterModule]
})
export class AppRoutingModule { }
