package com.crossroad.backend.dto;

public record DashboardStatsResponse(
        long totalBookings,
        long pendingBookings,
        long confirmedBookings,
        long completedBookings,
        long cancelledBookings
) {
}
