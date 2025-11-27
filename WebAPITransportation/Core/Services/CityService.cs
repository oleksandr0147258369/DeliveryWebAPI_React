using AutoMapper;
using AutoMapper.QueryableExtensions;
using Core.Interfaces;
using Core.Models.Location;
using Core.Models.Location.City;
using Domain;
using Domain.Entities.Location;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

namespace Core.Services;

public class CityService(ApplicationDbContext dbContext, IImageService imageService, IMapper mapper)
    : ICityService
{
    public async Task<List<CityItemModel>> GetCitiesAsync()
    {
        var list = await dbContext.Cities.Where(c => c.IsDeleted == false)
            .ProjectTo<CityItemModel>(mapper.ConfigurationProvider).ToListAsync();
        return list;
    }

    public async Task<CityItemModel> CreateCityAsync(CityCreateModel model)
    {
        var entity = mapper.Map<CityEntity>(model);
        if (model.Image is { Length: > 0 })
        {
            entity.Image = await imageService.UploadImageAsync(model.Image);
        }
        await dbContext.Cities.AddAsync(entity);
        await dbContext.SaveChangesAsync();
        var item = mapper.Map<CityItemModel>(entity);
        item.Country = dbContext.Countries.FirstOrDefault(c => c.Id == model.CountryId).Name;
        return item;
    }

    public async Task DeleteCityAsync(int id)
    {
        var entity = await dbContext.Cities.FindAsync(id);
        if (entity == null)
        {
            throw new KeyNotFoundException();
        }

        if (entity.IsDeleted == false)
        {
            entity.IsDeleted = true;
        }

        await dbContext.SaveChangesAsync();
    }
}