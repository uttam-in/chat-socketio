import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Document } from '../interfaces/common.IF';

@Injectable({
  providedIn: 'root'
})
export class SocketIOService {
  currentDocument = this.socket.fromEvent<Document>('document');
  documents = this.socket.fromEvent<string[]>('documents');
  message = this.socket.fromEvent<string[]>('message');

  constructor(private socket: Socket) { }

  getDocument(id: string) {
    console.log(id)
    console.log("Get Doument")
    this.socket.emit('getDoc', id);
  }

  newDocument() {
    console.log("New Doument")
    this.socket.emit('addDoc', { id: this.docId(), doc: '' });
  }

  editDocument(document: Document) {
    console.log("Sending Sock Message")
    this.socket.emit('editDoc', document);
  }

  private docId() {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < 5; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
  }
}