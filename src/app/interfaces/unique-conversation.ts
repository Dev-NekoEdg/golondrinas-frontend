export interface UniqueConversation {
  id: string;
  totalMessages: number;
  createdAt: Date;
  messages: Message[];
}

export interface Message {
  createdBy: string;
  createdAt: Date;
  message: string;
  lastReadIt: Date;
  owner: Boolean;
}
