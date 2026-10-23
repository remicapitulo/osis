export interface ModalReferenceItem {
  id: string;
  category: 'quran' | 'hadits' | 'prinsip' | 'karakter' | 'referensi' | 'panduan' | 'faq' | 'tokoh' | 'kisah';
  badge: string;
  title: string;
  subtitle: string;
  arabic?: string;
  latin?: string;
  translation?: string;
  reflectionTitle: string;
  reflectionPoints: string[];
  actionableTakeaway: string;
  faqItems?: {
    question: string;
    answer: string;
    practicalTip: string;
  }[];
}

export interface StimulusScene {
  id: number;
  durationSec: number;
  eraBadge: string;
  title: string;
  narration: string;
  quote: string;
  keyTrait: string;
  visualTheme: 'candle' | 'ships' | 'jerusalem' | 'scholars' | 'reflection';
}

export const STIMULUS_VIDEO_SCENES: StimulusScene[] = [
  {
    id: 1,
    durationSec: 12,
    eraBadge: 'Babak 1 · Damaskus, 99 Hijriah (717 M)',
    title: 'Sehelai Cahaya Lilin di Ruang Khalifah Umar bin Abdul Aziz',
    narration:
      'Malam itu larut di istana Damaskus. Khalifah Umar bin Abdul Aziz sedang memeriksa pembukuan negara di bawah cahaya lampu minyak milik Baitul Mal. Tiba-tiba seorang tamu masuk dan hendak menanyakan kabar pribadi keluarganya.',
    quote:
      '“Tunggu sebentar, izinkan aku mematikan lampu ini dulu. Minyak lampu ini dibeli dari uang rakyat; haram bagiku menggunakannya untuk mengobrolkan urusan pribadiku.”',
    keyTrait: 'Shiddiq & Amanah Mutlak',
    visualTheme: 'candle',
  },
  {
    id: 2,
    durationSec: 14,
    eraBadge: 'Babak 2 · Konstantinopel, 857 Hijriah (1453 M)',
    title: 'Visi & Kecerdasan Pemuda 21 Tahun: Sultan Muhammad Al-Fatih',
    narration:
      'Di usia 21 tahun—sebaya pemuda yang baru lulus sekolah—Muhammad Al-Fatih memimpin pasukan besar menghadapi benteng terkuat dunia dan rantai raksasa di Tanduk Emas. Saat jalan laut tertutup, ia tidak menyerah atau menyalahkan pasukannya.',
    quote:
      'Dalam satu malam, dengan perhitungan sains, rekayasa kayu berlumur minyak, dan kerja keras kolektif, 70 kapal diseberangkan melintasi bukit Galata!',
    keyTrait: 'Fathanah (Cerdas, Solutif & Visioner)',
    visualTheme: 'ships',
  },
  {
    id: 3,
    durationSec: 12,
    eraBadge: 'Babak 3 · Rahasia di Balik Keberhasilan Al-Fatih',
    title: 'Disiplin Spiritual & Ilmu Pengetahuan Sejak Remaja',
    narration:
      'Kemampuan Al-Fatih memimpin bukan muncul tiba-tiba. Sejak remaja ia menguasai 6 bahasa, matematika, astronomi, sekaligus tidak pernah meninggalkan shalat tahajud dan menghormati gurunya, Syaikh Aqsyamsuddin.',
    quote:
      '“Sebaik-baik pemimpin adalah pemimpinnya, dan sebaik-baik pasukan adalah pasukannya.” — Sabda Nabi SAW yang memotivasi Al-Fatih sejak kecil.',
    keyTrait: 'Fondasi Percaya Diri & Iman',
    visualTheme: 'scholars',
  },
  {
    id: 4,
    durationSec: 12,
    eraBadge: 'Babak 4 · Yerusalem, 583 Hijriah (1187 M)',
    title: 'Kemuliaan Akhlak Shalahuddin Al-Ayyubi yang Menaklukkan Hati',
    narration:
      'Ketika Shalahuddin Al-Ayyubi berhasil membebaskan Yerusalem, ia tidak membalas dendam sedikit pun. Ia menjamin keselamatan warga sipil, membebaskan yang tak mampu membayar tebusan, bahkan mengirimkan tabib dan buah-buahan saat panglima lawannya, Raja Richard, jatuh sakit.',
    quote:
      'Kekuasaan tertinggi seorang pemimpin bukan terletak pada kerasnya suara, melainkan pada keluhuran akhlak yang memuliakan manusia.',
    keyTrait: 'Tabligh & Uswah Hasanah',
    visualTheme: 'jerusalem',
  },
  {
    id: 5,
    durationSec: 10,
    eraBadge: 'Babak 5 · Refleksi Untuk Pengurus OSIS Hari Ini',
    title: 'Kini Estafet Kepemimpinan Itu Ada di Pundak Kalian!',
    narration:
      'Jika Umar bin Abdul Aziz menjaga sebatang lilin negara, bagaimana kita menjaga kas dan inventaris OSIS? Jika Al-Fatih memimpin perubahan di usia muda dengan ilmu dan adab, siapakah yang akan membawa kebaikan di sekolah kita hari ini?',
    quote:
      '“Setiap kalian adalah pemimpin, dan setiap kalian akan dimintai pertanggungjawaban atas kepemimpinannya.” (HR. Bukhari & Muslim)',
    keyTrait: 'Saatnya Menjadi Khalifah Panutan',
    visualTheme: 'reflection',
  },
];

export interface LeaderRoleModel {
  id: string;
  traitKey: 'shiddiq' | 'amanah' | 'fathanah' | 'tabligh';
  traitLabel: string;
  scope: 'Tokoh Dunia / Kejayaan Islam' | 'Tokoh Bangsa Indonesia';
  name: string;
  eraOrRole: string;
  headline: string;
  storySummary: string;
  osisApplication: string;
  modalId: string;
}

export const LEADER_ROLE_MODELS: LeaderRoleModel[] = [
  {
    id: 'umar-abdul-aziz',
    traitKey: 'shiddiq',
    traitLabel: 'Shiddiq (Jujur & Berintegritas)',
    scope: 'Tokoh Dunia / Kejayaan Islam',
    name: 'Khalifah Umar bin Abdul Aziz',
    eraOrRole: 'Khalifah Bani Umayyah (717–720 M)',
    headline: 'Mematikan lampu minyak negara saat berbicara urusan keluarga pribadi.',
    storySummary:
      'Menolak segala fasilitas mewah istana, menyerahkan seluruh harta pribadinya ke Baitul Mal, dan dalam waktu 2,5 tahun berhasil menghapus kemiskinan hingga sulit mencari penerima zakat.',
    osisApplication:
      'Jujur 100% dalam laporan kas OSIS/kepanitiaan dan tidak memakai fasilitas organisasi untuk kepentingan pribadi.',
    modalId: 'tokoh-umar-abdul-aziz',
  },
  {
    id: 'bung-hatta-hoegeng',
    traitKey: 'shiddiq',
    traitLabel: 'Shiddiq (Jujur & Berintegritas)',
    scope: 'Tokoh Bangsa Indonesia',
    name: 'Mohammad Hatta & Jenderal Hoegeng',
    eraOrRole: 'Wakil Presiden Pertama RI & Kapolri ke-5 RI',
    headline: 'Teladan kejujuran tanpa kompromi dalam sejarah Republik Indonesia.',
    storySummary:
      'Bung Hatta mengembalikan sisa dana perjalanan dinas hingga rupiah terakhir dan tidak pernah menyalahgunakan jabatan. Jenderal Hoegeng menutup toko bunga istrinya agar pengusaha yang berurusan dengan kepolisian tidak membeli di sana demi menjauhi suap terselubung.',
    osisApplication:
      'Menolak kompromi kecurangan, transparan dalam pemilihan vendor kaos/konsumsi acara, dan bersih dari nepotisme.',
    modalId: 'tokoh-hatta-hoegeng',
  },
  {
    id: 'shalahuddin-mandela',
    traitKey: 'amanah',
    traitLabel: 'Amanah (Dapat Dipercaya)',
    scope: 'Tokoh Dunia / Kejayaan Islam',
    name: 'Shalahuddin Al-Ayyubi',
    eraOrRole: 'Sultan Mesir & Syam, Pembebas Al-Quds (1137–1193 M)',
    headline: 'Menepati setiap janji perdamaian dan menjaga amanah harta umat hingga wafat.',
    storySummary:
      'Meski memimpin wilayah kekuasaan yang sangat luas dan kaya raya, saat wafat harta pribadinya hanya tersisa 1 dinar emas dan 47 dirham perak karena seluruh kekayaannya diamanahkan untuk sekolah, rumah sakit, dan rakyat.',
    osisApplication:
      'Menjaga kepercayaan pembina dan siswa, menepati janji program kerja, dan merawat inventaris sekolah dengan penuh tanggung jawab.',
    modalId: 'tokoh-shalahuddin',
  },
  {
    id: 'jenderal-sudirman-hb9',
    traitKey: 'amanah',
    traitLabel: 'Amanah (Dapat Dipercaya)',
    scope: 'Tokoh Bangsa Indonesia',
    name: 'Jenderal Sudirman & Sri Sultan HB IX',
    eraOrRole: 'Panglima Besar TNI (Usia 29 Tahun) & Pahlawan Nasional',
    headline: 'Menjaga amanah kemerdekaan di tengah sakit parah dan keterbatasan.',
    storySummary:
      'Jenderal Sudirman yang merupakan mantan guru dan aktivis pemuda Muhammadiyah dilantik menjadi Panglima Besar di usia 29 tahun. Saat paru-parunya hanya berfungsi satu, beliau tetap menunaikan amanah memimpin gerilya dari atas tandu sejauh 1.000 km.',
    osisApplication:
      'Tidak mudah menyerah atau meninggalkan tugas kepanitiaan saat lelah; menuntaskan tanggung jawab hingga acara benar-benar selesai.',
    modalId: 'tokoh-sudirman',
  },
  {
    id: 'muhammad-alfatih',
    traitKey: 'fathanah',
    traitLabel: 'Fathanah (Cerdas & Solutif)',
    scope: 'Tokoh Dunia / Kejayaan Islam',
    name: 'Sultan Muhammad Al-Fatih',
    eraOrRole: 'Pemimpin Muda Usia 21 Tahun (1432–1481 M)',
    headline: 'Memadukan ketakwaan, penguasaan 6 bahasa, dan rekayasa teknologi strategi.',
    storySummary:
      'Menghadapi rantai besi yang menutup Teluk Tanduk Emas, Al-Fatih melahirkan solusi out-of-the-box: membangun jalur kayu berpelumas lemak di atas bukit untuk menyeberangkan 70 kapal dalam semalam.',
    osisApplication:
      'Berpikir kreatif dan solutif (Plan B) saat menghadapi hambatan acara di sekolah tanpa panik atau menyalahkan keadaan.',
    modalId: 'tokoh-alfatih',
  },
  {
    id: 'bj-habibie',
    traitKey: 'fathanah',
    traitLabel: 'Fathanah (Cerdas & Solutif)',
    scope: 'Tokoh Bangsa Indonesia',
    name: 'Prof. Dr. Ing. B.J. Habibie',
    eraOrRole: 'Presiden ke-3 RI & Bapak Teknologi Dirgantara',
    headline: 'Harmoni Imtak (Iman & Takwa) serta Iptek (Ilmu Pengetahuan & Teknologi).',
    storySummary:
      'Penemu Teori Crack Progression dalam dunia penerbangan global yang selalu berpuasa Senin-Kamis dan membaca Al-Qur’an. Saat memimpin Indonesia di tengah krisis 1998, beliau menurunkan kurs dolar dari Rp16.000 ke Rp6.500 dengan kebijakan teknokratis yang cerdas.',
    osisApplication:
      'Membuktikan bahwa pengurus OSIS yang aktif berorganisasi juga mampu unggul dalam prestasi akademik, sains, dan inovasi sekolah.',
    modalId: 'tokoh-habibie',
  },
  {
    id: 'musab-bin-umair',
    traitKey: 'tabligh',
    traitLabel: 'Tabligh (Komunikatif & Santun)',
    scope: 'Tokoh Dunia / Kejayaan Islam',
    name: 'Mus’ab bin Umair RA',
    eraOrRole: 'Duta Muda Pertama Islam di Madinah',
    headline: 'Pemuda santun yang menyatukan suku-suku Madinah dengan dialog yang menyentuh hati.',
    storySummary:
      'Diutus Rasulullah SAW ke Yatsrib (Madinah) di usia muda. Dengan tutur kata yang tenang, cerdas, dan penuh respek, Mus’ab berhasil meluluhkan hati para kepala suku hingga Madinah siap menjadi pusat peradaban Islam tanpa satu tetes darah pun.',
    osisApplication:
      'Menjadi komunikator dan diplomat ulung di sekolah yang mampu merangkul semua angkatan dan ekstrakurikuler dengan santun.',
    modalId: 'tokoh-musab',
  },
  {
    id: 'agus-salim-ahmad-dahlan',
    traitKey: 'tabligh',
    traitLabel: 'Tabligh (Komunikatif & Santun)',
    scope: 'Tokoh Bangsa Indonesia',
    name: 'K.H. Agus Salim & K.H. Ahmad Dahlan',
    eraOrRole: 'Diplomat Ulung Kemerdekaan & Pahlawan Pendidikan Nasional',
    headline: 'Komunikasi cerdas, fasih 9 bahasa, dan dakwah bil hal yang mencerdaskan bangsa.',
    storySummary:
      'H. Agus Salim memukau Sidang Dewan Keamanan PBB 1947 dengan diplomasi yang santun, humoris, namun sangat tajam hingga kedaulatan RI diakui dunia. Sementara K.H. Ahmad Dahlan dan K.H. Hasyim Asy’ari membina pemuda lewat dialog, sekolah, dan teladan amal nyata.',
    osisApplication:
      'Menyampaikan ide saat rapat, presentasi ke Kepala Sekolah/sponsor, maupun sosialisasi ke siswa dengan bahasa yang persuasif dan beradab.',
    modalId: 'tokoh-agussalim',
  },
];

export const MODAL_REFERENCES: Record<string, ModalReferenceItem> = {
  'qs-albaqarah-30': {
    id: 'qs-albaqarah-30',
    category: 'quran',
    badge: "Al-Qur'an Al-Karim · QS. Al-Baqarah: 30",
    title: 'Mandat Manusia sebagai Khalifah di Muka Bumi',
    subtitle: 'Amanah kepemimpinan untuk menjaga keteraturan, merawat lingkungan, dan mencegah kerusakan.',
    arabic: 'وَإِذْ قَالَ رَبُّكَ لِلْمَلَائِكَةِ إِنِّي جَاعِلٌ فِي الْأَرْضِ خَلِيفَةً ۖ قَالُوا أَتَجْعَلُ فِيهَا مَنْ يُفْسِدُ فِيهَا وَيَسْفِكُ الدِّمَاءَ وَنَحْنُ نُسَبِّحُ بِحَمْدِكَ وَنُقَدِّسُ لَكَ ۖ قَالَ إِنِّي أَعْلَمُ مَا لَا تَعْلَمُونَ',
    latin: "Wa iż qāla rabbuka lil-malā'ikati innī jā'ilun fil-arḍi khalīfah(tan), qālū ataj'alu fīhā may yufsidu fīhā wa yasfikud-dimā'a wa naḥnu nusabbiḥu biḥamdika wa nuqaddisu lak(a), qāla innī a'lamu mā lā ta'lamūn(a).",
    translation: '"Dan (ingatlah) ketika Tuhanmu berfirman kepada para malaikat, \'Aku hendak menjadikan khalifah di bumi.\' Mereka berkata, \'Apakah Engkau hendak menjadikan orang yang merusak dan menumpahkan darah di sana, sedangkan kami bertasbih memuji-Mu dan menyucikan nama-Mu?\' Dia berfirman, \'Sungguh, Aku mengetahui apa yang tidak kamu ketahui.\'" (QS. Al-Baqarah: 30)',
    reflectionTitle: 'Tafsir & Refleksi Kepemimpinan OSIS',
    reflectionPoints: [
      'Mandat Anti-Kerusakan (La Tufsidu fil Ardh): Kekhawatiran malaikat adalah sifat merusak dan konflik. Pemimpin OSIS membuktikan kelayakan sebagai khalifah dengan menjadi penjaga fasilitas sekolah, ketertiban, dan kerukunan antarsiswa.',
      'Kepemimpinan adalah Pengelolaan (Stewardship): Jabatan di OSIS bukan hak istimewa untuk dilayani, melainkan amanah Allah untuk memakmurkan sekolah dengan program yang bermanfaat.',
      'Ilmu & Kapasitas Belajar: Allah membekali manusia dengan ilmu (QS. Al-Baqarah: 31). Pengurus OSIS wajib terus belajar berorganisasi, berempati, dan menyelesaikan masalah secara dewasa.'
    ],
    actionableTakeaway: 'Pastikan setiap ruang rapat, aula, dan fasilitas sekolah selalu lebih bersih dan tertata setelah digunakan oleh kepanitiaan OSIS dibandingkan sebelumnya.'
  },
  'prinsip-kepemimpinan': {
    id: 'prinsip-kepemimpinan',
    category: 'prinsip',
    badge: 'Filosofi Kepemimpinan · Peran Ganda OSIS',
    title: 'Respek Lahir dari Konsistensi Perilaku, Bukan dari Pin Jabatan',
    subtitle: 'Mengapa keteladanan harian jauh lebih berpengaruh daripada instruksi lisan.',
    arabic: 'كَبُرَ مَقْتًا عِنْدَ اللَّهِ أَنْ تَقُولُوا مَا لَا تَفْعَلُونَ',
    latin: "Kabura maqtan 'indallāhi an taqūlū mā lā taf'alūn(a).",
    translation: '"Sangat besar kebencian di sisi Allah bahwa kamu mengatakan apa-apa yang tidak kamu kerjakan." (QS. Ash-Shaff: 3)',
    reflectionTitle: 'Prinsip Integritas Pengurus OSIS',
    reflectionPoints: [
      'Walk the Talk (Keselarasan Kata & Tindakan): Siswa lain melihat apa yang pengurus OSIS lakukan sebelum mendengar apa yang pengurus OSIS ucapkan.',
      'Disiplin Tanpa Dispensasi: Saat pengurus OSIS menertibkan keterlambatan atau atribut seragam, wibawa aturan tersebut runtuh jika pengurusnya sendiri melanggar.',
      'Kepemimpinan Melayani (Servant Leadership): Pemimpin sejati hadir paling awal untuk menyiapkan kebutuhan tim dan pulang paling akhir untuk memastikan semua tuntas.'
    ],
    actionableTakeaway: 'Jadilah orang pertama yang mematuhi tata tertib sekolah yang kamu sosialisasikan. Wibawa pemimpin tumbuh otomatis saat integritasnya tidak bisa ditawar.'
  },
  'qs-alahzab-21': {
    id: 'qs-alahzab-21',
    category: 'quran',
    badge: "Al-Qur'an Al-Karim · QS. Al-Ahzab: 21",
    title: 'Menjadi Uswah Hasanah: Keteladanan Moral & Dakwah Bil Hal',
    subtitle: 'Menjadikan Rasulullah SAW sebagai prototipe pemimpin muda yang santun, tangguh, dan menginspirasi.',
    arabic: 'لَقَدْ كَانَ لَكُمْ فِي رَسُولِ اللَّهِ أُسْوَةٌ حَسَنَةٌ لِمَنْ كَانَ يَرْجُو اللَّهَ وَالْيَوْمَ الْآخِرَ وَذَكَرَ اللَّهَ كَثِيرًا',
    latin: 'Laqad kāna lakum fī rasūlillāhi uswatun ḥasanatul liman kāna yarjullāha wal-yaumal-ākhira wa żakarallāha kaṡīrā(n).',
    translation: '"Sungguh, telah ada pada (diri) Rasulullah itu suri teladan yang baik bagimu (yaitu) bagi orang yang mengharap (rahmat) Allah dan (kedatangan) hari Kiamat dan yang banyak mengingat Allah." (QS. Al-Ahzab: 21)',
    reflectionTitle: 'Refleksi Dakwah Bil Hal di Lingkungan Sekolah',
    reflectionPoints: [
      'Dakwah Bil Hal (Keteladanan Aksi): Mengajak kebaikan paling efektif bukanlah lewat ceramah panjang, melainkan lewat akhlak nyata—seperti bersegera shalat saat adzan dan bertutur kata sopan kepada guru maupun adik kelas.',
      'Penyejuk di Ruang Digital: Di grup WhatsApp atau media sosial angkatan, pengurus OSIS hadir sebagai penengah yang meredam gosip/konflik, bukan ikut memprovokasi.',
      'Ketenangan di Tengah Tekanan: Ayat ini turun dalam konteks Perang Khandaq; teladan Nabi mengajarkan pemimpin untuk tetap tenang, optimis, dan ikut turun tangan bersama anggota di saat sulit.'
    ],
    actionableTakeaway: 'Jadikan kehadiranmu di kelas dan di grup chat sekolah sebagai penyejuk suasana yang menghadirkan solusi serta rasa aman bagi semua teman.'
  },
  'qs-attin-isra': {
    id: 'qs-attin-isra',
    category: 'quran',
    badge: "Al-Qur'an Al-Karim · QS. At-Tin: 4 & QS. Al-Isra: 84",
    title: 'Dalil Potensi Diri (Self-Potential) & Keunikan Peran',
    subtitle: 'Setiap insan diciptakan dalam bentuk terbaik dengan bakat khas untuk saling melengkapi.',
    arabic: 'لَقَدْ خَلَقْنَا الْإِنْسَانَ فِي أَحْسَنِ تَقْوِيمٍ ۝ قُلْ كُلٌّ يَعْمَلُ عَلَىٰ شَاكِلَتِهِ فَرَبُّكُمْ أَعْلَمُ بِمَنْ هُوَ أَهْدَىٰ سَبِيلًا',
    latin: "Laqad khalaqnal-insāna fī aḥsani taqwīm(in). — Qul kulluy ya'malu 'alā syākilatihī fa rabbukum a'lamu biman huwa ahdā sabīlā(n).",
    translation: '"Sungguh, Kami telah menciptakan manusia dalam bentuk yang sebaik-baiknya." (QS. At-Tin: 4) — "Katakanlah (Muhammad), \'Setiap orang berbuat sesuai dengan pembawaannya (bakat/potensinya) masing-masing.\' Maka Tuhanmu lebih mengetahui siapa yang lebih benar jalannya." (QS. Al-Isra: 84)',
    reflectionTitle: 'Mengubah Rasa Minder Menjadi Kontribusi Terbaik',
    reflectionPoints: [
      'Ahsani Taqwim (Ciptaan Terbaik): Rasa tidak percaya diri sering muncul karena membandingkan kelemahan kita dengan kelebihan orang lain. Padahal Allah telah menitipkan potensi unik pada setiap pengurus.',
      'Bekerja Sesuai Syakilah (Kapasitas & Bakat Unik): Tidak semua pengurus harus menjadi orator di panggung. Ada yang unggul di manajemen logistik, desain visual, negosiasi sponsor, atau ketelitian administrasi.',
      'Filosofi Puzzle Organisasi: Organisasi yang kuat bukan kumpulan orang dengan keahlian seragam, melainkan kolaborasi berbagai potensi yang saling mengunci dan melengkapi.'
    ],
    actionableTakeaway: 'Kenali 1 keahlian terbaikmu di kepengurusan, asah hingga tuntas, dan banggalah berkontribusi maksimal di posisimu tanpa merasa minder.'
  },
  'hadits-niat-ikhlas': {
    id: 'hadits-niat-ikhlas',
    category: 'hadits',
    badge: "Hadits Arba'in #1 · HR. Bukhari & Muslim",
    title: "Fondasi Niat Ikhlas Lillahi Ta'ala dalam Berorganisasi",
    subtitle: 'Rahasia mental baja pemimpin yang tahan kritik dan tidak haus pujian manusia.',
    arabic: 'إِنَّمَا الْأَعْمَالُ بِالنِّيَّاتِ، وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى',
    latin: "Innamal-a'mālu bin-niyyāt(i), wa innamā likulli-mri'in mā nawā.",
    translation: '"Sesungguhnya setiap amal perbuatan itu tergantung pada niatnya, dan sesungguhnya setiap orang akan mendapatkan sesuai dengan apa yang ia niatkan." (HR. Bukhari no. 1 & Muslim no. 1907)',
    reflectionTitle: 'Mengapa Ikhlas Melahirkan Kepercayaan Diri Sejati?',
    reflectionPoints: [
      'Merdeka dari Haus Validasi: Pengurus yang bekerja karena mencari pujian akan mudah patah semangat saat tidak diapresiasi. Pengurus yang ikhlas karena Allah tetap tersenyum dan bekerja tuntas meski di balik layar.',
      'Mental Tangguh Saat Dikritik: Ketika niatnya adalah memperbaiki keadaan demi ridha Allah, kritik dan evaluasi tidak dianggap sebagai serangan pribadi, melainkan masukan berharga untuk tumbuh.',
      'Mengubah Lelah Menjadi Lillah: Rapat sore, menyiapkan kursi aula, hingga membersihkan sampah acara semuanya bernilai ibadah pahala jariyah jika diniatkan melayani umat dan sekolah.'
    ],
    actionableTakeaway: 'Sebelum memulai rapat atau acara OSIS, luruskan niat di dalam hati: "Ya Allah, jadikan lelahku hari ini sebagai ibadah dan manfaat bagi teman-temanku."'
  },
  'hadits-sombong': {
    id: 'hadits-sombong',
    category: 'hadits',
    badge: 'Hadits Shahih · HR. Muslim no. 91',
    title: 'Batas Tegas: Percaya Diri vs Kesombongan (Al-Kibr)',
    subtitle: 'Membedakan keberanian tampil yang menginspirasi dari kesombongan yang meruntuhkan ukhuwah.',
    arabic: 'الْكِبْرُ بَطَرُ الْحَقِّ وَغَمْطُ النَّاسِ',
    latin: 'Al-kibru baṭarul-ḥaqqi wa ghamṭun-nās(i).',
    translation: '"Kesombongan adalah menolak kebenaran (baṭarul-ḥaqq) dan meremehkan manusia (ghamṭun-nās)." (HR. Muslim no. 91 dari Abdullah bin Mas\'ud RA)',
    reflectionTitle: 'Indikator Pemimpin Percaya Diri vs Pemimpin Sombong',
    reflectionPoints: [
      'Percaya Diri Berani Mengusulkan, Rendah Hati Menerima Masukan: Percaya diri membuatmu berani bicara di forum rapat; kerendahan hati membuatmu siap menerima ide anggota lain yang lebih solutif.',
      'Waspada Batarul Haqq (Menolak Kebenaran): Jangan pernah mempertahankan argumen yang keliru saat evaluasi hanya karena gengsi sebagai ketua atau senior.',
      'Waspada Ghamthun Nas (Meremehkan Orang Lain): Menghargai pendapat adik kelas, staf baru, maupun petugas kebersihan sekolah adalah ciri mutlak pemimpin berkelas.'
    ],
    actionableTakeaway: 'Ukur kepercayaan dirimu dengan rumus ini: Semakin tinggi rasa percaya dirimu karena Allah, semakin hangat dan hormat sikapmu kepada setiap orang.'
  },
  'karakter-shiddiq': {
    id: 'karakter-shiddiq',
    category: 'karakter',
    badge: 'Karakter Kunci 01 · Shiddiq (الصِّدْقُ)',
    title: 'Shiddiq: Jujur, Transparan & Berintegritas Tinggi',
    subtitle: 'Kesesuaian antara ucapan, data laporan, dan kenyataan di lapangan.',
    arabic: 'عَلَيْكُمْ بِالصِّدْقِ فَإِنَّ الصِّدْقَ يَهْدِي إِلَى الْبِرِّ وَإِنَّ الْبِرَّ يَهْدِي إِلَى الْجَنَّةِ',
    latin: "'Alaikum biṣ-ṣidqi fa innaṣ-ṣidqa yahdī ilal-birri wa innal-birra yahdī ilal-jannah.",
    translation: '"Hendaklah kalian senantiasa berlaku jujur, karena sesungguhnya kejujuran akan mengantarkan pada kebaikan dan sesungguhnya kebaikan akan mengantarkan pada surga." (HR. Muslim)',
    reflectionTitle: 'Manifestasi Shiddiq di Organisasi OSIS & Tokoh Panutan',
    reflectionPoints: [
      'Transparansi Anggaran & LPJ: Menyusun laporan keuangan kas dan kepanitiaan apa adanya hingga rupiah terkecil, lengkap dengan bukti nota asli tanpa mark-up.',
      'Teladan Dunia — Khalifah Umar bin Abdul Aziz: Mematikan lampu minyak negara saat berbicara urusan keluarga pribadi agar tidak memakai fasilitas umat.',
      'Teladan Indonesia — Bung Hatta & Jenderal Hoegeng: Bung Hatta mengembalikan sisa uang dinas negara hingga sen terakhir; Jenderal Hoegeng menutup toko bunga istrinya demi mencegah gratifikasi jabatan.'
    ],
    actionableTakeaway: 'Kepercayaan (trust) adalah mata uang utama kepemimpinan. Sekali kita jujur dalam hal kecil, seluruh tim dan pembina akan percaya pada keputusan besar kita.'
  },
  'karakter-amanah': {
    id: 'karakter-amanah',
    category: 'karakter',
    badge: 'Karakter Kunci 02 · Amanah (الْأَمَانَةُ)',
    title: 'Amanah: Dapat Dipercaya & Tuntas Bertanggung Jawab',
    subtitle: 'Menjaga kepercayaan tugas, tenggat waktu, dan fasilitas sekolah dengan penuh kehormatan.',
    arabic: 'إِنَّ اللَّهَ يَأْمُرُكُمْ أَنْ تُؤَدُّوا الْأَمَانَاتِ إِلَىٰ أَهْلِهَا',
    latin: "Innallāha ya'murukum an tu'addul-amānāti ilā ahlihā.",
    translation: '"Sesungguhnya Allah menyuruh kamu menyampaikan amanah kepada yang berhak menerimanya..." (QS. An-Nisa: 58)',
    reflectionTitle: 'Manifestasi Amanah di Organisasi OSIS & Tokoh Panutan',
    reflectionPoints: [
      'Tuntas Sesuai Deadline & Menjaga Inventaris: Menyelesaikan proposal tepat waktu dan merawat sound system/proyektor sekolah hingga kembali utuh.',
      'Teladan Dunia — Shalahuddin Al-Ayyubi: Menepati setiap perjanjian damai dan mengelola harta negara seluruhnya untuk kemakmuran rakyat tanpa menumpuk kekayaan pribadi.',
      'Teladan Indonesia — Jenderal Sudirman & Sri Sultan HB IX: Jenderal Sudirman tetap mengemban amanah memimpin perjuangan di usia 29 tahun meski ditandu dalam kondisi sakit; Sultan HB IX merelakan hartanya demi menjaga tegaknya Republik Indonesia.'
    ],
    actionableTakeaway: 'Jangan pernah meninggalkan tugas kepanitiaan menggantung tanpa kejelasan. Jika berhalangan darurat, segera komunikasikan dan serah-terimakan dengan rapi.'
  },
  'karakter-fathanah': {
    id: 'karakter-fathanah',
    category: 'karakter',
    badge: 'Karakter Kunci 03 · Fathanah (الْفَطَانَةُ)',
    title: 'Fathanah: Cerdas, Visioner & Solutif di Saat Krisis',
    subtitle: 'Ketajaman berpikir dalam memetakan prioritas, membaca situasi, dan menyiapkan Plan B.',
    arabic: 'يُؤْتِي الْحِكْمَةَ مَنْ يَشَاءُ ۚ وَمَنْ يُؤْتَ الْحِكْمَةَ فَقَدْ أُوتِيَ خَيْرًا كَثِيرًا',
    latin: "Yu'til-ḥikmata may yasyā'(u), wa may yu'tal-ḥikmata faqad ūtiya khairan kaṡīrā(n).",
    translation: '"Dia menganugerahkan al-hikmah (kebijaksanaan dan kecerdasan memahami masalah) kepada siapa yang Dia kehendaki. Barangsiapa dianugerahi hikmah, ia benar-benar telah dianugerahi karunia yang banyak." (QS. Al-Baqarah: 269)',
    reflectionTitle: 'Manifestasi Fathanah di Organisasi OSIS & Tokoh Panutan',
    reflectionPoints: [
      'Manajemen Risiko (Plan A & Plan B): Sigap mengalihkan panggung pembukaan ke aula tertutup saat hujan lebat turun tanpa menimbulkan panik.',
      'Teladan Dunia — Sultan Muhammad Al-Fatih: Di usia 21 tahun menguasai 6 bahasa, sains militer, dan melahirkan solusi cerdas menyeberangkan 70 kapal melintasi bukit Galata dalam satu malam.',
      'Teladan Indonesia — Prof. Dr. Ing. B.J. Habibie: Memadukan Imtak & Iptek, memegang puluhan paten kedirgantaraan dunia, serta cerdas mengatasi krisis ekonomi nasional secara terukur.'
    ],
    actionableTakeaway: 'Biasakan bertanya dalam setiap rapat perencanaan: "Apa 3 risiko terbesar acara ini, dan apa langkah antisipasi kita jika hal itu terjadi?"'
  },
  'karakter-tabligh': {
    id: 'karakter-tabligh',
    category: 'karakter',
    badge: 'Karakter Kunci 04 · Tabligh (التَّبْلِيغُ)',
    title: 'Tabligh: Komunikatif, Persuasif & Menyentuh Hati',
    subtitle: 'Kemampuan menyampaikan gagasan, instruksi, dan nilai kebaikan secara terstruktur serta santun.',
    arabic: 'ادْعُ إِلَىٰ سَبِيلِ رَبِّكَ بِالْحِكْمَةِ وَالْمَوْعِظَةِ الْحَسَنَةِ ۖ وَجَادِلْهُمْ بِالَّتِي هِيَ أَحْسَنُ',
    latin: "Ud'u ilā sabīli rabbika bil-ḥikmati wal-mau'iẓatil-ḥasanati wa jādilhum billatī hiya aḥsan(u).",
    translation: '"Serulah (manusia) kepada jalan Tuhanmu dengan hikmah dan pengajaran yang baik, dan berdebatlah (berdiskusilah) dengan mereka dengan cara yang terbaik." (QS. An-Nahl: 125)',
    reflectionTitle: 'Manifestasi Tabligh di Organisasi OSIS & Tokoh Panutan',
    reflectionPoints: [
      'Komunikasi Persuasif Tanpa Menggurui: Menyosialisasikan tata tertib dan info lomba antarkelas dengan bahasa yang merangkul serta antusias.',
      'Teladan Dunia — Mus’ab bin Umair RA: Duta muda pertama Islam yang berhasil menyatukan masyarakat Madinah melalui komunikasi yang santun, empatik, dan mencerahkan.',
      'Teladan Indonesia — K.H. Agus Salim & K.H. Ahmad Dahlan: H. Agus Salim memukau forum diplomasi PBB dengan penguasaan 9 bahasa yang cerdas dan santun; K.H. Ahmad Dahlan menggerakkan pendidikan pemuda lewat dialog yang menyejukkan.'
    ],
    actionableTakeaway: 'Gunakan prinsip Qaulan Sadida (perkataan yang benar dan tepat sasaran) dan Qaulan Karima (perkataan yang mulia dan memuliakan) di setiap komunikasi OSIS.'
  },
  'tokoh-umar-abdul-aziz': {
    id: 'tokoh-umar-abdul-aziz',
    category: 'tokoh',
    badge: 'Teladan Shiddiq Dunia · Masa Kejayaan Islam',
    title: 'Khalifah Umar bin Abdul Aziz: Lentera Kejujuran Baitul Mal',
    subtitle: 'Pemimpin yang memisahkan fasilitas negara dan urusan pribadi hingga tetes minyak lampu terakhir.',
    reflectionTitle: 'Kisah Inspiratif & Pelajaran Bagi Pengurus OSIS',
    reflectionPoints: [
      'Kisah Lentera Malam: Ketika seorang kerabat datang ke ruang kerjanya pada malam hari untuk membicarakan urusan keluarga, Umar bin Abdul Aziz langsung mematikan lampu minyak di mejanya dan menyalakan lilin kecil miliknya sendiri. Beliau berkata: "Lampu tadi dibiayai dari uang rakyat, aku tak ingin dihisab Allah karena memakainya untuk urusan pribadiku."',
      'Hidup Sederhana di Puncak Kekuasaan: Meski memimpin wilayah dari Spanyol hingga perbatasan Tiongkok, beliau menolak kendaraan istana dan memilih hidup bersahaja bersama rakyat.',
      'Dampak Kejujuran Pemimpin: Hanya dalam 2,5 tahun masa kepemimpinannya, kepercayaan masyarakat meningkat drastis dan kesejahteraan merata di seluruh negeri.'
    ],
    actionableTakeaway: 'Di OSIS, sifat Shiddiq dimulai dari hal sederhana: jujur mencatat uang kembalian Rp1.000 di kas kepanitiaan dan tidak memakai fasilitas OSIS untuk kepentingan pribadi.'
  },
  'tokoh-hatta-hoegeng': {
    id: 'tokoh-hatta-hoegeng',
    category: 'tokoh',
    badge: 'Teladan Shiddiq Indonesia · Pahlawan Bangsa',
    title: 'Mohammad Hatta & Jenderal Hoegeng: Kristal Integritas Indonesia',
    subtitle: 'Dua sosok pemimpin bangsa yang membuktikan bahwa kejujuran berdiri di atas segala jabatan.',
    reflectionTitle: 'Kisah Inspiratif & Pelajaran Bagi Pengurus OSIS',
    reflectionPoints: [
      'Bung Hatta & Uang Sisa Perjalanan: Saat berobat ke luar negeri dengan biaya negara, Bung Hatta mengembalikan seluruh sisa uang saku perjalanan hingga sen terakhir ke Sekretariat Negara karena merasa itu bukan hak pribadinya.',
      'Sepatu Bally Bung Hatta: Hingga akhir hayatnya, Wakil Presiden pertama RI ini menabung sendiri untuk membeli sepatu impiannya tanpa pernah meminta bantuan pengusaha atau memakai anggaran negara.',
      'Jenderal Hoegeng Iman Santoso: Saat dilantik menjadi Kepala Jawatan Imigrasi dan kemudian Kapolri, beliau meminta istrinya menutup toko bunga keluarga agar tidak ada pihak yang membeli bunga di sana demi mencari muka pada jabatannya.'
    ],
    actionableTakeaway: 'Jadilah pengurus OSIS yang bersih dan berwibawa—ketika laporan keuangan dan sikapmu jujur seperti Bung Hatta, seluruh warga sekolah akan menaruh hormat.'
  },
  'tokoh-shalahuddin': {
    id: 'tokoh-shalahuddin',
    category: 'tokoh',
    badge: 'Teladan Amanah Dunia · Masa Kejayaan Islam',
    title: 'Sultan Shalahuddin Al-Ayyubi: Penjaga Amanah & Kemuliaan Janji',
    subtitle: 'Pemimpin besar yang dihormati kawan maupun lawan karena keteguhan memegang amanah.',
    reflectionTitle: 'Kisah Inspiratif & Pelajaran Bagi Pengurus OSIS',
    reflectionPoints: [
      'Menepati Janji TanpaKhianat: Saat membebaskan Yerusalem (1187 M), Shalahuddin menepati seluruh janjinya untuk melindungi warga sipil, rumah ibadah, dan memberikan jaminan keamanan penuh.',
      'Amanah Mengelola Kas Umat: Seluruh pendapatan negara disalurkan untuk membangun madrasah, rumah sakit gratis, dan kesejahteraan prajurit, sehingga saat beliau wafat tidak ada harta pribadi yang ditumpuk.',
      'Empati di Atas Konflik: Ketika panglima lawannya, Richard the Lionheart, demam tinggi dan kehilangan kudanya, Shalahuddin mengirim tabib pribadi, buah persik bersalju, dan dua ekor kuda terbaik.'
    ],
    actionableTakeaway: 'Pegang teguh setiap janji kepanitiaan, jaga inventaris sekolah seperti menjaga kehormatan diri, dan perlakukan semua pihak dengan adil.'
  },
  'tokoh-sudirman': {
    id: 'tokoh-sudirman',
    category: 'tokoh',
    badge: 'Teladan Amanah Indonesia · Panglima Besar Muda',
    title: 'Jenderal Besar Sudirman & Sri Sultan Hamengkubuwono IX',
    subtitle: 'Bukti nyata pemimpin muda Indonesia yang menjaga amanah bangsa melampaui batas fisik.',
    reflectionTitle: 'Kisah Inspiratif & Pelajaran Bagi Pengurus OSIS',
    reflectionPoints: [
      'Pemimpin Muda Berlatar Guru & Kepanduan: Jenderal Sudirman aktif di organisasi pemuda (Hizbul Wathan) dan menjadi Panglima Besar TNI di usia 29 tahun karena sifat amanahnya yang dipercaya semua golongan.',
      'Menunaikan Amanah dari Atas Tandu: Saat Agresi Militer II (1948), meski baru selesai operasi dan paru-parunya tinggal berfungsi satu, beliau menolak menyerah dan tetap memimpin gerilya selama 7 bulan dari atas tandu.',
      'Amanah Sri Sultan HB IX: Ketika ibukota RI pindah ke Yogyakarta dan kas Republik kosong, Sri Sultan HB IX menyerahkan 6 juta Gulden uang kraton untuk menggaji pegawai dan diplomat RI tanpa meminta tanda terima hingga akhir masa jabatannya.'
    ],
    actionableTakeaway: 'Ketika kamu sudah menerima amanah sebagai ketua panitia atau koordinator divisi, kawal tugas tersebut hingga garis akhir dengan penuh dedikasi.'
  },
  'tokoh-alfatih': {
    id: 'tokoh-alfatih',
    category: 'tokoh',
    badge: 'Teladan Fathanah Dunia · Pemimpin Muda 21 Tahun',
    title: 'Sultan Muhammad Al-Fatih: Kecerdasan Strategi & Ketajaman Visi',
    subtitle: 'Representasi puncak pemuda Muslim yang memadukan kedalaman spiritual dengan kecerdasan sains.',
    reflectionTitle: 'Kisah Inspiratif & Pelajaran Bagi Pengurus OSIS',
    reflectionPoints: [
      'Kapasitas Intelektual Sejak Remaja: Di usia belia, Al-Fatih mempelajari matematika, fisika, teknik balistik meriam Urban, geografi, serta menguasai bahasa Arab, Turki, Persia, Yunani, Latin, dan Ibrani.',
      'Solusi Cerdas Saat Jalan Buntu: Ketika armada lautnya terhadang rantai raksasa di Tanduk Emas, ia tidak menyalahkan bawahannya. Ia merancang rekayasa rel kayu yang dilumuri minyak dan lemak untuk menarik 70 kapal melintasi bukit.',
      'Sinergi Ikhtiar & Doa: Setiap strategi briliannya selalu diiringi evaluasi lapangan yang teliti dan doa malam yang khusyuk.'
    ],
    actionableTakeaway: 'Usia muda di bangku sekolah bukan alasan untuk berkarya biasa-biasa saja. Asah kecerdasan berpikir kritis dan selalu siapkan solusi kreatif (Plan B) di setiap acara OSIS.'
  },
  'tokoh-habibie': {
    id: 'tokoh-habibie',
    category: 'tokoh',
    badge: 'Teladan Fathanah Indonesia · Bapak Teknologi Bangsa',
    title: 'Prof. Dr. Ing. B.J. Habibie: Sinergi Imtak & Iptek',
    subtitle: 'Ilmuwan kelas dunia dan Presiden ke-3 RI yang menyelesaikan masalah bangsa dengan kecerdasan.',
    reflectionTitle: 'Kisah Inspiratif & Pelajaran Bagi Pengurus OSIS',
    reflectionPoints: [
      'Mr. Crack di Dunia Penerbangan: B.J. Habibie menemukan rumus perhitungan keretakan sayap pesawat hingga tingkat atom yang digunakan maskapai seluruh dunia, sambil tetap disiplin menjaga wudhu dan ibadah.',
      'Solutif di Tengah Krisis 1998: Saat menerima estafet kepemimpinan nasional di tengah badai krisis ekonomi, beliau bekerja 18 jam sehari bersama tim ahli untuk menstabilkan nilai tukar Rupiah dan membuka ruang demokrasi.',
      'Pesan bagi Generasi Muda: Beliau mendirikan MAN Insan Cendekia dengan filosofi bahwa pemimpin masa depan Indonesia harus memiliki "Otak Jerman dan Hati Mekkah" (unggul sains sekaligus mulia akhlaknya).'
    ],
    actionableTakeaway: 'Jadilah pengurus OSIS yang Fathanah: berprestasi tinggi di pelajaran sekolah sekaligus cerdas memecahkan masalah organisasi.'
  },
  'tokoh-musab': {
    id: 'tokoh-musab',
    category: 'tokoh',
    badge: 'Teladan Tabligh Dunia · Duta Muda Pertama Islam',
    title: 'Mus’ab bin Umair RA: Diplomasi Santun yang Menyatukan Madinah',
    subtitle: 'Pemuda cerdas dan berwibawa yang membuka hati masyarakat lewat komunikasi yang memuliakan.',
    reflectionTitle: 'Kisah Inspiratif & Pelajaran Bagi Pengurus OSIS',
    reflectionPoints: [
      'Menghadapi Penolakan dengan Ketenangan: Saat tokoh Madinah, Usaid bin Hudhair, datang membawa tombak dengan marah, Mus’ab bin Umair menyapanya dengan tenang: "Maukah engkau duduk sebentar mendengarkan perkataanku? Jika baik ambillah, jika tidak suka kami tidak akan memaksamu."',
      'Komunikasi yang Menggerakkan: Kalimat yang santun dan argumentasi yang jernih membuat Usaid bin Hudhair dan Sa’ad bin Mu’adz tersentuh hingga seluruh kaumnya memeluk kebaikan.',
      'Kemampuan Mendengar & Merangkul: Mus’ab memahami psikologi lawan bicaranya sehingga mampu mendamaikan suku Aus dan Khazraj yang telah bertikai puluhan tahun.'
    ],
    actionableTakeaway: 'Saat menyosialisasikan program OSIS atau menengahi perbedaan pendapat antar-kelas, gunakan tutur kata yang tenang, menghargai, dan tidak menggurui.'
  },
  'tokoh-agussalim': {
    id: 'tokoh-agussalim',
    category: 'tokoh',
    badge: 'Teladan Tabligh Indonesia · Diplomasi & Pendidikan',
    title: 'K.H. Agus Salim & K.H. Ahmad Dahlan: Seni Komunikasi yang Mencerahkan',
    subtitle: 'Teladan pemimpin Indonesia yang memenangkan simpati dunia dan umat lewat kekuatan komunikasi santun.',
    reflectionTitle: 'Kisah Inspiratif & Pelajaran Bagi Pengurus OSIS',
    reflectionPoints: [
      'K.H. Agus Salim ("The Grand Old Man"): Menguasai 9 bahasa asing secara fasih. Di forum PBB New York tahun 1947, kepiawaiannya berargumen secara elegan, hangat, dan cerdas berhasil meyakinkan negara-negara dunia untuk mengakui kedaulatan Indonesia.',
      'Menjawab Ejekan dengan Senyuman Cerdas: Ketika lawan politiknya mengejek di rapat pemuda, H. Agus Salim tidak pernah membalas dengan makian, melainkan dengan retorika santun yang membuat seluruh ruangan tertawa dan kagum.',
      'K.H. Ahmad Dahlan & Pelajaran Surat Al-Ma’un: Mengajarkan murid-muridnya bahwa komunikasi kebaikan terbaik (Tabligh) adalah yang diwujudkan menjadi aksi nyata menyantuni sesama dan membangun sekolah.'
    ],
    actionableTakeaway: 'Latih kemampuan public speaking, bahasa asing, dan adab berdiskusi di OSIS agar setiap gagasanmu mudah diterima oleh guru, sponsor, maupun rekan siswa.'
  },
  'unicef-toolkits': {
    id: 'unicef-toolkits',
    category: 'referensi',
    badge: 'Referensi Global · UNICEF Framework',
    title: 'UNICEF Life Skills & Community Engagement Toolkits',
    subtitle: 'Standar kecakapan hidup abad ke-21 dan pelibatan komunitas remaja di lingkungan sekolah.',
    reflectionTitle: '4 Pilar Implementasi Praktis di Kepanitiaan OSIS',
    reflectionPoints: [
      '1. Self-Management & Preparation (Dimensi Individu): Merancang rundown terukur menit demi menit, membagi PIC (Person in Charge) secara spesifik, dan menggelar gladi bersih H-1 untuk meminimalkan kecemasan panggung.',
      '2. Effective Communication & Active Listening (Dimensi Sosial): Melaksanakan briefing singkat 10 menit sebelum gerbang acara dibuka serta menetapkan protokol komunikasi darurat yang jelas di grup kepanitiaan.',
      '3. Problem Solving & Adaptive Resilience (Dimensi Kognitif): Menerapkan budaya "No-Blame Quick Recovery"—ketika terjadi kesalahan teknis (misal file presentasi macet), MC langsung mengambil alih dengan ice-breaking sementara operator menyiapkan cadangan.',
      '4. Collaborative Teamwork & Empathy (Dimensi Kolaboratif): Menghapus sekat ego sektoral antardivisi. Divisi yang tugas utamanya telah rampung secara proaktif membantu divisi lain hingga acara tuntas 100%.'
    ],
    actionableTakeaway: 'Kombinasi nilai Khalifah Fil Ardh dan metodologi manajemen modern menjadikan pengurus OSIS unggul secara spiritual sekaligus profesional di lapangan.'
  },
  'panduan-studi-kasus': {
    id: 'panduan-studi-kasus',
    category: 'panduan',
    badge: 'Panduan Solusi · Studi Kasus Lapangan Sesi 2',
    title: 'Kerangka Penyelesaian Krisis: Anggaran Dipangkas 50% & Koordinasi Macet H-2',
    subtitle: 'Pendekatan terpadu berbasis 4 Karakter Kunci Khalifah (Shiddiq, Amanah, Fathanah, Tabligh).',
    reflectionTitle: 'Rumusan 3 Langkah Konkret Pemecahan Masalah',
    reflectionPoints: [
      'Langkah 1 — Konsolidasi Darurat & Komunikasi Terbuka (Tabligh & Shiddiq): Kumpulkan seluruh koordinator divisi dalam rapat kilat 20 menit. Paparkan kondisi anggaran 50% secara jujur dan transparan (Shiddiq), cairkan kebuntuan komunikasi dengan mendengarkan kendala tiap divisi tanpa saling menyalahkan (Tabligh).',
      'Langkah 2 — Re-Prioritasi Anggaran pada Inti Acara (Fathanah): Pangkas biaya dekorasi seremonial atau atribut non-esensial, alihkan ke format kreatif berbiaya rendah namun berdampak tinggi (misal: mengoptimalkan aset sekolah yang sudah ada dan kolaborasi digital) agar substansi acara tetap berjalan 100%.',
      'Langkah 3 — Penataan Ulang PIC & Komitmen Eksekusi Bersama (Amanah): Tetapkan ulang pembagian tugas H-2 hingga hari-H secara tertulis, pastikan sponsor/pihak sekolah mendapat laporan penyesuaian yang akuntabel, dan terapkan sistem saling back-up lintas divisi.'
    ],
    actionableTakeaway: 'Krisis di H-2 adalah ujian terbaik bagi seorang pemimpin. Tim yang solid tidak diukur saat semuanya lancar, melainkan saat mampu beradaptasi cepat di tengah keterbatasan.'
  },
  'faq-kepemimpinan': {
    id: 'faq-kepemimpinan',
    category: 'faq',
    badge: 'Ruang Diskusi · 3 Pertanyaan Tersering Pengurus OSIS',
    title: 'FAQ Seputar Tantangan Nyata Kepemimpinan OSIS',
    subtitle: 'Jawaban aplikatif atas dilema yang paling sering dihadapi pengurus OSIS di sekolah.',
    reflectionTitle: 'Prinsip Utama Menghadapi Dinamika Organisasi',
    reflectionPoints: [
      'Setiap tantangan di OSIS adalah laboratorium pendewasaan mental sebelum terjun ke masyarakat yang sesungguhnya.',
      'Gunakan pendekatan empati secara personal sebelum memberikan teguran formal di forum terbuka.'
    ],
    actionableTakeaway: 'Pemimpin yang hebat bukan yang tidak pernah menemui masalah, melainkan yang menjadikan setiap masalah sebagai sarana bertumbuh bersama timnya.',
    faqItems: [
      {
        question: '1. Bagaimana mengatasi rasa minder atau ejekan teman sebaya (seperti disindir "sok sibuk / sok patuh") saat menjalankan tugas OSIS?',
        answer: 'Kembalikan pada pilar Niat Ikhlas Lillahi Ta\'ala dan teladan Uswah Hasanah. Ejekan sering muncul karena ketidaktahuan atau rasa sungkan teman. Jangan dibalas dengan emosi atau sikap arogan; tetaplah ramah, santai dalam bergaul, namun tegas dan konsisten dalam prinsip. Seiring waktu, konsistensi dan kerendahan hatimu akan mengubah sindiran menjadi rasa hormat.',
        practicalTip: 'Tips Aksi: Sapa teman dengan hangat terlebih dahulu, libatkan mereka dalam kegiatan seru OSIS, dan buktikan bahwa aktif di OSIS membuatmu semakin peduli pada teman seangkatan.'
      },
      {
        question: '2. Bagaimana cara membagi waktu secara efektif antara padatnya program kerja OSIS dengan tuntutan nilai akademik di kelas?',
        answer: 'Terapkan karakter Fathanah (cerdas memetakan prioritas). Gunakan matriks skala prioritas (Penting-Mendesak) dan disiplin waktu rapat. Rapat OSIS harus memiliki agenda dan batas waktu yang jelas (misal maksimal 60 menit selesai), serta manfaatkan sistem delegasi tim agar beban tidak menumpuk pada satu orang.',
        practicalTip: 'Tips Aksi: Buat jadwal mingguan tertulis, cicil tugas sekolah H-3 sebelum tenggat, dan jadikan prestasi akademik sebagai bukti bahwa pengurus OSIS mampu berprestasi di dalam maupun luar kelas.'
      },
      {
        question: '3. Bagaimana cara membina dan menggerakkan anggota OSIS atau panitia yang pasif, sulit dihubungi, atau kurang bertanggung jawab?',
        answer: 'Gunakan pendekatan Tabligh dan ukhuwah. Jangan langsung menghakimi di grup chat umum. Lakukan pendekatan personal (heart-to-heart / japri atau ngobrol empat mata) untuk menanyakan kabarnya dan mencari tahu akar kendalanya—apakah karena bingung dengan tugasnya, ada masalah pribadi, atau merasa kurang dilibatkan.',
        practicalTip: 'Tips Aksi: Berikan tugas yang spesifik dan terukur sesuai minatnya (pilar Mengenali Potensi Diri), dampingi di awal pengerjaan, dan berikan apresiasi tulus di depan tim saat ia berhasil menyelesaikan tugasnya.'
      }
    ]
  }
};
