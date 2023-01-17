package com.beschtee.backend.Models;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

//asdf
@Entity
@Table(
        name="bank"
)
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class Bank {
    @Id
    @SequenceGenerator(
            name = "bank_id",
            sequenceName = "bank_id_seq",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "bank_id_seq"
    )
    @Column(name="id", updatable = false)
    public Long id;

    @Column( name="volume", nullable = false, columnDefinition = "NUMERIC(13,2) default 1000000000.00" )
    public BigDecimal volume;
}
