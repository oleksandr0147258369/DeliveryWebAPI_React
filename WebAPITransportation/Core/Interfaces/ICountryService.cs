using Core.Models.Location;

namespace Core.Interfaces;

public interface ICountryService
{
    Task<List<CountryItemModel>> GetCountriesAsync();
    Task<CountryItemModel> CreateCountryAsync(CountryCreateModel model);
}