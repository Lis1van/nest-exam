// // src/average-price/dto/update-average-price.dto.ts

// // import { IsOptional, IsString } from 'class-validator';

// // export class UpdateAveragePriceReqDto {
// //   @IsOptional()
// //   @IsString()
// //   region?: string;

// //   @IsOptional()
// //   @IsString()
// //   brandId?: string;

// //   @IsOptional()
// //   @IsString()
// //   modelId?: string;

// //   @IsOptional()
// //   @IsString()
// //   averagePrice?: string;
// // }

// import { IsOptional, IsString, IsInt, IsDecimal } from 'class-validator';

// export class UpdateAveragePriceReqDto {
//   @IsOptional()
//   @IsString()
//   region?: string;

//   @IsOptional()
//   @IsInt()
//   brandId?: number; // Идентификатор марки

//   @IsOptional()
//   @IsInt()
//   modelId?: number; // Идентификатор модели

//   @IsOptional()
//   @IsDecimal()
//   averagePrice?: number; // Тип данных для средней цены лучше сделать числовым
// }
