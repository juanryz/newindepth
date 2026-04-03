import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import {
    ChevronLeft, Save, Users, Building2, Phone, Mail, MapPin,
    CreditCard, FileText, Banknote, CheckCircle,
} from 'lucide-react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';

export default function GroupBookingsCreate({ paymentMethods }) {
    const { data, setData, post, processing, errors } = useForm({
        group_name: '',
        institution_name: '',
        address: '',
        pic_name: '',
        pic_phone: '',
        pic_email: '',
        payment_method: paymentMethods?.[0] ?? 'Transfer Bank',
        notes: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.group-bookings.store'));
    };

    const fields = [
        { id: 'group_name', label: 'Nama Grup *', placeholder: 'cth: Komunitas Sehat PKBI Jakarta', icon: Users, required: true },
        { id: 'institution_name', label: 'Nama Institusi / Perusahaan', placeholder: 'cth: PT. Sejahtera Indonesia', icon: Building2 },
        { id: 'pic_name', label: 'Nama PIC (Person in Charge) *', placeholder: 'Nama penanggung jawab grup', icon: Users, required: true },
        { id: 'pic_phone', label: 'Nomor Telepon PIC', placeholder: '081234567890', icon: Phone },
        { id: 'pic_email', label: 'Email PIC', placeholder: 'pic@email.com', icon: Mail, type: 'email' },
    ];

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center gap-4">
                    <Link
                        href={route('admin.group-bookings.index')}
                        className="p-2 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 text-gray-400 hover:text-indigo-600 transition-colors shadow-sm"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </Link>
                    <div>
                        <h2 className="text-xl font-black text-gray-900 dark:text-white uppercase tracking-tight">
                            Buat Grup Baru
                        </h2>
                        <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mt-1">
                            Isi data grup/institusi terlebih dahulu
                        </p>
                    </div>
                </div>
            }
        >
            <Head title="Buat Grup Baru" />

            <div className="py-12 bg-gray-50 dark:bg-gray-950 min-h-[calc(100vh-64px)]">
                <div className="max-w-2xl mx-auto sm:px-6 lg:px-8">
                    <form onSubmit={submit} className="space-y-8">

                        {/* Info Banner */}
                        <div className="bg-indigo-50 dark:bg-indigo-950/30 rounded-[2rem] p-6 border border-indigo-100 dark:border-indigo-900/40 flex items-start gap-4">
                            <Users className="w-8 h-8 text-indigo-500 flex-shrink-0 mt-0.5" />
                            <div>
                                <p className="font-black text-indigo-900 dark:text-indigo-200 text-sm uppercase tracking-wide">Panduan Grup Booking</p>
                                <p className="text-xs text-indigo-700 dark:text-indigo-400 font-medium mt-1 leading-relaxed">
                                    Setelah membuat grup, Anda bisa menambahkan anggota satu per satu. Invoice grup akan tersedia di halaman detail setelah ada anggota.
                                    Semua anggota grup mendapatkan sesi <strong>offline</strong> di klinik.
                                </p>
                            </div>
                        </div>

                        {/* Data Grup */}
                        <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 shadow-xl border border-white dark:border-gray-800">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="p-3 bg-indigo-50 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 rounded-2xl">
                                    <Building2 className="w-5 h-5" />
                                </div>
                                <h3 className="text-sm font-black text-gray-900 dark:text-white uppercase tracking-[0.2em]">Data Grup & PIC</h3>
                            </div>

                            <div className="space-y-5">
                                {fields.map(({ id, label, placeholder, icon: Icon, type = 'text', required }) => (
                                    <div key={id} className="space-y-2">
                                        <InputLabel className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">{label}</InputLabel>
                                        <div className="relative">
                                            <TextInput
                                                type={type}
                                                className="w-full bg-gray-50 dark:bg-gray-950 border-transparent focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 rounded-2xl pl-12 pr-6 py-4 text-sm font-bold text-gray-900 dark:text-white transition-all"
                                                value={data[id]}
                                                onChange={(e) => setData(id, e.target.value)}
                                                placeholder={placeholder}
                                                required={required}
                                            />
                                            <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                        </div>
                                        <InputError message={errors[id]} className="mt-2" />
                                    </div>
                                ))}

                                {/* Alamat */}
                                <div className="space-y-2">
                                    <InputLabel className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Alamat Lengkap</InputLabel>
                                    <div className="relative">
                                        <textarea
                                            rows={3}
                                            className="w-full bg-gray-50 dark:bg-gray-950 border-transparent focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 rounded-2xl pl-12 pr-6 py-4 text-sm font-bold text-gray-900 dark:text-white transition-all resize-none"
                                            value={data.address}
                                            onChange={(e) => setData('address', e.target.value)}
                                            placeholder="Alamat lengkap institusi/grup..."
                                        />
                                        <MapPin className="absolute left-4 top-4 w-4 h-4 text-gray-400" />
                                    </div>
                                    <InputError message={errors.address} className="mt-2" />
                                </div>
                            </div>
                        </div>

                        {/* Metode Pembayaran */}
                        <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 shadow-xl border border-white dark:border-gray-800">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="p-3 bg-orange-50 dark:bg-orange-900/40 text-orange-600 dark:text-orange-400 rounded-2xl">
                                    <CreditCard className="w-5 h-5" />
                                </div>
                                <h3 className="text-sm font-black text-gray-900 dark:text-white uppercase tracking-[0.2em]">Metode Pembayaran Grup</h3>
                            </div>

                            <div className="space-y-3">
                                {(paymentMethods || []).map((method) => {
                                    const Icon = method === 'Cash' ? Banknote : CreditCard;
                                    const isSelected = data.payment_method === method;
                                    return (
                                        <label key={method} className={`flex items-center gap-4 p-5 rounded-2xl border-2 cursor-pointer transition-all ${
                                            isSelected
                                                ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-600/20'
                                                : 'bg-gray-50 dark:bg-gray-800 border-gray-100 dark:border-gray-700 hover:border-indigo-300'
                                        }`}>
                                            <input type="radio" className="hidden" name="payment_method" value={method} checked={isSelected} onChange={() => setData('payment_method', method)} />
                                            <Icon className={`w-5 h-5 flex-shrink-0 ${isSelected ? 'text-white' : 'text-indigo-500'}`} />
                                            <p className="text-sm font-black uppercase tracking-widest">{method}</p>
                                        </label>
                                    );
                                })}
                                <InputError message={errors.payment_method} className="mt-2" />
                            </div>
                        </div>

                        {/* Catatan */}
                        <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 shadow-xl border border-white dark:border-gray-800">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="p-3 bg-teal-50 dark:bg-teal-900/40 text-teal-600 dark:text-teal-400 rounded-2xl">
                                    <FileText className="w-5 h-5" />
                                </div>
                                <h3 className="text-sm font-black text-gray-900 dark:text-white uppercase tracking-[0.2em]">Catatan (Opsional)</h3>
                            </div>
                            <textarea
                                rows={4}
                                className="w-full bg-gray-50 dark:bg-gray-950 border-transparent focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 rounded-2xl px-6 py-4 text-sm font-medium text-gray-900 dark:text-white transition-all resize-none"
                                placeholder="Catatan khusus untuk grup ini..."
                                value={data.notes}
                                onChange={(e) => setData('notes', e.target.value)}
                            />
                            <InputError message={errors.notes} className="mt-2" />
                        </div>

                        {/* Submit */}
                        <div className="flex items-center justify-between bg-white dark:bg-gray-900 p-6 rounded-[2rem] shadow-xl border border-white dark:border-gray-800 sticky bottom-8">
                            <Link href={route('admin.group-bookings.index')} className="text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-gray-600 transition-colors px-6">
                                Batal
                            </Link>
                            <button
                                type="submit"
                                disabled={processing}
                                className="flex items-center gap-3 px-8 py-4 bg-indigo-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-600/20 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
                            >
                                <Save className="w-4 h-4" />
                                Buat Grup & Lanjut
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
