namespace HillarysHareCare.Models.DTOs;

public class ServiceDataDTO
{
    public int Id {get; set;}
    public bool Status { get; set; }
}

public class AppointmentPostDTO
{
    
    public int Id {get; set;}
    public int CustomerId  {get; set;}
    public int StylistId  {get; set;}
    public string Date {get; set;}
    public int TimeSlot {get; set;}

    public List<ServiceDataDTO> Services {get; set;}

}
