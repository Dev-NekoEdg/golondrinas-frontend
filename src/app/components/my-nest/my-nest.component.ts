import { Component, OnInit } from '@angular/core';
import { SummaryConversations } from 'src/app/interfaces/summary-conversations';
import { UniqueConversation } from 'src/app/interfaces/unique-conversation';
import { ConversationService } from 'src/app/services/conversation.service';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';

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
  public conversationId: string;
  public formNewText: FormGroup;



  constructor(
    private service: ConversationService,
    private formBuilder: FormBuilder
  ) {
    this.conversations = [];
    this.conversation = this.emptyConversations();
    this.conversationActive = false;
    this.conversationId = '';
    this.formNewText = this.createForm();
  }

  ngOnInit(): void {
    this.loadConversations();
    this.test();
  }
  test() {
    console.log('scrollTop = scrollHeight');
    const divConversation = document.getElementById('divDisplayConversation');
    if (divConversation != null || divConversation != undefined) {
      divConversation.scrollTop = divConversation.scrollHeight;;
    }
  }
  loadConversations() {
    this.service.getConversations(this.userId).subscribe(
      (data) => {
        console.log(data);
        this.conversations = data
      });
  }

  createForm() {
    return this.formBuilder.group({
      newText: ['']
    });
  }

  loadConversation(conversationId: string) {
    console.log('load conversation with id: ' + conversationId);
    this.conversationId = conversationId;
    this.conversationActive = true;
    this.service.getConversation(this.userId, conversationId).subscribe(
      (response) => {
        console.log(response);
        this.conversation = response;
        this.conversation.messages.forEach(item => { item.owner = (item.createdBy === this.userId) });
        console.log('obj conversation afeter map.')
        console.log(this.conversation);
        this.test();
      }
    );

    // this.test();
  }

  sendNewMessage() {
    console.log('conversation id: ' + this.conversationId);
    console.log({ conversationId: this.conversationId, message: this.formNewText.get('newText')?.value });
    this.formNewText.reset({
      newText: ''
    });
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
