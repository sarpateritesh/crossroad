const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api'

async function parseResponse(response) {
  if (response.ok) {
    if (response.status === 204) {
      return null
    }
    return response.json()
  }

  let errorMessage = 'Something went wrong'

  try {
    const payload = await response.json()
    if (payload?.validationErrors) {
      errorMessage = Object.values(payload.validationErrors)[0]
    } else if (payload?.message) {
      errorMessage = payload.message
    }
  } catch {
    errorMessage = `Request failed with status ${response.status}`
  }

  throw new Error(errorMessage)
}

export async function createBooking(payload) {
  const response = await fetch(`${API_BASE_URL}/bookings`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })

  return parseResponse(response)
}

export async function getBookings() {
  const response = await fetch(`${API_BASE_URL}/bookings`)
  return parseResponse(response)
}

export async function getDashboardStats() {
  const response = await fetch(`${API_BASE_URL}/bookings/stats`)
  return parseResponse(response)
}

export async function updateBookingStatus(id, status) {
  const response = await fetch(`${API_BASE_URL}/bookings/${id}/status`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ bookingStatus: status }),
  })

  return parseResponse(response)
}

export async function deleteBooking(id) {
  const response = await fetch(`${API_BASE_URL}/bookings/${id}`, {
    method: 'DELETE',
  })

  return parseResponse(response)
}
