package com.crossroad.backend.dto;

import com.crossroad.backend.entity.BookingStatus;
import jakarta.validation.constraints.NotNull;

public record BookingStatusUpdateRequest(
        @NotNull(message = "Status is required")
        BookingStatus bookingStatus
) {
}
