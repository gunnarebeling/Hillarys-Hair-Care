using Microsoft.EntityFrameworkCore;
using HillarysHareCare.Models;

public class HillarysHareCareDbContext : DbContext
{

    public DbSet<Appointment> Appointments { get; set; }
    public DbSet<Customer> Customers { get; set; }
    public DbSet<Service> Services { get; set; }
    public DbSet<Stylist> Stylists { get; set; }
    public DbSet <TimeSlot> TimeSlots {get; set;}


    public HillarysHareCareDbContext(DbContextOptions<HillarysHareCareDbContext> context) : base(context)
    {

    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        
        
        // seed data with campsite types
        modelBuilder.Entity<Customer>().HasData(new Customer[]
        {
            new Customer
            {
                Id = 1,
                Name = "John Doe",
                Email = "john.doe@example.com",
                PhoneNumber = "123-456-7890"
            },
            new Customer
            {
                Id = 2,
                Name = "Jane Smith",
                Email = "jane.smith@example.com",
                PhoneNumber = "234-567-8901"
            },
            new Customer
            {
                Id = 3,
                Name = "Alice Johnson",
                Email = "alice.johnson@example.com",
                PhoneNumber = "345-678-9012"
            },
            new Customer
            {
                Id = 4,
                Name = "Bob Brown",
                Email = "bob.brown@example.com",
                PhoneNumber = "456-789-0123"
            }
        });
        modelBuilder.Entity<Stylist>().HasData(new Stylist[]
        {
            new Stylist
            {
                Id = 1,
                Name = "Emma Watson",
                Email = "emma.watson@example.com",
                PhoneNumber = "987-654-3210",
                IsActive = true
            },
            new Stylist
            {
                Id = 2,
                Name = "Liam Neeson",
                Email = "liam.neeson@example.com",
                PhoneNumber = "876-543-2109",
                IsActive = true
            },
            new Stylist
            {
                Id = 3,
                Name = "Olivia Miller",
                Email = "olivia.miller@example.com",
                PhoneNumber = "765-432-1098",
                IsActive = false
            },
            new Stylist
            {
                Id = 4,
                Name = "James Smith",
                Email = "james.smith@example.com",
                PhoneNumber = "654-321-0987",
                IsActive = true
            }
        });
        modelBuilder.Entity<Service>().HasData(new Service[]
        {
            new Service
            {
                Id = 1,
                Type = "Haircut",
                Cost = 25.00m
            },
            new Service
            {
                Id = 2,
                Type = "Shampoo",
                Cost = 10.00m
            },
            new Service
            {
                Id = 3,
                Type = "Manicure",
                Cost = 20.00m
            },
            new Service
            {
                Id = 4,
                Type = "Pedicure",
                Cost = 30.00m
            }
        });
        modelBuilder.Entity<TimeSlot>().HasData(new TimeSlot[]
        {
            new TimeSlot { Id = 1, Time = "08:00 AM" },
            new TimeSlot { Id = 2, Time = "09:00 AM" },
            new TimeSlot { Id = 3, Time = "10:00 AM" },
            new TimeSlot { Id = 4, Time = "11:00 AM" },
            new TimeSlot { Id = 5, Time = "12:00 PM" },
            new TimeSlot { Id = 6, Time = "01:00 PM" },
            new TimeSlot { Id = 7, Time = "02:00 PM" },
            new TimeSlot { Id = 8, Time = "03:00 PM" },
            new TimeSlot { Id = 9, Time = "04:00 PM" },
            new TimeSlot { Id = 10, Time = "05:00 PM" },
            new TimeSlot { Id = 11, Time = "06:00 PM" }
        });
        modelBuilder.Entity<Appointment>().HasData(new Appointment[]
        {
            new Appointment
            {
                Id = 1,
                CustomerId = 1,
                StylistId = 1,
                Date = DateOnly.FromDateTime(DateTime.Now.AddDays(1)),
                TimeSlotId = 4 // Tomorrow
            },

            new Appointment
            {
                Id = 2,
                CustomerId = 2,
                StylistId = 2,
                Date = DateOnly.FromDateTime(DateTime.Now.AddDays(2)), // Day after tomorrow
                TimeSlotId = 2
            }
        });
        modelBuilder.Entity<Appointment>()
            .HasMany(a => a.Services)
            .WithMany(s => s.Appointments)
            .UsingEntity(j => j.HasData(
                new { AppointmentsId = 1, ServicesId = 1 },
                new { AppointmentsId = 2, ServicesId = 2 },
                new { AppointmentsId = 2, ServicesId = 1 }
            ));


        
    }
}