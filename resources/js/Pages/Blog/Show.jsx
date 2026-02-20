import React from 'react';
import { Head, Link } from '@inertiajs/react';

export default function PublicBlogShow({ post }) {

    // JSON-LD Schema for rich results (SEO)
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": post.meta_title || post.title,
        "image": post.featured_image ? [`${window.location.origin}/storage/${post.featured_image}`] : [],
        "datePublished": post.published_at,
        "dateModified": post.updated_at,
        "author": [{
            "@type": "Person",
            "name": post.author?.name
        }],
        "publisher": {
            "@type": "Organization",
            "name": "Klinik Hipnoterapi Baru"
        },
        "description": post.meta_description || post.excerpt
    };

    return (
        <div className="min-h-screen bg-white text-gray-900 font-sans antialiased">
            <Head>
                <title>{post.meta_title || post.title} | Klinik Hipnoterapi</title>
                <meta name="description" content={post.meta_description || post.excerpt || ''} />
                {post.meta_keywords && <meta name="keywords" content={post.meta_keywords} />}

                {/* Open Graph limits for social sharing */}
                <meta property="og:title" content={post.meta_title || post.title} />
                <meta property="og:description" content={post.meta_description || post.excerpt || ''} />
                {post.featured_image && <meta property="og:image" content={`${window.location.origin}/storage/${post.featured_image}`} />}
                <meta property="og:type" content="article" />

                {/* Inject JSON-LD Schema */}
                <script type="application/ld+json">
                    {JSON.stringify(jsonLd)}
                </script>
            </Head>

            {/* Header/Nav (Simplified/Placeholder for Public facing page) */}
            <header className="bg-white border-b border-gray-100">
                <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                    <Link href="/" className="text-xl font-extrabold text-indigo-900">Klinik <span className="text-indigo-600">Hipnoterapi</span></Link>
                    <Link href={route('blog.index')} className="text-gray-500 hover:text-indigo-600 flex items-center gap-1 font-medium">
                        &larr; <span className="hidden sm:inline">Kembali ke Blog</span>
                    </Link>
                </div>
            </header>

            <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
                <header className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 leading-tight mb-8">
                        {post.title}
                    </h1>

                    <div className="flex items-center justify-center text-gray-500 gap-4 mb-10">
                        <div className="flex items-center gap-2">
                            <div className="h-8 w-8 bg-indigo-100 rounded-full flex items-center justify-center font-bold text-indigo-700 text-sm">
                                {post.author?.name?.charAt(0)}
                            </div>
                            <span className="font-medium text-gray-800">{post.author?.name}</span>
                        </div>
                        <span className="text-gray-300">|</span>
                        <time dateTime={post.published_at} className="font-medium">
                            {new Date(post.published_at).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
                        </time>
                    </div>

                    {post.featured_image && (
                        <div className="rounded-2xl overflow-hidden shadow-2xl">
                            <img src={`/storage/${post.featured_image}`} alt={post.title} className="w-full h-auto" />
                        </div>
                    )}
                </header>

                <div
                    className="prose prose-lg prose-indigo mx-auto prose-h2:text-3xl prose-h2:font-bold prose-h2:mt-12 prose-img:rounded-xl prose-a:text-indigo-600"
                    dangerouslySetInnerHTML={{ __html: post.body }}
                />

                <footer className="mt-20 border-t border-gray-200 pt-10 text-center">
                    <div className="inline-flex flex-col items-center bg-gray-50 rounded-2xl p-8 border border-gray-100">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Punya masalah yang ingin diselesaikan?</h3>
                        <p className="text-gray-600 mb-6 max-w-md text-center">Jangan tunda lagi perbaikan hidup Anda. Konsultasikan bersama ahli kami sekarang juga melalui program hipnoterapi terbaik kami.</p>
                        <Link href="/login" className="px-8 py-3 w-full sm:w-auto text-center border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:text-lg transition-colors shadow-sm">
                            Buat Jadwal Konsultasi &rarr;
                        </Link>
                    </div>
                </footer>
            </article>
        </div>
    );
}
