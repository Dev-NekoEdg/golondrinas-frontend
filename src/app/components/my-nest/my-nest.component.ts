import { Component, OnInit } from '@angular/core';
import { SummaryConversations } from 'src/app/interfaces/summary-conversations';
import { ConversationService } from 'src/app/services/conversation.service';

@Component({
  selector: 'app-my-nest',
  templateUrl: './my-nest.component.html',
  styleUrls: ['./my-nest.component.css']
})
export class MyNestComponent implements OnInit {
private userId = 'testing-from-angularApp';
public conversations: SummaryConversations[]

  constructor(
    private service: ConversationService
  ) {
    this.conversations = [];
  }

  ngOnInit(): void {
    this.loadConversations();
  }

  loadConversations(){
    this.service.getConversations(this.userId).subscribe(
      (data) => {
        console.log(data);
        this.conversations = data;
      });
  }

  emptySummaryConversations(){
    return "test";
  }
}
