package com.beschtee.backend.Models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "stock")
public class Stock {
    @Id
    @SequenceGenerator(
            name = "stock_id",
            sequenceName = "stock_id_seq",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "stock_id_seq"
    )
    @Column(name="id", updatable = false)
    public Long id;

    @Column(name="stock_id", nullable = false, columnDefinition = "TEXT")
    public String stockId;

    //one to one relationship???
    @OneToOne
    @JoinColumn(name = "depot_id", referencedColumnName = "id")
    public Depot depot;

    @Column( name="amount", nullable = false, columnDefinition = "NUMERIC(13,2) default 0.00" )
    public double amount;

    @Column(name="company_name", nullable = false, columnDefinition = "TEXT")
    public String companyName;







}
