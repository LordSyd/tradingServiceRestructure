package com.beschtee.backend.Controllers;

import com.beschtee.backend.Models.person.Customer;
import com.beschtee.backend.Services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "/api/v1/user")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping(value = "createCustomer")
    public void createNewCustomer(@RequestBody Customer customer){
        userService.addCustomerToDatabase(customer);
    }
}
