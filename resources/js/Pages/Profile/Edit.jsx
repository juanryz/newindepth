import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import UpdatePatientDocumentsForm from './Partials/UpdatePatientDocumentsForm';
import ServiceAgreementForm from './Partials/ServiceAgreementForm';

export default function Edit({ mustVerifyEmail, status, profileProgress }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Lengkapi Profil & Dokumen
                </h2>
            }
        >
            <Head title="Profil & Dokumen" />

            <div className="py-12 relative z-10">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Main Forms */}
                        <div className="flex-1 space-y-6">
                            <div className="bg-white/60 backdrop-blur-2xl shadow-[0_8px_32px_0_rgba(31,38,135,0.15)] border border-white/80 sm:rounded-2xl sm:p-8 dark:bg-gray-800/40 dark:border-gray-700/50 p-4">
                                <UpdateProfileInformationForm
                                    mustVerifyEmail={mustVerifyEmail}
                                    status={status}
                                    className="max-w-xl"
                                />
                            </div>

                            <div className="bg-white/60 backdrop-blur-2xl shadow-[0_8px_32px_0_rgba(31,38,135,0.15)] border border-white/80 sm:rounded-2xl sm:p-8 dark:bg-gray-800/40 dark:border-gray-700/50 p-4">
                                <UpdatePatientDocumentsForm className="max-w-2xl" />
                            </div>

                            <div className="bg-white/60 backdrop-blur-2xl shadow-[0_8px_32px_0_rgba(31,38,135,0.15)] border border-white/80 sm:rounded-2xl sm:p-8 dark:bg-gray-800/40 dark:border-gray-700/50 p-4">
                                <ServiceAgreementForm className="max-w-4xl" />
                            </div>

                            <div className="bg-white/60 backdrop-blur-2xl shadow-[0_8px_32px_0_rgba(31,38,135,0.15)] border border-white/80 sm:rounded-2xl sm:p-8 dark:bg-gray-800/40 dark:border-gray-700/50 p-4">
                                <UpdatePasswordForm className="max-w-xl" />
                            </div>

                            <div className="bg-white/60 backdrop-blur-2xl shadow-[0_8px_32px_0_rgba(31,38,135,0.15)] border border-white/80 sm:rounded-2xl sm:p-8 dark:bg-gray-800/40 dark:border-gray-700/50 p-4">
                                <DeleteUserForm className="max-w-xl" />
                            </div>
                        </div>

                        {/* Sidebar Progress */}
                        <div className="lg:w-80 space-y-6">
                            <div className="sticky top-24">
                                <ProfileProgressCard profileProgress={profileProgress} showLink={false} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
