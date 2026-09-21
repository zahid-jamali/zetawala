import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();

const COMMON_DATA = {
  id: {
    brand: "Zetawala",
    nav: {
      openHub: "Buka hub",
      openHubNamed: "Buka hub {label}",
      toolsCount: "{count} alat",
      toolsHint: "{count} alat · gunakan pencarian untuk akses lebih cepat",
      allCategories: "Semua kategori",
      openMenu: "Buka menu",
      closeMenu: "Tutup menu",
      toggleTheme: "Ganti tema",
      closeMega: "Tutup menu"
    },
    categories: {
      youtube: { label: "YouTube", desc: "Riset niche, monetisasi & pipeline konten" },
      daraz: { label: "Daraz", desc: "Riset produk, listing & kalkulasi laba" },
      whatsapp: { label: "WhatsApp", desc: "Broadcast, iklan & teks penjual lokal" },
      shopee: { label: "Shopee", desc: "SEO listing, biaya, pengiriman & balasan chat" },
      lazada: { label: "Lazada", desc: "Judul, kata kunci, margin & pengoptimal" },
      writing: { label: "Menulis", desc: "Humanizer, tata bahasa, Urdu & tulis ulang" },
      study: { label: "Belajar", desc: "Catatan, kuis, flashcard & mengetik" },
      freelancer: { label: "Freelancer", desc: "Proposal Upwork & Fiverr, gig & tarif" },
      seo: { label: "SEO", desc: "Audit, PageSpeed, peta situs & ROI" },
      calculators: { label: "Kalkulator", desc: "Tarif freelance, LTV, iklan & margin" },
      pdf: { label: "PDF", desc: "Ekstrak, konversi, EXIF & OCR" }
    },
    search: {
      placeholder: "Cari alat…",
      placeholderHero: "Cari 100+ alat gratis…",
      noResults: "Tidak ada alat yang cocok dengan “{query}”",
      hint: "Tekan Enter untuk membuka hasil teratas"
    },
    switcher: {
      label: "Bahasa",
      choose: "Pilih bahasa",
      current: "Bahasa saat ini: {name}"
    },
    footer: {
      tagline: "Suite analisis e-commerce berkonversi tinggi dan otomatisasi konten viral untuk pertumbuhan dan stabilitas finansial.",
      workspace: "Halaman Ruang Kerja",
      platform: "Info Platform",
      legal: "Kepatuhan & Hukum",
      youtube: "Otomatisasi YouTube",
      daraz: "Suite SEO Daraz",
      whatsapp: "Perdagangan Sosial Lokal & WhatsApp",
      seo: "Intelijen SEO & Webmaster",
      calculators: "Kalkulator",
      pdf: "Utilitas PDF & Gambar",
      writing: "Alat Penulisan & Bahasa AI",
      study: "Studi AI, Kuis & Mengetik",
      freelancer: "Toolkit Freelancer",
      shopee: "Toolkit Penjual Shopee",
      lazada: "Toolkit Penjual Lazada",
      blog: "Blog",
      contact: "Hubungi Dukungan",
      home: "Portal Utama",
      privacy: "Kebijakan Privasi",
      terms: "Syarat Layanan",
      cookies: "Kebijakan Cookie",
      copyright: "© {year} zetawala.com. Hak cipta dilindungi undang-undang.",
      authority: "Platform SEO Otoritas",
      growth: "Dibangun untuk Pertumbuhan"
    },
    errors: {
      notFoundTitle: "Halaman tidak ditemukan",
      notFoundBody: "Halaman ini tidak tersedia dalam bahasa ini."
    },
    a11y: { skipToContent: "Lompat ke konten" },
    tools: {
      "profit-margin": { name: "Kalkulator Margin Laba", desc: "Laba kotor, margin % dan markup dari biaya & harga" },
      "break-even": { name: "Kalkulator Titik Impas", desc: "Hitung unit dan pendapatan impas untuk produk apa pun" },
      "freelance-hourly-rate": { name: "Kalkulator Tarif per Jam Freelance", desc: "Tentukan tarif minimum, rekomendasi & premium dari target pendapatan" },
      "salary-to-hourly": { name: "Kalkulator Gaji ke Tarif per Jam", desc: "Konversi gaji tahunan atau bulanan ke tarif per jam" },
      "customer-ltv": { name: "Kalkulator Customer Lifetime Value (LTV)", desc: "Hitung LTV dari nilai pesanan, frekuensi & masa pakai" },
      "adsense-revenue": { name: "Kalkulator Pendapatan AdSense", desc: "Perkirakan penghasilan AdSense dari tayangan halaman & RPM" }
    }
  },
  vi: {
    brand: "Zetawala",
    nav: {
      openHub: "Mở trung tâm",
      openHubNamed: "Mở trung tâm {label}",
      toolsCount: "{count} công cụ",
      toolsHint: "{count} công cụ · dùng tìm kiếm để tra cứu nhanh hơn",
      allCategories: "Tất cả danh mục",
      openMenu: "Mở menu",
      closeMenu: "Đóng menu",
      toggleTheme: "Chuyển giao diện",
      closeMega: "Đóng menu"
    },
    categories: {
      youtube: { label: "YouTube", desc: "Nghiên cứu ngách, kiếm tiền & quy trình nội dung" },
      daraz: { label: "Daraz", desc: "Tìm kiếm sản phẩm, danh sách & tính toán lợi nhuận" },
      whatsapp: { label: "WhatsApp", desc: "Phát sóng, quảng cáo & bản sao bán hàng địa phương" },
      shopee: { label: "Shopee", desc: "SEO danh sách, phí, vận chuyển & phản hồi tin nhắn" },
      lazada: { label: "Lazada", desc: "Tiêu đề, từ khóa, tỷ suất & tối ưu hóa" },
      writing: { label: "Viết lách", desc: "Nhân bản hóa, ngữ pháp, tiếng Urdu & viết lại" },
      study: { label: "Học tập", desc: "Ghi chú, câu đố, thẻ ghi nhớ & luyện gõ" },
      freelancer: { label: "Freelancer", desc: "Đề xuất Upwork & Fiverr, gig & giá" },
      seo: { label: "SEO", desc: "Kiểm toán, PageSpeed, sơ đồ trang web & ROI" },
      calculators: { label: "Máy tính", desc: "Giá theo giờ freelance, LTV, quảng cáo & tỷ suất" },
      pdf: { label: "PDF", desc: "Trích xuất, chuyển đổi, EXIF & OCR" }
    },
    search: {
      placeholder: "Tìm kiếm công cụ…",
      placeholderHero: "Tìm kiếm hơn 100 công cụ miễn phí…",
      noResults: "Không tìm thấy công cụ nào phù hợp với “{query}”",
      hint: "Nhấn Enter để mở kết quả đầu tiên"
    },
    switcher: {
      label: "Ngôn ngữ",
      choose: "Chọn ngôn ngữ",
      current: "Ngôn ngữ hiện tại: {name}"
    },
    footer: {
      tagline: "Bộ công cụ phân tích thương mại điện tử chuyển đổi cao và tự động hóa nội dung lan truyền được thiết kế để phát triển và ổn định tài chính.",
      workspace: "Trang không gian làm việc",
      platform: "Thông tin nền tảng",
      legal: "Tuân thủ & Pháp lý",
      youtube: "Tự động hóa YouTube",
      daraz: "Bộ công cụ SEO Daraz",
      whatsapp: "Thương mại xã hội địa phương & WhatsApp",
      seo: "Thông tin chuyên sâu SEO & Webmaster",
      calculators: "Máy tính",
      pdf: "Tiện ích PDF & Hình ảnh",
      writing: "Công cụ viết & ngôn ngữ AI",
      study: "Học tập AI, Trắc nghiệm & Luyện gõ",
      freelancer: "Bộ công cụ Freelancer",
      shopee: "Bộ công cụ người bán Shopee",
      lazada: "Bộ công cụ người bán Lazada",
      blog: "Blog",
      contact: "Liên hệ hỗ trợ",
      home: "Cổng thông tin chính",
      privacy: "Chính sách bảo mật",
      terms: "Điều khoản dịch vụ",
      cookies: "Chính sách cookie",
      copyright: "© {year} zetawala.com. Mọi quyền được bảo lưu.",
      authority: "Nền tảng SEO uy tín",
      growth: "Được xây dựng để tăng trưởng"
    },
    errors: {
      notFoundTitle: "Không tìm thấy trang",
      notFoundBody: "Trang này không có sẵn bằng ngôn ngữ này."
    },
    a11y: { skipToContent: "Chuyển đến nội dung" },
    tools: {
      "profit-margin": { name: "Máy tính tỷ suất lợi nhuận", desc: "Lợi nhuận gộp, tỷ suất % và markup từ chi phí & giá bán" },
      "break-even": { name: "Máy tính điểm hòa vốn", desc: "Tìm số lượng và doanh thu hòa vốn cho bất kỳ sản phẩm nào" },
      "freelance-hourly-rate": { name: "Máy tính giá theo giờ Freelance", desc: "Thiết lập mức giá tối thiểu, đề xuất & cao cấp từ mục tiêu thu nhập" },
      "salary-to-hourly": { name: "Máy tính chuyển lương sang giá giờ", desc: "Chuyển đổi lương hàng năm hoặc hàng tháng sang giá theo giờ" },
      "customer-ltv": { name: "Máy tính giá trị vòng đời khách hàng (LTV)", desc: "Tính LTV từ giá trị đơn hàng, tần suất & thời gian gắn bó" },
      "adsense-revenue": { name: "Máy tính doanh thu AdSense", desc: "Ước tính thu nhập AdSense từ lượt xem trang & RPM" }
    }
  },
  cs: {
    brand: "Zetawala",
    nav: {
      openHub: "Otevřít centrum",
      openHubNamed: "Otevřít centrum {label}",
      toolsCount: "{count} nástrojů",
      toolsHint: "{count} nástrojů · použijte vyhledávání pro rychlejší přístup",
      allCategories: "Všechny kategorie",
      openMenu: "Otevřít menu",
      closeMenu: "Zavřít menu",
      toggleTheme: "Přepnout motiv",
      closeMega: "Zavřít menu"
    },
    categories: {
      youtube: { label: "YouTube", desc: "Průzkum trhu, monetizace a obsahový plán" },
      daraz: { label: "Daraz", desc: "Vyhledávání produktů, nabídky a výpočet zisku" },
      whatsapp: { label: "WhatsApp", desc: "Vysílání, reklamy a texty pro lokální prodejce" },
      shopee: { label: "Shopee", desc: "SEO nabídek, poplatky, doprava a odpovědi na chat" },
      lazada: { label: "Lazada", desc: "Názvy, klíčová slova, marže a optimalizátor" },
      writing: { label: "Psaní", desc: "Humanizátor, gramatika, urdština a přepisování" },
      study: { label: "Studium", desc: "Poznámky, kvízy, kartičky a psaní na klávesnici" },
      freelancer: { label: "Freelancer", desc: "Návrhy pro Upwork a Fiverr, zakázky a sazby" },
      seo: { label: "SEO", desc: "Audity, PageSpeed, mapy stránek a ROI" },
      calculators: { label: "Kalkulačky", desc: "Hodinové sazby, LTV, reklamy a marže" },
      pdf: { label: "PDF", desc: "Extrakce, konverze, EXIF a OCR" }
    },
    search: {
      placeholder: "Hledat nástroje…",
      placeholderHero: "Hledat více než 100 bezplatných nástrojů…",
      noResults: "Žádné nástroje neodpovídají dotazu „{query}“",
      hint: "Stisknutím klávesy Enter otevřete nejlepší výsledek"
    },
    switcher: {
      label: "Jazyk",
      choose: "Vybrat jazyk",
      current: "Aktuální jazyk: {name}"
    },
    footer: {
      tagline: "Sada pro vysoce konverzní analýzu e-commerce a automatizaci virálního obsahu navržená pro růst a finanční stabilitu.",
      workspace: "Stránky pracovního prostoru",
      platform: "Informace o platformě",
      legal: "Soulad s předpisy a právní informace",
      youtube: "Automatizace YouTube",
      daraz: "Sada SEO pro Daraz",
      whatsapp: "Místní sociální obchod a WhatsApp",
      seo: "SEO a webmaster inteligence",
      calculators: "Kalkulačky",
      pdf: "Nástroje pro PDF a obrázky",
      writing: "AI nástroje pro psaní a jazyky",
      study: "AI studium, kvízy a psaní",
      freelancer: "Sada pro freelancery",
      shopee: "Sada pro prodejce Shopee",
      lazada: "Sada pro prodejce Lazada",
      blog: "Blog",
      contact: "Kontaktovat podporu",
      home: "Hlavní portál",
      privacy: "Zásady ochrany soukromí",
      terms: "Podmínky služby",
      cookies: "Zásady cookies",
      copyright: "© {year} zetawala.com. Všechna práva vyhrazena.",
      authority: "Autoritní SEO platforma",
      growth: "Stvořeno pro růst"
    },
    errors: {
      notFoundTitle: "Stránka nenalezena",
      notFoundBody: "Tato stránka není v tomto jazyce k dispozici."
    },
    a11y: { skipToContent: "Přeskočit na obsah" },
    tools: {
      "profit-margin": { name: "Kalkulačka ziskové marže", desc: "Hrubý zisk, marže v % a přirážka z nákladů a prodejní ceny" },
      "break-even": { name: "Kalkulačka bodu zvratu", desc: "Zjistěte počet kusů a tržby pro dosažení bodu zvratu" },
      "freelance-hourly-rate": { name: "Kalkulačka hodinové sazby na volné noze", desc: "Nastavte minimální, doporučenou a prémiovou hodinovou sazbu z příjmových cílů" },
      "salary-to-hourly": { name: "Kalkulačka převodu platu na hodinovou mzdu", desc: "Přepočítejte roční nebo měsíční plat na hodinovou sazbu" },
      "customer-ltv": { name: "Kalkulačka celoživotní hodnoty zákazníka (LTV)", desc: "Vypočítejte LTV z hodnoty objednávky, frekvence a doby trvání" },
      "adsense-revenue": { name: "Kalkulačka příjmů AdSense", desc: "Odhadněte výdělky AdSense ze zobrazení stránek a RPM" }
    }
  },
  hu: {
    brand: "Zetawala",
    nav: {
      openHub: "Központ megnyitása",
      openHubNamed: "{label} központ megnyitása",
      toolsCount: "{count} eszköz",
      toolsHint: "{count} eszköz · használja a keresést a gyorsabb eléréshez",
      allCategories: "Minden kategória",
      openMenu: "Menü megnyitása",
      closeMenu: "Menü bezárása",
      toggleTheme: "Téma váltása",
      closeMega: "Menü bezárása"
    },
    categories: {
      youtube: { label: "YouTube", desc: "Niche kutatás, monetizáció és tartalomcsatorna" },
      daraz: { label: "Daraz", desc: "Termékkutatás, listázás és profitmatematika" },
      whatsapp: { label: "WhatsApp", desc: "Közvetítések, hirdetések és helyi eladói szövegek" },
      shopee: { label: "Shopee", desc: "Listázás SEO, díjak, szállítás és csevegési válaszok" },
      lazada: { label: "Lazada", desc: "Címek, kulcsszavak, árrések és optimalizáló" },
      writing: { label: "Írás", desc: "Humanizáló, nyelvtan, urdu és átfogalmazás" },
      study: { label: "Tanulás", desc: "Jegyzetek, kvízek, tanulókártyák és gépelés" },
      freelancer: { label: "Szabadúszó", desc: "Upwork és Fiverr ajánlatok, megbízások és díjak" },
      seo: { label: "SEO", desc: "Auditok, PageSpeed, webhelytérképek és ROI" },
      calculators: { label: "Kalkulátorok", desc: "Szabadúszó díjak, LTV, hirdetések és haszonkulcsok" },
      pdf: { label: "PDF", desc: "Kivonatolás, konvertálás, EXIF és OCR" }
    },
    search: {
      placeholder: "Eszközök keresése…",
      placeholderHero: "Keresés több mint 100 ingyenes eszköz között…",
      noResults: "Nincs találat a következőre: „{query}”",
      hint: "Nyomja meg az Entert a legfelső találat megnyitásához"
    },
    switcher: {
      label: "Nyelv",
      choose: "Válasszon nyelvet",
      current: "Jelenlegi nyelv: {name}"
    },
    footer: {
      tagline: "Magas konverziójú e-kereskedelmi elemző és virális tartalomautomatizálási csomag a növekedés és pénzügyi stabilitás szolgálatában.",
      workspace: "Munkaterület oldalak",
      platform: "Platform információk",
      legal: "Megfelelőség és jog",
      youtube: "YouTube automatizálás",
      daraz: "Daraz SEO csomag",
      whatsapp: "Helyi közösségi kereskedelem és WhatsApp",
      seo: "SEO és webmester intelligencia",
      calculators: "Kalkulátorok",
      pdf: "PDF és kép segédprogramok",
      writing: "AI író- és nyelvi eszközök",
      study: "AI tanulás, kvízek és gépelés",
      freelancer: "Szabadúszó eszköztár",
      shopee: "Shopee eladói eszköztár",
      lazada: "Lazada eladói eszköztár",
      blog: "Blog",
      contact: "Kapcsolatfelvétel a támogatással",
      home: "Fő portál",
      privacy: "Adatvédelmi irányelvek",
      terms: "Szolgáltatási feltételek",
      cookies: "Cookie irányelvek",
      copyright: "© {year} zetawala.com. Minden jog fenntartva.",
      authority: "Hiteles SEO platform",
      growth: "Növekedésre tervezve"
    },
    errors: {
      notFoundTitle: "Az oldal nem található",
      notFoundBody: "Ez az oldal nem érhető el ezen a nyelven."
    },
    a11y: { skipToContent: "Ugrás a tartalomra" },
    tools: {
      "profit-margin": { name: "Haszonkulcs kalkulátor", desc: "Bruttó nyereség, árrés % és haszonkulcs költségből és árból" },
      "break-even": { name: "Fedezeti pont kalkulátor", desc: "Fedezeti darabszám és árbevétel kiszámítása bármilyen termékhez" },
      "freelance-hourly-rate": { name: "Szabadúszó óradíj kalkulátor", desc: "Minimum, ajánlott és prémium óradíjak beállítása bevételi célokból" },
      "salary-to-hourly": { name: "Fizetés-óradíj kalkulátor", desc: "Éves vagy havi fizetés átváltása óradíjra" },
      "customer-ltv": { name: "Ügyfél élettartam érték (LTV) kalkulátor", desc: "LTV számítása rendelési értékből, gyakoriságból és élettartamból" },
      "adsense-revenue": { name: "AdSense bevétel kalkulátor", desc: "AdSense bevételek becslése oldalletöltésekből és RPM-ből" }
    }
  },
  ro: {
    brand: "Zetawala",
    nav: {
      openHub: "Deschide hub",
      openHubNamed: "Deschide hubul {label}",
      toolsCount: "{count} instrumente",
      toolsHint: "{count} instrumente · folosește căutarea pentru acces rapid",
      allCategories: "Toate categoriile",
      openMenu: "Deschide meniul",
      closeMenu: "Închide meniul",
      toggleTheme: "Schimbă tema",
      closeMega: "Închide meniul"
    },
    categories: {
      youtube: { label: "YouTube", desc: "Cercetare de nișă, monetizare și pipeline de conținut" },
      daraz: { label: "Daraz", desc: "Căutare de produse, listări și calcul de profit" },
      whatsapp: { label: "WhatsApp", desc: "Difuzări, reclame și texte pentru vânzători locali" },
      shopee: { label: "Shopee", desc: "SEO listări, comisioane, livrare și răspunsuri chat" },
      lazada: { label: "Lazada", desc: "Titluri, cuvinte cheie, marje și optimizator" },
      writing: { label: "Scriere", desc: "Umanizator, gramatică, urdu și rescriere" },
      study: { label: "Studiu", desc: "Notițe, teste, flashcarduri și dactilografiere" },
      freelancer: { label: "Freelancer", desc: "Propuneri Upwork și Fiverr, gig-uri și tarife" },
      seo: { label: "SEO", desc: "Audituri, PageSpeed, sitemap-uri și ROI" },
      calculators: { label: "Calculatoare", desc: "Tarife freelance, LTV, reclame și marje" },
      pdf: { label: "PDF", desc: "Extragere, conversie, EXIF și OCR" }
    },
    search: {
      placeholder: "Caută instrumente…",
      placeholderHero: "Caută peste 100 de instrumente gratuite…",
      noResults: "Niciun instrument nu corespunde pentru „{query}”",
      hint: "Apasă Enter pentru a deschide primul rezultat"
    },
    switcher: {
      label: "Limbă",
      choose: "Alege limba",
      current: "Limba curentă: {name}"
    },
    footer: {
      tagline: "Suită de analiză e-commerce cu conversie ridicată și automatizare de conținut viral concepută pentru creștere și stabilitate financiară.",
      workspace: "Pagini spațiu de lucru",
      platform: "Informații platformă",
      legal: "Conformitate și aspecte juridice",
      youtube: "Automatizare YouTube",
      daraz: "Suită SEO Daraz",
      whatsapp: "Comerț social local și WhatsApp",
      seo: "Inteligență SEO și webmaster",
      calculators: "Calculatoare",
      pdf: "Utilitare PDF și imagini",
      writing: "Instrumente de scriere și limbaj AI",
      study: "Studiu AI, teste și dactilografiere",
      freelancer: "Set de instrumente pentru freelanceri",
      shopee: "Set de instrumente vânzători Shopee",
      lazada: "Set de instrumente vânzători Lazada",
      blog: "Blog",
      contact: "Contactează asistența",
      home: "Portal principal",
      privacy: "Politică de confidențialitate",
      terms: "Termeni și condiții",
      cookies: "Politică privind modulele cookie",
      copyright: "© {year} zetawala.com. Toate drepturile rezervate.",
      authority: "Platformă SEO de autoritate",
      growth: "Creat pentru creștere"
    },
    errors: {
      notFoundTitle: "Pagina nu a fost găsită",
      notFoundBody: "Această pagină nu este disponibilă în această limbă."
    },
    a11y: { skipToContent: "Sari la conținut" },
    tools: {
      "profit-margin": { name: "Calculator marjă de profit", desc: "Profit brut, marjă % și adaos comercial din cost și preț" },
      "break-even": { name: "Calculator punct de echilibru", desc: "Află unitățile și veniturile de echilibru pentru orice produs" },
      "freelance-hourly-rate": { name: "Calculator tarif orar freelance", desc: "Setează tarife minime, recomandate și premium pe baza obiectivelor de venit" },
      "salary-to-hourly": { name: "Calculator salariu în tarif orar", desc: "Convertește salariul anual sau lunar în tarif orar" },
      "customer-ltv": { name: "Calculator valoare de viață client (LTV)", desc: "Calculează LTV din valoarea comenzii, frecvență și durata de viață" },
      "adsense-revenue": { name: "Calculator venituri AdSense", desc: "Estimează câștigurile AdSense din afișări de pagină și RPM" }
    }
  },
  pt: {
    brand: "Zetawala",
    nav: {
      openHub: "Abrir hub",
      openHubNamed: "Abrir hub {label}",
      toolsCount: "{count} ferramentas",
      toolsHint: "{count} ferramentas · use a busca para acesso rápido",
      allCategories: "Todas as categorias",
      openMenu: "Abrir menu",
      closeMenu: "Fechar menu",
      toggleTheme: "Alternar tema",
      closeMega: "Fechar menu"
    },
    categories: {
      youtube: { label: "YouTube", desc: "Pesquisa de nicho, monetização e pipeline de conteúdo" },
      daraz: { label: "Daraz", desc: "Caça de produtos, anúncios e cálculo de lucro" },
      whatsapp: { label: "WhatsApp", desc: "Transmissões, anúncios e copy para vendedores locais" },
      shopee: { label: "Shopee", desc: "SEO de anúncios, taxas, frete e respostas de chat" },
      lazada: { label: "Lazada", desc: "Títulos, palavras-chave, margens e otimizador" },
      writing: { label: "Escrita", desc: "Humanizador, gramática, urdu e reescrita" },
      study: { label: "Estudo", desc: "Notas, quizzes, flashcards e digitação" },
      freelancer: { label: "Freelancer", desc: "Propostas para Upwork e Fiverr, gigs e tarifas" },
      seo: { label: "SEO", desc: "Auditorias, PageSpeed, sitemaps e ROI" },
      calculators: { label: "Calculadoras", desc: "Tarifas freelance, LTV, anúncios e margens" },
      pdf: { label: "PDF", desc: "Extração, conversão, EXIF e OCR" }
    },
    search: {
      placeholder: "Buscar ferramentas…",
      placeholderHero: "Buscar mais de 100 ferramentas gratuitas…",
      noResults: "Nenhuma ferramenta encontrada para “{query}”",
      hint: "Pressione Enter para abrir o resultado principal"
    },
    switcher: {
      label: "Idioma",
      choose: "Escolher idioma",
      current: "Idioma atual: {name}"
    },
    footer: {
      tagline: "Suíte de análise de e-commerce de alta conversão e automação de conteúdo viral projetada para crescimento e estabilidade financeira.",
      workspace: "Páginas do Espaço de Trabalho",
      platform: "Informações da Plataforma",
      legal: "Conformidade e Jurídico",
      youtube: "Automação do YouTube",
      daraz: "Suíte SEO Daraz",
      whatsapp: "Comércio Social Local e WhatsApp",
      seo: "Inteligência SEO e Webmaster",
      calculators: "Calculadoras",
      pdf: "Utilitários de PDF e Imagem",
      writing: "Ferramentas de Escrita e Linguagem IA",
      study: "Estudo com IA, Quizzes e Digitação",
      freelancer: "Kit de Ferramentas para Freelancer",
      shopee: "Kit de Ferramentas para Vendedores Shopee",
      lazada: "Kit de Ferramentas para Vendedores Lazada",
      blog: "Blog",
      contact: "Fale com o Suporte",
      home: "Portal Principal",
      privacy: "Política de Privacidade",
      terms: "Termos de Serviço",
      cookies: "Política de Cookies",
      copyright: "© {year} zetawala.com. Todos os direitos reservados.",
      authority: "Plataforma SEO de Autoridade",
      growth: "Construído para Crescimento"
    },
    errors: {
      notFoundTitle: "Página não encontrada",
      notFoundBody: "Esta página não está disponível neste idioma."
    },
    a11y: { skipToContent: "Pular para o conteúdo" },
    tools: {
      "profit-margin": { name: "Calculadora de margem de lucro", desc: "Lucro bruto, margem % e markup a partir de custo e preço" },
      "break-even": { name: "Calculadora de ponto de equilíbrio", desc: "Encontre unidades e receita de equilíbrio para qualquer produto" },
      "freelance-hourly-rate": { name: "Calculadora de tarifa por hora freelance", desc: "Defina tarifas mínimas, recomendadas e premium a partir de metas de renda" },
      "salary-to-hourly": { name: "Calculadora salário para valor hora", desc: "Converta salário anual ou mensal em valor por hora" },
      "customer-ltv": { name: "Calculadora de valor do tempo de vida do cliente (LTV)", desc: "Calcule o LTV a partir do valor do pedido, frequência e vida útil" },
      "adsense-revenue": { name: "Calculadora de receita do AdSense", desc: "Estime os ganhos do AdSense a partir de visualizações de página e RPM" }
    }
  }
};

export async function generateCommon() {
  for (const [locale, data] of Object.entries(COMMON_DATA)) {
    const dir = path.join(root, 'src/locales', locale);
    await mkdir(dir, { recursive: true });
    await writeFile(path.join(dir, 'common.json'), `${JSON.stringify(data, null, 2)}\n`, 'utf8');
    console.log(`Generated common.json for ${locale}`);
  }
}

if (process.argv[1]?.endsWith('generate-common-and-pages.mjs')) {
  await generateCommon();
}
