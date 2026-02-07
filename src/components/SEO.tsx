import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

interface SEOProps {
    title?: string;
    description?: string;
    keywords?: string;
    image?: string;
    url?: string;
}

export function SEO({ title, description, keywords, image, url }: SEOProps) {
    const { t, i18n } = useTranslation();
    const currentLang = i18n.language;

    // Base URL - In a real app this should be an environment variable or prop
    // Defaulting to a placeholder or deriving from window if client-side
    const siteUrl = 'https://gnoteai.com';

    const finalTitle = title || t('seo.title');
    const finalDescription = description || t('seo.description');
    const finalKeywords = keywords || t('seo.keywords');

    // Use the static global image by default
    const finalImage = image ?
        (image.startsWith('http') ? image : `${siteUrl}${image}`) :
        `${siteUrl}/og-image.png`;

    const finalUrl = url || `${siteUrl}${window.location.pathname}`;

    return (
        <Helmet>
            {/* Basic */}
            <html lang={currentLang} />
            <title>{finalTitle}</title>
            <meta name="description" content={finalDescription} />
            <meta name="keywords" content={finalKeywords} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content="website" />
            <meta property="og:url" content={finalUrl} />
            <meta property="og:title" content={finalTitle} />
            <meta property="og:description" content={finalDescription} />
            <meta property="og:image" content={finalImage} />
            <meta property="og:locale" content={currentLang} />
            <meta property="og:site_name" content="G-Note AI" />

            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={finalUrl} />
            <meta property="twitter:title" content={finalTitle} />
            <meta property="twitter:description" content={finalDescription} />
            <meta property="twitter:image" content={finalImage} />

            {/* Canonical */}
            <link rel="canonical" href={finalUrl} />

            {/* Alternate languages for SEO */}
            {/* This is important for multi-language SEO to tell Google about other versions */}
            <link rel="alternate" href={`${siteUrl}`} hreflang="x-default" />
            <link rel="alternate" href={`${siteUrl}?lng=en`} hreflang="en" />
            <link rel="alternate" href={`${siteUrl}?lng=vi`} hreflang="vi" />
            {/* Add other languages dynamically if possible, simplified here */}
        </Helmet>
    );
}
