package com.beschtee.backend.Services;

import com.beschtee.backend.Models.Depot;
import com.beschtee.backend.Models.person.User;
import com.beschtee.backend.Repositories.DepotRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;

@Service
@AllArgsConstructor
public class DepotService {

    private final DepotRepository depotRepository;

    public Depot getDepotByUser(User customer) {
        return this.depotRepository.findDepotByCustomer(customer).orElseThrow(() ->
                new NoSuchElementException("Depot not found")
        );
    }

    public Depot getDepotById(Long id) {
        return this.depotRepository.findById(id).orElseThrow(() ->
                new NoSuchElementException("Depot not found")
        );
    }

    public boolean checkDepotAuthorization(User customer, Long id) {
        return this.getDepotByUser(customer).getId().equals(id);
    }

    public Depot createNewDepot(User user) {
        return this.depotRepository.save(Depot.builder()
                    .customer(user)
                    .volume(0)
                    .build());
    }
}


