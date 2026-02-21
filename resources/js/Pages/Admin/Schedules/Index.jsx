import React, { useState, useRef } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, router } from '@inertiajs/react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import idLocale from '@fullcalendar/core/locales/id';

export default function AdminSchedulesIndex({ schedules, therapists, filters }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        schedule_type: 'consultation',
        date: '',
        session: '',
    });

    const SESSIONS = [
        { id: '1', name: 'Sesi 1 (08:00 - 10:00)', start: '08:00', end: '10:00' },
        { id: '2', name: 'Sesi 2 (10:00 - 12:00)', start: '10:00', end: '12:00' },
        { id: '3', name: 'Sesi 3 (13:00 - 15:00)', start: '13:00', end: '15:00' },
        { id: '4', name: 'Sesi 4 (17:00 - 19:00)', start: '17:00', end: '19:00' },
        { id: '5', name: 'Sesi 5 (19:00 - 21:00)', start: '19:00', end: '21:00' },
    ];

    const [isAdding, setIsAdding] = useState(false);
    const calendarRef = useRef(null);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        router.get(route('admin.schedules.index'), {
            ...filters,
            [name]: value
        }, { preserveState: true });
    };

    const submit = (e) => {
        e.preventDefault();

        const selectedSession = SESSIONS.find(s => s.id === data.session);
        if (!selectedSession) return;

        post(route('admin.schedules.store'), {
            data: {
                schedule_type: data.schedule_type,
                date: data.date,
                start_time: selectedSession.start,
                end_time: selectedSession.end,
            },
            onSuccess: () => {
                reset();
                setIsAdding(false);
            },
        });
    };

    const deleteSchedule = (scheduleId) => {
        if (confirm('Apakah Anda yakin ingin menghapus jadwal ini?')) {
            router.delete(route('admin.schedules.destroy', scheduleId), {
                preserveScroll: true
            });
        }
    };

    // Format events for FullCalendar
    const events = schedules.map(schedule => {
        const isBooked = schedule.bookings && schedule.bookings.length > 0;
        const isClass = schedule.schedule_type === 'class';
        let bg, border, text;
        if (isBooked) {
            bg = '#f3f4f6'; border = '#e5e7eb'; text = '#374151';
        } else if (isClass) {
            bg = '#6366f1'; border = '#4f46e5'; text = '#ffffff'; // indigo for class
        } else {
            bg = '#10b981'; border = '#059669'; text = '#ffffff'; // emerald for consultation
        }
        return {
            id: schedule.id,
            title: `${schedule.therapist?.name || ''} — ${isClass ? '🎓 Kelas' : '👤 Konsultasi'} ${isBooked ? '(Terisi)' : ''}`,
            start: `${schedule.formatted_date || schedule.date.split(' ')[0]}T${schedule.formatted_start || schedule.start_time}`,
            end: `${schedule.formatted_date || schedule.date.split(' ')[0]}T${schedule.formatted_end || schedule.end_time}`,
            backgroundColor: bg,
            borderColor: border,
            textColor: text,
            extendedProps: { ...schedule, isBooked }
        };
    });

    const handleEventClick = (info) => {
        const schedule = info.event.extendedProps;
        if (!schedule.isBooked) {
            deleteSchedule(schedule.id);
        } else {
            alert('Slot yang sudah dipesan tidak dapat dihapus.');
        }
    };

    const printPdf = () => {
        window.print();
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight print:hidden">Manajemen Jadwal Terapis</h2>}
        >
            <Head title="Manajemen Jadwal Terapis" />

            <div className="py-12 print:py-0">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">

                    {/* Filters & Actions - Hidden during print */}
                    <div className="bg-white p-4 shadow-sm sm:rounded-lg flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 print:hidden">
                        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                            <select
                                name="therapist_id"
                                className="border-gray-300 rounded-md shadow-sm text-sm w-full sm:w-48"
                                value={filters.therapist_id || ''}
                                onChange={handleFilterChange}
                            >
                                <option value="">Semua Terapis</option>
                                {therapists.map(t => (
                                    <option key={t.id} value={t.id}>{t.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="flex gap-2 w-full sm:w-auto">
                            <button
                                onClick={printPdf}
                                className="inline-flex items-center px-4 py-2 bg-gray-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition"
                            >
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path></svg>
                                Cetak PDF
                            </button>
                            <button
                                onClick={() => setIsAdding(!isAdding)}
                                className="inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-indigo-700 focus:bg-indigo-700 active:bg-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
                            >
                                {isAdding ? 'Batal Tambah' : '+ Tambah Slot Manual'}
                            </button>
                        </div>
                    </div>

                    {/* Add Schedule Form - Hidden during print */}
                    {isAdding && (
                        <div className="bg-indigo-50 p-6 shadow-sm sm:rounded-lg border border-indigo-100 print:hidden">
                            <h3 className="text-lg font-bold text-indigo-900 mb-4">Tambah Slot Jadwal Baru</h3>
                            <form onSubmit={submit} className="flex flex-col sm:flex-row gap-4 items-end flex-wrap">

                                <div className="w-full sm:w-48">
                                    <label className="block text-sm font-medium text-gray-700">Jenis Jadwal</label>
                                    <select
                                        name="schedule_type"
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        value={data.schedule_type}
                                        onChange={e => setData('schedule_type', e.target.value)}
                                        required
                                    >
                                        <option value="consultation">👤 Konsultasi Pasien</option>
                                        <option value="class">🎓 Kelas / Kelompok</option>
                                    </select>
                                    {errors.schedule_type && <div className="text-red-500 text-xs mt-1">{errors.schedule_type}</div>}
                                </div>
                                <div className="w-full sm:w-48">
                                    <label className="block text-sm font-medium text-gray-700">Tanggal</label>
                                    <input
                                        type="date"
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        value={data.date}
                                        onChange={e => setData('date', e.target.value)}
                                        required
                                        min={new Date().toISOString().split('T')[0]}
                                    />
                                    {errors.date && <div className="text-red-500 text-xs mt-1">{errors.date}</div>}
                                </div>
                                <div className="w-full sm:w-64">
                                    <label className="block text-sm font-medium text-gray-700">Sesi Waktu</label>
                                    <select
                                        name="session"
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        value={data.session}
                                        onChange={e => setData('session', e.target.value)}
                                        required
                                    >
                                        <option value="">Pilih Sesi...</option>
                                        {SESSIONS.map(s => (
                                            <option key={s.id} value={s.id}>{s.name}</option>
                                        ))}
                                    </select>
                                    {errors.start_time && <div className="text-red-500 text-xs mt-1">{errors.start_time}</div>}
                                </div>
                                <div className="w-full sm:w-auto">
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="w-full sm:w-auto inline-flex justify-center items-center px-6 py-2 bg-indigo-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-indigo-700 focus:bg-indigo-700 active:bg-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150 disabled:opacity-50"
                                    >
                                        Simpan
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}

                    {/* Interactive Calendar Setup */}
                    <div className="bg-white shadow-sm sm:rounded-lg border border-gray-100 p-6 print:shadow-none print:border-0 print:p-0">
                        {/* Custom Print Styles injected here for scoping */}
                        <style dangerouslySetEffect={{
                            __html: `
                            @media print {
                                body * { visibility: hidden; }
                                .fc, .fc * { visibility: visible; }
                                .fc {
                                    position: absolute;
                                    left: 0;
                                    top: 0;
                                    width: 100% !important;
                                    margin: 0 !important;
                                    padding: 0 !important;
                                }
                                .fc-header-toolbar { display: none !important; }
                                .fc-scrollgrid { border: none !important; }
                            }
                        `}} />

                        <div className="fc-theme-standard">
                            <FullCalendar
                                ref={calendarRef}
                                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                                initialView="timeGridWeek"
                                headerToolbar={{
                                    left: 'prev,next today',
                                    center: 'title',
                                    right: 'dayGridMonth,timeGridWeek,timeGridDay'
                                }}
                                locales={[idLocale]}
                                locale="id"
                                slotMinTime="08:00:00"
                                slotMaxTime="22:00:00"
                                allDaySlot={false}
                                events={events}
                                eventClick={handleEventClick}
                                eventContent={(arg) => {
                                    return (
                                        <div className="p-1 text-xs leading-tight overflow-hidden cursor-pointer" title={arg.event.title + " (Klik untuk hapus)"}>
                                            <div className="font-bold">{arg.timeText}</div>
                                            <div className="truncate">{arg.event.title}</div>
                                        </div>
                                    )
                                }}
                                height="auto"
                            />
                        </div>
                        <p className="text-xs text-gray-500 mt-3 print:hidden">* Klik pada jadwal yang kosong untuk menghapusnya.</p>
                        <div className="flex items-center gap-4 mt-2 print:hidden">
                            <span className="flex items-center gap-1.5 text-xs text-gray-600">
                                <span className="inline-block w-3 h-3 rounded-full bg-emerald-500"></span> Konsultasi Tersedia
                            </span>
                            <span className="flex items-center gap-1.5 text-xs text-gray-600">
                                <span className="inline-block w-3 h-3 rounded-full bg-indigo-500"></span> Kelas Tersedia
                            </span>
                            <span className="flex items-center gap-1.5 text-xs text-gray-600">
                                <span className="inline-block w-3 h-3 rounded-full bg-gray-300"></span> Sudah Terisi
                            </span>
                        </div>
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}
