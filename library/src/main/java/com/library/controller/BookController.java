package com.library.controller;

import com.library.model.Book;
import com.library.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/books")
public class BookController {

    @Autowired
    private BookRepository bookRepo;

    @GetMapping
    public List<Book> getAll() {
        return bookRepo.findAll();
    }

    @PostMapping
    public Book create(@RequestBody Book book) {
        return bookRepo.save(book);
    }

    @PutMapping("/{id}")
    public Book update(@PathVariable Long id, @RequestBody Book b) {
        b.setId(id);
        return bookRepo.save(b);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        bookRepo.deleteById(id);
    }
}
