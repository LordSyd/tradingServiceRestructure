package com.beschtee.backend.Models;

import com.beschtee.backend.Models.person.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table( name="depot" )
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class Depot {
    @Id
    @SequenceGenerator(
            name = "depot_id",
            sequenceName = "depot_id_seq",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "depot_id_seq"
    )
    @Column(name="id", updatable = false)
    public Long id;

    @Column( name="volume", nullable = false, columnDefinition = "NUMERIC(13,2) default 0.00" )
    public float volume;

    @OneToOne
    @JoinColumn(name = "customer_id", referencedColumnName = "id", nullable = true)
    public User customer;
}
