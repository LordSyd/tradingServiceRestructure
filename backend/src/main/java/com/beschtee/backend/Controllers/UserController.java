package com.beschtee.backend.Controllers;

import com.beschtee.backend.Models.person.User;
import com.beschtee.backend.Models.person.UserRole;
import com.beschtee.backend.Services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequestMapping(path = "/api/user")
@RequiredArgsConstructor
public class UserController {

    @Autowired
    private final UserService userService;

    /**
     * @return List of all users
     */
    @RequestMapping(method = RequestMethod.GET, path = "/all")
    public List<User> getUsers() {
        List<User> users = userService.getAllUsers();
        return users;
    }

    /**
     * @return List of customers
     */
    @RequestMapping(method = RequestMethod.GET, path = "/customer/all")
    public List<User> getCustomers() {
        List<User> users = userService.getAllUsersByRole(UserRole.CUSTOMER);
        return users;
    }

    /**
     * Returns user (regardless of its role) by email
     * @param email - is a unique key in user table
     * @return User object or error message
     */
    @RequestMapping(method = RequestMethod.GET, path = "/username")
    public ResponseEntity getUserByUsername(@RequestParam String email) {
        try {
            return ResponseEntity.ok(this.userService.loadUserByUsername(email));
        } catch (NoSuchElementException e) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(e.getMessage());
        }
    }

    @RequestMapping(method = RequestMethod.GET, path = "/customer/id")
    public ResponseEntity getCustomerById(@RequestParam Long id) {
        try {
            return ResponseEntity.ok(this.userService.getCustomerById(id));
        } catch ( NoSuchElementException e) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(e.getMessage());
        }
    }

    @RequestMapping(method = RequestMethod.GET, path = "/customer/name")
    public ResponseEntity getCustomerByName(@RequestParam String firstName, @RequestParam String lastName) {
        try {
            return ResponseEntity.ok(this.userService.getCustomerByName(firstName, lastName));
        } catch ( NoSuchElementException e) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(e.getMessage());
        }
    }

    /**
     * @param id
     * @return User by id or error message
     */
    @RequestMapping(method = RequestMethod.GET, path = "/id")
    public ResponseEntity getUserById(@RequestParam Long id) {
        try {
            return ResponseEntity.ok(this.userService.getUserById(id));
        } catch ( NoSuchElementException e) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(e.getMessage());
        }
    }

    @RequestMapping(method = RequestMethod.GET, path = "/name")
    public ResponseEntity getUserByName(@RequestParam String firstName, @RequestParam String lastName) {
        try {
            return ResponseEntity.ok(this.userService.getUserByName(firstName, lastName));
        } catch ( NoSuchElementException e) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(e.getMessage());
        }
    }
}
