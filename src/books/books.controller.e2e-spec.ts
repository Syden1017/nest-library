import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, HttpStatus } from '@nestjs/common';
import * as request from 'supertest';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';

describe('BooksController (e2e)', () => {
  let app: INestApplication;
  const booksService = {
    findAll: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [BooksController],
      providers: [
        {
          provide: BooksService,
          useValue: booksService,
        },
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  const mockBook = { _id: '1', title: 'Test Book', author: 'Author' };

  it('/books (GET)', () => {
    booksService.findAll.mockResolvedValue([mockBook]);
    return request(app.getHttpServer())
      .get('/books')
      .expect(HttpStatus.OK)
      .expect([mockBook]);
  });

  it('/books/:id (GET)', () => {
    booksService.findOne.mockResolvedValue(mockBook);
    return request(app.getHttpServer())
      .get('/books/1')
      .expect(HttpStatus.OK)
      .expect(mockBook);
  });

  it('/books (POST)', () => {
    const dto = { title: 'New Book', author: 'Author' };
    booksService.create.mockResolvedValue({ _id: '2', ...dto });
    return request(app.getHttpServer())
      .post('/books')
      .send(dto)
      .expect(HttpStatus.CREATED)
      .expect((res) => {
        expect(res.body.title).toEqual(dto.title);
      });
  });

  it('/books/:id (PUT)', () => {
    const dto = { title: 'Updated Title' };
    booksService.update.mockResolvedValue({ _id: '1', ...dto });
    return request(app.getHttpServer())
      .put('/books/1')
      .send(dto)
      .expect(HttpStatus.OK)
      .expect((res) => {
        expect(res.body.title).toEqual(dto.title);
      });
  });

  it('/books/:id (DELETE)', () => {
    booksService.delete.mockResolvedValue(mockBook);
    return request(app.getHttpServer())
      .delete('/books/1')
      .expect(HttpStatus.OK)
      .expect(mockBook);
  });
});
