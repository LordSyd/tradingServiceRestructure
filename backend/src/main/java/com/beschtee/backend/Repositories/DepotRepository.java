package com.beschtee.backend.Repositories;

import com.beschtee.backend.Models.Depot;
import com.beschtee.backend.Models.person.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface DepotRepository extends JpaRepository<Depot, Long> {

    Optional<Depot> findDepotByCustomer(Customer customer);


}
