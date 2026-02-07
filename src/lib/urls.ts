export const getBaseUrl = () => {
    if (typeof window === 'undefined') return 'https://www.gnoteai.com';

    const { hostname, port, protocol } = window.location;

    // If we're on localhost
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
        return `${protocol}//${hostname}${port ? `:${port}` : ''}`;
    }

    return 'https://www.gnoteai.com';
};

export const LINKS = {
    HOME: getBaseUrl(),
    BLOG: 'https://gnoteai.com/blog', // Main app blog
    APP: 'https://gnoteai.com', // Main app
    PRIVACY: 'https://gnoteai.com/privacy', // Main app privacy
    TERMS: 'https://gnoteai.com/terms', // Main app terms
    EXTENSION: 'https://chromewebstore.google.com/detail/g-note-ai/pncgcnggbbbgnhdniigjndekfmmblioj',
};
