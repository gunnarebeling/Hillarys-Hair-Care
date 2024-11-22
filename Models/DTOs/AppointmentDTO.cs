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

    protected decimal _tax = 1.0725m;

    public decimal TotalCost
    {
        get
        {
           decimal total = Services.Aggregate(0m, (total, ser) => 
           {
                total += ser.Cost;
                return total;
           });

           decimal addTax = total * _tax;
           decimal roundUp = Math.Ceiling(addTax * 100) / 100;
           return roundUp;
        }
    }

}