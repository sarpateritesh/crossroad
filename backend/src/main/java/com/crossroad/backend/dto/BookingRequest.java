package com.crossroad.backend.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;
import java.time.LocalTime;

public record BookingRequest(
        @NotBlank(message = "Name is required")
        @Size(min = 2, max = 80, message = "Name must be between 2 and 80 characters")
        String customerName,

        @NotBlank(message = "Phone number is required")
        @Pattern(regexp = "^[6-9]\\d{9}$", message = "Phone number must be a valid 10 digit Indian mobile number")
        String mobileNumber,

        @NotBlank(message = "Email is required")
        @Email(message = "Email must be valid")
        @Size(max = 120, message = "Email cannot exceed 120 characters")
        String email,

        @NotNull(message = "Booking date is required")
        @FutureOrPresent(message = "Booking date cannot be in the past")
        LocalDate bookingDate,

        @NotNull(message = "Booking time is required")
        LocalTime bookingTime,

        @NotNull(message = "Guests is required")
        @Min(value = 1, message = "At least 1 guest is required")
        @Max(value = 20, message = "Guests cannot be more than 20")
        Integer numberOfGuests,

        @Size(max = 700, message = "Special request cannot exceed 700 characters")
        String specialRequest
) {
}
