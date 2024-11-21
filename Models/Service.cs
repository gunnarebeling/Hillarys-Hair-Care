using System.ComponentModel.DataAnnotations;
namespace HillarysHareCare.Models;

public class Service
{
    public int Id {get; set;}
    [Required]
    public string Type  {get; set;}
    public decimal Cost  {get; set;}
    public List<AppointmentService> AppointmentServices { get; set; }
}