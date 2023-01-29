import mongoose from 'mongoose';

export async function mongoSchema(mongoURI) {
  const client = await mongoose.connect(mongoURI);

  const Book = client.model('Book', { title: String, genre: String });
  const User = client.model('User', { name: String, surname: String });

  return { Book, User };
}
