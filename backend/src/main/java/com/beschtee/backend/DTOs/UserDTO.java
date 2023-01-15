package com.beschtee.backend.DTOs;

import com.beschtee.backend.Models.person.UserRole;
import lombok.*;

@Getter
@Setter
@Builder
public class UserDTO {
    private Long id;
    private String firstName;
    private String lastName;
    private String address;
    private UserRole userRole; // to manage
    private Long depotId;
}
