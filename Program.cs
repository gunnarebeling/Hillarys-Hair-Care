using HillarysHareCare.Models;
using Microsoft.EntityFrameworkCore;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Http.Json;
using HillarysHareCare.Models.DTOs;
using Microsoft.AspNetCore.Mvc.ModelBinding.Binders;
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

app.MapGet("/api/customers", (HillarysHareCareDbContext db) =>
{
    return db.Customers.Select(c => new CustomerDTO
    {
        Id = c.Id,
        Name = c.Name,
        PhoneNumber = c.PhoneNumber,
        Email = c.Email
    });
});

app.MapGet("/api/stylists", (HillarysHareCareDbContext db) =>
{
    return db.Stylists.Select(s => new StylistDTO
    {
        Id = s.Id,
        Name = s.Name,
        PhoneNumber = s.PhoneNumber,
        Email = s.Email,
        IsActive = s.IsActive
        
    });
});

app.MapGet("/api/timeslots", (HillarysHareCareDbContext db) =>
{
    return db.TimeSlots.Select(t => new TimeSlotDTO
    {
        Id = t.Id,
        Time = t.Time
        
    });
});

app.MapGet("/api/services", (HillarysHareCareDbContext db) => 
{
    return db.Services.Select(s => new ServiceDTO
    {
        Id = s.Id,
        Type = s.Type,
        Cost = s.Cost
    });
});



app.MapPost("/api/appointments", async (HillarysHareCareDbContext db, AppointmentPostDTO appointment) => 
{
    using var transaction = await db.Database.BeginTransactionAsync();
    try
    {
        
        Appointment realAppointment = new Appointment 
        {
            CustomerId = appointment.CustomerId,
            StylistId = appointment.StylistId,
            Date = DateOnly.Parse(appointment.Date),
            TimeSlotId = appointment.TimeSlot
        };

        db.Appointments.Add(realAppointment);
        await db.SaveChangesAsync();
        List<AppointmentService> appointmentServices = appointment.Services.Where(s => s.Status == true).Select(s => new AppointmentService
        {
                AppointmentId = realAppointment.Id,
                ServiceId = s.Id
                

        }).ToList();

        db.AppointmentServices.AddRange(appointmentServices);

        await db.SaveChangesAsync();
        await transaction.CommitAsync();

        return Results.Ok();
    }
    catch (System.Exception ex)
    {
        
        await transaction.RollbackAsync();
        return Results.Problem($"An error occurred: {ex.Message}");
    }

   


    
});
app.Run();

