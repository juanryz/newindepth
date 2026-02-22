import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, usePage } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';

export default function PaymentUpload({ booking, transaction }) {
    const { errors: pageErrors } = usePage().props;

    const { data, setData, post, processing, errors } = useForm({
        payment_bank: '',
        payment_method: 'Transfer Bank',
        payment_proof: null,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('payments.store', booking.id));
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Upload Bukti Pembayaran</h2>}
        >
            <Head title="Upload Pembayaran" />

            <div className="py-12">
                <div className="max-w-2xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-8">

                        <div className="mb-8 p-4 bg-indigo-50 rounded-lg border border-indigo-100">
                            <h3 className="text-lg font-bold text-indigo-900 mb-2">Instruksi Pembayaran</h3>
                            <p className="text-sm text-indigo-800 mb-4">
                                Silakan transfer ke salah satu rekening berikut sejumlah tepat <strong>Rp {new Intl.NumberFormat('id-ID').format(transaction.amount || 0)}</strong>:
                            </p>
                            <ul className="text-sm text-indigo-800 list-disc ml-5 space-y-1 font-medium">
                                <li>BCA: 8720394817 a.n. InDepth Mental Wellness</li>
                                <li>Mandiri: 1390028471530 a.n. InDepth Mental Wellness</li>
                            </ul>
                        </div>

                        {pageErrors.error && (
                            <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50">
                                {pageErrors.error}
                            </div>
                        )}

                        <form onSubmit={submit} className="space-y-6">
                            <div>
                                <InputLabel htmlFor="payment_bank" value="Bank Pengirim" />
                                <TextInput
                                    id="payment_bank"
                                    type="text"
                                    placeholder="Contoh: BCA / Mandiri / BNI"
                                    className="mt-1 block w-full"
                                    value={data.payment_bank}
                                    onChange={(e) => setData('payment_bank', e.target.value)}
                                    required
                                />
                                {errors.payment_bank && <p className="text-sm text-red-600 mt-2">{errors.payment_bank}</p>}
                            </div>

                            <div>
                                <InputLabel htmlFor="payment_proof" value="Upload Bukti Transfer (JPG/PNG)" />
                                <input
                                    id="payment_proof"
                                    type="file"
                                    accept="image/*"
                                    className="mt-2 block w-full text-sm text-gray-500
                                      file:mr-4 file:py-2 file:px-4
                                      file:rounded-full file:border-0
                                      file:text-sm file:font-semibold
                                      file:bg-indigo-50 file:text-indigo-700
                                      hover:file:bg-indigo-100"
                                    onChange={(e) => setData('payment_proof', e.target.files[0])}
                                    required
                                />
                                {errors.payment_proof && <p className="text-sm text-red-600 mt-2">{errors.payment_proof}</p>}
                            </div>

                            <div className="flex items-center justify-end mt-4">
                                <PrimaryButton className="ml-4 !bg-blue-600 hover:!bg-blue-500 !rounded-md !px-6 !py-2.5 !text-sm !font-bold" disabled={processing}>
                                    Upload dan Konfirmasi
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
