using System.ComponentModel.DataAnnotations;
namespace HillarysHareCare.Models;

public class Stylist
{
    public int Id {get; set;}
    [Required]
    public string Name  {get; set;}
    [Required]
    public string Email  {get; set;}
    [Required]
    public string PhoneNumber {get; set;}
    public bool IsActive {get; set;}
    public List<Appointment> Appointments {get; set;}

}