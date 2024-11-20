using System.ComponentModel.DataAnnotations;
namespace HillarysHareCare.Models;

public class TimeSlot
{
    public int Id {get; set;}
    [Required]
    public string Time {get; set;}
}