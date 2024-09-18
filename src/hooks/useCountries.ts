import countries from "world-countries";


const countriesFormatted = countries.map((item) => ({
  countryCode: item.cca2,
  label: item.name.common,
  flag: item.flag,
  latLang: item.latlng,
  region: item.region,
}));

export const useCountries = () => {
  const getAllCountries = () => countriesFormatted;

  const getCountryByCountryCode = (countryCode: string) => {
    return countriesFormatted.find((item) => item.countryCode === countryCode);
  };
  const getCountryByCountryName = (name: string) => {
    return countriesFormatted.find((item) => item.label === name);
  };

  return {
    getAllCountries,
    getCountryByCountryCode,
    getCountryByCountryName,
  };
};
