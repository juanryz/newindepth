import { Head, Link } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';

export default function PublicBlogShow({ post }) {

    // JSON-LD Schema for rich results (SEO)
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": post.meta_title || post.title,
        "image": post.featured_image ? [`${typeof window !== 'undefined' ? window.location.origin : ''}/storage/${post.featured_image}`] : [],
        "datePublished": post.published_at,
        "dateModified": post.updated_at,
        "author": [{
            "@type": "Person",
            "name": post.author?.name || 'InDepth Admin'
        }],
        "publisher": {
            "@type": "Organization",
            "name": "InDepth Mental Wellness",
            "logo": {
                "@type": "ImageObject",
                "url": typeof window !== 'undefined' ? `${window.location.origin}/images/logo-color.png` : ''
            }
        },
        "description": post.meta_description || post.excerpt
    };

    return (
        <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 font-sans antialiased">
            <Head>
                <title>{post.meta_title || post.title} | InDepth Mental Wellness</title>
                <meta name="description" content={post.meta_description || post.excerpt || ''} />
                {post.meta_keywords && <meta name="keywords" content={post.meta_keywords} />}

                {/* Open Graph limits for social sharing */}
                <meta property="og:title" content={post.meta_title || post.title} />
                <meta property="og:description" content={post.meta_description || post.excerpt || ''} />
                {post.featured_image && <meta property="og:image" content={`${typeof window !== 'undefined' ? window.location.origin : ''}/storage/${post.featured_image}`} />}
                <meta property="og:type" content="article" />

                {/* Inject JSON-LD Schema */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
            </Head>

            <Navbar auth={null} />

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

            </article>
            <Footer />
        </div>
    );
}
