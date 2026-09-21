import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();

const LOCALES = ['id', 'vi', 'cs', 'hu', 'ro', 'pt'];

const HUB_TITLES = {
  seo: {
    id: { title: "Intelijen SEO & Webmaster", desc: "Audit teknis, validasi keterindeksan, analisis konten, ukur Core Web Vitals, dan modelkan ROI—17 alat khusus dalam satu ruang kerja.", cta: "Jalankan Audit SEO Situs" },
    vi: { title: "Thông tin chuyên sâu SEO & Webmaster", desc: "Chẩn đoán SEO kỹ thuật, xác thực khả năng lập chỉ mục, kiểm toán nội dung, đo lường Core Web Vitals và lập mô hình ROI—17 công cụ chuyên biệt.", cta: "Chạy kiểm toán SEO website" },
    cs: { title: "SEO a webmaster inteligence", desc: "Diagnostika technického SEO, ověření indexovatelnosti, audit obsahu, měření Core Web Vitals a modelování ROI—17 specializovaných nástrojů.", cta: "Spustit SEO audit webu" },
    hu: { title: "SEO és webmester intelligencia", desc: "Technikai SEO diagnosztika, indexelhetőség ellenőrzése, tartalomelemzés, Core Web Vitals mérése és ROI modellezése—17 speciális eszköz.", cta: "Webhely SEO audit futtatása" },
    ro: { title: "Inteligență SEO și webmaster", desc: "Diagnosticați SEO tehnic, validați indexabilitatea, auditați conținutul, măsurați Core Web Vitals și modelați ROI-ul—17 instrumente specializate.", cta: "Rulează auditul SEO al site-ului" },
    pt: { title: "Inteligência SEO e Webmaster", desc: "Diagnostique SEO técnico, valide indexabilidade, audite conteúdo, meça Core Web Vitals e modele o ROI—17 ferramentas especializadas em um só espaço.", cta: "Executar Auditoria de SEO" }
  },
  writing: {
    id: { title: "Alat Penulisan & Bahasa AI", desc: "Humanisasi teks AI, deteksi tulisan AI, perbaiki tata bahasa, konversi Roman Urdu, ringkas, dan tulis ulang—10 alat bahasa gratis.", cta: "Buka Humanizer AI" },
    vi: { title: "Công cụ viết & ngôn ngữ AI", desc: "Nhân bản hóa văn bản AI, phát hiện bài viết AI, sửa ngữ pháp, tóm tắt và viết lại—10 công cụ ngôn ngữ miễn phí.", cta: "Mở công cụ nhân bản hóa AI" },
    cs: { title: "AI nástroje pro psaní a jazyky", desc: "Humanizace AI textu, detekce AI obsahu, oprava gramatiky, shrnutí a přepisování—10 bezplatných jazykových nástrojů.", cta: "Otevřít AI humanizátor" },
    hu: { title: "AI író- és nyelvi eszközök", desc: "AI szöveg humanizálása, AI tartalom észlelése, nyelvtan javítása, összegzés és átfogalmazás—10 ingyenes nyelvi eszköz.", cta: "AI humanizáló megnyitása" },
    ro: { title: "Instrumente de scriere și limbaj AI", desc: "Umanizați textul AI, detectați conținutul generat de AI, corectați gramatica, rezumați și rescrieți—10 instrumente lingvistice gratuite.", cta: "Deschide umanizatorul AI" },
    pt: { title: "Ferramentas de Escrita e Linguagem IA", desc: "Humanize textos de IA, detecte escrita por IA, corrija gramática, resuma e reescreva—10 ferramentas linguísticas gratuitas.", cta: "Abrir Humanizador de IA" }
  },
  study: {
    id: { title: "Studi AI, Kuis & Mengetik", desc: "Catatan, kuis, flashcard, catatan studi YouTube, bantuan PR, dan latihan mengetik—10 alat pendidikan gratis.", cta: "Buat Catatan Studi" },
    vi: { title: "Học tập AI, Trắc nghiệm & Luyện gõ", desc: "Ghi chú, câu đố, thẻ ghi nhớ, ghi chú học tập YouTube, giải bài tập và luyện gõ—10 công cụ giáo dục miễn phí.", cta: "Tạo ghi chú học tập" },
    cs: { title: "AI studium, kvízy a psaní", desc: "Poznámky, kvízy, kartičky, studijní poznámky z YouTube, pomoc s úkoly a procvičování psaní na klávesnici—10 bezplatných vzdělávacích nástrojů.", cta: "Vytvořit studijní poznámky" },
    hu: { title: "AI tanulás, kvízek és gépelés", desc: "Jegyzetek, kvízek, tanulókártyák, YouTube tanulmányi jegyzetek, házi feladat segítő és gépelés gyakorlása—10 ingyenes oktatási eszköz.", cta: "Tanulmányi jegyzetek készítése" },
    ro: { title: "Studiu AI, teste și dactilografiere", desc: "Notițe, teste, flashcarduri, notițe din videoclipuri YouTube, rezolvare de teme și practică de dactilografiere—10 instrumente educaționale.", cta: "Generează notițe de studiu" },
    pt: { title: "Estudo com IA, Quizzes e Digitação", desc: "Notas, quizzes, flashcards, notas de estudo do YouTube, ajuda com tarefas e prática de digitação—10 ferramentas educacionais gratuitas.", cta: "Gerar Notas de Estudo" }
  },
  freelancer: {
    id: { title: "Toolkit Freelancer", desc: "Proposal Upwork, gig Fiverr, perhitungan tarif, email klien, dan pelacak faktur—10 alat alur kerja profesional.", cta: "Buka Generator Proposal Upwork" },
    vi: { title: "Bộ công cụ Freelancer", desc: "Đề xuất Upwork, gig Fiverr, tính toán giá, email khách hàng và theo dõi hóa đơn—10 công cụ làm việc chuyên nghiệp.", cta: "Mở trình tạo đề xuất Upwork" },
    cs: { title: "Sada pro freelancery", desc: "Návrhy pro Upwork, gigy pro Fiverr, výpočty sazeb, e-maily klientům a sledování faktur—10 profesionálních nástrojů.", cta: "Otevřít generátor návrhů Upwork" },
    hu: { title: "Szabadúszó eszköztár", desc: "Upwork ajánlatok, Fiverr gigek, díjszámítás, ügyfél emailek és számlakövetés—10 professzionális munkafolyamat-eszköz.", cta: "Upwork ajánlatgenerátor" },
    ro: { title: "Set de instrumente pentru freelanceri", desc: "Propuneri Upwork, gig-uri Fiverr, calcul de tarife, e-mailuri către clienți și urmărire facturi—10 instrumente profesionale.", cta: "Deschide generatorul de propuneri Upwork" },
    pt: { title: "Kit de Ferramentas para Freelancer", desc: "Propostas para Upwork, anúncios no Fiverr, cálculo de tarifas, e-mails para clientes e controle de faturas—10 ferramentas profissionais.", cta: "Abrir Gerador de Propostas Upwork" }
  },
  'freelancer-upwork': {
    id: { title: "Alat Freelancer Upwork", desc: "Proposal Upwork, pengoptimal profil, pembuka cover letter, dan kalkulator biaya—alat khusus untuk freelancer Upwork.", cta: "Buka Generator Proposal" },
    vi: { title: "Công cụ Freelancer Upwork", desc: "Đề xuất Upwork, tối ưu hồ sơ, mở đầu thư xin việc và tính phí—công cụ chuyên biệt cho freelancer Upwork.", cta: "Mở trình tạo đề xuất" },
    cs: { title: "Nástroje pro freelancery na Upworku", desc: "Návrhy pro Upwork, optimalizace profilu, úvodní texty průvodních dopisů a kalkulačka poplatků.", cta: "Otevřít generátor návrhů" },
    hu: { title: "Upwork szabadúszó eszközök", desc: "Upwork ajánlatok, profiloptimalizálás, kísérőlevél megnyitások és díjkalkulátor—célzott eszközök Upwork szabadúszóknak.", cta: "Ajánlatgenerátor megnyitása" },
    ro: { title: "Instrumente Upwork pentru freelanceri", desc: "Propuneri Upwork, optimizator de profil, scrisori de intenție și calculator de comisioane.", cta: "Deschide generatorul de propuneri" },
    pt: { title: "Ferramentas Upwork para Freelancers", desc: "Propostas para Upwork, otimizador de perfil, ganchos de carta de apresentação e calculadora de taxas.", cta: "Abrir Gerador de Propostas" }
  },
  'freelancer-fiverr': {
    id: { title: "Alat Freelancer Fiverr", desc: "Deskripsi gig Fiverr, judul, tag, dan FAQ—tingkatkan visibilitas dan pesanan gig Anda.", cta: "Buka Generator Gig Fiverr" },
    vi: { title: "Công cụ Freelancer Fiverr", desc: "Mô tả gig Fiverr, tiêu đề, thẻ tag và câu hỏi thường gặp—tăng khả năng hiển thị và đơn đặt hàng.", cta: "Mở trình tạo gig Fiverr" },
    cs: { title: "Nástroje pro freelancery na Fiverr", desc: "Popisy gigů pro Fiverr, názvy, tagy a FAQ—zvyšte viditelnost a objednávky svých služeb.", cta: "Otevřít generátor gigů Fiverr" },
    hu: { title: "Fiverr szabadúszó eszközök", desc: "Fiverr gig leírások, címek, címkék és GYIK—növelje a gig láthatóságát és rendeléseit.", cta: "Fiverr gig generátor megnyitása" },
    ro: { title: "Instrumente Fiverr pentru freelanceri", desc: "Descrieri de gig-uri Fiverr, titluri, etichete și întrebări frecvente—sporiți vizibilitatea și comenzile.", cta: "Deschide generatorul de gig-uri" },
    pt: { title: "Ferramentas Fiverr para Freelancers", desc: "Descrições de gigs no Fiverr, títulos, tags e perguntas frequentes—aumente sua visibilidade e pedidos.", cta: "Abrir Gerador de Gigs Fiverr" }
  },
  shopee: {
    id: { title: "Toolkit Penjual Shopee", desc: "Judul listing teroptimasi SEO, deskripsi produk, riset kata kunci, penganalisis SEO listing, dan kalkulator laba Shopee.", cta: "Buka Generator Judul Shopee" },
    vi: { title: "Bộ công cụ người bán Shopee", desc: "Tiêu đề danh sách tối ưu SEO, mô tả sản phẩm, nghiên cứu từ khóa, phân tích SEO danh sách và tính toán lợi nhuận Shopee.", cta: "Mở trình tạo tiêu đề Shopee" },
    cs: { title: "Sada pro prodejce Shopee", desc: "SEO optimalizované názvy nabídek, popisy produktů, průzkum klíčových slov a kalkulačky zisku pro prodejce na Shopee.", cta: "Otevřít generátor názvů Shopee" },
    hu: { title: "Shopee eladói eszköztár", desc: "SEO-optimalizált termékcímek, leírások, kulcsszókutatás és profitszámítás Shopee eladóknak.", cta: "Shopee címgenerátor megnyitása" },
    ro: { title: "Set de instrumente vânzători Shopee", desc: "Titluri optimizate SEO, descrieri de produse, cercetare de cuvinte cheie și calculatoare de profit pentru vânzătorii Shopee.", cta: "Deschide generatorul de titluri Shopee" },
    pt: { title: "Kit de Ferramentas para Vendedores Shopee", desc: "Títulos otimizados para SEO, descrições de produtos, pesquisa de palavras-chave e calculadoras de lucro na Shopee.", cta: "Abrir Gerador de Títulos Shopee" }
  },
  lazada: {
    id: { title: "Toolkit Penjual Lazada", desc: "Judul listing Lazada, deskripsi produk, kata kunci, penganalisis SEO listing, dan kalkulator laba Lazada.", cta: "Buka Generator Judul Lazada" },
    vi: { title: "Bộ công cụ người bán Lazada", desc: "Tiêu đề danh sách Lazada, mô tả sản phẩm, từ khóa, phân tích SEO và tính toán lợi nhuận Lazada.", cta: "Mở trình tạo tiêu đề Lazada" },
    cs: { title: "Sada pro prodejce Lazada", desc: "Názvy nabídek pro Lazada, popisy produktů, klíčová slova, SEO analýza a kalkulačky zisku pro Lazada.", cta: "Otevřít generátor názvů Lazada" },
    hu: { title: "Lazada eladói eszköztár", desc: "Lazada termékcímek, leírások, kulcsszavak, SEO elemzés és profitszámítás Lazada eladóknak.", cta: "Lazada címgenerátor megnyitása" },
    ro: { title: "Set de instrumente vânzători Lazada", desc: "Titluri de listare Lazada, descrieri de produse, cuvinte cheie, analiză SEO și calculatoare de profit pentru Lazada.", cta: "Deschide generatorul de titluri Lazada" },
    pt: { title: "Kit de Ferramentas para Vendedores Lazada", desc: "Títulos de anúncios para Lazada, descrições de produtos, palavras-chave, análise de SEO e calculadoras de lucro na Lazada.", cta: "Abrir Gerador de Títulos Lazada" }
  },
  'pdf-utilities': {
    id: { title: "Utilitas PDF & Gambar", desc: "Ekstrak teks, kompres gambar, bersihkan metadata EXIF, OCR, dan konversi dokumen—alat utilitas cepat langsung di browser.", cta: "Buka Utilitas PDF" },
    vi: { title: "Tiện ích PDF & Hình ảnh", desc: "Trích xuất văn bản, nén hình ảnh, xóa siêu dữ liệu EXIF, OCR và chuyển đổi tài liệu—tiện ích nhanh ngay trong trình duyệt.", cta: "Mở tiện ích PDF" },
    cs: { title: "Nástroje pro PDF a obrázky", desc: "Extrakce textu, komprese obrázků, odstranění EXIF metadat, OCR a převod dokumentů—rychlé nástroje přímo v prohlížeči.", cta: "Otevřít PDF nástroje" },
    hu: { title: "PDF és kép segédprogramok", desc: "Szövegkivonatolás, képtömörítés, EXIF metaadatok törlése, OCR és dokumentumkonverzió—gyors eszközök közvetlenül a böngészőben.", cta: "PDF eszközök megnyitása" },
    ro: { title: "Utilitare PDF și imagini", desc: "Extrageți text, comprimați imagini, eliminați metadatele EXIF, OCR și convertiți documente—utilitare rapide direct în browser.", cta: "Deschide utilitarele PDF" },
    pt: { title: "Utilitários de PDF e Imagem", desc: "Extraia texto, comprima imagens, limpe metadados EXIF, OCR e converta documentos—ferramentas rápidas direto no navegador.", cta: "Abrir Utilitários de PDF" }
  }
};

export async function generateHubs() {
  const enHubs = JSON.parse(await readFile(path.join(root, 'src/locales/en/hubs.json'), 'utf8'));

  for (const locale of LOCALES) {
    const localized = {};
    for (const [hubKey, enData] of Object.entries(enHubs)) {
      const trans = HUB_TITLES[hubKey]?.[locale] || { title: enData.hero.title, desc: enData.hero.subtitle, cta: enData.hero.cta };
      localized[hubKey] = {
        ...enData,
        metadata: {
          title: `${trans.title} | Zetawala`,
          description: trans.desc
        },
        hero: {
          title: trans.title,
          subtitle: trans.desc,
          cta: trans.cta
        },
        grid: {
          title: enData.grid?.title || trans.title,
          subtitle: enData.grid?.subtitle || trans.desc
        }
      };
    }

    const dir = path.join(root, 'src/locales', locale);
    await mkdir(dir, { recursive: true });
    await writeFile(path.join(dir, 'hubs.json'), `${JSON.stringify(localized, null, 2)}\n`, 'utf8');
    console.log(`Generated hubs.json for ${locale}`);
  }
}

if (process.argv[1]?.endsWith('generate-hubs.mjs')) {
  await generateHubs();
}
