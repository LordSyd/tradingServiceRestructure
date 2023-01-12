package com.beschtee.backend.Models.person;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;

@Entity
@Table(name = "users")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class User implements UserDetails {
    @Id
    @SequenceGenerator( //to make it BIGSERIAL and create sequence
            name = "user_id_seq",
            sequenceName = "user_id_seq",
            allocationSize = 1
    )
    @GeneratedValue( //for database
            strategy = GenerationType.SEQUENCE,
            generator = "user_id_seq"
    )
    @Column(name="id", updatable = false)
    protected Long id;

    @Column(name = "first_name", nullable = false, columnDefinition = "TEXT")
    protected String firstName;

    @Column(name = "last_name", nullable = false, columnDefinition = "TEXT")
    protected String lastName;

    //nullable, because employee does not have to provide the address
    @Column(name = "address", nullable = true, columnDefinition = "TEXT")
    protected String address;

    @Column(name = "password", nullable = false, columnDefinition = "TEXT")
    protected String password;

    @Column(name = "email", nullable = false, columnDefinition = "TEXT")
    protected String email;

    @Enumerated(EnumType.STRING)
    private UserRole userRole; // to manage roles


    public Boolean locked = false;
    public Boolean enabled = false;


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        SimpleGrantedAuthority authority = new SimpleGrantedAuthority(userRole.name());
        return Collections.singletonList(authority);
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

    public boolean isCustomer() {
        return this.userRole.equals(UserRole.CUSTOMER);
    }
}
