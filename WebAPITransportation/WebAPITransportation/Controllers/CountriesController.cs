using Core.Interfaces;
using Core.Models.Location;
using Core.Services;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace WebAPITransportation.Controllers;

[Route("api/[controller]")]
[ApiController]
public class CountriesController(ApplicationDbContext dbContext, ICountryService countryService) : ControllerBase
{
    [HttpGet]
    public IActionResult GetCountries()
    {
        var countries = dbContext.Countries.ToList();
        return Ok(countries);
    }

    [HttpPost]
    public async Task<IActionResult> CreateCountry([FromForm] CountryCreateModel model)
    {
        var item = await countryService.CreateCountryAsync(model);
        return CreatedAtAction(nameof(GetCountries), new { id = item.Id }, item);
    }
}