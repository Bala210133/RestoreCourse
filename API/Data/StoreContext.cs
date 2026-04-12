using System;
using API.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class StoreContext (DbContextOptions options) : IdentityDbContext<User>(options)
{
    public required DbSet<Product> Products { get; set; }

    public required DbSet<Basket> Baskets { get; set; }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        builder.Entity<IdentityRole>().HasData(
            new IdentityRole {Id="628dd4ac-c7aa-4ecb-99eb-4e41ae27d76f", ConcurrencyStamp="Member", Name = "Member", NormalizedName = "MEMBER" },
            new IdentityRole {Id="e22a641b-0268-4d4a-ae28-cae7fc21bf77", ConcurrencyStamp="Admin", Name = "Admin", NormalizedName = "ADMIN" }
        );
    }
}
