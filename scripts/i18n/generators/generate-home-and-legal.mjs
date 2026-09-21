import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();

const LOCALES = ['id', 'vi', 'cs', 'hu', 'ro', 'pt'];

const HOME_DATA = {
  id: {
    metadata: {
      title: "Alat AI YouTube, Daraz, WhatsApp & SEO Gratis | Zetawala",
      description: "Zetawala menawarkan alat AI gratis untuk otomatisasi YouTube, SEO Daraz, perdagangan sosial WhatsApp, dan audit webmaster SEO—judul, skrip, riset niche, PageSpeed, dan banyak lagi.",
      keywords: ["alat AI gratis", "alat YouTube", "SEO Daraz", "kalkulator", "Zetawala"]
    },
    hero: {
      badge: "Aset Otomatis & Sistem Produktivitas",
      titleBefore: "Alat AI Gratis untuk YouTube, Daraz, Freelancer, Shopee &",
      titleAccent: "Lazada",
      subtitle: "Riset, audit, alat belajar, alur kerja freelancer, dan toolkit penjual marketplace dalam satu tempat—YouTube, Daraz, WhatsApp, SEO, kalkulator, utilitas PDF, penulisan AI, Upwork/Fiverr, ditambah SEO listing Shopee dan Lazada serta perhitungan laba.",
      searchHint: "Atau jelajahi kategori di menu atas — arahkan kursor ke suite mana pun untuk membuka setiap alat.",
      cta: "Buka Paket Alat",
      mockupAlt: "Mockup dasbor Zetawala"
    },
    localizedTools: {
      title: "Kalkulator bisnis dalam bahasa Anda",
      subtitle: "Mulai dengan kalkulator yang diterjemahkan sepenuhnya, lalu buka suite mana pun untuk nama lokal, metadata, dan FAQ.",
      viewAll: "Lihat semua kalkulator"
    },
    suites: {
      title: "Akses Suite SEO & Otomatisasi",
      subtitle: "Pilih paket suite di bawah ini untuk masuk ke dasbor ruang kerja langsung.",
      open: "Buka {label}",
      items: [
        { id: "youtube", title: "Paket Otomatisasi YouTube", body: "Riset niche, intelijen channel dan video, estimasi pendapatan, plus pipeline konten lengkap—ide, judul, hook, skrip, tag, thumbnail, dan visual.", cta: "Buka Ruang Kerja YouTube", href: "/tools/youtube/youtube-niche-finder" },
        { id: "daraz", title: "Paket SEO & Konversi Daraz", body: "Judul, deskripsi, kata kunci, balasan ulasan teroptimalkan, dan margin laba bersih FBM/FBD untuk pasar Pakistan.", cta: "Buka Ruang Kerja Daraz", href: "/tools/daraz/daraz-product-hunting" },
        { id: "seo", title: "Intelijen SEO & Webmaster", body: "Audit teknis, PageSpeed, peta situs, canonical, tautan internal, dan kalkulator ROI untuk pemilik situs web.", cta: "Buka Ruang Kerja SEO", href: "/seo" },
        { id: "calculators", title: "Kalkulator Bisnis & Pemasaran", body: "Tarif freelance, LTV, CAC, titik impas, margin laba, AdSense, dan matematika laba marketplace—rumus deterministik, tanpa AI.", cta: "Buka Kalkulator", hrefKey: "calculators" }
      ]
    },
    faqs: {
      title: "Pertanyaan yang sering diajukan",
      items: [
        { q: "Apa itu Zetawala?", a: "Zetawala adalah toolkit gratis untuk kreator, penjual, freelancer, dan pemilik situs web. Menggabungkan otomatisasi YouTube, SEO marketplace, perdagangan WhatsApp, audit SEO, kalkulator bisnis, utilitas PDF, penulisan AI, dan alat belajar." },
        { q: "Halaman mana saja yang tersedia dalam bahasa lain?", a: "Semua halaman publik, beranda, hub suite, halaman hukum, kontak, blog, dan setiap alat publik tersedia dalam berbagai bahasa dengan URL terindeks." },
        { q: "Apakah kalkulator menggunakan AI?", a: "Tidak. Hasil kalkulator adalah perhitungan matematis deterministik dari input Anda. Tidak ada panggilan LLM." },
        { q: "Apakah alat Zetawala gratis?", a: "Ya. Zetawala adalah toolkit gratis yang didukung iklan." }
      ]
    }
  },
  vi: {
    metadata: {
      title: "Công cụ AI miễn phí cho YouTube, Daraz, WhatsApp & SEO | Zetawala",
      description: "Zetawala cung cấp các công cụ AI miễn phí cho tự động hóa YouTube, SEO Daraz, thương mại xã hội WhatsApp và kiểm toán webmaster SEO—tiêu đề, kịch bản, nghiên cứu ngách, PageSpeed và nhiều hơn nữa.",
      keywords: ["công cụ AI miễn phí", "công cụ YouTube", "SEO Daraz", "máy tính", "Zetawala"]
    },
    hero: {
      badge: "Hệ thống tự động hóa & năng suất",
      titleBefore: "Công cụ AI miễn phí cho YouTube, Daraz, Freelancer, Shopee &",
      titleAccent: "Lazada",
      subtitle: "Nghiên cứu, kiểm toán, công cụ học tập, quy trình làm việc cho freelancer và bộ công cụ cho người bán trên sàn thương mại điện tử tại một nơi—YouTube, Daraz, WhatsApp, SEO, máy tính, tiện ích PDF, viết AI, Upwork/Fiverr cùng SEO danh sách và tính lợi nhuận Shopee & Lazada.",
      searchHint: "Hoặc duyệt các danh mục ở menu trên cùng — rê chuột qua bất kỳ bộ công cụ nào để xem tất cả công cụ.",
      cta: "Khám phá bộ công cụ",
      mockupAlt: "Hình ảnh giao diện Zetawala"
    },
    localizedTools: {
      title: "Máy tính kinh doanh bằng ngôn ngữ của bạn",
      subtitle: "Bắt đầu với các máy tính được dịch đầy đủ, sau đó mở bất kỳ bộ công cụ nào để xem tên bản địa hóa, siêu dữ liệu và câu hỏi thường gặp.",
      viewAll: "Xem tất cả máy tính"
    },
    suites: {
      title: "Truy cập bộ công cụ SEO & Tự động hóa",
      subtitle: "Chọn một bộ công cụ bên dưới để vào bảng điều khiển không gian làm việc trực tiếp.",
      open: "Mở {label}",
      items: [
        { id: "youtube", title: "Bộ tự động hóa YouTube", body: "Nghiên cứu ngách, phân tích kênh và video, ước tính doanh thu cùng quy trình nội dung hoàn chỉnh—ý tưởng, tiêu đề, hook, kịch bản, thẻ tag, hình thu nhỏ và hình ảnh.", cta: "Mở không gian YouTube", href: "/tools/youtube/youtube-niche-finder" },
        { id: "daraz", title: "Bộ SEO & Chuyển đổi Daraz", body: "Tiêu đề, mô tả, từ khóa tối ưu hóa, phản hồi đánh giá và tỷ suất lợi nhuận ròng FBM/FBD cho thị trường Pakistan.", cta: "Mở không gian Daraz", href: "/tools/daraz/daraz-product-hunting" },
        { id: "seo", title: "Thông tin chuyên sâu SEO & Webmaster", body: "Kiểm toán kỹ thuật, PageSpeed, sơ đồ trang web, thẻ chuẩn hóa, liên kết nội bộ và máy tính ROI cho chủ sở hữu trang web.", cta: "Mở không gian SEO", href: "/seo" },
        { id: "calculators", title: "Máy tính kinh doanh & Tiếp thị", body: "Giá theo giờ freelance, LTV, CAC, điểm hòa vốn, tỷ suất lợi nhuận, AdSense và tính toán lợi nhuận sàn thương mại—công thức chính xác, không dùng AI.", cta: "Mở máy tính", hrefKey: "calculators" }
      ]
    },
    faqs: {
      title: "Câu hỏi thường gặp",
      items: [
        { q: "Zetawala là gì?", a: "Zetawala là bộ công cụ miễn phí dành cho người sáng tạo, người bán hàng, freelancer và chủ sở hữu trang web. Kết hợp tự động hóa YouTube, SEO sàn TMĐT, thương mại WhatsApp, kiểm toán SEO, máy tính kinh doanh, tiện ích PDF, viết AI và công cụ học tập." },
        { q: "Những trang nào có sẵn bằng các ngôn ngữ khác?", a: "Tất cả các trang công khai, trang chủ, trung tâm bộ công cụ, trang pháp lý, liên hệ, blog và mọi công cụ công khai đều có sẵn bằng nhiều ngôn ngữ." },
        { q: "Các máy tính có sử dụng AI không?", a: "Không. Kết quả máy tính là phép toán chính xác từ dữ liệu bạn nhập vào. Không có lệnh gọi LLM." },
        { q: "Các công cụ của Zetawala có miễn phí không?", a: "Có. Zetawala là bộ công cụ miễn phí được hỗ trợ bởi quảng cáo." }
      ]
    }
  },
  cs: {
    metadata: {
      title: "Bezplatné AI nástroje pro YouTube, Daraz, WhatsApp a SEO | Zetawala",
      description: "Zetawala nabízí bezplatné AI nástroje pro automatizaci YouTube, SEO pro Daraz, sociální obchod na WhatsAppu a webmaster audity—názvy, scénáře, průzkum trhu, PageSpeed a další.",
      keywords: ["bezplatné AI nástroje", "YouTube nástroje", "Daraz SEO", "kalkulačky", "Zetawala"]
    },
    hero: {
      badge: "Automatizované systémy a produktivita",
      titleBefore: "Bezplatné AI nástroje pro YouTube, Daraz, Freelancery, Shopee &",
      titleAccent: "Lazada",
      subtitle: "Průzkum, audity, studijní pomůcky, pracovní postupy pro freelancery a sady pro prodejce na tržištích na jednom místě—YouTube, Daraz, WhatsApp, SEO, kalkulačky, PDF nástroje, AI psaní, Upwork/Fiverr a optimalizace pro Shopee a Lazada.",
      searchHint: "Nebo procházejte kategorie v horní nabídce — najeďte na libovolnou sadu pro otevření nástrojů.",
      cta: "Spustit sady nástrojů",
      mockupAlt: "Náhled ovládacího panelu Zetawala"
    },
    localizedTools: {
      title: "Obchodní kalkulačky ve vašem jazyce",
      subtitle: "Začněte s plně přeloženými kalkulačkami a poté otevřete jakoukoli sadu pro lokalizované názvy, metadata a časté dotazy.",
      viewAll: "Zobrazit všechny kalkulačky"
    },
    suites: {
      title: "Přístup k sadám SEO a automatizace",
      subtitle: "Vyberte balíček níže a vstupte do pracovního prostoru.",
      open: "Otevřít {label}",
      items: [
        { id: "youtube", title: "Sada automatizace pro YouTube", body: "Průzkum trhu, analýza kanálů a videí, odhady příjmů a kompletní obsahový plán—nápady, názvy, háčky, scénáře, tagy, miniatury a vizuály.", cta: "Otevřít YouTube prostor", href: "/tools/youtube/youtube-niche-finder" },
        { id: "daraz", title: "Sada SEO a konverzí pro Daraz", body: "Optimalizované názvy, popisy, klíčová slova, odpovědi na recenze a marže čistého zisku FBM/FBD pro pákistánský trh.", cta: "Otevřít Daraz prostor", href: "/tools/daraz/daraz-product-hunting" },
        { id: "seo", title: "SEO a webmaster inteligence", body: "Technické audity, PageSpeed, mapy stránek, kanonické tagy, interní odkazy a kalkulačky návratnosti investic (ROI).", cta: "Otevřít SEO prostor", href: "/seo" },
        { id: "calculators", title: "Obchodní a marketingové kalkulačky", body: "Hodinové sazby na volné noze, LTV, CAC, bod zvratu, zisková marže, AdSense a matematika zisku na tržištích—deterministické vzorce, bez AI.", cta: "Otevřít kalkulačky", hrefKey: "calculators" }
      ]
    },
    faqs: {
      title: "Často kladené otázky",
      items: [
        { q: "Co je Zetawala?", a: "Zetawala je bezplatná sada nástrojů pro tvůrce, prodejce, freelancery a majitele webů. Spojuje automatizaci YouTube, SEO pro tržiště, WhatsApp obchod, SEO audity, kalkulačky, PDF nástroje a AI psaní." },
        { q: "Které stránky jsou dostupné v jiných jazycích?", a: "Všechny veřejné stránky, domovská stránka, centra sad, právní stránky, kontakt, blog i všechny veřejné nástroje jsou dostupné ve více jazycích." },
        { q: "Používají kalkulačky umělou inteligenci?", a: "Ne. Výsledky kalkulaček jsou čisté matematické výpočty z vašich vstupů. Neprobíhá žádné volání LLM." },
        { q: "Jsou nástroje Zetawala zdarma?", a: "Ano. Zetawala je bezplatná sada nástrojů podporovaná reklamou." }
      ]
    }
  },
  hu: {
    metadata: {
      title: "Ingyenes AI eszközök YouTube-hoz, Darazhoz, WhatsApphoz és SEO-hoz | Zetawala",
      description: "A Zetawala ingyenes AI eszközöket kínál YouTube automatizáláshoz, Daraz SEO-hoz, WhatsApp közösségi kereskedelemhez és webmester SEO auditokhoz—címek, szkriptek, niche kutatás, PageSpeed és még sok más.",
      keywords: ["ingyenes AI eszközök", "YouTube eszközök", "Daraz SEO", "kalkulátorok", "Zetawala"]
    },
    hero: {
      badge: "Automatizált rendszerek és termelékenység",
      titleBefore: "Ingyenes AI eszközök YouTube-hoz, Darazhoz, Szabadúszóknak, Shopee-hoz &",
      titleAccent: "Lazada",
      subtitle: "Kutatás, auditok, tanulási eszközök, szabadúszó munkafolyamatok és piactéri eladói eszköztárak egy helyen—YouTube, Daraz, WhatsApp, SEO, kalkulátorok, PDF segédprogramok, AI írás, Upwork/Fiverr és piactéri profitmatematika.",
      searchHint: "Vagy böngésszen a fenti menü kategóriái között — vigye az egeret bármelyik csomagra az eszközök megnyitásához.",
      cta: "Eszközcsomagok indítása",
      mockupAlt: "Zetawala irányítópult előnézet"
    },
    localizedTools: {
      title: "Üzleti kalkulátorok az Ön nyelvén",
      subtitle: "Kezdje a teljesen lefordított kalkulátorokkal, majd nyisson meg bármelyik csomagot a honosított nevekhez, metaadatokhoz és GYIK-hez.",
      viewAll: "Összes kalkulátor megtekintése"
    },
    suites: {
      title: "Hozzáférés a SEO és automatizálási csomagokhoz",
      subtitle: "Válasszon egy csomagot alább a munkaterület megnyitásához.",
      open: "{label} megnyitása",
      items: [
        { id: "youtube", title: "YouTube automatizálási csomag", body: "Niche kutatás, csatorna- és videóelemzés, bevételbecslések és teljes tartalomtervezés—ötletek, címek, horgok, szkriptek, címkék és indexképek.", cta: "YouTube munkaterület", href: "/tools/youtube/youtube-niche-finder" },
        { id: "daraz", title: "Daraz SEO és konverziós csomag", body: "Optimalizált címek, leírások, kulcsszavak, értékelési válaszok és nettó haszonkulcs számítások a pakisztáni piachoz.", cta: "Daraz munkaterület", href: "/tools/daraz/daraz-product-hunting" },
        { id: "seo", title: "SEO és webmester intelligencia", body: "Technikai auditok, PageSpeed, webhelytérképek, kanonikus címkék, belső linkek és ROI kalkulátorok webhelytulajdonosoknak.", cta: "SEO munkaterület", href: "/seo" },
        { id: "calculators", title: "Üzleti és marketing kalkulátorok", body: "Szabadúszó díjak, LTV, CAC, fedezeti pont, haszonkulcs, AdSense és piactéri profitmatematika—determinisztikus képletek, AI nélkül.", cta: "Kalkulátorok megnyitása", hrefKey: "calculators" }
      ]
    },
    faqs: {
      title: "Gyakran Ismételt Kérdések",
      items: [
        { q: "Mi az a Zetawala?", a: "A Zetawala egy ingyenes eszköztár tartalomkészítőknek, eladóknak, szabadúszóknak és webhelytulajdonosoknak. Egyesíti a YouTube automatizálást, a piactéri SEO-t, a WhatsApp kereskedelmet, a SEO auditokat és a kalkulátorokat." },
        { q: "Mely oldalak érhetők el más nyelveken?", a: "Minden nyilvános oldal, a kezdőlap, a csomagközpontok, a jogi oldalak, a kapcsolat, a blog és minden nyilvános eszköz elérhető több nyelven." },
        { q: "Használnak AI-t a kalkulátorok?", a: "Nem. A kalkulátorok eredményei determinisztikus matematikai számítások az Ön adatai alapján. Nincs LLM hívás." },
        { q: "Ingyenesek a Zetawala eszközei?", a: "Igen. A Zetawala egy ingyenes, hirdetések által támogatott eszköztár." }
      ]
    }
  },
  ro: {
    metadata: {
      title: "Instrumente AI gratuite pentru YouTube, Daraz, WhatsApp & SEO | Zetawala",
      description: "Zetawala oferă instrumente AI gratuite pentru automatizarea YouTube, SEO Daraz, comerț social WhatsApp și audituri SEO webmaster—titluri, scenarii, cercetare de nișă, PageSpeed și multe altele.",
      keywords: ["instrumente AI gratuite", "instrumente YouTube", "SEO Daraz", "calculatoare", "Zetawala"]
    },
    hero: {
      badge: "Sisteme automate și productivitate",
      titleBefore: "Instrumente AI gratuite pentru YouTube, Daraz, Freelanceri, Shopee &",
      titleAccent: "Lazada",
      subtitle: "Cercetare, audituri, instrumente de studiu, fluxuri de lucru pentru freelanceri și truse pentru vânzători pe marketplace într-un singur loc—YouTube, Daraz, WhatsApp, SEO, calculatoare, utilitare PDF, scriere AI, Upwork/Fiverr și optimizare pentru Shopee și Lazada.",
      searchHint: "Sau navigați prin categoriile din meniul de sus — treceți cursorul peste orice suită pentru a deschide instrumentele.",
      cta: "Lansează pachetele de instrumente",
      mockupAlt: "Previzualizare panou de control Zetawala"
    },
    localizedTools: {
      title: "Calculatoare de afaceri în limba ta",
      subtitle: "Începeți cu calculatoarele traduse complet, apoi deschideți orice suită pentru denumiri localizate, metadate și întrebări frecvente.",
      viewAll: "Vezi toate calculatoarele"
    },
    suites: {
      title: "Accesează suitele de SEO și automatizare",
      subtitle: "Selectați un pachet de mai jos pentru a intra în panoul de lucru live.",
      open: "Deschide {label}",
      items: [
        { id: "youtube", title: "Pachet de automatizare YouTube", body: "Cercetare de nișă, analiză canale și videoclipuri, estimări de venituri și flux complet de conținut—idei, titluri, cârlige, scenarii, etichete și miniaturi.", cta: "Deschide spațiul YouTube", href: "/tools/youtube/youtube-niche-finder" },
        { id: "daraz", title: "Pachet SEO și conversie Daraz", body: "Titluri optimizate, descrieri, cuvinte cheie, răspunsuri la recenzii și marje de profit net FBM/FBD pentru piața din Pakistan.", cta: "Deschide spațiul Daraz", href: "/tools/daraz/daraz-product-hunting" },
        { id: "seo", title: "Inteligență SEO și webmaster", body: "Audituri tehnice, PageSpeed, sitemap-uri, etichete canonice, linkuri interne și calculatoare de rentabilitate (ROI) pentru proprietarii de site-uri.", cta: "Deschide spațiul SEO", href: "/seo" },
        { id: "calculators", title: "Calculatoare de afaceri și marketing", body: "Tarife orare freelance, LTV, CAC, punct de echilibru, marjă de profit, AdSense și calcule de profit pe marketplace—formule deterministe, fără AI.", cta: "Deschide calculatoarele", hrefKey: "calculators" }
      ]
    },
    faqs: {
      title: "Întrebări frecvente",
      items: [
        { q: "Ce este Zetawala?", a: "Zetawala este un set gratuit de instrumente pentru creatori, vânzători, freelanceri și proprietari de site-uri web. Combină automatizarea YouTube, SEO pentru marketplace, comerț WhatsApp, audituri SEO și calculatoare de afaceri." },
        { q: "Ce pagini sunt disponibile în alte limbi?", a: "Toate paginile publice, pagina principală, hub-urile suitelor, paginile legale, contactul, blogul și fiecare instrument public sunt disponibile în mai multe limbi." },
        { q: "Calculatoarele folosesc inteligență artificială?", a: "Nu. Rezultatele calculatoarelor sunt calcule matematice deterministe din datele introduse. Nu există apeluri către modele lingvistice." },
        { q: "Instrumentele Zetawala sunt gratuite?", a: "Da. Zetawala este un set de instrumente gratuit, susținut de reclame." }
      ]
    }
  },
  pt: {
    metadata: {
      title: "Ferramentas de IA Gratuitas para YouTube, Daraz, WhatsApp & SEO | Zetawala",
      description: "A Zetawala oferece ferramentas gratuitas de IA para automação do YouTube, SEO para Daraz, comércio social no WhatsApp e auditorias de webmaster SEO—títulos, roteiros, pesquisa de nicho, PageSpeed e muito mais.",
      keywords: ["ferramentas de IA gratuitas", "ferramentas do YouTube", "SEO Daraz", "calculadoras", "Zetawala"]
    },
    hero: {
      badge: "Sistemas Automatizados e Produtividade",
      titleBefore: "Ferramentas de IA Gratuitas para YouTube, Daraz, Freelancers, Shopee &",
      titleAccent: "Lazada",
      subtitle: "Pesquisa, auditorias, ferramentas de estudo, fluxos de trabalho para freelancers e kits de ferramentas para vendedores em marketplaces em um só lugar—YouTube, Daraz, WhatsApp, SEO, calculadoras, utilitários de PDF, escrita com IA, Upwork/Fiverr e matemática de lucro para Shopee e Lazada.",
      searchHint: "Ou navegue pelas categorias no menu superior — passe o mouse sobre qualquer suíte para abrir as ferramentas.",
      cta: "Explorar Ferramentas",
      mockupAlt: "Mockup do painel da Zetawala"
    },
    localizedTools: {
      title: "Calculadoras de negócios no seu idioma",
      subtitle: "Comece com as calculadoras totalmente traduzidas e depois abra qualquer suíte para conferir nomes localizados, metadados e perguntas frequentes.",
      viewAll: "Ver todas as calculadoras"
    },
    suites: {
      title: "Acesse as Suítes de SEO e Automação",
      subtitle: "Selecione um pacote abaixo para entrar no painel de trabalho ao vivo.",
      open: "Abrir {label}",
      items: [
        { id: "youtube", title: "Pacote de Automação do YouTube", body: "Pesquisa de nicho, inteligência de canais e vídeos, estimativas de receita e um pipeline completo de conteúdo—ideias, títulos, ganchos, roteiros, tags e miniaturas.", cta: "Abrir Espaço do YouTube", href: "/tools/youtube/youtube-niche-finder" },
        { id: "daraz", title: "Pacote de SEO e Conversão Daraz", body: "Títulos, descrições, palavras-chave otimizadas, respostas a avaliações e margens de lucro líquido FBM/FBD para o mercado do Paquistão.", cta: "Abrir Espaço Daraz", href: "/tools/daraz/daraz-product-hunting" },
        { id: "seo", title: "Inteligência SEO e Webmaster", body: "Auditorias técnicas, PageSpeed, sitemaps, tags canônicas, links internos e calculadoras de ROI para proprietários de sites.", cta: "Abrir Espaço SEO", href: "/seo" },
        { id: "calculators", title: "Calculadoras de Negócios e Marketing", body: "Tarifas freelance, LTV, CAC, ponto de equilíbrio, margem de lucro, AdSense e matemática de lucro para marketplaces—fórmulas determinísticas, sem IA.", cta: "Abrir Calculadoras", hrefKey: "calculators" }
      ]
    },
    faqs: {
      title: "Perguntas Frequentes",
      items: [
        { q: "O que é a Zetawala?", a: "A Zetawala é um conjunto gratuito de ferramentas para criadores, vendedores, freelancers e proprietários de sites. Combina automação do YouTube, SEO para marketplaces, comércio via WhatsApp, auditorias de SEO, calculadoras de negócios e utilitários de PDF." },
        { q: "Quais páginas estão disponíveis em outros idiomas?", a: "Todas as páginas públicas, página inicial, hubs de suítes, páginas legais, contato, blog e cada ferramenta pública estão disponíveis em múltiplos idiomas." },
        { q: "As calculadoras usam inteligência artificial?", a: "Não. Os resultados das calculadoras são cálculos matemáticos determinísticos a partir dos seus dados. Não há chamadas de LLM." },
        { q: "As ferramentas da Zetawala são gratuitas?", a: "Sim. A Zetawala é um conjunto de ferramentas gratuito e mantido por anúncios." }
      ]
    }
  }
};

export async function generateHomeFiles() {
  for (const [locale, data] of Object.entries(HOME_DATA)) {
    const dir = path.join(root, 'src/locales', locale);
    await mkdir(dir, { recursive: true });
    await writeFile(path.join(dir, 'home.json'), `${JSON.stringify(data, null, 2)}\n`, 'utf8');
    console.log(`Generated home.json for ${locale}`);
  }
}

if (process.argv[1]?.endsWith('generate-home-and-legal.mjs')) {
  await generateHomeFiles();
}
