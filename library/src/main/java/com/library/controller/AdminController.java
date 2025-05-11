package com.library.controller;

import com.library.model.Admin;
import com.library.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private AdminRepository adminRepo;

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody Admin admin) {
        return adminRepo.findByUsernameAndPassword(admin.getUsername(), admin.getPassword())
                .map(a -> ResponseEntity.ok("Login successful"))
                .orElse(ResponseEntity.status(401).body("Invalid credentials"));
    }
}
