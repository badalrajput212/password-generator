package com.example.password_generator.controller;

import com.example.password_generator.model.Password;
import com.example.password_generator.model.PasswordRequest;
import com.example.password_generator.service.PasswordService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/password")
@CrossOrigin("*")
public class PasswordController {

    private final PasswordService service;

    public PasswordController(PasswordService service) {
        this.service = service;
    }

    @PostMapping("/generate")
    public Password generate(@Valid @RequestBody PasswordRequest req) {
        return service.generatePassword(req);
    }

    @GetMapping("/strength")
    public String check(@RequestParam String password) {
        return service.checkStrength(password);
    }
}