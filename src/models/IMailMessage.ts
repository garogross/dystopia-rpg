export interface IMailMessage {
  id: string;
  body: string;
  read: boolean;
  from?: string;
  reward: {
    cp: number;
  };
  subject: string;
  created_at?: Date;
}
