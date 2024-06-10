import { Schema, model, Document, Model } from "mongoose";
import { IClient } from "../interfaces/client.interface";

export class Client {
    private clientModel: Model<IClient>
    private clientSchema: Schema<IClient>

    constructor(){
        this.clientSchema = new Schema<IClient>({
            username: {
              type: String,
              required: true,
              unique: true,
              trim: true,
              maxLength: 50,
            },
            password: {
              type: String,
              select: false,
            },
            email: {
              type: String,
            },
            pictureUrl: {
              type: String,
            },
            status: {
              type: String,
              enum: ["Client", "admin"],
              default: "Client",
            },
          });

        this.clientModel = model<IClient>("Client", this.clientSchema);
    }

    getClientModel() {
        return this.clientModel
    }
}