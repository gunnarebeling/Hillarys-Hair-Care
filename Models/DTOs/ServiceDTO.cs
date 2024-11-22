namespace HillarysHareCare.Models.DTOs;

public class ServiceDTO
{
    public int Id {get; set;}
    public string Type  {get; set;}
    public decimal Cost  {get; set;}
    public List<AppointmentDTO> Appointments {get; set;}
}