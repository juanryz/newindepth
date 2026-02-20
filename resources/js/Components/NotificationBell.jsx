import { useState, useRef, useEffect } from 'react';
import { Link, usePage, router } from '@inertiajs/react';

export default function NotificationBell() {
    const { auth } = usePage().props;
    const notifications = auth.notifications || [];
    const unreadCount = auth.unread_notifications_count || 0;

    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const markAsRead = (id) => {
        router.post(route('notifications.read', id), {}, {
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => {
                // If it's a link, we'll let the user click it later, or we could redirect
            }
        });
    };

    const markAllAsRead = () => {
        router.post(route('notifications.readAll'), {}, {
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => setIsOpen(false)
        });
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative p-2 text-gray-500 hover:text-gold-600 transition-colors dark:text-gray-400 dark:hover:text-gold-400 focus:outline-none"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                {unreadCount > 0 && (
                    <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white ring-2 ring-white dark:ring-gray-900">
                        {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                )}
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 origin-top-right rounded-lg bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50 overflow-hidden border border-gray-100 dark:border-gray-700">
                    <div className="flex items-center justify-between px-4 py-3 bg-gray-50 dark:bg-gray-900/50 border-b border-gray-100 dark:border-gray-700">
                        <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Notifikasi</h3>
                        {unreadCount > 0 && (
                            <button onClick={markAllAsRead} className="text-xs text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 font-medium">
                                Tandai semua dibaca
                            </button>
                        )}
                    </div>

                    <div className="max-h-96 overflow-y-auto">
                        {notifications.length > 0 ? (
                            <div className="divide-y divide-gray-100 dark:divide-gray-700">
                                {notifications.map((notification) => (
                                    <div
                                        key={notification.id}
                                        className={`flex p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors ${notification.read_at ? 'opacity-70' : 'bg-blue-50/50 dark:bg-blue-900/10'}`}
                                    >
                                        <div className="flex-shrink-0 mt-1">
                                            {notification.data.type === 'success' ? (
                                                <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                                                    <svg className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                                    </svg>
                                                </div>
                                            ) : notification.data.type === 'info' ? (
                                                <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                                                    <svg className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                </div>
                                            ) : (
                                                <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
                                                    <svg className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                                    </svg>
                                                </div>
                                            )}
                                        </div>
                                        <div className="ml-3 w-0 flex-1">
                                            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                                {notification.data.title}
                                            </p>
                                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                                {notification.data.message}
                                            </p>
                                            <div className="mt-2 flex space-x-4">
                                                {notification.data.url && (
                                                    <Link
                                                        href={notification.data.url}
                                                        onClick={() => markAsRead(notification.id)}
                                                        className="text-xs font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400"
                                                    >
                                                        Lihat Detail
                                                    </Link>
                                                )}
                                                {!notification.read_at && (
                                                    <button
                                                        onClick={() => markAsRead(notification.id)}
                                                        className="text-xs font-medium text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                                                    >
                                                        Tandai dibaca
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="p-4 text-center text-sm text-gray-500 dark:text-gray-400 py-8">
                                Belum ada notifikasi baru.
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
