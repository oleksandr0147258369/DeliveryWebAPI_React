using AutoMapper;
using AutoMapper.QueryableExtensions;
using Core.Interfaces;
using Core.Models.Location;
using Domain;
using Domain.Entities.Location;
using Microsoft.EntityFrameworkCore;

namespace Core.Services;

public class CountryService(ApplicationDbContext dbContext, IImageService imageService, IMapper mapper) : ICountryService
{
    public async Task<List<CountryItemModel>> GetCountriesAsync()
    {
        var list = await dbContext.Countries.ProjectTo<CountryItemModel>(mapper.ConfigurationProvider).ToListAsync();
        return list;
    }

    public async Task<CountryItemModel> CreateCountryAsync(CountryCreateModel model)
    {
        var entity = mapper.Map<CountryEntity>(model);
        if (model.Image != null)
        {
            entity.Image = await imageService.UploadImageAsync(model.Image);
        }
        await dbContext.Countries.AddAsync(entity);
        await dbContext.SaveChangesAsync();
        var item = mapper.Map<CountryItemModel>(entity);
        return item;
    }
}