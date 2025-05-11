package com.library;

import com.library.model.Admin;
import com.library.repository.AdminRepository;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class LibraryApplication {

    public static void main(String[] args) {
        SpringApplication.run(LibraryApplication.class, args);
    }

    @Bean
    public ApplicationRunner initializer(AdminRepository repo) {
        return args -> {
            if (repo.findById(1L).isEmpty()) {
                Admin admin = new Admin();
                admin.setId(1L);
                admin.setUsername("admin");
                admin.setPassword("admin");
                repo.save(admin);
            }
        };
    }
}
