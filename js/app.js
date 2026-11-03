/**
 * Main Application Logic & Single Page Application (SPA) Controller
 * Tarik dan Embuskan: Sistem Pernapasan Manusia
 * IPA Kelas 6 SD - Kurikulum Merdeka
 */

document.addEventListener('DOMContentLoaded', () => {
  App.init();
});

const App = {
  // Breathing coach timer
  breathInterval: null,
  isBreathing: false,

  // Fun facts list
  funFacts: [
    "Dalam satu hari penuh, kamu bernapas sekitar 20.000 kali lho! Paru-parumu bekerja tanpa lelah menjaga tubuh tetap berenergi.",
    "Paru-paru kananmu sedikit lebih besar daripada paru-paru kiri karena di sebelah kiri ada ruang khusus untuk jantungmu! ❤️",
    "Jika seluruh kantung alveolus di paru-parumu dibentangkan rata, luas permukaannya bisa menutupi satu lapangan bulu tangkis! 🏸",
    "Hidungmu bukan cuma tempat lewat udara, tapi juga memiliki pemanas dan pelembap alami serta rambut silia penyaring debu kotoran. 👃✨",
    "Saat kamu lari kencang atau berolahraga, tubuhmu membutuhkan oksigen 3 kali lebih banyak, sehingga napasmu otomatis lebih cepat! 🏃💨"
  ],
  currentFactIndex: 0,

  init() {
    // Render initial views
    this.bindEvents();
    this.renderHeaderProfiles();
    this.renderTeacherDashboard();
    this.renderStudentDashboard();
    this.triggerAutoSelectFirstCategory();

    // Check if there's an active session to restore seamlessly on refresh / tab reopening
    if (AppState.currentUser) {
      if (AppState.currentUser.role === 'guru') {
        const screen = (AppState.activeScreen && AppState.activeScreen !== 'screen-portal') ? AppState.activeScreen : 'screen-guru';
        this.navigateTo(screen);
      } else if (AppState.currentUser.role === 'siswa') {
        const screen = (AppState.activeScreen && AppState.activeScreen !== 'screen-portal') ? AppState.activeScreen : 'screen-siswa';
        this.navigateTo(screen);
      } else {
        this.navigateTo(AppState.activeScreen || 'screen-portal');
      }
    } else {
      // Default to login lobby when no active session
      this.navigateTo('screen-portal');
    }

    // Initial fact
    this.showRandomFact();
  },

  // ==========================================
  // NAVIGATION ROUTER (SPA)
  // ==========================================
  navigateTo(screenId) {
    const screens = document.querySelectorAll('.screen-view');
    screens.forEach(s => {
      s.classList.remove('active');
      s.style.setProperty('display', 'none', 'important');
    });

    const target = document.getElementById(screenId);
    if (target) {
      target.classList.add('active');
      target.style.setProperty('display', 'block', 'important');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      AppState.setActiveScreen(screenId);

      // Trigger specific screen updates
      if (screenId === 'screen-guru') {
        this.renderTeacherDashboard();
      } else if (screenId === 'screen-siswa') {
        this.renderStudentDashboard();
        this.triggerAutoSelectFirstCategory();
      } else if (screenId === 'screen-materi') {
        this.triggerAutoSelectFirstCategory();
      } else if (screenId === 'screen-lab') {
        if (window.Simulasi3D) {
          Simulasi3D.init();
        }
      } else if (screenId === 'screen-tantangan') {
        if (window.TantanganHub) {
          TantanganHub.showMenu();
        } else if (window.PuzzleOrgan) {
          PuzzleOrgan.init();
          if (!PuzzleOrgan.state.isLocked && !PuzzleOrgan.isCompleted()) {
            PuzzleOrgan.startTimer();
          }
        }
      } else {
        if (window.PuzzleOrgan && window.PuzzleOrgan.stopTimer) {
          window.PuzzleOrgan.stopTimer();
        }
        if (window.DetektifOrgan && window.DetektifOrgan.stopTimer) {
          window.DetektifOrgan.stopTimer();
        }
      }

      // Kontrol visibilitas tombol floating Mode Simulasi Guru
      const exitBtn = document.getElementById('btnExitSimulation');
      if (exitBtn) {
        if (AppState.isSimulationMode && screenId !== 'screen-guru' && screenId !== 'screen-portal') {
          exitBtn.classList.remove('hidden');
          exitBtn.style.display = 'flex';
        } else {
          exitBtn.classList.add('hidden');
          exitBtn.style.display = 'none';
        }
      }
    }
  },

  // ==========================================
  // EVENT LISTENERS & DOM BINDINGS
  // ==========================================
  bindEvents() {
    // 1. LOGIKA TOMBOL 'MASUK CEPAT / DEMO' (BYPASS MUTLAK)
    const btnQuickGuru = document.getElementById('btnQuickDemoGuru') || document.querySelector('#btnQuickDemoGuru');
    if (btnQuickGuru) {
      btnQuickGuru.addEventListener('click', (e) => {
        if (e && e.preventDefault) e.preventDefault();
        // Pasang event listener pada tombol "Masuk Cepat: Demo Pendidik". Jika diklik, WAJIB langsung jalankan perintah CSS display: sembunyikan container Lobby (display: none), dan tampilkan container Dashboard Guru (display: block). TANPA CEK INPUT!
        const lobby = document.getElementById('screen-portal') || document.querySelector('#screen-portal');
        const dashboardGuru = document.getElementById('screen-guru') || document.querySelector('#screen-guru');
        if (lobby) {
          lobby.style.display = 'none';
          lobby.style.setProperty('display', 'none', 'important');
          lobby.classList.remove('active');
        }
        if (dashboardGuru) {
          dashboardGuru.style.display = 'block';
          dashboardGuru.style.setProperty('display', 'block', 'important');
          dashboardGuru.classList.add('active');
        }
        this.quickDemoGuru(e);
      });
    }

    const btnQuickSiswa = document.getElementById('btnQuickDemoSiswa') || document.querySelector('#btnQuickDemoSiswa');
    if (btnQuickSiswa) {
      btnQuickSiswa.addEventListener('click', (e) => {
        if (e && e.preventDefault) e.preventDefault();
        // Pasang event listener pada tombol "Masuk Cepat: Demo Siswa". Jika diklik, langsung sembunyikan container Lobby, dan tampilkan container Dashboard Siswa. TANPA CEK INPUT!
        const lobby = document.getElementById('screen-portal') || document.querySelector('#screen-portal');
        const dashboardSiswa = document.getElementById('screen-siswa') || document.querySelector('#screen-siswa');
        if (lobby) {
          lobby.style.display = 'none';
          lobby.style.setProperty('display', 'none', 'important');
          lobby.classList.remove('active');
        }
        if (dashboardSiswa) {
          dashboardSiswa.style.display = 'block';
          dashboardSiswa.style.setProperty('display', 'block', 'important');
          dashboardSiswa.classList.add('active');
        }
        this.quickDemoSiswa('siswa-banu', e);
        this.triggerAutoSelectFirstCategory();
      });
    }

    // 2. LOGIKA TOMBOL 'MASUK PORTAL GURU' (MANUAL)
    const btnSubmitGuru = document.getElementById('btnSubmitLoginGuru') || document.querySelector('#btnSubmitLoginGuru');
    if (btnSubmitGuru) {
      btnSubmitGuru.addEventListener('click', (e) => {
        if (e && e.preventDefault) e.preventDefault();
        this.handleLoginGuru(e);
      });
    }

    const formGuru = document.getElementById('formLoginGuru') || document.querySelector('#formLoginGuru');
    if (formGuru) {
      formGuru.addEventListener('submit', (e) => {
        if (e && e.preventDefault) e.preventDefault();
        this.handleLoginGuru(e);
      });
    }

    // 3. LOGIKA TOMBOL 'MASUK PORTAL SISWA' (MANUAL)
    const btnSubmitSiswa = document.getElementById('btnSubmitLoginSiswa') || document.querySelector('#btnSubmitLoginSiswa');
    if (btnSubmitSiswa) {
      btnSubmitSiswa.addEventListener('click', (e) => {
        if (e && e.preventDefault) e.preventDefault();
        this.handleLoginSiswa(e);
      });
    }

    const formSiswa = document.getElementById('formLoginSiswa') || document.querySelector('#formLoginSiswa');
    if (formSiswa) {
      formSiswa.addEventListener('submit', (e) => {
        if (e && e.preventDefault) e.preventDefault();
        this.handleLoginSiswa(e);
      });
    }

    // Auto-formatting Title Case untuk input Nama Lengkap Siswa
    const studentNameInput = document.getElementById('student-name') || document.querySelector('#student-name');
    if (studentNameInput) {
      studentNameInput.addEventListener('blur', (e) => {
        if (e.target && e.target.value.trim()) {
          e.target.value = this.formatTitleCase(e.target.value);
        }
      });
      studentNameInput.addEventListener('change', (e) => {
        if (e.target && e.target.value.trim()) {
          e.target.value = this.formatTitleCase(e.target.value);
        }
      });
    }

    // Teacher Reflection Form
    const formRefleksi = document.getElementById('formTeacherReflection');
    if (formRefleksi) {
      formRefleksi.addEventListener('submit', (e) => {
        if (e && e.preventDefault) e.preventDefault();
        this.handleSaveReflection();
      });
    }

    // Teacher Leaderboard Search Filter
    const searchLeaderboard = document.getElementById('searchLeaderboard');
    if (searchLeaderboard) {
      searchLeaderboard.addEventListener('input', (e) => {
        this.filterLeaderboard(e.target.value);
      });
    }

    // Pasang Event Listener Sinkronisasi Real-Time LocalStorage
    this.setupStorageEventListener();
  },

  // ==========================================
  // REAL-TIME LOCALSTORAGE SYNCHRONIZATION
  // ==========================================
  setupStorageEventListener() {
    // 1. Cross-tab/window synchronization via HTML5 'storage' event
    window.addEventListener('storage', (e) => {
      if (!e.key) return;
      if (e.key.startsWith('progress_') || e.key === STORAGE_KEYS.STUDENTS_LIST) {
        this.handleStudentProgressSync(e.key, e.newValue);
      }
    });

    // 2. Same-tab instantaneous synchronization via CustomEvent
    window.addEventListener('student-progress-updated', (e) => {
      if (e.detail && e.detail.key) {
        this.handleStudentProgressSync(e.detail.key, JSON.stringify(e.detail.data));
      }
    });
  },

  handleStudentProgressSync(key, rawValue) {
    if (!rawValue) return;
    if (AppState.isSimulationMode || (typeof window !== 'undefined' && window.isSimulationMode)) return;
    try {
      const data = typeof rawValue === 'string' ? JSON.parse(rawValue) : rawValue;
      if (!data) return;

      if (key === STORAGE_KEYS.STUDENTS_LIST) {
        if (Array.isArray(data)) {
          AppState.students = data;
          this.renderTeacherStudentsProgress();
          this.renderTeacherLeaderboard();
          this.updateTeacherMetrics();
        }
        return;
      }

      // Handle individual student progress key: progress_${cleanName}
      if (key.startsWith('progress_')) {
        const studentName = data.namaAsli || data.name || '';
        const cleanName = studentName.toLowerCase().trim().replace(/\s+/g, ' ');
        const studentAbsen = data.absen ? String(data.absen) : '';

        // Cari siswa di database AppState.students
        const idx = AppState.students.findIndex(s => {
          if (studentAbsen && String(s.absen) === studentAbsen) return true;
          const sName = (s.namaAsli || s.name || '').toLowerCase().trim().replace(/\s+/g, ' ');
          return sName === cleanName;
        });

        if (idx >= 0) {
          // Perbarui atribut siswa di memori AppState.students
          const newLevel = data.level !== undefined ? Number(data.level) : (AppState.students[idx].level || 0);
          const newMastery = data.mastery !== undefined ? Number(data.mastery) : (AppState.students[idx].mastery || 0);
          const newScore = data.score !== undefined ? Number(data.score) : (AppState.students[idx].score || 0);
          const newPoints = data.points !== undefined ? Number(data.points) : (AppState.students[idx].points || newScore);
          const newLives = data.lives !== undefined ? Number(data.lives) : (AppState.students[idx].lives || 3);

          AppState.students[idx].level = newLevel;
          AppState.students[idx].mastery = newMastery;
          AppState.students[idx].score = newScore;
          AppState.students[idx].points = newPoints;
          AppState.students[idx].lives = newLives;

          // Status: "Belum Mulai" (0%), "Sedang Belajar" (>0%), "Tuntas" (100%)
          if (newMastery >= 100) {
            AppState.students[idx].status = 'Tuntas';
          } else if (newMastery > 0) {
            AppState.students[idx].status = 'Sedang Belajar';
          } else {
            AppState.students[idx].status = 'Belum Mulai';
          }

          // Simpan update ke LocalStorage students list
          localStorage.setItem(STORAGE_KEYS.STUDENTS_LIST, JSON.stringify(AppState.students));

          // Render ulang UI Dashboard Guru secara real-time seketika tanpa refresh!
          this.renderTeacherStudentsProgress();
          this.renderTeacherLeaderboard();
          this.updateTeacherMetrics();
        }
      }
    } catch (err) {
      console.warn('Gagal sinkronisasi data siswa secara real-time:', err);
    }
  },

  // ==========================================
  // TOAST NOTIFICATION UTILITY
  // ==========================================
  showToast(message, type = 'success', duration = 3500) {
    const toast = document.getElementById('portalToast');
    const msgEl = document.getElementById('toastMsg');
    const iconEl = document.getElementById('toastIcon');
    if (!toast || !msgEl) return;

    msgEl.textContent = message;
    if (iconEl) {
      iconEl.textContent = type === 'error' ? 'error' : (type === 'warning' ? 'warning' : 'check_circle');
      iconEl.className = `material-symbols-outlined text-[20px] ${
        type === 'error' ? 'text-rose-400' : (type === 'warning' ? 'text-amber-400' : 'text-emerald-300')
      }`;
    }

    toast.classList.remove('opacity-0', 'pointer-events-none', 'translate-y-4');
    toast.classList.add('opacity-100', 'translate-y-0');

    clearTimeout(this._toastTimeout);
    this._toastTimeout = setTimeout(() => {
      toast.classList.remove('opacity-100', 'translate-y-0');
      toast.classList.add('opacity-0', 'pointer-events-none', 'translate-y-4');
    }, duration);
  },

  // ==========================================
  // LAYAR 1: LOGIN CONTROLLERS
  // ==========================================
  togglePassword(inputId, btn) {
    const input = document.getElementById(inputId);
    const icon = btn.querySelector('.material-symbols-outlined');
    if (input.type === 'password') {
      input.type = 'text';
      if (icon) icon.textContent = 'visibility_off';
    } else {
      input.type = 'password';
      if (icon) icon.textContent = 'visibility';
    }
  },

  formatTitleCase(str) {
    if (!str) return '';
    return str
      .toLowerCase()
      .trim()
      .split(/\s+/)
      .map(word => {
        if (!word) return '';
        return word.replace(/(?:^|[\.\'\-])([a-z])/g, (_, c) => c.toUpperCase());
      })
      .join(' ');
  },

  handleLoginGuru(e) {
    if (e) {
      if (typeof e.preventDefault === 'function') e.preventDefault();
      if (typeof e.stopPropagation === 'function') e.stopPropagation();
    }

    // Ambil nilai dari input Username dan Password Guru
    const usernameInput = document.getElementById('teacher-name') || document.querySelector('#teacher-name');
    const passwordInput = document.getElementById('teacher-password') || document.querySelector('#teacher-password');

    const username = usernameInput ? usernameInput.value.trim() : '';
    const password = passwordInput ? passwordInput.value.trim() : '';

    if (!username || !password) {
      this.showLoginAlertModal("Nama Pengguna dan Kata Sandi Pendidik wajib diisi!");
      return;
    }

    // VALIDASI KATA SANDI GURU: Kata Sandi Pendidik HARUS berakhiran '.guru'
    if (!password.toLowerCase().endsWith('.guru')) {
      this.showLoginAlertModal("Kata sandi Pendidik tidak valid. Pastikan memasukkan kata sandi resmi guru yang benar!");
      return;
    }

    // Sembunyikan Lobby, Tampilkan Dashboard Guru
    const lobby = document.getElementById('screen-portal') || document.querySelector('#screen-portal');
    const dashboardGuru = document.getElementById('screen-guru') || document.querySelector('#screen-guru');
    if (lobby) {
      lobby.style.display = 'none';
      lobby.style.setProperty('display', 'none', 'important');
      lobby.classList.remove('active');
    }
    if (dashboardGuru) {
      dashboardGuru.style.display = 'block';
      dashboardGuru.style.setProperty('display', 'block', 'important');
      dashboardGuru.classList.add('active');
    }

    // Ambil profil guru tersimpan agar tidak ter-reset
    const currentTeacher = AppState.teacher || {};
    const teacherData = {
      ...currentTeacher,
      name: username || currentTeacher.name || 'Maela Rahma Devita',
      username: (username || currentTeacher.name || 'maela rahma devita').toLowerCase(),
      nip: currentTeacher.nip || '',
      school: currentTeacher.school || 'SDIT Insan Robbani',
      classCode: currentTeacher.classCode || 'IPA6-NAPAS-24'
    };

    AppState.login('guru', teacherData);
    this.showToast(`Selamat datang, ${teacherData.name}! Membuka Dashboard Guru...`, 'success');

    // LANGSUNG ARAHKAN KE DASHBOARD GURU SECARA INSTAN TANPA DELAY
    this.navigateTo('screen-guru');
    this.renderTeacherDashboard();
  },

  quickDemoGuru(e) {
    if (e) {
      if (typeof e.preventDefault === 'function') e.preventDefault();
      if (typeof e.stopPropagation === 'function') e.stopPropagation();
    }

    // 1. LOGIKA TOMBOL 'MASUK CEPAT: DEMO PENDIDIK' (BYPASS MUTLAK):
    // WAJIB langsung jalankan perintah CSS display: sembunyikan container Lobby (display: none), dan tampilkan container Dashboard Guru (display: block). TANPA CEK INPUT!
    const lobby = document.getElementById('screen-portal') || document.querySelector('#screen-portal');
    const dashboardGuru = document.getElementById('screen-guru') || document.querySelector('#screen-guru');
    if (lobby) {
      lobby.style.display = 'none';
      lobby.style.setProperty('display', 'none', 'important');
      lobby.classList.remove('active');
    }
    if (dashboardGuru) {
      dashboardGuru.style.display = 'block';
      dashboardGuru.style.setProperty('display', 'block', 'important');
      dashboardGuru.classList.add('active');
    }

    const usernameInput = document.getElementById('teacher-name') || document.querySelector('#teacher-name');
    const passwordInput = document.getElementById('teacher-password') || document.querySelector('#teacher-password');
    if (usernameInput) usernameInput.value = 'maela rahma devita';
    if (passwordInput) passwordInput.value = 'maela rahma devita.guru';

    const teacherData = {
      name: 'Maela Rahma Devita',
      username: 'maela rahma devita',
      nip: '',
      school: 'SDIT Insan Robbani',
      classCode: (AppState.teacher && AppState.teacher.classCode) ? AppState.teacher.classCode : 'IPA6-NAPAS-24'
    };

    AppState.login('guru', teacherData);
    this.showToast('Masuk Cepat: Demo Pendidik aktif! Membuka Dashboard Guru...', 'success');

    this.navigateTo('screen-guru');
    this.renderTeacherDashboard();
  },

  normalizeString(str) {
    if (!str) return '';
    return str.toLowerCase().trim().replace(/\s+/g, ' ');
  },

  normalizeAbsen(absen) {
    if (!absen) return '';
    const trimmed = String(absen).trim();
    const num = parseInt(trimmed, 10);
    if (!isNaN(num)) return String(num);
    return trimmed;
  },

  showLoginAlertModal(msg = 'Akses Ditolak! Nama atau kata sandi tidak sesuai.') {
    const modal = document.getElementById('modalLoginAlert');
    const msgEl = document.getElementById('modalLoginAlertMsg');
    if (msgEl) {
      msgEl.innerHTML = msg;
    }

    if (modal) {
      modal.classList.remove('hidden');
      modal.classList.add('flex');
    }
    const cleanText = msg.replace(/<[^>]*>?/gm, '');
    this.showToast(cleanText, 'error');
  },

  closeLoginAlertModal() {
    const modal = document.getElementById('modalLoginAlert');
    if (modal) {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    }
    const studentName = document.getElementById('student-name');
    const studentPass = document.getElementById('student-password');
    if (studentName && !studentName.value.trim()) {
      studentName.focus();
    } else if (studentPass) {
      studentPass.focus();
    }
  },

  handleLoginSiswa(e) {
    if (e) {
      if (typeof e.preventDefault === 'function') e.preventDefault();
      if (typeof e.stopPropagation === 'function') e.stopPropagation();
    }

    // Ambil nilai dari input Nama dan Sandi Siswa
    const namaInput = document.getElementById('student-name') || document.querySelector('#student-name');
    const sandiInput = document.getElementById('student-password') || document.querySelector('#student-password');

    const rawNama = namaInput ? namaInput.value.trim() : '';
    const sandi = sandiInput ? sandiInput.value.trim() : '';

    if (!rawNama || !sandi) {
      this.showLoginAlertModal("Nama Lengkap dan Kata Sandi wajib diisi untuk memulai petualangan belajar!");
      return;
    }

    // Format Nama Siswa menjadi Title Case (Huruf kapital di setiap awal kata)
    const formattedNama = this.formatTitleCase(rawNama);
    if (namaInput) {
      namaInput.value = formattedNama;
    }

    // 1. VALIDASI NAMA EKSTRA KETAT: Wajib cocok 100% dengan database 27 siswa
    const cleanInputName = this.normalizeString(formattedNama);
    const dbList = window.STUDENTS_DATABASE || [];
    const matchedStudent = dbList.find(s => {
      const sName = this.normalizeString(s.namaAsli || s.name);
      const sUser = this.normalizeString(s.username);
      return cleanInputName === sName || cleanInputName === sUser;
    });

    if (!matchedStudent) {
      this.showLoginAlertModal(`Nama <strong>"${formattedNama}"</strong> tidak terdaftar di database 27 siswa kelas.<br><br>Pastikan penulisan nama lengkap sudah sesuai dengan daftar nama siswa yang terdaftar di dasbor guru ya!`);
      return;
    }

    // 2. VALIDASI KATA SANDI PRESISI: Verifikasi sesuai kata sandi resmi yang dibagikan guru
    const isPasswordValid = typeof window.verifyStudentPassword === 'function'
      ? window.verifyStudentPassword(matchedStudent, sandi)
      : (sandi.toLowerCase().trim() === String(matchedStudent.password || '').toLowerCase().trim());

    if (!isPasswordValid) {
      this.showLoginAlertModal(`Kata sandi untuk siswa <strong>"${matchedStudent.namaAsli}"</strong> tidak cocok.<br><br>Silakan periksa kembali kata sandi yang telah dibagikan oleh guru untuk melanjutkan petualangan belajarmu!`);
      return;
    }

    // Nama siswa resmi terverifikasi
    const officialName = matchedStudent.namaAsli;
    localStorage.setItem("currentUser", officialName);

    // Ambil progres siswa tersimpan di LocalStorage (progress_${cleanName}) agar data tidak reset
    const pKey = (typeof window.getStudentProgressKey === 'function')
      ? window.getStudentProgressKey(officialName)
      : `progress_${officialName.toLowerCase().replace(/[^a-z0-9]+/g, '_')}`;

    let savedProg = null;
    try {
      const rawProg = localStorage.getItem(pKey);
      if (rawProg) savedProg = JSON.parse(rawProg);
    } catch (err) {}

    // Ambil data siswa dari daftar kelas
    const studentInClass = (AppState.students || []).find(s => String(s.absen) === String(matchedStudent.absen)) || matchedStudent;
    const avatars = ['siswa-banu', 'siswa-dara', 'siswa-ian', 'siswa-aga', 'siswa-mia'];
    const chosenAvatar = (savedProg && (savedProg.customPhoto || savedProg.avatar)) || studentInClass.avatar || avatars[(Number(matchedStudent.absen) - 1) % avatars.length];

    const studentSession = {
      id: studentInClass.id || ('std-' + matchedStudent.absen),
      absen: matchedStudent.absen,
      name: officialName,
      namaAsli: officialName,
      username: matchedStudent.username,
      password: sandi,
      points: (savedProg && savedProg.points !== undefined) ? Number(savedProg.points) : ((savedProg && savedProg.score !== undefined) ? Number(savedProg.score) : Number(studentInClass.points || 0)),
      score: (savedProg && savedProg.score !== undefined) ? Number(savedProg.score) : ((savedProg && savedProg.points !== undefined) ? Number(savedProg.points) : Number(studentInClass.score || 0)),
      lives: (savedProg && savedProg.lives !== undefined) ? Number(savedProg.lives) : (studentInClass.lives !== undefined ? Number(studentInClass.lives) : 3),
      level: (savedProg && savedProg.level !== undefined) ? Number(savedProg.level) : Number(studentInClass.level || 0),
      mastery: (savedProg && savedProg.mastery !== undefined) ? Number(savedProg.mastery) : Number(studentInClass.mastery || 0),
      status: (savedProg && savedProg.status) ? savedProg.status : (studentInClass.status || 'Belum Mulai'),
      avatar: chosenAvatar,
      customPhoto: (savedProg && savedProg.customPhoto) || null,
      characterName: `${officialName} (Peneliti Cilik)`,
      learnedTopics: (savedProg && Array.isArray(savedProg.learnedTopics)) ? savedProg.learnedTopics : (AppState.learnedTopics || []),
      solvedLevels: (savedProg && savedProg.solvedLevels) ? savedProg.solvedLevels : {}
    };

    // Sinkronkan learnedTopics ke AppState
    if (studentSession.learnedTopics && studentSession.learnedTopics.length > 0) {
      AppState.learnedTopics = [...studentSession.learnedTopics];
      localStorage.setItem(STORAGE_KEYS.LEARNED_TOPICS, JSON.stringify(AppState.learnedTopics));
    }

    // Sinkronkan solvedLevels ke Simulator jika ada
    if (studentSession.solvedLevels && window.PuzzleOrgan && window.PuzzleOrgan.state) {
      window.PuzzleOrgan.state.solvedLevels = { ...window.PuzzleOrgan.state.solvedLevels, ...studentSession.solvedLevels };
    }

    // Sembunyikan Lobby, Tampilkan Dashboard Siswa
    const lobby = document.getElementById('screen-portal') || document.querySelector('#screen-portal');
    const dashboardSiswa = document.getElementById('screen-siswa') || document.querySelector('#screen-siswa');
    if (lobby) {
      lobby.style.display = 'none';
      lobby.style.setProperty('display', 'none', 'important');
      lobby.classList.remove('active');
    }
    if (dashboardSiswa) {
      dashboardSiswa.style.display = 'block';
      dashboardSiswa.style.setProperty('display', 'block', 'important');
      dashboardSiswa.classList.add('active');
    }

    AppState.login('siswa', studentSession);
    this.showToast(`Selamat datang, ${officialName}! Progres belajarmu siap dilanjutkan 🎉`, 'success');

    // LANGSUNG ARAHKAN KE DASHBOARD SISWA SECARA INSTAN TANPA DELAY
    this.navigateTo('screen-siswa');
    this.renderStudentDashboard();
    if (typeof this.triggerAutoSelectFirstCategory === 'function') {
      this.triggerAutoSelectFirstCategory();
    }
    if (window.Simulasi3D && typeof Simulasi3D.init === 'function') {
      Simulasi3D.init();
    }
  },

  quickDemoSiswa(charKey = 'siswa-banu', e) {
    if (e) {
      if (typeof e.preventDefault === 'function') e.preventDefault();
      if (typeof e.stopPropagation === 'function') e.stopPropagation();
    }

    // 1. LOGIKA TOMBOL 'MASUK CEPAT: DEMO SISWA' (BYPASS MUTLAK):
    // Jika diklik, langsung sembunyikan container Lobby, dan tampilkan container Dashboard Siswa. TANPA CEK INPUT!
    const lobby = document.getElementById('screen-portal') || document.querySelector('#screen-portal');
    const dashboardSiswa = document.getElementById('screen-siswa') || document.querySelector('#screen-siswa');
    if (lobby) {
      lobby.style.display = 'none';
      lobby.style.setProperty('display', 'none', 'important');
      lobby.classList.remove('active');
    }
    if (dashboardSiswa) {
      dashboardSiswa.style.display = 'block';
      dashboardSiswa.style.setProperty('display', 'block', 'important');
      dashboardSiswa.classList.add('active');
    }

    const demoName = 'Akbar Faizi Azfar';
    const demoPass = 'akbar.siswa';
    localStorage.setItem("currentUser", demoName);

    const namaInput = document.getElementById('student-name') || document.querySelector('#student-name');
    const sandiInput = document.getElementById('student-password') || document.querySelector('#student-password');
    if (namaInput) namaInput.value = demoName;
    if (sandiInput) sandiInput.value = demoPass;

    const registeredList = AppState.getRegisteredStudents();
    let studentData = registeredList.find(s => {
      const sName = this.normalizeString(s.namaAsli || s.name);
      return sName === 'akbar faizi azfar';
    });

    const demoPKey = (typeof window.getStudentProgressKey === 'function') 
      ? window.getStudentProgressKey(demoName) 
      : 'progress_akbar_faizi_azfar';
    let savedDemoProg = null;
    try {
      const rawProg = localStorage.getItem(demoPKey);
      if (rawProg) savedDemoProg = JSON.parse(rawProg);
    } catch (e) {}

    const initScore = (savedDemoProg && savedDemoProg.points !== undefined) 
      ? Number(savedDemoProg.points) 
      : ((savedDemoProg && savedDemoProg.score !== undefined) ? Number(savedDemoProg.score) : 0);
    const initLevel = (savedDemoProg && savedDemoProg.level !== undefined) ? Number(savedDemoProg.level) : 0;
    const initMastery = (savedDemoProg && savedDemoProg.mastery !== undefined) ? Number(savedDemoProg.mastery) : 0;
    const initStatus = (savedDemoProg && savedDemoProg.status) ? savedDemoProg.status : 'Belum Mulai';

    if (!studentData) {
      studentData = {
        id: 'demo-std-akbar',
        absen: '1',
        name: demoName,
        namaAsli: demoName,
        username: 'akbar faizi azfar',
        password: demoPass,
        score: initScore,
        points: initScore,
        lives: 3,
        level: initLevel,
        mastery: initMastery,
        status: initStatus,
        avatar: 'siswa-banu',
        customPhoto: null,
        characterName: `${demoName} (Peneliti Cilik)`,
        createdAt: new Date().toISOString()
      };
      registeredList.push(studentData);
      AppState.saveRegisteredStudents(registeredList);
    } else {
      studentData.password = demoPass;
      studentData.score = initScore;
      studentData.points = initScore;
      studentData.level = initLevel;
      studentData.mastery = initMastery;
      studentData.status = initStatus;
    }

    AppState.login('siswa', studentData);
    this.showToast('Masuk Cepat: Demo Siswa aktif! Membuka Dashboard Siswa...', 'success');

    this.navigateTo('screen-siswa');
    this.renderStudentDashboard();
    this.triggerAutoSelectFirstCategory();
    if (window.Simulasi3D && typeof Simulasi3D.init === 'function') {
      Simulasi3D.init();
    }
  },

  logout() {
    AppState.logout();
    AppState.isSimulationMode = false;
    if (typeof window !== 'undefined') {
      window.isSimulationMode = false;
    }
    const exitBtn = document.getElementById('btnExitSimulation');
    if (exitBtn) {
      exitBtn.classList.add('hidden');
      exitBtn.style.display = 'none';
    }
    this.showToast('Berhasil keluar. Sampai jumpa lagi! 🫁✨');
    this.navigateTo('screen-portal');
  },

  // ==========================================
  // BREATHING COACH MICRO-INTERACTION
  // ==========================================
  toggleBreathTrainer() {
    const btn = document.getElementById('btn-breath-coach');
    const text = document.getElementById('breath-status-text');
    const icon = document.getElementById('lung-pulse-icon');
    const subtext = document.getElementById('breath-subtext');

    if (!this.isBreathing) {
      this.isBreathing = true;
      if (btn) btn.innerHTML = '<span class="material-symbols-outlined text-[18px]">stop_circle</span><span>Hentikan</span>';
      if (btn) btn.className = 'btn-squishy-coral py-2 px-4 text-xs font-bold shrink-0';

      let step = 0;
      const doStep = () => {
        if (step % 2 === 0) {
          if (text) text.innerHTML = '<span class="text-sky-600 font-extrabold animate-pulse">Tarik Napas Perlahan... 🫁</span>';
          if (subtext) subtext.textContent = 'Rasakan udara segar kaya O₂ masuk ke parumu';
          if (icon) {
            icon.style.transform = 'scale(1.35)';
            icon.style.filter = 'drop-shadow(0 0 16px rgba(56, 189, 248, 0.8))';
          }
        } else {
          if (text) text.innerHTML = '<span class="text-orange-500 font-extrabold">Hembuskan Perlahan... 🍃</span>';
          if (subtext) subtext.textContent = 'Lepaskan karbon dioksida CO₂ dan buat tubuh rileks';
          if (icon) {
            icon.style.transform = 'scale(0.9)';
            icon.style.filter = 'none';
          }
        }
        step++;
      };

      doStep();
      this.breathInterval = setInterval(doStep, 4000);
    } else {
      this.isBreathing = false;
      clearInterval(this.breathInterval);
      if (btn) btn.innerHTML = '<span class="material-symbols-outlined text-[18px]">play_arrow</span><span>Mulai Latihan</span>';
      if (btn) btn.className = 'btn-squishy-primary py-2 px-4 text-xs font-bold shrink-0';
      if (text) text.textContent = 'Latihan Napas: Tarik Dalam...';
      if (subtext) subtext.textContent = 'Relaksasi sejenak sebelum mulai berpetualang';
      if (icon) {
        icon.style.transform = 'scale(1)';
        icon.style.filter = 'none';
      }
    }
  },

  // ==========================================
  // LAYAR 2: DASHBOARD GURU CONTROLLERS
  // ==========================================
  renderTeacherDashboard() {
    const teacher = AppState.teacher;
    if (!teacher) return;

    // Header info (Profil: Maela Rahma Devita, Tanpa NIP, SDIT Insan Robbani)
    const nameEl = document.getElementById('guruHeaderName');
    const nipEl = document.getElementById('guruHeaderNip');
    const schoolEl = document.getElementById('guruHeaderSchool');
    const codeEl = document.getElementById('classCodeTxt');
    const avatarContainer = document.getElementById('guruHeaderAvatar');

    if (nameEl) nameEl.textContent = teacher.name || 'Maela Rahma Devita';
    if (nipEl) {
      nipEl.textContent = '';
      nipEl.classList.add('hidden');
    }
    if (schoolEl) schoolEl.textContent = `${teacher.school || 'SDIT Insan Robbani'} • Kurikulum Merdeka`;
    if (codeEl) codeEl.textContent = teacher.classCode;

    if (avatarContainer) {
      avatarContainer.innerHTML = getAvatarSvg(teacher.customPhoto || teacher.avatar);
    }

    // Render 4 panels
    this.renderDiagnosticHeatmap();
    this.renderTeacherStudentsProgress();
    this.renderTeacherLeaderboard();
    this.renderTeacherReflections();
    this.updateTeacherMetrics();
  },

  // Perbarui Kartu Ringkasan Metrik Guru secara Real-Time
  updateTeacherMetrics() {
    const avgScoreEl = document.getElementById('guruMetricAvgScore');
    const completionEl = document.getElementById('guruMetricCompletion');
    const simTestedEl = document.getElementById('guruMetricSimTested');

    if (!AppState.students || AppState.students.length === 0) return;

    const totalStudents = AppState.students.length;
    let totalScore = 0;
    let completedCount = 0;
    let simTestedCount = 0;

    AppState.students.forEach(s => {
      const score = Number(s.score !== undefined ? s.score : (s.points || 0));
      const mastery = Number(s.mastery || 0);
      totalScore += score;
      if (mastery >= 100) completedCount++;
      if (mastery > 0 || score > 0) simTestedCount++;
    });

    const avgScore = totalStudents > 0 ? (totalScore / totalStudents).toFixed(1) : '0.0';
    const completionRate = totalStudents > 0 ? Math.round((completedCount / totalStudents) * 100) : 0;
    const simTestedRate = totalStudents > 0 ? Math.round((simTestedCount / totalStudents) * 100) : 0;

    if (avgScoreEl) avgScoreEl.textContent = avgScore;
    if (completionEl) completionEl.textContent = `${completionRate}%`;
    if (simTestedEl) simTestedEl.textContent = `${simTestedRate}%`;
  },

  // Mode Simulasi Siswa: Guru langsung masuk sebagai siswa uji coba tanpa merusak metrik kelas
  startTeacherStudentSimulation() {
    AppState.isSimulationMode = true;
    if (typeof window !== 'undefined') {
      window.isSimulationMode = true;
    }

    // Tampilkan tombol melayang (Floating Action Button) di pojok kanan bawah
    const exitBtn = document.getElementById('btnExitSimulation');
    if (exitBtn) {
      exitBtn.classList.remove('hidden');
      exitBtn.style.display = 'flex';
    }

    // Identitas mock khusus simulasi (terpisah dari 27 siswa asli kelas agar data aman)
    const simStudent = {
      id: 'sim-guru-std',
      absen: '0',
      name: 'Guru (Mode Simulasi)',
      namaAsli: 'Guru (Mode Simulasi)',
      username: 'guru_simulasi',
      score: 0,
      points: 0,
      lives: 3,
      level: 0,
      mastery: 0,
      status: 'Mode Simulasi',
      avatar: 'siswa-banu',
      customPhoto: null,
      characterName: 'Guru (Simulasi Siswa)'
    };

    AppState.currentUser = { role: 'siswa', ...simStudent };
    AppState.student = { ...simStudent };
    localStorage.setItem("currentUser", "Guru (Mode Simulasi)");

    // Notifikasi sementara (Toast): melayang selama 3-4 detik lalu menghilang otomatis secara halus
    this.showToast('Mode Simulasi Guru: Skor dan progres tidak akan disimpan ke data kelas', 'warning', 3500);

    setTimeout(() => {
      this.navigateTo('screen-siswa');
      this.renderStudentDashboard();
      if (typeof this.triggerAutoSelectFirstCategory === 'function') {
        this.triggerAutoSelectFirstCategory();
      }
      if (window.Simulasi3D && typeof Simulasi3D.init === 'function') {
        Simulasi3D.init();
      }
    }, 200);
  },

  // Keluar dari Mode Simulasi Siswa & Kembali ke Dashboard Guru
  exitTeacherStudentSimulation() {
    AppState.isSimulationMode = false;
    if (typeof window !== 'undefined') {
      window.isSimulationMode = false;
    }

    // Sembunyikan banner notifikasi persisten simulasi
    const exitBtn = document.getElementById('btnExitSimulation');
    if (exitBtn) {
      exitBtn.classList.add('hidden');
      exitBtn.style.display = 'none';
    }

    // Kembalikan identitas currentUser ke guru
    const teacherData = AppState.teacher || {
      name: 'Maela Rahma Devita',
      nip: '',
      school: 'SDIT Insan Robbani',
      classCode: 'IPA6-NAPAS-24'
    };
    AppState.currentUser = { role: 'guru', ...teacherData };
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(AppState.currentUser));
    localStorage.removeItem("currentUser");

    // Sinkronkan ulang data siswa kelas dari LocalStorage untuk menjamin keutuhan metrik kelas
    AppState.syncStudentsFromStorage();

    this.showToast('Keluar dari Mode Simulasi. Kembali ke Dashboard Guru.', 'success');

    this.navigateTo('screen-guru');
    this.renderTeacherDashboard();
  },

  // Alias fungsi untuk fleksibilitas
  startStudentSimulation() {
    return this.startTeacherStudentSimulation();
  },

  exitSimulationMode() {
    return this.exitTeacherStudentSimulation();
  },

  switchGuruTab(tabName) {
    const tabs = ['perkembangan', 'peringkat', 'refleksi', 'manajemen'];
    tabs.forEach(t => {
      const btn = document.getElementById(`tabBtn-${t}`);
      const panel = document.getElementById(`panelGuru-${t}`);
      if (btn && panel) {
        if (t === tabName) {
          btn.classList.add('bg-white', 'text-teal-700', 'shadow-md', 'scale-102');
          btn.classList.remove('text-slate-600', 'hover:bg-white/40');
          panel.classList.remove('hidden');
          panel.classList.add('block');
        } else {
          btn.classList.remove('bg-white', 'text-teal-700', 'shadow-md', 'scale-102');
          btn.classList.add('text-slate-600', 'hover:bg-white/40');
          panel.classList.add('hidden');
          panel.classList.remove('block');
        }
      }
    });
  },

  // Panel 1: Diagnostics Heatmap & Student Progress
  renderDiagnosticHeatmap() {
    const container = document.getElementById('diagnosticHeatmapContainer');
    if (!container) return;

    const topics = AppState.diagnostics;
    container.innerHTML = topics.map(topic => {
      // Color grading according to error rate
      let barGrad = 'from-emerald-400 to-teal-500';
      let badgeStyle = 'bg-emerald-100 text-emerald-800';
      if (topic.errorRate >= 50) {
        barGrad = 'from-rose-500 to-orange-500';
        badgeStyle = 'bg-rose-100 text-rose-800 font-extrabold animate-pulse';
      } else if (topic.errorRate >= 35) {
        barGrad = 'from-amber-400 to-orange-400';
        badgeStyle = 'bg-amber-100 text-amber-800 font-bold';
      }

      return `
        <div class="p-4 rounded-2xl bg-white/75 border border-white/80 shadow-sm hover:shadow-md transition-all">
          <div class="flex flex-wrap items-center justify-between gap-2 mb-2">
            <div class="flex items-center gap-2">
              <span class="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-700 font-bold text-xs">
                ${topic.wrongCount}x
              </span>
              <div>
                <h4 class="font-heading text-sm text-slate-900">${topic.title}</h4>
                <p class="text-xs text-slate-500">${topic.organ}</p>
              </div>
            </div>
            <div class="flex items-center gap-2">
              <span class="px-2.5 py-1 rounded-full text-xs ${badgeStyle}">
                ${topic.errorRate >= 50 ? '⚠️ Butuh Remedial (' + topic.errorRate + '% Salah)' : topic.errorRate + '% Keliru'}
              </span>
            </div>
          </div>

          <!-- Progress track -->
          <div class="diagnostic-bar-track mb-2">
            <div class="diagnostic-bar-fill bg-gradient-to-r ${barGrad}" style="width: ${topic.errorRate}%;"></div>
          </div>

          <!-- Diagnostic Insight & Pedagogy Tips -->
          <div class="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-700 leading-relaxed mt-2">
            <div class="font-semibold text-slate-800 flex items-center gap-1 mb-0.5">
              <span class="material-symbols-outlined text-[16px] text-amber-500">lightbulb</span>
              <span>Rekomendasi Tindak Lanjut Guru:</span>
            </div>
            <p>${topic.pedagogyTip}</p>
          </div>
        </div>
      `;
    }).join('');
  },

  renderTeacherStudentsProgress() {
    const tbody = document.getElementById('studentsProgressTableBody');
    if (!tbody) return;

    // Urutkan siswa berdasarkan nomor absen 1 sampai 27
    const sortedStudents = [...AppState.students].sort((a, b) => (Number(a.absen) || 0) - (Number(b.absen) || 0));

    tbody.innerHTML = sortedStudents.map((std, idx) => {
      const avatarSvg = getAvatarSvg(std.avatar);
      const levelNum = std.level !== undefined ? Number(std.level) : 0;
      const masteryNum = std.mastery !== undefined ? Number(std.mastery) : 0;

      // Status: "Belum Mulai" (Warna abu-abu jika 0%), "Sedang Belajar" (jika >0%), "Tuntas" (jika 100%)
      let statusBadge = '<span class="px-2.5 py-1 rounded-full text-xs bg-slate-100 text-slate-600 border border-slate-200 font-bold">Belum Mulai</span>';
      if (masteryNum >= 100) {
        statusBadge = '<span class="px-2.5 py-1 rounded-full text-xs bg-emerald-100 text-emerald-800 border border-emerald-200 font-bold">Tuntas</span>';
      } else if (masteryNum > 0) {
        statusBadge = '<span class="px-2.5 py-1 rounded-full text-xs bg-amber-100 text-amber-800 border border-amber-200 font-bold">Sedang Belajar</span>';
      }

      return `
        <tr class="border-b border-slate-100 hover:bg-slate-50/80 transition-colors">
          <td class="py-3 px-4 text-center font-bold text-slate-500 text-sm">${idx + 1}</td>
          <td class="py-3 px-4">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-full overflow-hidden shrink-0 shadow-sm border border-white">
                ${avatarSvg}
              </div>
              <div>
                <p class="font-bold text-slate-900 text-sm leading-tight">${std.name}</p>
              </div>
            </div>
          </td>
          <td class="py-3 px-4 text-center">
            <span class="font-bold text-teal-700 text-xs px-2.5 py-1 bg-teal-50 rounded-full">Level ${levelNum}/10</span>
          </td>
          <td class="py-3 px-4">
            <div class="flex items-center gap-2">
              <div class="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
                <div class="bg-gradient-to-r from-teal-500 to-emerald-400 h-2.5 rounded-full" style="width: ${masteryNum}%"></div>
              </div>
              <span class="text-xs font-bold text-slate-700 shrink-0">${masteryNum}%</span>
            </div>
          </td>
          <td class="py-3 px-4 text-center">
            ${statusBadge}
          </td>
        </tr>
      `;
    }).join('');
  },

  // Panel 2: Leaderboard Table
  renderTeacherLeaderboard(filteredList = null) {
    if (!filteredList && window.AppState && Array.isArray(AppState.students)) {
      AppState.students.forEach(std => {
        const sName = (std.namaAsli || std.name || '').trim();
        if (sName) {
          const pKey = (typeof window.getStudentProgressKey === 'function') 
            ? window.getStudentProgressKey(sName) 
            : `progress_${sName.toLowerCase().replace(/[^a-z0-9]+/g, '_')}`;
          const savedProg = localStorage.getItem(pKey);
          if (savedProg) {
            try {
              const prog = JSON.parse(savedProg);
              const pts = Number(prog.points !== undefined ? prog.points : (prog.score || 0));
              std.points = pts;
              std.score = pts;
              if (prog.level !== undefined) std.level = Number(prog.level);
              if (prog.mastery !== undefined) std.mastery = Number(prog.mastery);
              if (prog.status) std.status = prog.status;
            } catch (e) {}
          }
        }
      });
      if (typeof AppState.sortStudents === 'function') {
        AppState.sortStudents();
      }
    }
    const list = filteredList || AppState.students;
    const tbody = document.getElementById('leaderboardTableBody');
    if (!tbody) return;

    tbody.innerHTML = list.map((std, idx) => {
      let medal = `<span class="w-7 h-7 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center font-bold text-xs">${std.rank || idx + 1}</span>`;
      if (idx === 0) {
        medal = '<span class="text-2xl drop-shadow-sm">🥇</span>';
      } else if (idx === 1) {
        medal = '<span class="text-2xl drop-shadow-sm">🥈</span>';
      } else if (idx === 2) {
        medal = '<span class="text-2xl drop-shadow-sm">🥉</span>';
      }

      // Hearts string
      let hearts = '';
      for (let i = 0; i < 3; i++) {
        if (i < std.lives) {
          hearts += '<span class="text-rose-500 text-sm">❤️</span>';
        } else {
          hearts += '<span class="text-slate-300 text-sm">🤍</span>';
        }
      }

      const avatarSvg = getAvatarSvg(std.avatar);
      const studentPoints = (std.points !== undefined ? std.points : (std.score || 0));

      return `
        <tr class="border-b border-slate-100 hover:bg-slate-50/80 transition-colors">
          <td class="py-3 px-4 text-center">${medal}</td>
          <td class="py-3 px-4">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-full overflow-hidden shrink-0 shadow-sm border border-white">
                ${avatarSvg}
              </div>
              <div>
                <p class="font-bold text-slate-900 text-sm">${std.name}</p>
              </div>
            </div>
          </td>
          <td class="py-3 px-4 text-center">
            <span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200">
              ⭐ Level ${std.level !== undefined ? std.level : 0}
            </span>
          </td>
          <td class="py-3 px-4 text-center">
            <div class="flex items-center justify-center gap-0.5">${hearts}</div>
          </td>
          <td class="py-3 px-4 text-right">
            <span class="font-extrabold text-sky-700 text-base">${studentPoints.toLocaleString('id-ID')}</span>
            <span class="text-xs text-slate-500">Poin</span>
          </td>
        </tr>
      `;
    }).join('');
  },

  filterLeaderboard(query) {
    const q = query.toLowerCase().trim();
    if (!q) {
      this.renderTeacherLeaderboard();
      return;
    }
    const filtered = AppState.students.filter(s => s.name.toLowerCase().includes(q) || (s.absen && s.absen.includes(q)));
    this.renderTeacherLeaderboard(filtered);
  },

  // Panel 3: Teacher Reflections
  handleSaveReflection() {
    const asp1 = document.getElementById('evalPemahaman').value.trim();
    const asp2 = document.getElementById('evalPenyampaian').value.trim();
    const asp3 = document.getElementById('evalMedia').value.trim();

    if (!asp1 || !asp2 || !asp3) {
      this.showToast('Harap isi ketiga aspek refleksi guru dengan lengkap!', 'warning');
      return;
    }

    const saved = AppState.addReflection(asp1, asp2, asp3);
    this.showToast('Catatan refleksi berhasil disimpan ke riwayat jurnal!');
    this.renderTeacherReflections();

    // Reset inputs
    document.getElementById('evalPemahaman').value = '';
    document.getElementById('evalPenyampaian').value = '';
    document.getElementById('evalMedia').value = '';
  },

  deleteReflection(id) {
    if (confirm('Apakah Bapak/Ibu yakin ingin menghapus catatan refleksi ini?')) {
      AppState.deleteReflection(id);
      this.showToast('Catatan refleksi telah dihapus.');
      this.renderTeacherReflections();
    }
  },

  renderTeacherReflections() {
    const container = document.getElementById('reflectionHistoryContainer');
    if (!container) return;

    const list = AppState.reflections;
    if (list.length === 0) {
      container.innerHTML = `
        <div class="p-8 text-center text-slate-400 bg-white/50 rounded-2xl border border-dashed border-slate-200">
          <span class="material-symbols-outlined text-4xl mb-1">note_stack</span>
          <p class="text-sm font-semibold">Belum ada catatan refleksi tersimpan.</p>
          <p class="text-xs text-slate-400">Silakan isi formulir di atas untuk menyimpan refleksi pembelajaran.</p>
        </div>
      `;
      return;
    }

    container.innerHTML = list.map((ref, idx) => `
      <div class="p-5 rounded-2xl bg-white/80 border border-white/90 shadow-sm hover:shadow-md transition-all flex flex-col gap-3">
        <div class="flex items-center justify-between pb-2 border-b border-slate-100">
          <div class="flex items-center gap-2">
            <span class="w-7 h-7 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center font-bold text-xs">
              #${list.length - idx}
            </span>
            <span class="text-xs font-bold text-slate-600">${ref.date}</span>
          </div>
          <button onclick="App.deleteReflection('${ref.id}')" class="text-slate-400 hover:text-rose-500 p-1 transition-colors" title="Hapus Catatan">
            <span class="material-symbols-outlined text-[18px]">delete</span>
          </button>
        </div>

        <div class="flex flex-col gap-2.5 text-xs text-slate-700">
          <div class="p-2.5 rounded-xl bg-teal-50/70 border border-teal-100">
            <span class="font-bold text-teal-900 block mb-0.5">1. Evaluasi Pemahaman Siswa:</span>
            <p class="leading-relaxed">${ref.aspect1}</p>
          </div>
          <div class="p-2.5 rounded-xl bg-sky-50/70 border border-sky-100">
            <span class="font-bold text-sky-900 block mb-0.5">2. Evaluasi Penyampaian Guru:</span>
            <p class="leading-relaxed">${ref.aspect2}</p>
          </div>
          <div class="p-2.5 rounded-xl bg-orange-50/70 border border-orange-100">
            <span class="font-bold text-orange-900 block mb-0.5">3. Evaluasi Media Pembelajaran:</span>
            <p class="leading-relaxed">${ref.aspect3}</p>
          </div>
        </div>
      </div>
    `).join('');
  },

  // Panel 4: Export CSV & Print PDF & Reset
  exportStudentsCSV() {
    const students = AppState.students;
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Peringkat,Nama Siswa,No Absen,Level Kuis,Sisa Nyawa,Skor Poin,Ketuntasan (%)\r\n";

    students.forEach((s, idx) => {
      const row = [
        s.rank || (idx + 1),
        `"${s.name}"`,
        `"${s.absen || (idx + 1)}"`,
        s.level,
        s.lives,
        s.points,
        `${s.mastery}%`
      ].join(",");
      csvContent += row + "\r\n";
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Rekap_Nilai_IPA6_${AppState.teacher.classCode}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    this.showToast("File CSV Rekap Nilai Siswa berhasil diunduh! 📊");
  },

  exportReflectionsText() {
    const reflections = AppState.reflections;
    let txt = `JURNAL REFLEKSI GURU - SISTEM PERNAPASAN MANUSIA\n`;
    txt += `Pendidik: ${AppState.teacher.name} - SDIT Insan Robbani\n`;
    txt += `Kode Kelas: ${AppState.teacher.classCode}\n`;
    txt += `Tanggal Ekspor: ${new Date().toLocaleString('id-ID')}\n`;
    txt += `=========================================================\n\n`;

    reflections.forEach((r, idx) => {
      txt += `CATATAN #${idx + 1} - ${r.date}\n`;
      txt += `1. Evaluasi Pemahaman Siswa: \n   ${r.aspect1}\n`;
      txt += `2. Evaluasi Penyampaian Guru: \n   ${r.aspect2}\n`;
      txt += `3. Evaluasi Media Pembelajaran: \n   ${r.aspect3}\n\n`;
      txt += `---------------------------------------------------------\n`;
    });

    const blob = new Blob([txt], { type: 'text/plain;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `Jurnal_Refleksi_${AppState.teacher.classCode}.txt`;
    link.click();
    this.showToast("File Jurnal Refleksi berhasil diunduh! 📝");
  },

  printClassReport() {
    window.print();
  },

  copyClassCode() {
    const code = AppState.teacher.classCode;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(code);
    }
    this.showToast(`Kode Kelas '${code}' berhasil disalin ke clipboard! 📋`);
  },

  createNewSession() {
    const newCode = 'IPA6-PARU-' + Math.floor(10 + Math.random() * 90);
    AppState.saveTeacher({ classCode: newCode });
    this.renderTeacherDashboard();
    this.showToast(`Sesi Kelas Baru Berhasil Dibuat! Kode: ${newCode} 🎉`);
  },

  resetClassDataPrompt() {
    if (confirm("Peringatan: Seluruh data simulasi kelas dan catatan refleksi akan diatur ulang ke kondisi awal default. Lanjutkan?")) {
      const code = AppState.resetClassroomData();
      this.renderTeacherDashboard();
      this.showToast(`Data kelas berhasil direset! Kode baru: ${code}`);
    }
  },

  // Teacher Profile Modal
  openTeacherProfileModal() {
    const modal = document.getElementById('modalTeacherProfile');
    const teacher = AppState.teacher;
    if (!modal || !teacher) return;

    document.getElementById('editGuruName').value = teacher.name;
    document.getElementById('editGuruNip').value = teacher.nip;
    document.getElementById('editGuruSchool').value = teacher.school;

    // Render 6 avatar options
    const avatarGrid = document.getElementById('guruAvatarGrid');
    if (avatarGrid) {
      const teacherAvatarKeys = ['guru-1', 'guru-2', 'guru-3', 'guru-4', 'guru-5', 'guru-6'];
      avatarGrid.innerHTML = teacherAvatarKeys.map(key => {
        const item = AVATAR_MAP[key];
        const isSelected = (!teacher.customPhoto && teacher.avatar === key);
        return `
          <button type="button" onclick="App.selectTeacherAvatar('${key}')" 
                  class="p-2 rounded-2xl flex flex-col items-center gap-1.5 transition-all border-2 ${isSelected ? 'border-teal-500 bg-teal-50 ring-2 ring-teal-300' : 'border-transparent bg-slate-50 hover:bg-slate-100'}">
            <div class="w-14 h-14 rounded-full overflow-hidden shadow-sm">
              ${item.svg}
            </div>
            <span class="text-[11px] font-bold text-slate-700 text-center leading-tight">${item.name.split(' (')[0]}</span>
          </button>
        `;
      }).join('');
    }

    modal.classList.remove('hidden');
    modal.classList.add('flex');
  },

  closeTeacherProfileModal() {
    const modal = document.getElementById('modalTeacherProfile');
    if (modal) {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    }
  },

  selectTeacherAvatar(avatarKey) {
    this._selectedTeacherAvatar = avatarKey;
    this._selectedTeacherCustomPhoto = null; // Clear custom photo if picking avatar
    this.openTeacherProfileModal(); // Re-render selected border
  },

  handleTeacherPhotoUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      this.showToast('Harap pilih file gambar valid (JPG, PNG, atau WebP)!', 'error');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      this._selectedTeacherCustomPhoto = e.target.result;
      this.showToast('Foto profil guru siap disimpan! 📸');
      this.saveTeacherProfile();
    };
    reader.readAsDataURL(file);
  },

  saveTeacherProfile() {
    const name = document.getElementById('editGuruName').value.trim();
    const nip = document.getElementById('editGuruNip').value.trim();
    const school = document.getElementById('editGuruSchool').value.trim();

    if (!name) {
      this.showToast('Nama guru tidak boleh kosong!', 'warning');
      return;
    }

    const updates = { name, nip: nip || '', school: school || 'SDIT Insan Robbani' };
    if (this._selectedTeacherCustomPhoto) {
      updates.customPhoto = this._selectedTeacherCustomPhoto;
    } else if (this._selectedTeacherAvatar) {
      updates.avatar = this._selectedTeacherAvatar;
      updates.customPhoto = null;
    }

    AppState.saveTeacher(updates);
    this.closeTeacherProfileModal();
    this.renderTeacherDashboard();
    this.showToast('Profil guru berhasil diperbarui! ✨');
  },

  // ==========================================
  // LAYAR 3: DASHBOARD UTAMA SISWA CONTROLLERS
  // ==========================================
  renderStudentDashboard() {
    let student = AppState.student;
    const savedCurrentUser = localStorage.getItem("currentUser");
    const activeName = (savedCurrentUser && typeof savedCurrentUser === 'string' && savedCurrentUser.trim())
      ? savedCurrentUser.trim()
      : (student ? (student.namaAsli || student.name || 'Peneliti Cilik') : 'Peneliti Cilik');

    const pKey = (typeof window.getStudentProgressKey === 'function') 
      ? window.getStudentProgressKey(activeName) 
      : `progress_${activeName.toLowerCase().replace(/[^a-z0-9]+/g, '_')}`;

    let latestPoints = 0;
    let latestLevel = 0;
    let latestMastery = 0;
    let latestStatus = 'Belum Mulai';

    try {
      const stored = localStorage.getItem(pKey);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.points !== undefined) latestPoints = Number(parsed.points);
        else if (parsed.score !== undefined) latestPoints = Number(parsed.score);
        if (parsed.level !== undefined) latestLevel = Number(parsed.level);
        if (parsed.mastery !== undefined) latestMastery = Number(parsed.mastery);
        if (parsed.status) latestStatus = parsed.status;
      }
    } catch (e) {}

    if (!student) {
      student = {
        name: activeName,
        namaAsli: activeName,
        score: latestPoints,
        points: latestPoints,
        level: latestLevel,
        mastery: latestMastery,
        status: latestStatus,
        lives: 3,
        avatar: 'siswa-banu'
      };
      AppState.student = student;
    } else {
      student.name = activeName;
      student.namaAsli = activeName;
      if (latestPoints > 0 || student.points === undefined) {
        student.points = latestPoints;
        student.score = latestPoints;
      }
      if (latestLevel > 0) student.level = latestLevel;
      if (latestMastery > 0) student.mastery = latestMastery;
      if (latestStatus) student.status = latestStatus;
    }

    const nameEl = document.getElementById('siswaHeaderName');
    const pointsEl = document.getElementById('siswaHeaderPoints');
    const avatarEl = document.getElementById('siswaHeaderAvatar');
    const livesContainer = document.getElementById('siswaHeaderLives');

    // Tampilkan sapaan menggunakan 'currentUser' dari LocalStorage atau 'namaAsli'
    if (nameEl) nameEl.textContent = activeName;

    // Render skor terbaru dari LocalStorage atau AppState
    const currentScore = student.points !== undefined ? student.points : (student.score !== undefined ? student.score : 0);
    if (pointsEl) pointsEl.textContent = `${currentScore.toLocaleString('id-ID')} Poin`;
    if (avatarEl) {
      avatarEl.innerHTML = getAvatarSvg(student.customPhoto || student.avatar);
    }

    // Render 3 Hearts
    if (livesContainer) {
      let heartsHtml = '';
      for (let i = 0; i < 3; i++) {
        if (i < student.lives) {
          heartsHtml += '<span class="material-symbols-outlined text-rose-500 text-[20px] drop-shadow-sm anim-breathing" style="font-variation-settings: \'FILL\' 1;">favorite</span>';
        } else {
          heartsHtml += '<span class="material-symbols-outlined text-slate-300 text-[20px]">favorite</span>';
        }
      }
      livesContainer.innerHTML = heartsHtml;
    }

    // Render Motivation Leaderboard Widget
    this.renderStudentTop10Leaderboard();
  },

  renderStudentTop10Leaderboard() {
    const container = document.getElementById('top10LeaderboardList');
    if (!container) return;

    // Sinkronkan seluruh data siswa dengan LocalStorage sebelum rendering leaderboard
    if (window.AppState && Array.isArray(AppState.students)) {
      AppState.students.forEach(std => {
        const sName = (std.namaAsli || std.name || '').trim();
        if (sName) {
          const pKey = (typeof window.getStudentProgressKey === 'function') 
            ? window.getStudentProgressKey(sName) 
            : `progress_${sName.toLowerCase().replace(/[^a-z0-9]+/g, '_')}`;
          const savedProg = localStorage.getItem(pKey);
          if (savedProg) {
            try {
              const prog = JSON.parse(savedProg);
              const pts = Number(prog.points !== undefined ? prog.points : (prog.score || 0));
              std.points = pts;
              std.score = pts;
              if (prog.level !== undefined) std.level = Number(prog.level);
              if (prog.mastery !== undefined) std.mastery = Number(prog.mastery);
              if (prog.status) std.status = prog.status;
            } catch (e) {}
          }
        }
      });
      if (typeof AppState.sortStudents === 'function') {
        AppState.sortStudents();
      }
    }

    const rawActive = localStorage.getItem("currentUser") || 
                     (AppState.student && (AppState.student.namaAsli || AppState.student.name)) || '';
    const activeStudentName = rawActive.replace(/\s*\(.*?\)\s*/g, '').toLowerCase().trim();

    const top10 = AppState.students.slice(0, 10);

    container.innerHTML = top10.map((std, idx) => {
      const isMe = std.name.toLowerCase().trim() === activeStudentName;
      let rankBadge = `<span class="w-6 h-6 rounded-full bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center">${idx + 1}</span>`;
      if (idx === 0) rankBadge = '<span class="text-xl">🥇</span>';
      if (idx === 1) rankBadge = '<span class="text-xl">🥈</span>';
      if (idx === 2) rankBadge = '<span class="text-xl">🥉</span>';

      const avatarSvg = getAvatarSvg(std.avatar);
      const points = Number(std.points !== undefined ? std.points : (std.score || 0));

      return `
        <div class="flex items-center justify-between p-2.5 rounded-xl transition-all ${isMe ? 'bg-gradient-to-r from-sky-100 to-amber-50 border-2 border-sky-400 shadow-sm' : 'bg-white/80 hover:bg-white'}">
          <div class="flex items-center gap-2.5 min-w-0">
            ${rankBadge}
            <div class="w-8 h-8 rounded-full overflow-hidden shrink-0 border border-white shadow-xs">
              ${avatarSvg}
            </div>
            <div class="min-w-0">
              <p class="font-bold text-xs text-slate-900 truncate flex items-center gap-1.5">
                <span>${std.name}</span>
                ${isMe ? '<span class="text-[9px] text-sky-700 bg-sky-200 px-1.5 py-0.5 rounded-full font-black uppercase">Kamu</span>' : ''}
              </p>
              <span class="text-[10px] text-amber-700 font-semibold">Level ${std.level || 0}</span>
            </div>
          </div>
          <div class="text-right shrink-0">
            <span class="font-extrabold text-sky-800 text-xs">${points.toLocaleString('id-ID')}</span>
            <span class="text-[10px] text-slate-500">Poin</span>
          </div>
        </div>
      `;
    }).join('');
  },

  toggleLeaderboardModal() {
    const modal = document.getElementById('modalStudentLeaderboard');
    if (modal) {
      modal.classList.toggle('hidden');
      modal.classList.toggle('flex');
      if (modal.classList.contains('flex')) {
        this.renderStudentTop10Leaderboard();
      }
    }
  },

  // Student Profile Modal
  openStudentProfileModal() {
    const modal = document.getElementById('modalStudentProfile');
    const student = AppState.student;
    if (!modal || !student) return;

    document.getElementById('editSiswaName').value = student.name;

    // Render 5 Kid character avatars
    const avatarGrid = document.getElementById('siswaAvatarGrid');
    if (avatarGrid) {
      const kidKeys = ['siswa-dara', 'siswa-banu', 'siswa-ian', 'siswa-aga', 'siswa-mia'];
      avatarGrid.innerHTML = kidKeys.map(key => {
        const char = AVATAR_MAP[key];
        const isSelected = (!student.customPhoto && student.avatar === key);
        return `
          <button type="button" onclick="App.selectStudentAvatar('${key}')"
                  class="p-2.5 rounded-2xl flex flex-col items-center gap-1.5 transition-all border-2 ${isSelected ? 'border-sky-500 bg-sky-50 ring-2 ring-sky-300' : 'border-transparent bg-slate-50 hover:bg-slate-100'}">
            <div class="w-14 h-14 rounded-full overflow-hidden shadow-sm">
              ${char.svg}
            </div>
            <span class="text-xs font-bold text-slate-800">${char.name}</span>
            <span class="text-[10px] text-slate-500 text-center leading-tight">${char.title}</span>
          </button>
        `;
      }).join('');
    }

    modal.classList.remove('hidden');
    modal.classList.add('flex');
  },

  closeStudentProfileModal() {
    const modal = document.getElementById('modalStudentProfile');
    if (modal) {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    }
  },

  selectStudentAvatar(avatarKey) {
    this._selectedStudentAvatar = avatarKey;
    this._selectedStudentCustomPhoto = null;
    this.openStudentProfileModal();
  },

  handleStudentPhotoUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      this.showToast('Harap pilih file gambar foto diri!', 'error');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      this._selectedStudentCustomPhoto = e.target.result;
      this.showToast('Foto kerenmu siap disimpan! 📸');
      this.saveStudentProfile();
    };
    reader.readAsDataURL(file);
  },

  saveStudentProfile() {
    const name = document.getElementById('editSiswaName').value.trim();
    if (!name) {
      this.showToast('Nama panggilan kamu jangan kosong ya!', 'warning');
      return;
    }

    const updates = { name };
    if (this._selectedStudentCustomPhoto) {
      updates.customPhoto = this._selectedStudentCustomPhoto;
    } else if (this._selectedStudentAvatar) {
      updates.avatar = this._selectedStudentAvatar;
      updates.customPhoto = null;
    }

    AppState.saveStudent(updates);
    this.closeStudentProfileModal();
    this.renderStudentDashboard();
    this.showToast('Profil Peneliti Cilik berhasil disimpan! 🎉');
  },

  // Fun Facts Rotator
  showRandomFact() {
    const textEl = document.getElementById('funFactText');
    if (!textEl) return;
    this.currentFactIndex = (this.currentFactIndex + 1) % this.funFacts.length;
    textEl.textContent = this.funFacts[this.currentFactIndex];
  },

  renderHeaderProfiles() {
    // In Layar 1 logo lungs
    const mascotLogo = document.getElementById('mainAppLogo');
    if (mascotLogo) mascotLogo.innerHTML = LUNGS_MASCOT_SVG;

    const teacherPortalIcon = document.getElementById('portalGuruMascot');
    if (teacherPortalIcon) teacherPortalIcon.innerHTML = AVATAR_MAP['guru-1'].svg;

    const studentPortalIcon = document.getElementById('portalSiswaMascot');
    if (studentPortalIcon) studentPortalIcon.innerHTML = AVATAR_MAP['siswa-banu'].svg;
  },

  // ==========================================
  // LAYAR 4: JELAJAH MATERI CONTROLLERS
  // ==========================================
  currentSubTopicId: 'sub_1_1',
  currentMateriFilter: 'all',
  isSpeaking: false,

  // Force Render & Auto-click simulasi pada kategori pertama begitu Dashboard Siswa tampil
  triggerAutoSelectFirstCategory() {
    // 1. Force Render seketika ke container materi
    this.renderMateriScreen('all');
    this.bindMateriEvents();

    // 2. Simulasi Klik Otomatis pada tombol kategori pertama ("Semua 6 Kategori" atau "1. Fungsi")
    setTimeout(() => {
      const firstCatBtn = document.querySelector('.filter-pill-btn[data-filter="all"]') || 
                          document.querySelector('.filter-pill-btn[data-filter="kat_fungsi"]') || 
                          document.querySelector('.filter-pill-btn');
      if (firstCatBtn) {
        if (typeof firstCatBtn.click === 'function') {
          firstCatBtn.click();
        } else {
          this.filterMateri('all');
        }
      } else {
        this.filterMateri('all');
      }

      // Pastikan kartu detail materi terisi seketika tanpa kotak kosong
      if (this.currentSubTopicId) {
        this.renderMateriDetailCard(this.currentSubTopicId);
      } else {
        this.renderMateriDetailCard('sub_1_1');
      }
      this.bindMateriEvents();
    }, 50);

    // Backup render pengaman untuk menjamin elemen DOM terisi 100%
    setTimeout(() => {
      const accordion = document.getElementById('materiAccordionContainer');
      const detail = document.getElementById('materiDetailCard');
      if (accordion && (!accordion.innerHTML || accordion.innerHTML.trim() === '')) {
        this.renderMateriScreen('all');
      }
      if (detail && (!detail.innerHTML || detail.innerHTML.trim() === '')) {
        this.renderMateriDetailCard('sub_1_1');
      }
      this.bindMateriEvents();
    }, 250);
  },

  // Mapping media (video & poster) untuk setiap sub-topik materi IPA
  getSubTopicMedia(subId) {
    const mediaMap = {
      // 1. Fungsi Sistem Pernapasan
      'sub_1_1': { video: './assets/video_ikhtisar_napas.mp4', poster: './assets/siluet_tubuh.jpg', caption: 'Oksigen Menghasilkan Energi Tubuh' },
      'sub_1_2': { video: './assets/video_ikhtisar_napas.mp4', poster: './assets/siluet_tubuh.jpg', caption: 'Pelepasan Karbon Dioksida & Uap Air' },
      // 2. Organ Pernapasan
      'sub_2_1': { video: './assets/video_hidung.mp4', poster: './assets/hidung_organ.jpg', caption: 'Rongga Hidung, Rambut Silia & Selaput Lendir' },
      'sub_2_2': { video: './assets/video_faring.mp4', poster: './assets/tenggorokan_organ.jpg', caption: 'Saluran Faring & Katup Epiglotis' },
      'sub_2_3': { video: './assets/video_laring.mp4', poster: './assets/tenggorokan_organ.jpg', caption: 'Laring & Getaran Pita Suara' },
      'sub_2_4': { video: './assets/video_trakea.mp4', poster: './assets/tenggorokan_organ.jpg', caption: 'Trakea: Batang Tenggorok Cincin Tulang Rawan' },
      'sub_2_5': { video: './assets/video_bronkus.mp4', poster: './assets/paruparu_polos.jpg', caption: 'Percabangan Bronkus Kanan & Kiri' },
      'sub_2_6': { video: './assets/video_bronkiolus.mp4', poster: './assets/paruparu_polos.jpg', caption: 'Percabangan Ranting Halus Bronkiolus' },
      'sub_2_7': { video: './assets/video_alveolus.mp4', poster: './assets/gua_alveolus.jpg', caption: 'Kantung Gelembung Udara Alveolus & Kapiler' },
      'sub_2_8': { video: './assets/video_paruparu.mp4', poster: './assets/paruparu_polos.jpg', caption: 'Paru-paru: Pulmo Kanan Tiga Lobus & Kiri Dua Lobus' },
      'sub_2_9': { video: './assets/video_paruparu.mp4', poster: './assets/paruparu_polos.jpg', caption: 'Selaput Pleura & Otot Diafragma' },
      // 3. Proses Pernapasan Manusia (Video Full Frame Autoplay Loop Muted)
      'sub_3_1': { src: './assets/animasi_inspirasi_final.mp4', video: './assets/animasi_inspirasi_final.mp4', fallback: './assets/animasi_inspirasi_final.mp4.mp4', poster: './assets/siluet_tubuh.jpg', caption: 'Mekanisme Inspirasi (Menarik Napas)' },
      'sub_3_2': { src: './assets/animasi_ekspirasi_final.mp4', video: './assets/animasi_ekspirasi_final.mp4', fallback: './assets/animasi_ekspirasi_final.mp4.mp4', poster: './assets/siluet_tubuh.jpg', caption: 'Mekanisme Ekspirasi (Mengembuskan Napas)' },
      'sub_3_3': { src: './assets/proses_3_pertukaran_gas.mp4', video: './assets/proses_3_pertukaran_gas.mp4', fallback: './assets/proses_3_pertukaran_gas.mp4.mp4', poster: './assets/gua_alveolus.jpg', caption: 'Pertukaran Gas di Alveolus (Difusi Gas)' },
      'sub_3_4': { src: './assets/proses_4_dada_perut.mp4', video: './assets/proses_4_dada_perut.mp4', fallback: './assets/proses_4_dada_perut.mp4.mp4', poster: './assets/siluet_tubuh.jpg', caption: 'Pernapasan Dada vs Pernapasan Perut' },
      // 4. Penyakit & Gangguan
      'sub_4_1': { src: './assets/penyakit_1_asma.mp4', video: './assets/penyakit_1_asma.mp4', fallback: './assets/penyakit_1_asma.mp4.mp4', poster: './assets/paruparu_polos.jpg', caption: 'Penyakit 1: Visualisasi Asma & Penyempitan Saluran Bronkus' },
      'sub_4_2': { src: './assets/penyakit_2_influenza.mp4', video: './assets/penyakit_2_influenza.mp4', fallback: './assets/penyakit_2_influenza.mp4.mp4', poster: './assets/hidung_organ.jpg', caption: 'Penyakit 2: Visualisasi Infeksi Virus Influenza' },
      'sub_4_3': { src: './assets/penyakit_3_pneumonia.mp4', video: './assets/penyakit_3_pneumonia.mp4', fallback: './assets/penyakit_3_pneumonia.mp4.mp4', poster: './assets/gua_alveolus.jpg', caption: 'Penyakit 3: Visualisasi Pneumonia & Cairan Alveolus' },
      'sub_4_4': { src: './assets/penyakit_4_tbc.mp4', video: './assets/penyakit_4_tbc.mp4', fallback: './assets/penyakit_4_tbc.mp4.mp4', poster: './assets/paruparu_polos.jpg', caption: 'Penyakit 4: Visualisasi Tuberkulosis (TBC) & Infeksi Bakteri' },
      'sub_4_5': { src: './assets/penyakit_5_ispa.jpg', image: './assets/penyakit_5_ispa.jpg', fallback: './assets/penyakit_5_ispa.jpg.png', caption: 'Penyakit 5: Anatomi & Dampak Klinis ISPA' },
      'sub_4_6': { src: './assets/penyakit_6_bronkitis.jpg', image: './assets/penyakit_6_bronkitis.jpg', fallback: './assets/penyakit_6_bronkitis.jpg.png', caption: 'Penyakit 6: Anatomi & Peradangan Dinding Bronkitis' },
      // 5. Faktor Frekuensi Napas / Kualitas Pernapasan
      'sub_5_1': { src: './assets/faktor_1_kesehatan.jpg', image: './assets/faktor_1_kesehatan.jpg', fallback: './assets/faktor_1_kesehatan.jpg.png', caption: 'Faktor 1: Kondisi Kesehatan Fisik & Organ Tubuh' },
      'sub_5_2': { src: './assets/faktor_2_mikroorganisme.jpg', image: './assets/faktor_2_mikroorganisme.jpg', fallback: './assets/faktor_2_mikroorganisme.jpg.jpg', caption: 'Faktor 2: Mikroorganisme & Patogen Udara' },
      'sub_5_3': { src: './assets/faktor_3_lingkungan.jpg', image: './assets/faktor_3_lingkungan.jpg', fallback: './assets/faktor_3_lingkungan.jpg.jpg', caption: 'Faktor 3: Kualitas Lingkungan Hidup & Polusi' },
      'sub_5_4': { src: './assets/faktor_4_aktivitas.mp4', video: './assets/faktor_4_aktivitas.mp4', fallback: './assets/faktor_4_aktivitas.mp4.mp4', poster: './assets/siluet_tubuh.jpg', caption: 'Faktor 4: Pengaruh Aktivitas Tubuh & Usia terhadap Frekuensi Napas' },
      // 6. Cara Rawat Paru / Menjaga Kesehatan Paru-paru (Gambar Statis Full Frame)
      'sub_6_1': { src: './assets/rawat_1_olahraga.jpg', image: './assets/rawat_1_olahraga.jpg', fallback: './assets/rawat_1_olahraga.jpg.jpg', caption: 'Olahraga Teratur & Latihan Napas Dalam' },
      'sub_6_2': { src: './assets/rawat_2_tumbuhan.jpg', image: './assets/rawat_2_tumbuhan.jpg', fallback: './assets/rawat_2_tumbuhan.jpg.png', caption: 'Menjaga Kebersihan Udara & Menanam Pohon' },
      'sub_6_3': { src: './assets/rawat_3_jauhi_asap.jpg', image: './assets/rawat_3_jauhi_asap.jpg', fallback: './assets/rawat_3_jauhi_asap.jpg.jpg', caption: 'Menjauhi Asap Rokok & Polusi Berbahaya' },
      'sub_6_4': { src: './assets/rawat_4_makanan.jpg', image: './assets/rawat_4_makanan.jpg', fallback: './assets/rawat_4_makanan.jpg.png', caption: 'Pola Makan Sehat, Minum Air & Istirahat Cukup' }
    };

    return mediaMap[subId] || {
      video: './assets/video_ikhtisar_napas.mp4',
      poster: './assets/paruparu_polos.jpg',
      caption: 'Visualisasi Modul IPA Sistem Pernapasan Manusia'
    };
  },

  renderMateriScreen(filter = null) {
    if (filter !== null) this.currentMateriFilter = filter;
    
    // 1. Render Progress Bar Ketuntasan Belajar
    const progress = (window.AppState && typeof AppState.getLearnedProgress === 'function')
      ? AppState.getLearnedProgress()
      : { count: 0, total: 25, percentage: 0 };

    const progressCountEl = document.getElementById('materiProgressCount');
    const progressBarEl = document.getElementById('materiProgressBar');
    const progressPercentEl = document.getElementById('materiProgressPercent');

    if (progressCountEl) progressCountEl.textContent = `${progress.count} dari ${progress.total} Sub-topik Selesai`;
    if (progressPercentEl) progressPercentEl.textContent = `${progress.percentage}% Selesai`;
    if (progressBarEl) progressBarEl.style.width = `${progress.percentage}%`;

    // 2. Render Accordion of Categories
    const container = document.getElementById('materiAccordionContainer');
    const categoriesData = (typeof MATERI_CATEGORIES !== 'undefined') ? MATERI_CATEGORIES : (window.MATERI_CATEGORIES || []);

    if (!container || !categoriesData || categoriesData.length === 0) return;

    let categoriesToRender = categoriesData;
    if (this.currentMateriFilter !== 'all') {
      categoriesToRender = categoriesData.filter(c => c.id === this.currentMateriFilter);
      if (categoriesToRender.length === 0) categoriesToRender = categoriesData;
    }

    container.innerHTML = categoriesToRender.map((cat) => {
      // Hitung ketuntasan materi per kategori
      const learnedInCat = cat.subTopics.filter(s => (window.AppState && typeof AppState.isTopicLearned === 'function') ? AppState.isTopicLearned(s.id) : false).length;
      const totalInCat = cat.subTopics.length;
      const isAllCatLearned = learnedInCat === totalInCat;

      // Sub-buttons grid
      const subButtonsHtml = cat.subTopics.map(sub => {
        const isLearned = (window.AppState && typeof AppState.isTopicLearned === 'function') ? AppState.isTopicLearned(sub.id) : false;
        const isActive = this.currentSubTopicId === sub.id;

        return `
          <button type="button" 
                  data-sub-id="${sub.id}"
                  onclick="App.selectSubTopic('${sub.id}')"
                  class="sub-button-item p-3 rounded-2xl bg-white/90 text-left flex items-start gap-2.5 relative transition-all shadow-xs cursor-pointer ${isActive ? 'active ring-2 ring-sky-400 bg-sky-50/90' : 'hover:bg-white'}">
            <span class="text-2xl shrink-0 p-1.5 rounded-xl bg-slate-100 flex items-center justify-center">${sub.icon}</span>
            <div class="min-w-0 flex-1">
              <div class="flex items-center justify-between gap-1">
                <span class="font-heading text-xs font-bold text-slate-900 leading-tight truncate block">${sub.title}</span>
                ${isLearned ? '<span class="text-xs shrink-0" title="Sudah Dipahami">✅</span>' : '<span class="text-[10px] text-slate-400 shrink-0 font-medium">⏳</span>'}
              </div>
              <p class="text-[11px] text-slate-500 line-clamp-1 mt-0.5">${sub.shortDesc}</p>
            </div>
          </button>
        `;
      }).join('');

      return `
        <div class="accordion-materi-item glass-panel overflow-hidden border border-white/80 shadow-sm transition-all mb-4" id="accordion-${cat.id}">
          <!-- Main Category Header Button -->
          <button type="button" 
                  data-cat-toggle="${cat.id}"
                  onclick="App.toggleMateriAccordion('${cat.id}')"
                  class="w-full text-left p-4 sm:p-5 flex items-center justify-between bg-gradient-to-r ${cat.gradient} text-white shadow-inner active:brightness-95 transition-all cursor-pointer">
            <div class="flex items-center gap-3 min-w-0">
              <div class="w-11 h-11 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-2xl shadow-xs shrink-0">
                ${cat.icon}
              </div>
              <div class="min-w-0">
                <div class="flex items-center gap-2">
                  <span class="px-2 py-0.5 rounded-full bg-white/25 text-white font-heading text-[10px] font-extrabold uppercase tracking-wide">
                    ${cat.badge}
                  </span>
                  ${isAllCatLearned ? '<span class="px-2 py-0.5 rounded-full bg-emerald-400 text-slate-900 font-heading text-[10px] font-extrabold">Semua Paham ⭐</span>' : ''}
                </div>
                <h3 class="font-heading text-base sm:text-lg font-extrabold text-white truncate leading-tight mt-0.5">
                  ${cat.title}
                </h3>
              </div>
            </div>

            <div class="flex items-center gap-2 shrink-0 ml-2">
              <span class="hidden sm:inline-block text-xs font-bold bg-black/20 px-2.5 py-1 rounded-full text-white">
                ${learnedInCat}/${totalInCat} Selesai
              </span>
              <span class="material-symbols-outlined text-[24px] transition-transform duration-300 accordion-chevron rotate-180" id="chevron-${cat.id}">
                expand_circle_down
              </span>
            </div>
          </button>

          <!-- Nested Sub-Buttons Content -->
          <div class="accordion-materi-content p-4 sm:p-5 bg-white/70 space-y-3" id="content-${cat.id}">
            <div class="flex items-center justify-between text-xs text-slate-600 mb-1">
              <span class="font-bold flex items-center gap-1.5 text-slate-800">
                <span class="material-symbols-outlined text-[16px] text-sky-600">touch_app</span>
                Pilih Sub-Materi untuk Membuka Kartu Penjelasan & Video:
              </span>
              <span class="text-[11px] text-slate-500 font-semibold">${totalInCat} Sub-Button</span>
            </div>

            <!-- Sub-buttons Grid -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
              ${subButtonsHtml}
            </div>
          </div>
        </div>
      `;
    }).join('');

    // Ensure category containing active subtopic is expanded
    if (typeof findSubTopicById === 'function') {
      const activeSub = findSubTopicById(this.currentSubTopicId);
      if (activeSub) {
        const activeContent = document.getElementById(`content-${activeSub.category.id}`);
        const activeChevron = document.getElementById(`chevron-${activeSub.category.id}`);
        if (activeContent) activeContent.classList.remove('hidden');
        if (activeChevron) activeChevron.classList.add('rotate-180');
      }
    }

    // Render the active sub-topic detail card with video/image
    this.renderMateriDetailCard(this.currentSubTopicId);
    this.bindMateriEvents();
  },

  toggleMateriAccordion(catId) {
    const content = document.getElementById(`content-${catId}`);
    const chevron = document.getElementById(`chevron-${catId}`);
    if (!content) return;

    if (content.classList.contains('hidden')) {
      content.classList.remove('hidden');
      if (chevron) chevron.classList.add('rotate-180');

      // Auto-load sub-topik pertama jika sub-topik saat ini dari kategori lain
      if (typeof MATERI_CATEGORIES !== 'undefined' && typeof findSubTopicById === 'function') {
        const activeSub = findSubTopicById(this.currentSubTopicId);
        if (!activeSub || activeSub.category.id !== catId) {
          const targetCat = MATERI_CATEGORIES.find(c => c.id === catId);
          if (targetCat && targetCat.subTopics && targetCat.subTopics.length > 0) {
            this.selectSubTopic(targetCat.subTopics[0].id);
          }
        }
      }
    } else {
      content.classList.add('hidden');
      if (chevron) chevron.classList.remove('rotate-180');
    }
  },

  selectSubTopic(subId) {
    this.currentSubTopicId = subId;
    
    // Stop any ongoing speech
    if (this.isSpeaking && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      this.isSpeaking = false;
    }

    // Update detail card with new video & content
    this.renderMateriDetailCard(subId);

    // Update active highlight on all sub buttons in the DOM
    const allSubBtns = document.querySelectorAll('.sub-button-item');
    allSubBtns.forEach(btn => {
      if (btn.getAttribute('data-sub-id') === subId) {
        btn.classList.add('active', 'ring-2', 'ring-sky-400', 'bg-sky-50/90');
        btn.classList.remove('hover:bg-white');
      } else {
        btn.classList.remove('active', 'ring-2', 'ring-sky-400', 'bg-sky-50/90');
        btn.classList.add('hover:bg-white');
      }
    });

    // Re-bind click handlers
    this.bindMateriEvents();

    // Scroll to detail card on mobile
    const detailBox = document.getElementById('materiDetailCard');
    if (detailBox && window.innerWidth < 1024) {
      detailBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  },

  renderMateriDetailCard(subId) {
    const detailBox = document.getElementById('materiDetailCard');
    if (!detailBox) return;

    const findFn = (typeof findSubTopicById === 'function') ? findSubTopicById : window.findSubTopicById;
    if (typeof findFn !== 'function') return;

    let found = findFn(subId);
    if (!found) {
      this.currentSubTopicId = 'sub_1_1';
      found = findFn('sub_1_1');
      if (!found) return;
    }

    const { subTopic, category } = found;
    const isLearned = (window.AppState && typeof AppState.isTopicLearned === 'function')
      ? AppState.isTopicLearned(subTopic.id)
      : false;
    const media = this.getSubTopicMedia(subTopic.id);
    const mediaSrc = (media.src || media.video || media.image || subTopic.mediaSrc || '').trim();
    const mediaFallback = media.fallback || subTopic.mediaFallback || '';
    const cleanLowerSrc = mediaSrc.toLowerCase();

    // Deteksi ekstensi fail (.mp4 atau .jpg / format gambar) secara dinamis & otomatis
    const isVideoFile = cleanLowerSrc.endsWith('.mp4') || cleanLowerSrc.includes('.mp4') || cleanLowerSrc.endsWith('.webm');
    const isImageFile = cleanLowerSrc.endsWith('.jpg') || cleanLowerSrc.endsWith('.jpeg') || cleanLowerSrc.endsWith('.png') || cleanLowerSrc.endsWith('.webp') || cleanLowerSrc.endsWith('.svg') || cleanLowerSrc.includes('.jpg') || cleanLowerSrc.includes('.png');

    // Tentukan apakah komponen harus merender <video> atau <img>
    const isVideo = isVideoFile || (subTopic.mediaType === 'video') || (!!media.video && !isImageFile);

    // Format content with nice paragraphs and lists
    const paragraphs = subTopic.content.split('\n').filter(p => p.trim()).map(p => {
      if (p.match(/^\d+\./)) {
        return `<li class="ml-4 list-decimal text-slate-700 leading-relaxed py-0.5 font-medium">${p.replace(/^\d+\.\s*/, '')}</li>`;
      }
      return `<p class="text-sm text-slate-700 leading-relaxed mb-2.5 font-medium">${p}</p>`;
    }).join('');

    const escapedTitle = (subTopic.title || '').replace(/'/g, "\\'");

    // Render komponen media dinamis (Full Frame: Edge-to-Edge, object-fit: cover, sudut melengkung rapi, bersih tanpa overlay/badge/tombol pemutar):
    let mediaDisplayHtml = '';
    if (isVideo) {
      mediaDisplayHtml = `
        <!-- Video Display Container (Full Frame: 100% width & height, object-fit cover, overflow hidden, sudut melengkung) -->
        <div class="media-display-container relative w-full h-48 sm:h-56 md:h-64 rounded-2xl overflow-hidden bg-slate-900 border border-slate-700/60 shadow-md">
          <video id="materiVideoDisplay" 
                 class="w-full h-full object-cover block" 
                 style="width: 100%; height: 100%; object-fit: cover;"
                 src="${mediaSrc}" 
                 poster="${media.poster || ''}" 
                 autoplay loop muted playsinline
                 onerror="App.handleMediaVideoError(this, '${mediaFallback || media.poster || ''}', '${escapedTitle}')">
            <source src="${mediaSrc}" type="video/mp4">
            ${mediaFallback ? `<source src="${mediaFallback}" type="video/mp4">` : ''}
            Browser Anda tidak mendukung pemutar video.
          </video>
        </div>
      `;
    } else {
      mediaDisplayHtml = `
        <!-- Image Display Container (Full Frame: 100% width & height, object-fit cover, overflow hidden, sudut melengkung) -->
        <div class="media-display-container relative w-full h-48 sm:h-56 md:h-64 rounded-2xl overflow-hidden bg-slate-900 border border-slate-700/60 shadow-md">
          <img id="materiImageDisplay" 
               src="${mediaSrc}" 
               alt="${escapedTitle}" 
               class="w-full h-full object-cover block"
               style="width: 100%; height: 100%; object-fit: cover;"
               onerror="App.handleMediaImageError(this, '${mediaFallback || mediaSrc}', '${escapedTitle}')" />
        </div>
      `;
    }

    detailBox.innerHTML = `
      <div class="flex flex-col gap-4">
        <!-- Top Title & Badge Row -->
        <div class="flex items-start justify-between gap-3 pb-3 border-b border-slate-100">
          <div class="flex items-center gap-3">
            <div class="w-14 h-14 rounded-2xl bg-gradient-to-tr ${category.gradient} text-white flex items-center justify-center text-3xl shadow-sm shrink-0">
              ${subTopic.icon}
            </div>
            <div>
              <div class="flex items-center gap-2 mb-0.5">
                <span class="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[10px] font-extrabold uppercase tracking-wide">
                  ${category.title}
                </span>
                ${isLearned ? '<span class="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-extrabold flex items-center gap-1">✅ Sudah Paham</span>' : '<span class="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-extrabold flex items-center gap-1">📖 Belum Ditandai</span>'}
              </div>
              <h3 class="font-heading text-lg sm:text-xl font-extrabold text-slate-900 leading-tight">
                ${subTopic.title}
              </h3>
            </div>
          </div>
        </div>

        <!-- Render Media (Video / Gambar Dinamis) -->
        ${mediaDisplayHtml}

        <!-- Penjelasan Materi Ramah Anak -->
        <div class="p-4 rounded-2xl bg-white/80 border border-white/90 shadow-inner">
          <div class="flex items-center gap-2 mb-2 text-sky-800 font-heading font-extrabold text-xs">
            <span class="material-symbols-outlined text-[18px]">menu_book</span>
            <span>Penjelasan Konsep Sains (Kelas 6 SD):</span>
          </div>
          <div class="text-sm text-slate-700">
            ${paragraphs}
          </div>
        </div>

        <!-- Kotak Fakta Seru Bernapas (Did You Know) -->
        <div class="p-4 rounded-2xl bg-amber-50/90 border border-amber-200 shadow-xs flex items-start gap-3">
          <span class="text-2xl shrink-0 mt-0.5">🫧</span>
          <div>
            <span class="font-heading text-xs font-extrabold text-amber-900 block mb-0.5">
              Tahukah Kamu? Fakta Menakjubkan:
            </span>
            <p class="text-xs text-amber-950 leading-relaxed font-semibold">
              ${subTopic.funFact}
            </p>
          </div>
        </div>

        <!-- Tombol Aksi: Dengarkan Suara & Tandai Sudah Paham -->
        <div class="flex flex-col sm:flex-row items-center gap-2.5 pt-2 border-t border-slate-100">
          
          <!-- Tombol Text-to-Speech (Web Speech API) -->
          <button type="button" 
                  id="btnTtsAudio" 
                  onclick="App.toggleSpeechAudio('${encodeURIComponent(subTopic.title + '. ' + subTopic.content)}', this)" 
                  class="w-full sm:w-auto flex-1 py-3 px-4 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-heading text-xs font-extrabold border border-slate-300 shadow-xs flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer">
            <span class="material-symbols-outlined text-[18px] text-sky-600" id="ttsIcon">volume_up</span>
            <span id="ttsLabel">Dengarkan Suara (Audio)</span>
          </button>

          <!-- Tombol Tandai Sudah Paham -->
          <button type="button" 
                  onclick="App.toggleMarkUnderstood('${subTopic.id}')" 
                  class="${isLearned ? 'btn-squishy-secondary' : 'btn-squishy-primary'} w-full sm:w-auto flex-1 py-3 px-5 text-xs font-bold cursor-pointer">
            <span class="material-symbols-outlined text-[18px]">${isLearned ? 'check_circle' : 'done_all'}</span>
            <span>${isLearned ? 'Sudah Dipahami (✅)' : 'Tandai Sudah Paham (+50 Poin)'}</span>
          </button>
        </div>
      </div>
    `;

    // Pastikan video otomatis berputar (autoplay, looping, muted tanpa klik)
    const activeVideo = detailBox.querySelector('video');
    if (activeVideo) {
      activeVideo.muted = true;
      activeVideo.play().catch(() => {});
    }
  },

  handleMediaVideoError(videoEl, fallbackSrc, title) {
    if (!videoEl) return;
    if (videoEl.dataset.fallbackTried !== 'true' && fallbackSrc && fallbackSrc.endsWith('.mp4')) {
      videoEl.dataset.fallbackTried = 'true';
      videoEl.src = fallbackSrc;
      videoEl.load();
      videoEl.play().catch(() => {});
      return;
    }

    const parent = videoEl.parentElement;
    if (!parent) return;

    const posterSrc = (fallbackSrc && (fallbackSrc.endsWith('.jpg') || fallbackSrc.endsWith('.png'))) 
      ? fallbackSrc 
      : './assets/paruparu_polos.jpg';
    parent.innerHTML = `
      <div class="relative w-full h-48 sm:h-56 md:h-64 rounded-2xl overflow-hidden bg-gradient-to-br from-slate-900 to-sky-950 flex flex-col items-center justify-center p-4 text-center border border-slate-700">
        <img src="${posterSrc}" 
             alt="${title}" 
             class="absolute inset-0 w-full h-full object-cover opacity-75"
             onerror="this.style.display='none'; const fb = this.nextElementSibling; if (fb) fb.style.display='flex';" />
        <div style="display:none;" class="absolute inset-0 flex items-center justify-center bg-slate-900">
          <span class="text-6xl">🫁</span>
        </div>
        <div class="relative z-10 bg-slate-900/85 backdrop-blur-md p-3.5 rounded-xl border border-white/20 max-w-xs shadow-lg">
          <div class="flex items-center justify-center gap-1.5 text-teal-400 font-bold text-xs mb-1">
            <span class="material-symbols-outlined text-[18px]">smart_display</span>
            <span>Video Pembelajaran</span>
          </div>
          <p class="font-bold text-white text-xs">${title}</p>
          <p class="text-[10px] text-slate-300 mt-0.5">Media siap dipelajari pada modul ini</p>
        </div>
      </div>
    `;
  },

  handleMediaImageError(imgEl, fallbackSrc, title) {
    if (!imgEl) return;
    if (imgEl.dataset.fallbackTried !== 'true' && fallbackSrc && fallbackSrc !== imgEl.src) {
      imgEl.dataset.fallbackTried = 'true';
      imgEl.src = fallbackSrc;
      return;
    }

    const parent = imgEl.parentElement;
    if (!parent) return;

    parent.innerHTML = `
      <div class="relative w-full h-48 sm:h-56 md:h-64 rounded-2xl overflow-hidden bg-gradient-to-br from-slate-900 to-sky-950 flex flex-col items-center justify-center p-4 text-center border border-slate-700">
        <div class="relative z-10 bg-slate-900/85 backdrop-blur-md p-4 rounded-xl border border-white/20 max-w-xs shadow-lg flex flex-col items-center">
          <span class="text-4xl mb-1.5">🩺</span>
          <div class="flex items-center justify-center gap-1.5 text-sky-400 font-bold text-xs mb-1">
            <span class="material-symbols-outlined text-[18px]">medical_services</span>
            <span>Ilustrasi Medis Klinis</span>
          </div>
          <p class="font-bold text-white text-xs">${title}</p>
          <p class="text-[10px] text-slate-300 mt-0.5">Gambar anatomi tersimpan dalam arsip materi</p>
        </div>
      </div>
    `;
  },

  loadVideo(src, poster = null) {
    const videoEl = document.getElementById('materiVideoDisplay');
    if (videoEl) {
      if (poster) videoEl.poster = poster;
      videoEl.src = src;
      videoEl.load();
      const playPromise = videoEl.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {});
      }
    }
  },

  renderMateri(filter = null) {
    return this.renderMateriScreen(filter);
  },

  toggleMarkUnderstood(subId) {
    const res = AppState.markTopicLearned(subId);
    if (res.isNew) {
      this.showToast('Hebat! Kamu telah memahami materi ini! ⭐ (+50 Poin)');
    } else {
      this.showToast('Materi ini sudah tersimpan di riwayat belajarmu!');
    }

    // Refresh views to update progress bars on all screens
    this.renderMateriScreen();
    this.renderStudentDashboard();
    this.renderTeacherDashboard();
  },

  toggleSpeechAudio(encodedText, btnEl) {
    if (!('speechSynthesis' in window)) {
      this.showToast('Browser ini belum mendukung Web Speech Audio.', 'warning');
      return;
    }

    const ttsIcon = document.getElementById('ttsIcon');
    const ttsLabel = document.getElementById('ttsLabel');

    if (this.isSpeaking) {
      window.speechSynthesis.cancel();
      this.isSpeaking = false;
      if (ttsIcon) ttsIcon.textContent = 'volume_up';
      if (ttsLabel) ttsLabel.textContent = 'Dengarkan Suara (Audio)';
      if (btnEl) btnEl.classList.remove('bg-sky-100', 'border-sky-400');
      return;
    }

    const textToSpeak = decodeURIComponent(encodedText);
    window.speechSynthesis.cancel(); // clear queue

    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.lang = 'id-ID';
    utterance.rate = 0.95; // clear tempo for 6th graders
    utterance.pitch = 1.05;

    this.isSpeaking = true;
    if (ttsIcon) ttsIcon.textContent = 'stop_circle';
    if (ttsLabel) ttsLabel.innerHTML = '<span class="flex items-center gap-1"><span>Membaca...</span> <span class="sound-bar"></span><span class="sound-bar"></span><span class="sound-bar"></span></span>';
    if (btnEl) btnEl.classList.add('bg-sky-100', 'border-sky-400');

    utterance.onend = () => {
      this.isSpeaking = false;
      if (ttsIcon) ttsIcon.textContent = 'volume_up';
      if (ttsLabel) ttsLabel.textContent = 'Dengarkan Suara (Audio)';
      if (btnEl) btnEl.classList.remove('bg-sky-100', 'border-sky-400');
    };

    utterance.onerror = () => {
      this.isSpeaking = false;
      if (ttsIcon) ttsIcon.textContent = 'volume_up';
      if (ttsLabel) ttsLabel.textContent = 'Dengarkan Suara (Audio)';
      if (btnEl) btnEl.classList.remove('bg-sky-100', 'border-sky-400');
    };

    window.speechSynthesis.speak(utterance);
  },

  filterMateri(catFilter) {
    this.currentMateriFilter = catFilter;

    // Update active filter pill style
    const pills = document.querySelectorAll('.filter-pill-btn');
    pills.forEach(p => {
      if (p.getAttribute('data-filter') === catFilter) {
        p.className = 'filter-pill-btn px-3.5 py-1.5 rounded-full bg-sky-600 text-white font-heading text-xs font-bold shadow-xs flex items-center gap-1 shrink-0';
      } else {
        p.className = 'filter-pill-btn px-3.5 py-1.5 rounded-full bg-white/80 hover:bg-white text-slate-700 font-heading text-xs font-bold border border-slate-200 shadow-xs flex items-center gap-1 shrink-0 transition-all cursor-pointer';
      }
    });

    // Otomatis pilih sub-topik pertama dari kategori yang dipilih
    const categoriesData = (typeof MATERI_CATEGORIES !== 'undefined') ? MATERI_CATEGORIES : (window.MATERI_CATEGORIES || []);
    if (categoriesData && categoriesData.length > 0) {
      if (catFilter !== 'all') {
        const targetCategory = categoriesData.find(c => c.id === catFilter);
        if (targetCategory && targetCategory.subTopics && targetCategory.subTopics.length > 0) {
          this.currentSubTopicId = targetCategory.subTopics[0].id;
        }
      } else {
        const findFn = (typeof findSubTopicById === 'function') ? findSubTopicById : window.findSubTopicById;
        if (typeof findFn === 'function' && !findFn(this.currentSubTopicId)) {
          this.currentSubTopicId = 'sub_1_1';
        }
      }
    }

    this.renderMateriScreen(catFilter);
    this.bindMateriEvents();
  },

  bindMateriEvents() {
    // 1. Re-bind quick filter pill buttons (.filter-pill-btn)
    const filterPills = document.querySelectorAll('.filter-pill-btn');
    filterPills.forEach(pill => {
      const filter = pill.getAttribute('data-filter') || 'all';
      pill.onclick = (e) => {
        if (e && e.preventDefault) e.preventDefault();
        this.filterMateri(filter);
      };
    });

    // 2. Re-bind accordion category headers ([data-cat-toggle])
    const headers = document.querySelectorAll('[data-cat-toggle]');
    headers.forEach(hdr => {
      const catId = hdr.getAttribute('data-cat-toggle');
      hdr.onclick = (e) => {
        if (e && e.preventDefault) e.preventDefault();
        this.toggleMateriAccordion(catId);
      };
    });

    // 3. Re-bind sub-buttons (.sub-button-item, [data-sub-id])
    const subButtons = document.querySelectorAll('.sub-button-item, [data-sub-id]');
    subButtons.forEach(btn => {
      const subId = btn.getAttribute('data-sub-id');
      if (subId) {
        btn.onclick = (e) => {
          if (e && e.preventDefault) e.preventDefault();
          this.selectSubTopic(subId);
        };
      }
    });
  }
};

// Global Window Aliases
window.App = App;
window.renderMateri = function(filter) {
  return App.renderMateri(filter);
};
window.loadVideo = function(src, poster) {
  return App.loadVideo(src, poster);
};
