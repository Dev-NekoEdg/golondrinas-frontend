import { Component, ViewChild, ElementRef, OnInit, AfterViewInit } from '@angular/core';
import { SummaryConversations } from 'src/app/interfaces/summary-conversations';
import { Message, UniqueConversation } from 'src/app/interfaces/unique-conversation';
import { ConversationService } from 'src/app/services/conversation.service';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { ScrollToBottomDirective } from 'src/directives/scroll-to-bottom.directive';

@Component({
  selector: 'app-my-nest',
  templateUrl: './my-nest.component.html',
  styleUrls: ['./my-nest.component.css']
})
export class MyNestComponent implements OnInit, AfterViewInit {
  private userId = 'mock-user-angularApp';
  public conversations: SummaryConversations[];
  public conversation: UniqueConversation;
  public conversationActive: boolean;
  public conversationId: string;
  public formNewText: FormGroup
  //@ts-ignore
  @ViewChild(ScrollToBottomDirective) scroll: ScrollToBottomDirective;

  constructor(
    private elRef: ElementRef,
    private service: ConversationService,
    private formBuilder: FormBuilder
  ) {
    this.conversations = [];
    this.conversation = this.emptyConversations();
    this.conversationActive = false;
    this.conversationId = '';
    this.formNewText = this.createForm();
  }
  ngAfterViewInit(): void {
    // setTimeout(() => {
    //   this.setScrollAtTheEnd()
    // }, 1000);
  }

  ngOnInit(): void {
    this.loadConversations();
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
      }
    );

    setTimeout(() => {
      this.setScrollAtTheEnd()
    }, 500);
  }

  sendNewMessage() {
    console.log('conversation id: ' + this.conversationId);
    console.log({ conversationId: this.conversationId, message: this.formNewText.get('newText')?.value });
    this.formNewText.reset({
      newText: ''
    });
    const newMessage: Message = {
      createdAt: new Date(),
      createdBy: 'test-user-2',
      owner: true,
      read: true,
      message: this.formNewText.get('newText')?.value
    };

    // save throught
    this.conversation.messages.push(newMessage);
    // setTimeout(() => {
    //   this.setScrollAtTheEnd()
    // }, 1000);

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

  setScrollAtTheEnd(): void {
    //divDisplayConversation
    const divMessages = document.getElementsByClassName('messageBoxDefault');
    console.log({ divMessages });
    if (divMessages !== null && divMessages !== undefined) {
      console.log({ 'divMessages.length': divMessages.length });
      const lastItem: any = divMessages[(divMessages.length - 1)];
      console.log({ lastItem });
      let topPost = lastItem.offsetTop;
      console.log({ topPost });
      //@ ts-ignore
      const x = document.getElementById('divDisplayConversation');
      console.log({ x });
      if (x !== null && x !== undefined) {
        x.scrollTop = topPost;
        //@ts-ignore
        document.getElementById('divDisplayConversation').scrollTop = topPost;
        const t = document.getElementById('divDisplayConversation');
        console.log({ t });
      }
      //document.getElementById('divDisplayConversation')?.scrollTop = topPost;
    }
  }


}
