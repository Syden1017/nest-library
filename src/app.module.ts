import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { MongooseModule } from '@nestjs/mongoose';
import { BooksModule } from './books/books.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://dimashustov:flA01pSwdSfijoFS@cluster0.kc5yatc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
    ),
    BooksModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
