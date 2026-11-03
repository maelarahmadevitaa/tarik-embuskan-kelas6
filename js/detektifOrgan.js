/**
 * Tantangan 2: Detektif Organ & Hub Arena Tantangan
 * Aplikasi: "Tarik dan Embuskan: Sistem Pernapasan Manusia"
 * IPA Kelas 6 SD - Kurikulum Merdeka
 */

// =========================================================================
// DATA 10 SOAL KUIS DETEKTIF ORGAN (HOTS: STUDI KASUS, FUNGSI & SEBAB-AKIBAT)
// =========================================================================
const DETEKTIF_QUESTIONS = [
  {
    id: 1,
    title: "Misi 1: Gerbang Udara",
    organName: "Rongga Hidung",
    mediaType: "image",
    mediaSrc: "./assets/organ_1_hidung.jpg",
    mediaFallback: "./assets/hidung_organ.jpg",
    question: "Organ ini memiliki rambut-rambut halus (silia) dan selaput lendir alami. Mengapa udara pernapasan harus melewati struktur tersebut terlebih dahulu?",
    correctAnswer: "Untuk menyaring debu kotoran serta menghangatkan dan melembapkan udara sebelum masuk ke paru-paru.",
    wrongAnswers: [
      "Untuk menghasilkan getaran suara unik dan menentukan tinggi rendahnya nada saat berbicara.",
      "Untuk memompa gas oksigen secara langsung menuju ke bilik jantung dan pembuluh darah.",
      "Untuk menghancurkan kuman makanan secara mekanik sebelum masuk ke dalam saluran pencernaan."
    ],
    penjelasan_ilmiah: "Rambut hidung (silia) bertindak sebagai penyaring fisik partikel debu dan kotoran, sedangkan selaput lendir (mukus) serta anyaman kapiler darah di rongga hidung berfungsi melembapkan dan menyesuaikan suhu udara luar agar sesuai dengan suhu tubuh sebelum mencapai paru-paru.",
    penguatan_materi: "Yuk, pelajari lagi bagian Rongga Hidung! Ingat bahwa hidung adalah gerbang filter utama yang menjaga paru-paru kita dari udara kotor dan dingin.",
    funFact: "Rambut hidung dan selaput lendir bekerja sebagai filter alami 24 jam non-stop yang menangkap partikel kotoran agar paru-paru tetap bersih! 👃✨"
  },
  {
    id: 2,
    title: "Misi 2: Persimpangan Jalur",
    organName: "Faring (Tekak)",
    mediaType: "image",
    mediaSrc: "./assets/organ_2_faring.jpg",
    mediaFallback: "./assets/tenggorokan_organ.jpg",
    question: "Di persimpangan faring ini terdapat katup epiglotis. Mengapa kita sangat tidak dianjurkan untuk berbicara atau tertawa saat sedang menelan makanan?",
    correctAnswer: "Katup epiglotis bisa terbuka sehingga makanan salah masuk ke saluran pernapasan dan menyebabkan kita tersedak.",
    wrongAnswers: [
      "Makanan akan menjadi lebih lambat dicerna dan terfermentasi di dalam lambung.",
      "Pita suara akan tertutup oleh air ludah sehingga suara menjadi serak permanen.",
      "Paru-paru akan kelebihan oksigen sehingga rongga dada terasa sesak dan berdebar."
    ],
    penjelasan_ilmiah: "Faring adalah persimpangan antara saluran pernapasan di depan dan saluran pencernaan di belakang. Saat kita menelan, katup epiglotis otomatis menutup laring/trakea. Berbicara atau tertawa saat menelan membuat epiglotis terbuka, sehingga makanan berisiko masuk ke trakea dan memicu refleks tersedak darurat.",
    penguatan_materi: "Yuk, pelajari lagi mekanisme Katup Epiglotis di Faring! Ingat prinsip keselamatan saat makan: kunyah tenang tanpa berbicara agar katup bekerja sempurna.",
    funFact: "Katup epiglotis bekerja otomatis seperti palang pintu kereta api yang menutup jalur napas saat kita menelan makanan! 🔀⚠️"
  },
  {
    id: 3,
    title: "Misi 3: Kotak Suara",
    organName: "Laring & Pita Suara",
    mediaType: "image",
    mediaSrc: "./assets/organ_3_laring.jpg",
    mediaFallback: "./assets/organ_3_laring.jpg.jpg",
    question: "Di dalam organ yang dilingkari ini terdapat selaput pita suara. Saat seorang penyanyi bernyanyi dengan nada yang sangat tinggi, apa yang sebenarnya terjadi pada organ tersebut?",
    correctAnswer: "Selaput di dalamnya menegang dan bergetar sangat cepat akibat dorongan udara dari paru-paru.",
    wrongAnswers: [
      "Selaput di dalamnya mengendur dan melebar agar aliran udara yang lewat menjadi lebih banyak.",
      "Cincin tulang rawan menutup rapat sehingga gelombang suara terpantul keluar melalui rongga hidung.",
      "Organ tersebut menyedot oksigen dari luar dengan cepat untuk memperbesar volume resonansi suara."
    ],
    penjelasan_ilmiah: "Tinggi rendahnya nada suara ditentukan oleh frekuensi getaran pita suara di dalam laring. Saat bernyanyi dengan nada tinggi, otot-otot laring akan menarik pita suara hingga menegang kencang, sehingga pita suara bergetar dengan frekuensi yang jauh lebih cepat saat diembus udara dari paru-paru.",
    penguatan_materi: "Yuk, pelajari lagi bagian Laring & Pita Suara! Bayangkan senar gitar yang dipetik: semakin kencang ditarik, suaranya akan semakin tinggi dan melengking.",
    funFact: "Semakin kencang tegangan pita suara, getarannya semakin cepat dan nada suara yang keluar pun semakin melengking tinggi! 🗣️🎵"
  },
  {
    id: 4,
    title: "Misi 4: Pipa Bertulang Rawan",
    organName: "Trakea (Batang Tenggorokan)",
    mediaType: "image",
    mediaSrc: "./assets/organ_4_trakea.jpg",
    mediaFallback: "./assets/organ_4_trakea.jpg.jpg",
    question: "Saluran leher ini memiliki struktur unik berupa cincin-cincin tulang rawan yang kaku. Mengapa saluran tersebut harus memiliki struktur seperti itu?",
    correctAnswer: "Agar saluran pernapasan selalu terbuka lebar dan tidak kempis saat kita bernapas.",
    wrongAnswers: [
      "Agar makanan padat yang kita telan dapat langsung dihancurkan di sepanjang saluran leher.",
      "Untuk menghangatkan udara yang masuk melalui gesekan panas antar cincin tulang rawan.",
      "Sebagai tempat utama penyerapan gas oksigen ke seluruh jaringan pembuluh darah di leher."
    ],
    penjelasan_ilmiah: "Trakea (batang tenggorokan) tersusun dari sekitar 16–20 cincin tulang rawan berbentuk huruf 'C'. Struktur kaku namun elastis ini berfungsi mempertahankan lumen saluran napas agar selalu terbuka konstan dan tidak kempis atau terlipat akibat perubahan tekanan udara saat bernapas.",
    penguatan_materi: "Yuk, pelajari lagi bagian Trakea! Cincin tulang rawan trakea mirip seperti pipa selang spiral vacuum cleaner agar jalan udara tidak pernah terjepit.",
    funFact: "Cincin tulang rawan berbentuk huruf 'C' mirip pipa spiral vacuum cleaner agar trakea tidak pernah terlipat atau kempis! 💨"
  },
  {
    id: 5,
    title: "Misi 5: Percabangan Utama Paru",
    organName: "Bronkus Kanan & Kiri",
    mediaType: "image",
    mediaSrc: "./assets/organ_5_bronkus.jpg",
    mediaFallback: "./assets/organ_5_bronkus.jpg.jpg",
    question: "Perhatikan percabangan yang menuju paru-paru kanan dan kiri. Berdasarkan jalurnya, apa nama cabang ini dan mengapa percabangan tersebut sangat penting?",
    correctAnswer: "Bronkus – Berfungsi membagi dan mengalirkan udara secara adil ke kedua sisi paru-paru.",
    wrongAnswers: [
      "Bronkiolus – Berfungsi menyaring partikel debu halus sebelum menyentuh tulang rusuk dada.",
      "Trakea Cabang – Berfungsi menampung udara sementara waktu sebelum dipompa oleh jantung.",
      "Alveolus Primer – Berfungsi menghasilkan lendir untuk membasahi kedua belah kantung paru-paru."
    ],
    penjelasan_ilmiah: "Bronkus merupakan dua percabangan utama dari trakea yang mengarah ke paru-paru kanan dan paru-paru kiri. Fungsinya sangat vital untuk membagi aliran volume udara yang dihirup secara proporsional ke kedua belah paru-paru agar proses pertukaran oksigen berlangsung seimbang.",
    penguatan_materi: "Yuk, pelajari lagi bagian Bronkus Utama! Ingat bahwa bronkus adalah 'jalan raya utama bercabang dua' yang menyalurkan udara ke paru kanan dan kiri.",
    funFact: "Bronkus kanan posisinya lebih vertikal dan sedikit lebih pendek daripada bronkus kiri karena rongga dada kiri terbagi bersama jantung! 🫁"
  },
  {
    id: 6,
    title: "Misi 6: Ranting Saluran Halus",
    organName: "Bronkiolus",
    mediaType: "image",
    mediaSrc: "./assets/organ_6_bronkiolus.jpg",
    mediaFallback: "./assets/organ_6_bronkiolus.jpg.jpg",
    question: "Di dalam paru-paru, saluran udara terus bercabang menjadi sangat halus seperti ranting pohon. Apa nama cabang ini dan fungsinya?",
    correctAnswer: "Bronkiolus – Menyalurkan udara lebih dalam lagi, langsung menuju ke kantong-kantong udara kecil.",
    wrongAnswers: [
      "Bronkus Utama – Menghubungkan batang tenggorokan langsung ke anyaman pembuluh kapiler darah.",
      "Silia Paru – Menggerakkan udara keluar dan masuk menggunakan tenaga elastisitas otot antartulang rusuk.",
      "Diafragma Halus – Memompa udara keluar saat tubuh sedang beristirahat atau tertidur lelap."
    ],
    penjelasan_ilmiah: "Bronkiolus adalah percabangan lanjutan dari bronkus yang diameternya semakin mengecil (<1 mm) tanpa cincin tulang rawan, melainkan dilapisi otot polos. Struktur mirip ranting pohon ini berfungsi mendistribusikan udara secara merata ke seluruh alveolus di bagian terdalam paru-paru.",
    penguatan_materi: "Yuk, pelajari lagi bagian Bronkiolus! Ingat analogi pohon: jika trakea adalah batang dan bronkus adalah cabang besar, maka bronkiolus adalah ranting-ranting halusnya.",
    funFact: "Di setiap paru-paru terdapat sekitar 30.000 cabang bronkiolus halus yang berujung langsung pada kantong alveolus! 🌿"
  },
  {
    id: 7,
    title: "Misi 7: Gelembung Anggur Ajaib",
    organName: "Alveolus",
    mediaType: "image",
    mediaSrc: "./assets/organ_7_alveolus.jpg",
    mediaFallback: "./assets/organ_7_alveolus.jpg.jpg",
    question: "Di ujung gelembung-gelembung kecil mirip buah anggur inilah terjadi proses yang menentukan kelangsungan hidup kita. Peristiwa penting apa yang terjadi di dalamnya?",
    correctAnswer: "Tempat terjadinya pertukaran gas oksigen (masuk ke darah) dan karbon dioksida (keluar dari darah).",
    wrongAnswers: [
      "Tempat penyimpanan cadangan oksigen murni saat kita sedang berenang atau menyelam di dalam air.",
      "Tempat pembentukan sel darah merah baru yang bertugas mengangkut nutrisi sari-sari makanan.",
      "Tempat pemusnahan racun dan kuman penyakit oleh semprotan cairan asam lambung alami."
    ],
    penjelasan_ilmiah: "Alveolus adalah kantung mikroskopis tipis yang dikelilingi anyaman kapiler darah. Di sinilah terjadi fungsi pernapasan eksternal paling utama: molekul gas oksigen dari udara berpindah ke sel darah merah, sementara limbah gas karbon dioksida dari darah dibuang ke kantung alveolus untuk dihembuskan keluar.",
    penguatan_materi: "Yuk, pelajari lagi fungsi Alveolus! Ingat gelembung anggur ini sebagai stasiun pertukaran O2 dan CO2 paling krusial di tubuh kita.",
    funFact: "Jika seluruh 300 juta alveolus di paru-paru manusia dibentangkan rata, luas permukaannya mencapai seukuran lapangan tenis! 🍇🎾"
  },
  {
    id: 8,
    title: "Misi 8: Menembus Selaput Kapiler",
    organName: "Proses Difusi Gas",
    mediaType: "video",
    mediaSrc: "./assets/video_alveolus.mp4",
    mediaFallback: "./assets/video_alveolus.mp4.mp4",
    question: "Pada video, molekul gas oksigen terlihat menembus dinding tipis untuk masuk ke aliran darah. Apa nama proses perpindahan ini dan mengapa bisa terjadi?",
    correctAnswer: "Difusi – Proses perpindahan alami zat karena perbedaan kepadatan antara udara di kantong dengan darah di kapiler.",
    wrongAnswers: [
      "Inspirasi – Proses pemompaan gas secara paksa akibat denyut pompa otot jantung yang kencang.",
      "Osmosis Darah – Proses penarikan cairan darah keluar menuju ke rongga kantong udara alveolus.",
      "Ventilasi Mekanik – Gerakan membuka dan menutupnya katup-katup pintu pada pembuluh darah kapiler."
    ],
    penjelasan_ilmiah: "Difusi adalah perpindahan zat terlarut atau gas secara pasif dari area berkonsentrasi tinggi ke area berkonsentrasi rendah. Karena konsentrasi O2 di udara alveolus lebih tinggi daripada di kapiler darah, O2 otomatis meluncur menembus membran tipis alveolus dan dinding pembuluh darah menuju sel darah merah tanpa memerlukan energi aktif.",
    penguatan_materi: "Yuk, pelajari lagi konsep Difusi Gas! Ingat prinsip tetesan teh di air hangat: molekul gas otomatis menyebar dari tempat yang padat ke tempat yang lebih renggang.",
    funFact: "Dinding alveolus dan kapiler darah luar biasa tipis (hanya 1 lapis sel!), membuat gas O2 dan CO2 bertukar seketika lewat difusi! 🔬⚡"
  },
  {
    id: 9,
    title: "Misi 9: Pelindung Paru Rangkap Dua",
    organName: "Selaput Pleura",
    mediaType: "image",
    mediaSrc: "./assets/organ_9_pleura.jpg",
    mediaFallback: "./assets/organ_9_pleura.jpg.jpg",
    question: "Paru-paru tidak pernah lecet meskipun terus bergesekan dengan tulang rusuk. Apa rahasia dari selaput pelindung terluarnya?",
    correctAnswer: "Menghasilkan cairan pelumas khusus di antara lapisannya sehingga paru-paru licin dan aman dari gesekan.",
    wrongAnswers: [
      "Memiliki lapisan tulang rawan keras yang kokoh untuk menahan benturan langsung dari dinding dada.",
      "Mengandung bantalan udara hampa yang membuat paru-paru melayang tanpa menyentuh tulang rusuk.",
      "Menyerap suhu dingin dari luar agar rongga dada selalu sejuk dan tidak mengalami panas berlebih."
    ],
    penjelasan_ilmiah: "Selaput pleura adalah membran ganda (pleura viseral yang menempel di paru-paru dan pleura parietal di dinding dada). Di antara kedua lapisan terdapat rongga pleura berisi cairan serosa pelumas yang mengurangi gaya gesek saat paru-paru mengembang dan mengempis ribuan kali setiap hari.",
    penguatan_materi: "Yuk, pelajari lagi bagian Selaput Pleura! Bayangkan dua kaca basah yang diberi sedikit air sabun: keduanya meluncur mulus tanpa saling menggores.",
    funFact: "Cairan pleura bertindak seperti oli mesin super licin yang menjaga paru-paru tetap mulus meluncur saat kembang kempis! 🛡️"
  },
  {
    id: 10,
    title: "Misi 10: Otot Sekat Pernapasan",
    organName: "Otot Diafragma",
    mediaType: "image",
    mediaSrc: "./assets/organ_10_diafragma.jpg",
    mediaFallback: "./assets/organ_10_diafragma.jpg.jpg",
    question: "Otot berbentuk kubah di bawah paru-paru ini bertindak sebagai pompa utama. Apa yang terjadi jika otot ini bergerak mendatar (berkontraksi)?",
    correctAnswer: "Diafragma – Rongga dada membesar, tekanan udara turun, sehingga udara dari luar otomatis tertarik masuk.",
    wrongAnswers: [
      "Diafragma – Rongga dada menyempit, tekanan udara naik, sehingga udara dari dalam otomatis terdorong keluar.",
      "Otot Antartulang Rusuk – Tulang rusuk bergerak turun ke bawah dan menyebabkan paru-paru mengempis seketika.",
      "Otot Jantung – Memompa darah kotor menuju saluran pernapasan untuk dibersihkan dengan kecepatan tinggi."
    ],
    penjelasan_ilmiah: "Diafragma adalah otot utama inspirasi pernapasan perut. Saat diafragma berkontraksi, posisinya mendatar sehingga volume rongga dada membesar secara vertikal. Pembesaran volume menyebabkan tekanan udara di dalam paru-paru turun di bawah tekanan atmosfer luar, sehingga udara dari luar terhisap masuk secara otomatis.",
    penguatan_materi: "Yuk, pelajari lagi cara kerja Otot Diafragma! Ingat prinsip suntikan jarum: saat tangkainya ditarik ke belakang, udara atau cairan langsung tersedot masuk ke dalam tabung.",
    funFact: "Prinsip kerja diafragma persis seperti suntikan jarum: saat pengisap ditarik ke belakang, cairan atau udara langsung tersedot masuk! 🧘🫁"
  }
];

// Alias struktur data kuis agar kompatibel dengan pemanggilan array quizData
const quizData = DETEKTIF_QUESTIONS;
window.quizData = DETEKTIF_QUESTIONS;

// =========================================================================
// CONTROLLER: TANTANGAN HUB (LOBBY 2 MODE KUIS ARENA TANTANGAN)
// =========================================================================
const TantanganHub = {
  currentMode: 'menu', // 'menu' | 'simulator' | 'detektif'

  // Tampilkan Menu Hub (Lobby 2 Kartu)
  showMenu() {
    this.currentMode = 'menu';
    const hubEl = document.getElementById('tantanganMenuHub');
    const simEl = document.getElementById('tantanganSimulatorSubView');
    const detEl = document.getElementById('tantanganDetektifSubView');

    if (hubEl) {
      hubEl.classList.remove('hidden');
      hubEl.style.display = 'block';
    }
    if (simEl) {
      simEl.classList.add('hidden');
      simEl.style.display = 'none';
    }
    if (detEl) {
      detEl.classList.add('hidden');
      detEl.style.display = 'none';
    }

    // Hentikan timer simulator O2 saat berada di menu utama kuis
    if (window.PuzzleOrgan && typeof PuzzleOrgan.stopO2Depletion === 'function') {
      PuzzleOrgan.stopO2Depletion();
    }

    this.updatePointsUI();
  },

  // Buka Mode Tantangan 1: Simulator Darurat Ruang Kontrol
  openSimulator() {
    this.currentMode = 'simulator';
    const hubEl = document.getElementById('tantanganMenuHub');
    const simEl = document.getElementById('tantanganSimulatorSubView');
    const detEl = document.getElementById('tantanganDetektifSubView');

    if (hubEl) {
      hubEl.classList.add('hidden');
      hubEl.style.display = 'none';
    }
    if (detEl) {
      detEl.classList.add('hidden');
      detEl.style.display = 'none';
    }
    if (simEl) {
      simEl.classList.remove('hidden');
      simEl.style.display = 'block';
    }

    // Inisialisasi simulator ruang kontrol medis & peta progres 10 level
    if (window.PuzzleOrgan) {
      PuzzleOrgan.init();
      PuzzleOrgan.updateProgressUI();
      if (!PuzzleOrgan.state.isLocked && !PuzzleOrgan.isCompleted()) {
        PuzzleOrgan.startTimer();
      }
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (window.App && App.showToast) {
      App.showToast('🚨 Memasuki Ruang Kontrol Simulator Darurat!', 'info');
    }
  },

  // Buka Mode Tantangan 2: Detektif Organ
  openDetektif() {
    this.currentMode = 'detektif';
    const hubEl = document.getElementById('tantanganMenuHub');
    const simEl = document.getElementById('tantanganSimulatorSubView');
    const detEl = document.getElementById('tantanganDetektifSubView');

    if (hubEl) {
      hubEl.classList.add('hidden');
      hubEl.style.display = 'none';
    }
    if (simEl) {
      simEl.classList.add('hidden');
      simEl.style.display = 'none';
    }
    if (detEl) {
      detEl.classList.remove('hidden');
      detEl.style.display = 'block';
    }

    // Hentikan timer simulator
    if (window.PuzzleOrgan && typeof PuzzleOrgan.stopO2Depletion === 'function') {
      PuzzleOrgan.stopO2Depletion();
    }

    // Inisialisasi Kuis Detektif Organ
    DetektifOrgan.init();

    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (window.App && App.showToast) {
      App.showToast('🔍 Mode Detektif Organ Aktif! Pecahkan studi kasus & analisis fungsi organ.', 'info');
    }
  },

  // Perbarui tampilan poin di badge menu hub dari currentUser
  updatePointsUI() {
    const rawActiveName = localStorage.getItem('currentUser') || 
                          (window.AppState && AppState.student && (AppState.student.namaAsli || AppState.student.name)) || '';
    const cleanActiveName = rawActiveName.replace(/\s*\(.*?\)\s*/g, '').trim();
    let currentPts = 0;

    if (cleanActiveName) {
      const pKey = (typeof window.getStudentProgressKey === 'function') 
        ? window.getStudentProgressKey(cleanActiveName) 
        : `progress_${cleanActiveName.toLowerCase().replace(/[^a-z0-9]+/g, '_')}`;
      try {
        const stored = localStorage.getItem(pKey);
        if (stored) {
          const parsed = JSON.parse(stored);
          if (parsed.points !== undefined) currentPts = Number(parsed.points);
          else if (parsed.score !== undefined) currentPts = Number(parsed.score);
        }
      } catch (e) {}
    }

    if (currentPts === 0 && window.AppState && AppState.student) {
      currentPts = Number(AppState.student.points !== undefined ? AppState.student.points : (AppState.student.score || 0));
    }

    const hubBadge = document.getElementById('hubUserPointsBadge');
    if (hubBadge) {
      hubBadge.textContent = `${currentPts.toLocaleString('id-ID')} Poin`;
    }
  }
};

// =========================================================================
// CONTROLLER: DETEKTIF ORGAN (KUIS HOTS & END-OF-QUIZ REVIEW)
// =========================================================================
const DetektifOrgan = {
  questions: DETEKTIF_QUESTIONS,
  state: {
    currentIndex: 0,
    sessionScoreEarned: 0,
    correctCount: 0,
    wrongCount: 0,
    isAnswering: false,
    soundEnabled: true,
    shuffledAnswers: [],
    userAnswers: [] // Riwayat jawaban siswa untuk evaluasi akhir (End-of-Quiz Review)
  },

  audioCtx: null,

  // Inisialisasi Kuis Detektif Organ
  init() {
    this.state.currentIndex = 0;
    this.state.sessionScoreEarned = 0;
    this.state.correctCount = 0;
    this.state.wrongCount = 0;
    this.state.isAnswering = false;
    this.state.userAnswers = []; // Reset riwayat jawaban kuis

    this.updatePointsDisplay();
    this.renderQuestion();
  },

  // Acak Array (Fisher-Yates Shuffle Algorithm)
  shuffleArray(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  },

  // Render Soal Saat Ini
  renderQuestion() {
    const qIndex = this.state.currentIndex;
    const qData = this.questions[qIndex];
    if (!qData) {
      this.finishQuiz();
      return;
    }

    this.state.isAnswering = false;

    // 1. Update Progress Bar & Question Tracker
    const progressPercent = Math.round(((qIndex + 1) / this.questions.length) * 100);
    const progressBar = document.getElementById('detektifProgressBar');
    if (progressBar) {
      progressBar.style.width = `${progressPercent}%`;
    }

    const questionBadge = document.getElementById('detektifQuestionBadge');
    if (questionBadge) {
      questionBadge.textContent = `Misi ${qIndex + 1} / ${this.questions.length}`;
    }

    const questionTag = document.getElementById('detektifQuestionTag');
    if (questionTag) {
      questionTag.textContent = `${qData.title} • Analisis HOTS & Fungsi Organ`;
    }

    // 2. Render Media: Misi 8 (Video Difusi Makro 150%) vs Tag <img> untuk Soal Gambar Lainnya
    const mediaContainer = document.getElementById('detektifMediaContainer');
    if (mediaContainer) {
      // Kondisi khusus: Misi 8 (Difusi Gas / id 8 / index 7 / mediaType === 'video')
      const isVideo = (qData.mediaType === 'video') || (qIndex === 7) || (qData.id === 8);

      if (isVideo) {
        mediaContainer.innerHTML = `
          <div class="video-container video-mask w-full relative overflow-hidden rounded-2xl bg-slate-950 border-2 border-teal-400/50 shadow-lg">
            <video id="detektifVideoEl" src="${qData.mediaSrc}" autoplay loop muted playsinline
              class="video-diffusion-focus pointer-events-none"
              onerror="DetektifOrgan.handleMediaError(this, ${qIndex});">
            </video>
          </div>
        `;
        const vEl = document.getElementById('detektifVideoEl');
        if (vEl) {
          vEl.muted = true;
          vEl.defaultMuted = true;
          const playPromise = vEl.play();
          if (playPromise !== undefined) playPromise.catch(() => {});
        }
      } else {
        mediaContainer.innerHTML = `
          <div class="image-container video-mask w-full relative overflow-hidden rounded-2xl bg-slate-950 border border-slate-700 shadow-md">
            <img id="detektifImgEl" src="${qData.mediaSrc}" alt="${qData.title}"
              class="w-full h-full object-contain p-2 rounded-2xl drop-shadow-md transition-transform duration-300 hover:scale-[1.02]"
              onerror="DetektifOrgan.handleMediaError(this, ${qIndex});" />
          </div>
        `;
      }
    }

    // 3. Render Pertanyaan
    const questionText = document.getElementById('detektifQuestionText');
    if (questionText) {
      questionText.textContent = qData.question;
    }

    // 4. Acak (Shuffle) Posisi Pilihan Jawaban Setiap Soal Dimuat (Fisher-Yates)
    const allAnswers = [
      { text: qData.correctAnswer, isCorrect: true },
      ...qData.wrongAnswers.map(w => ({ text: w, isCorrect: false }))
    ];
    this.state.shuffledAnswers = this.shuffleArray(allAnswers);

    // 5. Render 4 Tombol Pilihan Jawaban
    const answersGrid = document.getElementById('detektifAnswersGrid');
    if (answersGrid) {
      const optionLetters = ['A', 'B', 'C', 'D'];
      answersGrid.innerHTML = this.state.shuffledAnswers.map((opt, idx) => {
        const letter = optionLetters[idx] || (idx + 1);
        return `
          <button type="button" 
            onclick="DetektifOrgan.handleAnswerClick(${idx}, this)"
            id="btnDetektifChoice-${idx}"
            class="btn-detektif-choice p-4 sm:p-4.5 rounded-2xl bg-white/95 hover:bg-white border-2 border-slate-200/90 hover:border-teal-400 shadow-sm hover:shadow-md transition-all text-left flex items-start gap-3.5 cursor-pointer group active:scale-[0.98]">
            <div class="choice-letter-badge w-9 h-9 rounded-xl bg-slate-100 group-hover:bg-teal-500 group-hover:text-white flex items-center justify-center font-black text-xs text-slate-700 transition-colors shrink-0 shadow-2xs mt-0.5">
              ${letter}
            </div>
            <div class="min-w-0 flex-1">
              <span class="choice-text font-heading font-bold text-xs sm:text-sm text-slate-800 group-hover:text-teal-950 block leading-relaxed">
                ${opt.text}
              </span>
            </div>
          </button>
        `;
      }).join('');
    }

    // 6. Sembunyikan Feedback Banner selama kuis berjalan (End-of-Quiz Review Mode)
    const feedbackBanner = document.getElementById('detektifFeedbackBanner');
    if (feedbackBanner) {
      feedbackBanner.classList.add('hidden');
      feedbackBanner.innerHTML = '';
    }
  },

  // Fallback Error Handler Media (Bila gambar/video belum terbaca)
  handleMediaError(el, qIndex) {
    const qData = this.questions[qIndex];
    if (!qData) return;
    const container = document.getElementById('detektifMediaContainer');
    if (el.dataset.fallbackTried) return;
    el.dataset.fallbackTried = 'true';

    let fallbackSrc = qData.mediaFallback;
    if (!fallbackSrc) {
      if (qData.mediaSrc.endsWith('.jpg')) fallbackSrc = qData.mediaSrc + '.jpg';
      else if (qData.mediaSrc.endsWith('.jpg.jpg')) fallbackSrc = qData.mediaSrc.replace('.jpg.jpg', '.jpg');
    }

    if (container && fallbackSrc) {
      const isVideo = (qData.mediaType === 'video') || (qIndex === 7) || (qData.id === 8);
      if (isVideo) {
        container.innerHTML = `
          <div class="video-container video-mask w-full relative overflow-hidden rounded-2xl bg-slate-950 border-2 border-teal-400/50 shadow-lg">
            <video id="detektifVideoEl" src="${fallbackSrc}" autoplay loop muted playsinline
              class="video-diffusion-focus pointer-events-none">
            </video>
          </div>
        `;
        const vEl = document.getElementById('detektifVideoEl');
        if (vEl) {
          vEl.muted = true;
          vEl.play().catch(() => {});
        }
      } else {
        container.innerHTML = `
          <div class="image-container video-mask w-full relative overflow-hidden rounded-2xl bg-slate-950 border border-slate-700 shadow-md">
            <img src="${fallbackSrc}" alt="${qData.title}"
              class="w-full h-full object-contain p-2 rounded-2xl drop-shadow-md" />
          </div>
        `;
      }
    }
  },

  // Handler Klik Pilihan Jawaban (ALUR MULUS TANPA IMMEDIATE FEEDBACK)
  handleAnswerClick(choiceIndex, buttonEl) {
    if (this.state.isAnswering) return;
    this.state.isAnswering = true;

    const currentQuestion = this.questions[this.state.currentIndex];
    const selectedOption = this.state.shuffledAnswers[choiceIndex];
    if (!selectedOption || !currentQuestion) return;

    const isCorrect = !!selectedOption.isCorrect;

    // 1. Simpan riwayat jawaban user ke dalam array userAnswers untuk evaluasi akhir
    this.state.userAnswers.push({
      questionIndex: this.state.currentIndex,
      id: currentQuestion.id,
      title: currentQuestion.title,
      organName: currentQuestion.organName,
      question: currentQuestion.question,
      selectedAnswer: selectedOption.text,
      correctAnswer: currentQuestion.correctAnswer,
      isCorrect: isCorrect,
      penjelasan_ilmiah: currentQuestion.penjelasan_ilmiah,
      penguatan_materi: currentQuestion.penguatan_materi
    });

    // 2. Akumulasi hitungan skor
    if (isCorrect) {
      this.state.correctCount++;
      this.state.sessionScoreEarned += 50;
    } else {
      this.state.wrongCount++;
    }

    // 3. Mainkan audio sentuhan lembut (neutral tap)
    this.playSound('tap');

    // 4. Beri feedback visual seleksi netral tanpa membocorkan jawaban benar/salah
    if (buttonEl) {
      buttonEl.classList.remove('border-slate-200/90', 'hover:border-teal-400', 'bg-white/95');
      buttonEl.classList.add('bg-teal-50', 'border-teal-500', 'ring-4', 'ring-teal-200/80', 'scale-[0.98]');
      const letterBadge = buttonEl.querySelector('.choice-letter-badge');
      if (letterBadge) {
        letterBadge.classList.remove('bg-slate-100', 'text-slate-700');
        letterBadge.classList.add('bg-teal-500', 'text-white');
      }
    }

    // Kunci tombol agar tidak terjadi klik ganda
    const allButtons = document.querySelectorAll('.btn-detektif-choice');
    allButtons.forEach(btn => btn.style.pointerEvents = 'none');

    // Sembunyikan banner feedback selama alur kuis berlangsung
    const feedbackBanner = document.getElementById('detektifFeedbackBanner');
    if (feedbackBanner) {
      feedbackBanner.classList.add('hidden');
      feedbackBanner.innerHTML = '';
    }

    // 5. Alur mulus: otomatis pindah ke soal berikutnya setelah jeda singkat (280ms)
    setTimeout(() => {
      this.state.currentIndex++;
      if (this.state.currentIndex < this.questions.length) {
        this.renderQuestion();
      } else {
        this.finishQuiz();
      }
    }, 280);
  },

  // Selesai Kuis: Simpan Skor & Tampilkan Layar Hasil Akhir (Laporan Penyelidikan)
  finishQuiz() {
    // Akumulasikan skor sesi ke identitas siswa di LocalStorage
    const earned = this.state.sessionScoreEarned;
    const newTotal = this.addPointsToCurrentUser(earned);

    // Tampilkan modal hasil akhir & evaluasi lengkap
    this.showVictoryModal();

    if (window.App && App.showToast) {
      App.showToast(`🔍 Penyelidikan 10 Misi Selesai! Kamu meraih ${this.state.correctCount}/10 jawaban tepat (+${earned} Poin).`, 'success');
    }
  },

  // Simpan / Akumulasikan Poin ke LocalStorage secara spesifik untuk 'currentUser'
  addPointsToCurrentUser(amount) {
    if ((window.AppState && AppState.isSimulationMode) || window.isSimulationMode) {
      // MODE SIMULASI GURU: Jangan simpan ke storage atau data kelas!
      const prevPoints = (window.AppState && AppState.student && AppState.student.points !== undefined) 
        ? Number(AppState.student.points) 
        : 0;
      const newTotalPoints = Math.max(0, prevPoints + amount);

      if (window.AppState && AppState.student) {
        AppState.student.points = newTotalPoints;
        AppState.student.score = newTotalPoints;
      }

      this.updatePointsDisplay();
      return newTotalPoints;
    }

    const rawActiveName = localStorage.getItem('currentUser') || 
                          (window.AppState && AppState.student && (AppState.student.namaAsli || AppState.student.name)) || 
                          'Peneliti Cilik';
    const cleanActiveName = rawActiveName.replace(/\s*\(.*?\)\s*/g, '').trim() || 'Peneliti Cilik';
    const progressKey = (typeof window.getStudentProgressKey === 'function') 
      ? window.getStudentProgressKey(cleanActiveName) 
      : `progress_${cleanActiveName.toLowerCase().replace(/[^a-z0-9]+/g, '_')}`;

    let studentProg = {};
    try {
      const stored = localStorage.getItem(progressKey);
      if (stored) studentProg = JSON.parse(stored);
    } catch (e) {}

    const previousPoints = Number(studentProg.points !== undefined ? studentProg.points : (studentProg.score || (window.AppState && AppState.student ? (AppState.student.points || AppState.student.score) : 0) || 0));
    const newTotalPoints = Math.max(0, previousPoints + amount);

    studentProg.name = cleanActiveName;
    studentProg.namaAsli = cleanActiveName;
    studentProg.username = studentProg.username || cleanActiveName.toLowerCase();
    studentProg.absen = studentProg.absen || (window.AppState && AppState.student ? AppState.student.absen : '') || '';
    studentProg.points = newTotalPoints;
    studentProg.score = newTotalPoints;
    studentProg.lastUpdated = Date.now();

    // Simpan ke LocalStorage key unik
    localStorage.setItem(progressKey, JSON.stringify(studentProg));
    localStorage.setItem('currentUser', cleanActiveName);

    // Sinkronkan ke AppState
    if (window.AppState) {
      if (!AppState.student) AppState.student = {};
      AppState.student.name = cleanActiveName;
      AppState.student.namaAsli = cleanActiveName;
      AppState.student.points = newTotalPoints;
      AppState.student.score = newTotalPoints;
      if (AppState.saveStudent) {
        AppState.saveStudent(AppState.student);
      }
    }

    // Perbarui seluruh indikator poin di DOM
    this.updatePointsDisplay();

    // Perbarui leaderboard di background
    if (window.App && typeof App.renderStudentTop10Leaderboard === 'function') {
      App.renderStudentTop10Leaderboard();
    }

    // Kirim event untuk sinkronisasi seketika
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('student-progress-updated', {
        detail: { key: progressKey, data: studentProg }
      }));
    }

    return newTotalPoints;
  },

  // Perbarui UI Poin
  updatePointsDisplay() {
    const rawActiveName = localStorage.getItem('currentUser') || 
                          (window.AppState && AppState.student && (AppState.student.namaAsli || AppState.student.name)) || '';
    const cleanActiveName = rawActiveName.replace(/\s*\(.*?\)\s*/g, '').trim();
    let currentPts = 0;

    if (cleanActiveName) {
      const pKey = (typeof window.getStudentProgressKey === 'function') 
        ? window.getStudentProgressKey(cleanActiveName) 
        : `progress_${cleanActiveName.toLowerCase().replace(/[^a-z0-9]+/g, '_')}`;
      try {
        const stored = localStorage.getItem(pKey);
        if (stored) {
          const parsed = JSON.parse(stored);
          if (parsed.points !== undefined) currentPts = Number(parsed.points);
          else if (parsed.score !== undefined) currentPts = Number(parsed.score);
        }
      } catch (e) {}
    }

    if (currentPts === 0 && window.AppState && AppState.student) {
      currentPts = Number(AppState.student.points !== undefined ? AppState.student.points : (AppState.student.score || 0));
    }

    const detektifPtsEl = document.getElementById('detektifPointsValue');
    if (detektifPtsEl) {
      detektifPtsEl.textContent = `${currentPts.toLocaleString('id-ID')} Poin`;
    }
    const hubBadge = document.getElementById('hubUserPointsBadge');
    if (hubBadge) {
      hubBadge.textContent = `${currentPts.toLocaleString('id-ID')} Poin`;
    }
    const siswaHeaderPts = document.getElementById('siswaHeaderPoints');
    if (siswaHeaderPts) {
      siswaHeaderPts.textContent = `${currentPts.toLocaleString('id-ID')} Poin`;
    }
    const puzzlePtsEl = document.getElementById('puzzlePointsValue');
    if (puzzlePtsEl) {
      puzzlePtsEl.textContent = `${currentPts.toLocaleString('id-ID')} Poin`;
    }
  },

  // Tampilkan Modal Hasil Akhir Detektif Organ
  showVictoryModal() {
    this.playSound('fanfare');
    this.triggerMiniConfetti();
    setTimeout(() => this.triggerMiniConfetti(), 400);

    const modal = document.getElementById('modalDetektifVictory');
    if (!modal) return;

    modal.classList.remove('hidden');
    modal.classList.add('flex');

    const scoreEarnedEl = document.getElementById('detektifVictoryEarnedScore');
    if (scoreEarnedEl) {
      scoreEarnedEl.textContent = `+${this.state.sessionScoreEarned} Poin`;
    }

    const correctRatioEl = document.getElementById('detektifVictoryCorrectRatio');
    if (correctRatioEl) {
      correctRatioEl.textContent = `${this.state.correctCount} / ${this.questions.length} Soal`;
    }

    const rawActiveName = localStorage.getItem('currentUser') || 
                          (window.AppState && AppState.student && (AppState.student.namaAsli || AppState.student.name)) || 
                          'Peneliti Cilik';
    const cleanActiveName = rawActiveName.replace(/\s*\(.*?\)\s*/g, '').trim() || 'Peneliti Cilik';
    const studentNameEl = document.getElementById('detektifVictoryStudentName');
    if (studentNameEl) {
      studentNameEl.textContent = cleanActiveName;
    }

    // Gelar Dinamis Berdasarkan Akurasi
    const gelarEl = document.getElementById('detektifVictorySpecialTitle');
    if (gelarEl) {
      if (this.state.correctCount === 10) {
        gelarEl.textContent = 'Detektif Anatomi Utama ⭐⭐⭐';
      } else if (this.state.correctCount >= 8) {
        gelarEl.textContent = 'Detektif Anatomi Terampil ⭐⭐';
      } else if (this.state.correctCount >= 6) {
        gelarEl.textContent = 'Detektif Muda Berbakat ⭐';
      } else {
        gelarEl.textContent = 'Penyelidik Pemula 🔍';
      }
    }

    // Render Evaluasi & Pembahasan 10 Soal
    this.renderLaporanPenyelidikan();
  },

  // Render Dashboard Pembahasan (Laporan Penyelidikan 10 Soal)
  renderLaporanPenyelidikan() {
    const listEl = document.getElementById('detektifLaporanList');
    if (!listEl) return;

    listEl.innerHTML = this.state.userAnswers.map((ans, idx) => {
      const isCorrect = ans.isCorrect;
      const statusIcon = isCorrect ? 'check_circle' : 'cancel';
      const statusClass = isCorrect 
        ? 'text-emerald-700 bg-emerald-50 border-emerald-300' 
        : 'text-rose-700 bg-rose-50 border-rose-300';
      const statusLabel = isCorrect ? 'Analisis Tepat' : 'Kurang Tepat';

      return `
        <div class="p-4 sm:p-5 rounded-2xl bg-white border-2 ${isCorrect ? 'border-emerald-200 shadow-xs' : 'border-rose-200 shadow-xs'} text-left flex flex-col gap-3 transition-all hover:shadow-md">
          
          <!-- Header Bar: Nomor, Judul Misi & Status -->
          <div class="flex items-start justify-between gap-2.5 pb-2 border-b border-slate-100">
            <div class="flex items-center gap-2 min-w-0">
              <span class="w-7 h-7 rounded-xl ${isCorrect ? 'bg-emerald-500' : 'bg-rose-500'} text-white flex items-center justify-center font-black text-xs shrink-0 shadow-xs">
                ${idx + 1}
              </span>
              <div class="min-w-0">
                <span class="font-heading font-black text-xs sm:text-sm text-slate-800 block truncate">
                  ${ans.title}
                </span>
                <span class="text-[10px] font-bold text-teal-700 uppercase tracking-wider block">
                  Organ: ${ans.organName}
                </span>
              </div>
            </div>

            <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-black border ${statusClass} shrink-0">
              <span class="material-symbols-outlined text-[15px]">${statusIcon}</span>
              <span>${statusLabel}</span>
            </div>
          </div>

          <!-- Pertanyaan Studi Kasus -->
          <div class="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
            ${ans.question}
          </div>

          <!-- Perbandingan Jawaban Siswa vs Kunci Jawaban -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            <div class="p-3 rounded-xl border ${isCorrect ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950' : 'bg-rose-50/70 border-rose-200 text-rose-950'} flex flex-col gap-1">
              <span class="text-[10px] font-extrabold uppercase tracking-wider ${isCorrect ? 'text-emerald-700' : 'text-rose-700'} flex items-center gap-1">
                <span class="material-symbols-outlined text-[14px]">${isCorrect ? 'check' : 'close'}</span>
                <span>Jawaban Kamu:</span>
              </span>
              <p class="font-heading font-bold leading-snug">
                ${ans.selectedAnswer}
              </p>
            </div>

            <div class="p-3 rounded-xl border bg-teal-50/70 border-teal-200 text-teal-950 flex flex-col gap-1">
              <span class="text-[10px] font-extrabold uppercase tracking-wider text-teal-700 flex items-center gap-1">
                <span class="material-symbols-outlined text-[14px]">verified</span>
                <span>Kunci Jawaban yang Benar:</span>
              </span>
              <p class="font-heading font-bold leading-snug text-teal-900">
                ${ans.correctAnswer}
              </p>
            </div>
          </div>

          <!-- Penjelasan Ilmiah (Mengapa Jawaban Tersebut Benar) -->
          <div class="p-3.5 rounded-xl bg-sky-50/80 border border-sky-200 text-xs text-sky-950">
            <div class="flex items-center gap-1.5 font-heading font-extrabold text-[11px] text-sky-800 uppercase tracking-wider mb-1">
              <span class="material-symbols-outlined text-[16px] text-sky-600">lightbulb</span>
              <span>Penjelasan Ilmiah:</span>
            </div>
            <p class="leading-relaxed font-medium text-slate-700">
              ${ans.penjelasan_ilmiah}
            </p>
          </div>

          <!-- Penguatan Materi (HANYA tampil jika jawaban siswa salah) -->
          ${!isCorrect && ans.penguatan_materi ? `
            <div class="p-3.5 rounded-xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-300 text-xs text-amber-950">
              <div class="flex items-center gap-1.5 font-heading font-extrabold text-[11px] text-amber-800 uppercase tracking-wider mb-1">
                <span class="material-symbols-outlined text-[16px] text-amber-600">psychology</span>
                <span>Penguatan Materi:</span>
              </div>
              <p class="leading-relaxed font-bold text-amber-900">
                ${ans.penguatan_materi}
              </p>
            </div>
          ` : ''}

        </div>
      `;
    }).join('');
  },

  // Toggle Buka / Tutup Area Laporan Penyelidikan
  toggleLaporanPenyelidikan() {
    const sec = document.getElementById('detektifLaporanSection');
    const text = document.getElementById('btnToggleDetektifLaporanText');
    const icon = document.getElementById('btnToggleDetektifLaporanIcon');
    if (!sec) return;

    if (sec.classList.contains('hidden')) {
      sec.classList.remove('hidden');
      if (text) text.textContent = 'Sembunyikan Laporan Penyelidikan';
      if (icon) icon.textContent = 'expand_less';
      sec.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    } else {
      sec.classList.add('hidden');
      if (text) text.textContent = 'Lihat Laporan Penyelidikan (Pembahasan 10 Soal)';
      if (icon) icon.textContent = 'expand_more';
    }
  },

  closeVictoryModal() {
    const modal = document.getElementById('modalDetektifVictory');
    if (modal) {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    }
  },

  // Main Lagi (Ulangi Kuis Detektif Organ)
  restart() {
    this.closeVictoryModal();
    this.init();
    if (window.App && App.showToast) {
      App.showToast('Misi Detektif Organ diulang! Posisi opsi jawaban diacak kembali.', 'info');
    }
  },

  // Toggle Suara
  toggleSound() {
    this.state.soundEnabled = !this.state.soundEnabled;
    const soundText = document.getElementById('detektifSoundText');
    const soundIcon = document.getElementById('detektifSoundIcon');
    if (soundText) soundText.textContent = this.state.soundEnabled ? 'Suara: Aktif' : 'Suara: Hening';
    if (soundIcon) soundIcon.textContent = this.state.soundEnabled ? 'volume_up' : 'volume_off';
  },

  // Procedural Web Audio API Sounds
  playSound(type) {
    if (!this.state.soundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      if (!this.audioCtx) this.audioCtx = new AudioCtx();
      if (this.audioCtx.state === 'suspended') this.audioCtx.resume();

      const ctx = this.audioCtx;
      const now = ctx.currentTime;

      if (type === 'tap') {
        // Nada Klik Halus untuk Seleksi Opsi Tanpa Membocorkan Jawaban
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.04);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.05);
      } else if (type === 'correct') {
        // Nada Ceria Arpeggio C5 -> E5 -> G5 -> C6
        const notes = [523.25, 659.25, 783.99, 1046.5];
        notes.forEach((freq, i) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, now + i * 0.08);
          gain.gain.setValueAtTime(0.12, now + i * 0.08);
          gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.08 + 0.18);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + i * 0.08);
          osc.stop(now + i * 0.08 + 0.2);
        });
      } else if (type === 'wrong') {
        // Nada Buzzer Turun
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(220, now);
        osc.frequency.exponentialRampToValueAtTime(140, now + 0.25);
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.3);
      } else if (type === 'fanfare') {
        // Fanfare Kemenangan
        const chords = [523.25, 659.25, 783.99, 1046.5, 1318.5];
        chords.forEach((f, i) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(f, now + i * 0.1);
          gain.gain.setValueAtTime(0.15, now + i * 0.1);
          gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.1 + 0.6);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + i * 0.1);
          osc.stop(now + i * 0.1 + 0.65);
        });
      }
    } catch (e) {}
  },

  // Efek Konfeti Mini
  triggerMiniConfetti() {
    if (window.PuzzleOrgan && typeof PuzzleOrgan.triggerConfetti === 'function') {
      PuzzleOrgan.triggerConfetti();
    }
  },

  // Stop Timer placeholder
  stopTimer() {}
};

// Expose to window globally
window.TantanganHub = TantanganHub;
window.DetektifOrgan = DetektifOrgan;

