import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();

const CONTACT_DATA = {
  id: {
    metadata: { title: "Hubungi Dukungan | Zetawala", description: "Hubungi dukungan Zetawala tentang alat SEO gratis, YouTube, marketplace, penulisan, dan kalkulator." },
    back: "Kembali ke beranda", title: "Hubungi Dukungan", subtitle: "Hubungi tim dukungan kami tentang alat, data, atau pertanyaan akun.",
    nameLabel: "Nama lengkap", namePlaceholder: "Masukkan nama Anda", emailLabel: "Alamat email", emailPlaceholder: "anda@example.com",
    messageLabel: "Pesan", messagePlaceholder: "Ada yang bisa kami bantu?", submit: "Kirim pesan", sending: "Mengirim…",
    successTitle: "Pesan terkirim", successBody: "Pertanyaan Anda telah dicatat. Kami akan meninjau dan segera menindaklanjutinya.", successCta: "Kirim pesan lain",
    errors: { name: "Nama lengkap wajib diisi", email: "Alamat email wajib diisi", emailInvalid: "Harap berikan alamat email yang valid", message: "Pesan minimal 10 karakter", send: "Gagal mengirim formulir." }
  },
  vi: {
    metadata: { title: "Liên hệ hỗ trợ | Zetawala", description: "Liên hệ hỗ trợ Zetawala về các công cụ SEO miễn phí, YouTube, sàn thương mại điện tử, viết lách và máy tính." },
    back: "Quay lại trang chủ", title: "Liên hệ hỗ trợ", subtitle: "Liên hệ với đội ngũ hỗ trợ của chúng tôi về công cụ, dữ liệu hoặc thắc mắc tài khoản.",
    nameLabel: "Họ và tên", namePlaceholder: "Nhập tên của bạn", emailLabel: "Địa chỉ email", emailPlaceholder: "ban@example.com",
    messageLabel: "Tin nhắn", messagePlaceholder: "Chúng tôi có thể giúp gì cho bạn?", submit: "Gửi tin nhắn", sending: "Đang gửi…",
    successTitle: "Tin nhắn đã gửi", successBody: "Yêu cầu của bạn đã được ghi nhận. Chúng tôi sẽ xem xét và phản hồi sớm.", successCta: "Gửi tin nhắn khác",
    errors: { name: "Họ và tên là bắt buộc", email: "Địa chỉ email là bắt buộc", emailInvalid: "Vui lòng cung cấp địa chỉ email hợp lệ", message: "Tin nhắn phải có ít nhất 10 ký tự", send: "Gửi biểu mẫu thất bại." }
  },
  cs: {
    metadata: { title: "Kontaktovat podporu | Zetawala", description: "Kontaktujte podporu Zetawala ohledně bezplatných nástrojů pro SEO, YouTube, tržiště, psaní a kalkulaček." },
    back: "Zpět na domovskou stránku", title: "Kontaktovat podporu", subtitle: "Spojte se s naším týmem podpory ohledně nástrojů, dat nebo dotazů k účtu.",
    nameLabel: "Celé jméno", namePlaceholder: "Zadejte své jméno", emailLabel: "E-mailová adresa", emailPlaceholder: "vy@example.com",
    messageLabel: "Zpráva", messagePlaceholder: "S čím vám můžeme pomoci?", submit: "Odeslat zprávu", sending: "Odesílání…",
    successTitle: "Zpráva odeslána", successBody: "Váš dotaz byl zaznamenán. Prověříme jej a brzy se vám ozveme.", successCta: "Odeslat další zprávu",
    errors: { name: "Celé jméno je povinné", email: "E-mailová adresa je povinná", emailInvalid: "Zadejte platnou e-mailovou adresu", message: "Zpráva musí mít alespoň 10 znaků", send: "Odeslání formuláře se nezdařilo." }
  },
  hu: {
    metadata: { title: "Kapcsolatfelvétel a támogatással | Zetawala", description: "Vegye fel a kapcsolatot a Zetawala támogatásával az ingyenes SEO, YouTube, piactéri, író és kalkulátor eszközökkel kapcsolatban." },
    back: "Vissza a kezdőlapra", title: "Kapcsolatfelvétel a támogatással", subtitle: "Lépjen kapcsolatba csapatunkkal eszközökkel, adatokkal vagy fiókokkal kapcsolatos kérdésekben.",
    nameLabel: "Teljes név", namePlaceholder: "Adja meg a nevét", emailLabel: "E-mail cím", emailPlaceholder: "on@example.com",
    messageLabel: "Üzenet", messagePlaceholder: "Miben segíthetünk?", submit: "Üzenet küldése", sending: "Küldés…",
    successTitle: "Üzenet elküldve", successBody: "Megkeresését rögzítettük. Hamarosan áttekintjük és jelentkezünk.", successCta: "Újabb üzenet küldése",
    errors: { name: "A teljes név megadása kötelező", email: "Az e-mail cím megadása kötelező", emailInvalid: "Kérjük, érvényes e-mail címet adjon meg", message: "Az üzenetnek legalább 10 karakter hosszúnak kell lennie", send: "Nem sikerült elküldeni az űrlapot." }
  },
  ro: {
    metadata: { title: "Contactează asistența | Zetawala", description: "Contactați asistența Zetawala cu privire la instrumentele gratuite de SEO, YouTube, marketplace, scriere și calculatoare." },
    back: "Înapoi la pagina principală", title: "Contactează asistența", subtitle: "Luați legătura cu echipa noastră de asistență pentru întrebări despre instrumente, date sau cont.",
    nameLabel: "Nume complet", namePlaceholder: "Introduceți numele dvs.", emailLabel: "Adresă de e-mail", emailPlaceholder: "tu@example.com",
    messageLabel: "Mesaj", messagePlaceholder: "Cu ce vă putem ajuta?", submit: "Trimite mesajul", sending: "Se trimite…",
    successTitle: "Mesaj trimis", successBody: "Solicitarea dvs. a fost înregistrată. O vom analiza și vom reveni în curând.", successCta: "Trimite un alt mesaj",
    errors: { name: "Numele complet este obligatoriu", email: "Adresa de e-mail este obligatorie", emailInvalid: "Vă rugăm să introduceți o adresă de e-mail validă", message: "Mesajul trebuie să aibă cel puțin 10 caractere", send: "Trimiterea formularului a eșuat." }
  },
  pt: {
    metadata: { title: "Fale com o Suporte | Zetawala", description: "Entre em contato com o suporte da Zetawala sobre ferramentas gratuitas de SEO, YouTube, marketplaces, escrita e calculadoras." },
    back: "Voltar para o início", title: "Fale com o Suporte", subtitle: "Entre em contato com nossa equipe sobre ferramentas, dados ou dúvidas sobre sua conta.",
    nameLabel: "Nome completo", namePlaceholder: "Digite seu nome", emailLabel: "Endereço de e-mail", emailPlaceholder: "voce@example.com",
    messageLabel: "Mensagem", messagePlaceholder: "Como podemos ajudar?", submit: "Enviar mensagem", sending: "Enviando…",
    successTitle: "Mensagem enviada", successBody: "Sua solicitação foi registrada. Analisaremos e responderemos em breve.", successCta: "Enviar outra mensagem",
    errors: { name: "O nome completo é obrigatório", email: "O endereço de e-mail é obrigatório", emailInvalid: "Por favor, informe um e-mail válido", message: "A mensagem deve ter pelo menos 10 caracteres", send: "Falha ao enviar o formulário." }
  }
};

const BLOG_DATA = {
  id: { metadata: { title: "Blog Zetawala – Panduan YouTube, Daraz, WhatsApp & SEO", description: "Baca panduan gratis tentang SEO YouTube, pertumbuhan penjual Daraz, perdagangan sosial WhatsApp, dan SEO teknis." }, heroTitle: "Blog & Panduan SEO Zetawala", heroDescription: "Panduan optimasi, catatan pertumbuhan e-commerce, studi kasus produk lokal, dan panduan otomatisasi YouTube." },
  vi: { metadata: { title: "Blog Zetawala – Hướng dẫn YouTube, Daraz, WhatsApp & SEO", description: "Đọc các hướng dẫn miễn phí về SEO YouTube, tăng trưởng người bán Daraz, thương mại xã hội WhatsApp và SEO kỹ thuật." }, heroTitle: "Blog & Hướng dẫn SEO Zetawala", heroDescription: "Hướng dẫn tối ưu hóa, ghi chú tăng trưởng thương mại điện tử và quy trình tự động hóa YouTube." },
  cs: { metadata: { title: "Blog Zetawala – Návody pro YouTube, Daraz, WhatsApp a SEO", description: "Přečtěte si bezplatné návody k SEO na YouTube, růstu prodejců na Daraz, obchodu na WhatsAppu a technickému SEO." }, heroTitle: "Blog a SEO návody Zetawala", heroDescription: "Optimalizační průvodce, poznámky k růstu e-commerce a postupy automatizace na YouTube." },
  hu: { metadata: { title: "Zetawala Blog – YouTube, Daraz, WhatsApp és SEO útmutatók", description: "Olvasson ingyenes útmutatókat a YouTube SEO-ról, a Daraz eladói növekedésről, a WhatsApp kereskedelemről és a technikai SEO-ról." }, heroTitle: "Zetawala Blog és SEO útmutatók", heroDescription: "Optimalizálási útmutatók, e-kereskedelmi növekedési jegyzetek és YouTube automatizálási bemutatók." },
  ro: { metadata: { title: "Blog Zetawala – Ghiduri YouTube, Daraz, WhatsApp & SEO", description: "Citiți ghiduri gratuite despre SEO YouTube, creșterea vânzărilor pe Daraz, comerț pe WhatsApp și SEO tehnic." }, heroTitle: "Blog și Ghiduri SEO Zetawala", heroDescription: "Ghiduri de optimizare, note de creștere în e-commerce și tutoriale de automatizare YouTube." },
  pt: { metadata: { title: "Blog da Zetawala – Guias de YouTube, Daraz, WhatsApp & SEO", description: "Leia guias gratuitos sobre SEO para YouTube, crescimento de vendas, comércio no WhatsApp e SEO técnico." }, heroTitle: "Blog & Guias de SEO da Zetawala", heroDescription: "Guias de otimização, notas de crescimento no comércio eletrônico e tutoriais de automação do YouTube." }
};

function buildLegalData(locale) {
  const titles = {
    id: { priv: "Kebijakan Privasi", terms: "Syarat Layanan", cookies: "Kebijakan Cookie", back: "Kembali ke beranda", updated: "Terakhir diperbarui: 3 Juli 2026" },
    vi: { priv: "Chính sách bảo mật", terms: "Điều khoản dịch vụ", cookies: "Chính sách cookie", back: "Quay lại trang chủ", updated: "Cập nhật lần cuối: 3 tháng 7, 2026" },
    cs: { priv: "Zásady ochrany soukromí", terms: "Podmínky služby", cookies: "Zásady cookies", back: "Zpět na domovskou stránku", updated: "Poslední aktualizace: 3. července 2026" },
    hu: { priv: "Adatvédelmi irányelvek", terms: "Szolgáltatási feltételek", cookies: "Cookie irányelvek", back: "Vissza a kezdőlapra", updated: "Utolsó frissítés: 2026. július 3." },
    ro: { priv: "Politică de confidențialitate", terms: "Termeni și condiții", cookies: "Politică privind modulele cookie", back: "Înapoi la pagina principală", updated: "Ultima actualizare: 3 iulie 2026" },
    pt: { priv: "Política de Privacidade", terms: "Termos de Serviço", cookies: "Política de Cookies", back: "Voltar para o início", updated: "Última atualização: 3 de julho de 2026" },
  }[locale];

  return {
    "privacy-policy": {
      metadata: { title: `${titles.priv} | Zetawala`, description: `${titles.priv} Zetawala.` },
      title: titles.priv, updated: titles.updated, back: titles.back,
      sections: [
        { title: "1. Scope of Data Collection", paragraphs: ["Zetawala gathers user data to operate, improve, and secure our tools. Collection covers account registration information, API usage parameters, and generation query history."] },
        { title: "2. Utilization of Information", paragraphs: ["Telemetry and payload values are processed to generate relevant outputs over secure connections. User history is locked to individual accounts."] },
        { title: "3. Third-Party Integrations & Generative AI", paragraphs: ["When you use generators, payload parameters such as search queries, niche descriptions, and titles may be forwarded to secure cloud processing environments including Google Gemini API endpoints."] },
        { title: "4. User Rights & Data Deletion", paragraphs: ["Users may inspect, download, or purge generation history and stored states. Requests for complete profile and history erasure are executed via our support channels."] },
        { title: "5. Security Standards", paragraphs: ["Connections to our servers, databases, and third-party models use modern Transport Layer Security (TLS 1.3). Database assets use role-based access control."] }
      ]
    },
    terms: {
      metadata: { title: `${titles.terms} | Zetawala`, description: `${titles.terms} Zetawala.` },
      title: titles.terms, updated: titles.updated, back: titles.back,
      sections: [
        { title: "1. Acceptable Use of Services", paragraphs: ["Zetawala grants you a non-exclusive, non-transferable, revocable license to access the platform for generating marketing and metadata outputs."] },
        { title: "2. Intellectual Property Rights", paragraphs: ["Output you generate belongs to you. Underlying system configurations, UI, prompts, and server code remain the exclusive intellectual property of Zetawala."] },
        { title: "3. API Usage Limits & Fair Use", paragraphs: ["To maintain service quality we enforce fair-use rates. Automated batch requests that degrade performance for other users may result in temporary or permanent suspension."] },
        { title: "4. Disclaimer of Warranties", paragraphs: ["Services are provided “as is” and “as available”. We do not guarantee conversion rates, keyword positions, YouTube analytics gains, or campaign results."] },
        { title: "5. Limitation of Liability", paragraphs: ["Zetawala and its developers shall not be liable for indirect, incidental, special, consequential, or punitive damages from downtime, data loss, or model errors."] }
      ]
    },
    cookies: {
      metadata: { title: `${titles.cookies} | Zetawala`, description: `${titles.cookies} Zetawala.` },
      title: titles.cookies, updated: titles.updated, back: titles.back,
      sections: [
        { title: "1. Use of Cookies", paragraphs: ["Cookies are small text files stored on your device. Zetawala uses cookies to identify sessions, preserve UI preferences, and maintain authentication tokens."] },
        { title: "2. Essential Cookies", paragraphs: ["These cookies are necessary for core site operations such as session security, state persistence, and anti-abuse verification."] },
        { title: "3. Managing Preferences", paragraphs: ["You can modify cookie settings in your browser at any time. Disabling certain cookies may limit access to specific tool features."] }
      ]
    }
  };
}

export async function generateLegalAndContact() {
  for (const locale of Object.keys(CONTACT_DATA)) {
    const dir = path.join(root, 'src/locales', locale);
    await mkdir(dir, { recursive: true });
    await writeFile(path.join(dir, 'contact.json'), `${JSON.stringify(CONTACT_DATA[locale], null, 2)}\n`, 'utf8');
    await writeFile(path.join(dir, 'blog.json'), `${JSON.stringify(BLOG_DATA[locale], null, 2)}\n`, 'utf8');
    await writeFile(path.join(dir, 'legal.json'), `${JSON.stringify(buildLegalData(locale), null, 2)}\n`, 'utf8');
    console.log(`Generated contact.json, blog.json, legal.json for ${locale}`);
  }
}

if (process.argv[1]?.endsWith('generate-legal-and-contact.mjs')) {
  await generateLegalAndContact();
}
