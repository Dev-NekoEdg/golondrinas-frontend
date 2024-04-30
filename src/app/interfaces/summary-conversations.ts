import { last } from "rxjs";

export interface SummaryConversations {
  id: string;
  createdOn: Date;
  readIt: boolean;
  lastRead: Date;
  userId: string;
  lastMessage: LastMessage;
}

export interface LastMessage {
  userName: string;
  profilePic: string;
  body: string;
}

