using Application.Activities;
using Application.Core;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Presistence;

namespace API.Extensions
{
    public static class ApplicationServiceExtensions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services,
            IConfiguration configuration,
            string corsPolicyName)
        {
            services.AddDbContext<DataContext>(options =>
            {
                options.UseSqlite(configuration.GetConnectionString("DefaultConnection"));
            });

            services.AddCors(opt =>
            {
                opt.AddPolicy(corsPolicyName, policy =>
                    policy.AllowAnyMethod()
                    .AllowAnyHeader()
                    .WithOrigins("http://localhost:3000"));
            });

            services.AddMediatR(typeof(List.Handler).Assembly);

            services.AddAutoMapper(typeof(MappingProfiles).Assembly);

            return services;
        }
    }
}
