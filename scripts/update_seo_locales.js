import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const localesDir = path.join(__dirname, '../src/locales');

const translations = {
    en: {
        title: "G-Note AI — Intelligent Note-Taking & AI Productivity",
        description: "G-Note AI is the ultimate AI-powered note-taking app. Secure, private, and synced across all your devices. Transform your ideas into intelligent insights.",
        keywords: "note taking, AI notes, productivity, markdown editor, google drive sync, private notes"
    },
    vi: {
        title: "G-Note AI — Ghi Chú Thông Minh & Hiệu Suất AI",
        description: "G-Note AI là ứng dụng ghi chú hỗ trợ AI tối ưu. An toàn, riêng tư và đồng bộ trên mọi thiết bị. Biến ý tưởng của bạn thành thông tin chi tiết thông minh.",
        keywords: "ghi chú, ghi chú AI, hiệu suất, trình soạn thảo markdown, đồng bộ google drive, ghi chú riêng tư"
    },
    ja: {
        title: "G-Note AI — インテリジェントなメモ取りとAI生産性",
        description: "G-Note AIは、究極のAI搭載メモアプリです。安全でプライベート、すべてのデバイスで同期。アイデアをインテリジェントな洞察に変えます。",
        keywords: "メモ取り, AIメモ, 生産性, マークダウンエディタ, Googleドライブ同期, プライベートメモ"
    },
    ko: {
        title: "G-Note AI — 지능형 메모 작성 및 AI 생산성",
        description: "G-Note AI는 최고의 AI 기반 메모 앱입니다. 안전하고 비공개이며 모든 기기에서 동기화됩니다. 아이디어를 지능적인 통찰력으로 변환하세요.",
        keywords: "메모 작성, AI 메모, 생산성, 마크다운 편집기, Google 드라이브 동기화, 비공개 메모"
    },
    "zh-CN": {
        title: "G-Note AI — 智能笔记与AI生产力",
        description: "G-Note AI 是终极的 AI 驱动笔记应用程序。安全、私密，并在所有设备上同步。将您的想法转化为智能见解。",
        keywords: "笔记, AI笔记, 生产力, markdown编辑器, google drive同步, 私密笔记"
    },
    "zh-TW": {
        title: "G-Note AI — 智能筆記與AI生產力",
        description: "G-Note AI 是終極的 AI 驅動筆記應用程式。安全、私密，並在所有設備上同步。將您的想法轉化為智能見解。",
        keywords: "筆記, AI筆記, 生產力, markdown編輯器, google drive同步, 私密筆記"
    },
    de: {
        title: "G-Note AI — Intelligente Notizen & AI-Produktivität",
        description: "G-Note AI ist die ultimative KI-gestützte Notiz-App. Sicher, privat und über alle Geräte synchronisiert. Verwandeln Sie Ihre Ideen in intelligente Erkenntnisse.",
        keywords: "Notizen, KI-Notizen, Produktivität, Markdown-Editor, Google Drive Sync, private Notizen"
    },
    fr: {
        title: "G-Note AI — Prise de notes intelligente et productivité IA",
        description: "G-Note AI est l'application de prise de notes ultime alimentée par l'IA. Sécurisée, privée et synchronisée sur tous vos appareils. Transformez vos idées en informations intelligentes.",
        keywords: "prise de notes, notes IA, productivité, éditeur markdown, synchronisation google drive, notes privées"
    },
    es: {
        title: "G-Note AI — Toma de notas inteligente y productividad con IA",
        description: "G-Note AI es la aplicación de toma de notas definitiva impulsada por IA. Segura, privada y sincronizada en todos tus dispositivos. Transforma tus ideas en conocimientos inteligentes.",
        keywords: "toma de notas, notas IA, productividad, editor markdown, sincronización google drive, notas privadas"
    },
    "pt-BR": {
        title: "G-Note AI — Tomada de notas inteligente e produtividade com IA",
        description: "G-Note AI é o aplicativo definitivo de anotações com tecnologia de IA. Seguro, privado e sincronizado em todos os seus dispositivos. Transforme suas ideias em insights inteligentes.",
        keywords: "anotações, notas IA, produtividade, editor markdown, sincronização google drive, notas privadas"
    },
    it: {
        title: "G-Note AI — Appunti intelligenti e produttività AI",
        description: "G-Note AI è l'app definitiva per prendere appunti basata sull'IA. Sicura, privata e sincronizzata su tutti i tuoi dispositivi. Trasforma le tue idee in intuizioni intelligenti.",
        keywords: "prendere appunti, note AI, produttività, editor markdown, sincronizzazione google drive, note private"
    },
    nl: {
        title: "G-Note AI — Slimme notities & AI-productiviteit",
        description: "G-Note AI is de ultieme door AI aangedreven notitie-app. Veilig, privé en gesynchroniseerd op al uw apparaten. Zet uw ideeën om in slimme inzichten.",
        keywords: "notities maken, AI-notities, productiviteit, markdown-editor, google drive sync, privé notities"
    },
    ar: {
        title: "G-Note AI — تدوين الملاحظات الذكي وإنتاجية الذكاء الاصطناعي",
        description: "G-Note AI هو التطبيق النهائي لتدوين الملاحظات المدعوم بالذكاء الاصطناعي. آمن وخاص ومتزامن عبر جميع أجهزتك. حول أفكارك إلى رؤى ذكية.",
        keywords: "تدوين الملاحظات, ملاحظات الذكاء الاصطناعي, الإنتاجية, محرر markdown, مزامنة google drive, ملاحظات خاصة"
    },
    hi: {
        title: "G-Note AI — बुद्धिमान नोट-टेकिंग और एआई उत्पादकता",
        description: "G-Note AI परम AI-संचालित नोट-टेकिंग ऐप है। सुरक्षित, निजी और आपके सभी उपकरणों में सिंक किया गया। अपने विचारों को बुद्धिमान अंतर्दृष्टि में बदलें।",
        keywords: "नोट लेना, एआई नोट्स, उत्पादकता, मार्कडाउन एडिटर, गूगल ड्राइव सिंक, निजी नोट्स"
    },
    tr: {
        title: "G-Note AI — Akıllı Not Alma ve AI Üretkenliği",
        description: "G-Note AI, en üst düzey AI destekli not alma uygulamasıdır. Güvenli, özel ve tüm cihazlarınızda senkronize. Fikirlerinizi akıllı içgörülere dönüştürün.",
        keywords: "not alma, AI notları, üretkenlik, markdown editörü, google drive senkronizasyonu, özel notlar"
    },
    pl: {
        title: "G-Note AI — Inteligentne notatki i produktywność AI",
        description: "G-Note AI to najlepsza aplikacja do robienia notatek oparta na sztucznej inteligencji. Bezpieczna, prywatna i zsynchronizowana na wszystkich urządzeniach. Przekształć swoje pomysły w inteligentne spostrzeżenia.",
        keywords: "robienie notatek, notatki AI, produktywność, edytor markdown, synchronizacja z dyskiem google, prywatne notatki"
    },
    th: {
        title: "G-Note AI — การจดบันทึกอัจฉริยะและประสิทธิภาพ AI",
        description: "G-Note AI เป็นแอพจดบันทึกที่ขับเคลื่อนด้วย AI ขั้นสูงสุด ปลอดภัย เป็นส่วนตัว และซิงค์เวร์ทุกอุปกรณ์ของคุณ เปลี่ยนความคิดของคุณให้เป็นข้อมูลเชิงลึกที่ชาญฉลาด",
        keywords: "การจดบันทึก, บันทึก AI, ผลิตภาพ, ตัวแก้ไข markdown, การซิงค์ google drive, บันทึกส่วนตัว"
    },
    id: {
        title: "G-Note AI — Pencatatan Cerdas & Produktivitas AI",
        description: "G-Note AI adalah aplikasi pencatatan bertenaga AI terbaik. Aman, pribadi, dan disinkronkan di semua perangkat Anda. Ubah ide Anda menjadi wawasan cerdas.",
        keywords: "mencatat, catatan AI, produktivitas, editor markdown, sinkronisasi google drive, catatan pribadi"
    }
};

const files = fs.readdirSync(localesDir);

files.forEach(file => {
    if (path.extname(file) === '.json') {
        const langCode = path.basename(file, '.json');
        const filePath = path.join(localesDir, file);

        try {
            const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));

            // Get translation for this language, fallback to English if missing
            const translation = translations[langCode] || translations['en'];

            // Add or update SEO section
            content.seo = {
                title: translation.title,
                description: translation.description,
                keywords: translation.keywords
            };

            fs.writeFileSync(filePath, JSON.stringify(content, null, 2) + '\n');
            console.log(`Updated ${file}`);
        } catch (error) {
            console.error(`Error updating ${file}:`, error);
        }
    }
});
