package com.beschtee.backend.Repositories;

import com.beschtee.backend.Models.Depot;
import com.beschtee.backend.Models.Stock;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;

@Repository
public interface StockRepository extends JpaRepository<Stock, Long> {

    ArrayList<Stock> findAllByDepot(Depot depot);

}
