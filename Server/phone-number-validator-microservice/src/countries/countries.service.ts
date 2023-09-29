import { Injectable } from '@nestjs/common';
import * as fs from 'fs';

type Country = {
  name: string;
  code: string;
  length: number;
};

@Injectable()
export class CountriesService {
  private readonly countries: Country[];

  constructor() {
    const rawData = fs.readFileSync('countries.json', 'utf8');
    this.countries = JSON.parse(rawData);
  }

  getCountriesWithInfo(): Country[] {
    return this.countries;
  }
}
