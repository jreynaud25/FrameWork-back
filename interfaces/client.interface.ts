export interface IClient extends Document {
    username: string;
    password?: string;
    email?: string;
    pictureUrl?: string;
    status?: "Client" | "admin";
  }