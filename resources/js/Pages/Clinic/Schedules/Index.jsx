import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage, useForm, router } from '@inertiajs/react';
import Modal from '@/Components/Modal';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

export default function TherapistScheduleIndex({ bookings, availableSchedules = [], calendarSchedules = [] }) {
    const { auth, flash, errors } = usePage().props;
    const isAdmin = auth.user.roles.some(r => ['admin', 'super_admin'].includes(r.name));

    const [selectedHistoryPatient, setSelectedHistoryPatient] = useState(null);
    const [selectedCompletingBooking, setSelectedCompletingBooking] = useState(null);
    const [selectedRescheduleBooking, setSelectedRescheduleBooking] = useState(null);
    const [selectedNoShowBooking, setSelectedNoShowBooking] = useState(null);

    const [activeTab, setActiveTab] = useState('calendar');
    const [isAdding, setIsAdding] = useState(false);
    const { data: scheduleData, setData: setScheduleData, post: postSchedule, processing: addingSchedule, reset: resetSchedule } = useForm({
        date: '',
        start_time: '',
        end_time: '',
        quota: 1,
        schedule_type: 'consultation'
    });

    const { data: completeData, setData: setCompleteData, post: postComplete, processing: completing, reset: resetComplete, errors: completeErrors } = useForm({
        recording_link: '',
        therapist_notes: '',
        patient_visible_notes: '',
        completion_outcome: 'Normal',
    });

    const { data: rescheduleData, setData: setRescheduleData, post: postReschedule, processing: rescheduling, reset: resetReschedule } = useForm({
        new_schedule_id: '',
        reschedule_reason: '',
    });

    const { data: noShowData, setData: setNoShowData, post: postNoShow, processing: markingNoShow, reset: resetNoShow } = useForm({
        no_show_party: 'patient',
        no_show_reason: '',
    });

    const openHistoryModal = (patient) => {
        setSelectedHistoryPatient(patient);
    };

    const closeHistoryModal = () => {
        setSelectedHistoryPatient(null);
    };

    const handleStartSession = (bookingId) => {
        if (confirm('Mulai sesi terapi sekarang? Status akan berubah menjadi Sedang Berlangsung.')) {
            router.post(route('schedules.start', bookingId));
        }
    };

    const openCompleteModal = (booking) => {
        setSelectedCompletingBooking(booking);
        setCompleteData({
            recording_link: booking.recording_link || '',
            therapist_notes: booking.therapist_notes || '',
            patient_visible_notes: booking.patient_visible_notes || '',
            completion_outcome: booking.completion_outcome || 'Normal',
        });
    };

    const closeCompleteModal = () => {
        setSelectedCompletingBooking(null);
        resetComplete();
    };

    const handleCompleteSession = (e) => {
        e.preventDefault();
        postComplete(route('schedules.complete', selectedCompletingBooking.id), {
            onSuccess: () => closeCompleteModal(),
        });
    };

    // Reschedule handlers
    const openRescheduleModal = (booking) => {
        setSelectedRescheduleBooking(booking);
        setRescheduleData({ new_schedule_id: '', reschedule_reason: '' });
    };

    const closeRescheduleModal = () => {
        setSelectedRescheduleBooking(null);
        resetReschedule();
    };

    const handleReschedule = (e) => {
        e.preventDefault();
        postReschedule(route('schedules.reschedule', selectedRescheduleBooking.id), {
            onSuccess: () => closeRescheduleModal(),
        });
    };

    // No-Show handlers
    const openNoShowModal = (booking) => {
        setSelectedNoShowBooking(booking);
        setNoShowData({ no_show_party: 'patient', no_show_reason: '' });
    };

    const closeNoShowModal = () => {
        setSelectedNoShowBooking(null);
        resetNoShow();
    };

    const handleNoShow = (e) => {
        e.preventDefault();
        postNoShow(route('schedules.no-show', selectedNoShowBooking.id), {
            onSuccess: () => closeNoShowModal(),
        });
    };

    const handleAddSchedule = (e) => {
        e.preventDefault();
        postSchedule(route('schedules.store'), {
            onSuccess: () => {
                setIsAdding(false);
                resetSchedule();
            }
        });
    };

    const handleEventClick = (info) => {
        const booking = info.event.extendedProps.bookings?.[0];
        if (booking) {
            // Scroll to the booking in history tab or open detail
            setActiveTab('history');
            // Small delay to ensure tab is rendered
            setTimeout(() => {
                const element = document.getElementById(`booking-${booking.id}`);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    element.classList.add('ring-2', 'ring-indigo-500', 'animate-pulse');
                    setTimeout(() => element.classList.remove('ring-2', 'ring-indigo-500', 'animate-pulse'), 3000);
                }
            }, 100);
        } else {
            if (confirm('Slot ini masih kosong. Hapus slot ini?')) {
                router.delete(route('schedules.destroy', info.event.id));
            }
        }
    };

    const renderEventContent = (eventInfo) => {
        const { event } = eventInfo;
        const isBooked = event.extendedProps.bookings && event.extendedProps.bookings.length > 0;
        const status = isBooked ? event.extendedProps.bookings[0].status : 'available';
        const patientName = isBooked ? event.extendedProps.bookings[0].patient.name : 'Slot Tersedia';
        const therapistName = event.extendedProps.therapist?.name;

        let bgColor = 'bg-indigo-500';
        let textColor = 'text-white';
        let borderColor = 'border-indigo-600';

        if (status === 'confirmed') {
            bgColor = 'bg-emerald-500';
            borderColor = 'border-emerald-600';
        } else if (status === 'in_progress') {
            bgColor = 'bg-red-500';
            borderColor = 'border-red-600';
        } else if (status === 'completed') {
            bgColor = 'bg-gray-500';
            borderColor = 'border-gray-600';
        } else if (status === 'available') {
            bgColor = 'bg-blue-500';
            borderColor = 'border-blue-600';
        }

        return (
            <div className={`p-1 rounded-lg text-xs font-semibold ${bgColor} ${textColor} border ${borderColor} flex flex-col h-full justify-center`}>
                <p className="truncate">{event.title}</p>
                {isAdmin && therapistName && (
                    <p className="truncate text-[9px] opacity-80 mt-0.5 font-bold uppercase tracking-tighter italic">
                        By: {therapistName}
                    </p>
                )}
            </div>
        );
    };

    const calendarStyles = `
        .fc { --fc-border-color: rgba(0,0,0,0.05); font-family: 'Inter', sans-serif; }
        .fc-event { border: none !important; border-radius: 8px !important; padding: 2px !important; cursor: pointer; }
        .fc-toolbar-title { font-size: 1.1rem !important; font-weight: 800 !important; text-transform: uppercase; }
        .fc-button-primary { background: white !important; color: #475569 !important; border: 1px solid #e2e8f0 !important; font-weight: 700 !important; font-size: 11px !important; text-transform: uppercase !important; border-radius: 10px !important; }
        .fc-button-active { background: #4f46e5 !important; color: white !important; border-color: #4f46e5 !important; }
    `;

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tight leading-none">Kelola Jadwal</h2>
                        <p className="text-xs font-bold text-slate-400 mt-2 uppercase tracking-[0.2em]">Atur ketersediaan & pantau sesi terapi</p>
                    </div>
                    <PrimaryButton onClick={() => setIsAdding(true)} className="rounded-2xl px-8 py-4 bg-indigo-600 hover:bg-indigo-700 shadow-xl shadow-indigo-600/20 transition-all active:scale-95 group">
                        <svg className="w-4 h-4 mr-2 group-hover:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4"></path></svg>
                        Tambah Slot Praktik
                    </PrimaryButton>
                </div>
            }
        >
            <Head title="Kelola Jadwal Praktik" />
            <style>{calendarStyles}</style>

            <div className="py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Tabs Navigation */}
                    <div className="flex gap-2 mb-8 bg-slate-100 p-1.5 rounded-[1.5rem] w-fit border border-slate-200/50 shadow-inner">
                        <button
                            onClick={() => setActiveTab('calendar')}
                            className={`px-8 py-3 rounded-[1.2rem] text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'calendar' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700 hover:bg-white/50'}`}
                        >
                            Kalender Jadwal
                        </button>
                        <button
                            onClick={() => setActiveTab('history')}
                            className={`px-8 py-3 rounded-[1.2rem] text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'history' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700 hover:bg-white/50'}`}
                        >
                            Daftar Sesi
                        </button>
                    </div>

                    <div className="bg-white/70 backdrop-blur-xl border border-white/40 shadow-[0_20px_50px_rgba(0,0,0,0.04)] rounded-[3rem] overflow-hidden">
                        <div className="p-8">
                            {activeTab === 'calendar' ? (
                                <div className="animate-in fade-in duration-500">
                                    <FullCalendar
                                        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                                        initialView="timeGridWeek"
                                        headerToolbar={{
                                            left: 'prev,next today',
                                            center: 'title',
                                            right: 'dayGridMonth,timeGridWeek,timeGridDay'
                                        }}
                                        events={calendarSchedules}
                                        eventClick={handleEventClick}
                                        eventContent={renderEventContent}
                                        height="auto"
                                        slotMinTime="07:00:00"
                                        slotMaxTime="22:00:00"
                                        allDaySlot={false}
                                        nowIndicator={true}
                                        locale="id"
                                    />
                                </div>
                            ) : (
                                <div className="space-y-6 animate-in fade-in duration-500">
                                    {bookings.length === 0 ? (
                                        <div className="text-center py-20 bg-gray-50 rounded-[2rem] border-2 border-dashed border-gray-200">
                                            <p className="text-gray-400 font-medium italic">Belum ada sesi yang tercatat.</p>
                                        </div>
                                    ) : (
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                            {bookings.map((booking) => {
                                                const isNoShow = booking.completion_outcome?.startsWith('No-Show');
                                                const wasRescheduled = !!booking.rescheduled_at;
                                                return (
                                                    <div key={booking.id} id={`booking-${booking.id}`} className={`rounded-[2.5rem] border shadow-sm p-7 relative overflow-hidden flex flex-col transition-all duration-300 ${isNoShow ? 'bg-orange-50/30 border-orange-200' : booking.status === 'completed' ? 'bg-gray-50/50 border-gray-200' : booking.status === 'in_progress' ? 'bg-red-50/30 border-red-200 ring-2 ring-red-500 shadow-xl' : 'bg-white border-indigo-100 ring-1 ring-indigo-50 hover:shadow-xl hover:border-indigo-200'}`}>
                                                        {/* Status Badge */}
                                                        <div className="absolute top-6 right-6 text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest bg-white shadow-sm border border-gray-100">
                                                            {isNoShow ? (
                                                                <span className="text-orange-600">Tidak Hadir</span>
                                                            ) : booking.status === 'completed' ? (
                                                                <span className="text-gray-500">Selesai</span>
                                                            ) : booking.status === 'in_progress' ? (
                                                                <span className="text-red-600 animate-pulse">Sedang Berlangsung</span>
                                                            ) : (
                                                                <span className="text-indigo-600">{wasRescheduled ? 'Dijadwal Ulang' : 'Akan Datang'}</span>
                                                            )}
                                                        </div>

                                                        <div className="mb-6 pr-24">
                                                            <h4 className="font-black text-xl text-gray-900 uppercase tracking-tight leading-none mb-1">{booking.patient.name}</h4>
                                                            <p className="text-xs text-gray-400 font-bold italic">{booking.patient.email}</p>
                                                            {isAdmin && (
                                                                <div className="mt-3 flex items-center gap-2">
                                                                    <span className="text-[10px] font-black text-white bg-indigo-500 px-2 py-0.5 rounded uppercase tracking-tighter">Terapis</span>
                                                                    <span className="text-xs font-bold text-indigo-700">{booking.schedule?.therapist?.name}</span>
                                                                </div>
                                                            )}
                                                        </div>

                                                        <div className="bg-indigo-50/50 rounded-3xl p-5 mb-6 border border-indigo-100/50">
                                                            <div className="flex items-center text-xs text-indigo-900 font-black mb-2 uppercase tracking-widest">
                                                                <svg className="w-4 h-4 mr-2 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                                                                {new Date(booking.schedule.date).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                                                            </div>
                                                            <div className="flex items-center text-xs text-indigo-800 font-bold">
                                                                <svg className="w-4 h-4 mr-2 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                                                {booking.schedule.start_time?.substring(0, 5)} - {booking.schedule.end_time?.substring(0, 5)} WIB
                                                            </div>
                                                            <div className="flex items-center text-[10px] font-black text-indigo-600 dark:text-indigo-400 mt-3 pt-3 border-t border-indigo-100/50 uppercase tracking-[0.2em]">
                                                                Paket: {booking.package_type || 'REGULER'}
                                                            </div>
                                                        </div>

                                                        {booking.status === 'completed' && (
                                                            <div className="mb-6 p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
                                                                <p className="text-[10px] font-black text-emerald-800 uppercase tracking-widest mb-1">Hasil / Outcome</p>
                                                                <p className="text-sm font-bold text-emerald-700">{booking.completion_outcome || 'Normal'}</p>
                                                            </div>
                                                        )}

                                                        <div className="flex flex-col gap-3 mt-auto">
                                                            <Link
                                                                href={route('schedules.patient-detail', booking.patient.id)}
                                                                className="w-full text-center text-[10px] font-black text-emerald-700 bg-emerald-50/50 hover:bg-emerald-100 border border-emerald-200 py-3 rounded-2xl transition-all uppercase tracking-widest flex items-center justify-center gap-2"
                                                            >
                                                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                                                Rekam Medis & Detail
                                                            </Link>

                                                            {booking.status === 'confirmed' && (
                                                                <button
                                                                    onClick={() => handleStartSession(booking.id)}
                                                                    className="w-full text-center text-xs font-black text-white bg-indigo-600 hover:bg-indigo-700 py-3 rounded-2xl transition-all shadow-lg shadow-indigo-600/20 uppercase tracking-widest active:scale-95"
                                                                >
                                                                    Mulai Sesi
                                                                </button>
                                                            )}

                                                            {booking.status === 'in_progress' ? (
                                                                <Link
                                                                    href={route('schedules.active-session', booking.id)}
                                                                    className="w-full text-center text-xs font-black text-white bg-red-600 hover:bg-red-700 py-3 rounded-2xl transition-all shadow-lg shadow-red-600/20 uppercase tracking-widest"
                                                                >
                                                                    Selesaikan Sesi
                                                                </Link>
                                                            ) : booking.status === 'completed' && (
                                                                <button
                                                                    onClick={() => openCompleteModal(booking)}
                                                                    className="w-full text-center text-xs font-black text-white bg-slate-900 hover:bg-slate-800 py-3 rounded-2xl transition-all uppercase tracking-widest"
                                                                >
                                                                    Update Data Sesi
                                                                </button>
                                                            )}

                                                            {['confirmed', 'in_progress'].includes(booking.status) && (
                                                                <div className="flex gap-3">
                                                                    <button
                                                                        onClick={() => openRescheduleModal(booking)}
                                                                        className="flex-1 text-center text-[9px] font-black text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-200 py-2.5 rounded-2xl transition-all uppercase tracking-[0.1em]"
                                                                    >
                                                                        Jadwal Ulang
                                                                    </button>
                                                                    <button
                                                                        onClick={() => openNoShowModal(booking)}
                                                                        className="flex-1 text-center text-[9px] font-black text-red-700 bg-red-50 hover:bg-red-100 border border-red-200 py-2.5 rounded-2xl transition-all uppercase tracking-[0.1em]"
                                                                    >
                                                                        Tidak Hadir
                                                                    </button>
                                                                </div>
                                                            )}

                                                            {booking.status === 'completed' && booking.recording_link && (
                                                                <a
                                                                    href={booking.recording_link}
                                                                    target="_blank"
                                                                    rel="noreferrer"
                                                                    className="text-center text-[10px] font-black text-indigo-600 hover:underline mt-2 uppercase tracking-widest flex items-center justify-center gap-2"
                                                                >
                                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                                                                    Lihat Rekaman
                                                                </a>
                                                            )}
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal: Tambah Slot Praktik */}
            <Modal show={isAdding} onClose={() => setIsAdding(false)}>
                <form onSubmit={handleAddSchedule} className="p-8">
                    <h2 className="text-2xl font-black text-gray-900 mb-2 uppercase tracking-tight">Tambah Slot Praktik</h2>
                    <p className="text-sm text-gray-500 mb-8">Buka slot ketersediaan baru untuk janji temu pasien.</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <InputLabel htmlFor="date" value="Tanggal Praktik" />
                            <TextInput
                                id="date"
                                type="date"
                                className="mt-1 block w-full rounded-2xl border-gray-200"
                                value={scheduleData.date}
                                onChange={e => setScheduleData('date', e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <InputLabel htmlFor="quota" value="Kuota (Pasien)" />
                            <TextInput
                                id="quota"
                                type="number"
                                className="mt-1 block w-full rounded-2xl border-gray-200"
                                value={scheduleData.quota}
                                onChange={e => setScheduleData('quota', e.target.value)}
                                min="1"
                                required
                            />
                        </div>
                        <div>
                            <InputLabel htmlFor="start_time" value="Jam Mulai" />
                            <TextInput
                                id="start_time"
                                type="time"
                                className="mt-1 block w-full rounded-2xl border-gray-200"
                                value={scheduleData.start_time}
                                onChange={e => setScheduleData('start_time', e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <InputLabel htmlFor="end_time" value="Jam Selesai" />
                            <TextInput
                                id="end_time"
                                type="time"
                                className="mt-1 block w-full rounded-2xl border-gray-200"
                                value={scheduleData.end_time}
                                onChange={e => setScheduleData('end_time', e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="mt-8 flex justify-end gap-3">
                        <SecondaryButton onClick={() => setIsAdding(false)} className="rounded-2xl">Batal</SecondaryButton>
                        <PrimaryButton type="submit" disabled={addingSchedule} className="rounded-2xl bg-indigo-600 hover:bg-indigo-700">Simpan Slot</PrimaryButton>
                    </div>
                </form>
            </Modal>

            {/* Modal: Patient History */}
            <Modal show={selectedHistoryPatient !== null} onClose={closeHistoryModal} maxWidth="2xl">
                <div className="p-8">
                    <h2 className="text-2xl font-black text-gray-900 mb-2 uppercase tracking-tight">Riwayat Pasien</h2>
                    <div className="mb-8 p-6 bg-slate-50 rounded-[2rem] border border-gray-100">
                        <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">Data & Skrining Pasien</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
                            <div>
                                <p className="text-gray-400 font-bold uppercase text-[10px] tracking-widest mb-1">Kelengkapan Profil</p>
                                <p className="font-black text-gray-800">{selectedHistoryPatient?.patient_profile_stats?.percentage || 0}% Lengkap</p>
                            </div>
                            <div>
                                <p className="text-gray-400 font-bold uppercase text-[10px] tracking-widest mb-1">Hasil Skrining</p>
                                <p className="font-black text-indigo-600">{selectedHistoryPatient?.recommended_package || 'Belum ada data'}</p>
                            </div>
                            <div className="sm:col-span-2">
                                <p className="text-gray-400 font-bold uppercase text-[10px] tracking-widest mb-2">Partisipasi Kelas (Course)</p>
                                <div className="flex flex-wrap gap-2">
                                    {selectedHistoryPatient?.courses?.length > 0 ? (
                                        selectedHistoryPatient.courses.map(course => (
                                            <span key={course.id} className="inline-flex items-center px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest bg-purple-100 text-purple-700 border border-purple-200">
                                                {course.title}
                                            </span>
                                        ))
                                    ) : (
                                        <span className="text-gray-400 italic text-xs">Belum terdaftar di kelas manapun.</span>
                                    )}
                                </div>
                            </div>
                            <div className="sm:col-span-2">
                                <p className="text-gray-400 font-bold uppercase text-[10px] tracking-widest mb-1">Pesan Admin (Skrining)</p>
                                <p className="italic text-gray-600 text-xs bg-white p-4 rounded-2xl border border-gray-100">{selectedHistoryPatient?.screening_results?.[0]?.admin_notes || 'Tidak ada catatan admin.'}</p>
                            </div>
                        </div>
                    </div>

                    <h3 className="text-sm font-black text-gray-900 mb-4 px-2 uppercase tracking-widest">Riwayat Sesi Sebelumnya</h3>
                    <div className="space-y-4 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
                        {selectedHistoryPatient?.bookings?.map(hist => (
                            <div key={hist.id} className={`p-6 rounded-[2rem] border flex gap-5 transition-all ${hist.status === 'completed' ? 'bg-indigo-50/30 border-indigo-100' : 'bg-white border-gray-100'}`}>
                                <div className={`flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center font-black ${hist.status === 'completed' ? 'bg-emerald-500 text-white' : 'bg-gray-100 text-gray-400'}`}>
                                    {hist.status === 'completed' ? '✓' : '...'}
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-black text-gray-900 text-sm uppercase tracking-tight">
                                        {new Date(hist.schedule?.date || '').toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
                                    </h4>
                                    <p className="text-[10px] text-gray-400 font-bold mt-1 uppercase tracking-widest">
                                        Terapis: <span className="text-emerald-600">{hist.schedule?.therapist?.name}</span>
                                    </p>
                                    <div className="mt-3 text-xs bg-white/50 p-4 rounded-2xl border border-gray-100 text-gray-600 italic">
                                        <p className="font-black text-gray-400 uppercase text-[9px] tracking-widest mb-1 not-italic">Catatan Klinis</p>
                                        <p className="whitespace-pre-wrap">{hist.therapist_notes || 'Tidak ada catatan.'}</p>
                                    </div>
                                    {hist.recording_link && (
                                        <a href={hist.recording_link} target="_blank" rel="noreferrer" className="text-[10px] font-black text-indigo-600 hover:underline mt-4 flex items-center gap-2 uppercase tracking-widest">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                                            Link Rekaman Sesi
                                        </a>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-8 flex justify-end">
                        <SecondaryButton onClick={closeHistoryModal} className="rounded-2xl px-8">Tutup</SecondaryButton>
                    </div>
                </div>
            </Modal>

            {/* Modal: Complete Session */}
            <Modal show={selectedCompletingBooking !== null} onClose={closeCompleteModal}>
                <form onSubmit={handleCompleteSession} className="p-8">
                    <h2 className="text-2xl font-black text-gray-900 mb-2 uppercase tracking-tight">Akhiri Sesi</h2>
                    <p className="text-sm text-gray-500 mb-8">
                        Sesi dengan <strong>{selectedCompletingBooking?.patient?.name}</strong> pada {selectedCompletingBooking?.schedule?.date}.
                    </p>

                    <div className="space-y-6">
                        <div>
                            <InputLabel htmlFor="recording_link" value="Link Rekaman YouTube (Private/Unlisted)" />
                            <TextInput
                                id="recording_link"
                                type="url"
                                className="mt-1 block w-full rounded-2xl border-gray-200"
                                placeholder="https://youtu.be/..."
                                value={completeData.recording_link}
                                onChange={(e) => setCompleteData('recording_link', e.target.value)}
                                required
                            />
                        </div>

                        <div>
                            <InputLabel htmlFor="completion_outcome" value="Status Selesai Sesi" />
                            <select
                                id="completion_outcome"
                                className="mt-1 block w-full border-gray-200 rounded-2xl shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm font-bold"
                                value={completeData.completion_outcome}
                                onChange={(e) => setCompleteData('completion_outcome', e.target.value)}
                                required
                            >
                                <option value="Normal">Normal (Selesai dengan Baik)</option>
                                <option value="Abnormal/Emergency">Upnormal / Emergency (Butuh Perhatian Khusus)</option>
                            </select>
                        </div>

                        <div>
                            <InputLabel htmlFor="patient_visible_notes" value="Pesan untuk Pasien (Dashboard Pasien)" />
                            <textarea
                                id="patient_visible_notes"
                                className="mt-1 block w-full border-gray-200 rounded-2xl shadow-sm focus:border-emerald-500 focus:ring-emerald-500 text-sm"
                                rows="3"
                                placeholder="Tuliskan homework atau ringkasan singkat untuk pasien..."
                                value={completeData.patient_visible_notes}
                                onChange={(e) => setCompleteData('patient_visible_notes', e.target.value)}
                            ></textarea>
                        </div>

                        <div>
                            <InputLabel htmlFor="therapist_notes" value="Catatan Klinis (Privat)" />
                            <textarea
                                id="therapist_notes"
                                className="mt-1 block w-full border-gray-200 rounded-2xl shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
                                rows="4"
                                placeholder="Tuliskan perkembangan klinis detail..."
                                value={completeData.therapist_notes}
                                onChange={(e) => setCompleteData('therapist_notes', e.target.value)}
                            ></textarea>
                        </div>
                    </div>

                    <div className="mt-8 flex justify-end gap-3">
                        <SecondaryButton onClick={closeCompleteModal} disabled={completing} className="rounded-2xl">Batal</SecondaryButton>
                        <button
                            type="submit"
                            disabled={completing}
                            className={`inline-flex items-center px-6 py-3 bg-red-600 border border-transparent rounded-2xl font-black text-xs text-white uppercase tracking-widest hover:bg-red-700 active:bg-red-900 transition-all ${completing && 'opacity-25'}`}
                        >
                            Akhiri Sesi & Simpan
                        </button>
                    </div>
                </form>
            </Modal>

            {/* Modal: Reschedule Session */}
            <Modal show={selectedRescheduleBooking !== null} onClose={closeRescheduleModal}>
                <form onSubmit={handleReschedule} className="p-8">
                    <h2 className="text-2xl font-black text-gray-900 mb-2 uppercase tracking-tight">Jadwal Ulang</h2>
                    <p className="text-sm text-gray-500 mb-8">Pasien: <strong>{selectedRescheduleBooking?.patient?.name}</strong></p>

                    <div className="space-y-6">
                        <div>
                            <InputLabel htmlFor="new_schedule_id" value="Pilih Slot Baru" />
                            <select
                                id="new_schedule_id"
                                className="mt-1 block w-full border-gray-200 rounded-2xl shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm font-bold"
                                value={rescheduleData.new_schedule_id}
                                onChange={(e) => setRescheduleData('new_schedule_id', e.target.value)}
                                required
                            >
                                <option value="">-- Pilih Slot Tersedia --</option>
                                {availableSchedules
                                    .filter(s => s.id !== selectedRescheduleBooking?.schedule_id)
                                    .map(s => (
                                        <option key={s.id} value={s.id}>
                                            {new Date(s.date).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long' })} — {s.start_time?.substring(0, 5)} WIB
                                        </option>
                                    ))}
                            </select>
                        </div>

                        <div>
                            <InputLabel htmlFor="reschedule_reason" value="Alasan Perubahan" />
                            <textarea
                                id="reschedule_reason"
                                className="mt-1 block w-full border-gray-200 rounded-2xl shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
                                rows="3"
                                placeholder="Tuliskan alasan rescheduling..."
                                value={rescheduleData.reschedule_reason}
                                onChange={(e) => setRescheduleData('reschedule_reason', e.target.value)}
                                required
                            ></textarea>
                        </div>
                    </div>

                    <div className="mt-8 flex justify-end gap-3">
                        <SecondaryButton onClick={closeRescheduleModal} disabled={rescheduling} className="rounded-2xl">Batal</SecondaryButton>
                        <button
                            type="submit"
                            disabled={rescheduling || !rescheduleData.new_schedule_id}
                            className={`inline-flex items-center px-6 py-3 bg-amber-600 border border-transparent rounded-2xl font-black text-xs text-white uppercase tracking-widest hover:bg-amber-700 transition-all ${(rescheduling || !rescheduleData.new_schedule_id) && 'opacity-25'}`}
                        >
                            Konfirmasi Jadwal Baru
                        </button>
                    </div>
                </form>
            </Modal>

            {/* Modal: Mark No-Show */}
            <Modal show={selectedNoShowBooking !== null} onClose={closeNoShowModal}>
                <form onSubmit={handleNoShow} className="p-8">
                    <h2 className="text-2xl font-black text-gray-900 mb-2 uppercase tracking-tight">Tandai Tidak Hadir</h2>
                    <p className="text-sm text-gray-500 mb-8">Pasien: <strong>{selectedNoShowBooking?.patient?.name}</strong></p>

                    <div className="space-y-6">
                        <div>
                            <InputLabel htmlFor="no_show_party" value="Keterangan Ketidakhadiran" />
                            <select
                                id="no_show_party"
                                className="mt-1 block w-full border-gray-200 rounded-2xl shadow-sm focus:border-red-500 focus:ring-red-500 text-sm font-bold"
                                value={noShowData.no_show_party}
                                onChange={(e) => setNoShowData('no_show_party', e.target.value)}
                                required
                            >
                                <option value="patient">Pasien Berhalangan Hadir</option>
                                <option value="therapist">Praktisi Berhalangan Hadir</option>
                            </select>
                        </div>

                        <div>
                            <InputLabel htmlFor="no_show_reason" value="Keterangan Tambahan" />
                            <textarea
                                id="no_show_reason"
                                className="mt-1 block w-full border-gray-200 rounded-2xl shadow-sm focus:border-red-500 focus:ring-red-500 text-sm"
                                rows="3"
                                placeholder="Detail ketidakhadiran..."
                                value={noShowData.no_show_reason}
                                onChange={(e) => setNoShowData('no_show_reason', e.target.value)}
                            ></textarea>
                        </div>
                    </div>

                    <div className="mt-8 flex justify-end gap-3">
                        <SecondaryButton onClick={closeNoShowModal} disabled={markingNoShow} className="rounded-2xl">Batal</SecondaryButton>
                        <button
                            type="submit"
                            disabled={markingNoShow}
                            className={`inline-flex items-center px-6 py-3 bg-red-600 border border-transparent rounded-2xl font-black text-xs text-white uppercase tracking-widest hover:bg-red-700 transition-all ${markingNoShow && 'opacity-25'}`}
                        >
                            Konfirmasi No-Show
                        </button>
                    </div>
                </form>
            </Modal>
        </AuthenticatedLayout>
    );
}
