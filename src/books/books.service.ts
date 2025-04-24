import { Injectable } from '@nestjs/common';
import { Book } from 'src/interfaces/book.interface';

@Injectable()
export class BooksService {
  private books: Book[] = [
    {
      id: 1,
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      year: 1925,
    },
    { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee', year: 1960 },
  ];

  getAllBooks(): Book[] {
    return this.books;
  }

  getBookById(id: number): Book | undefined {
    return this.books.find((book) => book.id === id);
  }

  createBook(book: Omit<Book, 'id'>): Book {
    const newBook = {
      id: this.books.length + 1,
      ...book,
    };
    this.books.push(newBook);
    return newBook;
  }

  updateBook(id: number, updatedBook: Partial<Book>): Book | undefined {
    const bookIndex = this.books.findIndex((book) => book.id === id);
    if (bookIndex === -1) return undefined;

    this.books[bookIndex] = { ...this.books[bookIndex], ...updatedBook };
    return this.books[bookIndex];
  }

  deleteBook(id: number): boolean {
    const initialLength = this.books.length;
    this.books = this.books.filter((book) => book.id !== id);
    return this.books.length !== initialLength;
  }
}
