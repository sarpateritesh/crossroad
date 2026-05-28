package com.crossroad.backend.service;

import com.crossroad.backend.dto.BookingRequest;
import com.crossroad.backend.dto.BookingResponse;
import com.crossroad.backend.dto.BookingStatusUpdateRequest;
import com.crossroad.backend.dto.DashboardStatsResponse;

import java.util.List;

public interface BookingService {
    BookingResponse createBooking(BookingRequest request);

    List<BookingResponse> getAllBookings();

    BookingResponse getBookingById(Long id);

    BookingResponse updateBooking(Long id, BookingRequest request);

    BookingResponse updateBookingStatus(Long id, BookingStatusUpdateRequest request);

    void deleteBooking(Long id);

    DashboardStatsResponse getDashboardStats();
}
