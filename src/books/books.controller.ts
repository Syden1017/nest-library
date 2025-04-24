import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { Book } from 'src/interfaces/book.interface';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  getAllBooks() {
    return this.booksService.getAllBooks();
  }

  @Get(':id')
  getBook(@Param('id') id: string) {
    return this.booksService.getBookById(+id);
  }

  @Post()
  createBook(@Body() book: Omit<Book, 'id'>) {
    return this.booksService.createBook(book);
  }

  @Put(':id')
  updateBook(@Param('id') id: string, @Body() updatedBook: Partial<Book>) {
    return this.booksService.updateBook(+id, updatedBook);
  }

  @Delete(':id')
  deleteBook(@Param('id') id: string) {
    return this.booksService.deleteBook(+id);
  }
}
