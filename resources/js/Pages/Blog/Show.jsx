import { Head, Link } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';

export default function PublicBlogShow({ post, auth }) {
    // If post is missing, show a fallback instead of crashing
    if (!post) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-800 mb-4">Artikel Tidak Ditemukan</h1>
                    <Link href="/blog" className="text-gold-600 hover:underline">Kembali ke Blog</Link>
                </div>
            </div>
        );
    }

    const { author, title, body, featured_image, published_at, updated_at, meta_title, meta_description, excerpt, meta_keywords, slug } = post;

    // JSON-LD Schema for rich results (SEO)
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": meta_title || title,
        "image": featured_image ? [`${typeof window !== 'undefined' ? window.location.origin : ''}/storage/${featured_image}`] : [],
        "datePublished": published_at,
        "dateModified": updated_at,
        "author": [{
            "@type": "Person",
            "name": author?.name || 'InDepth Admin'
        }],
        "publisher": {
            "@type": "Organization",
            "name": "InDepth Mental Wellness",
            "logo": {
                "@type": "ImageObject",
                "url": typeof window !== 'undefined' ? `${window.location.origin}/images/logo-color.png` : ''
            }
        },
        "description": meta_description || excerpt || (body ? body.replace(/(<([^>]+)>)/gi, "").substring(0, 160) : '')
    };

    const formatDate = (dateString) => {
        if (!dateString) return '';
        try {
            const date = new Date(dateString);
            if (isNaN(date.getTime())) return '';
            return date.toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' });
        } catch (e) {
            return '';
        }
    };

    return (
        <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 font-sans antialiased">
            <Head title={`${meta_title || title} | InDepth Mental Wellness`}>
                <meta name="description" content={meta_description || excerpt || ''} />
                {!!meta_keywords && <meta name="keywords" content={meta_keywords} />}

                {/* Open Graph limits for social sharing */}
                <meta property="og:title" content={meta_title || title} />
                <meta property="og:description" content={meta_description || excerpt || ''} />
                {!!featured_image && <meta property="og:image" content={`${typeof window !== 'undefined' ? window.location.origin : ''}/storage/${featured_image}`} />}
                <meta property="og:type" content="article" />

                {/* Inject JSON-LD Schema */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
            </Head>

            <Navbar auth={auth} />

            <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
                <header className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-tight mb-8">
                        {title}
                    </h1>

                    <div className="flex items-center justify-center text-gray-500 gap-4 mb-10">
                        <div className="flex items-center gap-2">
                            <div className="h-8 w-8 bg-gold-100 dark:bg-gold-900/30 rounded-full flex items-center justify-center font-bold text-gold-700 dark:text-gold-400 text-sm">
                                {author?.name?.charAt(0) || 'A'}
                            </div>
                            <span className="font-medium text-gray-800 dark:text-gray-200">{author?.name || 'InDepth Admin'}</span>
                        </div>
                        <span className="text-gray-300 dark:text-gray-700">|</span>
                        <time dateTime={published_at} className="font-medium">
                            {formatDate(published_at)}
                        </time>
                    </div>

                    {featured_image && (
                        <div className="rounded-2xl overflow-hidden shadow-2xl border border-gray-100 dark:border-gray-800">
                            <img src={`/storage/${featured_image}`} alt={title} className="w-full h-auto" />
                        </div>
                    )}
                </header>

                <div
                    className="prose prose-lg prose-indigo dark:prose-invert mx-auto prose-h2:text-3xl prose-h2:font-bold prose-h2:mt-12 prose-img:rounded-xl prose-a:text-gold-600 dark:prose-a:text-gold-400"
                    dangerouslySetInnerHTML={{
                        __html:
                            body
                                ? body.includes('<') && body.includes('>')
                                    ? body
                                    : body.split('\n').map(p => `<p>${p}</p>`).join('')
                                : ''
                    }}
                />

            </article>
            <Footer />
        </div>
    );
}
