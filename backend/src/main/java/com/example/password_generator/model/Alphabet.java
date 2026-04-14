package com.example.password_generator.model;

public class Alphabet {

    public static final String UPPERCASE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    public static final String LOWERCASE = "abcdefghijklmnopqrstuvwxyz";
    public static final String NUMBERS = "1234567890";
    public static final String SYMBOLS = "!@#$%^&*()-_=+\\/~?";

    private final StringBuilder pool = new StringBuilder();

    public Alphabet(boolean upper, boolean lower, boolean num, boolean sym) {
        if (upper) pool.append(UPPERCASE);
        if (lower) pool.append(LOWERCASE);
        if (num) pool.append(NUMBERS);
        if (sym) pool.append(SYMBOLS);
    }

    public String getPool() {
        return pool.toString();
    }
}