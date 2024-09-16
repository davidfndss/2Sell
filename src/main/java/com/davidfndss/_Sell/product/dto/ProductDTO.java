package com.davidfndss._Sell.product.dto;

import java.util.Date;
import java.util.UUID;

import com.davidfndss._Sell.user.User;
import com.davidfndss._Sell.user.dto.UserDTO;

import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;

public record ProductDTO ( UUID id, String name, String description, String imgUrl, String productUrl, Date createdAt, Date updatedAt, UserDTO user ) { }
