using Core.Interfaces;
using Core.Models.Location.City;
using Microsoft.AspNetCore.Mvc;

namespace WebAPITransportation.Controllers;

[Route("api/[controller]")]
[ApiController]
public class CitiesController(ICityService cityService) : Controller
{
    [HttpGet]
    public async Task<IActionResult> GetCities()
    {
        var cities = await cityService.GetCitiesAsync();
        return Ok(cities);
    }

    [HttpPost]
    public async Task<IActionResult> CreateCity([FromForm] CityCreateModel model)
    {
        var city = await cityService.CreateCityAsync(model);
        return Ok(city);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteCity(int id)
    {
        await cityService.DeleteCityAsync(id);
        return Ok();
    }
}