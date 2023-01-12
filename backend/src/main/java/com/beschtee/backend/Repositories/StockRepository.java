package com.beschtee.backend.Repositories;

import com.beschtee.backend.Models.Depot;
import com.beschtee.backend.Models.Stock;
import org.springframework.data.annotation.Transient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.Optional;

@Repository
public interface StockRepository extends JpaRepository<Stock, Long> {

    ArrayList<Stock> findAllByDepot(Depot depot);

    Optional<Stock> findStockBySymbolIgnoreCaseAndDepot(String symbol, Depot depot);

    @Modifying
    @Transient
    @Query(
            nativeQuery = true,
            value = "UPDATE stock SET quantity = ?1 WHERE id = ?2"
    )
    int updateQuantity(Long id, double quantity);

}
