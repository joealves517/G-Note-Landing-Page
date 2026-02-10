import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import {
    getSEOConfig,
    generateStructuredData,
    SITE_URL,
    SITE_NAME,
    languageLocales
} from '../lib/seo';

interface SEOProps {
    title?: string;
    description?: string;
    keywords?: string;
    image?: string;
    url?: string;
}

export function SEO({ title, description, keywords, image, url }: SEOProps) {
    const { i18n } = useTranslation();
    const currentLang = i18n.language || 'en';

    const seoConfig = getSEOConfig(currentLang);
    const locale = languageLocales[currentLang] || 'en';
    const isRTL = currentLang === 'ar';

    const finalTitle = title || seoConfig.title;
    const finalDescription = description || seoConfig.description;
    const finalKeywords = keywords || seoConfig.keywords.join(', ');

    const finalImage = image ?
        (image.startsWith('http') ? image : `${SITE_URL}${image}`) :
        `${SITE_URL}/og-image.png`;

    const finalUrl = url || `${SITE_URL}${window.location.pathname}`;
    const structuredData = generateStructuredData(currentLang);

    return (
        <Helmet>
            {/* Basic */}
            <html lang={locale} dir={isRTL ? 'rtl' : 'ltr'} />
            <title>{finalTitle}</title>
            <meta name="description" content={finalDescription} />
            <meta name="keywords" content={finalKeywords} />
            <meta name="author" content={SITE_NAME} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content="website" />
            <meta property="og:url" content={finalUrl} />
            <meta property="og:title" content={finalTitle} />
            <meta property="og:description" content={finalDescription} />
            <meta property="og:image" content={finalImage} />
            <meta property="og:locale" content={locale.replace('-', '_')} />
            <meta property="og:site_name" content={SITE_NAME} />

            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={finalUrl} />
            <meta property="twitter:title" content={finalTitle} />
            <meta property="twitter:description" content={finalDescription} />
            <meta property="twitter:image" content={finalImage} />

            {/* Canonical */}
            <link rel="canonical" href={finalUrl} />

            {/* Alternate languages for SEO */}
            <link rel="alternate" href={SITE_URL} hrefLang="x-default" />
            {Object.entries(languageLocales).map(([lang, loc]) => (
                <link
                    key={lang}
                    rel="alternate"
                    href={lang === 'en' ? SITE_URL : `${SITE_URL}/?lang=${lang}`}
                    hrefLang={loc}
                />
            ))}

            {/* Structured Data */}
            <script type="application/ld+json">
                {JSON.stringify(structuredData)}
            </script>
        </Helmet>
    );
}
