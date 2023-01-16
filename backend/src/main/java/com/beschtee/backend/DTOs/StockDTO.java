package com.beschtee.backend.DTOs;

import com.beschtee.backend.Models.Depot;
import jakarta.persistence.Column;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class StockDTO {
    private String symbol;
    private double quantity;
    private String companyName;
    private float currentPrice;
    private float currentStockVolume;

}
