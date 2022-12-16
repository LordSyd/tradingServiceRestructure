package com.beschtee.backend.Services;

import com.beschtee.backend.Models.person.Customer;
import com.beschtee.backend.Repositories.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class UserService {

    @Autowired
    UserRepository userRepository;

    public void addCustomerToDatabase(Customer customer){
        userRepository.save(customer);
    }
}
