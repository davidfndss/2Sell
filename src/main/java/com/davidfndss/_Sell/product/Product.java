package com.davidfndss._Sell.product;

import com.davidfndss._Sell.user.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.UUID;

@Table(name = "products")
@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Product {

  @Id
  @GeneratedValue
  private UUID id;

  private String name;
  private String description;
  private String imgUrl;
  private String productUrl;
  private Date createdAt;
  private Date updatedAt;

  @PrePersist
  protected void onCreate() {
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  @PreUpdate
  protected void onUpdate() {
    this.updatedAt = new Date();
  }


  @ManyToOne
  @JoinColumn(name = "user_id")
  private User user;
}
