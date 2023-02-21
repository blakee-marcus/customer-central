import { faker } from '@faker-js/faker';

import { once } from '../config/connection';
import { Customer, User, Note } from '../models';

once('open', async () => {
  await Customer.deleteMany({});
  await User.deleteMany({});

  // Create Users
  const userData = [];

  for (let i = 0; i < 25; i += 1) {
    const username = faker.internet.userName();
    const email = faker.internet.email(username);
    const password = faker.internet.password(8);

    userData.push({ username, email, password });
  }

  const createdUsers = await User.collection.insertMany(userData);
  console.log(createdUsers);

  // create customers
  let createdCustomers = [];
  for (let i = 0; i < 50; i += 1) {
    const name = faker.name.fullName();
    const email = faker.internet.email(name);
    const phone = faker.phone.number();
    const address = faker.address.streetAddress();

    const randomUserIndex = Math.floor(
      Math.random() * createdUsers.insertedCount
    );
    const { _id: userId } = createdUsers.insertedIds[randomUserIndex];

    const createdCustomer = await Customer.create({
      name,
      email,
      phone,
      address,
    });

    const updatedUser = await User.updateOne(
      { _id: userId },
      { $push: { customers: createdCustomer._id } }
    );

    createdCustomers.push(createdCustomer);
  }

  // create customer notes
  let createdCustomerNotes = [];
  for (let i = 0; i < 50; i += 1) {
    const noteBody = faker.lorem.words(Math.round(Math.random() * 20) + 1);
    console.log(`Note Body ${[i]}: ${noteBody}`);

    const randomUserIndex = Math.floor(
      Math.random() * createdUsers.insertedCount
    );
    const { _id: userId } = createdUsers.insertedIds[randomUserIndex]._id;
    console.log(`UserId ${[i]}: ${userId._id}`);

    const randomCustomerIndex = Math.floor(Math.random() * 1);
    const { _id: customerId } = createdCustomers[randomCustomerIndex];
    console.log(`CustomerId ${[i]}: ${customerId}`);

    const createdNote = await Note.create({
      author: userId,
      noteBody: noteBody,
    });
    console.log(`Created Note ${[i]}: ${createdNote}`);
    const updatedCustomer = await Customer.updateOne(
      { _id: customerId },
      { $push: { notes: createdNote._id } }
    );

    createdCustomerNotes.push(createdNote);
  }

  console.log('All Done!');
  process.exit(0);
});
