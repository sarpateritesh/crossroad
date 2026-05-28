package com.crossroad.backend.service.impl;

import com.crossroad.backend.dto.BookingRequest;
import com.crossroad.backend.dto.BookingResponse;
import com.crossroad.backend.dto.BookingStatusUpdateRequest;
import com.crossroad.backend.dto.DashboardStatsResponse;
import com.crossroad.backend.entity.Booking;
import com.crossroad.backend.entity.BookingStatus;
import com.crossroad.backend.exception.ResourceNotFoundException;
import com.crossroad.backend.repository.BookingRepository;
import com.crossroad.backend.service.BookingService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BookingServiceImpl implements BookingService {

    private final BookingRepository bookingRepository;

    @Override
    public BookingResponse createBooking(BookingRequest request) {
        Booking booking = Booking.builder()
                .customerName(request.customerName().trim())
                .mobileNumber(request.mobileNumber().trim())
                .email(request.email().trim().toLowerCase())
                .bookingDate(request.bookingDate())
                .bookingTime(request.bookingTime())
                .numberOfGuests(request.numberOfGuests())
                .specialRequest(cleanSpecialRequest(request.specialRequest()))
                .bookingStatus(BookingStatus.PENDING)
                .build();

        return mapToResponse(bookingRepository.save(booking));
    }

    @Override
    public List<BookingResponse> getAllBookings() {
        return bookingRepository.findAll().stream()
                .sorted(Comparator.comparing(Booking::getCreatedAt).reversed())
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    public BookingResponse getBookingById(Long id) {
        return mapToResponse(fetchBooking(id));
    }

    @Override
    public BookingResponse updateBooking(Long id, BookingRequest request) {
        Booking booking = fetchBooking(id);
        booking.setCustomerName(request.customerName().trim());
        booking.setMobileNumber(request.mobileNumber().trim());
        booking.setEmail(request.email().trim().toLowerCase());
        booking.setBookingDate(request.bookingDate());
        booking.setBookingTime(request.bookingTime());
        booking.setNumberOfGuests(request.numberOfGuests());
        booking.setSpecialRequest(cleanSpecialRequest(request.specialRequest()));

        return mapToResponse(bookingRepository.save(booking));
    }

    @Override
    public BookingResponse updateBookingStatus(Long id, BookingStatusUpdateRequest request) {
        Booking booking = fetchBooking(id);
        booking.setBookingStatus(request.bookingStatus());
        return mapToResponse(bookingRepository.save(booking));
    }

    @Override
    public void deleteBooking(Long id) {
        Booking booking = fetchBooking(id);
        bookingRepository.delete(booking);
    }

    @Override
    public DashboardStatsResponse getDashboardStats() {
        return new DashboardStatsResponse(
                bookingRepository.count(),
                bookingRepository.countByBookingStatus(BookingStatus.PENDING),
                bookingRepository.countByBookingStatus(BookingStatus.CONFIRMED),
                bookingRepository.countByBookingStatus(BookingStatus.COMPLETED),
                bookingRepository.countByBookingStatus(BookingStatus.CANCELLED)
        );
    }

    private Booking fetchBooking(Long id) {
        return bookingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found with id: " + id));
    }

    private BookingResponse mapToResponse(Booking booking) {
        return new BookingResponse(
                booking.getId(),
                booking.getCustomerName(),
                booking.getMobileNumber(),
                booking.getEmail(),
                booking.getBookingDate(),
                booking.getBookingTime(),
                booking.getNumberOfGuests(),
                booking.getSpecialRequest(),
                booking.getBookingStatus(),
                booking.getCreatedAt()
        );
    }

    private String cleanSpecialRequest(String value) {
        if (value == null || value.isBlank()) {
            return null;
        }
        return value.trim();
    }
}
