/**
 * Data Lengkap Modul "Jelajah Materi"
 * Tarik dan Embuskan: Sistem Pernapasan Manusia
 * IPA Kelas 6 SD - Kurikulum Merdeka
 * Total: 6 Kategori Utama & 25 Sub-Button Materi Interaktif
 */

const MATERI_CATEGORIES = [
  // =========================================================================
  // KATEGORI 1: FUNGSI SISTEM PERNAPASAN
  // =========================================================================
  {
    id: 'kat_fungsi',
    title: 'Fungsi Sistem Pernapasan',
    badge: 'Kategori 01',
    icon: '⭐',
    themeColor: 'tertiary', // Coral/Orange
    gradient: 'from-amber-400 via-orange-500 to-rose-500',
    description: 'Tujuan utama dan manfaat vital tubuh kita bernapas setiap saat tanpa henti.',
    subTopics: [
      {
        id: 'sub_1_1',
        title: 'Menyerap Oksigen & Menghasilkan Energi',
        shortDesc: 'O₂ sebagai bahan bakar pembakaran sari makanan di sel tubuh.',
        icon: '⚡',
        organIcon: 'air',
        content: `Sistem pernapasan berfungsi menyerap gas oksigen (O₂) dari udara yang kita hirup dan menyalurkannya ke seluruh tubuh melalui aliran darah. Di dalam sel-sel tubuh kita, oksigen digunakan untuk membakar sari-sari makanan (proses respirasi selular) guna menghasilkan energi. Energi inilah yang kita pakai untuk berlari, berpikir, belajar di sekolah, dan bermain bersama teman. Jika kita berhenti bernapas selama beberapa menit saja, sel-sel tubuh terutama otak akan mengalami kekurangan oksigen yang sangat membahayakan nyawa.`,
        funFact: `Otak kita menghabiskan sekitar 20% dari seluruh oksigen yang dihirup tubuh, padahal berat otak hanya sekitar 2% dari total berat badanmu!`
      },
      {
        id: 'sub_1_2',
        title: 'Mengeluarkan Karbon Dioksida & Uap Air',
        shortDesc: 'Membuang zat sisa pembakaran agar tubuh tidak keracunan.',
        icon: '💨',
        organIcon: 'cloud',
        content: `Selain menghirup gas oksigen, sistem pernapasan bertugas mengeluarkan zat sisa pembakaran metabolisme tubuh berupa gas karbon dioksida (CO₂) dan uap air (H₂O). Karbon dioksida bersifat racun bagi tubuh jika dibiarkan menumpuk dalam darah, sehingga harus segera dibuang keluar. Bukti nyata adanya uap air yang keluar saat bernapas adalah ketika kamu mengembuskan napas ke permukaan cermin atau kaca jendela, kaca akan langsung menjadi buram dan basah oleh bintik-bintik embun air dari paru-parumu.`,
        funFact: `Setiap hari, melalui hembusan napas normal, tubuhmu mengeluarkan sekitar 400 mililiter uap air ke udara, setara dengan hampir dua gelas air minum!`
      }
    ]
  },

  // =========================================================================
  // KATEGORI 2: ORGAN SISTEM PERNAPASAN MANUSIA
  // =========================================================================
  {
    id: 'kat_organ',
    title: 'Organ Sistem Pernapasan Manusia',
    badge: 'Kategori 02',
    icon: '🫁',
    themeColor: 'primary', // Sky Blue
    gradient: 'from-sky-400 via-blue-500 to-indigo-600',
    description: 'Kenali bentuk, posisi, dan tugas ajaib dari 9 bagian organ pernapasan kita.',
    subTopics: [
      {
        id: 'sub_2_1',
        title: 'Hidung (Rongga Hidung)',
        shortDesc: 'Pintu gerbang utama dengan penyaring debu dan pelembap suhu.',
        icon: '👃',
        organIcon: 'face',
        content: `Rongga hidung adalah gerbang utama keluar masuknya udara pernapasan. Di dalam rongga hidung terdapat 3 penjaga hebat:\n1. Rambut Hidung (Silia): Menyaring butiran debu, pasir, dan kotoran agar tidak masuk ke paru-paru.\n2. Selaput Lendir (Mukus): Menangkap bakteri kuman serta melembapkan udara kering yang kita hirup.\n3. Pembuluh Darah Halus (Konka): Mengatur dan menghangatkan suhu udara yang masuk agar sesuai dengan suhu normal tubuh kita (sekitar 36-37°C).`,
        funFact: `Saat kamu bersin, udara yang keluar dari hidungmu bisa melesat dengan kecepatan dahsyat hingga 160 kilometer per jam untuk membersihkan kotoran yang menempel!`
      },
      {
        id: 'sub_2_2',
        title: 'Faring (Tekak / Tenggorokan Atas)',
        shortDesc: 'Persimpangan jalan pintar antara saluran udara dan saluran makanan.',
        icon: '🫁',
        organIcon: 'alt_route',
        content: `Faring merupakan saluran persimpangan yang menghubungkan rongga mulut (tempat lewatnya makanan) dan rongga hidung (tempat lewatnya udara napas). Di bagian bawah faring terdapat katup berbentuk daun bernama Epiglotis. Saat kita menelan makanan, epiglotis akan otomatis menutup saluran tenggorokan agar makanan meluncur masuk ke kerongkongan. Saat bernapas, epiglotis terbuka kembali agar udara mengalir bebas ke paru-paru.`,
        funFact: `Itulah mengapa orang tua selalu menasihati kita agar tidak boleh berbicara atau tertawa terbahak-bahak saat makan. Jika berbicara, epiglotis bisa terbuka dan membuat kita tersedak makanan!`
      },
      {
        id: 'sub_2_3',
        title: 'Laring (Pangkal Tenggorok / Kotak Suara)',
        shortDesc: 'Rumah bagi pita suara yang bergetar saat kita berbicara dan bernyanyi.',
        icon: '🗣️',
        organIcon: 'record_voice_over',
        content: `Laring adalah saluran pendek berbentuk tabung yang menghubungkan faring dengan trakea. Di dalam laring terdapat sepasang pita suara (pita elastis). Ketika udara dari paru-paru dihembuskan keluar melewati celah pita suara, pita suara akan bergetar dan menghasilkan gelombang suara. Suara inilah yang kemudian diolah oleh lidah, gigi, dan bibir kita menjadi kata-kata, lagu, atau tawa ceria.`,
        funFact: `Pada anak laki-laki yang beranjak remaja, tulang rawan di laring akan tumbuh membesar membentuk jakun di leher depan, sehingga nada suaranya berubah menjadi lebih berat dan berwibawa!`
      },
      {
        id: 'sub_2_4',
        title: 'Trakea (Batang Tenggorok)',
        shortDesc: 'Pipa napas kokoh bercincin tulang rawan dengan sapu mini pembersih debu.',
        icon: '🫧',
        organIcon: 'linear_scale',
        content: `Trakea adalah pipa napas sepanjang 10-12 cm yang berada di bagian leher depan hingga dada atas. Trakea tersusun dari belasan cincin tulang rawan yang berbentuk seperti huruf 'C'. Bentuk cincin ini membuat trakea tetap kokoh terbuka dan tidak pernah mengempis saat kamu bernapas. Dinding bagian dalamnya dilapisi rambut getar halus (silia) yang selalu bergerak menyapu kotoran halus dan lendir ke atas agar bisa kita batukkan keluar.`,
        funFact: `Cincin tulang rawan pada trakea mirip seperti kawat spiral pada selang penyedot debu (vacuum cleaner) yang menjaga selang tidak gepeng saat menghisap udara kuat!`
      },
      {
        id: 'sub_2_5',
        title: 'Bronkus (Cabang Batang Tenggorok)',
        shortDesc: 'Dua cabang jalan besar menuju paru-paru kanan dan paru-paru kiri.',
        icon: '🌿',
        organIcon: 'fork_right',
        content: `Di ujung bawah trakea, terdapat percabangan pipa napas menjadi dua cabang utama yang disebut Bronkus. Bronkus Kanan menuju ke dalam paru-paru kanan, dan Bronkus Kiri menuju ke paru-paru kiri. Bronkus kanan memiliki posisi yang lebih tegak, lebih pendek, dan berdiameter sedikit lebih lebar dibandingkan bronkus kiri. Struktur dinding bronkus juga diperkuat oleh lempeng tulang rawan.`,
        funFact: `Percabangan bronkus di dalam dada manusia menyerupai akar pohon beringin atau pohon terbalik, di mana batang utamanya di atas dan ranting-rantingnya menyebar ke bawah!`
      },
      {
        id: 'sub_2_6',
        title: 'Bronkiolus (Ranting Cabang Halus)',
        shortDesc: 'Cabang-cabang mini tanpa tulang rawan yang sangat fleksibel.',
        icon: '🪴',
        organIcon: 'account_tree',
        content: `Bronkiolus adalah cabang-cabang lanjutan yang lebih kecil dan halus dari bronkus. Semakin ke dalam paru-paru, jalurnya makin bercabang banyak dan ukurannya semakin kecil. Tidak seperti trakea dan bronkus, dinding bronkiolus tidak lagi dilapisi cincin tulang rawan, melainkan otot polos yang sangat lentur. Di ujung setiap ranting bronkiolus bermuara gelembung-gelembung udara alveolus.`,
        funFact: `Diameter ranting bronkiolus paling ujung sangatlah tipis, kurang dari 0,5 milimeter, bahkan lebih tipis dari sehelai isi pensil mekanikmu!`
      },
      {
        id: 'sub_2_7',
        title: 'Alveolus (Kantung Udara Mikroskopis)',
        shortDesc: 'Tempat difusi ajaib pertukaran gas oksigen dan karbon dioksida.',
        icon: '🍇',
        organIcon: 'bubble_chart',
        content: `Alveolus adalah kantung udara super kecil menyerupai sekumpulan buah anggur mini yang jumlahnya ratusan juta di dalam paru-paru. Dinding alveolus sangat tipis (hanya setebal satu sel) dan diselimuti oleh jaring-jaring pembuluh darah kapiler yang rapat. Di sinilah terjadi mukjizat pernapasan: gas oksigen (O₂) menembus dinding tipis alveolus untuk diserap oleh sel darah merah, sedangkan gas karbon dioksida (CO₂) dari darah dilepaskan ke dalam alveolus untuk dihembuskan keluar.`,
        funFact: `Jika seluruh 300 juta kantung alveolus di kedua paru-paru manusia dewasa dibentangkan mendatar, luas permukaannya mencapai 70 meter persegi, cukup untuk menutupi seluruh lapangan bulu tangkis!`
      },
      {
        id: 'sub_2_8',
        title: 'Paru-paru (Pulmo)',
        shortDesc: 'Dua organ spons kenyal pelindung kehidupan di dalam rongga dada.',
        icon: '🫁✨',
        organIcon: 'favorite',
        content: `Paru-paru adalah organ utama pernapasan yang bertekstur lembut dan kenyal seperti spons merah muda. Paru-paru terletak di dalam rongga dada dan dilindungi oleh sangkar tulang rusuk. Paru-paru kanan berukuran sedikit lebih besar dengan 3 gelambir (lobus), sedangkan paru-paru kiri memiliki 2 gelambir karena ada ruang yang dialokasikan untuk jantung kita. Seluruh permukaan paru-paru dibungkus oleh selaput pelindung ganda yang licin bernama Pleura.`,
        funFact: `Paru-paru adalah satu-satunya organ tubuh manusia yang bisa mengapung di atas air karena menyimpan jutaan kantung udara mikro yang selalu terisi udara!`
      },
      {
        id: 'sub_2_9',
        title: 'Diafragma (Otot Kubah Pernapasan)',
        shortDesc: 'Otot pembatas dada dan perut yang menggerakkan kembang-kempis napas.',
        icon: '🛡️',
        organIcon: 'speed',
        content: `Diafragma adalah lempengan otot berbentuk kubah melengkung yang membatasi rongga dada dengan rongga perut kita. Diafragma merupakan motor penggerak utama pernapasan manusia. Saat kita menarik napas (inspirasi), otot diafragma berkontraksi dan mendatar ke bawah sehingga rongga dada membesar dan udara masuk. Saat kita mengembuskan napas (ekspirasi), diafragma mengendur (relaksasi) dan melengkung kembali ke atas sehingga menekan udara keluar.`,
        funFact: `Pernahkah kamu cegukan (hiccups)? Cegukan terjadi ketika otot diafragma tiba-tiba mengalami kejang atau kontraksi tanpa sengaja akibat makan terlalu cepat atau minum soda dingin!`
      }
    ]
  },

  // =========================================================================
  // KATEGORI 3: PROSES PERNAPASAN MANUSIA
  // =========================================================================
  {
    id: 'kat_proses',
    title: 'Proses Pernapasan Manusia',
    badge: 'Kategori 03',
    icon: '🔄',
    themeColor: 'secondary', // Mint / Emerald
    gradient: 'from-emerald-400 via-teal-500 to-cyan-600',
    description: 'Mekanisme alur inspirasi, difusi kapiler, ekspirasi, serta jenis pernapasan.',
    subTopics: [
      {
        id: 'sub_3_1',
        title: 'Mekanisme Inspirasi (Menarik Napas)',
        shortDesc: 'Otot tulang rusuk dan diafragma berkontraksi membesarkan rongga dada.',
        icon: '🌬️',
        organIcon: 'south',
        mediaType: 'video',
        mediaSrc: './assets/animasi_inspirasi_final.mp4',
        mediaFallback: './assets/animasi_inspirasi_final.mp4.mp4',
        poster: './assets/siluet_tubuh.jpg',
        content: `Inspirasi adalah proses menghirup udara dari luar ke dalam paru-paru. Tahapan terjadinya inspirasi adalah:\n1. Otot antartulang rusuk berkontraksi sehingga tulang rusuk terangkat ke atas.\n2. Otot diafragma berkontraksi sehingga posisinya mendatar ke bawah.\n3. Akibatnya, volume rongga dada membesar dan paru-paru mengembang.\n4. Tekanan udara di dalam paru-paru menjadi lebih rendah daripada tekanan udara luar.\n5. Udara kaya oksigen dari atmosfer mengalir masuk melalui hidung menuju paru-paru.`,
        funFact: `Saat kamu menarik napas santai, kamu menghirup sekitar 500 mililiter udara (disebut Volume Tidal). Namun saat tarik napas maksimal, kamu bisa menghirup hingga 3.000 mililiter udara!`
      },
      {
        id: 'sub_3_2',
        title: 'Mekanisme Ekspirasi (Mengembuskan Napas)',
        shortDesc: 'Otot berelaksasi, rongga dada mengecil dan menekan udara keluar.',
        icon: '🍃',
        organIcon: 'north',
        mediaType: 'video',
        mediaSrc: './assets/animasi_ekspirasi_final.mp4',
        mediaFallback: './assets/animasi_ekspirasi_final.mp4.mp4',
        poster: './assets/siluet_tubuh.jpg',
        content: `Ekspirasi adalah proses mengeluarkan udara dari dalam paru-paru ke lingkungan luar. Tahapannya adalah:\n1. Otot antartulang rusuk berelaksasi (mengendur) sehingga tulang rusuk turun kembali.\n2. Otot diafragma berelaksasi sehingga bentuknya kembali melengkung ke atas ke arah rongga dada.\n3. Akibatnya, volume rongga dada menyempit/mengecil dan paru-paru mengempis.\n4. Tekanan udara di dalam paru-paru menjadi lebih tinggi daripada tekanan udara luar.\n5. Udara yang mengandung karbon dioksida dan uap air terdorong keluar melewati saluran pernapasan.`,
        funFact: `Meskipun kamu menghembuskan napas sekuat-kuatnya sampai perut kempis, paru-parumu tidak akan pernah benar-benar kosong! Selalu tersisa sekitar 1.200 ml udara (Volume Residu) agar paru-paru tidak lengket.`
      },
      {
        id: 'sub_3_3',
        title: 'Pertukaran Gas di Alveolus (Difusi Gas)',
        shortDesc: 'Hukum difusi: zat berpindah dari konsentrasi tinggi menuju rendah.',
        icon: '🧪',
        organIcon: 'swap_horiz',
        mediaType: 'video',
        mediaSrc: './assets/proses_3_pertukaran_gas.mp4',
        mediaFallback: './assets/proses_3_pertukaran_gas.mp4.mp4',
        poster: './assets/gua_alveolus.jpg',
        content: `Pertukaran gas di dalam alveolus terjadi secara difusi murni tanpa membutuhkan energi mekanik. Karena konsentrasi gas oksigen di dalam rongga alveolus sangat tinggi, molekul O₂ otomatis menembus selaput tipis alveolus dan dinding kapiler darah untuk diikat oleh hemoglobin pada sel darah merah. Pada saat bersamaan, darah yang mengalir dari jantung membawa banyak karbon dioksida (CO₂) dari seluruh tubuh. Karena kadar CO₂ di darah lebih tinggi daripada di alveolus, CO₂ menyeberang keluar menuju rongga alveolus untuk dibuang saat ekspirasi.`,
        funFact: `Waktu yang dibutuhkan oleh sel darah merah untuk menyerap oksigen penuh di alveoli luar biasa cepat: hanya sekitar 0,25 detik!`
      },
      {
        id: 'sub_3_4',
        title: 'Pernapasan Dada vs Pernapasan Perut',
        shortDesc: 'Perbedaan peran otot tulang rusuk dan otot diafragma.',
        icon: '⚖️',
        organIcon: 'compare_arrows',
        mediaType: 'video',
        mediaSrc: './assets/proses_4_dada_perut.mp4',
        mediaFallback: './assets/proses_4_dada_perut.mp4.mp4',
        poster: './assets/siluet_tubuh.jpg',
        content: `Manusia memiliki dua mekanisme bernapas utama:\n1. Pernapasan Dada: Menggunakan kontraksi otot antartulang rusuk (otot interkostal) sebagai penggerak utama. Ciri khasnya: dada tampak membusung naik dan turun saat bernapas.\n2. Pernapasan Perut: Menggunakan kontraksi otot diafragma sebagai penggerak utama. Ciri khasnya: perut tampak membesar mengembung saat menarik napas dan mengempis saat mengembuskan napas.\nKedua mekanisme ini bekerja sama secara harmonis dalam kehidupan kita sehari-hari.`,
        funFact: `Para atlet renang, penyelam bebas, qari pembaca Al-Qur'an, dan penyanyi profesional secara khusus melatih pernapasan perut karena kapasitas udara yang tersimpan lebih besar dan aliran suaranya jauh lebih stabil!`
      }
    ]
  },

  // =========================================================================
  // KATEGORI 4: PENYAKIT SISTEM PERNAPASAN
  // =========================================================================
  {
    id: 'kat_penyakit',
    title: 'Penyakit Sistem Pernapasan',
    badge: 'Kategori 04',
    icon: '🩺',
    themeColor: 'error', // Coral Rose / Red
    gradient: 'from-rose-500 via-pink-500 to-amber-500',
    description: 'Pelajari penyebab, gejala umum, dan pencegahan gangguan paru-paru.',
    subTopics: [
      {
        id: 'sub_4_1',
        title: 'Asma (Sesak Napas Alergi)',
        shortDesc: 'Penyempitan bronkus karena hipersensitif terhadap alergen dan dingin.',
        icon: '🫁⚡',
        organIcon: 'warning',
        mediaType: 'video',
        mediaSrc: './assets/penyakit_1_asma.mp4',
        mediaFallback: './assets/penyakit_1_asma.mp4.mp4',
        poster: './assets/paruparu_polos.jpg',
        content: `Asma adalah penyakit penyempitan dan peradangan saluran pernapasan (bronkus) yang bersifat kronis. Saluran napas penderita asma sangat sensitif terhadap rangsangan tertentu seperti debu rumah, serbuk sari bunga, bulu hewan peliharaan, asap rokok, udara dingin, atau stres kelelahan. Saat terserang asma, otot saluran napas mengencang dan dindingnya membengkak menghasilkan lendir berlebih, sehingga penderita mengalami sesak napas berat, batuk, dan mengeluarkan suara napas melengking bernada tinggi yang disebut 'mengi' (wheezing).`,
        funFact: `Penderita asma biasanya membawa inhaler obat semprot saku yang berisi zat pelega untuk membuka kembali otot saluran bronkus dalam hitungan detik.`
      },
      {
        id: 'sub_4_2',
        title: 'Influenza (Flu)',
        shortDesc: 'Infeksi virus menular pada hidung dan tenggorokan.',
        icon: '🤧',
        organIcon: 'coronavirus',
        mediaType: 'video',
        mediaSrc: './assets/penyakit_2_influenza.mp4',
        mediaFallback: './assets/penyakit_2_influenza.mp4.mp4',
        poster: './assets/hidung_organ.jpg',
        content: `Influenza atau flu adalah penyakit infeksi menular yang disebabkan oleh virus Influenza. Virus ini menyerang saluran pernapasan bagian atas mulai dari hidung hingga tenggorokan. Penularannya terjadi lewat cipratan air liur (droplet) saat penderita bersin atau batuk. Gejalanya meliputi demam tinggi, menggigil kedinginan, bersin berulang-ulang, hidung tersumbat lendir ingus, sakit kepala, nyeri otot sekujur badan, dan tenggorokan perih.`,
        funFact: `Virus flu memiliki kemampuan bermutasi dan berganti wujud sangat cepat setiap musim, itulah sebabnya seseorang bisa terserang flu berkali-kali sepanjang hidupnya!`
      },
      {
        id: 'sub_4_3',
        title: 'Pneumonia (Paru-Paru Basah)',
        shortDesc: 'Infeksi kantung alveolus yang terisi cairan atau nanah.',
        icon: '🦠',
        organIcon: 'water_drop',
        mediaType: 'video',
        mediaSrc: './assets/penyakit_3_pneumonia.mp4',
        mediaFallback: './assets/penyakit_3_pneumonia.mp4.mp4',
        poster: './assets/gua_alveolus.jpg',
        content: `Pneumonia adalah infeksi akut pada salah satu atau kedua paru-paru yang disebabkan oleh bakteri (seperti Streptococcus pneumoniae), virus, atau jamur. Infeksi ini menyebabkan kantung-kantung alveolus meradang hebat dan terisi oleh cairan lendir atau nanah. Akibatnya, oksigen dari udara tidak dapat menembus masuk ke darah. Gejala utamanya adalah sesak napas parah, batuk berdahak kuning kehijauan atau berdarah, demam tinggi disertai keringat dingin, dan nyeri dada saat menarik napas dalam.`,
        funFact: `Sebutan populer 'paru-paru basah' di masyarakat berasal dari kondisi nyata alveolus yang terendam cairan radang, bukan karena sering mandi di malam hari!`
      },
      {
        id: 'sub_4_4',
        title: 'Tuberkulosis (TBC)',
        shortDesc: 'Infeksi bakteri Mycobacterium yang membentuk bintil di alveolus.',
        icon: '🔬',
        organIcon: 'biotech',
        mediaType: 'video',
        mediaSrc: './assets/penyakit_4_tbc.mp4',
        mediaFallback: './assets/penyakit_4_tbc.mp4.mp4',
        poster: './assets/paruparu_polos.jpg',
        content: `TBC adalah penyakit infeksi paru-paru menular berbahaya yang disebabkan oleh bakteri Mycobacterium tuberculosis. Bakteri ini merusak jaringan paru-paru dan membentuk bintil-bintil kecil keras (tuberkel) pada dinding alveolus. Gejala khas TBC adalah batuk berdahak berkepanjangan yang berlangsung lebih dari 2 minggu (bisa disertai darah), demam meriang, berkeringat di malam hari tanpa beraktivitas, nafsu makan hilang, dan berat badan turun drastis. Penyakit ini dapat disembuhkan dengan minum obat antibiotik khusus secara teratur selama 6 bulan tanpa putus.`,
        funFact: `Vaksin BCG (Bacille Calmette-Guérin) yang disuntikkan pada bayi baru lahir adalah salah satu tameng pertahanan tubuh paling ampuh untuk mencegah TBC berat!`
      },
      {
        id: 'sub_4_5',
        title: 'ISPA (Infeksi Saluran Pernapasan Akut)',
        shortDesc: 'Gangguan pernapasan mendadak akibat kabut asap dan debu jalanan.',
        icon: '😷',
        organIcon: 'masks',
        mediaType: 'image',
        mediaSrc: './assets/penyakit_5_ispa.jpg',
        mediaFallback: './assets/penyakit_5_ispa.jpg.png',
        content: `ISPA adalah infeksi saluran pernapasan yang terjadi secara mendadak (akut) dan dapat menyerang hidung, tenggorokan, bronkus, hingga paru-paru. ISPA sangat sering melonjak saat terjadi kebakaran hutan yang menimbulkan kabut asap pekat, letusan gunung berapi yang menghujani abu vulkanik, atau polusi knalpot di kota besar. Gejalanya berupa hidung tersumbat, batuk kering atau berdahak, suara serak, sakit menelan, sesak napas ringan, dan badan terasa lemas.`,
        funFact: `Mengenakan masker berstandar medis (seperti masker bedah atau N95) saat berada di jalan raya mampu menyaring hingga 95% partikel debu halus berbahaya bagi parumu!`
      },
      {
        id: 'sub_4_6',
        title: 'Bronkitis',
        shortDesc: 'Peradangan pada lapisan dinding bronkus yang memicu lendir tebal.',
        icon: '💥',
        organIcon: 'emergency',
        mediaType: 'image',
        mediaSrc: './assets/penyakit_6_bronkitis.jpg',
        mediaFallback: './assets/penyakit_6_bronkitis.jpg.png',
        content: `Bronkitis adalah peradangan pada lapisan selaput lendir saluran bronkus. Peradangan ini menyebabkan dinding bronkus membengkak dan menghasilkan lendir berlendir tebal dalam jumlah banyak yang menyumbat jalur udara. Penderita akan sering batuk berdahak tebal untuk membersihkan jalan napasnya, merasakan nyeri atau rasa terbakar di dada, sesak napas ringan, dan kelelahan. Bronkitis bisa bersifat akut (akibat flu) atau kronis (akibat sering terpapar asap rokok).`,
        funFact: `Bahan kimia beracun di dalam asap rokok melumpuhkan rambut silia di saluran bronkus, sehingga kotoran dan lendir tidak bisa disapu dan menumpuk menjadi bronkitis kronis!`
      }
    ]
  },

  // =========================================================================
  // KATEGORI 5: FAKTOR KUALITAS PERNAPASAN
  // =========================================================================
  {
    id: 'kat_faktor',
    title: 'Faktor yang Memengaruhi Kualitas Pernapasan',
    badge: 'Kategori 05',
    icon: '⚖️',
    themeColor: 'primary',
    gradient: 'from-blue-500 via-teal-400 to-emerald-500',
    description: 'Empat pilar utama yang menentukan kelancaran dan kesehatan paru-parumu.',
    subTopics: [
      {
        id: 'sub_5_1',
        title: 'Kondisi Kesehatan Fisik & Organ Tubuh',
        shortDesc: 'Kelenturan otot diafragma, kapasitas paru, dan daya tahan tubuh.',
        icon: '🫀',
        organIcon: 'fitness_center',
        mediaType: 'image',
        mediaSrc: './assets/faktor_1_kesehatan.jpg',
        mediaFallback: './assets/faktor_1_kesehatan.jpg.png',
        content: `Kesehatan organ tubuh internal sangat memengaruhi pasokan oksigen kita. Seseorang yang memiliki otot diafragma yang lentur, jantung yang kuat memompa darah, dan kadar hemoglobin normal akan bernapas dengan sangat efisien tanpa mudah terengah-engah. Sebaliknya, gangguan fisik seperti kelainan tulang belakang melengkung (kifosis atau skoliosis) dapat menekan sangkar rongga dada dan membatasi pengembangan paru-paru.`,
        funFact: `Rutin melakukan peregangan postur tubuh tegak setiap hari membantu rongga dada mengembang optimal sehingga paru-paru dapat terisi oksigen penuh!`
      },
      {
        id: 'sub_5_2',
        title: 'Mikroorganisme & Patogen Udara',
        shortDesc: 'Ancaman kuman, virus flu, dan spora jamur di udara ruangan.',
        icon: '🧫',
        organIcon: 'bug_report',
        mediaType: 'image',
        mediaSrc: './assets/faktor_2_mikroorganisme.jpg',
        mediaFallback: './assets/faktor_2_mikroorganisme.jpg.jpg',
        content: `Kualitas udara yang kita hirup dipengaruhi oleh ada atau tidaknya kuman penyakit. Ruangan kelas yang lembap, gelap, dan jarang dibuka jendelanya adalah sarang ideal bagi perkembangbiakan spora jamur, tungau debu, dan virus flu yang melayang di udara. Saat terhirup oleh anak yang daya tahan tubuhnya sedang turun, mikroorganisme ini dengan mudah menginfeksi selaput lendir hidung dan trakea.`,
        funFact: `Membuka jendela kamar di pagi hari agar sinar matahari masuk terbukti ampuh membunuh bakteri dan kuman di udara secara alami dengan sinar ultraviolet!`
      },
      {
        id: 'sub_5_3',
        title: 'Kualitas Lingkungan Hidup & Polusi',
        shortDesc: 'Bahaya asap knalpot, debu pabrik, dan partikel halus PM2.5.',
        icon: '🏭',
        organIcon: 'factory',
        mediaType: 'image',
        mediaSrc: './assets/faktor_3_lingkungan.jpg',
        mediaFallback: './assets/faktor_3_lingkungan.jpg.jpg',
        content: `Lingkungan tempat tinggal menentukan jenis udara yang masuk ke dalam tubuh kita. Udara di daerah pegunungan atau pedesaan yang banyak ditumbuhi pepohonan rindang sangat bersih dan kaya akan oksigen murni. Sebaliknya, udara perkotaan yang padat industri dan kendaraan bermotor mengandung gas beracun seperti karbon monoksida (CO), sulfur dioksida (SO₂), dan partikel mikro PM2.5 yang dapat menembus hingga ke dalam kantung alveolus dan merusaknya.`,
        funFact: `Partikel polusi udara PM2.5 ukurannya 30 kali lebih kecil dari sehelai rambut manusia, sehingga rambut hidung tidak mampu menyaringnya dan butuh masker untuk menahannya!`
      },
      {
        id: 'sub_5_4',
        title: 'Aktivitas Tubuh, Posisi & Usia',
        shortDesc: 'Frekuensi bernapas berubah drastis sesuai kebutuhan energi sel.',
        icon: '🧬',
        organIcon: 'directions_run',
        mediaType: 'video',
        mediaSrc: './assets/faktor_4_aktivitas.mp4',
        mediaFallback: './assets/faktor_4_aktivitas.mp4.mp4',
        poster: './assets/siluet_tubuh.jpg',
        content: `Kecepatan kita bernapas (frekuensi napas) dipengaruhi oleh aktivitas dan usia:\n1. Saat duduk diam: Kita bernapas sekitar 15-20 kali per menit.\n2. Saat berlari kencang atau olahraga: Napas meningkat hingga 40-60 kali per menit karena otot butuh banyak energi.\n3. Posisi tubuh: Bernapas saat berdiri tegak lebih lega daripada saat tidur telentang karena diafragma tidak tertekan isi perut.\n4. Usia: Bayi bernapas lebih cepat (30-40 kali/menit) dibanding orang dewasa karena laju metabolismenya yang sangat aktif.`,
        funFact: `Saat kamu tidur malam, tubuhmu secara otomatis menurunkan laju pernapasan dan detak jantung untuk mengistirahatkan seluruh organ dalam tubuh!`
      }
    ]
  },

  // =========================================================================
  // KATEGORI 6: CARA MENJAGA KESEHATAN PARU-PARU
  // =========================================================================
  {
    id: 'kat_rawat',
    title: 'Cara Menjaga Kesehatan Paru-paru',
    badge: 'Kategori 06',
    icon: '🌱',
    themeColor: 'secondary',
    gradient: 'from-emerald-500 via-green-500 to-lime-500',
    description: 'Aksi nyata gaya hidup sehat agar paru-parumu selalu bersih, kuat, dan bugar.',
    subTopics: [
      {
        id: 'sub_6_1',
        title: 'Olahraga Teratur & Latihan Napas Dalam',
        shortDesc: 'Berenang, lari pagi, dan bersepeda melipatgandakan kapasitas vital paru.',
        icon: '🏃',
        organIcon: 'sports_gymnastics',
        mediaType: 'image',
        mediaSrc: './assets/rawat_1_olahraga.jpg',
        mediaFallback: './assets/rawat_1_olahraga.jpg.jpg',
        content: `Melakukan aktivitas fisik aerobik minimal 30 menit sehari (seperti berlari santai, berenang, bersepeda, atau senam kesegaran jasmani) merangsang paru-paru bekerja lebih aktif. Olahraga memperkuat daya lentur otot diafragma dan otot antartulang rusuk, serta melatih pembuluh darah kapiler di alveolus bekerja menyerap oksigen lebih cepat. Latihan pernapasan dalam (menghirup udara dalam-dalam dari perut dan mengembuskan perlahan) juga membantu membuang udara sisa yang mengendap di dasar paru-paru.`,
        funFact: `Atlet renang profesional memiliki kapasitas paru-paru hingga 6 liter udara, hampir dua kali lipat lebih besar dibanding orang yang jarang berolahraga!`
      },
      {
        id: 'sub_6_2',
        title: 'Menjaga Kebersihan Udara & Menanam Pohon',
        shortDesc: 'Tumbuhan hijau adalah pabrik pembuat oksigen terbaik di bumi.',
        icon: '🌳',
        organIcon: 'forest',
        mediaType: 'image',
        mediaSrc: './assets/rawat_2_tumbuhan.jpg',
        mediaFallback: './assets/rawat_2_tumbuhan.jpg.png',
        content: `Melalui proses fotosintesis di siang hari, daun pepohonan hijau menyerap gas karbon dioksida dari udara dan menghasilkan gas oksigen murni yang kita butuhkan untuk hidup. Menanam pohon peneduh di pekarangan rumah atau sekolah, merawat tanaman hias di dalam pot, serta menjaga ventilasi kamar tidur tetap terbuka agar terjadi sirkulasi pertukaran udara segar adalah langkah nyata menjaga kebersihan udara yang kita hirup setiap detik.`,
        funFact: `Satu pohon rindang berdaun lebat mampu menghasilkan pasokan oksigen bersih yang cukup untuk kebutuhan bernapas 2 hingga 4 orang manusia setiap harinya!`
      },
      {
        id: 'sub_6_3',
        title: 'Menjauhi Asap Rokok & Polusi Berbahaya',
        shortDesc: 'Hindari menjadi perokok pasif dan gunakan masker di tempat berdebu.',
        icon: '🚭',
        organIcon: 'smoke_free',
        mediaType: 'image',
        mediaSrc: './assets/rawat_3_jauhi_asap.jpg',
        mediaFallback: './assets/rawat_3_jauhi_asap.jpg.jpg',
        content: `Asap rokok mengandung lebih dari 4.000 bahan kimia beracun, termasuk Tar yang membuat paru-paru menghitam dan karsinogen pemicu kanker paru-paru. Menjadi 'perokok pasif' (orang yang tidak merokok tetapi menghirup asap rokok orang di dekatnya) memiliki risiko terkena penyakit paru-paru yang sama besarnya. Oleh karena itu, beranilah menjauh dari orang yang sedang merokok. Selain itu, pakailah masker penutup hidung saat berada di jalan raya berdebu atau daerah pabrik.`,
        funFact: `Hanya dalam waktu 20 menit setelah seseorang menjauhi asap rokok, denyut jantung dan tekanan darah tubuhnya akan mulai berangsur normal kembali!`
      },
      {
        id: 'sub_6_4',
        title: 'Pola Makan Sehat, Minum Air & Istirahat Cukup',
        shortDesc: 'Nutrisi buah kaya antioksidan memperkuat sel pelindung alveolus.',
        icon: '🥗',
        organIcon: 'nutrition',
        mediaType: 'image',
        mediaSrc: './assets/rawat_4_makanan.jpg',
        mediaFallback: './assets/rawat_4_makanan.jpg.png',
        content: `Makanan bergizi seimbang yang kaya vitamin C dan antioksidan (seperti jeruk, apel, tomat, brokoli, dan bayam) membantu melindungi sel-sel alveolus dari kerusakan akibat radikal bebas polusi. Minum air putih yang cukup (minimal 8 gelas sehari) menjaga selaput lendir di rongga hidung dan saluran napas tetap lembap dan encer, sehingga kotoran dan kuman mudah disapu keluar oleh silia. Ditambah tidur teratur 8-9 jam setiap malam agar sel tubuh dapat memperbaiki jaringan yang lelah.`,
        funFact: `Air putih hangat sangat efektif mengencerkan dahak atau lendir di tenggorokan saat kamu sedang terserang batuk pilek!`
      }
    ]
  }
];

// Helper Functions
function getAllSubTopicsCount() {
  const cats = (typeof MATERI_CATEGORIES !== 'undefined') ? MATERI_CATEGORIES : (window.MATERI_CATEGORIES || []);
  return cats.reduce((total, cat) => total + cat.subTopics.length, 0);
}

function findSubTopicById(subId) {
  const cats = (typeof MATERI_CATEGORIES !== 'undefined') ? MATERI_CATEGORIES : (window.MATERI_CATEGORIES || []);
  for (const cat of cats) {
    const found = cat.subTopics.find(s => s.id === subId);
    if (found) return { subTopic: found, category: cat };
  }
  return null;
}

if (typeof window !== 'undefined') {
  window.MATERI_CATEGORIES = MATERI_CATEGORIES;
  window.findSubTopicById = findSubTopicById;
  window.getAllSubTopicsCount = getAllSubTopicsCount;
}
