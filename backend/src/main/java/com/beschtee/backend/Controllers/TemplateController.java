package com.beschtee.backend.Controllers;

import com.beschtee.backend.Services.BankService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.client.RestTemplate;

@CrossOrigin
@Controller
public class TemplateController {
    @Autowired
    private RestTemplate restTemplate;

    @Autowired
    private BankService bankService;

    @GetMapping("/api/dashboard")
    public String goToMainPage() {
        return "Main";
    }

    @GetMapping("/api/test")
    public String goToTestPage() {
        return "Test";
    }

/*
    @GetMapping("/**")
    public String redirectToMain() {
        return "redirect:/main";
    }

 */
}
