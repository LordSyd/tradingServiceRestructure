package com.beschtee.backend.Services;

import com.beschtee.backend.DTOs.RegistrationRequest;
import com.beschtee.backend.DTOs.UserDTO;
import com.beschtee.backend.Models.Depot;
import com.beschtee.backend.Models.person.User;
import com.beschtee.backend.Models.person.UserRole;
import com.beschtee.backend.Repositories.UserRepository;
import com.beschtee.backend.Validators.EmailValidator;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
@AllArgsConstructor
public class UserService implements UserDetailsService {
    private final String USER_NOT_EXISTS_MSG = "%s with email %s not found";
    private final String CUSTOMER_NOT_EXISTS_MSG = "%1s with id %2s does not exist";
    private final String USER_NOT_FOUND_BY_NAME_MSG = "%1s with first name %2s and last name %3s not found";
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final UserRepository userRepository;
    private final EmailValidator emailValidator;
    private final DepotService depotService;


    public UserDTO getUserDTO(User user) {
        try {
            Depot depot = this.depotService.getDepotByUser(user);
            return user.toDTO(depot.getId());
        } catch (NoSuchElementException e) {
            return user.toDTO(null);
        }
    }

    public User getCurrentUser() {
        User currentUser = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return userRepository.findById(currentUser.getId()).orElseThrow(()->
                new IllegalStateException("Current user with email"+ currentUser.getEmail() + " and id "
                        + currentUser.getId() + " does not exist in the database."));
    }

    public User getCustomerById(Long id) {
        return userRepository.findUserByIdAndUserRoleEquals(id, UserRole.CUSTOMER).orElseThrow(() ->
                new NoSuchElementException(String.format(CUSTOMER_NOT_EXISTS_MSG, "Customer", id))
        );
    }

    public User getCustomerByName(String firstName, String lastName) {
        return this.userRepository.findUserByFirstNameIgnoreCaseAndLastNameIgnoreCaseAndUserRole(
                firstName,
                lastName,
                UserRole.CUSTOMER
        ).orElseThrow(() ->
                new NoSuchElementException(String.format(USER_NOT_FOUND_BY_NAME_MSG, "Customer", firstName, lastName))
        );
    }

    public User getUserById(Long id) {
        return userRepository.findById(id).orElseThrow(() ->
            new NoSuchElementException(String.format(USER_NOT_EXISTS_MSG, "User", id))
        );
    }

    public User getUserByName(String firstName, String lastName) {
        return this.userRepository.findUserByFirstNameIgnoreCaseAndLastNameIgnoreCase(firstName, lastName).orElseThrow(() ->
                new NoSuchElementException(String.format(USER_NOT_FOUND_BY_NAME_MSG, "User", firstName, lastName))
        );
    }

    public List<User> getAllUsersByRole(UserRole userRole) {
        return userRepository.findAllByUserRoleEquals(userRole);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public void deleteUser(Long id) {
        boolean exists = userRepository.existsById(id);
        if (!exists) {
            throw new IllegalStateException(String.format(USER_NOT_EXISTS_MSG, "User", id));
        }
        userRepository.deleteById(id);
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return userRepository.findUserByEmailIgnoreCase(email)
                .orElseThrow(()-> new UsernameNotFoundException(String.format(USER_NOT_EXISTS_MSG, "User", email)));
    }

    public User register(RegistrationRequest request) {
        boolean isValidEmail = emailValidator.test(request.getEmail());

        //TODO: change the way the exception is handled
        if (!isValidEmail) {
            throw new IllegalStateException("email not valid");
        }

        return this.signUpUser(User.builder()
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .address(request.getAddress())
                .email(request.getEmail())
                .password(request.getPassword())
                .userRole(request.getUserRole().equals(UserRole.EMPLOYEE.name()) ? UserRole.EMPLOYEE : UserRole.CUSTOMER)
                .locked(false)
                .enabled(true) //change to false, if want to use email verification
                .build());
    }

    public User signUpUser(User user) {
        boolean userExists = userRepository.findUserByEmailIgnoreCase(user.getEmail()).isPresent();

        //TODO: change the way the problem with already existing user is handled
        if (userExists) {
            throw new IllegalStateException("email already taken");
        }
        //encoding the password
        String encodedPassword = bCryptPasswordEncoder.encode(user.getPassword());
        user.setPassword(encodedPassword);

        //saving the user in the database
        User savedUser = userRepository.save(user);
        if (savedUser.isCustomer()) {
            depotService.createNewDepot(savedUser);
        }

        return savedUser;
    }
}
