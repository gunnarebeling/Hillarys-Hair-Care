namespace HillarysHareCare.Models.DTOs;

public class CustomerDTO
{
    public int Id {get; set;}
  
    public string Name  {get; set;}

    public string Email  {get; set;}

    public string PhoneNumber {get; set;}
    public List<AppointmentDTO> Appointments {get; set;}
}