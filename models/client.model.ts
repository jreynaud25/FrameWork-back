import { model, Schema } from 'mongoose';

const ClientSchema = new Schema({
  username: {
    required: true,
    unique: true,
    trim: true,
    maxLength: 50,
    type: String,
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
    enum: ['Client', 'admin'],
    default: 'Client',
  },
});

export const Client = model('Client', ClientSchema);

// module.exports = Client;
