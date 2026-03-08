export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  image: string;
  availability: string[];
  price: number;
  phone: string;
}

export const BANK_DETAILS = {
  bankName: "بنك الخرطوم",
  accountNumber: "4046346",
  accountName: "السني خالد محمدأحمد السني",
  paymentPhone: "+249111729111",
  qrCodeUrl: "https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=4046346"
};

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
}

export interface MedicalTest {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: string;
  image: string;
}

export const doctors: Doctor[] = [
  {
    id: "1",
    name: "د. عثمان أحمد محمد عثمان",
    specialty: "طبيب عمومي",
    rating: 4.9,
    image: "https://pollinations.ai/p/professional-male-doctor-smiling-wearing-white-coat-and-stethoscope-medical-office-background-8k?width=400&height=400&seed=201",
    availability: ["يومياً"],
    price: 3000,
    phone: "+249121143746"
  },
  {
    id: "2",
    name: "د. السني خالد محمد أحمد السني",
    specialty: "إخصائي أول أمراض الدم وبنك الدم والمناعة",
    rating: 5.0,
    image: "https://pollinations.ai/p/professional-male-medical-specialist-hematologist-in-laboratory-setting-microscope-background-8k?width=400&height=400&seed=202",
    availability: ["يومياً"],
    price: 0,
    phone: "+249111729111"
  }
];

export const products: Product[] = [
  { id: "M001", name: "Artesunate 120", category: "أدوية", price: 9000, image: "https://pollinations.ai/p/professional-medical-box-packaging-of-Artesunate-120mg-malaria-medicine-clean-white-background-studio-lighting-8k?width=400&height=400&seed=1", description: "علاج للملاريا الشديدة." },
  { id: "M002", name: "Artesunate 60", category: "أدوية", price: 9000, image: "https://pollinations.ai/p/professional-medical-box-packaging-of-Artesunate-60mg-malaria-medicine-clean-white-background-studio-lighting-8k?width=400&height=400&seed=2", description: "علاج للملاريا الشديدة." },
  { id: "M003", name: "zomax 500", category: "مضادات حيوية", price: 5000, image: "https://pollinations.ai/p/medical-pill-bottle-zomax-500mg-antibiotics-professional-pharmaceutical-photography-white-background?width=400&height=400&seed=3", description: "مضاد حيوي واسع الطيف." },
  { id: "M004", name: "amoxil caps 500g", category: "مضادات حيوية", price: 5000, image: "https://pollinations.ai/p/medical-capsules-amoxil-500mg-antibiotics-blister-pack-professional-pharmaceutical-photography?width=400&height=400&seed=4", description: "كبسولات أموكسيل 500 مجم." },
  { id: "M005", name: "zomax syp 200mg", category: "مضادات حيوية", price: 5000, image: "https://pollinations.ai/p/medical-syrup-bottle-zomax-200mg-for-children-antibiotics-professional-pharmaceutical-photography?width=400&height=400&seed=5", description: "شراب زوماكس للأطفال." },
  { id: "M006", name: "Amoxil 250 sup", category: "مضادات حيوية", price: 5000, image: "https://pollinations.ai/p/medical-suspension-syrup-amoxil-250mg-antibiotics-professional-pharmaceutical-photography?width=400&height=400&seed=6", description: "أموكسيل شراب معلق." },
  { id: "M007", name: "B complex tabs", category: "فيتامينات", price: 3000, image: "https://pollinations.ai/p/vitamin-b-complex-tablets-bottle-nutritional-supplements-professional-pharmaceutical-photography?width=400&height=400&seed=7", description: "مجموعة فيتامينات ب." },
  { id: "M008", name: "Folic acid", category: "فيتامينات", price: 2000, image: "https://pollinations.ai/p/folic-acid-tablets-bottle-nutritional-supplements-professional-pharmaceutical-photography?width=400&height=400&seed=8", description: "حمض الفوليك." },
  { id: "M009", name: "Fe-feul vatimin", category: "فيتامينات", price: 3000, image: "https://pollinations.ai/p/iron-and-vitamin-supplements-bottle-professional-pharmaceutical-photography?width=400&height=400&seed=9", description: "مكمل حديد وفيتامينات." },
  { id: "M010", name: "Coartum 80/480 mg", category: "أدوية", price: 4000, image: "https://pollinations.ai/p/medical-box-packaging-Coartum-malaria-medicine-professional-pharmaceutical-photography?width=400&height=400&seed=10", description: "علاج للملاريا." },
  { id: "M011", name: "Cefixime 400 mg", category: "مضادات حيوية", price: 5000, image: "https://pollinations.ai/p/medical-pills-Cefixime-400mg-antibiotics-professional-pharmaceutical-photography?width=400&height=400&seed=11", description: "سيفيكسيم 400 مجم." },
  { id: "M012", name: "Cefixime 200 mg", category: "مضادات حيوية", price: 5000, image: "https://pollinations.ai/p/medical-pills-Cefixime-200mg-antibiotics-professional-pharmaceutical-photography?width=400&height=400&seed=12", description: "سيفيكسيم 200 مجم." },
  { id: "M013", name: "Canula size 22", category: "مستلزمات", price: 1000, image: "https://pollinations.ai/p/medical-intravenous-cannula-size-22-blue-professional-medical-equipment-photography?width=400&height=400&seed=13", description: "كانولا مقاس 22." },
  { id: "M014", name: "Canula size 24", category: "مستلزمات", price: 1000, image: "https://pollinations.ai/p/medical-intravenous-cannula-size-24-yellow-professional-medical-equipment-photography?width=400&height=400&seed=14", description: "كانولا مقاس 24." },
  { id: "M015", name: "crepe bandage", category: "مستلزمات", price: 1500, image: "https://pollinations.ai/p/medical-crepe-bandage-roll-first-aid-supplies-professional-medical-photography?width=400&height=400&seed=15", description: "رباط ضاغط." },
  { id: "M016", name: "cipro 500 mg tabs", category: "مضادات حيوية", price: 5000, image: "https://pollinations.ai/p/medical-pills-ciprofloxacin-500mg-antibiotics-professional-pharmaceutical-photography?width=400&height=400&seed=16", description: "سيبرو 500 مجم." },
  { id: "M017", name: "votrex 50 K", category: "مسكنات", price: 1500, image: "https://pollinations.ai/p/medical-pills-votrex-painkiller-professional-pharmaceutical-photography?width=400&height=400&seed=17", description: "مسكن آلام." },
  { id: "M018", name: "LEVO 500 mg", category: "مضادات حيوية", price: 6000, image: "https://pollinations.ai/p/medical-pills-levofloxacin-500mg-antibiotics-professional-pharmaceutical-photography?width=400&height=400&seed=18", description: "ليفوفلوكساسين 500 مجم." },
  { id: "M019", name: "flagyl tabs 500 mg", category: "أدوية", price: 5000, image: "https://pollinations.ai/p/medical-pills-flagyl-metronidazole-500mg-professional-pharmaceutical-photography?width=400&height=400&seed=19", description: "فلاجيل 500 مجم." },
  { id: "M020", name: "Normal Saline drip 500 mg", category: "محاليل", price: 5000, image: "https://pollinations.ai/p/medical-intravenous-saline-drip-bag-500ml-professional-medical-photography?width=400&height=400&seed=20", description: "محلول ملحي 500 مل." },
  { id: "M021", name: "oprazole caps", category: "أدوية", price: 5000, image: "https://pollinations.ai/p/medical-capsules-omeprazole-gastric-medicine-professional-pharmaceutical-photography?width=400&height=400&seed=21", description: "علاج لحموضة المعدة." },
  { id: "M022", name: "Pantodac 40 g tabs", category: "أدوية", price: 5000, image: "https://pollinations.ai/p/medical-pills-pantoprazole-40mg-professional-pharmaceutical-photography?width=400&height=400&seed=22", description: "بانتوداك 40 مجم." },
  { id: "M023", name: "Panadol drip", category: "مسكنات", price: 5000, image: "https://pollinations.ai/p/medical-intravenous-paracetamol-drip-bag-professional-medical-photography?width=400&height=400&seed=23", description: "محلول بنادول وريدي." },
  { id: "M024", name: "Panadol sup", category: "مسكنات", price: 4000, image: "https://pollinations.ai/p/medical-suspension-syrup-panadol-for-children-professional-pharmaceutical-photography?width=400&height=400&seed=24", description: "بنادول شراب معلق." },
  { id: "M025", name: "Panadol tabs", category: "مسكنات", price: 2000, image: "https://pollinations.ai/p/medical-pills-panadol-paracetamol-tablets-professional-pharmaceutical-photography?width=400&height=400&seed=25", description: "أقراص بنادول." },
  { id: "M026", name: "pot cit", category: "أدوية", price: 0.5, image: "https://pollinations.ai/p/medical-syrup-bottle-potassium-citrate-professional-pharmaceutical-photography?width=400&height=400&seed=26", description: "بوتاسيوم ستريت." },
  { id: "M027", name: "RINGER Drip", category: "محاليل", price: 5000, image: "https://pollinations.ai/p/medical-intravenous-ringer-lactate-drip-bag-professional-medical-photography?width=400&height=400&seed=27", description: "محلول رينجر." },
  { id: "M028", name: "ASPRIN 75 mg", category: "أدوية", price: 1500, image: "https://pollinations.ai/p/medical-pills-aspirin-75mg-tablets-professional-pharmaceutical-photography?width=400&height=400&seed=28", description: "أسبرين 75 مجم." },
  { id: "M029", name: "sterile Gauze", category: "مستلزمات", price: 1000, image: "https://pollinations.ai/p/medical-sterile-gauze-pads-packaging-professional-medical-supplies-photography?width=400&height=400&seed=29", description: "شاش معقم." },
  { id: "M030", name: "ceftriaxone 1g", category: "مضادات حيوية", price: 5000, image: "https://pollinations.ai/p/medical-vial-ceftriaxone-1g-injection-antibiotics-professional-pharmaceutical-photography?width=400&height=400&seed=30", description: "سفترياكسون 1 جرام." },
  { id: "M031", name: "unicuf syp", category: "أدوية", price: 6000, image: "https://pollinations.ai/p/medical-cough-syrup-bottle-professional-pharmaceutical-photography?width=400&height=400&seed=31", description: "شراب للسعال." }
];

export const medicalTests: MedicalTest[] = [
  { id: "T001", name: "فحص الملاريا", description: "فحص الكشف عن طفيل الملاريا في الدم.", price: 3000, duration: "ساعة واحدة", image: "https://pollinations.ai/p/microscopic-view-of-malaria-parasites-in-blood-cells-medical-laboratory-photography-8k?width=400&height=400&seed=101" },
  { id: "T002", name: "فحص الدم الأبيض", description: "قياس عدد خلايا الدم البيضاء للكشف عن الالتهابات.", price: 3000, duration: "ساعة واحدة", image: "https://pollinations.ai/p/microscopic-view-of-white-blood-cells-leukocytes-medical-laboratory-photography-8k?width=400&height=400&seed=102" },
  { id: "T003", name: "قياس نسبة الدم (الهيموجلوبين)", description: "فحص مستوى الهيموجلوبين للكشف عن فقر الدم.", price: 3000, duration: "ساعة واحدة", image: "https://pollinations.ai/p/blood-sample-in-test-tube-medical-laboratory-hematology-photography-8k?width=400&height=400&seed=103" },
  { id: "T004", name: "فحص الرطوبة", description: "فحص الروماتيزم (ASO/RF).", price: 4000, duration: "ساعتان", image: "https://pollinations.ai/p/medical-test-for-rheumatism-laboratory-equipment-professional-photography-8k?width=400&height=400&seed=104" },
  { id: "T005", name: "فحص التايفويد", description: "فحص الكشف عن حمى التايفويد (Widal Test).", price: 5000, duration: "ساعتان", image: "https://pollinations.ai/p/salmonella-typhi-bacteria-microscopic-view-medical-laboratory-photography-8k?width=400&height=400&seed=105" },
  { id: "T006", name: "فحص الحمى المالطية", description: "فحص الكشف عن البروسيلا.", price: 5000, duration: "ساعتان", image: "https://pollinations.ai/p/brucella-bacteria-microscopic-view-medical-laboratory-photography-8k?width=400&height=400&seed=106" },
  { id: "T007", name: "فحص البول", description: "تحليل البول الكامل للكشف عن الأملاح والالتهابات.", price: 3000, duration: "ساعة واحدة", image: "https://pollinations.ai/p/urine-sample-container-medical-laboratory-analysis-photography-8k?width=400&height=400&seed=107" },
  { id: "T008", name: "فحص البراز", description: "تحليل البراز للكشف عن الطفيليات والديدان.", price: 4000, duration: "ساعة واحدة", image: "https://pollinations.ai/p/stool-sample-container-medical-laboratory-analysis-photography-8k?width=400&height=400&seed=108" },
  { id: "T009", name: "فحص الضنك", description: "فحص الكشف عن حمى الضنك.", price: 15000, duration: "4 ساعات", image: "https://pollinations.ai/p/dengue-virus-microscopic-view-medical-laboratory-photography-8k?width=400&height=400&seed=109" },
  { id: "T010", name: "فحص قياس السكر في الدم", description: "قياس مستوى الجلوكوز في الدم (صائم/عشوائي).", price: 5000, duration: "30 دقيقة", image: "https://pollinations.ai/p/blood-glucose-meter-testing-blood-sugar-level-medical-photography-8k?width=400&height=400&seed=110" },
  { id: "T011", name: "فحص وظائف الكُلى", description: "فحص اليوريا والكرياتينين لتقييم صحة الكلى.", price: 10000, duration: "24 ساعة", image: "https://pollinations.ai/p/human-kidney-medical-illustration-health-concept-8k?width=400&height=400&seed=111" },
  { id: "T012", name: "فحص النقرص (القاوود)", description: "قياس مستوى حمض اليوريك (Uric Acid).", price: 7000, duration: "ساعتان", image: "https://pollinations.ai/p/uric-acid-crystals-microscopic-view-gout-medical-photography-8k?width=400&height=400&seed=112" },
  { id: "T013", name: "فحص الفصيلة", description: "تحديد فصيلة الدم ونوع العامل الريزيسي.", price: 4000, duration: "30 دقيقة", image: "https://pollinations.ai/p/blood-typing-test-laboratory-slide-medical-photography-8k?width=400&height=400&seed=113" },
  { id: "T014", name: "فحص السكر التراكمي", description: "قياس معدل السكر في الدم خلال الـ 3 أشهر الماضية (HbA1c).", price: 10000, duration: "24 ساعة", image: "https://pollinations.ai/p/hba1c-blood-test-result-medical-laboratory-photography-8k?width=400&height=400&seed=114" },
  { id: "T015", name: "فحص الغدة الدرقية", description: "فحص هرمونات الغدة الدرقية (T3, T4, TSH).", price: 30000, duration: "48 ساعة", image: "https://pollinations.ai/p/thyroid-gland-medical-illustration-endocrinology-concept-8k?width=400&height=400&seed=115" },
  { id: "T016", name: "فحص فيروس الكبد الوبائي - ب", description: "فحص الكشف عن فيروس الكبد الوبائي فئة ب.", price: 20000, duration: "24 ساعة", image: "https://pollinations.ai/p/hepatitis-b-virus-microscopic-view-medical-laboratory-photography-8k?width=400&height=400&seed=116" },
  { id: "T017", name: "فحص فيروس المناعة المكتسبة (الإيدز)", description: "فحص الكشف عن فيروس HIV.", price: 20000, duration: "24 ساعة", image: "https://pollinations.ai/p/hiv-virus-microscopic-view-medical-laboratory-photography-8k?width=400&height=400&seed=117" },
  { id: "T018", name: "فحص الزُهري", description: "فحص الكشف عن مرض الزهري (VDRL).", price: 20000, duration: "24 ساعة", image: "https://pollinations.ai/p/syphilis-bacteria-treponema-pallidum-microscopic-view-medical-photography-8k?width=400&height=400&seed=118" },
  { id: "T019", name: "فحص السيلان", description: "فحص الكشف عن بكتيريا السيلان.", price: 20000, duration: "24 ساعة", image: "https://pollinations.ai/p/gonorrhea-bacteria-neisseria-gonorrhoeae-microscopic-view-medical-photography-8k?width=400&height=400&seed=119" },
  { id: "T020", name: "قياس أملاح الصوديوم والبوتاسيوم", description: "فحص توازن الأملاح في الجسم (Electrolytes).", price: 20000, duration: "24 ساعة", image: "https://pollinations.ai/p/electrolytes-balance-medical-concept-laboratory-test-8k?width=400&height=400&seed=120" },
  { id: "T021", name: "فحص وظائف الكبد", description: "مجموعة فحوصات لتقييم كفاءة الكبد.", price: 30000, duration: "24 ساعة", image: "https://pollinations.ai/p/human-liver-medical-illustration-hepatology-concept-8k?width=400&height=400&seed=121" }
];
