package com.beschtee.backend.Services;

import com.beschtee.backend.Models.person.Customer;
import com.beschtee.backend.Repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.UUID;

public class UserService {

    private final UserRepository userrepo;

    @Autowired
    public UserService(UserRepository userrepo){
        this.userrepo = userrepo;
    }

    /*public void addNewCustomer(String firstName, String lastName, String address, String password ) {
        Customer customer = new Customer(firstName, lastName, address, password );
    }*/

    public Customer addNewCustomer(Customer customer) {
        return userrepo.save(customer);
    }
}
