import React from 'react';

export default function TimeSlotPicker({ schedules = [], selectedScheduleId, onSelect }) {
    if (schedules.length === 0) {
        return (
            <div className="p-4 bg-gray-50 border border-gray-200 rounded-md text-gray-500 text-sm">
                Belum ada jadwal yang tersedia untuk saat ini.
            </div>
        );
    }

    // Group schedules by date
    const grouped = schedules.reduce((acc, curr) => {
        if (!acc[curr.date]) acc[curr.date] = [];
        acc[curr.date].push(curr);
        return acc;
    }, {});

    return (
        <div className="space-y-6">
            {Object.entries(grouped).map(([date, slots]) => (
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
            ))}
        </div>
    );
}
