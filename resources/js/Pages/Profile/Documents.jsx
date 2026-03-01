import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import UpdatePatientDocumentsForm from './Partials/UpdatePatientDocumentsForm';
import ProfileProgressCard from '@/Components/ProfileProgressCard';

export default function Documents({ profileProgress, auth }) {
    const user = auth.user;
    const isPatient = (user.roles ?? []).includes('patient');

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Identitas Diri & Kontak Darurat
                </h2>
            }
        >
            <Head title="Identitas Diri" />

            <div className="py-12 relative z-10">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Main Forms */}
                        <div className="flex-1 space-y-6">
                            {isPatient && (
                                <div className="bg-white/20 backdrop-blur-[60px] backdrop-saturate-[1.8] border border-white/40 dark:bg-white/[0.03] dark:border-white/[0.08] sm:rounded-[2.5rem] sm:p-10 p-6 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.05)] transition-all duration-700">
                                    <UpdatePatientDocumentsForm className="max-w-2xl" />
                                </div>
                            )}
                        </div>

                        {/* Sidebar Progress */}
                        {isPatient && (
                            <div className="lg:w-80 space-y-6">
                                <div className="sticky top-24">
                                    <ProfileProgressCard profileProgress={profileProgress} showLink={false} />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
