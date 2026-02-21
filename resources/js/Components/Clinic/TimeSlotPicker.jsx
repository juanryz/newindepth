import React, { useState } from 'react';

export default function TimeSlotPicker({ schedules = [], selectedScheduleId, onSelect }) {
    if (schedules.length === 0) {
        return (
            <div className="p-4 bg-gray-50 border border-gray-200 rounded-md text-gray-500 text-sm">
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
                        className={`px-4 py-2 text-sm font-medium rounded-full transition-colors border ${filter === tab.id
                            ? 'bg-indigo-600 text-white border-indigo-600'
                            : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                            }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {Object.keys(grouped).length === 0 ? (
                <div className="p-4 bg-gray-50 border border-gray-200 rounded-md text-gray-500 text-sm text-center italic">
                    Tidak ada jadwal yang sesuai dengan filter ini.
                </div>
            ) : (
                Object.entries(grouped).map(([date, slots]) => (
                    <div key={date}>
                        <h4 className="text-md font-semibold text-gray-700 mb-3">
                            {new Date(date).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                        </h4>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            {slots.map((slot) => {
                                const isSelected = selectedScheduleId === slot.id;
                                const count = slot.bookings_count ?? slot.booked_count ?? 0;
                                const isFull = slot.status === 'full' || count >= slot.quota;

                                return (
                                    <button
                                        key={slot.id}
                                        type="button"
                                        onClick={() => !isFull && onSelect(slot.id)}
                                        disabled={isFull}
                                        className={`
                                        flex flex-col items-center justify-center p-3 rounded-lg border-2 transition-all
                                        ${isFull ? 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed' : ''}
                                        ${!isFull && isSelected ? 'bg-indigo-50 border-indigo-500 text-indigo-700' : ''}
                                        ${!isFull && !isSelected ? 'bg-white border-gray-200 text-gray-700 hover:border-indigo-300 hover:shadow-sm' : ''}
                                    `}
                                    >
                                        <span className="font-bold text-sm text-center">
                                            {slot.start_time.substring(0, 5)} - {slot.end_time.substring(0, 5)}
                                        </span>
                                        <span className="text-xs mt-1">
                                            {isFull ? 'Penuh' : `${slot.quota - count} slot sisa`}
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
