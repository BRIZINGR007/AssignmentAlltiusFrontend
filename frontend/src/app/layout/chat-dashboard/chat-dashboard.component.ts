import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { IChat } from '../../core/interfaces/chat.service.interface';
import { ChatService } from '../../services/chat.service';
import { SkeletonLoaderComponent } from '../../components/skeleton-loader/skeleton-loader.component';
import { ChatMessageComponent } from "../../components/chat-message/chat-message.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat-dashboard',
  imports: [HeaderComponent, SkeletonLoaderComponent, CommonModule, ChatMessageComponent, FormsModule],
  templateUrl: './chat-dashboard.component.html',
  styleUrl: './chat-dashboard.component.scss'
})
export class ChatDashboardComponent {
  userQuestion: string = '';
  protected sessionChats: IChat[] = [];
  protected isLoading: boolean = true;
  constructor(private chatService: ChatService) { }
  ngOnInit() {
    this.ComponentDataSetup();
  };
  private async ComponentDataSetup() {
    this.sessionChats = await this.chatService.RetriveSessionChatHistory();
    console.log(this.sessionChats);
    this.isLoading = false;
    if (!this.sessionChats || this.sessionChats.length === 0) {
      this.populateDummyChats();
    }
  }
  appendUserQuestionToChatHistory(question: string) {
    const newChat: IChat = {
      user_question: question,
    };
    this.sessionChats.push(newChat);
    console.log(this.sessionChats);
  }
  protected UpdateChat(chat: IChat) {
    if (this.sessionChats.length > 0) {
      this.sessionChats.pop();
    }
    this.sessionChats.push(chat);
  }
  protected populateDummyChats() {
    this.sessionChats = [{
      chatId: "123",
      userId: "123",
      ai_answer: "I’m here to assist you with queries based on the provided support documentation. Feel free to ask any questions related to the topics covered, and I’ll do my best to help!",
      user_question: "Hi there! How do I interact with this chatbot and get answers based on the support materials?",
      reference: []
    }]
  }

  async handleSend() {
    if (this.userQuestion.trim()) {
      this.appendUserQuestionToChatHistory(this.userQuestion);
      await this.chatService.ChatWithAI(this.userQuestion);
      this.userQuestion = '';
      this.sessionChats = await this.chatService.RetriveSessionChatHistory();
    }
  }
  async deleteAllChats() {
    await this.chatService.DeleteChats();
    this.sessionChats = await this.chatService.RetriveSessionChatHistory();
    this.populateDummyChats();
  }
}
