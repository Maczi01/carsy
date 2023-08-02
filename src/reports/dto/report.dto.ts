import { Expose, Transform } from 'class-transformer';

export class ReportDto {
  @Expose()
  id: string;
  @Expose()
  approved: boolean;
  @Expose()
  price: number;
  @Expose()
  year: number;
  @Expose()
  lng: number;
  @Expose()
  lat: number;
  @Expose()
  make: string;
  @Expose()
  model: string;
  @Expose()
  mileage: number;
  @Expose()
  @Transform(({ obj }) => obj.user.id)
  userId: string;
}
