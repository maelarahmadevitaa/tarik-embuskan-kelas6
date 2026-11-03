/**
 * State Management & LocalStorage Persistence
 * Aplikasi: "Tarik dan Embuskan: Sistem Pernapasan Manusia"
 * IPA Kelas 6 SD - Kurikulum Merdeka
 */

const STORAGE_KEYS = {
  CURRENT_USER: 'tarik_embus_current_user',
  TEACHER_PROFILE: 'tarik_embus_teacher_profile',
  STUDENT_PROFILE: 'tarik_embus_student_profile',
  STUDENTS_LIST: 'tarik_embus_students_list',
  REGISTERED_STUDENTS: 'tarik_embus_registered_students',
  REFLECTIONS: 'tarik_embus_reflections',
  ACTIVE_SCREEN: 'tarik_embus_active_screen',
  LEARNED_TOPICS: 'tarik_embus_learned_topics'
};

// Helper: Generate key unik LocalStorage per nama siswa (contoh: progress_akbar_faizi_azfar)
function getStudentProgressKey(name) {
  if (!name) return '';
  const clean = String(name).toLowerCase().trim()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '');
  return `progress_${clean}`;
}

if (typeof window !== 'undefined') {
  window.getStudentProgressKey = getStudentProgressKey;
}

// Default Teacher Profile (Pembaruan Profil: Maela Rahma Devita, Tanpa NIP, SDIT Insan Robbani)
const DEFAULT_TEACHER = {
  name: 'Maela Rahma Devita',
  nip: '',
  school: 'SDIT Insan Robbani',
  classCode: 'IPA6-NAPAS-24',
  avatar: 'guru-1', // Default avatar ID or base64 dataUrl
  customPhoto: null
};

// Database 27 Siswa Asli Kelas 6 HOS Cokroaminoto - SDIT Insan Robbani (Reset Awal Nol Mutlak)
const STUDENTS_DATABASE = [
  { absen: "1", namaAsli: "Akbar Faizi Azfar", username: "akbar faizi azfar", password: "akbar.siswa", score: 0, level: 0, mastery: 0, status: "Belum Mulai" },
  { absen: "2", namaAsli: "Aldo Irhab Syahir", username: "aldo irhab syahir", password: "aldo.siswa", score: 0, level: 0, mastery: 0, status: "Belum Mulai" },
  { absen: "3", namaAsli: "Alika Naila Putri", username: "alika naila putri", password: "alika.siswa", score: 0, level: 0, mastery: 0, status: "Belum Mulai" },
  { absen: "4", namaAsli: "Azmi Adlan Nabihan", username: "azmi adlan nabihan", password: "azmi.siswa", score: 0, level: 0, mastery: 0, status: "Belum Mulai" },
  { absen: "5", namaAsli: "Bilqis Khoirunnisa", username: "bilqis khoirunnisa", password: "bilqis.siswa", score: 0, level: 0, mastery: 0, status: "Belum Mulai" },
  { absen: "6", namaAsli: "Dhandy Akbar Hermawan", username: "dhandy akbar hermawan", password: "dhandy.siswa", score: 0, level: 0, mastery: 0, status: "Belum Mulai" },
  { absen: "7", namaAsli: "Dzakira Talita Zahra", username: "dzakira talita zahra", password: "dzakira.siswa", score: 0, level: 0, mastery: 0, status: "Belum Mulai" },
  { absen: "8", namaAsli: "Fahma Rausyandini", username: "fahma rausyandini", password: "fahma.siswa", score: 0, level: 0, mastery: 0, status: "Belum Mulai" },
  { absen: "9", namaAsli: "Farras Shidqiyah Arrasyid", username: "farras shidqiyah arrasyid", password: "farras.siswa", score: 0, level: 0, mastery: 0, status: "Belum Mulai" },
  { absen: "10", namaAsli: "Fatimah Azzahra", username: "fatimah azzahra", password: "fatimah.siswa", score: 0, level: 0, mastery: 0, status: "Belum Mulai" },
  { absen: "11", namaAsli: "Justin Azzam", username: "justin azzam", password: "justin.siswa", score: 0, level: 0, mastery: 0, status: "Belum Mulai" },
  { absen: "12", namaAsli: "Khanza Queen Al'Rifath", username: "khanza queen al'rifath", password: "khanza.siswa", score: 0, level: 0, mastery: 0, status: "Belum Mulai" },
  { absen: "13", namaAsli: "Khoirul Huda Abimanyu", username: "khoirul huda abimanyu", password: "khoirul.siswa", score: 0, level: 0, mastery: 0, status: "Belum Mulai" },
  { absen: "14", namaAsli: "Kirania", username: "kirania", password: "kirania.siswa", score: 0, level: 0, mastery: 0, status: "Belum Mulai" },
  { absen: "15", namaAsli: "M. Diaz Aqsa Al Noah", username: "m. diaz aqsa al noah", password: "diaz.siswa", score: 0, level: 0, mastery: 0, status: "Belum Mulai" },
  { absen: "16", namaAsli: "M. Nizhom Abid", username: "m. nizhom abid", password: "nizhom.siswa", score: 0, level: 0, mastery: 0, status: "Belum Mulai" },
  { absen: "17", namaAsli: "Meysa Salsabila Azzahra", username: "meysa salsabila azzahra", password: "meysa.siswa", score: 0, level: 0, mastery: 0, status: "Belum Mulai" },
  { absen: "18", namaAsli: "Muhamad Faiq Tara Satra", username: "muhamad faiq tara satra", password: "faiq.siswa", score: 0, level: 0, mastery: 0, status: "Belum Mulai" },
  { absen: "19", namaAsli: "Muhammad Ahsan Adelio", username: "muhammad ahsan adelio", password: "ahsan.siswa", score: 0, level: 0, mastery: 0, status: "Belum Mulai" },
  { absen: "20", namaAsli: "Muhammad Al Fandi", username: "muhammad al fandi", password: "alfandi.siswa", score: 0, level: 0, mastery: 0, status: "Belum Mulai" },
  { absen: "21", namaAsli: "Muhammad Arkan Said Ramadhan", username: "muhammad arkan said ramadhan", password: "arkan.siswa", score: 0, level: 0, mastery: 0, status: "Belum Mulai" },
  { absen: "22", namaAsli: "Muhammad Khalid Al Faruq", username: "muhammad khalid al faruq", password: "khalid.siswa", score: 0, level: 0, mastery: 0, status: "Belum Mulai" },
  { absen: "23", namaAsli: "Muhammad Rizky Alfredo", username: "muhammad rizky alfredo", password: "rizky.siswa", score: 0, level: 0, mastery: 0, status: "Belum Mulai" },
  { absen: "24", namaAsli: "Naura Attaya Youngky", username: "naura attaya youngky", password: "naura.siswa", score: 0, level: 0, mastery: 0, status: "Belum Mulai" },
  { absen: "25", namaAsli: "Nazla Nur Aliyyu Putri", username: "nazla nur aliyyu putri", password: "nazla.siswa", score: 0, level: 0, mastery: 0, status: "Belum Mulai" },
  { absen: "26", namaAsli: "Qaila Adzkia Fakhira", username: "qaila adzkia fakhira", password: "qaila.siswa", score: 0, level: 0, mastery: 0, status: "Belum Mulai" },
  { absen: "27", namaAsli: "Ziya Azizi Al Yansyah", username: "ziya azizi al yansyah", password: "ziya.siswa", score: 0, level: 0, mastery: 0, status: "Belum Mulai" }
];

// Helper validasi kata sandi siswa secara presisi
function verifyStudentPassword(student, inputPassword) {
  if (!student || !inputPassword) return false;
  const p = String(inputPassword).toLowerCase().trim();

  // 1. Cocok persis dengan kata sandi bawaan siswa di database
  if (student.password && p === String(student.password).toLowerCase().trim()) return true;

  // 2. Cocok dengan kata sandi tersimpan di progress siswa
  const pKey = getStudentProgressKey(student.namaAsli || student.name);
  try {
    const rawProg = localStorage.getItem(pKey);
    if (rawProg) {
      const prog = JSON.parse(rawProg);
      if (prog.password && p === String(prog.password).toLowerCase().trim()) return true;
    }
  } catch (e) {}

  // 3. Cocok dengan kata sandi di daftar registrasi tersimpan
  if (typeof AppState !== 'undefined' && AppState.getRegisteredStudents) {
    const registered = AppState.getRegisteredStudents();
    const regMatch = registered.find(s => 
      (s.namaAsli && s.namaAsli.toLowerCase() === (student.namaAsli || student.name || '').toLowerCase()) ||
      (s.absen && String(s.absen) === String(student.absen))
    );
    if (regMatch && regMatch.password && p === String(regMatch.password).toLowerCase().trim()) return true;
  }

  // 4. Toleransi nama panggilan / kata dalam nama + .siswa
  const cleanWords = (student.namaAsli || student.name || '').toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter(w => w.length > 1);
  for (const w of cleanWords) {
    if (p === `${w}.siswa`) return true;
  }
  const allTogether = cleanWords.join('');
  if (p === `${allTogether}.siswa`) return true;

  return false;
}

if (typeof window !== 'undefined') {
  window.STUDENTS_DATABASE = STUDENTS_DATABASE;
  window.verifyStudentPassword = verifyStudentPassword;
}

// Default Student Profile (Skor Awal Nol Mutlak)
const DEFAULT_STUDENT = {
  absen: "1",
  name: "Akbar Faizi Azfar",
  namaAsli: "Akbar Faizi Azfar",
  username: "akbar faizi azfar",
  avatar: "siswa-banu", // Default avatar ID or base64 dataUrl
  customPhoto: null,
  characterName: "Akbar (Peneliti Cilik)",
  points: 0,
  score: 0,
  lives: 3,
  level: 0,
  mastery: 0,
  status: "Belum Mulai",
  streak: 0
};

// Initial 27 Students List for Diagnostics & Leaderboard (Reset Awal Nol Mutlak)
const INITIAL_STUDENTS = STUDENTS_DATABASE.map((std, idx) => {
  const avatars = ['siswa-banu', 'siswa-dara', 'siswa-ian', 'siswa-aga', 'siswa-mia'];
  const avatar = avatars[idx % avatars.length];
  return {
    id: 'std-' + std.absen,
    absen: std.absen,
    name: std.namaAsli,
    namaAsli: std.namaAsli,
    username: std.username,
    password: std.password,
    avatar: avatar,
    points: 0,
    score: 0,
    lives: 3,
    level: 0,
    mastery: 0,
    status: 'Belum Mulai',
    rank: idx + 1,
    errors: { laring: 0, alveoli: 0, diafragma: 0, bronkus: 0, hidung: 0 }
  };
});

// Initial Diagnostic Topics & Error Rates
const DIAGNOSTIC_TOPICS = [
  {
    id: 'laring_trakea',
    title: 'Identifikasi Laring vs Trakea',
    organ: 'Laring & Trakea (Pita Suara & Saluran Udara)',
    errorRate: 62,
    wrongCount: 18,
    totalAssessed: 28,
    difficulty: 'Tinggi',
    badgeColor: 'error',
    description: 'Siswa sering tertukar membedakan fungsi pita suara di laring dengan cincin tulang rawan pada trakea.',
    pedagogyTip: 'Gunakan analogi pita getar alat musik dan selang spiral penyedot debu untuk membedakan struktur fisiknya.'
  },
  {
    id: 'alveoli_difusi',
    title: 'Pertukaran Gas di Alveoli (Difusi O₂ & CO₂)',
    organ: 'Alveolus (Kantung Udara Mikroskopis)',
    errorRate: 54,
    wrongCount: 15,
    totalAssessed: 28,
    difficulty: 'Tinggi',
    badgeColor: 'tertiary',
    description: 'Sebagian besar siswa kesulitan membayangkan proses difusi gas menembus selaput tipis kapiler darah.',
    pedagogyTip: 'Putar simulasi Lab 3D perbesaran 1000x alveolus dan gunakan analogi saringan teh halus untuk menggambarkan difusi.'
  },
  {
    id: 'otot_diafragma',
    title: 'Gerak Otot Diafragma & Tulang Rusuk',
    organ: 'Diafragma & Rongga Dada',
    errorRate: 45,
    wrongCount: 13,
    totalAssessed: 28,
    difficulty: 'Sedang',
    badgeColor: 'primary',
    description: 'Siswa kerap terbalik: saat tarik napas, diafragma justru mendatar/berkontraksi, bukan melengkung ke atas.',
    pedagogyTip: 'Lakukan peragaan langsung tarik napas perut dan gunakan botol plastik berbalon sebagai media peraga nyata.'
  },
  {
    id: 'bronkus_bronkiolus',
    title: 'Percabangan Bronkus & Bronkiolus',
    organ: 'Bronkus & Bronkiolus (Pohon Paru)',
    errorRate: 28,
    wrongCount: 8,
    totalAssessed: 28,
    difficulty: 'Rendah',
    badgeColor: 'secondary',
    description: 'Mayoritas siswa dapat mengidentifikasi bronkus primer kiri-kanan, namun sedikit ragu pada cabang halus bronkiolus.',
    pedagogyTip: 'Tampilkan gambar pohon beringin terbalik agar siswa mudah mengingat percabangan cabang besar ke ranting.'
  },
  {
    id: 'hidung_silia',
    title: 'Rongga Hidung, Rambut Silia & Lendir',
    organ: 'Hidung (Penyaring Udara Alami)',
    errorRate: 7,
    wrongCount: 2,
    totalAssessed: 28,
    difficulty: 'Sangat Rendah',
    badgeColor: 'secondary',
    description: 'Materi ini paling mudah dipahami siswa karena relevan langsung dengan pengalaman sensorik sehari-hari.',
    pedagogyTip: 'Pertahankan metode apersepsi mengaitkan hidung tersumbat saat flu dan debu jalanan.'
  }
];

// Initial Reflections Log
const INITIAL_REFLECTIONS = [
  {
    id: 'ref-1728900000000',
    date: '14 Okt 2026, 08:45 WIB',
    aspect1: 'Siswa cenderung keliru membedakan volume udara saat beraktivitas santai vs olahraga lari. Konsep alveolus sebagai kantung mikroskopis butuh analogi kantung anggur berbusa.',
    aspect2: 'Metode Simulasi 3D Interaktif terbukti meningkatkan antusiasme 92% siswa dibanding gambar buku konvensional. Siswa berebut memutar anatomi paru 360° di tablet.',
    aspect3: 'Disarankan menambah latihan pernapasan berirama (Breathing Coach) dengan suara deburan ombak sebelum kuis dimulai agar siswa lebih tenang dan fokus.'
  },
  {
    id: 'ref-1728813600000',
    date: '12 Okt 2026, 10:15 WIB',
    aspect1: 'Sebanyak 38% siswa belum memahami bahwa diafragma mendatar saat menarik napas. Perlu peragaan botol berbalon karet di depan kelas.',
    aspect2: 'Pemberian apresiasi poin bintang dan lencana "Dokter Cilik" sangat efektif menumbuhkan kompetisi sehat antarkelompok belajar.',
    aspect3: 'Tambahkan tombol reset zoom di Lab 3D agar siswa tidak bingung jika model anatomi tergeser terlalu jauh.'
  }
];

// State Manager Object
const AppState = {
  // Current active screen: 'screen-portal', 'screen-guru', 'screen-siswa', 'screen-materi', 'screen-lab', 'screen-tantangan'
  activeScreen: 'screen-portal',

  // Current session
  currentUser: null,

  // Stored Teacher Data
  teacher: null,

  // Stored Student Data
  student: null,

  // Mode Simulasi Guru Flag (Proteksi Metrik Kelas)
  isSimulationMode: false,

  // Stored Students List
  students: [],

  // Stored Reflections
  reflections: [],

  // Diagnostics
  diagnostics: DIAGNOSTIC_TOPICS,

  // Learned Topics (Array of sub-topic IDs)
  learnedTopics: [],

  // Initialize
  init() {
    // Load Teacher Profile (Pembaruan Profil: Maela Rahma Devita, Tanpa NIP, SDIT Insan Robbani)
    const savedTeacher = localStorage.getItem(STORAGE_KEYS.TEACHER_PROFILE);
    if (savedTeacher) {
      try {
        this.teacher = { ...DEFAULT_TEACHER, ...JSON.parse(savedTeacher) };
      } catch (e) {
        this.teacher = { ...DEFAULT_TEACHER };
      }
    } else {
      this.teacher = { ...DEFAULT_TEACHER };
      localStorage.setItem(STORAGE_KEYS.TEACHER_PROFILE, JSON.stringify(this.teacher));
    }

    // Load Student Profile
    const savedStudent = localStorage.getItem(STORAGE_KEYS.STUDENT_PROFILE);
    if (savedStudent) {
      try {
        this.student = JSON.parse(savedStudent);
        if (this.student.points === undefined) this.student.points = this.student.score || 0;
        if (this.student.score === undefined) this.student.score = this.student.points || 0;
      } catch (e) {
        this.student = { ...DEFAULT_STUDENT };
      }
    } else {
      this.student = { ...DEFAULT_STUDENT };
    }

    // Periksa jika ada identitas aktif tersimpan di 'currentUser' LocalStorage
    const activeUserName = localStorage.getItem("currentUser");
    if (activeUserName && typeof activeUserName === 'string' && activeUserName.trim()) {
      const cleanName = activeUserName.trim();
      if (!this.student) {
        this.student = { name: cleanName, namaAsli: cleanName, points: 0, score: 0, lives: 3, level: 0, mastery: 0, status: 'Belum Mulai' };
      } else {
        this.student.name = cleanName;
        this.student.namaAsli = cleanName;
      }
      const activePKey = getStudentProgressKey(cleanName);
      const savedActiveProg = localStorage.getItem(activePKey);
      if (savedActiveProg) {
        try {
          const prog = JSON.parse(savedActiveProg);
          this.student = { ...this.student, ...prog };
          if (this.student.points === undefined) this.student.points = this.student.score || 0;
          if (this.student.score === undefined) this.student.score = this.student.points || 0;
          if (Array.isArray(prog.learnedTopics)) {
            this.learnedTopics = [...prog.learnedTopics];
            localStorage.setItem(STORAGE_KEYS.LEARNED_TOPICS, JSON.stringify(this.learnedTopics));
          }
        } catch (e) {}
      }
    } else if (this.student && (this.student.namaAsli || this.student.name)) {
      const activePKey = getStudentProgressKey(this.student.namaAsli || this.student.name);
      const savedActiveProg = localStorage.getItem(activePKey);
      if (savedActiveProg) {
        try {
          const prog = JSON.parse(savedActiveProg);
          this.student = { ...this.student, ...prog };
          if (this.student.points === undefined) this.student.points = this.student.score || 0;
          if (this.student.score === undefined) this.student.score = this.student.points || 0;
          if (Array.isArray(prog.learnedTopics)) {
            this.learnedTopics = [...prog.learnedTopics];
            localStorage.setItem(STORAGE_KEYS.LEARNED_TOPICS, JSON.stringify(this.learnedTopics));
          }
        } catch (e) {}
      }
    }

    // Load Registered Students List (Open Registration)
    this.registeredStudents = this.getRegisteredStudents();

    // Load Students List (Data 27 Siswa Asli Kelas 6 HOS Cokroaminoto - Reset Nol Mutlak)
    const savedStudents = localStorage.getItem(STORAGE_KEYS.STUDENTS_LIST);
    let parsedStudents = null;
    try {
      if (savedStudents) parsedStudents = JSON.parse(savedStudents);
    } catch (e) {
      parsedStudents = null;
    }
    // Cek jika terdapat data dummy lama (Budi Santoso, Siti Aisyah, Dimas Rizky) atau data belum berisi 27 siswa asli
    const hasDummyData = parsedStudents && parsedStudents.some(s => 
      s.name.includes('Budi') || s.name.includes('Aisyah') || s.name.includes('Dimas') || s.name.includes('Santoso')
    );
    if (!parsedStudents || !Array.isArray(parsedStudents) || parsedStudents.length !== 27 || hasDummyData) {
      this.students = INITIAL_STUDENTS.map(s => ({ ...s }));
    } else {
      this.students = parsedStudents;
    }

    // Sinkronkan setiap siswa dengan key unik progress_${cleanName} di LocalStorage
    this.students.forEach(std => {
      const pKey = getStudentProgressKey(std.namaAsli || std.name);
      const savedProg = localStorage.getItem(pKey);
      if (savedProg) {
        try {
          const prog = JSON.parse(savedProg);
          if (prog.level !== undefined) std.level = Number(prog.level);
          if (prog.mastery !== undefined) std.mastery = Number(prog.mastery);
          if (prog.score !== undefined) std.score = Number(prog.score);
          if (prog.points !== undefined) std.points = Number(prog.points);
          if (prog.status) std.status = prog.status;
          if (prog.lives !== undefined) std.lives = Number(prog.lives);
        } catch (e) {}
      } else {
        // Jika belum pernah ada progress di LocalStorage, set angka nol mutlak!
        std.level = 0;
        std.mastery = 0;
        std.points = 0;
        std.score = 0;
        std.status = 'Belum Mulai';
      }
    });
    localStorage.setItem(STORAGE_KEYS.STUDENTS_LIST, JSON.stringify(this.students));

    // Load Reflections
    const savedReflections = localStorage.getItem(STORAGE_KEYS.REFLECTIONS);
    this.reflections = savedReflections ? JSON.parse(savedReflections) : [...INITIAL_REFLECTIONS];

    // Load Learned Topics (Awal kosong / 0%, utamakan data siswa aktif jika ada)
    if (this.student && Array.isArray(this.student.learnedTopics) && this.student.learnedTopics.length > 0) {
      this.learnedTopics = [...this.student.learnedTopics];
      localStorage.setItem(STORAGE_KEYS.LEARNED_TOPICS, JSON.stringify(this.learnedTopics));
    } else {
      const savedTopics = localStorage.getItem(STORAGE_KEYS.LEARNED_TOPICS);
      this.learnedTopics = savedTopics ? JSON.parse(savedTopics) : [];
      if (this.student && (!this.student.learnedTopics || this.student.learnedTopics.length === 0)) {
        this.student.learnedTopics = [...this.learnedTopics];
      }
    }

    // Sync student mastery if topics learned exist
    const progress = this.getLearnedProgress();
    if (this.student && this.learnedTopics && this.learnedTopics.length > 0) {
      this.student.mastery = Math.max(this.student.mastery || 0, progress.percentage);
    }

    // Load Active Screen or default to screen-portal
    const savedScreen = localStorage.getItem(STORAGE_KEYS.ACTIVE_SCREEN);
    if (savedScreen) {
      this.activeScreen = savedScreen;
    }

    // Load Current User session
    const savedUser = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    if (savedUser) {
      this.currentUser = JSON.parse(savedUser);
    }
  },

  // Sinkronkan ulang data siswa kelas dari LocalStorage
  syncStudentsFromStorage() {
    const savedStudents = localStorage.getItem(STORAGE_KEYS.STUDENTS_LIST);
    if (savedStudents) {
      try {
        this.students = JSON.parse(savedStudents);
      } catch (e) {}
    }
  },

  // Save Teacher Profile
  saveTeacher(data) {
    this.teacher = { ...this.teacher, ...data };
    localStorage.setItem(STORAGE_KEYS.TEACHER_PROFILE, JSON.stringify(this.teacher));
  },

  // Get Registered Students (Open Registration)
  getRegisteredStudents() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.REGISTERED_STUDENTS);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  },

  // Save Registered Students List
  saveRegisteredStudents(list) {
    this.registeredStudents = list;
    localStorage.setItem(STORAGE_KEYS.REGISTERED_STUDENTS, JSON.stringify(list));
  },

  // Sync Active Student with Registered List
  syncActiveStudentWithRegistered() {
    if (this.isSimulationMode || (typeof window !== 'undefined' && window.isSimulationMode)) return;
    if (!this.student) return;
    const cleanActiveName = (this.student.namaAsli || this.student.name || '').toLowerCase().trim().replace(/\s+/g, ' ');
    const registered = this.getRegisteredStudents();
    const idx = registered.findIndex(s => {
      const sName = (s.namaAsli || s.name || '').toLowerCase().trim().replace(/\s+/g, ' ');
      const sUser = (s.username || '').toLowerCase().trim().replace(/\s+/g, ' ');
      return sName === cleanActiveName || sUser === cleanActiveName;
    });
    if (idx >= 0) {
      registered[idx] = {
        ...registered[idx],
        ...this.student,
        password: registered[idx].password // Preserve registered password
      };
      this.saveRegisteredStudents(registered);
    }
  },

  // Get student progress key helper
  getStudentProgressKey(name) {
    return getStudentProgressKey(name);
  },

  // Save Student Profile & Simpan Progress Real-Time ke Key Unik LocalStorage (progress_${cleanName})
  saveStudent(data) {
    if (this.isSimulationMode || (typeof window !== 'undefined' && window.isSimulationMode)) {
      this.student = { ...this.student, ...data };
      return;
    }

    this.student = { ...this.student, ...data };

    // Pastikan riwayat learnedTopics dan solvedLevels selalu sinkron
    if ((!this.student.learnedTopics || this.student.learnedTopics.length === 0) && this.learnedTopics && this.learnedTopics.length > 0) {
      this.student.learnedTopics = [...this.learnedTopics];
    }
    if (!this.student.solvedLevels && typeof window !== 'undefined' && window.PuzzleOrgan && window.PuzzleOrgan.state && window.PuzzleOrgan.state.solvedLevels) {
      this.student.solvedLevels = { ...window.PuzzleOrgan.state.solvedLevels };
    }

    localStorage.setItem(STORAGE_KEYS.STUDENT_PROFILE, JSON.stringify(this.student));

    // Update individual student progress key: progress_${cleanName}
    const studentName = this.student.namaAsli || this.student.name;
    if (studentName) {
      const progressKey = getStudentProgressKey(studentName);
      const lvl = this.student.level !== undefined ? Number(this.student.level) : 0;
      const mst = this.student.mastery !== undefined ? Number(this.student.mastery) : 0;
      const pts = this.student.points !== undefined ? Number(this.student.points) : (Number(this.student.score) || 0);
      const sc = this.student.score !== undefined ? Number(this.student.score) : pts;
      const stt = this.student.status || (mst >= 100 ? 'Tuntas' : (mst > 0 ? 'Sedang Belajar' : 'Belum Mulai'));

      const progressData = {
        name: studentName,
        namaAsli: studentName,
        username: this.student.username || studentName.toLowerCase(),
        absen: this.student.absen || '',
        password: this.student.password || '',
        level: lvl,
        mastery: mst,
        score: sc,
        points: pts,
        lives: this.student.lives !== undefined ? Number(this.student.lives) : 3,
        status: stt,
        learnedTopics: this.student.learnedTopics || this.learnedTopics || [],
        solvedLevels: this.student.solvedLevels || (typeof window !== 'undefined' && window.PuzzleOrgan && window.PuzzleOrgan.state ? window.PuzzleOrgan.state.solvedLevels : {}),
        quizScore: this.student.quizScore !== undefined ? this.student.quizScore : sc,
        badge: this.student.badge || '',
        avatar: this.student.customPhoto || this.student.avatar || 'siswa-banu',
        customPhoto: this.student.customPhoto || null,
        lastUpdated: Date.now()
      };
      localStorage.setItem(progressKey, JSON.stringify(progressData));

      // Dispatch CustomEvent untuk sinkronisasi seketika di tab/jendela yang sama
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('student-progress-updated', {
          detail: { key: progressKey, data: progressData }
        }));
      }
    }

    // Update in registered accounts list
    this.syncActiveStudentWithRegistered();

    // Also update current active student in the students leaderboard list
    this.syncActiveStudentWithList();
  },

  // Synchronize active student into students list
  syncActiveStudentWithList() {
    if (this.isSimulationMode || (typeof window !== 'undefined' && window.isSimulationMode)) return;
    if (!this.student) return;
    const cleanActiveName = (this.student.namaAsli || this.student.name || '').toLowerCase().trim().replace(/\s+/g, ' ');
    const existingIndex = this.students.findIndex(s => 
      (this.student.absen && String(s.absen) === String(this.student.absen)) ||
      (s.name && s.name.toLowerCase().trim().replace(/\s+/g, ' ') === cleanActiveName) ||
      (s.username && s.username === this.student.username)
    );
    const lvl = this.student.level !== undefined ? Number(this.student.level) : 0;
    const mst = this.student.mastery !== undefined ? Number(this.student.mastery) : 0;
    const pts = this.student.points !== undefined ? Number(this.student.points) : (Number(this.student.score) || 0);
    const sc = this.student.score !== undefined ? Number(this.student.score) : pts;
    const stt = this.student.status || (mst >= 100 ? 'Tuntas' : (mst > 0 ? 'Sedang Belajar' : 'Belum Mulai'));

    if (existingIndex >= 0) {
      this.students[existingIndex].name = this.student.namaAsli || this.student.name;
      this.students[existingIndex].namaAsli = this.student.namaAsli || this.student.name;
      this.students[existingIndex].username = this.student.username || cleanActiveName;
      this.students[existingIndex].absen = this.student.absen || this.students[existingIndex].absen;
      this.students[existingIndex].avatar = this.student.customPhoto || this.student.avatar || this.students[existingIndex].avatar;
      this.students[existingIndex].points = pts;
      this.students[existingIndex].score = sc;
      this.students[existingIndex].lives = this.student.lives !== undefined ? Number(this.student.lives) : 3;
      this.students[existingIndex].level = lvl;
      this.students[existingIndex].mastery = mst;
      this.students[existingIndex].status = stt;
    } else {
      // Add new student
      this.students.push({
        id: 'std-' + (this.student.absen || Date.now()),
        absen: this.student.absen || String(this.students.length + 1),
        name: this.student.namaAsli || this.student.name,
        namaAsli: this.student.namaAsli || this.student.name,
        username: this.student.username || cleanActiveName,
        nisn: '008' + String(1000000 + Number(this.student.absen || 1)),
        avatar: this.student.customPhoto || this.student.avatar || 'siswa-banu',
        points: pts,
        score: sc,
        lives: this.student.lives !== undefined ? Number(this.student.lives) : 3,
        level: lvl,
        mastery: mst,
        status: stt,
        rank: this.students.length + 1,
        errors: { laring: 0, alveoli: 0, diafragma: 0, bronkus: 0, hidung: 0 }
      });
    }

    // Re-sort by points descending and update ranks
    this.sortStudents();
    localStorage.setItem(STORAGE_KEYS.STUDENTS_LIST, JSON.stringify(this.students));
  },

  sortStudents() {
    this.students.sort((a, b) => {
      const ptsA = Number(a.points !== undefined ? a.points : a.score) || 0;
      const ptsB = Number(b.points !== undefined ? b.points : b.score) || 0;
      if (ptsB !== ptsA) return ptsB - ptsA;
      return (Number(a.absen) || 0) - (Number(b.absen) || 0);
    });
    this.students.forEach((s, idx) => {
      s.rank = idx + 1;
    });
  },

  // Get Learned Progress
  getLearnedProgress() {
    const total = 25; // 25 subtopics total
    const count = this.learnedTopics ? this.learnedTopics.length : 0;
    const percentage = Math.min(100, Math.round((count / total) * 100));
    return { count, total, percentage };
  },

  // Check if topic is learned
  isTopicLearned(topicId) {
    return this.learnedTopics ? this.learnedTopics.includes(topicId) : false;
  },

  // Mark topic as learned
  markTopicLearned(topicId) {
    if (this.isSimulationMode || (typeof window !== 'undefined' && window.isSimulationMode)) {
      if (this.student) {
        this.student.points = (this.student.points || 0) + 50;
        this.student.score = this.student.points;
      }
      return { isNew: true, progress: this.getLearnedProgress() };
    }

    if (!this.learnedTopics) this.learnedTopics = [];
    let isNew = false;
    if (!this.learnedTopics.includes(topicId)) {
      this.learnedTopics.push(topicId);
      isNew = true;
      localStorage.setItem(STORAGE_KEYS.LEARNED_TOPICS, JSON.stringify(this.learnedTopics));

      // Award bonus points (+50 poin per subtopik baru yang dipelajari)
      if (this.student) {
        this.student.points = (this.student.points || 0) + 50;
        this.student.score = this.student.points;
        const progress = this.getLearnedProgress();
        this.student.mastery = progress.percentage;
        this.student.learnedTopics = [...this.learnedTopics];
        this.saveStudent(this.student);
      }
    }
    return { isNew, progress: this.getLearnedProgress() };
  },

  // Add Reflection
  addReflection(aspect1, aspect2, aspect3) {
    const now = new Date();
    const dateFormatted = now.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    }) + ', ' + now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB';

    const newEntry = {
      id: 'ref-' + Date.now(),
      date: dateFormatted,
      aspect1,
      aspect2,
      aspect3
    };

    this.reflections.unshift(newEntry);
    localStorage.setItem(STORAGE_KEYS.REFLECTIONS, JSON.stringify(this.reflections));
    return newEntry;
  },

  // Delete Reflection
  deleteReflection(id) {
    this.reflections = this.reflections.filter(r => r.id !== id);
    localStorage.setItem(STORAGE_KEYS.REFLECTIONS, JSON.stringify(this.reflections));
  },

  // Reset Classroom Data
  resetClassroomData() {
    this.students = INITIAL_STUDENTS.map(s => ({
      ...s,
      points: 0,
      score: 0,
      level: 0,
      mastery: 0,
      status: 'Belum Mulai'
    }));
    // Hapus semua key progress individu siswa di LocalStorage
    this.students.forEach(s => {
      const pKey = getStudentProgressKey(s.namaAsli || s.name);
      localStorage.removeItem(pKey);
    });
    this.reflections = [...INITIAL_REFLECTIONS];
    const newCode = 'IPA6-PARU-' + Math.floor(10 + Math.random() * 90);
    this.teacher.classCode = newCode;
    this.saveTeacher({ classCode: newCode });
    localStorage.setItem(STORAGE_KEYS.STUDENTS_LIST, JSON.stringify(this.students));
    localStorage.setItem(STORAGE_KEYS.REFLECTIONS, JSON.stringify(this.reflections));
    return newCode;
  },

  // Set Active Screen
  setActiveScreen(screenId) {
    this.activeScreen = screenId;
    localStorage.setItem(STORAGE_KEYS.ACTIVE_SCREEN, screenId);
  },

  // Login Handler
  login(role, data) {
    if (this.isSimulationMode || (typeof window !== 'undefined' && window.isSimulationMode)) {
      this.currentUser = { role, ...data };
      this.student = { ...data };
      this.setActiveScreen('screen-siswa');
      return;
    }

    this.currentUser = { role, ...data };
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(this.currentUser));
    if (role === 'guru') {
      this.saveTeacher(data);
      this.setActiveScreen('screen-guru');
    } else {
      const studentName = (data.namaAsli || data.name || localStorage.getItem("currentUser") || '').trim();
      if (studentName) {
        localStorage.setItem("currentUser", studentName);
        data.name = studentName;
        data.namaAsli = studentName;
        const pKey = getStudentProgressKey(studentName);
        const savedProg = localStorage.getItem(pKey);
        if (savedProg) {
          try {
            const prog = JSON.parse(savedProg);
            data = { ...data, ...prog };
            if (Array.isArray(prog.learnedTopics)) {
              this.learnedTopics = [...prog.learnedTopics];
              localStorage.setItem(STORAGE_KEYS.LEARNED_TOPICS, JSON.stringify(this.learnedTopics));
            }
            if (prog.solvedLevels && typeof window !== 'undefined' && window.PuzzleOrgan && window.PuzzleOrgan.state) {
              window.PuzzleOrgan.state.solvedLevels = { ...window.PuzzleOrgan.state.solvedLevels, ...prog.solvedLevels };
            }
          } catch (e) {}
        }
      }
      // Jika akun baru, pastikan skor awal = 0. Jika akun lama, pertahankan progres skor!
      if (data.score === undefined || data.score === null) {
        data.score = 0;
      }
      if (data.points === undefined || data.points === null) {
        data.points = data.score;
      }
      this.saveStudent(data);
      this.setActiveScreen('screen-siswa');
    }
  },

  // Logout Handler
  logout() {
    this.isSimulationMode = false;
    if (typeof window !== 'undefined') {
      window.isSimulationMode = false;
    }
    this.currentUser = null;
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    localStorage.removeItem("currentUser");
    this.setActiveScreen('screen-portal');
  }
};

// Initialize State immediately
AppState.init();
