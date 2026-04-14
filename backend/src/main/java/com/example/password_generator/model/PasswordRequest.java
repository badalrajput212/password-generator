package com.example.password_generator.model;

import jakarta.validation.constraints.Min;

public class PasswordRequest {

    private boolean upper;
    private boolean lower;
    private boolean numbers;
    private boolean symbols;

    @Min(value = 4, message = "Length must be at least 4")
    private int length;

    // getters & setters
    public boolean isUpper() {
        return upper;
    }

    public void setUpper(boolean upper) {
        this.upper = upper;
    }

    public boolean isLower() {
        return lower;
    }

    public void setLower(boolean lower) {
        this.lower = lower;
    }

    public boolean isNumbers() {
        return numbers;
    }

    public void setNumbers(boolean numbers) {
        this.numbers = numbers;
    }

    public boolean isSymbols() {
        return symbols;
    }

    public void setSymbols(boolean symbols) {
        this.symbols = symbols;
    }

    @Min(value = 4, message = "Length must be at least 4")
    public int getLength() {
        return length;
    }

    public void setLength(@Min(value = 4, message = "Length must be at least 4") int length) {
        this.length = length;
    }

}