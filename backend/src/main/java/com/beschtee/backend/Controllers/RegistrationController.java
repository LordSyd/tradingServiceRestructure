package com.beschtee.backend.Controllers;

import com.beschtee.backend.DTOs.RegistrationRequest;
import com.beschtee.backend.Models.person.User;
import com.beschtee.backend.Services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/register")
@RequiredArgsConstructor
public class RegistrationController {

    private final UserService userService;

    //we take information (see RegistrationRequest) to register a person
    @RequestMapping(method = RequestMethod.POST)
    public User register(@RequestBody RegistrationRequest request){
        //return registrationService.register(request);
        User registeredUser = userService.register(request);
        return registeredUser;
    }
}
