import { useCallback, useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { RiDeleteBin6Line, RiRefreshLine, RiSearchLine, RiFilterLine, RiUserLine, RiCalendarLine, RiGroupLine, RiBarChartFill } from 'react-icons/ri'
import { pageTransition } from '../animations/motionVariants'
import { deleteBooking, getBookings, getDashboardStats, updateBookingStatus } from '../services/bookingService'

const STATUS_OPTIONS = ['PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELLED']

export default function AdminDashboardPage() {
  const [bookings, setBookings] = useState([])
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('ALL')

  const loadData = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const [bookingData, statsData] = await Promise.all([getBookings(), getDashboardStats()])
      setBookings(bookingData)
      setStats(statsData)
    } catch (fetchError) {
      setError(fetchError.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadData()
  }, [loadData])

  const filteredBookings = useMemo(() => {
    return bookings.filter((b) => {
      const matchesSearch = b.customerName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            b.mobileNumber.includes(searchTerm) || 
                            b.email.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = filterStatus === 'ALL' || b.bookingStatus === filterStatus
      return matchesSearch && matchesStatus
    })
  }, [bookings, searchTerm, filterStatus])

  const handleStatusChange = async (id, status) => {
    try {
      await updateBookingStatus(id, status)
      await loadData()
    } catch (e) { setError(e.message) }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Erase this record permanently?')) return
    try {
      await deleteBooking(id)
      await loadData()
    } catch (e) { setError(e.message) }
  }

  return (
    <motion.main
      initial={pageTransition.initial}
      animate={pageTransition.animate}
      exit={pageTransition.exit}
      transition={pageTransition.transition}
      className="pt-32 pb-24 px-5 md:px-10 min-h-screen bg-luxury-black"
    >
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <span className="text-luxury-gold uppercase tracking-[0.4em] text-xs block mb-4">Internal Access</span>
            <h1 className="font-display text-5xl md:text-7xl text-white">Command <span className="text-luxury-gold italic">Center</span></h1>
          </div>
          <button onClick={loadData} className="luxury-button flex items-center gap-3">
            <RiRefreshLine className={loading ? 'animate-spin' : ''} />
            <span>Sync Data</span>
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {stats && [
            { label: 'Total', value: stats.totalBookings, color: 'text-white' },
            { label: 'Pending', value: stats.pendingBookings, color: 'text-luxury-gold' },
            { label: 'Confirmed', value: stats.confirmedBookings, color: 'text-green-400' },
            { label: 'Completed', value: stats.completedBookings, color: 'text-blue-400' },
            { label: 'Cancelled', value: stats.cancelledBookings, color: 'text-luxury-orange' },
          ].map((s) => (
            <motion.div 
              key={s.label}
              whileHover={{ y: -5 }}
              className="glass-card p-6 border-l-2 border-l-luxury-gold"
            >
              <p className="text-[10px] uppercase tracking-widest text-zinc-500 mb-2">{s.label}</p>
              <p className={`text-4xl font-display ${s.color}`}>{s.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Search & Filters */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <RiSearchLine className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-500" />
            <input 
              type="text" 
              placeholder="Search guests..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-14 py-4 text-sm text-white focus:border-luxury-gold/50 outline-none transition-all"
            />
          </div>
          <div className="relative w-full md:w-64">
            <RiFilterLine className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-500" />
            <select 
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-14 py-4 text-sm text-white focus:border-luxury-gold/50 outline-none appearance-none cursor-pointer"
            >
              <option value="ALL">All Status</option>
              {STATUS_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>
        </div>

        {/* Bookings List */}
        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {filteredBookings.map((b) => (
              <motion.div
                key={b.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="glass-card p-6 flex flex-col md:flex-row items-center justify-between gap-6 hover:border-white/20"
              >
                <div className="flex items-center gap-6 w-full md:w-auto">
                  <div className="w-12 h-12 rounded-2xl bg-luxury-gold/10 flex items-center justify-center text-luxury-gold">
                    <RiUserLine className="text-xl" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl text-white">{b.customerName}</h3>
                    <div className="flex gap-4 text-xs text-zinc-500 mt-1">
                      <span>{b.mobileNumber}</span>
                      <span>{b.email}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-8 items-center w-full md:w-auto">
                  <div className="flex items-center gap-3 text-sm text-zinc-300">
                    <RiCalendarLine className="text-luxury-gold" />
                    <span>{b.bookingDate} @ {b.bookingTime}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-zinc-300">
                    <RiGroupLine className="text-luxury-gold" />
                    <span>{b.numberOfGuests} Guests</span>
                  </div>
                  
                  <select 
                    value={b.bookingStatus}
                    onChange={(e) => handleStatusChange(b.id, e.target.value)}
                    className="bg-luxury-black border border-white/10 rounded-xl px-4 py-2 text-xs uppercase tracking-widest text-luxury-gold outline-none"
                  >
                    {STATUS_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
                  </select>

                  <button 
                    onClick={() => handleDelete(b.id)}
                    className="w-10 h-10 rounded-xl border border-white/10 flex items-center justify-center text-zinc-500 hover:text-luxury-orange hover:border-luxury-orange transition-all"
                  >
                    <RiDeleteBin6Line />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {!loading && filteredBookings.length === 0 && (
            <div className="text-center py-20 glass-card">
              <p className="text-zinc-500 italic">No matches found in the registry.</p>
            </div>
          )}
        </div>
      </div>
    </motion.main>
  )
}
