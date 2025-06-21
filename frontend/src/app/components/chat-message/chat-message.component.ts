import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IChat } from '../../core/interfaces/chat.service.interface';
import { MarkdownComponent } from 'ngx-markdown';
import { SkeletonLoaderComponent } from '../skeleton-loader/skeleton-loader.component';
@Component({
  selector: 'app-chat-message',
  imports: [SkeletonLoaderComponent, MarkdownComponent],
  templateUrl: './chat-message.component.html',
  styleUrl: './chat-message.component.scss'
})
export class ChatMessageComponent {
  @Input() chat!: IChat;
  @Output() ReferncesTraversalEmitter = new EventEmitter<IChat>();

  showRefernces() {
    this.ReferncesTraversalEmitter.emit(this.chat);
  }

}
