import React, { useState } from 'react';

export default function TimeSlotPicker({ schedules = [], selectedScheduleId, onSelect }) {
    if (schedules.length === 0) {
        return (
            <div className="p-4 bg-gray-50/50 dark:bg-gray-900/40 border border-gray-200 dark:border-gray-700/50 rounded-xl text-gray-500 dark:text-gray-400 text-sm italic text-center">
                Belum ada jadwal yang tersedia untuk saat ini.
            </div>
        );
    }

    const [filter, setFilter] = useState('week');

    // Filter schedules
    const filteredSchedules = schedules.filter(curr => {
        const safeDateStr = (curr.date || '').substring(0, 10);

        // Use timezone-neutral epoch math at UTC to guarantee stability across environments
        const dbDate = new Date(`${safeDateStr}T00:00:00Z`);

        // Grab Jakarta time equivalent of "now" by formatting it out and passing back to Date
        const idnFormat = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Jakarta' }).format(new Date());
        const todayDate = new Date(`${idnFormat}T00:00:00Z`);

        switch (filter) {
            case 'day':
                return dbDate.getTime() === todayDate.getTime();
            case 'week':
                const endOfWeek = new Date(todayDate);
                endOfWeek.setDate(todayDate.getDate() + 7);
                return dbDate.getTime() >= todayDate.getTime() && dbDate.getTime() <= endOfWeek.getTime();
            case 'month':
                return dbDate.getUTCMonth() === todayDate.getUTCMonth() && dbDate.getUTCFullYear() === todayDate.getUTCFullYear();
            case 'year':
                return dbDate.getUTCFullYear() === todayDate.getUTCFullYear();
            default:
                return true;
        }
    });

    // Group filtered schedules by true local date (YYYY-MM-DD)
    const grouped = filteredSchedules.reduce((acc, curr) => {
        const safeDateStr = (curr.date || '').substring(0, 10);
        if (!acc[safeDateStr]) acc[safeDateStr] = [];
        acc[safeDateStr].push(curr);
        return acc;
    }, {});

    return (
        <div className="space-y-6">
            <div className="flex flex-wrap gap-2 mb-4">
                {[
                    { id: 'day', label: 'Hari Ini' },
                    { id: 'week', label: 'Minggu Ini' },
                    { id: 'month', label: 'Bulan Ini' },
                    { id: 'year', label: 'Tahun Ini' },
                    { id: 'all', label: 'Semua Jadwal' },
                ].map(tab => (
                    <button
                        key={tab.id}
                        type="button"
                        onClick={() => setFilter(tab.id)}
                        className={`px-4 py-2 text-sm font-bold rounded-full transition-all duration-200 border ${filter === tab.id
                            ? 'bg-indigo-600 text-white border-indigo-600 shadow-md transform -translate-y-0.5'
                            : 'bg-white/40 dark:bg-gray-800/40 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700/50 hover:bg-gray-50 dark:hover:bg-gray-700/60'
                            }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {Object.keys(grouped).length === 0 ? (
                <div className="p-6 bg-gray-50/50 dark:bg-gray-900/40 border border-gray-200 dark:border-gray-700/50 rounded-2xl text-gray-500 dark:text-gray-400 text-sm text-center italic">
                    Tidak ada jadwal yang sesuai dengan filter ini.
                </div>
            ) : (
                Object.entries(grouped).map(([date, slots]) => (
                    <div key={date}>
                        <h4 className="text-sm font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-4 px-2">
                            {new Date(date).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                        </h4>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            {slots.map((slot) => {
                                const isSelected = selectedScheduleId === slot.id;
                                const count = slot.bookings_count ?? slot.booked_count ?? 0;

                                // Buffer: 1 hour prevention (Jakarta Time)
                                const idnNow = new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Jakarta" }));
                                const oneHourFromNow = new Date(idnNow.getTime() + 60 * 60 * 1000);

                                // Slot start time comparison (Jakarta)
                                const slotStart = new Date(`${slot.date.substring(0, 10)}T${slot.start_time}`);

                                const isFull = slot.status === 'full' || count >= slot.quota;
                                const isPast = slotStart < oneHourFromNow;
                                const isDisabled = isFull || isPast;

                                return (
                                    <button
                                        key={slot.id}
                                        type="button"
                                        onClick={() => !isDisabled && onSelect(slot.id)}
                                        disabled={isDisabled}
                                        className={`
                                        flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all duration-200
                                        ${isDisabled ? 'bg-gray-100/50 dark:bg-gray-800/20 border-gray-200 dark:border-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed' : ''}
                                        ${!isDisabled && isSelected ? 'bg-indigo-50/50 dark:bg-indigo-900/20 border-indigo-500 text-indigo-700 dark:text-indigo-400 shadow-md transform -translate-y-1' : ''}
                                        ${!isDisabled && !isSelected ? 'bg-white/40 dark:bg-gray-800/40 border-gray-200 dark:border-gray-700/50 text-gray-700 dark:text-gray-300 hover:border-indigo-300 dark:hover:border-indigo-700 hover:shadow-sm' : ''}
                                    `}
                                    >
                                        <span className="font-bold text-sm text-center">
                                            {slot.start_time.substring(0, 5)} - {slot.end_time.substring(0, 5)}
                                        </span>
                                        <span className="text-xs mt-1">
                                            {isFull ? 'Penuh' : isPast ? 'Lewat' : `${slot.quota - count} slot sisa`}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}
