import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClientService } from './http-client.service';
import { IChat } from '../core/interfaces/chat.service.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private readonly AiServiceEndPoint = environment.ai_service_endpoint;


  constructor(private httpClientService: HttpClientService) { }
  RetriveSessionChatHistory(): Promise<IChat[]> {
    const observable = this.httpClientService.get<IChat[]>(
      `${this.AiServiceEndPoint}/chat/get-all-chats`,
      {},
    ).pipe(
      catchError((error: HttpErrorResponse) => { throw error; })
    );
    return firstValueFrom(observable);
  }
  ChatWithAI(userQuery: string) {
    const observable = this.httpClientService.post<IChat>(
      `${this.AiServiceEndPoint}/chat/chat-with-ai`,
      {},
      { "query": userQuery },
    ).pipe(
      catchError((error: HttpErrorResponse) => { throw error; })
    );
    return firstValueFrom(observable);
  }
  DeleteChats() {
    const observable = this.httpClientService.delete(
      `${this.AiServiceEndPoint}/chat/delete-all-chats`,
      {},
    ).pipe(
      catchError((error: HttpErrorResponse) => { throw error; })
    );
    return firstValueFrom(observable);
  }
}
