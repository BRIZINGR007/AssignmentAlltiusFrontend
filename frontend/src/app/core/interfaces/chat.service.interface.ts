export interface IChat {
    chatId?: string;
    userId?: string;
    user_question?: string;
    reference?: Array<Record<string, any>>;
    ai_answer?: string;
}