require("dotenv/config");
require("../config/dbConfig");
const Client = require("../models/Client.model");
const clients = [
  {
    username: "Bob",
    email: "bob@mail.com",
  },
  {
    username: "John",
    email: "john@mail.com",
  },
  {
    username: "Alice",
    email: "alice@mail.com",
  },
];

async function seed() {
  try {
    await Client.deleteMany();
    await Client.create(clients);
    console.log("Created all the Clients!");
    process.exit();
  } catch (error) {
    console.log(error);
  }
}

seed();
