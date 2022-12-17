package com.beschtee.backend.Models.person;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@MappedSuperclass
@Data
@AllArgsConstructor
/*@NoArgsConstructor*/
public abstract class User {
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
    public Long id;

    @Column(name = "first_name", nullable = false, columnDefinition = "TEXT")
    public String firstName;

    @Column(name = "last_name", nullable = false, columnDefinition = "TEXT")
    public String lastName;

    //nullable, because employee does not have to provide the address
    @Column(name = "address", nullable = true, columnDefinition = "TEXT")
    public String address;

    @Column(name = "password", nullable = false, columnDefinition = "TEXT")
    public String password;


    public Boolean locked = false;
    public Boolean enabled = false;


}
