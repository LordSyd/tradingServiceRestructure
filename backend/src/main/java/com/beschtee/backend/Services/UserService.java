package com.beschtee.backend.Services;

import com.beschtee.backend.DTOs.RegistrationRequest;
import com.beschtee.backend.Models.person.User;
import com.beschtee.backend.Models.person.UserRole;
import com.beschtee.backend.Repositories.UserRepository;
import com.beschtee.backend.Validators.EmailValidator;
import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class UserService implements UserDetailsService {
    private final String USER_NOT_FOUND_MSG = "User with email %s not found";
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final UserRepository userRepository;
    private final EmailValidator emailValidator;

    public User getUserById(Long id) {
        return userRepository.findById(id).orElseThrow(() ->
            new IllegalStateException("User with id " + id + " does not exist."));
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public void deleteUser(Long id) {
        boolean exists = userRepository.existsById(id);
        if (!exists) {
            throw new IllegalStateException("User with id " + id + " does not exist.");
        }
        userRepository.deleteById(id);
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return userRepository.findUserByEmail(email)
                .orElseThrow(()-> new UsernameNotFoundException(String.format(USER_NOT_FOUND_MSG, email)));
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
        boolean userExists = userRepository.findUserByEmail(user.getEmail()).isPresent();

        //TODO: change the way the problem with already existing user is handled
        if (userExists) {
            throw new IllegalStateException("email already taken");
        }
        //encoding the password
        String encodedPassword = bCryptPasswordEncoder.encode(user.getPassword());
        user.setPassword(encodedPassword);

        //saving the user in the database
        User savedUser = userRepository.save(user);

        return savedUser;
    }


}
