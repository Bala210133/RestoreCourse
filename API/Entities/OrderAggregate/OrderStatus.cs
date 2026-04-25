namespace API.Entities.OrderAggregate;

public enum OrderStatus
{
    pending,
    payment_received,
    payment_failed,

    payment_Mismatch
    

}
