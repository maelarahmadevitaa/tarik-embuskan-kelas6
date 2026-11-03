/**
 * Simulator Ruang Kontrol Pernapasan (Operator Dashboard)
 * Arena Kuis Level 1-6 - Tarik dan Embuskan (IPA Kelas 6 SD)
 * Fitur: Hologram 3D Video Viewport Dinamis (Kasus 1-6),
 *        O2 Level Health Bar (Penurunan 55 detik, waktu berpikir nyaman untuk siswa SD),
 *        4 Tombol Aksi Darurat Futuristik (Glassmorphism) dengan Pengacakan Posisi Fisher-Yates,
 *        Alur Flow Game Over & Sukses Presisi (Ulangi Kasus Ini, Lanjut Kasus Berikutnya, Fase Krisis Menengah Terlewati),
 *        Live Leaderboard, dan Teacher Bypass Key (G 3x dalam < 1 detik)
 */

const PuzzleOrgan = {
  // 6 Kasus Ruang Kontrol Darurat (HOTS)
  cases: [
    {
      level: 1,
      targetOrgan: 'RONGGA HIDUNG & SALURAN ATAS',
      alarmClass: 'control-room-alarm-yellow',
      alarmColor: 'amber',
      alarmIcon: 'warning',
      alarmTitle: 'BAHAYA UDARA DINGIN & KERING MASUK!',
      alarmSubtitle: 'Sensor hidung mendeteksi udara dingin berdebu. Bahaya radang dan iritasi saluran napas!',
      vitalText: 'VITALS: 78 BPM / 18 RPM',
      videoSrc: './assets/video_ikhtisar_napas.mp4',
      fallbackSrc: './assets/video_hidung.mp4',
      zoomClass: '',
      rewardTitle: 'Rongga Hidung Berhasil Mempertahankan Suhu & Kebersihan!',
      rewardDesc: 'Respon tepat! Kelenjar mukus (lendir) dan rambut silia langsung aktif menghangatkan udara dingin serta menangkap partikel debu kotor.',
      funFact: 'Hidung manusia memproduksi sekitar 1 liter lendir setiap hari untuk menyaring miliaran partikel kotoran dan kuman sebelum mencapai paru-paru!',
      actions: [
        {
          id: 'c1-lendir',
          label: 'Aktifkan Lendir',
          icon: 'water_drop',
          isCorrect: true,
          desc: 'Kelenjar lendir & silia menyaring debu serta menghangatkan udara.'
        },
        {
          id: 'c1-batuk',
          label: 'Batuk Keras!',
          icon: 'record_voice_over',
          isCorrect: false,
          desc: 'Batuk tidak menyaring partikel debu halus di rongga hidung.'
        },
        {
          id: 'c1-epiglotis',
          label: 'Tutup Epiglotis',
          icon: 'lock',
          isCorrect: false,
          desc: 'Epiglotis berada di laring untuk menelan makanan, bukan di hidung.'
        },
        {
          id: 'c1-diafragma',
          label: 'Pompa Diafragma',
          icon: 'expand',
          isCorrect: false,
          desc: 'Memompa diafragma justru menghirup lebih banyak udara dingin kotor.'
        }
      ]
    },
    {
      level: 2,
      targetOrgan: 'KATUP EPIGLOTIS & FARING/LARING',
      alarmClass: 'control-room-alarm-red',
      alarmColor: 'red',
      alarmIcon: 'emergency',
      alarmTitle: 'BENDA ASING (BAKSO) JATUH MENUJU TRAKEA!',
      alarmSubtitle: 'Pasien makan sambil tertawa terbahak-bahak! Makanan meluncur ke persimpangan jalan napas!',
      vitalText: 'VITALS: 110 BPM / 28 RPM (TERSEDAK)',
      videoSrc: 'http://googleusercontent.com/generated_video_content/17260287396244609534',
      fallbackSrc: './assets/video_laring.mp4',
      zoomClass: '',
      rewardTitle: 'Katup Epiglotis Berhasil Menutup Saluran Napas!',
      rewardDesc: 'Tindakan penyelamatan akurat! Katup epiglotis langsung mengatup menutup laring sehingga makanan dialihkan aman ke kerongkongan.',
      funFact: 'Epiglotis bekerja otomatis layaknya palang pintu: saat menelan ia menutup laring, saat bernapas ia membuka ke arah trakea!',
      actions: [
        {
          id: 'c2-epiglotis',
          label: 'Tutup Epiglotis!',
          icon: 'lock',
          isCorrect: true,
          desc: 'Katup epiglotis menutup rapat jalan napas agar makanan masuk ke kerongkongan.'
        },
        {
          id: 'c2-buka-trakea',
          label: 'Buka Lebar Trakea',
          icon: 'open_in_full',
          isCorrect: false,
          desc: 'Membuka trakea akan membuat bakso menyumbat pipa napas secara fatal!'
        },
        {
          id: 'c2-stop-napas',
          label: 'Hentikan Napas',
          icon: 'pause_circle',
          isCorrect: false,
          desc: 'Menghentikan napas tidak menutup jalan masuk makanan ke laring.'
        },
        {
          id: 'c2-lendir',
          label: 'Aktifkan Lendir',
          icon: 'water_drop',
          isCorrect: false,
          desc: 'Lendir tidak mampu menahan bola makanan padat yang sedang meluncur.'
        }
      ]
    },
    {
      level: 3,
      targetOrgan: 'ALVEOLUS PARU-PARU (PERTUKARAN GAS)',
      alarmClass: 'control-room-alarm-gray',
      alarmColor: 'gray',
      alarmIcon: 'cloud_off',
      alarmTitle: 'POLUSI ASAP PEKAT MASUK KE ALVEOLUS. PERTUKARAN GAS TERHAMBAT!',
      alarmSubtitle: 'Partikel jelaga tebal meracuni membran tipis alveolus. Pertukaran gas O2 & CO2 terblokir total!',
      vitalText: 'VITALS: 135 BPM / 34 RPM (HIPOKSIA)',
      videoSrc: './assets/video_paruparu.mp4',
      fallbackSrc: './assets/video_ikhtisar_napas.mp4',
      zoomClass: 'case-3-lung-zoom',
      rewardTitle: 'Dinding Alveolus Bersih & Pertukaran Gas Normal!',
      rewardDesc: 'Pilihan luar biasa! Sel pembersih makrofag dan surfaktan aktif menetralkan jelaga sehingga difusi Oksigen dan Karbon Dioksida lancar kembali!',
      funFact: 'Paru-paru memiliki sekitar 300-500 juta kantung alveolus mikroskopis dengan luas permukaan setara satu lapangan bulu tangkis!',
      actions: [
        {
          id: 'c3-alveolus',
          label: 'Bersihkan Dinding Alveolus',
          icon: 'cleaning_services',
          isCorrect: true,
          desc: 'Makrofag & surfaktan membersihkan alveolus agar proses difusi O2 lancar kembali.'
        },
        {
          id: 'c3-tutup-hidung',
          label: 'Tutup Hidung',
          icon: 'front_hand',
          isCorrect: false,
          desc: 'Asap beracun sudah terlanjur sampai di kantung alveolus terdalam!'
        },
        {
          id: 'c3-batuk',
          label: 'Batuk Keras!',
          icon: 'record_voice_over',
          isCorrect: false,
          desc: 'Refleks batuk hanya membersihkan saluran atas, bukan kantung mikroskopis alveolus.'
        },
        {
          id: 'c3-rusuk',
          label: 'Otot Rusuk Lemas',
          icon: 'airline_seat_recline_extra',
          isCorrect: false,
          desc: 'Melemaskan otot rusuk memperparah kekurangan oksigen (asfiksia).'
        }
      ]
    },
    {
      level: 4,
      targetOrgan: 'DIAFRAGMA & PARU-PARU (RESPON SPRINT)',
      alarmClass: 'control-room-alarm-orange',
      alarmColor: 'orange',
      alarmIcon: 'directions_run',
      alarmTitle: 'PERINGATAN! PASIEN SPRINT! KADAR CO2 MENUMPUK CEPAT!',
      alarmSubtitle: 'Pasien sedang berlari sprint (olahraga berat). Kadar CO2 menumpuk cepat di dalam darah dan tubuh butuh banyak O2 segera!',
      vitalText: 'VITALS: 165 BPM / 38 RPM (TAKIKEA)',
      videoSrc: './assets/video_paruparu.mp4',
      fallbackSrc: './assets/video_ikhtisar_napas.mp4',
      zoomClass: 'case-4-sprint-pulse',
      rewardTitle: 'Pompa Diafragma Dipercepat! Ventilasi O2 Kembali Stabil!',
      rewardDesc: 'Tindakan klinis tepat! Diafragma memompa lebih cepat dan kuat sehingga laju napas naik, membuang CO2 berlebih dan menyuplai O2 berlimpah ke otot.',
      funFact: 'Saat berolahraga sprint, kebutuhan oksigen tubuh meningkat hingga 15-20 kali lipat dibanding saat duduk istirahat!',
      actions: [
        {
          id: 'c4-diafragma',
          label: 'Percepat Pompa Diafragma',
          icon: 'speed',
          isCorrect: true,
          desc: 'Meningkatkan frekuensi kontraksi diafragma untuk suplai O2 dan membuang CO2.'
        },
        {
          id: 'c4-sempit-trakea',
          label: 'Sempitkan Trakea',
          icon: 'compress',
          isCorrect: false,
          desc: 'Menyempitkan trakea justru menghambat aliran udara dan memicu hipoksia parah.'
        },
        {
          id: 'c4-tahan-napas',
          label: 'Tahan Napas Sementara',
          icon: 'pan_tool',
          isCorrect: false,
          desc: 'Menahan napas membuat gas CO2 dan asam laktat menumpuk cepat dalam darah.'
        },
        {
          id: 'c4-tutup-epiglotis',
          label: 'Tutup Katup Epiglotis',
          icon: 'lock',
          isCorrect: false,
          desc: 'Menutup epiglotis memblokir total saluran udara saat pasien sangat butuh oksigen.'
        }
      ]
    },
    {
      level: 5,
      targetOrgan: 'TRAKEA & BRONKUS (INFEKSI BAKTERI/DAHAK)',
      alarmClass: 'control-room-alarm-lime',
      alarmColor: 'lime',
      alarmIcon: 'coronavirus',
      alarmTitle: 'INFEKSI TERDETEKSI! DAHAK BERLEBIH MENYUMBAT JALAN NAPAS!',
      alarmSubtitle: 'Bakteri masuk ke saluran napas. Dinding trakea memproduksi lendir (dahak) berlebih untuk menjebak kuman, menyumbat jalan napas!',
      vitalText: 'VITALS: 108 BPM / 24 RPM (BATUK & DEMAM)',
      videoSrc: './assets/video_trakea.mp4',
      fallbackSrc: './assets/video_bronkus.mp4',
      zoomClass: 'case-5-mucus-glow',
      rewardTitle: 'Refleks Batuk Berhasil Mengeluarkan Lendir & Kuman!',
      rewardDesc: 'Respon alami akurat! Hentakan dorongan udara lewat batuk efektif melontarkan gumpalan dahak dan bakteri keluar dari saluran napas.',
      funFact: 'Batuk adalah salah satu refleks pertahanan tubuh terpenting. Tanpa batuk, paru-paru akan mudah terinfeksi oleh penumpukan dahak kotor!',
      actions: [
        {
          id: 'c5-batuk',
          label: 'Batuk Keras & Dorong Dahak',
          icon: 'record_voice_over',
          isCorrect: true,
          desc: 'Refleks alami berkecepatan tinggi untuk mengeluarkan dahak kental dan koloni bakteri.'
        },
        {
          id: 'c5-stop-lendir',
          label: 'Hentikan Produksi Lendir',
          icon: 'block',
          isCorrect: false,
          desc: 'Menghentikan lendir membiarkan bakteri langsung menembus jaringan dinding pipa napas.'
        },
        {
          id: 'c5-turun-suhu',
          label: 'Turunkan Suhu Paru-paru',
          icon: 'ac_unit',
          isCorrect: false,
          desc: 'Menurunkan suhu tidak membersihkan lendir kental yang menyumbat jalan napas.'
        },
        {
          id: 'c5-buka-alveolus',
          label: 'Buka Lebar Alveolus',
          icon: 'open_in_full',
          isCorrect: false,
          desc: 'Alveolus berada jauh di ujung; sumbatan dahak utama berada di trakea dan bronkus.'
        }
      ]
    },
    {
      level: 6,
      targetOrgan: 'CABANG BRONKUS (BRONKOSPASME ASMA)',
      alarmClass: 'control-room-alarm-asthma',
      alarmColor: 'rose',
      alarmIcon: 'airwave',
      alarmTitle: 'DARURAT ASMA! KEJANG OTOT BRONKUS & UDARA TERJEBAK!',
      alarmSubtitle: 'Pasien menghirup serbuk sari (alergen). Otot polos bronkus tiba-tiba kejang, bengkak, dan menyempit tajam. Udara terjebak!',
      vitalText: 'VITALS: 142 BPM / 34 RPM (MENGI / WHEEZING)',
      videoSrc: './assets/video_bronkus.mp4',
      fallbackSrc: './assets/video_bronkiolus.mp4',
      zoomClass: 'case-6-bronchus-constrict',
      rewardTitle: 'Otot Bronkus Relaksasi & Saluran Napas Terbuka Plong!',
      rewardDesc: 'Penyelamatan darurat sukses! Otot polos bronkus meregang dan melonggar (efek bronkodilator), mengembalikan lubang pipa napas menjadi lebar dan plong.',
      funFact: 'Pada penderita asma, obat inhaler bekerja dengan meniru sinyal saraf untuk mengendurkan otot polos yang mencengkeram pipa bronkus dalam hitungan detik!',
      actions: [
        {
          id: 'c6-relaksasi-bronkus',
          label: 'Relaksasi & Lebarkan Bronkus',
          icon: 'fullscreen',
          isCorrect: true,
          desc: 'Mensimulasikan kerja obat inhaler bronkodilator untuk merelaksasi otot bronkus.'
        },
        {
          id: 'c6-kerut-otot',
          label: 'Kerutkan Otot Paru-paru',
          icon: 'compress',
          isCorrect: false,
          desc: 'Mengerutkan otot memperparah penyempitan jalan napas dan berisiko gagal napas akut.'
        },
        {
          id: 'c6-rambut-hidung',
          label: 'Aktifkan Rambut Hidung',
          icon: 'water_drop',
          isCorrect: false,
          desc: 'Terlambat! Partikel alergen sudah terhirup jauh ke dalam cabang bronkus.'
        },
        {
          id: 'c6-tutup-alveolus',
          label: 'Tutup Rapat Alveolus',
          icon: 'lock',
          isCorrect: false,
          desc: 'Menutup alveolus menghentikan total suplai oksigen ke seluruh sel tubuh.'
        }
      ]
    },
    {
      level: 7,
      targetOrgan: 'DARAH & ALVEOLUS (KERACUNAN GAS CO)',
      alarmClass: 'control-room-alarm-purple',
      alarmColor: 'purple',
      alarmIcon: 'skull',
      alarmTitle: 'ALARM TOKSIK! Gas Karbon Monoksida (CO) terhirup dari asap knalpot. Gas ini mengikat sel darah merah lebih kuat dari O2. Tubuh mulai keracunan!',
      alarmSubtitle: 'Gas CO merebut ikatan hemoglobin. Seluruh sel tubuh kekurangan oksigen secara cepat!',
      vitalText: 'VITALS: 155 BPM / 10 RPM (KERACUNAN CO)',
      videoSrc: './assets/video_paruparu.mp4',
      fallbackSrc: './assets/video_ikhtisar_napas.mp4',
      zoomClass: 'case-7-toxic-co',
      rewardTitle: 'Oksigen Murni Berhasil Mengusir Gas Karbon Monoksida!',
      rewardDesc: 'Tindakan gawat darurat tepat! Menghirup O2 konsentrasi tinggi memutus ikatan gas racun CO pada hemoglobin darah sehingga jaringan tubuh terhindar dari hipoksia fatal.',
      funFact: 'Gas Karbon Monoksida (CO) tidak berwarna dan tidak berbau, namun mengikat hemoglobin darah 200 hingga 250 kali lebih kuat dibanding oksigen biasa!',
      actions: [
        {
          id: 'c7-oksigen-murni',
          label: 'Berikan Terapi Oksigen Murni',
          icon: 'air',
          isCorrect: true,
          desc: 'Oksigen murni berkonsentrasi tinggi mengusir dan menggantikan ikatan gas CO dalam sel darah merah.'
        },
        {
          id: 'c7-batuk',
          label: 'Batuk Keras',
          icon: 'record_voice_over',
          isCorrect: false,
          desc: 'Gas CO sudah larut ke dalam aliran darah, batuk tidak bisa mengeluarkannya.'
        },
        {
          id: 'c7-air-hangat',
          label: 'Minum Air Hangat',
          icon: 'local_cafe',
          isCorrect: false,
          desc: 'Air hangat masuk ke lambung, tidak berpengaruh pada ikatan hemoglobin darah.'
        },
        {
          id: 'c7-tahan-napas',
          label: 'Tahan Napas Sesaat',
          icon: 'pan_tool',
          isCorrect: false,
          desc: 'Menahan napas memperparah kekurangan oksigen dan mempercepat pingsan.'
        }
      ]
    },
    {
      level: 8,
      targetOrgan: 'KANTUNG ALVEOLUS (PNEUMONIA AKUT)',
      alarmClass: 'control-room-alarm-pneumonia',
      alarmColor: 'amber',
      alarmIcon: 'water_damage',
      alarmTitle: 'KRITIS! Infeksi bakteri akut di kantung udara (Alveolus). Alveolus terisi cairan/nanah. Pertukaran oksigen lumpuh!',
      alarmSubtitle: 'Cairan infeksi merendam kantung alveolus. Difusi oksigen terhenti total!',
      vitalText: 'VITALS: 148 BPM / 36 RPM (PNEUMONIA BASAH)',
      videoSrc: './assets/video_alveolus.mp4',
      fallbackSrc: './assets/video_paruparu.mp4',
      zoomClass: 'case-8-pneumonia-fluid',
      rewardTitle: 'Alveolus Bersih dari Infeksi & Pertukaran Gas Pulih!',
      rewardDesc: 'Penyelamatan kritis sukses! Pemberian terapi antibiotik dan drainase cairan membebaskan membran alveolus sehingga oksigen dapat kembali berdifusi langsung ke pembuluh kapiler darah.',
      funFact: 'Pneumonia sering disebut paru-paru basah karena kantung alveolus terendam cairan peradangan dan nanah, membuat pasien sulit menyerap oksigen!',
      actions: [
        {
          id: 'c8-sedot-cairan',
          label: 'Basmi Bakteri & Sedot Cairan',
          icon: 'vaccines',
          isCorrect: true,
          desc: 'Antibiotik membasmi bakteri infeksi dan pembersihan cairan memulihkan difusi O2 di alveolus.'
        },
        {
          id: 'c8-tutup-epiglotis',
          label: 'Tutup Katup Epiglotis',
          icon: 'lock',
          isCorrect: false,
          desc: 'Epiglotis berada di pangkal laring, tidak berhubungan dengan cairan infeksi di alveolus.'
        },
        {
          id: 'c8-panaskan-hidung',
          label: 'Panaskan Hidung',
          icon: 'thermostat',
          isCorrect: false,
          desc: 'Memanaskan hidung tidak membersihkan nanah di kantung alveolus paru-paru.'
        },
        {
          id: 'c8-napas-cepat',
          label: 'Tingkatkan Napas Cepat',
          icon: 'speed',
          isCorrect: false,
          desc: 'Bernapas cepat tanpa membersihkan cairan justru memicu kelelahan otot napas.'
        }
      ]
    },
    {
      level: 9,
      targetOrgan: 'TRAKEA & DINDING BRONKUS (PAPARAN TAR)',
      alarmClass: 'control-room-alarm-smoke',
      alarmColor: 'slate',
      alarmIcon: 'smoking_rooms',
      alarmTitle: 'BAHAYA RACUN TAR! Partikel lengket tar dari rokok menempel pekat di dinding trakea. Rambut getar (silia) lumpuh total tidak bisa menyapu kotoran!',
      alarmSubtitle: 'Endapan tar beracun melumpuhkan silia dan memicu timbunan racun karsinogenik!',
      vitalText: 'VITALS: 125 BPM / 26 RPM (TOKSIK ROKOK)',
      videoSrc: './assets/video_trakea.mp4',
      fallbackSrc: './assets/video_paruparu.mp4',
      zoomClass: 'case-9-tar-smoke',
      rewardTitle: 'Paparan Asap Berhenti & Rambut Silia Mulai Beregenerasi!',
      rewardDesc: 'Keputusan terbaik dan bijak! Menjauhkan tubuh dari paparan asap rokok memungkinkan rambut getar (silia) dan lendir pembersih alami pulih bertahap untuk membersihkan endapan tar beracun.',
      funFact: 'Satu hisapan asap rokok mengandung lebih dari 7.000 bahan kimia berbahaya dan ratusan racun termasuk tar, nikotin, dan CO yang melumpuhkan silia!',
      actions: [
        {
          id: 'c9-stop-asap',
          label: 'Hentikan Paparan Asap & Detoks',
          icon: 'smoke_free',
          isCorrect: true,
          desc: 'Menghentikan kontak racun rokok memberi kesempatan bagi rambut silia untuk pulih dan membersihkan endapan tar.'
        },
        {
          id: 'c9-telan-makanan',
          label: 'Paksa Telan Makanan',
          icon: 'restaurant',
          isCorrect: false,
          desc: 'Makanan masuk ke lambung, tidak bisa membersihkan tar di saluran pernapasan.'
        },
        {
          id: 'c9-pompa-diafragma',
          label: 'Pompa Diafragma Lebih Kuat',
          icon: 'expand',
          isCorrect: false,
          desc: 'Memompa diafragma tidak menghilangkan zat kimia lengket tar yang melapisi trakea.'
        },
        {
          id: 'c9-dinginkan-paru',
          label: 'Dinginkan Paru-paru',
          icon: 'ac_unit',
          isCorrect: false,
          desc: 'Mendinginkan paru-paru tidak meregenerasi silia yang lumpuh akibat bahan kimia rokok.'
        }
      ]
    },
    {
      level: 10,
      targetOrgan: 'SELURUH SISTEM PERNAPASAN (ASFIKSIA AIR)',
      alarmClass: 'control-room-alarm-codered',
      alarmColor: 'red',
      alarmIcon: 'emergency',
      alarmTitle: 'KODE MERAH! KORBAN TENGGELAM! Air masuk ke paru-paru membanjiri trakea dan alveolus. Jantung dan napas berhenti total!',
      alarmSubtitle: 'Henti napas dan henti jantung akibat paru-paru kemasukan air! Butuh CPR segera!',
      vitalText: 'VITALS: 0 BPM / 0 RPM (HENTI JANTUNG & NAPAS)',
      videoSrc: './assets/video_ikhtisar_napas.mp4',
      fallbackSrc: './assets/video_utuh.mp4',
      zoomClass: 'case-10-code-red-drowning',
      rewardTitle: 'RESUSITASI CPR BERHASIL! DETAK JANTUNG & NAPAS KEMBALI!',
      rewardDesc: 'Penyelamatan heroik hidup dan mati! Kompresi dada CPR dan pengosongan air dari saluran pernapasan berhasil mengembalikan denyut jantung serta aliran oksigen ke otak pasien!',
      funFact: 'CPR (Cardiopulmonary Resuscitation) atau Resusitasi Jantung Paru adalah pertolongan pertama paling krusial pada korban tenggelam untuk memompa darah beroksigen ke otak sebelum bantuan medis tiba!',
      actions: [
        {
          id: 'c10-cpr',
          label: 'Lakukan CPR & Kosongkan Air',
          icon: 'favorite',
          isCorrect: true,
          desc: 'Resusitasi Jantung Paru (CPR) memulihkan pompa sirkulasi darah dan mengeluarkan air dari pipa napas.'
        },
        {
          id: 'c10-minum-air',
          label: 'Beri Minum Air Hangat',
          icon: 'water_drop',
          isCorrect: false,
          desc: 'Fatal! Memberi minum pada korban tidak sadar akan membanjiri paru-paru lebih parah.'
        },
        {
          id: 'c10-tutup-hidung',
          label: 'Tutup Lubang Hidung',
          icon: 'pan_tool',
          isCorrect: false,
          desc: 'Menutup hidung menghambat resusitasi napas buatan yang sangat dibutuhkan korban.'
        },
        {
          id: 'c10-tepuk-pundak',
          label: 'Tepuk-tepuk Pundak Pasien Saja',
          icon: 'front_hand',
          isCorrect: false,
          desc: 'Menepuk pundak tidak akan memompa jantung yang berhenti atau membersihkan air dari paru-paru.'
        }
      ]
    }
  ],

  // State Simulator
  state: {
    currentLevel: 1, // 1 to 10
    solvedLevels: {
      1: false,
      2: false,
      3: false,
      4: false,
      5: false,
      6: false,
      7: false,
      8: false,
      9: false,
      10: false
    },
    lives: 3, // Health Points: 3 Nyawa (❤️❤️❤️)
    o2Level: 100, // Bar Kesehatan O2 (0 - 100%)
    o2Interval: null,
    isLocked: false,
    soundEnabled: true,
    scoreEarned: 0,
    combo: 0,
    maxCombo: 0,
    teacherBypassed: false
  },

  audioCtx: null,
  teacherKeyBuffer: [],

  init() {
    this.state.isLocked = false;
    this.state.lives = 3;

    // Restore solvedLevels and currentLevel from student progress if available
    const activeName = localStorage.getItem('currentUser') || 
                      (window.AppState && AppState.student && (AppState.student.namaAsli || AppState.student.name)) || '';
    if (activeName) {
      const pKey = (typeof window.getStudentProgressKey === 'function')
        ? window.getStudentProgressKey(activeName)
        : `progress_${activeName.toLowerCase().replace(/[^a-z0-9]+/g, '_')}`;
      try {
        const stored = localStorage.getItem(pKey);
        if (stored) {
          const prog = JSON.parse(stored);
          if (prog.solvedLevels) {
            this.state.solvedLevels = { ...this.state.solvedLevels, ...prog.solvedLevels };
          } else if (prog.level) {
            for (let i = 1; i <= Number(prog.level); i++) {
              this.state.solvedLevels[i] = true;
            }
          }
          if (prog.level) {
            this.state.currentLevel = Math.min(10, Math.max(1, Number(prog.level) + 1));
          }
        }
      } catch (e) {}
    }

    this.updateLivesUI();
    this.renderCase();
    this.startO2Depletion();
    this.updateO2UI();
    this.updateComboUI();
    this.updateProgressUI();
    this.initConfettiCanvas();
    this.bindTeacherBypassKey();
  },

  updateLivesUI() {
    const livesHearts = document.getElementById('puzzleLivesHearts');
    const lives = Math.max(0, Math.min(3, this.state.lives !== undefined ? this.state.lives : 3));
    const heartsString = '❤️'.repeat(lives) + '🤍'.repeat(3 - lives);

    if (livesHearts) {
      livesHearts.textContent = heartsString;
      if (lives === 1) {
        livesHearts.className = 'tracking-wider text-sm leading-none animate-pulse text-rose-600';
      } else {
        livesHearts.className = 'tracking-wider text-sm leading-none';
      }
    }

    const headerLives = document.getElementById('siswaHeaderLives');
    if (headerLives) {
      headerLives.textContent = heartsString;
    }
  },

  isCompleted() {
    return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].every(lvl => this.state.solvedLevels[lvl]);
  },

  getCurrentCase() {
    const lvl = Number(this.state.currentLevel) || 1;
    return this.cases.find(c => c.level === lvl) || this.cases[0];
  },

  // Algoritma Fisher-Yates Shuffle untuk mengacak urutan tombol aksi secara dinamis
  shuffleArray(array) {
    if (!array || !Array.isArray(array)) return [];
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  },

  // ==========================================
  // RENDER 4 TOMBOL AKSI DARURAT (DENGAN PENGACAKAN SHUFFLE)
  // ==========================================
  renderActionButtons() {
    const curCase = this.getCurrentCase();
    const actionsGrid = document.getElementById('emergencyActionsGrid');
    if (!actionsGrid) {
      console.warn('#emergencyActionsGrid element not found in DOM');
      return;
    }
    if (!curCase || !curCase.actions || !Array.isArray(curCase.actions)) {
      console.warn('curCase or actions not defined for level', this.state.currentLevel);
      return;
    }

    // 1. Acak urutan array 4 pilihan tombol aksi menggunakan Fisher-Yates SEBELUM di-render ke HTML
    const shuffledActions = this.shuffleArray(curCase.actions);

    // 2. Render dan masukkan elemen HTML keempat tombol ke DOM secara presisi
    actionsGrid.innerHTML = shuffledActions.map((act) => {
      return `
        <button type="button" 
                id="btnAction-${act.id}"
                data-action-id="${act.id}"
                ${this.state.isLocked ? 'disabled' : ''}
                class="btn-emergency-action group">
          <div class="w-12 h-12 rounded-2xl bg-sky-100 text-sky-700 group-hover:bg-sky-600 group-hover:text-white flex items-center justify-center transition-all shadow-xs shrink-0 pointer-events-none">
            <span class="material-symbols-outlined text-[26px] group-hover:scale-110 transition-transform">
              ${act.icon}
            </span>
          </div>
          <div class="min-w-0 text-center pointer-events-none">
            <span class="font-heading font-extrabold text-sm sm:text-base text-slate-900 group-hover:text-sky-950 block leading-tight">
              [${act.label}]
            </span>
            <span class="text-[10px] text-slate-500 font-semibold block mt-0.5">
              Respon Cepat
            </span>
          </div>
        </button>
      `;
    }).join('');

    // 3. Pastikan event listener 'click' ditambahkan KEMBALI ke setiap tombol SETELAH proses pengacakan dan rendering HTML selesai
    const buttons = actionsGrid.querySelectorAll('.btn-emergency-action');
    buttons.forEach((btn) => {
      const actionId = btn.getAttribute('data-action-id');
      btn.onclick = null;
      btn.addEventListener('click', (e) => {
        if (e) {
          e.preventDefault();
          e.stopPropagation();
        }
        this.handleActionClick(actionId);
      });
    });
  },

  // ==========================================
  // RENDER KASUS & TOMBOL AKSI DARURAT
  // ==========================================
  renderCase() {
    const curCase = this.getCurrentCase();
    const mainCard = document.getElementById('controlRoomMainCard');
    const alarmBanner = document.getElementById('controlAlarmBanner');
    const alarmTitle = document.getElementById('alarmCaseTitle');
    const alarmIcon = document.getElementById('alarmIcon');
    const alarmBadge = document.getElementById('alarmCaseBadge');
    const caseBadge = document.getElementById('controlCaseBadge');
    const hudTarget = document.getElementById('hudTargetOrgan');
    const hudVital = document.getElementById('hudVitalText');
    const video = document.getElementById('controlRoomVideo');

    // 1. Reset & Terapkan Efek Berkedip Layar Sesuai Alarm
    if (mainCard) {
      mainCard.classList.remove(
        'control-room-alarm-yellow', 
        'control-room-alarm-red', 
        'control-room-alarm-gray', 
        'control-room-alarm-orange', 
        'control-room-alarm-lime', 
        'control-room-alarm-asthma', 
        'control-room-alarm-purple', 
        'control-room-alarm-pneumonia', 
        'control-room-alarm-smoke', 
        'control-room-alarm-codered', 
        'control-room-safe-green'
      );
      if (!this.state.isLocked && curCase.alarmClass) {
        mainCard.classList.add(curCase.alarmClass);
      }
    }

    // 2. Visual Dinamis Per Kasus & Zoom Efek Khusus
    if (video) {
      // Kelola kelas zoom & denyut khusus (Kasus 3-10)
      video.classList.remove(
        'case-3-lung-zoom', 
        'case-4-sprint-pulse', 
        'case-5-mucus-glow', 
        'case-6-bronchus-constrict',
        'case-7-toxic-co',
        'case-8-pneumonia-fluid',
        'case-9-tar-smoke',
        'case-10-code-red-drowning'
      );
      if (curCase.zoomClass) {
        video.classList.add(curCase.zoomClass);
      }

      // Perbarui sumber video jika berbeda
      const currentSrc = video.getAttribute('src');
      if (currentSrc !== curCase.videoSrc) {
        video.onerror = () => {
          if (curCase.fallbackSrc && video.src !== curCase.fallbackSrc) {
            console.warn(`Video ${curCase.videoSrc} gagal dimuat, menggunakan fallback: ${curCase.fallbackSrc}`);
            video.src = curCase.fallbackSrc;
            video.load();
            video.play().catch(() => {});
          }
        };

        video.src = curCase.videoSrc;
        video.load();
        video.play().catch(() => {});
      } else {
        video.play().catch(() => {});
      }
    }

    // 3. Update HUD & Ticker Alarm
    if (caseBadge) caseBadge.textContent = `KASUS ${curCase.level}: LEVEL ${curCase.level}`;
    if (hudTarget) hudTarget.textContent = `SENSOR: ${curCase.targetOrgan}`;
    if (hudVital) hudVital.textContent = curCase.vitalText;

    if (alarmTitle) {
      alarmTitle.textContent = `"${curCase.alarmTitle}"`;
      alarmTitle.className = 'font-heading font-black text-sm sm:text-base lg:text-lg text-white leading-tight';
    }

    if (alarmIcon) {
      alarmIcon.textContent = curCase.alarmIcon;
      alarmIcon.className = `material-symbols-outlined text-[28px] sm:text-[32px] text-${curCase.alarmColor}-400 animate-bounce`;
    }

    if (alarmBadge) {
      alarmBadge.textContent = 'Pilih Respon Aksi!';
      alarmBadge.className = 'hidden sm:inline-flex px-3 py-1 rounded-full text-xs font-black uppercase tracking-wide bg-amber-400 text-slate-950';
    }

    if (alarmBanner) {
      alarmBanner.className = 'p-3.5 sm:p-4 rounded-2xl bg-slate-900/90 border-2 border-amber-400 text-white shadow-2xl backdrop-blur-md flex items-center justify-between gap-3 transition-all duration-300';
    }

    // 4. Render 4 Tombol Aksi Darurat Futuristik (Posisi Diacak Dinamis)
    this.renderActionButtons();
  },

  // ==========================================
  // LOGIKA RESPON TOMBOL AKSI DARURAT
  // ==========================================
  handleActionClick(actionId) {
    if (this.state.isLocked) return;

    const curCase = this.getCurrentCase();
    const action = curCase.actions.find(a => a.id === actionId);
    if (!action) return;

    const btnEl = document.getElementById(`btnAction-${action.id}`);
    if (btnEl && btnEl.disabled) return;

    const mainCard = document.getElementById('controlRoomMainCard');
    const alarmBanner = document.getElementById('controlAlarmBanner');
    const alarmTitle = document.getElementById('alarmCaseTitle');
    const alarmBadge = document.getElementById('alarmCaseBadge');

    if (action.isCorrect) {
      // ========================================
      // 1. JIKA TOMBOL BENAR DITEKAN
      // ========================================
      // Hentikan timer (O2 Bar)
      this.stopO2Depletion();
      this.state.isLocked = true;

      // O2 Level Bar stabil kembali PENUH!
      this.state.o2Level = 100;
      this.updateO2UI();

      // Hentikan alarm dan nyalakan efek sukses (layar hijau, nyawa aman)
      if (mainCard) {
        mainCard.classList.remove(
          'control-room-alarm-yellow', 
          'control-room-alarm-red', 
          'control-room-alarm-gray', 
          'control-room-alarm-orange', 
          'control-room-alarm-lime', 
          'control-room-alarm-asthma',
          'control-room-alarm-purple',
          'control-room-alarm-pneumonia',
          'control-room-alarm-smoke',
          'control-room-alarm-codered',
          'screen-shake-anim'
        );
        mainCard.classList.remove('control-room-safe-green');
        void mainCard.offsetWidth; // Force reflow
        mainCard.classList.add('control-room-safe-green');
      }

      if (btnEl) {
        btnEl.classList.remove('action-wrong');
        btnEl.classList.add('action-correct');
      }

      // Teks "AKSI TEPAT! Sistem Aman."
      if (alarmTitle) {
        alarmTitle.textContent = 'AKSI TEPAT! Sistem Pernapasan Aman & Stabil.';
        alarmTitle.className = 'font-heading font-black text-sm sm:text-base lg:text-lg text-emerald-400 leading-tight';
      }
      if (alarmBadge) {
        alarmBadge.textContent = 'Sistem Terlindungi ✅';
        alarmBadge.className = 'hidden sm:inline-flex px-3 py-1 rounded-full text-xs font-black uppercase tracking-wide bg-emerald-500 text-white';
      }
      if (alarmBanner) {
        alarmBanner.className = 'p-3.5 sm:p-4 rounded-2xl bg-emerald-950/90 border-2 border-emerald-400 text-white shadow-2xl backdrop-blur-md flex items-center justify-between gap-3 transition-all duration-300';
      }

      // Nyawa aman
      this.updateLivesUI();

      // Combo & Skor
      this.state.combo++;
      if (this.state.combo > this.state.maxCombo) {
        this.state.maxCombo = this.state.combo;
      }
      this.updateComboUI();
      const points = 100 * this.state.combo;
      this.state.scoreEarned += points;

      this.playSound('snap');
      this.playSound('combo');
      this.triggerConfetti();
      this.showComboFloatingBanner(this.state.combo);

      // Tandai level ini selesai
      this.state.solvedLevels[curCase.level] = true;

      // Hitung akumulasi level terselesaikan dan persentase progress belajar
      const solvedCount = Object.keys(this.state.solvedLevels).filter(k => this.state.solvedLevels[k]).length;
      const progressPercentage = Math.min(100, Math.round((solvedCount / 10) * 100));

      // Mode Simulasi Guru: JANGAN simpan ke storage atau ubah data kelas
      if ((window.AppState && AppState.isSimulationMode) || window.isSimulationMode) {
        const prevPoints = (window.AppState && AppState.student && AppState.student.points !== undefined) 
          ? Number(AppState.student.points) 
          : 0;
        const newTotalPoints = prevPoints + points;
        if (window.AppState && AppState.student) {
          AppState.student.points = newTotalPoints;
          AppState.student.score = newTotalPoints;
          AppState.student.level = Math.max(Number(AppState.student.level || 0), curCase.level);
        }
        this.updateProgressUI();
        const puzzlePtsEl = document.getElementById('puzzlePointsValue');
        if (puzzlePtsEl) puzzlePtsEl.textContent = `${newTotalPoints.toLocaleString('id-ID')} Poin`;
        const siswaHeaderPts = document.getElementById('siswaHeaderPoints');
        if (siswaHeaderPts) siswaHeaderPts.textContent = `${newTotalPoints.toLocaleString('id-ID')} Poin`;
        
        setTimeout(() => {
          if (curCase.level < 10) {
            this.showCaseSuccessModal(curCase);
          } else {
            this.showGrandVictoryModal();
          }
        }, 750);
        return;
      }

      // Resolve identitas aktif siswa dari 'currentUser' LocalStorage
      const rawActiveName = localStorage.getItem('currentUser') || 
                            (window.AppState && AppState.student && (AppState.student.namaAsli || AppState.student.name)) || 
                            'Peneliti Cilik';
      const cleanActiveName = rawActiveName.replace(/\s*\(.*?\)\s*/g, '').trim() || 'Peneliti Cilik';
      const progressKey = (typeof window.getStudentProgressKey === 'function') 
        ? window.getStudentProgressKey(cleanActiveName) 
        : `progress_${cleanActiveName.toLowerCase().replace(/[^a-z0-9]+/g, '_')}`;

      // Ambil progres sebelumnya dari LocalStorage
      let studentProg = {};
      try {
        const stored = localStorage.getItem(progressKey);
        if (stored) studentProg = JSON.parse(stored);
      } catch (e) {}

      const previousPoints = Number(studentProg.points !== undefined ? studentProg.points : (studentProg.score || (window.AppState && AppState.student ? (AppState.student.points || AppState.student.score) : 0) || 0));
      const newTotalPoints = previousPoints + points;
      const newLevel = Math.max(Number(studentProg.level || 0), curCase.level);
      const newMastery = Math.max(Number(studentProg.mastery || 0), progressPercentage);
      const newStatus = newMastery >= 100 ? 'Tuntas' : (newMastery > 0 ? 'Sedang Belajar' : 'Belum Mulai');

      // Simpan langsung ke LocalStorage dengan key unik per nama siswa (progress_${cleanName})
      const updatedProgData = {
        name: cleanActiveName,
        namaAsli: cleanActiveName,
        username: studentProg.username || cleanActiveName.toLowerCase(),
        absen: studentProg.absen || (window.AppState && AppState.student ? AppState.student.absen : '') || '',
        level: newLevel,
        mastery: newMastery,
        score: newTotalPoints,
        points: newTotalPoints,
        lives: this.state.lives,
        status: newStatus,
        solvedLevels: { ...this.state.solvedLevels },
        learnedTopics: studentProg.learnedTopics || (window.AppState ? AppState.learnedTopics : []),
        lastUpdated: Date.now()
      };
      localStorage.setItem(progressKey, JSON.stringify(updatedProgData));

      // Pastikan identitas 'currentUser' tersimpan sebagai string nama bersih
      localStorage.setItem('currentUser', cleanActiveName);

      // Sinkronkan ke AppState.student
      if (window.AppState) {
        if (!AppState.student) {
          AppState.student = {};
        }
        AppState.student.name = cleanActiveName;
        AppState.student.namaAsli = cleanActiveName;
        AppState.student.points = newTotalPoints;
        AppState.student.score = newTotalPoints;
        AppState.student.level = newLevel;
        AppState.student.mastery = newMastery;
        AppState.student.status = newStatus;
        AppState.student.solvedLevels = { ...this.state.solvedLevels };
        if (AppState.saveStudent) {
          AppState.saveStudent(AppState.student);
        }
      }

      // PERBARUI UI SEKETIKA: Indikator Poin Ruang Kontrol & Dashboard Siswa
      this.updateProgressUI();

      const puzzlePtsEl = document.getElementById('puzzlePointsValue');
      if (puzzlePtsEl) {
        puzzlePtsEl.textContent = `${newTotalPoints.toLocaleString('id-ID')} Poin`;
      }
      const siswaHeaderPts = document.getElementById('siswaHeaderPoints');
      if (siswaHeaderPts) {
        siswaHeaderPts.textContent = `${newTotalPoints.toLocaleString('id-ID')} Poin`;
      }

      // Perbarui leaderboard motivasi di background
      if (window.App && typeof App.renderStudentTop10Leaderboard === 'function') {
        App.renderStudentTop10Leaderboard();
      }

      // Dispatch event agar Dashboard Guru dan komponen lain langsung terupdate
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('student-progress-updated', {
          detail: { key: progressKey, data: updatedProgData }
        }));
      }

      // Tampilkan pop-up keberhasilan setelah 750ms
      setTimeout(() => {
        if (curCase.level < 10) {
          // Kasus 1 sampai 9 selesai -> Pop-up Sukses dengan tombol "Lanjut Kasus Berikutnya"
          this.showCaseSuccessModal(curCase);
        } else {
          // Kasus 10 selesai -> Pop-up Grand Victory ("SELAMAT! GELAR DOKTER CILIK DIRAIH! 🩺🏆")
          this.showGrandVictoryModal();
        }
      }, 750);

    } else {
      // ========================================
      // 2. JIKA TOMBOL SALAH DITEKAN
      // ========================================
      // Kurangi 1 nyawa
      this.state.lives = Math.max(0, this.state.lives - 1);
      this.updateLivesUI();

      // Jalankan efek shake dan layar merah
      if (mainCard) {
        mainCard.classList.remove('screen-shake-anim', 'control-room-alarm-red');
        void mainCard.offsetWidth; // Force reflow
        mainCard.classList.add('screen-shake-anim', 'control-room-alarm-red');
        setTimeout(() => {
          mainCard.classList.remove('screen-shake-anim');
          // Kembalikan ke warna alarm kasus semula jika masih ada nyawa
          if (this.state.lives > 0 && curCase.alarmClass && curCase.alarmClass !== 'control-room-alarm-red') {
            mainCard.classList.remove('control-room-alarm-red');
            mainCard.classList.add(curCase.alarmClass);
          }
        }, 650);
      }

      if (btnEl) {
        btnEl.classList.add('action-wrong', 'opacity-60', 'cursor-not-allowed');
        btnEl.disabled = true; // Kunci tombol pilihan yang salah ini
      }

      // Combo di-reset
      this.state.combo = 0;
      this.updateComboUI();

      this.playSound('error');

      // Cek apakah nyawa habis
      if (this.state.lives <= 0) {
        this.stopO2Depletion();
        this.state.isLocked = true;
        this.playSound('gameover');
        this.showGameOverModal('lives');
      } else {
        // BIARKAN TIMER (O2 BAR) TETAP BERJALAN!
        // Kunci interaksi dibuka kembali agar siswa dapat memilih jawaban yang benar
        this.state.isLocked = false;
        if (window.App && App.showToast) {
          App.showToast(`❌ Tindakan Keliru! Tersisa ${this.state.lives} Nyawa ❤️. Pilih respon lain!`, 'warning');
        }
      }
    }
  },

  // ==========================================
  // MODAL SUKSES PER KASUS (KASUS 1 - 9)
  // ==========================================
  showCaseSuccessModal(curCase) {
    const modal = document.getElementById('modalOrganReward');
    if (!modal) return;

    const titleEl = document.getElementById('rewardModalTitle');
    const descEl = document.getElementById('rewardModalDesc');
    const factEl = document.getElementById('rewardModalFunFact');
    const ribbonEl = document.getElementById('rewardModalRibbonText');
    const nextBtn = document.getElementById('btnRewardNextCase');

    if (titleEl) titleEl.textContent = curCase.rewardTitle || `Misi Kasus ${curCase.level} Berhasil!`;
    if (descEl) descEl.textContent = curCase.rewardDesc || 'Respon darurat berhasil menstabilkan jalan napas pasien.';
    if (factEl) factEl.textContent = curCase.funFact || 'Sistem pernapasan memiliki mekanisme pertahanan otomatis.';
    if (ribbonEl) ribbonEl.textContent = `KASUS ${curCase.level} AMAN! +${100 * (this.state.combo || 1)} POIN DIDAPATKAN`;

    if (nextBtn) {
      nextBtn.innerHTML = `
        <span>Lanjut ke Kasus ${curCase.level + 1}</span>
        <span class="material-symbols-outlined text-[18px]">arrow_forward</span>
      `;
    }

    modal.classList.remove('hidden');
    modal.classList.add('flex');
  },

  closeRewardModal() {
    const modal = document.getElementById('modalOrganReward');
    if (modal) {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    }
  },

  // Tombol "Lanjut Kasus Berikutnya" di Pop-up Sukses
  nextCase() {
    this.closeRewardModal();

    if (this.state.currentLevel < 10) {
      this.state.currentLevel++;
    }

    this.state.lives = 3;
    this.state.o2Level = 100;
    this.state.isLocked = false;

    this.updateLivesUI();
    this.renderCase();
    this.updateO2UI();
    this.updateComboUI();
    this.updateProgressUI();
    this.startO2Depletion();

    if (window.App && App.showToast) {
      App.showToast(`🚨 Memulai Kasus ${this.state.currentLevel}! Amati laporan medis dengan cermat.`, 'info');
    }
  },

  // Tombol "Ulangi Kasus Ini" di Pop-up Gagal / Game Over
  retryCurrentCase() {
    this.closeGameOverModal();
    this.closeTimeOutModal();

    // Reset nyawa dan O2 untuk kasus saat ini TANPA reset kuis ke Level 1
    this.state.lives = 3;
    this.state.o2Level = 100;
    this.state.isLocked = false;
    this.state.combo = 0;

    this.updateLivesUI();
    this.renderCase();
    this.updateO2UI();
    this.updateComboUI();
    this.startO2Depletion();

    if (window.App && App.showToast) {
      App.showToast(`Mengulang Kasus ${this.state.currentLevel} dengan 3 ❤️ nyawa penuh. Pilih tindakan yang tepat! 🩺`, 'info');
    }
  },

  // Switch Kasus Manual (Free Navigation ke Level 1-10 Kapan Saja)
  switchCase(lvl) {
    const targetLevel = Number(lvl) || 1;
    if (targetLevel < 1 || targetLevel > 10) return;

    this.closeGameOverModal();
    this.closeTimeOutModal();
    this.closeRewardModal();

    this.state.currentLevel = targetLevel;
    this.state.lives = 3;
    this.state.o2Level = 100;
    this.state.isLocked = false;

    this.updateLivesUI();
    this.renderCase();
    this.updateO2UI();
    this.updateProgressUI();
    this.startO2Depletion();

    if (window.App && App.showToast) {
      const curCase = this.getCurrentCase();
      App.showToast(`🚨 Memuat Kasus ${targetLevel}: ${curCase.targetOrgan}`, 'info');
    }
  },

  // ==========================================
  // O2 LEVEL HEALTH BAR (WAKTU BERPIKIR 55 DETIK)
  // ==========================================
  startO2Depletion() {
    this.stopO2Depletion();
    if (this.state.isLocked || this.isCompleted()) return;

    // Durasi waktu habis dalam 55 detik (antara 45-60 detik sesuai instruksi)
    const totalSeconds = 55;
    const decrementPerSec = 100 / totalSeconds; // ~1.818% per detik

    this.state.o2Interval = setInterval(() => {
      this.state.o2Level = Math.max(0, this.state.o2Level - decrementPerSec);
      this.updateO2UI();

      if (this.state.o2Level <= 25 && this.state.o2Level > 0) {
        this.playSound('tick');
      }

      if (this.state.o2Level <= 0) {
        this.handleO2Depleted();
      }
    }, 1000);
  },

  stopO2Depletion() {
    if (this.state.o2Interval) {
      clearInterval(this.state.o2Interval);
      this.state.o2Interval = null;
    }
  },

  // Aliases for navigation lifecycle
  startTimer() {
    this.startO2Depletion();
  },

  stopTimer() {
    this.stopO2Depletion();
  },

  updateO2UI() {
    const o2Bar = document.getElementById('o2ProgressBar');
    const o2Text = document.getElementById('o2ValueText');
    const o2Badge = document.getElementById('o2StatusBadge');
    const o2Subtitle = document.getElementById('o2StatusSubtitle');
    const iconBox = document.getElementById('o2StatusIconBox');

    const level = Math.max(0, Math.min(100, Math.round(this.state.o2Level)));

    if (o2Text) {
      o2Text.textContent = `${level}%`;
      if (level <= 25) {
        o2Text.className = 'font-mono font-black text-2xl sm:text-3xl text-rose-500 tracking-tight leading-none animate-pulse';
      } else if (level <= 50) {
        o2Text.className = 'font-mono font-black text-2xl sm:text-3xl text-amber-400 tracking-tight leading-none';
      } else {
        o2Text.className = 'font-mono font-black text-2xl sm:text-3xl text-emerald-400 tracking-tight leading-none';
      }
    }

    if (o2Bar) {
      o2Bar.style.width = `${level}%`;
      if (level <= 25) {
        o2Bar.className = 'h-full rounded-full bg-gradient-to-r from-rose-600 via-red-500 to-rose-400 transition-all duration-300 ease-out o2-bar-shimmer shadow-md animate-pulse';
      } else if (level <= 50) {
        o2Bar.className = 'h-full rounded-full bg-gradient-to-r from-amber-500 via-orange-400 to-rose-400 transition-all duration-300 ease-out o2-bar-shimmer shadow-md';
      } else {
        o2Bar.className = 'h-full rounded-full bg-gradient-to-r from-emerald-500 via-teal-400 to-sky-400 transition-all duration-300 ease-out o2-bar-shimmer shadow-md';
      }
    }

    if (o2Badge) {
      if (level === 0) {
        o2Badge.textContent = 'O₂ Habis (Gagal)';
        o2Badge.className = 'text-[10px] font-bold text-rose-400 uppercase tracking-wider block mt-0.5 animate-bounce';
      } else if (level <= 25) {
        o2Badge.textContent = 'Kritis! Hipoksia';
        o2Badge.className = 'text-[10px] font-bold text-rose-400 uppercase tracking-wider block mt-0.5 animate-pulse';
      } else if (level <= 50) {
        o2Badge.textContent = 'Waspada (Menurun)';
        o2Badge.className = 'text-[10px] font-bold text-amber-300 uppercase tracking-wider block mt-0.5';
      } else {
        o2Badge.textContent = 'Sistem Normal';
        o2Badge.className = 'text-[10px] font-bold text-emerald-300 uppercase tracking-wider block mt-0.5';
      }
    }

    if (o2Subtitle) {
      if (level <= 25) {
        o2Subtitle.textContent = 'PERINGATAN: Kadar oksigen hampir habis! Segera tentukan aksi yang tepat!';
      } else if (level <= 50) {
        o2Subtitle.textContent = 'Oksigen menurun. Diperlukan tindakan penstabilan jalan napas.';
      } else {
        o2Subtitle.textContent = 'Kadar oksigen pasien stabil. Respon darurat dibutuhkan segera!';
      }
    }

    if (iconBox) {
      if (level <= 25) {
        iconBox.className = 'w-10 h-10 rounded-2xl bg-rose-600 text-white flex items-center justify-center shadow-lg animate-bounce';
      } else if (level <= 50) {
        iconBox.className = 'w-10 h-10 rounded-2xl bg-amber-500 text-white flex items-center justify-center shadow-lg';
      } else {
        iconBox.className = 'w-10 h-10 rounded-2xl bg-gradient-to-tr from-sky-500 to-teal-400 text-white flex items-center justify-center shadow-lg';
      }
    }
  },

  showGameOverModal(reason = 'o2') {
    this.stopO2Depletion();
    this.state.isLocked = true;
    this.playSound('gameover');

    const modal = document.getElementById('modalGameOver');
    if (modal) {
      const titleEl = modal.querySelector('h3');
      const descEl = modal.querySelector('p');
      const badgeEl = modal.querySelector('.bg-rose-100');

      if (reason === 'lives') {
        if (badgeEl) badgeEl.textContent = '💔 NYAWA OPERATOR HABIS (0/3)';
        if (titleEl) titleEl.textContent = `Game Over! Kamu Kehabisan Nyawa pada Kasus ${this.state.currentLevel}!`;
        if (descEl) descEl.textContent = `Kamu telah memilih tindakan yang keliru sebanyak 3 kali pada Kasus ${this.state.currentLevel}. Klik tombol "Ulangi Kasus Ini" untuk mencoba kembali kasus ini dengan 3 nyawa penuh!`;
      } else {
        if (badgeEl) badgeEl.textContent = '🚨 O₂ DROP CRITICAL (0%)';
        if (titleEl) titleEl.textContent = `Sistem Kasus ${this.state.currentLevel} Gagal! Pasien Sesak Napas.`;
        if (descEl) descEl.textContent = `Kadar oksigen pasien telah habis (0% O₂) pada Kasus ${this.state.currentLevel}. Klik tombol "Ulangi Kasus Ini" untuk mencoba kembali kasus ini tanpa mengulang dari awal.`;
      }

      modal.classList.remove('hidden');
      modal.classList.add('flex');
    }
  },

  handleO2Depleted() {
    this.showGameOverModal('o2');
  },

  closeGameOverModal() {
    const modal = document.getElementById('modalGameOver');
    if (modal) {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    }
  },

  closeTimeOutModal() {
    const modal = document.getElementById('modalTimeOut');
    if (modal) {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    }
  },

  // ==========================================
  // COMBO & FLOATING VISUAL
  // ==========================================
  updateComboUI() {
    const badge = document.getElementById('puzzleComboMultiplierBadge');
    if (badge) {
      if (this.state.combo >= 2) {
        badge.textContent = `COMBO x${this.state.combo}! 🔥`;
        badge.classList.remove('hidden');
      } else {
        badge.classList.add('hidden');
      }
    }
  },

  showComboFloatingBanner(multiplier) {
    const container = document.getElementById('puzzleComboContainer');
    if (!container) return;

    const banner = document.createElement('div');
    banner.className = 'floating-combo-banner flex flex-col items-center justify-center';

    let textHtml = '';
    if (multiplier >= 3) {
      textHtml = `
        <div class="px-6 py-3.5 rounded-3xl bg-gradient-to-r from-amber-500 via-orange-500 to-rose-600 text-white font-black shadow-2xl border-2 border-white/80 flex items-center gap-3 backdrop-blur-md">
          <span class="text-3xl sm:text-4xl">⚡</span>
          <div>
            <div class="font-heading text-xl sm:text-2xl uppercase tracking-wider font-black">SEMPURNA! COMBO x3!</div>
            <div class="text-xs font-bold text-amber-200">+300 Poin Multiplier Maksimal! 🏆</div>
          </div>
        </div>
      `;
    } else if (multiplier === 2) {
      textHtml = `
        <div class="px-6 py-3 rounded-3xl bg-gradient-to-r from-sky-500 via-teal-500 to-emerald-500 text-white font-black shadow-2xl border-2 border-white/80 flex items-center gap-2.5 backdrop-blur-md">
          <span class="text-3xl sm:text-4xl">🔥</span>
          <div>
            <div class="font-heading text-xl sm:text-2xl uppercase tracking-wider font-black">COMBO x2!</div>
            <div class="text-xs font-bold text-sky-100">+200 Poin Berlipat Ganda!</div>
          </div>
        </div>
      `;
    } else {
      textHtml = `
        <div class="px-5 py-2 rounded-2xl bg-slate-900/85 text-emerald-400 font-extrabold shadow-xl border border-emerald-400/50 flex items-center gap-2 backdrop-blur-md">
          <span class="text-xl">⭐</span>
          <span class="text-xs sm:text-sm font-heading tracking-wide">+100 Poin Aksi Tepat!</span>
        </div>
      `;
    }

    banner.innerHTML = textHtml;
    container.appendChild(banner);

    setTimeout(() => {
      if (banner && banner.parentNode) {
        banner.parentNode.removeChild(banner);
      }
    }, 1600);
  },

  // ==========================================
  // PROGRESS UI & ROADMAP UPDATE (FREE NAVIGATION LEVEL 1-10)
  // ==========================================
  updateProgressUI() {
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

    const pointsValue = document.getElementById('puzzlePointsValue');
    if (pointsValue) {
      pointsValue.textContent = `${currentPts.toLocaleString('id-ID')} Poin`;
    }
    const headerPointsValue = document.getElementById('siswaHeaderPoints');
    if (headerPointsValue) {
      headerPointsValue.textContent = `${currentPts.toLocaleString('id-ID')} Poin`;
    }

    // Update Kartu & Badge Level 1 - 10 (Seluruh Level Bebas Dipilih Kapan Saja)
    for (let i = 1; i <= 10; i++) {
      const card = document.getElementById(`quizLevel${i}Card`);
      const badge = document.getElementById(`quizLevel${i}Badge`);

      if (card) {
        card.onclick = () => PuzzleOrgan.switchCase(i);
        card.style.pointerEvents = 'auto';
        card.style.cursor = 'pointer';

        if (i === this.state.currentLevel) {
          // Kasus Misi Aktif
          card.className = 'p-3.5 rounded-2xl bg-amber-50/95 border-2 border-amber-400 text-center shadow-md animate-pulse cursor-pointer transition-all hover:scale-[1.05] ring-2 ring-amber-300/60';
          if (badge) {
            badge.innerHTML = '⚡ Misi Aktif';
            badge.className = 'text-[10px] text-amber-600 font-black block mt-1 animate-pulse';
          }
        } else if (this.state.solvedLevels[i]) {
          // Kasus Selesai
          card.className = 'p-3.5 rounded-2xl bg-emerald-50/90 border-2 border-emerald-300 text-center shadow-xs cursor-pointer transition-all hover:scale-[1.03]';
          if (badge) {
            badge.innerHTML = '⭐ Selesai (+100 Poin)';
            badge.className = 'text-[10px] text-emerald-600 font-extrabold block mt-1';
          }
        } else {
          // Kasus Bebas Dimainkan (Free Navigation)
          card.className = 'p-3.5 rounded-2xl bg-white/95 border-2 border-sky-200 text-center shadow-xs cursor-pointer transition-all hover:border-sky-400 hover:scale-[1.03] hover:shadow-md';
          if (badge) {
            badge.innerHTML = '🔓 Siap Dimainkan';
            badge.className = 'text-[10px] text-sky-600 font-bold block mt-1';
          }
        }
      }
    }
  },

  // ==========================================
  // GRAND VICTORY & LIVE LEADERBOARD (KASUS 10 SELESAI)
  // ==========================================
  showGrandVictoryModal() {
    this.stopO2Depletion();
    this.playSound('fanfare');
    this.triggerConfetti();
    setTimeout(() => this.triggerConfetti(), 400);
    setTimeout(() => this.triggerConfetti(), 850);

    const modal = document.getElementById('modalGrandVictory');
    if (!modal) return;

    modal.classList.remove('hidden');
    modal.classList.add('flex');

    const titleEl = document.getElementById('victoryModalTitle');
    if (titleEl) {
      titleEl.textContent = 'SELAMAT! GELAR DOKTER CILIK DIRAIH! 🩺🏆';
    }

    const descEl = document.getElementById('victoryModalDesc');
    if (descEl) {
      descEl.textContent = 'Luar biasa! Seluruh 10 kasus darurat ruang kontrol berhasil kamu atasi dengan analisa klinis yang presisi. Pasien terselamatkan dan kamu resmi menyandang gelar Dokter Cilik!';
    }

    const actionBtnsContainer = document.getElementById('victoryActionButtonsContainer');
    if (actionBtnsContainer) {
      actionBtnsContainer.innerHTML = `
        <button id="btnVictoryLeaderboard" onclick="PuzzleOrgan.scrollToLeaderboard();" class="btn-squishy-secondary flex-1 py-3 text-xs font-bold flex items-center justify-center gap-1.5">
          <span class="material-symbols-outlined text-[16px]">leaderboard</span>
          <span>Papan Peringkat 🏆</span>
        </button>
        <button id="btnVictoryMenuHub" onclick="PuzzleOrgan.closeGrandVictoryModal(); if(window.TantanganHub) TantanganHub.showMenu();" class="btn-squishy-gold flex-1 py-3 text-xs font-bold shadow-md flex items-center justify-center gap-1.5">
          <span class="material-symbols-outlined text-[16px]">grid_view</span>
          <span>Pilih Mode Kuis 🎮</span>
        </button>
        <button id="btnVictoryDashboard" onclick="PuzzleOrgan.goToDashboard();" class="btn-squishy-primary flex-1 py-3 text-xs font-bold shadow-md flex items-center justify-center gap-1.5">
          <span class="material-symbols-outlined text-[16px]">home</span>
          <span>Dashboard Siswa 🏠</span>
        </button>
      `;
    }

    const rawActiveName = localStorage.getItem('currentUser') || 
                          (window.AppState && AppState.student && (AppState.student.namaAsli || AppState.student.name)) || 
                          'Peneliti Cilik';
    const cleanActiveName = rawActiveName.replace(/\s*\(.*?\)\s*/g, '').trim() || 'Peneliti Cilik';
    const pKey = (typeof window.getStudentProgressKey === 'function') 
      ? window.getStudentProgressKey(cleanActiveName) 
      : `progress_${cleanActiveName.toLowerCase().replace(/[^a-z0-9]+/g, '_')}`;

    let finalScore = 0;
    try {
      const stored = localStorage.getItem(pKey);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.points !== undefined) finalScore = Number(parsed.points);
        else if (parsed.score !== undefined) finalScore = Number(parsed.score);
      }
    } catch (e) {}
    if (finalScore === 0 && window.AppState && AppState.student) {
      finalScore = Number(AppState.student.points !== undefined ? AppState.student.points : (AppState.student.score || this.state.scoreEarned));
    }

    const startScore = Math.max(0, finalScore - (this.state.scoreEarned || 0));
    this.animateScoreCounter(startScore, finalScore, 1300);

    const summaryContainer = document.getElementById('victoryBadgesSummary');
    if (summaryContainer) {
      const remainingO2 = Math.max(0, Math.round(this.state.o2Level));
      summaryContainer.innerHTML = `
        <span class="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-900 text-[11px] font-extrabold flex items-center gap-1">
          <span class="material-symbols-outlined text-[14px]">air</span>
          <span>Sisa Waktu O₂: ${remainingO2}%</span>
        </span>
        <span class="px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 text-[11px] font-extrabold flex items-center gap-1">
          <span class="material-symbols-outlined text-[14px]">local_fire_department</span>
          <span>Max Combo: x${this.state.maxCombo || 1}</span>
        </span>
        <span class="px-2.5 py-1 rounded-full bg-sky-100 text-sky-800 text-[11px] font-extrabold flex items-center gap-1">
          <span>🩺 Gelar Dokter Cilik Diraih! 🏆</span>
        </span>
      `;
    }

    if (window.AppState && AppState.student) {
      AppState.student.name = cleanActiveName;
      AppState.student.namaAsli = cleanActiveName;
      AppState.student.points = finalScore;
      AppState.student.score = finalScore;
      AppState.student.level = 10;
      AppState.student.mastery = 100;
      AppState.student.status = 'Tuntas';
      AppState.student.badge = 'Dokter Cilik';
      if (AppState.saveStudent) AppState.saveStudent(AppState.student);
      if (window.App && App.renderStudentDashboard) {
        App.renderStudentDashboard();
      }
    }

    this.renderLiveLeaderboard(cleanActiveName, finalScore);
  },

  animateScoreCounter(startVal, endVal, duration = 1200) {
    const el = document.getElementById('victoryScoreCounter');
    if (!el) return;
    const startTime = performance.now();

    const step = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 4);
      const currentScore = Math.floor(startVal + (endVal - startVal) * easeOut);
      el.textContent = currentScore.toLocaleString('id-ID');

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = endVal.toLocaleString('id-ID');
      }
    };

    requestAnimationFrame(step);
  },

  renderLiveLeaderboard(studentName, studentScore) {
    const container = document.getElementById('victoryLiveLeaderboardList');
    if (!container) return;

    const rawName = (localStorage.getItem('currentUser') || 
                    (window.AppState && AppState.student && (AppState.student.namaAsli || AppState.student.name)) || 
                    studentName || 
                    'Peneliti Cilik').trim();
    const cleanStudentName = rawName.replace(/\s*\(.*?\)\s*/g, '').trim() || 'Peneliti Cilik';
    const activeClean = cleanStudentName.toLowerCase();

    let realScore = Number(studentScore) || 0;
    const activePKey = (typeof window.getStudentProgressKey === 'function') 
      ? window.getStudentProgressKey(cleanStudentName) 
      : `progress_${cleanStudentName.toLowerCase().replace(/[^a-z0-9]+/g, '_')}`;
    try {
      const stored = localStorage.getItem(activePKey);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.points !== undefined) realScore = Math.max(realScore, Number(parsed.points));
        else if (parsed.score !== undefined) realScore = Math.max(realScore, Number(parsed.score));
      }
    } catch (e) {}

    let players = [];
    if (window.AppState && Array.isArray(AppState.students) && AppState.students.length > 0) {
      players = AppState.students.map(s => {
        const sName = (s.namaAsli || s.name || '').trim();
        const sKey = (typeof window.getStudentProgressKey === 'function') 
          ? window.getStudentProgressKey(sName) 
          : `progress_${sName.toLowerCase().replace(/[^a-z0-9]+/g, '_')}`;
        let pts = Number(s.points !== undefined ? s.points : (s.score || 0));
        try {
          const stored = localStorage.getItem(sKey);
          if (stored) {
            const parsed = JSON.parse(stored);
            if (parsed.points !== undefined) pts = Number(parsed.points);
            else if (parsed.score !== undefined) pts = Number(parsed.score);
          }
        } catch (e) {}

        const isCurrent = sName.toLowerCase() === activeClean;
        if (isCurrent) pts = Math.max(pts, realScore);

        return {
          name: sName,
          points: pts,
          isCurrentStudent: isCurrent,
          avatar: isCurrent ? '⭐' : (s.avatar ? (s.avatar.includes('dara') || s.avatar.includes('mia') ? '👧' : '👦') : '👦'),
          badge: isCurrent ? '🏆 Dokter Cilik (10/10 Selesai)' : (pts > 0 ? 'Sedang Belajar' : 'Calon Peneliti')
        };
      });

      if (!players.some(p => p.isCurrentStudent)) {
        players.push({
          name: cleanStudentName,
          points: realScore,
          isCurrentStudent: true,
          avatar: '⭐',
          badge: '🏆 Dokter Cilik (10/10 Selesai)'
        });
      }
    } else {
      players = [
        { name: cleanStudentName, points: realScore, isCurrentStudent: true, avatar: '⭐', badge: '🏆 Dokter Cilik (10/10 Selesai)' },
        { name: 'Alika Naila Putri', points: 0, avatar: '👧', badge: 'Calon Peneliti' },
        { name: 'Aldo Irhab Syahir', points: 0, avatar: '👦', badge: 'Calon Peneliti' },
        { name: 'Bilqis Khoirunnisa', points: 0, avatar: '👧', badge: 'Calon Peneliti' }
      ];
    }

    players.sort((a, b) => b.points - a.points);
    const topPlayers = players.slice(0, 10);

    container.innerHTML = topPlayers.map((player, idx) => {
      const rank = idx + 1;
      let rankBadge = '';
      if (rank === 1) rankBadge = '<span class="text-base">🥇</span>';
      else if (rank === 2) rankBadge = '<span class="text-base">🥈</span>';
      else if (rank === 3) rankBadge = '<span class="text-base">🥉</span>';
      else rankBadge = `<span class="w-6 h-6 rounded-full bg-slate-200 text-slate-700 font-black text-xs flex items-center justify-center">${rank}</span>`;

      if (player.isCurrentStudent) {
        return `
          <div class="leaderboard-student-row p-2.5 sm:p-3 rounded-2xl flex items-center justify-between gap-3 transition-all scale-[1.02]">
            <div class="flex items-center gap-2.5 min-w-0">
              <div class="w-7 flex items-center justify-center shrink-0">
                ${rankBadge}
              </div>
              <div class="w-8 h-8 rounded-full bg-gradient-to-tr from-sky-400 to-teal-400 text-white flex items-center justify-center shadow-xs shrink-0 text-sm">
                ${player.avatar}
              </div>
              <div class="min-w-0">
                <div class="flex items-center gap-1.5">
                  <span class="font-heading font-black text-xs sm:text-sm text-sky-950 truncate">${player.name}</span>
                  <span class="px-1.5 py-0.5 rounded-full bg-sky-600 text-white text-[9px] font-black uppercase">Kamu</span>
                </div>
                <span class="text-[10px] text-teal-800 font-semibold block truncate">${player.badge}</span>
              </div>
            </div>
            <div class="text-right shrink-0">
              <span class="font-mono font-black text-sm sm:text-base text-sky-900 block leading-tight">
                ${player.points.toLocaleString('id-ID')}
              </span>
              <span class="text-[10px] text-sky-700 font-bold">Poin</span>
            </div>
          </div>
        `;
      } else {
        return `
          <div class="p-2 sm:p-2.5 rounded-2xl bg-white/75 border border-slate-200/80 hover:bg-white flex items-center justify-between gap-3 transition-all">
            <div class="flex items-center gap-2.5 min-w-0">
              <div class="w-7 flex items-center justify-center shrink-0">
                ${rankBadge}
              </div>
              <div class="w-8 h-8 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center shadow-2xs shrink-0 text-sm">
                ${player.avatar}
              </div>
              <div class="min-w-0">
                <span class="font-heading font-bold text-xs sm:text-sm text-slate-800 block truncate">${player.name}</span>
                <span class="text-[10px] text-slate-400 font-medium block truncate">${player.badge}</span>
              </div>
            </div>
            <div class="text-right shrink-0">
              <span class="font-mono font-extrabold text-xs sm:text-sm text-slate-700 block leading-tight">
                ${player.points.toLocaleString('id-ID')}
              </span>
              <span class="text-[10px] text-slate-400">Poin</span>
            </div>
          </div>
        `;
      }
    }).join('');
  },

  closeGrandVictoryModal() {
    const modal = document.getElementById('modalGrandVictory');
    if (modal) {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    }
  },

  // Tombol "Lihat Papan Peringkat Kelas 🏆" di Pop-up Victory
  scrollToLeaderboard() {
    const section = document.getElementById('victoryLeaderboardSection') || document.getElementById('victoryLiveLeaderboardList');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      section.classList.add('ring-4', 'ring-amber-400', 'rounded-2xl', 'transition-all');
      setTimeout(() => section.classList.remove('ring-4', 'ring-amber-400'), 1500);
    }
    if (window.App && App.showToast) {
      App.showToast('🏆 Menampilkan Papan Peringkat Kelas Terkini (Real-Time)!', 'info');
    }
  },

  // Tombol "Kembali ke Dashboard Utama 🏠" di Pop-up Victory
  goToDashboard() {
    this.closeGrandVictoryModal();
    this.stopO2Depletion();
    if (window.App && App.navigateTo) {
      App.navigateTo('screen-siswa');
    }
    if (window.App && App.showToast) {
      App.showToast('🎉 Selamat Dokter Cilik! Kembali ke Dashboard Siswa.', 'verified');
    }
  },

  // Tombol "Lanjut ke Level 7-10 (High Risk) ⚠️" di Pop-up Victory (Backward-Compatibility)
  goToLevel7() {
    this.closeGrandVictoryModal();
    this.switchCase(7);
  },

  // Alias backward-compatibility
  goToLevel4() {
    this.switchCase(4);
  },

  // Tombol "Kembali ke Peta Kemajuan 🗺️" di Pop-up Victory
  scrollToRoadmap() {
    this.closeGrandVictoryModal();
    const roadmap = document.getElementById('quizLevelRoadmapGrid');
    if (roadmap) {
      roadmap.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  },

  // ==========================================
  // RESET SIMULATOR
  // ==========================================
  resetPuzzle() {
    this.stopO2Depletion();
    this.state.currentLevel = 1;
    this.state.solvedLevels = {
      1: false,
      2: false,
      3: false,
      4: false,
      5: false,
      6: false,
      7: false,
      8: false,
      9: false,
      10: false
    };
    this.state.lives = 3;
    this.state.o2Level = 100;
    this.state.combo = 0;
    this.state.maxCombo = 0;
    this.state.isLocked = false;

    this.updateLivesUI();
    this.renderCase();
    this.updateO2UI();
    this.updateComboUI();
    this.updateProgressUI();
    this.startO2Depletion();

    if (window.App && App.showToast) {
      App.showToast('Simulator Ruang Kontrol diatur ulang! O₂ 100% siap dioperasikan! 🚀', 'check_circle');
    }
  },

  // ==========================================
  // TEACHER BYPASS KEY (G 3x DALAM < 1 DETIK)
  // ==========================================
  bindTeacherBypassKey() {
    if (this._bypassBound) return;
    this._bypassBound = true;

    window.addEventListener('keydown', (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

      if (e.key === 'g' || e.key === 'G') {
        const now = Date.now();
        this.teacherKeyBuffer = this.teacherKeyBuffer.filter(t => now - t < 1000);
        this.teacherKeyBuffer.push(now);

        if (this.teacherKeyBuffer.length >= 3) {
          this.teacherKeyBuffer = [];
          this.activateTeacherBypass();
        }
      }
    });
  },

  activateTeacherBypass() {
    this.state.teacherBypassed = true;

    if ((window.AppState && AppState.isSimulationMode) || window.isSimulationMode) {
      if (window.AppState && AppState.student) {
        AppState.student.level = 10;
        AppState.student.mastery = 100;
        AppState.student.points = 10000;
        AppState.student.score = 10000;
      }
      this.updateProgressUI();
      return;
    }

    const rawActiveName = localStorage.getItem('currentUser') || 
                          (window.AppState && AppState.student && (AppState.student.namaAsli || AppState.student.name)) || 
                          'Peneliti Cilik';
    const cleanActiveName = rawActiveName.replace(/\s*\(.*?\)\s*/g, '').trim() || 'Peneliti Cilik';
    const pKey = (typeof window.getStudentProgressKey === 'function') 
      ? window.getStudentProgressKey(cleanActiveName) 
      : `progress_${cleanActiveName.toLowerCase().replace(/[^a-z0-9]+/g, '_')}`;

    let pts = 10000;
    try {
      const stored = localStorage.getItem(pKey);
      if (stored) {
        const parsed = JSON.parse(stored);
        pts = Math.max(pts, Number(parsed.points || parsed.score || 0));
      }
    } catch (e) {}

    const bypassData = {
      name: cleanActiveName,
      namaAsli: cleanActiveName,
      username: cleanActiveName.toLowerCase(),
      level: 10,
      mastery: 100,
      points: pts,
      score: pts,
      lives: 3,
      status: 'Tuntas',
      lastUpdated: Date.now()
    };
    localStorage.setItem(pKey, JSON.stringify(bypassData));
    localStorage.setItem('currentUser', cleanActiveName);

    // 1. Update level siswa ke Level 10 (Maksimal)
    if (window.AppState && AppState.student) {
      AppState.student.name = cleanActiveName;
      AppState.student.namaAsli = cleanActiveName;
      AppState.student.level = 10;
      AppState.student.mastery = 100;
      AppState.student.points = pts;
      AppState.student.score = pts;
      AppState.student.status = 'Tuntas';
      AppState.student.badge = 'Dokter Cilik';
      if (AppState.saveStudent) {
        AppState.saveStudent(AppState.student);
      }
      if (window.App && App.renderStudentDashboard) {
        App.renderStudentDashboard();
      }
    }

    // 2. Tandai semua level 1-10 sebagai selesai
    this.state.solvedLevels = { 
      1: true, 2: true, 3: true, 4: true, 5: true, 
      6: true, 7: true, 8: true, 9: true, 10: true 
    };
    this.updateProgressUI();

    // 3. Buka SEMUA 10 KARTU LEVEL di Roadmap
    const levelNames = [
      'Rongga Hidung', 'Faring & Laring', 'Paru & Alveolus', 'Lonjakan Oksigen',
      'Infeksi & Lendir', 'Reaksi Asma', 'Keracunan Gas CO', 'Pneumonia Basah', 'Bahaya Tar Rokok', 'Kode Merah CPR'
    ];

    for (let i = 1; i <= 10; i++) {
      const card = document.getElementById(`quizLevel${i}Card`);
      const badge = document.getElementById(`quizLevel${i}Badge`);

      if (card) {
        card.className = 'quiz-level-card p-3.5 rounded-2xl teacher-unlocked-card text-center shadow-lg transform hover:scale-105 transition-all cursor-pointer';
        card.onclick = () => {
          this.switchCase(i);
        };

        const subSpan = card.querySelector('span:first-child');
        if (subSpan) subSpan.textContent = `Level ${i} 🔓`;

        if (badge) {
          badge.textContent = '⭐ Selesai (Akses Guru)';
          badge.className = 'text-[10px] text-emerald-800 font-black block mt-1';
        }
      }
    }

    // 4. Efek Suara Fanfare & Konfeti Perayaan
    this.playSound('fanfare');
    this.triggerConfetti();

    // 5. Toast notifikasi rahasia
    if (window.App && App.showToast) {
      App.showToast('🔓 Mode Akses Guru Aktif: Seluruh 10 Level Kuis Berhasil Terbuka!', 'verified');
    }
  },

  // ==========================================
  // PROCEDURAL WEB AUDIO SOUNDS
  // ==========================================
  playSound(type) {
    if (!this.state.soundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      if (!this.audioCtx) this.audioCtx = new AudioCtx();
      if (this.audioCtx.state === 'suspended') this.audioCtx.resume();

      const ctx = this.audioCtx;
      const now = ctx.currentTime;

      if (type === 'snap') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(523.25, now);
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.15);
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.25);
      } else if (type === 'combo') {
        const notes = [523.25, 659.25, 783.99, 1046.50];
        notes.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now + idx * 0.05);
          gain.gain.setValueAtTime(0.1, now + idx * 0.05);
          gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.05 + 0.15);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + idx * 0.05);
          osc.stop(now + idx * 0.05 + 0.15);
        });
      } else if (type === 'error') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(220, now);
        osc.frequency.linearRampToValueAtTime(110, now + 0.25);
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.25);
      } else if (type === 'tick') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(880, now);
        gain.gain.setValueAtTime(0.05, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.04);
      } else if (type === 'gameover') {
        const notes = [293.66, 261.63, 220, 174.61];
        notes.forEach((f, i) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(f, now + i * 0.14);
          gain.gain.setValueAtTime(0.15, now + i * 0.14);
          gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.14 + 0.22);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + i * 0.14);
          osc.stop(now + i * 0.14 + 0.22);
        });
      } else if (type === 'fanfare') {
        const chord = [523.25, 659.25, 783.99, 1046.50];
        chord.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, now + idx * 0.08);
          gain.gain.setValueAtTime(0.12, now + idx * 0.08);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.9);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + idx * 0.08);
          osc.stop(now + 0.9);
        });
      }
    } catch (e) {
      // AudioContext unavailable
    }
  },

  toggleSound() {
    this.state.soundEnabled = !this.state.soundEnabled;
    const btn = document.getElementById('btnTogglePuzzleSound');
    if (btn) {
      btn.innerHTML = `
        <span class="material-symbols-outlined text-[18px]">${this.state.soundEnabled ? 'volume_up' : 'volume_off'}</span>
        <span>Suara: ${this.state.soundEnabled ? 'Aktif' : 'Mati'}</span>
      `;
      btn.className = `inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all shadow-xs ${
        this.state.soundEnabled ? 'bg-sky-100 hover:bg-sky-200 text-sky-800' : 'bg-slate-200 text-slate-600'
      }`;
    }
  },

  // ==========================================
  // CONFETTI CANVAS PARTICLES
  // ==========================================
  initConfettiCanvas() {
    this.confettiCanvas = document.getElementById('puzzleConfettiCanvas');
    if (this.confettiCanvas) {
      this.confettiCtx = this.confettiCanvas.getContext('2d');
      this.resizeConfettiCanvas();
      window.addEventListener('resize', () => this.resizeConfettiCanvas());
    }
  },

  resizeConfettiCanvas() {
    if (!this.confettiCanvas) return;
    const parent = this.confettiCanvas.parentElement;
    if (parent) {
      this.confettiCanvas.width = parent.clientWidth;
      this.confettiCanvas.height = parent.clientHeight;
    }
  },

  triggerConfetti() {
    if (!this.confettiCanvas || !this.confettiCtx) return;
    this.resizeConfettiCanvas();

    const colors = ['#0284c7', '#10b981', '#f59e0b', '#fb7185', '#a855f7', '#38bdf8'];
    const particles = [];
    const count = 45;

    for (let i = 0; i < count; i++) {
      particles.push({
        x: this.confettiCanvas.width * 0.5,
        y: this.confettiCanvas.height * 0.35,
        r: Math.random() * 4 + 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        tilt: Math.random() * 10 - 5,
        vx: (Math.random() - 0.5) * 8,
        vy: (Math.random() - 0.8) * 8,
        life: 0,
        maxLife: Math.random() * 40 + 35
      });
    }

    const animate = () => {
      if (!this.confettiCtx) return;
      this.confettiCtx.clearRect(0, 0, this.confettiCanvas.width, this.confettiCanvas.height);
      let alive = false;

      particles.forEach(p => {
        p.life++;
        if (p.life < p.maxLife) {
          alive = true;
          p.x += p.vx;
          p.y += p.vy;
          p.vy += 0.18;
          p.tilt += 0.1;

          this.confettiCtx.beginPath();
          this.confettiCtx.fillStyle = p.color;
          this.confettiCtx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          this.confettiCtx.fill();
        }
      });

      if (alive) {
        requestAnimationFrame(animate);
      } else {
        this.confettiCtx.clearRect(0, 0, this.confettiCanvas.width, this.confettiCanvas.height);
      }
    };

    requestAnimationFrame(animate);
  }
};

// Auto-init on script load
if (typeof window !== 'undefined') {
  window.PuzzleOrgan = PuzzleOrgan;
  document.addEventListener('DOMContentLoaded', () => {
    PuzzleOrgan.bindTeacherBypassKey();
    // Render awal saat dokumen siap agar tombol jawaban dan peta navigasi langsung aktif di DOM
    PuzzleOrgan.renderCase();
    PuzzleOrgan.updateProgressUI();
  });
}
