/**
 * Avatars & Vector Graphics Generator
 * Tarik dan Embuskan: Sistem Pernapasan Manusia
 * Colorful 3D BabyBus aesthetic for Grade 6 Elementary School
 */

const AVATAR_MAP = {
  // TEACHER AVATARS (6 Pilihan Guru)
  'guru-1': {
    id: 'guru-1',
    name: 'Ibu Guru Rahma (Hijab Biru)',
    desc: 'Spesialis Biologi Anak & Anatomi',
    role: 'guru',
    svg: `<svg viewBox="0 0 100 100" class="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="g1-bg" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stop-color="#E0F2FE"/>
          <stop offset="100%" stop-color="#BAE6FD"/>
        </radialGradient>
        <linearGradient id="g1-hijab" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#38BDF8"/>
          <stop offset="100%" stop-color="#0284C7"/>
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="48" fill="url(#g1-bg)"/>
      <!-- Hijab Head Cover -->
      <path d="M22 60 C20 32 30 18 50 18 C70 18 80 32 78 60 C76 75 70 85 50 88 C30 85 24 75 22 60 Z" fill="url(#g1-hijab)"/>
      <!-- Face -->
      <ellipse cx="50" cy="52" rx="20" ry="23" fill="#FDE047" opacity="0.15"/>
      <ellipse cx="50" cy="50" rx="18" ry="21" fill="#FED7AA"/>
      <!-- Eyes & Cheeks -->
      <circle cx="43" cy="48" r="3" fill="#0F172A"/>
      <circle cx="57" cy="48" r="3" fill="#0F172A"/>
      <circle cx="44" cy="47" r="1" fill="#FFFFFF"/>
      <circle cx="58" cy="47" r="1" fill="#FFFFFF"/>
      <ellipse cx="39" cy="54" rx="4" ry="2.5" fill="#FB7185" opacity="0.6"/>
      <ellipse cx="61" cy="54" rx="4" ry="2.5" fill="#FB7185" opacity="0.6"/>
      <!-- Smile -->
      <path d="M44 57 Q50 63 56 57" fill="none" stroke="#E11D48" stroke-width="2.2" stroke-linecap="round"/>
      <!-- Hijab folds -->
      <path d="M30 68 Q50 78 70 68 Q50 88 30 68" fill="#0369A1"/>
      <!-- Glasses -->
      <rect x="36" y="44" width="13" height="9" rx="3" fill="none" stroke="#0369A1" stroke-width="1.6"/>
      <rect x="51" y="44" width="13" height="9" rx="3" fill="none" stroke="#0369A1" stroke-width="1.6"/>
      <line x1="49" y1="48" x2="51" y2="48" stroke="#0369A1" stroke-width="1.6"/>
      <!-- Badge Pin -->
      <circle cx="50" cy="80" r="4.5" fill="#FBBF24"/>
      <path d="M50 77 L51 79 L53 79 L51.5 80.5 L52 83 L50 81.5 L48 83 L48.5 80.5 L47 79 L49 79 Z" fill="#78350F"/>
    </svg>`
  },
  'guru-2': {
    id: 'guru-2',
    name: 'Pak Guru Budi (Jas Laboratorium)',
    desc: 'Spesialis Praktikum & Lab 3D',
    role: 'guru',
    svg: `<svg viewBox="0 0 100 100" class="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="g2-bg" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stop-color="#ECFDF5"/>
          <stop offset="100%" stop-color="#A7F3D0"/>
        </radialGradient>
        <linearGradient id="g2-hair" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#334155"/>
          <stop offset="100%" stop-color="#0F172A"/>
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="48" fill="url(#g2-bg)"/>
      <!-- Shoulders & Lab Coat -->
      <path d="M15 95 C18 70 32 68 50 68 C68 68 82 70 85 95 Z" fill="#F8FAFC"/>
      <path d="M38 68 L50 90 L62 68 Z" fill="#059669"/>
      <polygon points="50,72 46,80 54,80" fill="#FBBF24"/>
      <!-- Neck & Face -->
      <rect x="44" y="60" width="12" height="12" rx="3" fill="#FDBA74"/>
      <ellipse cx="50" cy="46" rx="20" ry="22" fill="#FED7AA"/>
      <!-- Neat Hair -->
      <path d="M28 44 C26 26 40 18 50 18 C64 18 74 26 72 44 C68 34 58 32 50 32 C42 32 32 35 28 44 Z" fill="url(#g2-hair)"/>
      <!-- Eyes & Round Glasses -->
      <circle cx="42" cy="46" r="3" fill="#0F172A"/>
      <circle cx="58" cy="46" r="3" fill="#0F172A"/>
      <circle cx="43" cy="45" r="1" fill="#FFFFFF"/>
      <circle cx="59" cy="45" r="1" fill="#FFFFFF"/>
      <circle cx="42" cy="46" r="7" fill="none" stroke="#0F172A" stroke-width="1.8"/>
      <circle cx="58" cy="46" r="7" fill="none" stroke="#0F172A" stroke-width="1.8"/>
      <line x1="49" y1="46" x2="51" y2="46" stroke="#0F172A" stroke-width="1.8"/>
      <!-- Cheeks & Confident Smile -->
      <ellipse cx="35" cy="52" rx="3" ry="2" fill="#FB7185" opacity="0.5"/>
      <ellipse cx="65" cy="52" rx="3" ry="2" fill="#FB7185" opacity="0.5"/>
      <path d="M44 56 Q50 61 56 56" fill="none" stroke="#B91C1C" stroke-width="2.2" stroke-linecap="round"/>
      <!-- Stethoscope Tube -->
      <path d="M30 84 Q40 96 50 94 Q60 96 70 84" fill="none" stroke="#0284C7" stroke-width="2.5" stroke-linecap="round"/>
      <circle cx="50" cy="94" r="3.5" fill="#FBBF24" stroke="#0369A1" stroke-width="1.5"/>
    </svg>`
  },
  'guru-3': {
    id: 'guru-3',
    name: 'Ibu Guru Dewi (Rambut Ikal Ceria)',
    desc: 'Pengajar Inspiratif & Ramah Anak',
    role: 'guru',
    svg: `<svg viewBox="0 0 100 100" class="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="g3-bg" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stop-color="#FFF1F2"/>
          <stop offset="100%" stop-color="#FECDD3"/>
        </radialGradient>
      </defs>
      <circle cx="50" cy="50" r="48" fill="url(#g3-bg)"/>
      <!-- Curly Bun Hair Background -->
      <circle cx="50" cy="22" r="14" fill="#581C87"/>
      <!-- Body & Pastel Blazer -->
      <path d="M18 95 C20 72 34 70 50 70 C66 70 80 72 82 95 Z" fill="#9333EA"/>
      <path d="M38 70 L50 90 L62 70 Z" fill="#FDE047"/>
      <!-- Face -->
      <rect x="44" y="60" width="12" height="12" rx="3" fill="#FDBA74"/>
      <ellipse cx="50" cy="46" rx="19" ry="21" fill="#FED7AA"/>
      <!-- Curly Hair Sides -->
      <path d="M26 48 C24 30 36 22 50 22 C64 22 76 30 74 48 C68 36 64 36 50 36 C36 36 32 36 26 48 Z" fill="#6B21A8"/>
      <!-- Big Sparkle Eyes -->
      <ellipse cx="43" cy="46" rx="3.5" ry="4" fill="#3B0764"/>
      <ellipse cx="57" cy="46" rx="3.5" ry="4" fill="#3B0764"/>
      <circle cx="44.5" cy="44.5" r="1.5" fill="#FFFFFF"/>
      <circle cx="58.5" cy="44.5" r="1.5" fill="#FFFFFF"/>
      <!-- Cheeks & Happy Smile -->
      <ellipse cx="36" cy="52" rx="4" ry="2.5" fill="#F43F5E" opacity="0.6"/>
      <ellipse cx="64" cy="52" rx="4" ry="2.5" fill="#F43F5E" opacity="0.6"/>
      <path d="M43 55 Q50 63 57 55" fill="#BE123C" stroke="#BE123C" stroke-width="1.5" stroke-linecap="round"/>
      <!-- Star Hairclip -->
      <polygon points="34,28 36,33 41,33 37,36 39,41 34,38 29,41 31,36 27,33 32,33" fill="#FBBF24"/>
    </svg>`
  },
  'guru-4': {
    id: 'guru-4',
    name: 'Pak Guru Fajar (Peneliti Bersemangat)',
    desc: 'Pengembang Media & Game Edukasi',
    role: 'guru',
    svg: `<svg viewBox="0 0 100 100" class="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="g4-bg" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stop-color="#FEF3C7"/>
          <stop offset="100%" stop-color="#FDE68A"/>
        </radialGradient>
      </defs>
      <circle cx="50" cy="50" r="48" fill="url(#g4-bg)"/>
      <!-- Blue Polo Shirt -->
      <path d="M16 95 C19 72 32 70 50 70 C68 70 81 72 84 95 Z" fill="#0284C7"/>
      <polygon points="50,70 42,78 50,86 58,78" fill="#38BDF8"/>
      <!-- Face -->
      <rect x="44" y="60" width="12" height="12" rx="3" fill="#FDBA74"/>
      <ellipse cx="50" cy="46" rx="19" ry="21" fill="#FED7AA"/>
      <!-- Modern Styled Spiky Hair -->
      <path d="M27 42 C24 24 35 16 50 16 C65 16 76 24 73 42 C68 28 62 26 50 28 C38 26 32 28 27 42 Z" fill="#92400E"/>
      <path d="M42 16 L46 11 L50 17 L54 10 L58 16" fill="#B45309"/>
      <!-- Eyes & Winking Fun Expression -->
      <circle cx="42" cy="46" r="3" fill="#0F172A"/>
      <circle cx="43" cy="45" r="1" fill="#FFFFFF"/>
      <path d="M54 46 Q58 43 62 46" fill="none" stroke="#0F172A" stroke-width="2.5" stroke-linecap="round"/>
      <!-- Dimple & Big Grin -->
      <ellipse cx="36" cy="53" rx="3.5" ry="2" fill="#FB923C" opacity="0.5"/>
      <ellipse cx="64" cy="53" rx="3.5" ry="2" fill="#FB923C" opacity="0.5"/>
      <path d="M42 54 Q50 64 58 54" fill="#B91C1C" stroke="#B91C1C" stroke-width="1.5"/>
      <path d="M45 54 Q50 56 55 54" fill="#FFFFFF"/>
    </svg>`
  },
  'guru-5': {
    id: 'guru-5',
    name: 'Ibu Guru Anisa (Hijab Emerald)',
    desc: 'Koordinator Kurikulum Merdeka IPA',
    role: 'guru',
    svg: `<svg viewBox="0 0 100 100" class="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="g5-bg" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stop-color="#CCFBF1"/>
          <stop offset="100%" stop-color="#99F6E4"/>
        </radialGradient>
        <linearGradient id="g5-hijab" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#10B981"/>
          <stop offset="100%" stop-color="#047857"/>
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="48" fill="url(#g5-bg)"/>
      <!-- Hijab Head Cover -->
      <path d="M22 62 C20 32 30 18 50 18 C70 18 80 32 78 62 C76 76 70 86 50 89 C30 86 24 76 22 62 Z" fill="url(#g5-hijab)"/>
      <!-- Face -->
      <ellipse cx="50" cy="51" rx="18" ry="21" fill="#FED7AA"/>
      <!-- Eyes & Calm Look -->
      <ellipse cx="43" cy="48" rx="3" ry="3.5" fill="#064E3B"/>
      <ellipse cx="57" cy="48" rx="3" ry="3.5" fill="#064E3B"/>
      <circle cx="44" cy="47" r="1.2" fill="#FFFFFF"/>
      <circle cx="58" cy="47" r="1.2" fill="#FFFFFF"/>
      <ellipse cx="38" cy="55" rx="3.5" ry="2" fill="#F43F5E" opacity="0.5"/>
      <ellipse cx="62" cy="55" rx="3.5" ry="2" fill="#F43F5E" opacity="0.5"/>
      <!-- Smile -->
      <path d="M44 57 Q50 63 56 57" fill="none" stroke="#E11D48" stroke-width="2.2" stroke-linecap="round"/>
      <!-- Emerald Brooch -->
      <circle cx="50" cy="80" r="5" fill="#FBBF24" stroke="#D97706" stroke-width="1.5"/>
      <circle cx="50" cy="80" r="2.5" fill="#10B981"/>
    </svg>`
  },
  'guru-6': {
    id: 'guru-6',
    name: 'Pak Guru Hendra (Petualang Sains)',
    desc: 'Spesialis Eksplorasi Luar Ruang & Paru Sehat',
    role: 'guru',
    svg: `<svg viewBox="0 0 100 100" class="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="g6-bg" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stop-color="#FFEDD5"/>
          <stop offset="100%" stop-color="#FED7AA"/>
        </radialGradient>
      </defs>
      <circle cx="50" cy="50" r="48" fill="url(#g6-bg)"/>
      <!-- Safari Vest -->
      <path d="M16 95 C19 72 32 70 50 70 C68 70 81 72 84 95 Z" fill="#EA580C"/>
      <rect x="36" y="74" width="28" height="22" fill="#F97316"/>
      <!-- Face -->
      <rect x="44" y="60" width="12" height="12" rx="3" fill="#FDBA74"/>
      <ellipse cx="50" cy="48" rx="19" ry="21" fill="#FED7AA"/>
      <!-- Safari Explorer Hat -->
      <ellipse cx="50" cy="30" rx="32" ry="7" fill="#CA8A04"/>
      <path d="M30 30 C30 16 38 14 50 14 C62 14 70 16 70 30 Z" fill="#EAB308"/>
      <rect x="31" y="27" width="38" height="4" fill="#713F12"/>
      <!-- Eyes & Cheerful Explorer Look -->
      <circle cx="43" cy="49" r="3" fill="#0F172A"/>
      <circle cx="57" cy="49" r="3" fill="#0F172A"/>
      <circle cx="44" cy="48" r="1" fill="#FFFFFF"/>
      <circle cx="58" cy="48" r="1" fill="#FFFFFF"/>
      <!-- Smile & Cheeks -->
      <ellipse cx="37" cy="55" rx="3.5" ry="2" fill="#FB923C" opacity="0.6"/>
      <ellipse cx="63" cy="55" rx="3.5" ry="2" fill="#FB923C" opacity="0.6"/>
      <path d="M44 57 Q50 64 56 57" fill="#B91C1C" stroke="#B91C1C" stroke-width="1.8"/>
    </svg>`
  },

  // STUDENT AVATARS (5 Karakter Anak Ceria: Dara, Banu, Ian, Aga, Mia)
  'siswa-dara': {
    id: 'siswa-dara',
    name: 'Dara',
    title: 'Gadis Peneliti Lincah',
    desc: 'Suka mengamati selaput alveolus & bernapas segar',
    role: 'siswa',
    svg: `<svg viewBox="0 0 100 100" class="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="sd-bg" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stop-color="#FFE4E6"/>
          <stop offset="100%" stop-color="#FECDD3"/>
        </radialGradient>
      </defs>
      <circle cx="50" cy="50" r="48" fill="url(#sd-bg)"/>
      <!-- Hair Pigtails -->
      <circle cx="24" cy="38" r="12" fill="#475569"/>
      <circle cx="76" cy="38" r="12" fill="#475569"/>
      <!-- Pigtail Ribbons -->
      <circle cx="28" cy="42" r="5" fill="#F43F5E"/>
      <circle cx="72" cy="42" r="5" fill="#F43F5E"/>
      <!-- Yellow Shirt & Lab Jacket -->
      <path d="M18 95 C22 74 34 72 50 72 C66 72 78 74 82 95 Z" fill="#FBBF24"/>
      <path d="M42 72 L50 86 L58 72 Z" fill="#F43F5E"/>
      <!-- Face -->
      <ellipse cx="50" cy="52" rx="21" ry="22" fill="#FED7AA"/>
      <!-- Bangs Haircut -->
      <path d="M28 44 C28 26 40 22 50 22 C60 22 72 26 72 44 C66 36 60 34 50 34 C40 34 34 36 28 44 Z" fill="#334155"/>
      <!-- Cute Big Anime Sparkle Eyes -->
      <ellipse cx="41" cy="51" rx="4.5" ry="5.5" fill="#1E293B"/>
      <ellipse cx="59" cy="51" rx="4.5" ry="5.5" fill="#1E293B"/>
      <circle cx="43" cy="49" r="2" fill="#FFFFFF"/>
      <circle cx="61" cy="49" r="2" fill="#FFFFFF"/>
      <circle cx="40" cy="53" r="1" fill="#FFFFFF"/>
      <circle cx="58" cy="53" r="1" fill="#FFFFFF"/>
      <!-- Rosy Cheeks -->
      <ellipse cx="33" cy="59" rx="5" ry="3" fill="#FB7185" opacity="0.6"/>
      <ellipse cx="67" cy="59" rx="5" ry="3" fill="#FB7185" opacity="0.6"/>
      <!-- Cheerful Open Mouth Smile -->
      <path d="M43 62 Q50 71 57 62 Z" fill="#E11D48"/>
      <!-- Headband -->
      <path d="M30 33 Q50 24 70 33" fill="none" stroke="#FB7185" stroke-width="4.5" stroke-linecap="round"/>
    </svg>`
  },
  'siswa-banu': {
    id: 'siswa-banu',
    name: 'Banu',
    title: 'Peneliti Kacamata Jenius',
    desc: 'Ahli menghitung frekuensi napas & volume paru',
    role: 'siswa',
    svg: `<svg viewBox="0 0 100 100" class="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="sb-bg" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stop-color="#E0F2FE"/>
          <stop offset="100%" stop-color="#BAE6FD"/>
        </radialGradient>
      </defs>
      <circle cx="50" cy="50" r="48" fill="url(#sb-bg)"/>
      <!-- Blue Striped T-Shirt -->
      <path d="M18 95 C22 74 34 72 50 72 C66 72 78 74 82 95 Z" fill="#0284C7"/>
      <!-- Face -->
      <rect x="44" y="62" width="12" height="12" rx="3" fill="#FDBA74"/>
      <ellipse cx="50" cy="50" rx="21" ry="22" fill="#FED7AA"/>
      <!-- Neat Short Hair with Cowlick -->
      <path d="M26 44 C24 24 38 18 50 18 C64 18 76 24 74 44 C68 32 60 30 50 30 C40 30 32 32 26 44 Z" fill="#1E293B"/>
      <path d="M50 18 Q55 10 52 7" fill="none" stroke="#1E293B" stroke-width="3" stroke-linecap="round"/>
      <!-- Big Round Cute Glasses -->
      <circle cx="39" cy="50" r="8.5" fill="#FFFFFF" opacity="0.3"/>
      <circle cx="61" cy="50" r="8.5" fill="#FFFFFF" opacity="0.3"/>
      <circle cx="39" cy="50" r="8.5" fill="none" stroke="#0369A1" stroke-width="2.4"/>
      <circle cx="61" cy="50" r="8.5" fill="none" stroke="#0369A1" stroke-width="2.4"/>
      <line x1="47.5" y1="50" x2="52.5" y2="50" stroke="#0369A1" stroke-width="2.4"/>
      <!-- Eyes behind glasses -->
      <circle cx="39" cy="50" r="3.5" fill="#0F172A"/>
      <circle cx="61" cy="50" r="3.5" fill="#0F172A"/>
      <circle cx="40.5" cy="48.5" r="1.3" fill="#FFFFFF"/>
      <circle cx="62.5" cy="48.5" r="1.3" fill="#FFFFFF"/>
      <!-- Cheeks & Happy Smile -->
      <ellipse cx="30" cy="57" rx="4" ry="2.5" fill="#38BDF8" opacity="0.5"/>
      <ellipse cx="70" cy="57" rx="4" ry="2.5" fill="#38BDF8" opacity="0.5"/>
      <path d="M44 60 Q50 66 56 60" fill="none" stroke="#B91C1C" stroke-width="2.4" stroke-linecap="round"/>
      <!-- Bowtie -->
      <polygon points="46,74 42,70 42,78" fill="#F59E0B"/>
      <polygon points="54,74 58,70 58,78" fill="#F59E0B"/>
      <circle cx="50" cy="74" r="2.5" fill="#D97706"/>
    </svg>`
  },
  'siswa-ian': {
    id: 'siswa-ian',
    name: 'Ian',
    title: 'Kapten Olahraga Berenergi',
    desc: 'Membuktikan paru-paru bekerja cepat saat lari kencang',
    role: 'siswa',
    svg: `<svg viewBox="0 0 100 100" class="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="si-bg" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stop-color="#FFEDD5"/>
          <stop offset="100%" stop-color="#FED7AA"/>
        </radialGradient>
      </defs>
      <circle cx="50" cy="50" r="48" fill="url(#si-bg)"/>
      <!-- Red Sports Jersey -->
      <path d="M18 95 C22 74 34 72 50 72 C66 72 78 74 82 95 Z" fill="#EF4444"/>
      <polygon points="50,72 44,80 56,80" fill="#FEE2E2"/>
      <!-- Face -->
      <rect x="44" y="62" width="12" height="12" rx="3" fill="#FDBA74"/>
      <ellipse cx="50" cy="50" rx="21" ry="22" fill="#FED7AA"/>
      <!-- Spiky Brown Hair -->
      <path d="M26 44 C24 24 35 16 50 16 C65 16 76 24 74 44 C68 28 62 26 50 28 C38 26 32 28 26 44 Z" fill="#78350F"/>
      <!-- Sports Headband -->
      <path d="M25 38 Q50 30 75 38" fill="none" stroke="#F59E0B" stroke-width="5" stroke-linecap="round"/>
      <!-- Confident Eyes -->
      <circle cx="42" cy="50" r="3.8" fill="#1C1917"/>
      <circle cx="58" cy="50" r="3.8" fill="#1C1917"/>
      <circle cx="43.5" cy="48.5" r="1.4" fill="#FFFFFF"/>
      <circle cx="59.5" cy="48.5" r="1.4" fill="#FFFFFF"/>
      <!-- Cheeks & Grinning Big Smile with Teeth -->
      <ellipse cx="33" cy="57" rx="4.5" ry="2.5" fill="#FB923C" opacity="0.6"/>
      <ellipse cx="67" cy="57" rx="4.5" ry="2.5" fill="#FB923C" opacity="0.6"/>
      <path d="M42 59 Q50 70 58 59 Z" fill="#B91C1C"/>
      <path d="M44 60 Q50 63 56 60" fill="#FFFFFF"/>
    </svg>`
  },
  'siswa-aga': {
    id: 'siswa-aga',
    name: 'Aga',
    title: 'Petualang Anatomi 3D',
    desc: 'Penggemar visual 3D diafragma & rongga dada',
    role: 'siswa',
    svg: `<svg viewBox="0 0 100 100" class="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="sa-bg" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stop-color="#ECFDF5"/>
          <stop offset="100%" stop-color="#A7F3D0"/>
        </radialGradient>
      </defs>
      <circle cx="50" cy="50" r="48" fill="url(#sa-bg)"/>
      <!-- Green Explorer Shirt -->
      <path d="M18 95 C22 74 34 72 50 72 C66 72 78 74 82 95 Z" fill="#059669"/>
      <!-- Face -->
      <rect x="44" y="62" width="12" height="12" rx="3" fill="#FDBA74"/>
      <ellipse cx="50" cy="50" rx="21" ry="22" fill="#FED7AA"/>
      <!-- Explorer Cap Turned Backwards -->
      <ellipse cx="50" cy="30" rx="24" ry="12" fill="#047857"/>
      <path d="M26 30 C26 18 36 12 50 12 C64 12 74 18 74 30 Z" fill="#10B981"/>
      <circle cx="50" cy="12" r="3" fill="#047857"/>
      <!-- Curly bangs peaking -->
      <path d="M30 36 C34 32 40 34 44 32 C48 34 54 32 58 34 C64 32 68 36 70 38" fill="none" stroke="#451A03" stroke-width="3" stroke-linecap="round"/>
      <!-- Big Curious Eyes -->
      <circle cx="42" cy="50" r="4" fill="#022C22"/>
      <circle cx="58" cy="50" r="4" fill="#022C22"/>
      <circle cx="44" cy="48" r="1.5" fill="#FFFFFF"/>
      <circle cx="60" cy="48" r="1.5" fill="#FFFFFF"/>
      <!-- Freckles & Cheerful Smile -->
      <circle cx="34" cy="55" r="1" fill="#B45309"/>
      <circle cx="37" cy="57" r="1" fill="#B45309"/>
      <circle cx="63" cy="57" r="1" fill="#B45309"/>
      <circle cx="66" cy="55" r="1" fill="#B45309"/>
      <path d="M44 60 Q50 67 56 60" fill="none" stroke="#047857" stroke-width="2.4" stroke-linecap="round"/>
    </svg>`
  },
  'siswa-mia': {
    id: 'siswa-mia',
    name: 'Mia',
    title: 'Dokter Cilik Berhati Lembut',
    desc: 'Teliti menjaga kesehatan organ pernapasan',
    role: 'siswa',
    svg: `<svg viewBox="0 0 100 100" class="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="sm-bg" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stop-color="#F5F3FF"/>
          <stop offset="100%" stop-color="#DDD6FE"/>
        </radialGradient>
        <linearGradient id="sm-hijab" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#A855F7"/>
          <stop offset="100%" stop-color="#7E22CE"/>
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="48" fill="url(#sm-bg)"/>
      <!-- Pastel Purple Hijab -->
      <path d="M24 64 C22 36 32 22 50 22 C68 22 78 36 76 64 C74 76 68 86 50 88 C32 86 26 76 24 64 Z" fill="url(#sm-hijab)"/>
      <!-- Face -->
      <ellipse cx="50" cy="52" rx="18" ry="20" fill="#FED7AA"/>
      <!-- Gentle Anime Eyes -->
      <ellipse cx="43" cy="50" rx="3.5" ry="4.5" fill="#3B0764"/>
      <ellipse cx="57" cy="50" rx="3.5" ry="4.5" fill="#3B0764"/>
      <circle cx="44.5" cy="48.5" r="1.5" fill="#FFFFFF"/>
      <circle cx="58.5" cy="48.5" r="1.5" fill="#FFFFFF"/>
      <!-- Cheeks & Sweet Smile -->
      <ellipse cx="37" cy="57" rx="3.5" ry="2" fill="#F43F5E" opacity="0.6"/>
      <ellipse cx="63" cy="57" rx="3.5" ry="2" fill="#F43F5E" opacity="0.6"/>
      <path d="M44 60 Q50 66 56 60" fill="none" stroke="#BE123C" stroke-width="2" stroke-linecap="round"/>
      <!-- Toy Stethoscope around neck -->
      <path d="M30 78 Q50 94 70 78" fill="none" stroke="#38BDF8" stroke-width="2.5" stroke-linecap="round"/>
      <circle cx="50" cy="90" r="3.5" fill="#FBBF24"/>
      <!-- Daisy Flower Pin -->
      <circle cx="34" cy="32" r="3" fill="#FBBF24"/>
      <circle cx="34" cy="32" r="1.2" fill="#FFFFFF"/>
    </svg>`
  }
};

// Render Avatar SVG Helper
function getAvatarSvg(avatarKeyOrDataUrl, extraClasses = '') {
  if (!avatarKeyOrDataUrl) {
    return AVATAR_MAP['guru-1'].svg;
  }
  // If it's a data URL or external image URL
  if (avatarKeyOrDataUrl.startsWith('data:') || avatarKeyOrDataUrl.startsWith('http')) {
    return `<img src="${avatarKeyOrDataUrl}" class="w-full h-full object-cover rounded-full ${extraClasses}" alt="Avatar"/>`;
  }
  // If it's in our vector map
  if (AVATAR_MAP[avatarKeyOrDataUrl]) {
    return AVATAR_MAP[avatarKeyOrDataUrl].svg;
  }
  // Fallback
  return AVATAR_MAP['guru-1'].svg;
}

// Lungs Logo / Mascot Vector
const LUNGS_MASCOT_SVG = `
<svg viewBox="0 0 100 100" class="w-full h-full drop-shadow-md" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="lung-grad-left" cx="40%" cy="40%" r="60%">
      <stop offset="0%" stop-color="#38BDF8"/>
      <stop offset="100%" stop-color="#0284C7"/>
    </radialGradient>
    <radialGradient id="lung-grad-right" cx="40%" cy="40%" r="60%">
      <stop offset="0%" stop-color="#34D399"/>
      <stop offset="100%" stop-color="#059669"/>
    </radialGradient>
    <linearGradient id="trachea-grad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#FDE047"/>
      <stop offset="100%" stop-color="#F59E0B"/>
    </linearGradient>
  </defs>
  <!-- Windpipe / Trakea -->
  <rect x="46" y="8" width="8" height="26" rx="4" fill="url(#trachea-grad)"/>
  <!-- Cartilage rings -->
  <line x1="46" y1="14" x2="54" y2="14" stroke="#D97706" stroke-width="1.5"/>
  <line x1="46" y1="19" x2="54" y2="19" stroke="#D97706" stroke-width="1.5"/>
  <line x1="46" y1="24" x2="54" y2="24" stroke="#D97706" stroke-width="1.5"/>
  <line x1="46" y1="29" x2="54" y2="29" stroke="#D97706" stroke-width="1.5"/>
  <!-- Left Lung (User Perspective Left, Anatomical Right) -->
  <path d="M46 32 C36 32 20 40 18 58 C16 76 26 88 42 88 C47 88 48 78 48 64 C48 50 48 34 46 32 Z" fill="url(#lung-grad-left)"/>
  <!-- Right Lung (User Perspective Right, Anatomical Left with cardiac notch) -->
  <path d="M54 32 C64 32 80 40 82 58 C84 76 74 88 58 88 C53 88 52 78 52 64 C52 50 52 34 54 32 Z" fill="url(#lung-grad-right)"/>
  <!-- Cute Faces on Lungs -->
  <!-- Left Eye & Right Eye -->
  <circle cx="32" cy="56" r="3" fill="#0F172A"/>
  <circle cx="33" cy="55" r="1" fill="#FFFFFF"/>
  <circle cx="68" cy="56" r="3" fill="#0F172A"/>
  <circle cx="69" cy="55" r="1" fill="#FFFFFF"/>
  <!-- Blush Cheeks -->
  <circle cx="26" cy="62" r="3" fill="#FB7185" opacity="0.6"/>
  <circle cx="74" cy="62" r="3" fill="#FB7185" opacity="0.6"/>
  <!-- Happy Smiles -->
  <path d="M30 63 Q33 67 36 63" fill="none" stroke="#FFFFFF" stroke-width="1.8" stroke-linecap="round"/>
  <path d="M64 63 Q67 67 70 63" fill="none" stroke="#FFFFFF" stroke-width="1.8" stroke-linecap="round"/>
  <!-- Sparkles -->
  <polygon points="50,2 52,6 56,6 53,8 54,12 50,10 46,12 47,8 44,6 48,6" fill="#FBBF24"/>
  <polygon points="12,30 13,33 16,33 14,35 15,38 12,36 9,38 10,35 8,33 11,33" fill="#38BDF8"/>
  <polygon points="88,30 89,33 92,33 90,35 91,38 88,36 85,38 86,35 84,33 87,33" fill="#34D399"/>
</svg>`;
