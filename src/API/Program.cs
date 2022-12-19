using Microsoft.EntityFrameworkCore;
using Presistence;

const string corsPolicyName = "CorsPolicy";

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddDbContext<DataContext>(options =>
{
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
});

builder.Services.AddCors(opt =>
{
    opt.AddPolicy(corsPolicyName, policy =>
        policy.AllowAnyMethod()
        .AllowAnyHeader()
        .WithOrigins("http://localhost:3000"));
});

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Migrate database
try
{
    var scope = app.Services.CreateScope();
    var ctx = scope.ServiceProvider.GetRequiredService<DataContext>();
    await ctx.Database.MigrateAsync();
    //ctx.Database.EnsureDeleted();
    //ctx.Database.EnsureCreated();

    await Seed.SeedData(ctx);
}
catch (Exception ex)
{
    var logger = app.Services.GetRequiredService<ILogger<Program>>();
    logger.LogError(ex, "An error occured during migration");
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors(corsPolicyName);

app.UseAuthorization();

app.MapControllers();

await app.RunAsync();
