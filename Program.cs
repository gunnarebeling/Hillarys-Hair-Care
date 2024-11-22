using HillarysHareCare.Models;
using Microsoft.EntityFrameworkCore;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Http.Json;
using HillarysHareCare.Models.DTOs;
using Microsoft.AspNetCore.Mvc.ModelBinding.Binders;
using System.Net.Security;
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
        Services = a.Services.Select(aps => new ServiceDTO {Id = aps.Id, Type = aps.Type, Cost = aps.Cost}).ToList()
            


    });
});

app.MapGet("/api/appointments/{id}", ( HillarysHareCareDbContext db ,int id) => 
{
    return db.Appointments.Select(a => new AppointmentDTO 
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
        Services = a.Services.Select(aps => new ServiceDTO {Id = aps.Id, Type = aps.Type, Cost = aps.Cost}).ToList()
            
    }).Single(a => a.Id == id);
});

app.MapDelete("/api/appointments/{id}", async (int id, HillarysHareCareDbContext db) => 
{

    try
    {
        Appointment appointment =  db.Appointments.SingleOrDefault(a => a.Id == id);
        db.Appointments.Remove(appointment);
        await db.SaveChangesAsync();
        return Results.Accepted();
       
    }
    catch (System.Exception ex)
    {
        
        return Results.Problem($"An error occurred: {ex.Message}");
    }

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
   
    try
    {
        var serviceIds = appointment.Services
        .Where(a => a.Status) // Filter only services with Status true
        .Select(a => a.Id)    // Select the Ids of those services
        .ToList();

        List<Service> services = await db.Services
        .Where(s => serviceIds.Contains(s.Id)) // Only fetch services with valid Ids
        .ToListAsync();

        
        Appointment realAppointment = new Appointment 
        {
            CustomerId = appointment.CustomerId,
            StylistId = appointment.StylistId,
            Date = DateOnly.Parse(appointment.Date),
            TimeSlotId = appointment.TimeSlot,
            Services = services
        };

        db.Appointments.Add(realAppointment);
        await db.SaveChangesAsync();
        return Results.Created($"/api/appointments/{realAppointment.Id}", realAppointment);
        

    }
    catch (System.Exception ex)
    {
        
      
        return Results.Problem($"An error occurred: {ex.Message}");
    }

   


    
});
app.Run();

