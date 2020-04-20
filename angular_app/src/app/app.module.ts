import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {AuthService} from './services/auth.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbSidebarModule,NbContextMenuModule,
  NbThemeModule,NbChatModule, NbInputModule,NbCardModule,
  NbLayoutModule, NbButtonModule } from '@nebular/theme';
import { ChatShowcaseComponent } from './chat-showcase/chat-showcase.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

//Socket IO
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
const config: SocketIoConfig = { url: 'http://localhost:3000', options: {} };
import { SocketIOService } from './services/socket.io';

@NgModule({
  declarations: [
    AppComponent,
    ChatShowcaseComponent,
    LoginComponent,
  ],
  imports: [  
  BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NbLayoutModule,
    NbThemeModule.forRoot({ name: 'default' }),
    NbSidebarModule.forRoot(), //if this is your app.module
    NbButtonModule,
    NbChatModule,
    NbContextMenuModule,
    NbInputModule,
    NbCardModule,
    FormsModule,
    ReactiveFormsModule,
    NbButtonModule,
    HttpClientModule,
    SocketIoModule.forRoot(config),
  ],
  providers: [SocketIOService,AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
