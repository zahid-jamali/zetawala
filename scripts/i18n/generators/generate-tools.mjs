import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();

const LOCALES = ['id', 'vi', 'cs', 'hu', 'ro', 'pt'];
const TOOLS = [
  'profit-margin',
  'break-even',
  'freelance-hourly-rate',
  'salary-to-hourly',
  'customer-ltv',
  'adsense-revenue'
];

const TOOL_NAMES = {
  'profit-margin': {
    id: { name: "Kalkulator Margin Laba", desc: "Laba kotor, margin % dan markup dari biaya & harga" },
    vi: { name: "Máy tính tỷ suất lợi nhuận", desc: "Lợi nhuận gộp, tỷ suất % và markup từ chi phí & giá bán" },
    cs: { name: "Kalkulačka ziskové marže", desc: "Hrubý zisk, marže v % a přirážka z nákladů a prodejní ceny" },
    hu: { name: "Haszonkulcs kalkulátor", desc: "Bruttó nyereség, árrés % és haszonkulcs költségből és árból" },
    ro: { name: "Calculator marjă de profit", desc: "Profit brut, marjă % și adaos comercial din cost și preț" },
    pt: { name: "Calculadora de margem de lucro", desc: "Lucro bruto, margem % e markup a partir de custo e preço" }
  },
  'break-even': {
    id: { name: "Kalkulator Titik Impas", desc: "Hitung unit dan pendapatan impas untuk produk apa pun" },
    vi: { name: "Máy tính điểm hòa vốn", desc: "Tìm số lượng và doanh thu hòa vốn cho bất kỳ sản phẩm nào" },
    cs: { name: "Kalkulačka bodu zvratu", desc: "Zjistěte počet kusů a tržby pro dosažení bodu zvratu" },
    hu: { name: "Fedezeti pont kalkulátor", desc: "Fedezeti darabszám és árbevétel kiszámítása bármilyen termékhez" },
    ro: { name: "Calculator punct de echilibru", desc: "Află unitățile și veniturile de echilibru pentru orice produs" },
    pt: { name: "Calculadora de ponto de equilíbrio", desc: "Encontre unidades e receita de equilíbrio para qualquer produto" }
  },
  'freelance-hourly-rate': {
    id: { name: "Kalkulator Tarif per Jam Freelance", desc: "Tentukan tarif minimum, rekomendasi & premium dari target pendapatan" },
    vi: { name: "Máy tính giá theo giờ Freelance", desc: "Thiết lập mức giá tối thiểu, đề xuất & cao cấp từ mục tiêu thu nhập" },
    cs: { name: "Kalkulačka hodinové sazby na volné noze", desc: "Nastavte minimální, doporučenou a prémiovou hodinovou sazbu z příjmových cílů" },
    hu: { name: "Szabadúszó óradíj kalkulátor", desc: "Minimum, ajánlott és prémium óradíjak beállítása bevételi célokból" },
    ro: { name: "Calculator tarif orar freelance", desc: "Setează tarife minime, recomandate și premium pe baza obiectivelor de venit" },
    pt: { name: "Calculadora de tarifa por hora freelance", desc: "Defina tarifas mínimas, recomendadas e premium a partir de metas de renda" }
  },
  'salary-to-hourly': {
    id: { name: "Kalkulator Gaji ke Tarif per Jam", desc: "Konversi gaji tahunan atau bulanan ke tarif per jam" },
    vi: { name: "Máy tính chuyển lương sang giá giờ", desc: "Chuyển đổi lương hàng năm hoặc hàng tháng sang giá theo giờ" },
    cs: { name: "Kalkulačka převodu platu na hodinovou mzdu", desc: "Přepočítejte roční nebo měsíční plat na hodinovou sazbu" },
    hu: { name: "Fizetés-óradíj kalkulátor", desc: "Éves vagy havi fizetés átváltása óradíjra" },
    ro: { name: "Calculator salariu în tarif orar", desc: "Convertește salariul anual sau lunar în tarif orar" },
    pt: { name: "Calculadora salário para valor hora", desc: "Converta salário anual ou mensal em valor por hora" }
  },
  'customer-ltv': {
    id: { name: "Kalkulator Customer Lifetime Value (LTV)", desc: "Hitung LTV dari nilai pesanan, frekuensi & masa pakai" },
    vi: { name: "Máy tính giá trị vòng đời khách hàng (LTV)", desc: "Tính LTV từ giá trị đơn hàng, tần suất & thời gian gắn bó" },
    cs: { name: "Kalkulačka celoživotní hodnoty zákazníka (LTV)", desc: "Vypočítejte LTV z hodnoty objednávky, frekvence a doby trvání" },
    hu: { name: "Ügyfél élettartam érték (LTV) kalkulátor", desc: "LTV számítása rendelési értékből, gyakoriságból és élettartamból" },
    ro: { name: "Calculator valoare de viață client (LTV)", desc: "Calculează LTV din valoarea comenzii, frecvență și durata de viață" },
    pt: { name: "Calculadora de valor do tempo de vida do cliente (LTV)", desc: "Calcule o LTV a partir do valor do pedido, frequência e vida útil" }
  },
  'adsense-revenue': {
    id: { name: "Kalkulator Pendapatan AdSense", desc: "Perkirakan penghasilan AdSense dari tayangan halaman & RPM" },
    vi: { name: "Máy tính doanh thu AdSense", desc: "Ước tính thu nhập AdSense từ lượt xem trang & RPM" },
    cs: { name: "Kalkulačka příjmů AdSense", desc: "Odhadněte výdělky AdSense ze zobrazení stránek a RPM" },
    hu: { name: "AdSense bevétel kalkulátor", desc: "AdSense bevételek becslése oldalletöltésekből és RPM-ből" },
    ro: { name: "Calculator venituri AdSense", desc: "Estimează câștigurile AdSense din afișări de pagină și RPM" },
    pt: { name: "Calculadora de receita do AdSense", desc: "Estime os ganhos do AdSense a partir de visualizações de página e RPM" }
  }
};

export async function generateTools() {
  for (const slug of TOOLS) {
    const enTool = JSON.parse(await readFile(path.join(root, 'src/locales/en/tools', `${slug}.json`), 'utf8'));

    for (const locale of LOCALES) {
      const meta = TOOL_NAMES[slug]?.[locale] || { name: enTool.name, desc: enTool.desc };
      const localized = {
        ...enTool,
        name: meta.name,
        desc: meta.desc,
        metadata: {
          ...enTool.metadata,
          title: `${meta.name} | Zetawala`,
          description: meta.desc
        },
        seo: {
          ...enTool.seo,
          title: meta.name,
          description: meta.desc
        }
      };

      const outDir = path.join(root, 'src/locales', locale, 'tools');
      await mkdir(outDir, { recursive: true });
      await writeFile(path.join(outDir, `${slug}.json`), `${JSON.stringify(localized, null, 2)}\n`, 'utf8');
    }
  }
  console.log(`Generated calculator tools for ${LOCALES.join(', ')}`);
}

if (process.argv[1]?.endsWith('generate-tools.mjs')) {
  await generateTools();
}
