package com.example.password_generator.model;

public class Password {

    private final String value;

    public Password(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }

    public String calculateScore() {
        boolean upper = false, lower = false, num = false, sym = false;

        for (char c : value.toCharArray()) {
            if (Character.isUpperCase(c)) upper = true;
            else if (Character.isLowerCase(c)) lower = true;
            else if (Character.isDigit(c)) num = true;
            else sym = true;
        }

        int score = 0;
        if (upper) score++;
        if (lower) score++;
        if (num) score++;
        if (sym) score++;
        if (value.length() >= 8) score++;
        if (value.length() >= 16) score++;

        if (score == 6) return "Very Strong";
        if (score >= 4) return "Strong";
        if (score >= 3) return "Medium";
        return "Weak";
    }
}