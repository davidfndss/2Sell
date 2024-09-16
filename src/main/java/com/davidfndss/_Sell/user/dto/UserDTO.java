package com.davidfndss._Sell.user.dto;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import com.davidfndss._Sell.product.Product;
import com.davidfndss._Sell.product.dto.ProductDTO;
import com.davidfndss._Sell.user.User;

import jakarta.persistence.OneToMany;
import jakarta.persistence.TemporalType;

public record UserDTO (UUID id, String name, String username, String email, String password, String avatarUrl, List<ProductDTO> products, Date createdAt, Date updatedAt) { }