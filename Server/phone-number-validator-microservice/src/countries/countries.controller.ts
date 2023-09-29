import { Controller, Get } from '@nestjs/common';
import { CountriesService } from './countries.service';

@Controller('api/countries')
export class CountriesController {
  constructor(private readonly countriesService: CountriesService) {}

  @Get()
  async getCountries() {
    const countries = this.countriesService.getCountriesWithInfo();
    return countries;
  }
}
