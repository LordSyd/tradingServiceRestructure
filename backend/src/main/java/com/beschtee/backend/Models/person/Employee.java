package com.beschtee.backend.Models.person;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Table;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;
/*
@Entity
@Table(name = "employee")
@Data
@AllArgsConstructor
@Builder
@EqualsAndHashCode(callSuper=true)
public class Employee extends User implements UserDetails {
    @Enumerated(EnumType.STRING)
    private UserRole userRole; // to manage roles

    public Employee() {

    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        SimpleGrantedAuthority authority = new SimpleGrantedAuthority(userRole.name());
        return Collections.singletonList(authority);
    }

    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true; //we don't manage this
    }

    @Override
    public boolean isAccountNonLocked() {
        return !locked;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true; //we don't manage this
    }

    @Override
    public boolean isEnabled() {
        return enabled;
    }
}
*/