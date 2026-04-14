package com.example.password_generator.service;

import com.example.password_generator.model.*;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.util.ArrayList;
import java.util.List;

@Service
public class PasswordService {

    private final SecureRandom random = new SecureRandom();

    public Password generatePassword(PasswordRequest req) {

        Alphabet alphabet = new Alphabet(
                req.isUpper(),
                req.isLower(),
                req.isNumbers(),
                req.isSymbols()
        );

        String pool = alphabet.getPool();

        if (pool.isEmpty()) {
            throw new RuntimeException("Select at least one character type");
        }

        List<Character> password = new ArrayList<>();

        // ✅ Ensure each selected type is included
        if (req.isUpper()) password.add(randomChar(Alphabet.UPPERCASE));
        if (req.isLower()) password.add(randomChar(Alphabet.LOWERCASE));
        if (req.isNumbers()) password.add(randomChar(Alphabet.NUMBERS));
        if (req.isSymbols()) password.add(randomChar(Alphabet.SYMBOLS));

        // Fill remaining
        while (password.size() < req.getLength()) {
            password.add(randomChar(pool));
        }

        // Shuffle
        java.util.Collections.shuffle(password);

        StringBuilder result = new StringBuilder();
        for (char c : password) result.append(c);

        return new Password(result.toString());
    }

    private char randomChar(String str) {
        return str.charAt(random.nextInt(str.length()));
    }

    public String checkStrength(String input) {
        return new Password(input).calculateScore();
    }
}