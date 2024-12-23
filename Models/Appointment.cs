using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
namespace HillarysHareCare.Models;

public class Appointment
{
    
    public int Id {get; set;}
    public int CustomerId  {get; set;}
    public Customer Customer {get; set;}
    public int StylistId  {get; set;}
    public Stylist Stylist {get; set;}
    public DateOnly Date {get; set;}
    public int TimeSlotId {get; set;}
    public TimeSlot TimeSlot {get; set;}
    [JsonIgnore]
    public List<Service> Services {get; set;} = new List<Service>();
}