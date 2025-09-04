export interface IAssistantSlice {
  chatHistory: IChatMessage[];
  isLoading: boolean;
}

export interface IChatMessage {
  message: string;
  isUser: boolean;
}
