import { Component, OnInit } from '@angular/core';
import { SummaryConversations } from 'src/app/interfaces/summary-conversations';
import { UniqueConversation } from 'src/app/interfaces/unique-conversation';
import { ConversationService } from 'src/app/services/conversation.service';

@Component({
  selector: 'app-my-nest',
  templateUrl: './my-nest.component.html',
  styleUrls: ['./my-nest.component.css']
})
export class MyNestComponent implements OnInit {
  private userId = 'mock-user-angularApp';
  public conversations: SummaryConversations[];
  public conversation: UniqueConversation;
  public conversationActive: boolean;


  constructor(
    private service: ConversationService
  ) {
    this.conversations = [];
    this.conversation = this.emptyConversations();
    this.conversationActive = false;
  }

  ngOnInit(): void {
    this.loadConversations();
  }

  loadConversations() {
    this.service.getConversations(this.userId).subscribe(
      (data) => {
        console.log(data);
        this.conversations = data
        this.conversationActive = true;
      });
  }

  loadConversation(conversationId: string) {
    console.log('load conversation with id: ' + conversationId);
    this.service.getConversation(this.userId, conversationId).subscribe(
      (data) => {
        // console.log(data);
        this.conversation.messages == data.messages.map(item=> {
          return {
            createdBy: item.createdBy,
            createdAt: item.createdAt,
            message: 'Test: ' + item.message,
            lastReadIt: item.lastReadIt,
            owner: (item.createdBy === this.userId)
          };
        });
        console.log('obj conversation afeter map.')
        console.log(this.conversation);
      }
    );

  }

  emptySummaryConversations() {
    return "test";
  }

  emptyConversations(): UniqueConversation {
    return {
      id: '',
      totalMessages: 0,
      createdAt: new Date(),
      messages: []
    };
  }
}
