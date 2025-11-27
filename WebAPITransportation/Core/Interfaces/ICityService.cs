using Core.Models.Location.City;

namespace Core.Interfaces;

public interface ICityService
{
    Task<List<CityItemModel>> GetCitiesAsync();
    Task<CityItemModel> CreateCityAsync(CityCreateModel model);
    Task DeleteCityAsync(int id);
}