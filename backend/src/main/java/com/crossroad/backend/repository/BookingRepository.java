package com.crossroad.backend.repository;

import com.crossroad.backend.entity.Booking;
import com.crossroad.backend.entity.BookingStatus;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookingRepository extends JpaRepository<Booking, Long> {
    long countByBookingStatus(BookingStatus status);
}
