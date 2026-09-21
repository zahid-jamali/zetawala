import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();

const CALCULATORS_HUB_DATA = {
  id: {
    metadata: {
      title: "Kalkulator Bisnis Gratis – Freelance, SaaS, Iklan & E-commerce | Zetawala",
      description: "Kalkulator bisnis dan pemasaran gratis: tarif per jam freelance, biaya API AI, penetapan harga SaaS, LTV, CAC, titik impas, margin laba, Google Ads, AdSense, afiliasi, biaya Amazon FBA, Etsy, dan eBay.",
      keywords: ["kalkulator bisnis gratis", "kalkulator tarif per jam freelance", "kalkulator margin laba", "kalkulator titik impas", "kalkulator pendapatan adsense"]
    },
    hero: {
      title: "Kalkulator Bisnis & Pemasaran",
      subtitle: "Hitung tarif freelance instan, harga SaaS, LTV, CAC, ROI iklan, AdSense, penghasilan afiliasi, dan laba marketplace—18 alat gratis dengan rumus deterministik tanpa ketergantungan AI.",
      cta: "Buka Kalkulator Tarif Freelance"
    },
    grid: {
      title: "Semua Kalkulator",
      subtitle: "18 alat untuk penetapan harga, ekonomi unit, ROI pemasaran, dan margin e-commerce.",
      localizedBadge: "Diterjemahkan"
    },
    pickerTitle: "Pilih Kalkulator yang Tepat",
    pickerSubtitle: "Cocokkan tujuan Anda dengan titik awal yang tepat dalam suite.",
    learning: {
      title: "Pembelajaran Penetapan Harga & ROI",
      subtitle: "Konsep inti di balik toolkit kalkulator.",
      blogCta: "Baca panduan blog Kalkulator",
      topics: [
        { title: "Mengapa tarif mengalahkan tebakan", body: "Freelancer yang memasang harga terlalu rendah sering kali mengabaikan pajak, waktu non-tagihan, dan pengeluaran. Batas minimum per jam yang jelas melindungi arus kas." },
        { title: "LTV vs CAC", body: "Pertumbuhan yang sehat membutuhkan LTV yang lebih tinggi dari CAC secara signifikan. Gabungkan kedua kalkulator sebelum meningkatkan akuisisi berbayar." },
        { title: "Beban biaya marketplace", body: "Biaya Amazon, Etsy, dan eBay berlipat ganda dengan pengiriman dan iklan. Modelkan laba bersih per unit sebelum menambah volume listing." },
        { title: "Penganggaran API AI", body: "Harga token terlihat kecil per permintaan tetapi bertambah seiring volume harian. Perkirakan pengeluaran bulanan dan tahunan sebelum peluncuran." }
      ]
    },
    faqs: {
      title: "Pertanyaan yang Sering Diajukan",
      subtitle: "Pertanyaan umum seputar suite Kalkulator.",
      items: [
        { q: "Apa itu suite Kalkulator di Zetawala?", a: "Ini adalah rangkaian 18 kalkulator deterministik gratis untuk freelancer, pendiri SaaS, pemasar, dan penjual e-commerce. Setiap hasil dihitung dari rumus di browser—tanpa panggilan LLM." },
        { q: "Apakah kalkulator ini menggunakan AI?", a: "Tidak. Semua perhitungan matematika berjalan secara lokal dari input Anda." },
        { q: "Kalkulator mana yang harus saya mulai?", a: "Freelancer sebaiknya mulai dengan kalkulator Tarif per Jam atau Penetapan Harga Proyek. Pendiri SaaS sering memulai dengan Penetapan Harga SaaS, LTV, dan CAC." },
        { q: "Apakah hasilnya dijamin akurat?", a: "Hasilnya adalah estimasi transparan dari rumus bisnis standar. Selalu verifikasi biaya dan metrik akun Anda sendiri." }
      ]
    }
  },
  vi: {
    metadata: {
      title: "Máy tính kinh doanh miễn phí – Freelance, SaaS, Quảng cáo & TMĐT | Zetawala",
      description: "Máy tính kinh doanh và tiếp thị miễn phí: giá theo giờ freelance, chi phí API AI, định giá SaaS, LTV, CAC, điểm hòa vốn, tỷ suất lợi nhuận, Google Ads, AdSense, tiếp thị liên kết, phí Amazon FBA, Etsy và eBay.",
      keywords: ["máy tính kinh doanh miễn phí", "máy tính giá theo giờ freelance", "máy tính tỷ suất lợi nhuận", "máy tính điểm hòa vốn", "máy tính doanh thu adsense"]
    },
    hero: {
      title: "Máy tính kinh doanh & Tiếp thị",
      subtitle: "Tính toán nhanh giá freelance, giá SaaS, LTV, CAC, ROI quảng cáo, AdSense, thu nhập tiếp thị liên kết và lợi nhuận sàn thương mại—18 công cụ miễn phí với công thức toán học chính xác, không phụ thuộc vào AI.",
      cta: "Mở máy tính giá Freelance"
    },
    grid: {
      title: "Tất cả máy tính",
      subtitle: "18 công cụ định giá, kinh tế đơn vị, ROI tiếp thị và biên lợi nhuận thương mại điện tử.",
      localizedBadge: "Đã dịch"
    },
    pickerTitle: "Chọn máy tính phù hợp",
    pickerSubtitle: "Kết hợp mục tiêu của bạn với điểm khởi đầu thích hợp trong bộ công cụ.",
    learning: {
      title: "Kiến thức định giá & ROI",
      subtitle: "Các khái niệm cốt lõi đằng sau bộ công cụ máy tính.",
      blogCta: "Đọc hướng dẫn blog về Máy tính",
      topics: [
        { title: "Tại sao tính toán chuẩn xác tốt hơn phỏng đoán", body: "Freelancer định giá thấp thường bỏ qua thuế, thời gian không tính phí và chi phí vận hành. Mức giá sàn rõ ràng sẽ bảo vệ dòng tiền của bạn." },
        { title: "LTV so với CAC", body: "Tăng trưởng lành mạnh đòi hỏi LTV cao hơn rõ rệt so với CAC. Hãy kết hợp cả hai máy tính trước khi mở rộng ngân sách quảng cáo." },
        { title: "Gánh nặng phí sàn thương mại", body: "Phí Amazon, Etsy và eBay cộng dồn với phí vận chuyển và quảng cáo. Hãy tính lợi nhuận ròng trên từng đơn vị trước khi mở rộng danh sách." },
        { title: "Dự toán chi phí API AI", body: "Giá token có vẻ nhỏ trên mỗi yêu cầu nhưng sẽ tăng nhanh theo khối lượng hàng ngày. Ước tính chi tiêu hàng tháng và hàng năm trước khi ra mắt." }
      ]
    },
    faqs: {
      title: "Câu hỏi thường gặp",
      subtitle: "Các câu hỏi phổ biến về bộ công cụ Máy tính.",
      items: [
        { q: "Bộ công cụ Máy tính trên Zetawala là gì?", a: "Đây là bộ 18 máy tính công thức chính xác miễn phí dành cho freelancer, nhà sáng lập SaaS, nhà tiếp thị và người bán hàng TMĐT. Mọi kết quả đều được tính trực tiếp trong trình duyệt—không gọi LLM." },
        { q: "Các máy tính này có sử dụng AI không?", a: "Không. Tất cả các phép tính đều chạy cục bộ từ dữ liệu bạn nhập." },
        { q: "Tôi nên bắt đầu với máy tính nào?", a: "Freelancer nên bắt đầu với máy tính Giá theo giờ hoặc Định giá dự án. Nhà sáng lập SaaS thường bắt đầu với Định giá SaaS, LTV và CAC." },
        { q: "Kết quả có đảm bảo chính xác tuyệt đối không?", a: "Đây là các ước tính minh bạch từ công thức kinh doanh chuẩn mực. Hãy luôn đối chiếu với tài khoản và thuế thực tế của bạn." }
      ]
    }
  },
  cs: {
    metadata: {
      title: "Bezplatné obchodní kalkulačky – Freelance, SaaS, Reklamy a E-commerce | Zetawala",
      description: "Bezplatné obchodní a marketingové kalkulačky: hodinové sazby na volné noze, náklady na AI API, ceny SaaS, LTV, CAC, bod zvratu, zisková marže, Google Ads, AdSense, affiliate a poplatky na tržištích.",
      keywords: ["bezplatné obchodní kalkulačky", "kalkulačka hodinové sazby freelance", "kalkulačka ziskové marže", "kalkulačka bodu zvratu", "kalkulačka příjmů adsense"]
    },
    hero: {
      title: "Obchodní a marketingové kalkulačky",
      subtitle: "Okamžité výpočty sazeb pro freelancery, tvorba cen SaaS, LTV, CAC, ROI reklam, AdSense a ziskovost na tržištích—18 bezplatných nástrojů s deterministickými vzorci bez závislosti na AI.",
      cta: "Otevřít kalkulačku hodinové sazby"
    },
    grid: {
      title: "Všechny kalkulačky",
      subtitle: "18 nástrojů pro oceňování, jednotkovou ekonomiku, návratnost investic a marže v e-commerce.",
      localizedBadge: "Přeloženo"
    },
    pickerTitle: "Vyberte si správnou kalkulačku",
    pickerSubtitle: "Najděte ideální výchozí bod podle svého aktuálního cíle.",
    learning: {
      title: "Vzdělávání v oblasti cenotvorby a ROI",
      subtitle: "Klíčové koncepty stojící za sadou kalkulaček.",
      blogCta: "Přečtěte si návody na blogu",
      topics: [
        { title: "Proč výpočet překonává odhady", body: "Freelanceři s nízkými sazbami často ignorují daně, neúčtovatelný čas a režijní výdaje. Jasná minimální hodinová sazba chrání vaše cash flow." },
        { title: "LTV versus CAC", body: "Zdravý růst vyžaduje, aby LTV výrazně převyšovala CAC. Před škálováním placené akvizice porovnejte obě kalkulačky." },
        { title: "Vliv poplatků na tržištích", body: "Poplatky na Amazonu, Etsy a eBay se sčítají s dopravou a reklamou. Namodelujte si čistý zisk na jednotku předem." },
        { title: "Rozpočtování AI API", body: "Ceny tokenů vypadají na požadavek zanedbatelně, ale rychle rostou s denním objemem. Odhadněte měsíční a roční výdaje před spuštěním." }
      ]
    },
    faqs: {
      title: "Často kladené otázky",
      subtitle: "Běžné dotazy k sadě kalkulaček.",
      items: [
        { q: "Co je sada kalkulaček na Zetawala?", a: "Je to sada 18 bezplatných deterministických kalkulaček pro freelancery, zakladatele SaaS, marketéry a e-shopy. Výsledky se počítají přímo v prohlížeči bez volání LLM." },
        { q: "Používají tyto kalkulačky AI?", a: "Ne. Veškeré výpočty probíhají lokálně z vašich zadaných údajů." },
        { q: "Kterou kalkulačkou mám začít?", a: "Freelanceři by měli začít kalkulačkou Hodinové sazby nebo Ocenění projektu. Zakladatelé SaaS obvykle začínají s Ceny SaaS, LTV a CAC." },
        { q: "Jsou výsledky garantovaně přesné?", a: "Jedná se o transparentní odhady podle standardních obchodních vzorců. Vždy ověřte specifické poplatky a daně ve svých účtech." }
      ]
    }
  },
  hu: {
    metadata: {
      title: "Ingyenes üzleti kalkulátorok – Szabadúszó, SaaS, Hirdetések és E-kereskedelem | Zetawala",
      description: "Ingyenes üzleti és marketing kalkulátorok: szabadúszó óradíjak, AI API költségek, SaaS árazás, LTV, CAC, fedezeti pont, haszonkulcs, Google Ads, AdSense, affiliate és piactéri díjak.",
      keywords: ["ingyenes üzleti kalkulátorok", "szabadúszó óradíj kalkulátor", "haszonkulcs kalkulátor", "fedezeti pont kalkulátor", "adsense bevétel kalkulátor"]
    },
    hero: {
      title: "Üzleti és marketing kalkulátorok",
      subtitle: "Azonnali szabadúszó díjak, SaaS árazás, LTV, CAC, hirdetési megtérülés, AdSense és piactéri profitmatematika—18 ingyenes eszköz determinisztikus képletekkel, AI függőség nélkül.",
      cta: "Szabadúszó óradíj kalkulátor"
    },
    grid: {
      title: "Minden kalkulátor",
      subtitle: "18 eszköz árazáshoz, egységgazdaságtanhoz, marketing ROI-hoz és e-kereskedelmi árrésekhez.",
      localizedBadge: "Lefordítva"
    },
    pickerTitle: "Válassza ki a megfelelő kalkulátort",
    pickerSubtitle: "Igazítsa célját a csomag megfelelő kiindulópontjához.",
    learning: {
      title: "Árazási és ROI ismeretek",
      subtitle: "A kalkulátor eszköztár mögött álló alapfogalmak.",
      blogCta: "Olvassa el a blog útmutatóit",
      topics: [
        { title: "Miért jobb a számítás a becslésnél", body: "Az alulárazó szabadúszók gyakran figyelmen kívül hagyják az adókat, a nem számlázható időt és a kiadásokat. Egy világos óradíjpadló védi a pénzáramlást." },
        { title: "LTV kontra CAC", body: "Az egészséges növekedéshez az LTV-nek jelentősen meg kell haladnia a CAC-ot. Használja mindkét kalkulátort a fizetett hirdetések növelése előtt." },
        { title: "Piactéri díjak hatása", body: "Az Amazon, Etsy és eBay díjak összeadódnak a szállítással és hirdetésekkel. Mindig modellezze az egységenkénti nettó profitot." },
        { title: "AI API költségvetés", body: "A tokenárak kérésenként csekélynek tűnnek, de a napi forgalommal gyorsan növekednek. Becsülje meg a havi és éves kiadásokat indulás előtt." }
      ]
    },
    faqs: {
      title: "Gyakran Ismételt Kérdések",
      subtitle: "Gyakori kérdések a kalkulátor csomagról.",
      items: [
        { q: "Mi az a Kalkulátor csomag a Zetawala-n?", a: "Ez 18 ingyenes, determinisztikus kalkulátorból álló csomag szabadúszóknak, SaaS alapítóknak, marketingszakembereknek és e-kereskedőknek. Minden eredmény böngészőben futó képletekből számítódik ki." },
        { q: "Használnak ezek a kalkulátorok AI-t?", a: "Nem. Minden matematikai számítás helyben fut az Ön által megadott adatokból." },
        { q: "Melyik kalkulátorral érdemes kezdeni?", a: "A szabadúszók az Óradíj vagy Projektárazás kalkulátorral kezdjenek. A SaaS alapítók gyakran a SaaS árazással, LTV-vel és CAC-cal indítanak." },
        { q: "Garantáltan pontosak az eredmények?", a: "Ezek szabványos üzleti képleteken alapuló átlátható becslések. Mindig egyeztesse a pontos díjakat saját fiókjaival." }
      ]
    }
  },
  ro: {
    metadata: {
      title: "Calculatoare de afaceri gratuite – Freelance, SaaS, Reclame & E-commerce | Zetawala",
      description: "Calculatoare gratuite de afaceri și marketing: tarife orare freelance, costuri API AI, prețuri SaaS, LTV, CAC, punct de echilibru, marjă de profit, Google Ads, AdSense, afiliere și taxe pe marketplace.",
      keywords: ["calculatoare de afaceri gratuite", "calculator tarif orar freelance", "calculator marjă de profit", "calculator punct de echilibru", "calculator venituri adsense"]
    },
    hero: {
      title: "Calculatoare de afaceri și marketing",
      subtitle: "Calcule rapide pentru tarife freelance, prețuri SaaS, LTV, CAC, rentabilitatea reclamelor, AdSense și profit pe marketplace—18 instrumente gratuite cu formule deterministe, fără AI.",
      cta: "Deschide calculatorul de tarif freelance"
    },
    grid: {
      title: "Toate calculatoarele",
      subtitle: "18 instrumente pentru stabilirea prețurilor, economie unitară, ROI și marje de e-commerce.",
      localizedBadge: "Tradus"
    },
    pickerTitle: "Alegeți calculatorul potrivit",
    pickerSubtitle: "Potriviți obiectivul dvs. cu instrumentul potrivit din suită.",
    learning: {
      title: "Învățare despre prețuri și rentabilitate",
      subtitle: "Concepte fundamentale din spatele trusei de calculatoare.",
      blogCta: "Citiți ghidurile de pe blog",
      topics: [
        { title: "De ce calculul depășește presupunerile", body: "Freelancerii care stabilesc prețuri prea mici ignoră adesea taxele, timpul nefacturabil și cheltuielile. Un prag minim clar pe oră protejează fluxul de numerar." },
        { title: "LTV vs CAC", body: "O creștere sănătoasă necesită ca LTV să fie substanțial mai mare decât CAC. Comparați ambele calculatoare înainte de a mări bugetul de reclame." },
        { title: "Impactul comisioanelor de marketplace", body: "Comisioanele Amazon, Etsy și eBay se cumulează cu livrarea și reclamele. Modelați profitul net pe unitate înainte de a lista produse." },
        { title: "Bugetarea API-urilor de AI", body: "Prețul tokenurilor pare mic per solicitare, dar crește rapid odată cu volumul zilnic. Estimați cheltuielile lunare și anuale înainte de lansare." }
      ]
    },
    faqs: {
      title: "Întrebări frecvente",
      subtitle: "Întrebări frecvente despre suita de Calculatoare.",
      items: [
        { q: "Ce este suita de Calculatoare pe Zetawala?", a: "Este o suită de 18 calculatoare deterministe gratuite pentru freelanceri, fondatori SaaS, specialiști în marketing și vânzători e-commerce. Toate rezultatele sunt calculate în browser." },
        { q: "Aceste calculatoare folosesc inteligență artificială?", a: "Nu. Toate calculele matematice rulează local pe baza datelor introduse de dvs." },
        { q: "Cu ce calculator ar trebui să încep?", a: "Freelancerii ar trebui să înceapă cu cel de Tarif Orar sau Preț Proiect. Fondatorii SaaS încep adesea cu Prețuri SaaS, LTV și CAC." },
        { q: "Sunt rezultatele garantat exacte?", a: "Sunt estimări transparente bazate pe formule standard de afaceri. Verificați întotdeauna taxele și comisioanele exacte din conturile dvs." }
      ]
    }
  },
  pt: {
    metadata: {
      title: "Calculadoras de Negócios Gratuitas – Freelance, SaaS, Anúncios & E-commerce | Zetawala",
      description: "Calculadoras gratuitas de negócios e marketing: tarifa por hora freelance, custo de API de IA, preços de SaaS, LTV, CAC, ponto de equilíbrio, margem de lucro, Google Ads, AdSense, afiliados e taxas de marketplaces.",
      keywords: ["calculadoras de negócios gratuitas", "calculadora de tarifa por hora freelance", "calculadora de margem de lucro", "calculadora de ponto de equilíbrio", "calculadora de receita do adsense"]
    },
    hero: {
      title: "Calculadoras de Negócios e Marketing",
      subtitle: "Cálculos instantâneos de tarifas freelance, precificação SaaS, LTV, CAC, ROI de anúncios, AdSense e lucro em marketplaces—18 ferramentas gratuitas com fórmulas determinísticas, sem depender de IA.",
      cta: "Abrir Calculadora de Tarifa Freelance"
    },
    grid: {
      title: "Todas as Calculadoras",
      subtitle: "18 ferramentas para precificação, economia unitária, ROI de marketing e margens de e-commerce.",
      localizedBadge: "Traduzido"
    },
    pickerTitle: "Escolha a Calculadora Certa",
    pickerSubtitle: "Alinhe seu objetivo com o ponto de partida ideal na suíte.",
    learning: {
      title: "Aprendizado sobre Preços e ROI",
      subtitle: "Conceitos centrais por trás do kit de ferramentas de calculadoras.",
      blogCta: "Leia os guias no blog",
      topics: [
        { title: "Por que calcular supera palpites", body: "Freelancers que cobram barato geralmente ignoram impostos, tempo não faturável e despesas. Um piso mínimo por hora protege seu fluxo de caixa." },
        { title: "LTV vs CAC", body: "Um crescimento saudável exige que o LTV seja significativamente superior ao CAC. Avalie ambas as métricas antes de escalar anúncios." },
        { title: "O peso das taxas de marketplaces", body: "As taxas do Mercado Livre, Amazon, Shopee e Etsy acumulam-se com frete e publicidade. Modele o lucro líquido por unidade antes de listar." },
        { title: "Orçamento de APIs de IA", body: "O custo por token parece pequeno por requisição, mas escala rapidamente com o volume diário. Estime os gastos mensais antes do lançamento." }
      ]
    },
    faqs: {
      title: "Perguntas Frequentes",
      subtitle: "Dúvidas comuns sobre a suíte de Calculadoras.",
      items: [
        { q: "O que é a suíte de Calculadoras na Zetawala?", a: "É uma suíte de 18 calculadoras determinísticas gratuitas para freelancers, fundadores de SaaS, profissionais de marketing e vendedores online. Todo resultado é calculado no navegador." },
        { q: "Essas calculadoras usam IA?", a: "Não. Todas as contas rodam localmente com base nos seus dados informados." },
        { q: "Por qual calculadora devo começar?", a: "Freelancers devem começar pela de Tarifa por Hora ou Preço de Projeto. Fundadores de SaaS costumam iniciar com Preços SaaS, LTV e CAC." },
        { q: "Os resultados são garantidamente exatos?", a: "São estimativas transparentes a partir de fórmulas comerciais padrão. Sempre confirme taxas, impostos e métricas nas suas contas." }
      ]
    }
  }
};

export async function generateCalculatorsHub() {
  for (const [locale, data] of Object.entries(CALCULATORS_HUB_DATA)) {
    const dir = path.join(root, 'src/locales', locale);
    await mkdir(dir, { recursive: true });
    await writeFile(path.join(dir, 'calculators-hub.json'), `${JSON.stringify(data, null, 2)}\n`, 'utf8');
    console.log(`Generated calculators-hub.json for ${locale}`);
  }
}

if (process.argv[1]?.endsWith('generate-calculators-hub.mjs')) {
  await generateCalculatorsHub();
}
