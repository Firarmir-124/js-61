export interface Countries {
  id: string;
  alpha3Code: string;
  independent: boolean;
  name: string;
}

export interface InfoCounter {
  alpha3Code: string;
  borders: string[]
  capital: string
  flag: string
  name: string
  population: number
  timezones: string[];
}

export interface NameCountries {
  id: number;
  name: string
}