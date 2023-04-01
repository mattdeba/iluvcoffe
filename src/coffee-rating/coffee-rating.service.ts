import { Injectable } from '@nestjs/common';
import { CoffesService } from '../coffes/coffes.service';

@Injectable()
export class CoffeeRatingService {
  constructor(private readonly coffesService: CoffesService) {}
}
