using HillarysHareCare.Models;
using Microsoft.EntityFrameworkCore;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Http.Json;
using HillarysHareCare.Models.DTOs;
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors();

// allows passing datetimes without time zone data 
AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);

// allows our api endpoints to access the database through Entity Framework Core
builder.Services.AddNpgsql<HillarysHareCareDbContext>(builder.Configuration["HillarysHairCareDbConnectionString"]);

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    app.UseCors(options =>
                {
                    options.AllowAnyOrigin();
                    options.AllowAnyMethod();
                    options.AllowAnyHeader();
                });
}

app.UseHttpsRedirection();

app.MapGet("/api/appointments", (HillarysHareCareDbContext Db) => 
{
    return Db.Appointments.Select(a => new AppointmentDTO 
    {
        Id = a.Id,
        Customer = new CustomerDTO{Id = a.Customer.Id, Name = a.Customer.Name},
        CustomerId = a.CustomerId,
        StylistId = a.StylistId,
        Stylist = new StylistDTO 
        {
            Id = a.Stylist.Id, 
            Name = a.Stylist.Name,
            IsActive = a.Stylist.IsActive
        },
        Date = a.Date,
        TimeSlotId = a.TimeSlotId,
        TimeSlot = new TimeSlotDTO { Id = a.TimeSlot.Id, Time = a.TimeSlot.Time},
        AppointmentServices = a.AppointmentServices.Select(aps => new AppointmentServiceDTO {
            Service = new ServiceDTO {Id = aps.Service.Id, Type = aps.Service.Type, Cost = aps.Service.Cost}


        }).ToList(),
        



    });
   
});

app.Run();

