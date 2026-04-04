using System.ComponentModel.DataAnnotations.Schema;
using System.Security.AccessControl;
using Microsoft.Build.ObjectModelRemoting;

namespace API.Entities;

[Table("BasketItems")]

public class BasketItem
{
    public int Id { get; set; }
    public int Quantity { get; set; }

    public int ProductId { get; set; }

    public required Product Product { get; set; }

    public int BasketId { get; set; }

    public  Basket Basket { get; set; } = null!;
}