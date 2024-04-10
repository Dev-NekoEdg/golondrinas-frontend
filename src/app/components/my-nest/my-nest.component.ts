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
  private userId = 'testing-from-angularApp';
  public conversations: SummaryConversations[];
  public conversation: UniqueConversation;


  constructor(
    private service: ConversationService
  ) {
    this.conversations = [];
    this.conversation = this.emptyConversations();
  }

  ngOnInit(): void {
    this.loadConversations();
  }

  loadConversations() {
    this.service.getConversations(this.userId).subscribe(
      (data) => {
        console.log(data);
        this.conversations = data;
      });
  }

  loadConversation(conversationId: string) {
    this.service.getConversation(this.userId, conversationId).subscribe(
      (data) => {
        console.log(data);
        this.conversation = data;
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
      message: []
    };
  }
}
