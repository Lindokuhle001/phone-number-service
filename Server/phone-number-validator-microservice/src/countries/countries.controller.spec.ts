import { Test, TestingModule } from '@nestjs/testing';
import { CountriesController } from './countries.controller';
import { CountriesService } from './countries.service';

describe('CountriesController', () => {
  let controller: CountriesController;
  let countriesService: CountriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CountriesController],
      providers: [CountriesService],
    }).compile();

    controller = module.get<CountriesController>(CountriesController);
    countriesService = module.get<CountriesService>(CountriesService);
  });

  describe('getCountries', () => {
    it('should be defined', () => {
      expect(controller).toBeDefined();
    });

    it('should return an array of countries with info', async () => {
      const expectedCountries = [
        { name: 'United States', code: 'US', length: 10 },
        { name: 'Canada', code: 'CA', length: 11 },
      ];

      jest
        .spyOn(countriesService, 'getCountriesWithInfo')
        .mockReturnValue(expectedCountries);

      const result = await controller.getCountries();

      expect(result).toEqual(expectedCountries);
    });
  });
});
