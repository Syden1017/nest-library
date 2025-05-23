import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { BooksService } from './books.service';
import { NotFoundException } from '@nestjs/common';

const mockBook = {
  _id: 'someid',
  title: 'Test Book',
  author: 'Author',
  year: 2025,
  save: jest.fn().mockResolvedValue(this),
};

const mockBookModel = {
  find: jest.fn().mockReturnValue({
    exec: jest.fn().mockResolvedValue([mockBook]),
  }),
  findById: jest.fn().mockReturnValue({
    exec: jest.fn().mockResolvedValue(mockBook),
  }),
  findByIdAndUpdate: jest.fn().mockReturnValue({
    exec: jest.fn().mockResolvedValue(mockBook),
  }),
  findByIdAndDelete: jest.fn().mockReturnValue({
    exec: jest.fn().mockResolvedValue(mockBook),
  }),
  constructor: jest.fn().mockReturnValue(mockBook),
};

describe('BooksService', () => {
  let service: BooksService;
  let model;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BooksService,
        {
          provide: getModelToken('Book'),
          useValue: mockBookModel,
        },
      ],
    }).compile();

    service = module.get<BooksService>(BooksService);
    model = module.get(getModelToken('Book'));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findAll should return an array of books', async () => {
    const books = await service.findAll();
    expect(books).toEqual([mockBook]);
    expect(model.find).toHaveBeenCalled();
  });

  it('findOne should return a book if found', async () => {
    const book = await service.findOne('someid');
    expect(book).toEqual(mockBook);
    expect(model.findById).toHaveBeenCalledWith('someid');
  });

  it('findOne should throw NotFoundException if not found', async () => {
    model.findById.mockReturnValueOnce({
      exec: jest.fn().mockResolvedValueOnce(null),
    });
    await expect(service.findOne('wrongid')).rejects.toThrow(NotFoundException);
  });

  it('create should save and return a book', async () => {
    const dto = { title: 'New Book', author: 'Author', year: 2025 };
    model.constructor.mockReturnValueOnce({
      ...dto,
      save: jest.fn().mockResolvedValue(dto),
    });
    const created = await service.create(dto);
    expect(created).toEqual(dto);
  });

  it('update should update and return a book', async () => {
    const dto = { title: 'Updated Title' };
    const updatedBook = { ...mockBook, ...dto };
    model.findByIdAndUpdate.mockReturnValueOnce({
      exec: jest.fn().mockResolvedValueOnce(updatedBook),
    });
    const result = await service.update('someid', dto);
    expect(result).toEqual(updatedBook);
  });

  it('update should throw NotFoundException if no book', async () => {
    model.findByIdAndUpdate.mockReturnValueOnce({
      exec: jest.fn().mockResolvedValueOnce(null),
    });
    await expect(service.update('wrongid', {})).rejects.toThrow(
      NotFoundException,
    );
  });

  it('delete should remove and return a book', async () => {
    const deleted = await service.delete('someid');
    expect(deleted).toEqual(mockBook);
  });

  it('delete should throw NotFoundException if no book', async () => {
    model.findByIdAndDelete.mockReturnValueOnce({
      exec: jest.fn().mockResolvedValueOnce(null),
    });
    await expect(service.delete('wrongid')).rejects.toThrow(NotFoundException);
  });
});
