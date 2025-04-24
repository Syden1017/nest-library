/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsString, IsInt, IsBoolean, IsOptional } from 'class-validator';

export class CreateBookDto {
  @IsString()
  title: string;

  @IsString()
  author: string;

  @IsInt()
  year: number;

  @IsBoolean()
  @IsOptional()
  isPublished?: boolean;
}
