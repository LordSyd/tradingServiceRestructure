package com.beschtee.backend.Controllers;

import com.beschtee.backend.DTOs.StockDTO;
import com.beschtee.backend.DTOs.UserDTO;
import com.beschtee.backend.Models.Depot;
import com.beschtee.backend.Models.Stock;
import com.beschtee.backend.Models.person.User;
import com.beschtee.backend.Models.person.UserRole;
import com.beschtee.backend.Services.StockService;
import com.beschtee.backend.Services.UserService;
import com.beschtee.backend.stub.PublicStockQuote;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

@RestController
@RequestMapping(path = "/api/user")
@RequiredArgsConstructor
public class UserController {

    @Autowired
    private final UserService userService;

    @Autowired
    private final StockService stockService;

    @Autowired
    private final TradingServiceController tradingServiceController;

    /**
     * @return List of all users
     */
    @RequestMapping(method = RequestMethod.GET, path = "/all")
    public List<UserDTO> getUsers() {
        return userService.getAllUsers()
                .stream()
                .map(userService::getUserDTO)
                .collect(Collectors.toList());
    }

    /**
     * @return List of customers
     */
    @RequestMapping(method = RequestMethod.GET, path = "/customer/all")
    public List<UserDTO> getCustomers() {
        return userService.getAllUsersByRole(UserRole.CUSTOMER)
                .stream()
                .map(userService::getUserDTO)
                .collect(Collectors.toList());
    }

    /**
     * Returns user (regardless of its role) by email
     * @param email - is a unique key in user table
     * @return User object or error message
     */
    @RequestMapping(method = RequestMethod.GET, path = "/username")
    public ResponseEntity getUserByUsername(@RequestParam String email) {
        try {
            return ResponseEntity.ok(this.userService.getUserDTO( (User) this.userService.loadUserByUsername(email)));
        } catch (NoSuchElementException e) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(e.getMessage());
        }
    }

    @RequestMapping(method = RequestMethod.GET, path = "/customer/id")
    public ResponseEntity getCustomerById(@RequestParam Long id) {
        try {
            return ResponseEntity.ok(this.userService.getUserDTO(this.userService.getCustomerById(id)));
        } catch ( NoSuchElementException e) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(e.getMessage());
        }
    }

    @RequestMapping(method = RequestMethod.GET, path = "/customer/name")
    public ResponseEntity getCustomerByName(@RequestParam String firstName, @RequestParam String lastName) {
        try {
            return ResponseEntity.ok(this.userService.getCustomerByName(firstName, lastName)
                    .stream()
                    .map(userService::getUserDTO)
                    .collect(Collectors.toList())
            );
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
            return ResponseEntity.ok(this.userService.getUserDTO(this.userService.getUserById(id)));
        } catch ( NoSuchElementException e) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(e.getMessage());
        }
    }

    @RequestMapping(method = RequestMethod.GET, path = "/name")
    public ResponseEntity getUserByName(@RequestParam String firstName, @RequestParam String lastName) {
        try {
            return ResponseEntity.ok(this.userService.getUserDTO(this.userService.getUserByName(firstName, lastName)));
        } catch ( NoSuchElementException e) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(e.getMessage());
        }
    }


    @GetMapping("/depot")
    public ResponseEntity getUserDepot(@RequestParam Long depotId) {
        List<Stock> stocks =  this.stockService.getStocksByDepotId(depotId);
        List<String> symbols = stocks.stream()
                .map(Stock::getSymbol)
                .collect(Collectors.toList());
        List<Float> prices = this.tradingServiceController.findStocksBySymbol(symbols).stream()
                .map(PublicStockQuote::getLastTradePrice)
                .map(BigDecimal::floatValue)
                .collect(Collectors.toList());


        List<StockDTO> stockDTOS = new ArrayList<>();
        for(int i = 0; i < stocks.size(); i++) {
            stockDTOS.add(StockDTO.builder()
                    .companyName(stocks.get(i).getCompanyName())
                    .quantity(stocks.get(i).getQuantity())
                    .symbol(stocks.get(i).getSymbol())
                    .currentPrice(prices.get(i))
                    .currentStockVolume((float) stocks.get(i).getQuantity() * prices.get(i))
                    .build()
            );
        }
        return ResponseEntity.ok(stockDTOS);
    }
}
