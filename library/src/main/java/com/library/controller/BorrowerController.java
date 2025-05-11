package com.library.controller;

import com.library.model.Borrower;
import com.library.repository.BorrowerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/borrowers")
public class BorrowerController {

    @Autowired
    private BorrowerRepository borrowerRepo;

    @GetMapping
    public List<Borrower> getAll() {
        return borrowerRepo.findAll();
    }

    @PostMapping
    public Borrower create(@RequestBody Borrower b) {
        return borrowerRepo.save(b);
    }

    @PutMapping("/{id}")
    public Borrower update(@PathVariable Long id, @RequestBody Borrower b) {
        b.setId(id);
        return borrowerRepo.save(b);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        borrowerRepo.deleteById(id);
    }
}
