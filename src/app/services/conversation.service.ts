import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable, of } from 'rxjs';
import { SummaryConversations } from '../interfaces/summary-conversations';
import { UniqueConversation } from '../interfaces/unique-conversation';

@Injectable({
  providedIn: 'root'
})
export class ConversationService {

  private conversations: string = 'https://4a87fffe-09bb-417a-b4eb-2092ebf8e435.mock.pstmn.io/test/conversation';
  constructor(
    private http: HttpClient
  ) { }

  getConversations(userId: String): Observable<SummaryConversations[]> {
    const completeUrl = this.conversations+'/' + userId;
    return this.http.get<SummaryConversations[]>(completeUrl)
  }

  getConversation(userId: String, conversationId: String): Observable<UniqueConversation> {
    const completeUrl = this.conversations+'/' + userId+ '/'+ conversationId;
    return this.http.get<UniqueConversation>(completeUrl)
  }


}
