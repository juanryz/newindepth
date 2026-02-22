import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import UpdateTherapistProfileForm from './Partials/UpdateTherapistProfileForm';
import ProfileProgressCard from '@/Components/ProfileProgressCard';

export default function Edit({ mustVerifyEmail, status, profileProgress, auth }) {
    const user = auth.user;
    const isPatient = user.roles.some(role => role.name === 'patient');
    const isTherapist = user.roles.some(role => role.name === 'therapist');

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Informasi Profil
                </h2>
            }
        >
            <Head title="Profil" />

            <div className="py-12 relative z-10">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Main Forms */}
                        <div className="flex-1 space-y-6">
                            <div className="bg-white/20 backdrop-blur-[60px] backdrop-saturate-[1.8] border border-white/40 dark:bg-white/[0.03] dark:border-white/[0.08] sm:rounded-[2.5rem] sm:p-10 p-6 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.05)] transition-all duration-700">
                                <UpdateProfileInformationForm
                                    mustVerifyEmail={mustVerifyEmail}
                                    status={status}
                                    className="max-w-xl"
                                />
                            </div>

                            {isTherapist && (
                                <div className="bg-white/20 backdrop-blur-[60px] backdrop-saturate-[1.8] border border-white/40 dark:bg-white/[0.03] dark:border-white/[0.08] sm:rounded-[2.5rem] sm:p-10 p-6 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.05)] transition-all duration-700">
                                    <UpdateTherapistProfileForm className="max-w-2xl" />
                                </div>
                            )}



                            <div className="bg-white/20 backdrop-blur-[60px] backdrop-saturate-[1.8] border border-white/40 dark:bg-white/[0.03] dark:border-white/[0.08] sm:rounded-[2.5rem] sm:p-10 p-6 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.05)] transition-all duration-700">
                                <UpdatePasswordForm className="max-w-xl" />
                            </div>

                            <div className="bg-white/20 backdrop-blur-[60px] backdrop-saturate-[1.8] border border-white/40 dark:bg-white/[0.03] dark:border-white/[0.08] sm:rounded-[2.5rem] sm:p-10 p-6 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.05)] transition-all duration-700">
                                <DeleteUserForm className="max-w-xl" />
                            </div>
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
