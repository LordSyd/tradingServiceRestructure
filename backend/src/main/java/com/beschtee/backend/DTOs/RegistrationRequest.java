package com.beschtee.backend.DTOs;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class RegistrationRequest {
    private String firstName;
    private String lastName;
    private String address;
    private String userRole;
    private String email;
    private String password;
}
