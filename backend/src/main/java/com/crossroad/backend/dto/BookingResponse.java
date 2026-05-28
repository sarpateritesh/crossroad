package com.crossroad.backend.dto;

import com.crossroad.backend.entity.BookingStatus;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

public record BookingResponse(
        Long id,
        String customerName,
        String mobileNumber,
        String email,
        LocalDate bookingDate,
        LocalTime bookingTime,
        Integer numberOfGuests,
        String specialRequest,
        BookingStatus bookingStatus,
        LocalDateTime createdAt
) {
}
