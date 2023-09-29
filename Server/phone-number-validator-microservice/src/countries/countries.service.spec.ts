import { Test, TestingModule } from '@nestjs/testing';
import { CountriesService } from './countries.service';

describe('CountriesService', () => {
  let service: CountriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CountriesService],
    }).compile();

    service = module.get<CountriesService>(CountriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getCountriesWithInfo', () => {
    it('should return an array of countries', () => {
      const countries = service.getCountriesWithInfo();
      expect(countries).toBeDefined();
      expect(Array.isArray(countries)).toBeTruthy();
      expect(countries.length).toBeGreaterThan(0);
    });

    it('should return countries with name, code, and length properties', () => {
      const countries = service.getCountriesWithInfo();
      for (const country of countries) {
        expect(country).toHaveProperty('name');
        expect(country).toHaveProperty('code');
        expect(country).toHaveProperty('length');
      }
    });

    it('should return valid country data', () => {
      const countries = service.getCountriesWithInfo();
      for (const country of countries) {
        expect(typeof country.name).toBe('string');
        expect(typeof country.code).toBe('string');
        expect(typeof country.length).toBe('number');
      }
    });
  });
});
