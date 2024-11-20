namespace HillarysHareCare.Models.DTOs;

public class AppointmentDTO
{
    
    public int Id {get; set;}
    public int CustomerId  {get; set;}
    public CustomerDTO Customer {get; set;}
    public int StylistId  {get; set;}
    public StylistDTO Stylist {get; set;}
    public DateOnly Date {get; set;}
    public int TimeSlotId {get; set;}
    public TimeSlotDTO TimeSlot {get; set;}
    public List<ServiceDTO> Services {get; set;}
}