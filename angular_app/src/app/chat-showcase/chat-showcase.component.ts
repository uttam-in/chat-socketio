import { Component, OnInit } from '@angular/core';
import { SocketIOService } from '../services/socket.io';
import { MessageService } from '../services/message';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'chat-showcase',
  templateUrl: './chat-showcase.component.html',
  styles: [`
    ::ng-deep nb-layout-column {
      justify-content: center;
      display: flex;
    }
    nb-chat {
      width: 500px;
    }
  `],
})
export class ChatShowcaseComponent implements OnInit {
  // User
  UserName = sessionStorage.getItem("username")
  messages: any[];

  constructor(private wsIO: SocketIOService,private socket: Socket,private msg: MessageService) {
    this.messages = []
  }
  ngOnInit(): void {
    // Connect the socket
    this.socket.emit('exchange', { exchange: {'chatid':sessionStorage.getItem("chatid")} });   
    this.wsIO.message.subscribe(msg=>
      {
        msg = JSON.parse(msg.toString())
        this.messages.push({
          text: msg['message'],
          date: new Date(),
          reply: false,
          type: 'text',
          files: null,
          user: {
            name: msg['user']['username'],
            avatar: 'https://i.gifer.com/no.gif',
          },
        });

      }
      )
  }

  sendMessage(event: any) {
    console.log(event)
    const files = !event.files ? [] : event.files.map((file) => {
      return {
        url: file.src,
        type: file.type,
        icon: 'file-text-outline',
      };
    });
    let message = {
      "message": event.message
    }
    let chatid = ""
    if('uttam'=== sessionStorage.getItem("username")){
      chatid = '4394083fa71b4ce'
    }else{      
      chatid = '24804391218546e'
    }
    this.msg.send(message,chatid).subscribe(res=>{
      console.log(res)
    })

    this.messages.push({
      text: event.message,
      date: new Date(),
      reply: true,
      type: files.length ? 'file' : 'text',
      files: files,
      user: {
        name: sessionStorage.getItem("username") ,
        avatar: 'https://i.gifer.com/no.gif',
      },
    });
  }

}
