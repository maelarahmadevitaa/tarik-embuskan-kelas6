/**
 * Laboratorium Simulasi 3D Interaktif & Dinamika Pernapasan
 * Aplikasi: "Tarik dan Embuskan: Sistem Pernapasan Manusia"
 * IPA Kelas 6 SD - Kurikulum Merdeka
 * 
 * 3 Mode Utama:
 * 1. Eksplorasi & Bedah Organ (Multi-Layer Medical SVG Anatomy, 3 Multi-Angle Views 0°/90°/180°, Deep Zoom Modal, 8 Billboard Pins)
 * 2. Simulasi Mekanisme Inspirasi & Ekspirasi (Dada Mengembang/Mengempis, Diafragma Mendatar/Melengkung, Panah Aliran)
 * 3. Simulasi Mikro Pertukaran Gas Alveoli (Difusi O₂ & CO₂, Sel Darah Merah & Seret Partikel)
 */

const Simulasi3D = {
  // Mode aktif: 'organ3d', 'pernapasan', 'alveoli'
  currentMode: 'organ3d',

  // Mode 1 State (Eksplorasi Medis & Bedah Organ)
  organState: {
    angle: 0, // 0 to 360
    zoomLevel: 1.0, // 0.75 to 2.0
    isRotating: false,
    rotateTimer: null,
    xrayActive: false,
    videoXRay: false,
    selectedOrgan: 'paru',
    layerSplitParu: false // membelah lapisan luar paru untuk melihat bronkiolus
  },

  // Mode 2 State (Inspirasi & Ekspirasi)
  breathState: {
    mode: 'tarik', // 'tarik' | 'embus'
    isAutoBreathing: false,
    autoTimer: null,
    activitySpeed: 15, // 15 bpm (santai) to 50 bpm (olahraga)
    lungCapacity: 85 // percentage
  },

  // =========================================================================
  // ANIMASI PARTIKEL DINAMIS: ALIRAN O2 (BIRU) & CO2 (MERAH) STANDAR SINTA 2
  // =========================================================================
  particleEngine: {
    canvas: null,
    ctx: null,
    animId: null,
    mode: 'tarik', // 'tarik' (O2 biru masuk) | 'embus' (CO2 merah keluar)
    speedMultiplier: 1.0,
    particles: [],
    maxParticles: 45,
    isRunning: false,
    width: 0,
    height: 0,

    init() {
      this.canvas = document.getElementById('breathParticleCanvas');
      if (!this.canvas) return;
      this.ctx = this.canvas.getContext('2d');
      this.resize();
      window.addEventListener('resize', () => this.resize());
    },

    resize() {
      if (!this.canvas) {
        this.canvas = document.getElementById('breathParticleCanvas');
        if (this.canvas) this.ctx = this.canvas.getContext('2d');
      }
      if (!this.canvas || !this.ctx) return;
      const rect = this.canvas.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      const dpr = window.devicePixelRatio || 1;
      this.canvas.width = Math.round(rect.width * dpr);
      this.canvas.height = Math.round(rect.height * dpr);
      this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      this.width = rect.width;
      this.height = rect.height;
    },

    setMode(newMode) {
      this.mode = newMode;
      // Kurangi alpha partikel lama agar pergantian mode terlihat cepat & responsif
      this.particles.forEach(p => { p.alpha = Math.min(p.alpha, 0.35); });
    },

    setSpeed(speedBpm) {
      // 15 bpm -> 1.0x, 50 bpm -> ~3.33x
      this.speedMultiplier = Math.max(0.6, speedBpm / 15);
    },

    start() {
      if (this.isRunning) return;
      this.isRunning = true;
      this.resize();
      const loop = () => {
        if (!this.isRunning) return;
        this.updateAndDraw();
        this.animId = requestAnimationFrame(loop);
      };
      this.animId = requestAnimationFrame(loop);
    },

    stop() {
      this.isRunning = false;
      if (this.animId) {
        cancelAnimationFrame(this.animId);
        this.animId = null;
      }
      if (this.ctx && this.width && this.height) {
        this.ctx.clearRect(0, 0, this.width, this.height);
      }
      this.particles = [];
    },

    spawnParticle() {
      const w = this.width || 300;
      const h = this.height || 350;
      const cx = w * 0.5;
      const carinaY = h * 0.38;

      if (this.mode === 'tarik') {
        // INSPIRASI: Partikel O2 Biru dari Trakea Atas menuju ke kedua lobus paru
        const side = Math.random() < 0.5 ? -1 : 1; // -1: kiri, 1: kanan
        const targetX = side === -1 
          ? w * (0.22 + Math.random() * 0.22)
          : w * (0.56 + Math.random() * 0.22);
        const targetY = h * (0.42 + Math.random() * 0.32);

        return {
          type: 'o2',
          x: cx + (Math.random() - 0.5) * (w * 0.05),
          y: h * 0.12 + Math.random() * (h * 0.04),
          prevX: cx,
          prevY: h * 0.12,
          stage: 1, // 1: trakea menuju carina, 2: carina ke lobus paru
          side: side,
          targetX: targetX,
          targetY: targetY,
          carinaX: cx + side * (w * 0.02),
          carinaY: carinaY,
          speed: (1.8 + Math.random() * 1.2),
          radius: 2.2 + Math.random() * 2.2,
          alpha: 0.1,
          maxAlpha: 0.75 + Math.random() * 0.25,
          color: Math.random() < 0.35 ? '#38bdf8' : (Math.random() < 0.7 ? '#0284c7' : '#00e5ff'),
          glowColor: '#38bdf8'
        };
      } else {
        // EKSPIRASI: Partikel CO2 Merah/Oranye dari dalam jaringan paru menuju atas keluar trakea
        const side = Math.random() < 0.5 ? -1 : 1;
        const startX = side === -1
          ? w * (0.22 + Math.random() * 0.22)
          : w * (0.56 + Math.random() * 0.22);
        const startY = h * (0.44 + Math.random() * 0.30);

        return {
          type: 'co2',
          x: startX,
          y: startY,
          prevX: startX,
          prevY: startY,
          stage: 1, // 1: dari lobus menuju carina, 2: dari carina naik ke trakea keluar
          side: side,
          carinaX: cx + (Math.random() - 0.5) * (w * 0.04),
          carinaY: carinaY,
          targetX: cx + (Math.random() - 0.5) * (w * 0.06),
          targetY: h * 0.08,
          speed: (1.8 + Math.random() * 1.2),
          radius: 2.2 + Math.random() * 2.2,
          alpha: 0.1,
          maxAlpha: 0.8 + Math.random() * 0.2,
          color: Math.random() < 0.35 ? '#ef4444' : (Math.random() < 0.7 ? '#f97316' : '#fb7185'),
          glowColor: '#f87171'
        };
      }
    },

    updateAndDraw() {
      if (!this.ctx || !this.width || !this.height) {
        this.resize();
        if (!this.width) return;
      }

      const ctx = this.ctx;
      const w = this.width;
      const h = this.height;
      const sm = this.speedMultiplier;

      ctx.clearRect(0, 0, w, h);

      // Spawn partikel baru secara kontinyu sesuai tempo
      const spawnChance = 0.30 * sm;
      if (this.particles.length < this.maxParticles && Math.random() < spawnChance) {
        this.particles.push(this.spawnParticle());
        if (Math.random() < 0.45 * sm && this.particles.length < this.maxParticles) {
          this.particles.push(this.spawnParticle());
        }
      }

      for (let i = this.particles.length - 1; i >= 0; i--) {
        const p = this.particles[i];
        p.prevX = p.x;
        p.prevY = p.y;

        const effectiveSpeed = p.speed * sm;

        if (p.type === 'o2') {
          // Tarik Napas (O2 Biru masuk)
          if (p.alpha < p.maxAlpha && p.stage === 1) {
            p.alpha = Math.min(p.maxAlpha, p.alpha + 0.06 * sm);
          }

          if (p.stage === 1) {
            // Bergerak ke carina
            const dx = p.carinaX - p.x;
            const dy = p.carinaY - p.y;
            const dist = Math.hypot(dx, dy);
            if (dist < effectiveSpeed * 1.5) {
              p.x = p.carinaX;
              p.y = p.carinaY;
              p.stage = 2;
            } else {
              p.x += (dx / dist) * effectiveSpeed;
              p.y += (dy / dist) * effectiveSpeed;
            }
          } else {
            // Bergerak ke target lobus paru
            const dx = p.targetX - p.x;
            const dy = p.targetY - p.y;
            const dist = Math.hypot(dx, dy);
            if (dist < effectiveSpeed * 2) {
              p.alpha -= 0.035 * sm;
            } else {
              p.x += (dx / dist) * effectiveSpeed;
              p.y += (dy / dist) * effectiveSpeed;
            }
          }
        } else {
          // Embuskan Napas (CO2 Merah keluar)
          if (p.alpha < p.maxAlpha && p.stage === 1) {
            p.alpha = Math.min(p.maxAlpha, p.alpha + 0.06 * sm);
          }

          if (p.stage === 1) {
            // Dari lobus menuju carina
            const dx = p.carinaX - p.x;
            const dy = p.carinaY - p.y;
            const dist = Math.hypot(dx, dy);
            if (dist < effectiveSpeed * 1.5) {
              p.x = p.carinaX;
              p.y = p.carinaY;
              p.stage = 2;
            } else {
              p.x += (dx / dist) * effectiveSpeed;
              p.y += (dy / dist) * effectiveSpeed;
            }
          } else {
            // Dari carina naik ke trakea keluar
            const dx = p.targetX - p.x;
            const dy = p.targetY - p.y;
            const dist = Math.hypot(dx, dy);
            if (p.y <= p.targetY || dist < effectiveSpeed * 2) {
              p.alpha -= 0.045 * sm;
            } else {
              p.x += (dx / dist) * effectiveSpeed;
              p.y += (dy / dist) * effectiveSpeed;
            }
          }
        }

        // Hapus partikel jika sudah habis masa aktifnya
        if (p.alpha <= 0 || p.y < 0 || p.y > h) {
          this.particles.splice(i, 1);
          continue;
        }

        // Gambar jejak halus (tracer trail)
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(p.prevX, p.prevY);
        ctx.lineTo(p.x, p.y);
        ctx.strokeStyle = p.color;
        ctx.lineWidth = p.radius * 0.7;
        ctx.globalAlpha = p.alpha * 0.45;
        ctx.lineCap = 'round';
        ctx.stroke();

        // Gambar titik bercahaya
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 8;
        ctx.shadowColor = p.glowColor;
        ctx.globalAlpha = p.alpha;
        ctx.fill();
        ctx.restore();
      }
    }
  },

  // =========================================================================
  // TAB 3: ENGINE DIFUSI GAS LENSA MIKROSKOP 3D (O2 BIRU & CO2 UNGU 3D GLOSSY)
  // =========================================================================
  alveoliDiffusionEngine: {
    canvas: null,
    ctx: null,
    animId: null,
    isRunning: false,
    isContinuous: false, // true saat tombol "Mulai Simulasi Difusi Gas" ditekan
    currentStep: 1,      // 1: O2 Masuk, 2: Difusi O2, 3: Difusi CO2, 4: CO2 Keluar
    width: 0,
    height: 0,
    particlesO2: [],
    particlesCO2: [],
    maxContinuousO2: 14,
    maxContinuousCO2: 14,

    init() {
      this.canvas = document.getElementById('alveoliDiffusionCanvas');
      if (!this.canvas) return;
      this.ctx = this.canvas.getContext('2d');
      this.resize();
      window.addEventListener('resize', () => this.resize());
    },

    resize() {
      if (!this.canvas) {
        this.canvas = document.getElementById('alveoliDiffusionCanvas');
        if (this.canvas) this.ctx = this.canvas.getContext('2d');
      }
      if (!this.canvas || !this.ctx) return;
      const rect = this.canvas.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      const dpr = window.devicePixelRatio || 1;
      this.canvas.width = Math.round(rect.width * dpr);
      this.canvas.height = Math.round(rect.height * dpr);
      this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      this.width = rect.width;
      this.height = rect.height;
    },

    start() {
      if (this.isRunning) return;
      this.isRunning = true;
      this.resize();
      this.initParticles();
      const loop = () => {
        if (!this.isRunning) return;
        this.updateAndDraw();
        this.animId = requestAnimationFrame(loop);
      };
      this.animId = requestAnimationFrame(loop);
    },

    stop() {
      this.isRunning = false;
      if (this.animId) {
        cancelAnimationFrame(this.animId);
        this.animId = null;
      }
      if (this.ctx && this.width && this.height) {
        this.ctx.clearRect(0, 0, this.width, this.height);
      }
      this.particlesO2 = [];
      this.particlesCO2 = [];
    },

    setContinuous(active) {
      this.isContinuous = active;
      const badgeText = document.getElementById('alveoliSimStatusText');
      const badgePing = document.getElementById('alveoliSimStatusPing');
      const statusBadge = document.getElementById('alveoliSimStatusBadge');
      if (active) {
        if (badgeText) badgeText.textContent = 'Simulasi Aktif • Difusi Silang Real-Time';
        if (badgePing) badgePing.className = 'w-2 h-2 rounded-full bg-cyan-400 animate-ping';
        if (statusBadge) {
          statusBadge.classList.remove('border-sky-400/30', 'text-sky-300');
          statusBadge.classList.add('border-cyan-400', 'text-cyan-200', 'bg-cyan-950/80');
        }
      } else {
        if (badgeText) badgeText.textContent = 'Lensa Siap • Klik Tombol untuk Mulai';
        if (badgePing) badgePing.className = 'w-2 h-2 rounded-full bg-emerald-400 animate-ping';
        if (statusBadge) {
          statusBadge.classList.add('border-sky-400/30', 'text-sky-300');
          statusBadge.classList.remove('border-cyan-400', 'text-cyan-200', 'bg-cyan-950/80');
        }
      }
      this.initParticles();
    },

    setStep(step) {
      this.currentStep = step;
      this.initParticles();
    },

    // Inisialisasi partikel untuk mode aktif
    initParticles() {
      const w = this.width || 420;
      const h = this.height || 420;
      this.particlesO2 = [];
      this.particlesCO2 = [];

      if (this.isContinuous) {
        // Mode Simulasi Penuh: Difusi silang simultan O2 (Biru) dan CO2 (Ungu)
        for (let i = 0; i < this.maxContinuousO2; i++) {
          this.particlesO2.push(this.createO2ContinuousParticle(w, h, i / this.maxContinuousO2));
        }
        for (let i = 0; i < this.maxContinuousCO2; i++) {
          this.particlesCO2.push(this.createCO2ContinuousParticle(w, h, i / this.maxContinuousCO2));
        }
      } else {
        // Mode Langkah demi Langkah
        if (this.currentStep === 1) {
          for (let i = 0; i < 9; i++) {
            this.particlesO2.push(this.createStep1O2Particle(w, h, i / 9));
          }
        } else if (this.currentStep === 2) {
          for (let i = 0; i < 12; i++) {
            this.particlesO2.push(this.createO2ContinuousParticle(w, h, i / 12));
          }
        } else if (this.currentStep === 3) {
          for (let i = 0; i < 12; i++) {
            this.particlesCO2.push(this.createCO2ContinuousParticle(w, h, i / 12));
          }
        } else if (this.currentStep === 4) {
          for (let i = 0; i < 9; i++) {
            this.particlesCO2.push(this.createStep4CO2Particle(w, h, i / 9));
          }
        }
      }
    },

    // Partikel O2: Rongga Gua Tengah -> Menembus Dinding Membran -> Kapiler Darah Bawah
    createO2ContinuousParticle(w, h, initialProgress = 0) {
      const cx = w * 0.50;
      const cy = h * 0.44;
      const startAngle = Math.random() * Math.PI * 2;
      const startR = Math.random() * (w * 0.18);
      const startX = cx + Math.cos(startAngle) * startR;
      const startY = cy + Math.sin(startAngle) * startR;

      const endX = w * (0.22 + Math.random() * 0.56);
      const endY = h * (0.76 + Math.random() * 0.12);

      const controlX = startX + (endX - startX) * 0.5 + (Math.random() - 0.5) * 40;
      const controlY = startY + (endY - startY) * 0.4 + 15;

      return {
        type: 'O2',
        progress: initialProgress,
        speed: 0.0035 + Math.random() * 0.0025,
        startX, startY,
        controlX, controlY,
        endX, endY,
        radius: 13 + Math.random() * 4,
        phase: Math.random() * Math.PI * 2,
        swayAmp: 4 + Math.random() * 4,
        alpha: 0
      };
    },

    // Partikel CO2: Kapiler Darah Bawah -> Menembus Dinding Membran -> Rongga Gua Tengah
    createCO2ContinuousParticle(w, h, initialProgress = 0) {
      const cx = w * 0.50;
      const cy = h * 0.45;

      const startX = w * (0.18 + Math.random() * 0.64);
      const startY = h * (0.78 + Math.random() * 0.12);

      const endAngle = Math.random() * Math.PI * 2;
      const endR = Math.random() * (w * 0.16);
      const endX = cx + Math.cos(endAngle) * endR;
      const endY = cy + Math.sin(endAngle) * endR;

      const controlX = startX + (endX - startX) * 0.5 + (Math.random() - 0.5) * 35;
      const controlY = startY + (endY - startY) * 0.6 - 15;

      return {
        type: 'CO2',
        progress: initialProgress,
        speed: 0.0035 + Math.random() * 0.0025,
        startX, startY,
        controlX, controlY,
        endX, endY,
        radius: 13 + Math.random() * 4,
        phase: Math.random() * Math.PI * 2,
        swayAmp: 4 + Math.random() * 4,
        alpha: 0
      };
    },

    // Step 1: O2 mengalir masuk dari atas ke rongga gua
    createStep1O2Particle(w, h, initialProgress = 0) {
      const startX = w * (0.46 + Math.random() * 0.08);
      const startY = h * 0.05;
      const endX = w * (0.35 + Math.random() * 0.30);
      const endY = h * (0.38 + Math.random() * 0.20);
      return {
        type: 'O2',
        progress: initialProgress,
        speed: 0.005 + Math.random() * 0.003,
        startX, startY,
        controlX: (startX + endX) * 0.5,
        controlY: startY + (endY - startY) * 0.5,
        endX, endY,
        radius: 14 + Math.random() * 3,
        phase: Math.random() * Math.PI * 2,
        swayAmp: 3,
        alpha: 0
      };
    },

    // Step 4: CO2 mengalir naik keluar ke saluran napas atas
    createStep4CO2Particle(w, h, initialProgress = 0) {
      const startX = w * (0.35 + Math.random() * 0.30);
      const startY = h * (0.40 + Math.random() * 0.20);
      const endX = w * (0.46 + Math.random() * 0.08);
      const endY = h * 0.04;
      return {
        type: 'CO2',
        progress: initialProgress,
        speed: 0.005 + Math.random() * 0.003,
        startX, startY,
        controlX: (startX + endX) * 0.5,
        controlY: startY + (endY - startY) * 0.5,
        endX, endY,
        radius: 14 + Math.random() * 3,
        phase: Math.random() * Math.PI * 2,
        swayAmp: 3,
        alpha: 0
      };
    },

    // Perbarui & Gambar per frame
    updateAndDraw() {
      const ctx = this.ctx;
      const w = this.width;
      const h = this.height;
      if (!ctx || w === 0 || h === 0) return;

      ctx.clearRect(0, 0, w, h);

      // 1. Gambar & Perbarui Partikel O2
      for (let i = 0; i < this.particlesO2.length; i++) {
        const p = this.particlesO2[i];
        p.progress += p.speed;

        if (p.progress >= 1) {
          p.progress = 0;
          if (this.isContinuous || this.currentStep === 2) {
            Object.assign(p, this.createO2ContinuousParticle(w, h, 0));
          } else if (this.currentStep === 1) {
            Object.assign(p, this.createStep1O2Particle(w, h, 0));
          }
        }

        const t = p.progress;
        const mt = 1 - t;
        const bx = mt * mt * p.startX + 2 * mt * t * p.controlX + t * t * p.endX;
        const by = mt * mt * p.startY + 2 * mt * t * p.controlY + t * t * p.endY;

        const currentX = bx + Math.sin(t * Math.PI * 4 + p.phase) * p.swayAmp;
        const currentY = by + Math.cos(t * Math.PI * 3 + p.phase) * (p.swayAmp * 0.5);

        if (t < 0.15) {
          p.alpha = t / 0.15;
        } else if (t > 0.85) {
          p.alpha = (1 - t) / 0.15;
        } else {
          p.alpha = 1.0;
        }

        this.drawSphere3D(currentX, currentY, p.radius, 'O2', p.alpha);
      }

      // 2. Gambar & Perbarui Partikel CO2
      for (let i = 0; i < this.particlesCO2.length; i++) {
        const p = this.particlesCO2[i];
        p.progress += p.speed;

        if (p.progress >= 1) {
          p.progress = 0;
          if (this.isContinuous || this.currentStep === 3) {
            Object.assign(p, this.createCO2ContinuousParticle(w, h, 0));
          } else if (this.currentStep === 4) {
            Object.assign(p, this.createStep4CO2Particle(w, h, 0));
          }
        }

        const t = p.progress;
        const mt = 1 - t;
        const bx = mt * mt * p.startX + 2 * mt * t * p.controlX + t * t * p.endX;
        const by = mt * mt * p.startY + 2 * mt * t * p.controlY + t * t * p.endY;

        const currentX = bx + Math.sin(t * Math.PI * 4 + p.phase) * p.swayAmp;
        const currentY = by + Math.cos(t * Math.PI * 3 + p.phase) * (p.swayAmp * 0.5);

        if (t < 0.15) {
          p.alpha = t / 0.15;
        } else if (t > 0.85) {
          p.alpha = (1 - t) / 0.15;
        } else {
          p.alpha = 1.0;
        }

        this.drawSphere3D(currentX, currentY, p.radius, 'CO2', p.alpha);
      }
    },

    // RENDER PARTIKEL DINAMIS BOLA 3D GLOSSY BERCAHAYA
    drawSphere3D(x, y, radius, type, alpha = 1.0) {
      const ctx = this.ctx;
      ctx.save();
      ctx.globalAlpha = Math.max(0, Math.min(1, alpha));

      // 1. Pendaran Cahaya Neon Luar (Glow Aura)
      const glowColor = (type === 'O2') ? 'rgba(6, 182, 212, 0.85)' : 'rgba(217, 70, 239, 0.85)';
      ctx.shadowColor = glowColor;
      ctx.shadowBlur = radius * 1.4;

      // 2. Volume Bola 3D: Gradien Radial dengan Sumber Cahaya Eksentrik (Kiri-Atas)
      const lightX = x - radius * 0.35;
      const lightY = y - radius * 0.35;
      const grad = ctx.createRadialGradient(
        lightX, lightY, radius * 0.06,
        x, y, radius
      );

      if (type === 'O2') {
        // Bola 3D Oksigen: Biru Neon Glossy
        grad.addColorStop(0.0, '#ffffff');      // Titik kilap specular
        grad.addColorStop(0.18, '#a5f3fc');     // Pendaran cyan muda
        grad.addColorStop(0.48, '#00d2ff');     // Biru cyan neon pekat
        grad.addColorStop(0.78, '#0284c7');     // Biru samudra dalam
        grad.addColorStop(1.0, '#042247');      // Tepi bola bulat bayangan
      } else {
        // Bola 3D Karbon Dioksida: Ungu / Magenta Gelap Glossy
        grad.addColorStop(0.0, '#ffffff');      // Titik kilap specular
        grad.addColorStop(0.18, '#f5d0fe');     // Pendaran magenta muda
        grad.addColorStop(0.48, '#c026d3');     // Ungu elektrik cerah
        grad.addColorStop(0.78, '#7e22ce');     // Ungu pekat berbobot
        grad.addColorStop(1.0, '#2e0854');      // Tepi lekukan bola bayangan
      }

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();

      // 3. Pantulan Kaca Mengkilap (Specular Sheen Glint Arc)
      ctx.shadowBlur = 0;
      const specGrad = ctx.createRadialGradient(
        lightX, lightY, 1,
        lightX, lightY, radius * 0.45
      );
      specGrad.addColorStop(0, 'rgba(255, 255, 255, 0.92)');
      specGrad.addColorStop(0.5, 'rgba(255, 255, 255, 0.35)');
      specGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = specGrad;
      ctx.beginPath();
      ctx.arc(lightX, lightY, radius * 0.45, 0, Math.PI * 2);
      ctx.fill();

      // 4. Label Rumus Kimia Molekul (O₂ & CO₂) Jelas & Terbaca
      ctx.fillStyle = '#ffffff';
      const fontSize = Math.max(9, Math.round(radius * 0.72));
      ctx.font = `800 ${fontSize}px "Outfit", sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.shadowColor = 'rgba(0, 0, 0, 0.85)';
      ctx.shadowBlur = 4;
      ctx.shadowOffsetX = 1;
      ctx.shadowOffsetY = 1;
      ctx.fillText(type === 'O2' ? 'O₂' : 'CO₂', x, y + 0.5);

      ctx.restore();
    }
  },

  // Mode 3 State (Mikro Alveoli)
  alveoliState: {
    currentStep: 1, // 1 to 4
    isPlaying: false,
    playTimer: null
  },

  // Master-Detail Organ View State
  masterOrganState: {
    currentOrgan: 'overview',
    zoom: 1.0
  },

  // Database 8 Titik Organ Interaktif + Overview (Master-Detail Ensiklopedia Medis)
  organHotspots: {
    overview: {
      id: 'overview',
      name: 'Tampilan Utuh Sistem Pernapasan',
      tag: 'Ikhtisar Anatomi Lengkap',
      icon: '🌟',
      detailTitle: 'Sistem Pernapasan Manusia (Ikhtisar Lengkap)',
      fungsi: [
        'Menghirup gas oksigen (O₂) segar dari udara atmosfer untuk bahan bakar energi sel.',
        'Mengeluarkan gas sisa karbon dioksida (CO₂) dan uap air hasil metabolisme.',
        'Menjaga keseimbangan asam-basa (pH) darah dan homeostasis seluruh tubuh.'
      ],
      letak: 'Membentang dari kepala (rongga hidung & mulut), leher (faring & laring), rongga dada (trakea, bronkus, bronkiolus, alveoli, paru-paru), hingga perbatasan rongga perut (diafragma).',
      struktur: 'Terdiri dari Zona Konduksi (saluran pipa penghantar & penyaring udara) dan Zona Respirasi (alveoli paru-paru tempat difusi pertukaran gas).',
      funFact: 'Saat istirahat santai, manusia bernapas sekitar 12 - 20 kali setiap menit, menghirup dan menghembuskan lebih dari 10.000 liter udara segar setiap hari!',
      desc: 'Sistem pernapasan adalah jejaring organ vital yang bekerja tanpa henti menyuplai oksigen segar bagi kelangsungan hidup triliunan sel di tubuh manusia.'
    },
    hidung: {
      id: 'hidung',
      name: '1. Rongga Hidung (Cavum Nasi)',
      tag: 'Pintu Gerbang & Penyaring Pertama',
      icon: '👃',
      detailTitle: 'Rongga Hidung (Pintu Gerbang Udara Bersih)',
      fungsi: [
        'Menyaring debu, pasir, dan partikel kasar menggunakan bulu-bulu hidung (silia).',
        'Menjebak kuman, bakteri, dan polutan mikro dengan cairan selaput lendir (mukus).',
        'Menghangatkan dan melembapkan udara dingin hingga bersuhu tubuh (37°C) lewat anyaman kapiler darah hangat.'
      ],
      letak: 'Berada di bagian tengah wajah, tepat di atas rongga mulut dan di depan tulang tengkorak wajah.',
      struktur: 'Dilengkapi sepasang lubang luar (nares externa), sekat hidung (septum), anyaman silia getar, serta 3 lipatan berlekuk kaya pembuluh darah (konka nasalis).',
      funFact: 'Rongga hidungmu dapat membedakan hingga 1 triliun aroma berbeda dan memproses 10.000+ liter udara segar setiap harinya!',
      desc: 'Pintu gerbang utama tempat udara masuk. Di dalamnya terdapat silia dan lendir sebagai penyaring kotoran serta kapiler darah sebagai pengatur suhu udara agar nyaman saat masuk ke paru-paru.'
    },
    faring: {
      id: 'faring',
      name: '2. Faring (Tekak)',
      tag: 'Persimpangan Udara & Makanan',
      icon: '👅',
      detailTitle: 'Faring (Persimpangan Udara & Makanan)',
      fungsi: [
        'Menyalurkan udara segar dari rongga hidung menuju laring (saluran pernapasan).',
        'Menyalurkan makanan dari rongga mulut menuju esofagus (saluran pencernaan).',
        'Mengatur jalan masuknya udara dan makanan dengan bantuan katup epiglotis agar kita tidak tersedak.'
      ],
      letak: 'Berada di area leher bagian atas (hulu kerongkongan), tepat di belakang rongga hidung dan mulut.',
      struktur: 'Tabung berotot berbentuk corong sepanjang ±12-14 cm yang terbagi menjadi 3 segmen: Nasofaring (atas), Orofaring (tengah), dan Laringofaring (bawah).',
      funFact: 'Faring bekerja seperti sakelar lalu lintas otomatis super cepat yang memastikan makanan tidak salah belok masuk ke pipa napas!',
      desc: 'Tabung berotot di hulu kerongkongan yang menjadi persimpangan vital pengatur aliran udara pernapasan dan makanan.'
    },
    laring: {
      id: 'laring',
      name: '3. Laring (Pangkal Tenggorokan)',
      tag: 'Kotak Suara & Katup Epiglotis',
      icon: '🗣️',
      detailTitle: 'Laring (Kotak Suara & Pelindung Paru)',
      fungsi: [
        'Mencegah makanan dan minuman masuk ke saluran napas dengan bantuan katup otomatis (epiglotis) agar kita tidak tersedak.',
        'Menghasilkan suara manusia (fonasi) berkat adanya pita suara yang bergetar saat tertiup hembusan udara.',
        'Menjadi lorong penghubung udara yang aman dari faring menuju trakea.'
      ],
      letak: 'Berada di bagian tengah leher depan, tepat di bawah faring (pada laki-laki dewasa, bagian ini sedikit menonjol dan disebut jakun).',
      struktur: 'Tersusun atas 9 tulang rawan kokoh (terbesar adalah Kartilago Tiroid berbentuk tameng berwarna merah bata), katup epiglotis lentur, dan sepasang pita suara elastis.',
      funFact: 'Saat bernyanyi atau berbicara kencang, pita suaramu dapat membuka-tutup dan bergetar hingga ratusan kali dalam satu detik!',
      desc: 'Laring (Kotak Suara & Pelindung Paru) mencegah makanan dan minuman masuk ke saluran napas dengan epiglotis serta menghasilkan suara manusia.'
    },
    trakea: {
      id: 'trakea',
      name: '4. Trakea (Batang Tenggorokan)',
      tag: 'Pipa Saluran Udara',
      icon: '🫧',
      detailTitle: 'Trakea (Pipa Saluran Udara)',
      fungsi: [
        'Menyalurkan udara secara langsung dari laring menuju ke paru-paru.',
        "Ditopang oleh cincin tulang rawan berbentuk 'C' yang kokoh agar saluran pernapasan selalu terbuka tegak (tidak kempis).",
        'Memiliki silia (rambut-rambut getar yang sangat halus) dan lendir untuk menyaring kembali debu dan kotoran yang lolos dari hidung agar tidak masuk ke paru-paru.'
      ],
      letak: 'Memanjang lurus dari leher bagian bawah hingga masuk ke dalam rongga dada bagian atas.',
      struktur: "Tersusun atas 16-20 cincin tulang rawan berbentuk huruf 'C' yang fleksibel dan kokoh, dengan lapisan selaput lendir serta rambut getar halus (silia) di bagian dalamnya.",
      funFact: "Bentuk cincin huruf 'C' terbuka di sisi belakang memberi ruang bagi esofagus (kerongkongan) di belakangnya untuk mengembang saat menelan makanan!",
      desc: 'Pipa saluran udara memanjang dari leher ke rongga dada yang ditopang cincin tulang rawan kokoh anti-kempis dan dilengkapi silia penyaring debu.'
    },
    bronkus: {
      id: 'bronkus',
      name: '5. Bronkus',
      tag: 'Cabang Batang Tenggorokan',
      icon: '🌿',
      detailTitle: 'Bronkus (Cabang Tenggorokan)',
      fungsi: [
        'Menjadi jalan masuk (gerbang) utama udara dari trakea menuju paru-paru kanan dan paru-paru kiri.',
        'Memastikan udara mengalir dengan lancar ke kedua belah bagian paru-paru.',
        'Dilengkapi dengan silia (rambut getar) dan lendir untuk menangkap debu atau kotoran halus terakhir sebelum udara masuk lebih dalam.'
      ],
      letak: 'Terletak di dalam rongga dada, tepat di ujung persimpangan bawah trakea yang bercabang dua sebelum menembus paru-paru.',
      struktur: 'Percabangan kokoh menyerupai huruf Y terbalik yang diperkuat lempeng tulang rawan, serta dilapisi epitel bersilia dan sel penghasil lendir mukus.',
      funFact: 'Karena bronkus kanan posisinya lebih tegak dan sedikit lebih lebar, partikel atau benda asing yang tak sengaja tersedak lebih sering masuk ke bronkus sebelah kanan!',
      desc: 'Percabangan dua pipa utama di ujung bawah trakea yang membagi aliran udara bersih secara merata menuju paru-paru kanan dan kiri.'
    },
    bronkiolus: {
      id: 'bronkiolus',
      name: '6. Bronkiolus',
      tag: 'Pohon Ranting Percabangan Halus',
      icon: '🌱',
      detailTitle: 'Bronkiolus (Ranting Paru-Paru)',
      fungsi: [
        'Menyalurkan udara dari bronkus terus ke dalam hingga mencapai alveolus (kantung udara).',
        'Mengatur jumlah udara yang didistribusikan ke paru-paru dengan cara melebarkan atau menyempitkan salurannya.',
        'Memastikan setiap sudut paru-paru mendapatkan suplai oksigen yang merata.'
      ],
      letak: 'Tersebar luas di seluruh bagian dalam paru-paru, berbentuk seperti cabang-cabang ranting pohon yang ujungnya menempel pada kantung udara (alveolus).',
      struktur: 'Ranting saluran mikro berdiameter di bawah 1 mm tanpa cincin tulang rawan, dilapisi cincin otot polos elastis dan jaringan epitel silindris.',
      funFact: 'Di dalam sepasang paru-paru manusia terdapat lebih dari 30.000 cabang ranting bronkiolus yang tersusun amat rapi dan rapat!',
      desc: 'Saluran udara bercabang-cabang seperti ranting pohon yang menyalurkan udara dari bronkus terus hingga mencapai kantung udara alveolus.'
    },
    alveolus: {
      id: 'alveolus',
      name: '7. Alveolus (Kantung Udara)',
      tag: 'Pusat Difusi & Pertukaran Gas O₂ - CO₂',
      icon: '🍇',
      detailTitle: 'Alveolus (Pusat Pertukaran Gas)',
      fungsi: [
        'Menjadi tempat utama terjadinya pertukaran gas antara oksigen (O₂) dan karbon dioksida (CO₂).',
        'Menyerap oksigen dari udara yang kita hirup untuk diedarkan ke seluruh tubuh melalui pembuluh darah kapiler.',
        'Membuang limbah karbon dioksida dari dalam darah untuk diembuskan kembali keluar tubuh.'
      ],
      letak: 'Berada di ujung setiap cabang bronkiolus di dalam paru-paru, bentuknya berkumpul menyerupai dompolan buah anggur dan diselimuti jaring pembuluh darah.',
      struktur: 'Gerombolan kantung udara mikroskopis bulat (persis dompolan buah anggur) berdinding sangat tipis (hanya 1 lapis sel) yang diselimuti rapat oleh anyaman kapiler darah merah & biru.',
      funFact: 'Tubuhmu memiliki 300 - 500 juta alveoli! Jika dibentangkan, luas permukaannya mencapai 70-100 m² (setara lapangan bulu tangkis)!',
      desc: 'Kantung-kantung udara mikroskopis berbentuk gerombolan buah anggur tempat berlangsungnya pertukaran oksigen dan karbon dioksida.'
    },
    alveoli: {
      id: 'alveolus',
      name: '7. Alveolus (Kantung Udara)',
      tag: 'Pusat Difusi & Pertukaran Gas O₂ - CO₂',
      icon: '🍇',
      detailTitle: 'Alveolus (Pusat Pertukaran Gas)',
      fungsi: [
        'Menjadi tempat utama terjadinya pertukaran gas antara oksigen (O₂) dan karbon dioksida (CO₂).',
        'Menyerap oksigen dari udara yang kita hirup untuk diedarkan ke seluruh tubuh melalui pembuluh darah kapiler.',
        'Membuang limbah karbon dioksida dari dalam darah untuk diembuskan kembali keluar tubuh.'
      ],
      letak: 'Berada di ujung setiap cabang bronkiolus di dalam paru-paru, bentuknya berkumpul menyerupai dompolan buah anggur dan diselimuti jaring pembuluh darah.',
      struktur: 'Dompolan buah anggur mikroskopis berdinding satu lapis sel yang diselimuti kapiler darah.',
      funFact: 'Luas bentangan seluruh alveoli paru-paru bisa menutupi lapangan bulu tangkis!',
      desc: 'Pusat pertukaran gas pernapasan.'
    },
    paru: {
      id: 'paru',
      name: '8. Paru-Paru',
      tag: 'Organ Spons Utama Pelindung Hayat',
      icon: '🫁',
      detailTitle: 'Paru-Paru (Organ Utama Pernapasan)',
      fungsi: [
        'Menjadi organ sentral tempat berlangsungnya seluruh proses pernapasan manusia.',
        'Membungkus dan melindungi seluruh jaringan bronkus, bronkiolus, dan jutaan kantung alveolus.',
        'Bekerja sama dengan tulang rusuk dan otot diafragma untuk memompa udara masuk dan keluar dari tubuh.'
      ],
      letak: 'Memenuhi rongga dada bagian atas, dilindungi oleh sangkar tulang rusuk, dan ditopang langsung oleh otot diafragma di bagian bawah.',
      struktur: 'Organ spons elastis berwarna pink kemerahan segar (*Healthy Pink*). Paru kanan terdiri atas 3 lobus (superior, medius, inferior) berukuran lebih besar; paru kiri terdiri atas 2 lobus dengan lekukan jantung (*incisura cardiaca*).',
      funFact: 'Paru-paru adalah satu-satunya organ dalam tubuh manusia yang dapat mengapung di atas air karena menyimpan jutaan kantung udara elastis!',
      desc: 'Sepasang organ kenyal berwarna merah muda sehat yang bertindak sebagai mesin utama pernapasan, mengembang dan mengempis seirama dengan detak kehidupanmu.'
    },
    paru_paru: {
      id: 'paru',
      name: '8. Paru-Paru',
      tag: 'Organ Spons Utama Pelindung Hayat',
      icon: '🫁',
      detailTitle: 'Paru-Paru (Organ Utama Pernapasan)',
      fungsi: [
        'Menjadi organ sentral tempat berlangsungnya seluruh proses pernapasan manusia.',
        'Membungkus dan melindungi seluruh jaringan bronkus, bronkiolus, dan jutaan kantung alveolus.',
        'Bekerja sama dengan tulang rusuk dan otot diafragma untuk memompa udara masuk dan keluar dari tubuh.'
      ],
      letak: 'Memenuhi rongga dada bagian atas, dilindungi oleh sangkar tulang rusuk, dan ditopang langsung oleh otot diafragma di bagian bawah.',
      struktur: 'Sepasang organ spons pink sehat (kanan 3 lobus, kiri 2 lobus).',
      funFact: 'Dapat mengapung di atas air karena jutaan kantung udara!',
      desc: 'Organ utama pernapasan.'
    }
  },

  // =========================================================================
  // INITIALIZATION & EVENT BINDINGS
  // =========================================================================
  init() {
    this.bindEvents();
    if (this.particleEngine) {
      this.particleEngine.init();
    }
    if (this.alveoliDiffusionEngine) {
      this.alveoliDiffusionEngine.init();
    }
    this.switchMode('organ3d');
  },

  bindEvents() {
    // Mode Switcher Tabs
    const tabs = [
      { id: 'tabLab-organ3d', mode: 'organ3d' },
      { id: 'tabLab-pernapasan', mode: 'pernapasan' },
      { id: 'tabLab-alveoli', mode: 'alveoli' }
    ];

    tabs.forEach(t => {
      const btn = document.getElementById(t.id);
      if (btn) {
        btn.onclick = (e) => {
          if (e && e.preventDefault) e.preventDefault();
          this.switchMode(t.mode);
        };
      }
    });

    // Horizontal Organ Navigation Pills (Event Listener Eksplisit untuk Tab 1)
    const organPills = document.querySelectorAll('#masterOrganPills .organ-nav-pill');
    organPills.forEach(pill => {
      pill.addEventListener('click', (e) => {
        if (e && e.preventDefault) e.preventDefault();
        const organKey = pill.getAttribute('data-organ-pill');
        if (organKey) {
          this.selectMasterOrgan(organKey);
        }
      });
    });

    // Slider Kecepatan Aktivitas Napas (Mode 2)
    const speedSlider = document.getElementById('breathSpeedSlider');
    if (speedSlider) {
      speedSlider.addEventListener('input', (e) => {
        this.setActivitySpeed(parseInt(e.target.value));
      });
    }

    // Keyboard Escape to close Video Zoom Lightbox
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' || e.key === 'Esc') {
        const zoomModal = document.getElementById('videoZoomModal');
        if (zoomModal && !zoomModal.classList.contains('hidden')) {
          this.closeVideoZoomModal();
        }
      }
    });
  },

  // =========================================================================
  // TAB NAVIGATION CONTROLLER (INSTANT & ROBUST)
  // =========================================================================
  switchMode(mode) {
    this.currentMode = mode;

    // Reset timers safely
    try {
      if (this.breathState && this.breathState.autoTimer) clearInterval(this.breathState.autoTimer);
      if (this.alveoliState && this.alveoliState.playTimer) clearInterval(this.alveoliState.playTimer);
      if (this.breathState) this.breathState.isAutoBreathing = false;
      if (this.alveoliState) this.alveoliState.isPlaying = false;
    } catch (e) {}

    // Update Tab Styles
    const tabs = ['organ3d', 'pernapasan', 'alveoli'];
    tabs.forEach(t => {
      const btn = document.getElementById(`tabLab-${t}`);
      const sec = document.getElementById(`sectionLab-${t}`);
      if (btn) {
        if (t === mode) {
          btn.className = 'flex-1 w-full py-3 px-4 rounded-2xl font-heading text-xs font-bold text-center transition-all bg-sky-600 text-white shadow-md scale-102 flex items-center justify-center gap-2';
        } else {
          btn.className = 'flex-1 w-full py-3 px-4 rounded-2xl font-heading text-xs font-bold text-center transition-all bg-white/70 text-slate-700 hover:bg-white shadow-xs flex items-center justify-center gap-2';
        }
      }
      if (sec) {
        if (t === mode) {
          sec.classList.remove('hidden');
          sec.classList.add('block');
        } else {
          sec.classList.add('hidden');
          sec.classList.remove('block');
        }
      }
    });

    // Specific mode setup protected from runtime crashes
    try {
      if (mode === 'organ3d') {
        if (this.particleEngine) this.particleEngine.stop();
        if (this.alveoliDiffusionEngine) this.alveoliDiffusionEngine.stop();
        this.selectMasterOrgan(this.masterOrganState.currentOrgan || 'overview');
      } else if (mode === 'pernapasan') {
        if (this.alveoliDiffusionEngine) this.alveoliDiffusionEngine.stop();
        if (this.particleEngine) {
          this.particleEngine.resize();
          this.particleEngine.start();
          this.particleEngine.setMode(this.breathState.mode || 'tarik');
        }
        this.setBreathMode('tarik');
      } else if (mode === 'alveoli') {
        if (this.particleEngine) this.particleEngine.stop();
        if (this.alveoliDiffusionEngine) {
          this.alveoliDiffusionEngine.resize();
          this.alveoliDiffusionEngine.start();
        }
        this.setAlveoliStep(1);
      }
    } catch (err) {
      console.warn('Mode initialization caught:', err);
    }

    // Check completion progress
    try {
      this.checkLabCompletion();
    } catch (e) {}
  },

  // =========================================================================
  // MULTI-LAYER MEDICAL SVG ANATOMY CONTROLLER & BILLBOARD PINS
  // =========================================================================
  pinPositions: {
    front: {
      hidung: { left: '50%', top: '11%' },
      faring: { left: '50%', top: '20%' },
      laring: { left: '50%', top: '27%' },
      trakea: { left: '50%', top: '35%' },
      bronkus: { left: '38%', top: '47%' },
      paru: { left: '72%', top: '56%' },
      alveolus: { left: '26%', top: '69%' },
      diafragma: { left: '50%', top: '82%' }
    },
    side: {
      hidung: { left: '34%', top: '13%' },
      faring: { left: '46%', top: '20%' },
      laring: { left: '44%', top: '28%' },
      trakea: { left: '46%', top: '37%' },
      bronkus: { left: '48%', top: '48%' },
      paru: { left: '58%', top: '58%' },
      alveolus: { left: '60%', top: '70%' },
      diafragma: { left: '50%', top: '81%' }
    },
    back: {
      hidung: { left: '50%', top: '11%' },
      faring: { left: '50%', top: '20%' },
      laring: { left: '50%', top: '27%' },
      trakea: { left: '50%', top: '35%' },
      bronkus: { left: '62%', top: '47%' },
      paru: { left: '28%', top: '56%' },
      alveolus: { left: '74%', top: '69%' },
      diafragma: { left: '50%', top: '82%' }
    }
  },

  getActiveAngleMap() {
    const deg = this.organState.angle || 0;
    if (deg >= 45 && deg < 135) return 'side';
    if (deg >= 135 && deg < 225) return 'back';
    if (deg >= 225 && deg < 315) return 'side';
    return 'front';
  },

  setAngle(deg) {
    this.organState.angle = deg;
    const angleLabel = document.getElementById('organ3dAngleLabel');
    const slider = document.getElementById('organ3dRotateSlider');
    const viewFront = document.getElementById('svgViewFront');
    const viewSide = document.getElementById('svgViewSide');
    const viewBack = document.getElementById('svgViewBack');

    if (slider) slider.value = deg;

    const btn0 = document.getElementById('btnAngle0');
    const btn90 = document.getElementById('btnAngle90');
    const btn180 = document.getElementById('btnAngle180');

    // Reset button styles
    [btn0, btn90, btn180].forEach(b => {
      if (b) {
        b.className = 'px-2.5 py-1 rounded-full bg-white/90 hover:bg-white text-slate-700 text-[11px] font-bold border border-slate-200 transition-all shadow-xs';
      }
    });

    let activeMap = 'front';
    let viewTitle = 'Tampak Depan (0°)';

    if (deg >= 45 && deg < 135) {
      // Samping Kanan (90°)
      activeMap = 'side';
      viewTitle = `Tampak Samping (90°)`;
      if (btn90) btn90.className = 'px-2.5 py-1 rounded-full bg-sky-600 text-white text-[11px] font-bold border border-sky-600 transition-all shadow-xs';
      this.switchSvgLayer(viewSide, [viewFront, viewBack]);
    } else if (deg >= 135 && deg < 225) {
      // Belakang Posterior (180°)
      activeMap = 'back';
      viewTitle = `Tampak Belakang (180°)`;
      if (btn180) btn180.className = 'px-2.5 py-1 rounded-full bg-sky-600 text-white text-[11px] font-bold border border-sky-600 transition-all shadow-xs';
      this.switchSvgLayer(viewBack, [viewFront, viewSide]);
    } else if (deg >= 225 && deg < 315) {
      // Samping Kiri (270°)
      activeMap = 'side';
      viewTitle = `Tampak Samping Kiri (${deg}°)`;
      this.switchSvgLayer(viewSide, [viewFront, viewBack]);
    } else {
      // Depan Anterior (0°)
      activeMap = 'front';
      viewTitle = `Tampak Depan (0°)`;
      if (btn0) btn0.className = 'px-2.5 py-1 rounded-full bg-sky-600 text-white text-[11px] font-bold border border-sky-600 transition-all shadow-xs';
      this.switchSvgLayer(viewFront, [viewSide, viewBack]);
    }

    if (angleLabel) angleLabel.textContent = viewTitle;

    // Reposition 8 HTML Billboard Pins smoothly (Selalu Tegak, Anti-Terbalik)
    this.repositionBillboardPins(activeMap);
  },

  switchSvgLayer(activeLayer, inactiveLayers) {
    if (activeLayer) {
      activeLayer.classList.remove('hidden');
      requestAnimationFrame(() => {
        activeLayer.classList.remove('opacity-0');
        activeLayer.classList.add('opacity-100');
      });
    }
    inactiveLayers.forEach(layer => {
      if (layer) {
        layer.classList.add('opacity-0');
        layer.classList.remove('opacity-100');
        setTimeout(() => {
          if (layer.classList.contains('opacity-0')) {
            layer.classList.add('hidden');
          }
        }, 300);
      }
    });
  },

  repositionBillboardPins(mapKey) {
    const coords = this.pinPositions[mapKey] || this.pinPositions.front;
    Object.keys(coords).forEach(organKey => {
      const pin = document.querySelector(`.hotspot-pin-btn[data-organ="${organKey}"]`);
      if (pin && coords[organKey]) {
        pin.style.left = coords[organKey].left;
        pin.style.top = coords[organKey].top;
        pin.style.transform = 'translate(-50%, -50%)';
      }
    });
  },

  toggleAutoSpin() {
    this.organState.isRotating = !this.organState.isRotating;
    const btn = document.getElementById('btnSpin3D');

    if (this.organState.isRotating) {
      if (btn) {
        btn.classList.add('bg-sky-500', 'text-white');
        btn.classList.remove('bg-white', 'text-slate-700');
      }
      this.organState.rotateTimer = setInterval(() => {
        let nextAngle = (this.organState.angle + 10) % 360;
        this.setAngle(nextAngle);
      }, 90);
    } else {
      if (btn) {
        btn.classList.remove('bg-sky-500', 'text-white');
        btn.classList.add('bg-white', 'text-slate-700');
      }
      clearInterval(this.organState.rotateTimer);
    }
  },

  adjustZoom(delta) {
    this.organState.zoomLevel = Math.min(2.0, Math.max(0.75, Math.round((this.organState.zoomLevel + delta) * 100) / 100));
    const container = document.getElementById('medicalSvgContainer');
    const indicator = document.getElementById('organ3dZoomIndicator');

    if (container) {
      container.style.transform = `scale(${this.organState.zoomLevel})`;
    }

    if (indicator) {
      indicator.textContent = `${Math.round(this.organState.zoomLevel * 100)}%`;
    }
  },

  resetZoom() {
    this.organState.zoomLevel = 1.0;
    const container = document.getElementById('medicalSvgContainer');
    const indicator = document.getElementById('organ3dZoomIndicator');

    if (container) {
      container.style.transform = 'scale(1)';
    }

    if (indicator) {
      indicator.textContent = '100%';
    }
  },

  toggleXray() {
    this.organState.xrayActive = !this.organState.xrayActive;
    const stage = document.getElementById('medicalAnatomyStage');
    const btn = document.getElementById('btnToggleXray');

    if (this.organState.xrayActive) {
      if (stage) stage.classList.add('xray-mode-active');
      if (btn) {
        btn.className = 'btn-squishy-coral py-2 px-3 text-xs font-bold shrink-0';
        btn.innerHTML = '<span class="material-symbols-outlined text-[16px]">scanner</span><span>Mode X-Ray Aktif ⚡</span>';
      }
      App.showToast('🔍 Mode X-Ray Aktif! Organ tembus pandang memperlihatkan cabang bronkiolus & alveoli.');
    } else {
      if (stage) stage.classList.remove('xray-mode-active');
      if (btn) {
        btn.className = 'btn-squishy-primary py-2 px-3 text-xs font-bold shrink-0';
        btn.innerHTML = '<span class="material-symbols-outlined text-[16px]">scanner</span><span>Mode X-Ray Tembus Pandang</span>';
      }
      App.showToast('Mode Penglihatan Normal.');
    }
  },

  toggleSplitParu() {
    this.organState.layerSplitParu = !this.organState.layerSplitParu;
    const btn = document.getElementById('btnSplitParu');
    const lungLobes = document.querySelectorAll('.lung-lobe-parenchyma');

    if (this.organState.layerSplitParu) {
      if (btn) btn.innerHTML = '<span class="material-symbols-outlined text-[16px]">visibility</span><span>Tutup Lapisan Paru</span>';
      lungLobes.forEach(el => el.style.opacity = '0.15');
      App.showToast('✨ Lapisan luar paru terbuka! Cabang bronkiolus terlihat jelas seperti ranting pohon.');
    } else {
      if (btn) btn.innerHTML = '<span class="material-symbols-outlined text-[16px]">content_cut</span><span>Belah Lapisan Paru</span>';
      lungLobes.forEach(el => el.style.opacity = '');
      App.showToast('Lapisan luar paru ditutup kembali.');
    }
  },

  // =========================================================================
  // FITUR VIDEO ZOOM LIGHTBOX (FULLSCREEN OVERLAY 90% SCREEN) & MODE X-RAY
  // =========================================================================
  
  toggleVideoXRay(e) {
    if (e && e.stopPropagation) e.stopPropagation();
    if (e && e.preventDefault) e.preventDefault();
    
    this.organState.videoXRay = !this.organState.videoXRay;
    const isXRay = this.organState.videoXRay;

    const mainVideo = document.getElementById('organ-video');
    const zoomVideo = document.getElementById('zoom-modal-video');
    const btn = document.getElementById('btnXRayMode');
    const modalBtn = document.getElementById('modalBtnXRay');
    const btnText = document.getElementById('xrayBtnText');
    const modalBtnText = document.getElementById('modalXrayBtnText');

    // Terapkan filter rontgen x-ray medis ke video utama & video modal
    [mainVideo, zoomVideo].forEach(v => {
      if (v) {
        if (isXRay) {
          v.classList.add('xray-mode');
        } else {
          v.classList.remove('xray-mode');
        }
      }
    });

    // Perbarui teks tombol
    const label = isXRay ? '☀️ Mode Normal' : '🔦 Mode X-Ray';
    if (btnText) btnText.textContent = label;
    if (modalBtnText) modalBtnText.textContent = label;

    // Perbarui gaya glow aktif pada tombol
    [btn, modalBtn].forEach(b => {
      if (b) {
        if (isXRay) {
          b.classList.add('xray-active');
        } else {
          b.classList.remove('xray-active');
        }
      }
    });

    try {
      if (typeof SoundFX !== 'undefined' && SoundFX.play) {
        SoundFX.play('button');
      }
    } catch(err) {}

    if (typeof App !== 'undefined' && App.showToast) {
      App.showToast(isXRay ? '🔦 Mode X-Ray Medis Aktif! Efek rontgen memperjelas struktur organ.' : '☀️ Mode Penglihatan Normal Diaktifkan.');
    }
  },

  toggleXRayMode(e) {
    return this.toggleVideoXRay(e);
  },

  openVideoZoomModal(e) {
    // Abaikan jika klik terjadi pada tombol X-Ray
    if (e && e.target && (e.target.closest('#btnXRayMode') || e.target.closest('#modalBtnXRay'))) {
      return;
    }
    if (e && e.stopPropagation) e.stopPropagation();

    const mainVideo = document.getElementById('organ-video');
    const modal = document.getElementById('videoZoomModal');
    const zoomVideo = document.getElementById('zoom-modal-video');
    const zoomTitle = document.getElementById('zoomModalTitle');

    if (!modal || !zoomVideo) return;

    // Sinkronisasi sumber video dan posisi waktu putar
    if (mainVideo) {
      const activeSrc = mainVideo.currentSrc || mainVideo.src || './assets/video_utuh.mp4';
      if (zoomVideo.src !== activeSrc) {
        zoomVideo.src = activeSrc;
        zoomVideo.load();
      }
      try {
        if (mainVideo.currentTime) {
          zoomVideo.currentTime = mainVideo.currentTime;
        }
      } catch (err) {}
    }

    // Warisi mode filter X-Ray
    if (this.organState.videoXRay) {
      zoomVideo.classList.add('xray-mode');
    } else {
      zoomVideo.classList.remove('xray-mode');
    }

    // Sinkronisasi teks judul modal
    const resolvedId = this.masterOrganState.currentOrgan || 'overview';
    const organ = this.organHotspots[resolvedId] || this.organHotspots.overview;
    if (zoomTitle) {
      zoomTitle.textContent = `${organ.icon || '🫁'} ${organ.detailTitle || organ.name} (Tampilan HD 90%)`;
    }

    // Sinkronisasi status tombol X-Ray di dalam modal
    const modalBtnText = document.getElementById('modalXrayBtnText');
    const modalBtn = document.getElementById('modalBtnXRay');
    if (modalBtnText) {
      modalBtnText.textContent = this.organState.videoXRay ? '☀️ Mode Normal' : '🔦 Mode X-Ray';
    }
    if (modalBtn) {
      if (this.organState.videoXRay) {
        modalBtn.classList.add('xray-active');
      } else {
        modalBtn.classList.remove('xray-active');
      }
    }

    // Tampilkan modal lightbox
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.style.overflow = 'hidden';

    const playPromise = zoomVideo.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {});
    }

    try {
      if (typeof SoundFX !== 'undefined' && SoundFX.play) {
        SoundFX.play('modal');
      }
    } catch (err) {}

    if (typeof App !== 'undefined' && App.showToast) {
      App.showToast('🔍 Mode Zoom Layar Penuh (90% Layar). Klik X atau luar untuk menutup.');
    }
  },

  closeVideoZoomModal(e) {
    if (e && e.stopPropagation) e.stopPropagation();
    const modal = document.getElementById('videoZoomModal');
    const zoomVideo = document.getElementById('zoom-modal-video');
    const mainVideo = document.getElementById('organ-video');

    if (!modal) return;

    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.body.style.overflow = '';

    if (zoomVideo) {
      try {
        if (mainVideo && !zoomVideo.paused && zoomVideo.currentTime) {
          mainVideo.currentTime = zoomVideo.currentTime;
        }
        zoomVideo.pause();
      } catch (err) {}
    }
  },

  handleZoomBackdropClick(e) {
    if (e.target && (e.target.id === 'videoZoomModal' || e.target.classList.contains('video-zoom-overlay'))) {
      this.closeVideoZoomModal(e);
    }
  },
  selectMasterOrgan(organId) {
    let resolvedId = organId || 'overview';
    if (resolvedId === 'alveoli') resolvedId = 'alveolus';
    if (resolvedId === 'paru_paru') resolvedId = 'paru';

    const organ = this.organHotspots[resolvedId] || this.organHotspots[organId] || this.organHotspots.overview;
    this.masterOrganState.currentOrgan = resolvedId;
    this.organState.selectedOrgan = resolvedId;

    // 1. Update Horizontal Nav Pills (Active state glow & scroll)
    const pills = document.querySelectorAll('#masterOrganPills .organ-nav-pill');
    pills.forEach(pill => {
      const pKey = pill.getAttribute('data-organ-pill');
      if (pKey === resolvedId || (pKey === 'alveolus' && resolvedId === 'alveoli') || (pKey === 'paru' && resolvedId === 'paru_paru')) {
        pill.className = 'organ-nav-pill active px-4 py-2 rounded-full bg-sky-600 text-white border border-sky-600 text-xs font-extrabold shadow-md flex items-center gap-1.5 shrink-0 transition-all ring-2 ring-sky-300';
        try { pill.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' }); } catch(e) {}
      } else {
        pill.className = 'organ-nav-pill px-4 py-2 rounded-full bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-xs font-extrabold shadow-2xs flex items-center gap-1.5 shrink-0 transition-all';
      }
    });

    // 2. Update Top Badge
    const badge = document.getElementById('masterOrganBadge');
    if (badge) {
      badge.innerHTML = `<span class="material-symbols-outlined text-[16px] text-sky-400">health_and_safety</span><span>${organ.name}</span>`;
    }

    // 3. Update Looping Video Player Dinamis dengan Efek Fade Halus & Error Handling
    const videoPlayer = document.getElementById('organ-video');
    if (videoPlayer) {
      const targetSrc = (this.organVideos && this.organVideos[resolvedId]) ? this.organVideos[resolvedId] : './assets/video_utuh.mp4';
      
      // Pertahankan filter xray jika aktif
      if (this.organState.videoXRay) {
        videoPlayer.classList.add('xray-mode');
      } else {
        videoPlayer.classList.remove('xray-mode');
      }

      const getFilename = (src) => src ? src.split('/').pop().split('?')[0].split('#')[0] : '';
      const currentFilename = getFilename(videoPlayer.currentSrc || videoPlayer.src);
      const targetFilename = getFilename(targetSrc);

      // Error handling ringan: jika file video belum ada di folder lokal, tangkap agar tidak crash/freeze
      videoPlayer.onerror = () => {
        console.warn(`[Simulasi3D] Video untuk '${resolvedId}' (${targetSrc}) belum tersedia atau gagal dimuat.`);

        if (resolvedId === 'overview') {
          if (!videoPlayer.src.includes('video_utuh.mp4')) {
            videoPlayer.src = './assets/video_utuh.mp4';
            videoPlayer.load();
            videoPlayer.play().catch(() => {});
          }
          videoPlayer.style.opacity = '1';
          return;
        }

        // Khusus tombol '3. Laring', '6. Bronkiolus', '7. Alveolus', & '8. Paru-Paru': override dan hapus kotak peringatan/error fallback
        if (resolvedId === 'laring') {
          if (!videoPlayer.src.includes('video_laring.mp4.mp4') && targetSrc.endsWith('.mp4')) {
            videoPlayer.src = './assets/video_laring.mp4.mp4';
            videoPlayer.load();
            videoPlayer.play().catch(() => {});
          } else {
            videoPlayer.src = './assets/video_laring.mp4';
            videoPlayer.load();
            videoPlayer.play().catch(() => {});
          }
          videoPlayer.style.opacity = '1';
          return;
        }

        if (resolvedId === 'bronkiolus') {
          if (!videoPlayer.src.includes('video_bronkiolus.mp4.mp4') && targetSrc.endsWith('.mp4')) {
            videoPlayer.src = './assets/video_bronkiolus.mp4.mp4';
            videoPlayer.load();
            videoPlayer.play().catch(() => {});
          } else {
            videoPlayer.src = './assets/video_bronkiolus.mp4';
            videoPlayer.load();
            videoPlayer.play().catch(() => {});
          }
          videoPlayer.style.opacity = '1';
          return;
        }

        if (resolvedId === 'alveolus' || resolvedId === 'alveoli') {
          if (!videoPlayer.src.includes('video_alveolus.mp4.mp4') && targetSrc.endsWith('.mp4')) {
            videoPlayer.src = './assets/video_alveolus.mp4.mp4';
            videoPlayer.load();
            videoPlayer.play().catch(() => {});
          } else {
            videoPlayer.src = './assets/video_alveolus.mp4';
            videoPlayer.load();
            videoPlayer.play().catch(() => {});
          }
          videoPlayer.style.opacity = '1';
          return;
        }

        if (resolvedId === 'paru' || resolvedId === 'paru_paru') {
          if (!videoPlayer.src.includes('video_paruparu.mp4.mp4') && targetSrc.endsWith('.mp4')) {
            videoPlayer.src = './assets/video_paruparu.mp4.mp4';
            videoPlayer.load();
            videoPlayer.play().catch(() => {});
          } else {
            videoPlayer.src = './assets/video_paruparu.mp4';
            videoPlayer.load();
            videoPlayer.play().catch(() => {});
          }
          videoPlayer.style.opacity = '1';
          return;
        }

        // Coba periksa kemungkinan ekstensi ganda (.mp4.mp4) yang umum terjadi di Windows
        if (targetSrc.endsWith('.mp4') && !videoPlayer.src.includes('.mp4.mp4')) {
          videoPlayer.src = targetSrc + '.mp4';
          videoPlayer.load();
          videoPlayer.play().catch(() => {});
          videoPlayer.style.opacity = '1';
          return;
        }

        // Fallback aman ke video utuh jika belum ada file video lokal khusus organ ini
        if (!videoPlayer.src.includes('video_utuh.mp4')) {
          videoPlayer.src = './assets/video_utuh.mp4';
          videoPlayer.load();
          const fallbackPlay = videoPlayer.play();
          if (fallbackPlay !== undefined) fallbackPlay.catch(() => {});
          videoPlayer.style.opacity = '1';

          if (typeof App !== 'undefined' && App.showToast) {
            App.showToast(`ℹ️ Video 3D untuk ${organ.name} sedang dipersiapkan. Menampilkan video anatomi utama.`);
          }
        }
      };

      // Jika file video berbeda, lakukan transisi fade yang halus
      if (currentFilename !== targetFilename) {
        videoPlayer.style.transition = 'opacity 0.25s ease-out';
        videoPlayer.style.opacity = '0';

        setTimeout(() => {
          try {
            videoPlayer.src = targetSrc;
            videoPlayer.load();

            // Saat frame pertama video siap, mulai putar dan fade-in kembali
            const onReady = () => {
              videoPlayer.removeEventListener('loadeddata', onReady);
              videoPlayer.removeEventListener('canplay', onReady);
              clearTimeout(fallbackTimeout);
              
              const playPromise = videoPlayer.play();
              if (playPromise !== undefined) {
                playPromise.catch((e) => {
                  console.warn('[Simulasi3D] Autoplay tertahan:', e);
                });
              }
              videoPlayer.style.opacity = '1';
            };

            videoPlayer.addEventListener('loadeddata', onReady, { once: true });
            videoPlayer.addEventListener('canplay', onReady, { once: true });

            // Safeguard timeout jika browser tidak menembakkan event secepatnya
            const fallbackTimeout = setTimeout(() => {
              const playPromise = videoPlayer.play();
              if (playPromise !== undefined) playPromise.catch(() => {});
              videoPlayer.style.opacity = '1';
            }, 300);

          } catch (loadErr) {
            console.warn('[Simulasi3D] Tangkapan error saat memuat video:', loadErr);
            videoPlayer.style.opacity = '1';
          }
        }, 180);
      } else {
        // Jika sudah memutar video yang sama, pastikan tetap berputar
        const playPromise = videoPlayer.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {});
        }
        videoPlayer.style.opacity = '1';
      }

      // Sinkronisasi juga ke video modal jika modal zoom sedang terbuka
      const zoomVideo = document.getElementById('zoom-modal-video');
      const zoomModal = document.getElementById('videoZoomModal');
      if (zoomVideo && zoomModal && !zoomModal.classList.contains('hidden')) {
        zoomVideo.src = targetSrc;
        zoomVideo.load();
        zoomVideo.play().catch(() => {});
        const zoomTitle = document.getElementById('zoomModalTitle');
        if (zoomTitle) {
          zoomTitle.textContent = `${organ.icon || '🫁'} ${organ.detailTitle || organ.name} (Tampilan Zoom HD)`;
        }
      }
    }

    // 4. Render Info Card (Kolom Kanan)
    this.renderMasterOrganInfo(resolvedId);

    // 5. Sound feedback if available
    try {
      if (typeof SoundFX !== 'undefined' && SoundFX.play) {
        SoundFX.play('button');
      }
    } catch(e) {}
  },

  selectOrgan(organId) {
    this.selectMasterOrgan(organId);
  },

  renderMasterOrganInfo(organId) {
    let resolvedId = organId || 'overview';
    if (resolvedId === 'alveoli') resolvedId = 'alveolus';
    if (resolvedId === 'paru_paru') resolvedId = 'paru';

    const organ = this.organHotspots[resolvedId] || this.organHotspots.overview;
    const card = document.getElementById('masterInfoCard');
    if (!card) return;

    // Efek transisi halus saat teks berganti
    card.style.transition = 'opacity 0.2s ease, transform 0.2s ease';
    card.style.opacity = '0.5';
    card.style.transform = 'translateY(3px)';

    const fungsiListHtml = Array.isArray(organ.fungsi)
      ? organ.fungsi.map(f => `
          <li class="flex items-start gap-2 text-xs text-slate-700 leading-relaxed font-medium">
            <span class="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5 font-black text-[10px]">✓</span>
            <span>${f}</span>
          </li>
        `).join('')
      : `<li class="text-xs text-slate-700 leading-relaxed font-medium">${organ.desc}</li>`;

    setTimeout(() => {
      card.innerHTML = `
        <div class="flex flex-col h-full justify-between space-y-4">
          <!-- Header Info -->
          <div class="pb-3 border-b border-slate-100">
            <div class="flex items-center justify-between gap-2 flex-wrap mb-2">
              <span class="px-2.5 py-0.5 rounded-full bg-sky-100 text-sky-800 text-[10px] font-black uppercase tracking-wider">
                ${organ.tag || 'Anatomi Medis'}
              </span>
              <div class="flex items-center gap-1.5">
                <button onclick="Simulasi3D.openMicroscopicModal('${resolvedId}')" class="btn-squishy-gold py-1.5 px-3 text-[11px] font-bold shrink-0 flex items-center gap-1 shadow-xs" title="Bedah Mikroskopis Detail">
                  <span class="material-symbols-outlined text-[15px]">biotech</span>
                  <span>Bedah Mikroskopis Detail</span>
                </button>
                ${resolvedId === 'alveolus' ? `
                  <button onclick="Simulasi3D.switchMode('alveoli')" class="btn-squishy-primary py-1.5 px-3 text-[11px] font-bold shrink-0 flex items-center gap-1">
                    <span>Simulasi Difusi Gas ➔</span>
                  </button>
                ` : ''}
                ${resolvedId === 'paru' ? `
                  <button onclick="Simulasi3D.switchMode('pernapasan')" class="btn-squishy-secondary py-1.5 px-3 text-[11px] font-bold shrink-0 flex items-center gap-1">
                    <span>Uji Gerak Napas ➔</span>
                  </button>
                ` : ''}
              </div>
            </div>
            <div class="flex items-center gap-2.5">
              <span class="text-3xl p-1.5 rounded-2xl bg-sky-50 border border-sky-100 shadow-2xs">${organ.icon || '🫁'}</span>
              <div>
                <h3 class="font-heading text-lg font-black text-slate-900 leading-snug">${organ.detailTitle || organ.name}</h3>
                <p class="text-[11px] font-semibold text-slate-500">${organ.name}</p>
              </div>
            </div>
          </div>

          <!-- Scrollable Body with Details -->
          <div class="flex-1 space-y-3 pr-1 overflow-y-auto scrollbar-thin">
            
            <!-- 1. FUNGSI UTAMA -->
            <div class="p-3 rounded-2xl bg-sky-50/70 border border-sky-100/90 shadow-2xs">
              <h4 class="text-xs font-black text-sky-950 uppercase tracking-wide flex items-center gap-1.5 mb-2">
                <span class="material-symbols-outlined text-[15px] text-sky-600">psychology</span>
                <span>Fungsi Utama:</span>
              </h4>
              <ul class="space-y-1.5">
                ${fungsiListHtml}
              </ul>
            </div>

            <!-- 2. LETAK ANATOMIS -->
            <div class="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 shadow-2xs">
              <h4 class="text-xs font-black text-slate-800 uppercase tracking-wide flex items-center gap-1.5 mb-1.5">
                <span class="material-symbols-outlined text-[15px] text-indigo-600">pin_drop</span>
                <span>Letak Organ:</span>
              </h4>
              <p class="text-xs text-slate-700 font-medium leading-relaxed">
                ${organ.letak || 'Terletak di sepanjang saluran pernapasan manusia.'}
              </p>
            </div>

            <!-- 3. CIRI KHAS STRUKTUR -->
            <div class="p-3 rounded-2xl bg-teal-50/70 border border-teal-100 shadow-2xs">
              <h4 class="text-xs font-black text-teal-950 uppercase tracking-wide flex items-center gap-1.5 mb-1.5">
                <span class="material-symbols-outlined text-[15px] text-teal-600">hub</span>
                <span>Ciri Khas Struktur:</span>
              </h4>
              <p class="text-xs text-slate-700 font-medium leading-relaxed">
                ${organ.struktur || 'Tersusun atas jaringan khusus pernapasan.'}
              </p>
            </div>

            <!-- 4. TAHUKAH KAMU? -->
            <div class="p-3 rounded-2xl bg-amber-50/90 border border-amber-200/90 text-amber-950 shadow-2xs flex items-start gap-2.5">
              <span class="text-xl shrink-0 mt-0.5">💡</span>
              <div>
                <strong class="font-heading text-xs font-black block text-amber-950 mb-0.5">Tahukah Kamu?</strong>
                <p class="text-[11px] font-medium leading-relaxed text-amber-900">${organ.funFact}</p>
              </div>
            </div>

          </div>

          <!-- Footer Card Status -->
          <div class="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400 font-semibold">
            <span>Stitch Ensiklopedia Medis</span>
            <span class="text-sky-600 font-bold">Model Anatomi Terverifikasi</span>
          </div>
        </div>
      `;
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, 70);
  },

  // Pemetaan Aset Video Animasi 3D Lokal (.mp4)
  organVideos: {
    overview: './assets/video_ikhtisar_napas.mp4',
    hidung: './assets/video_hidung.mp4',
    faring: './assets/video_faring.mp4',
    laring: './assets/video_laring.mp4',
    trakea: './assets/video_trakea.mp4',
    bronkus: './assets/video_bronkus.mp4',
    bronkiolus: './assets/video_bronkiolus.mp4',
    alveolus: './assets/video_alveolus.mp4',
    paru: './assets/video_paruparu.mp4',
    paru_paru: './assets/video_paruparu.mp4',
    diafragma: './assets/video_utuh.mp4'
  },

  // =========================================================================
  // FITUR BEDAH MIKROSKOPIS INTERAKTIF (CLOSE-UP DEEP ZOOM MODAL)
  // =========================================================================
  openMicroscopicModal(organId) {
    let resolvedId = organId;
    if (organId === 'alveolus') resolvedId = 'alveoli';
    if (organId === 'paru_paru') resolvedId = 'paru';

    const organ = this.organHotspots[resolvedId] || this.organHotspots[organId];
    if (!organ) return;

    const modal = document.getElementById('modalBedahOrganDetail');
    const modalBody = document.getElementById('bedahModalBody');
    const modalTitle = document.getElementById('bedahModalTitle');
    const modalTag = document.getElementById('bedahModalTag');

    if (!modal || !modalBody) return;

    if (modalTitle) modalTitle.textContent = organ.detailTitle || organ.name;
    if (modalTag) modalTag.textContent = organ.tag;

    // Render interactive microscopic anatomy based on organ type
    let specificContent = '';

    if (resolvedId === 'overview') {
      specificContent = `
        <div class="space-y-4">
          <div class="relative w-full rounded-2xl overflow-hidden bg-slate-950 border border-sky-400/30 shadow-xl flex items-center justify-center p-1">
            <video src="./assets/video_ikhtisar_napas.mp4" autoplay loop muted playsinline disablePictureInPicture
              class="w-full h-auto max-h-[55vh] object-contain rounded-xl block"
              onerror="if (!this.src.includes('video_utuh.mp4')) { this.src = './assets/video_utuh.mp4'; this.load(); this.play().catch(()=>{}); }">
            </video>
          </div>

          <div class="p-3.5 rounded-xl bg-sky-50 border border-sky-200 text-xs text-slate-700 leading-relaxed">
            <strong class="text-sky-950 block font-bold mb-1">Ikhtisar Lengkap Sistem Pernapasan:</strong>
            <p>
              Seluruh organ pernapasan (Rongga Hidung, Faring, Laring, Trakea, Bronkus, Bronkiolus, Alveolus, dan Paru-Paru) bekerja secara terpadu menyuplai oksigen segar (O₂) untuk kelangsungan hidup sel tubuh dan membuang gas sisa karbon dioksida (CO₂).
            </p>
          </div>
        </div>
      `;
    } else if (resolvedId === 'hidung') {
      specificContent = `
        <div class="space-y-4">
          <div class="h-64 rounded-2xl bg-gradient-to-tr from-pink-950 via-rose-950 to-slate-900 p-4 flex flex-col items-center justify-between relative overflow-hidden text-white border border-pink-500/30">
            <!-- Waving Cilia & Mucus Epithelium -->
            <div class="w-full flex items-center justify-around h-32 mt-2 relative">
              <div class="flex flex-col items-center animate-bounce" style="animation-duration: 1.8s;">
                <span class="text-3xl filter drop-shadow">🌾</span>
                <span class="text-[10px] text-pink-300 font-bold">Silia Aktif 1</span>
              </div>
              <div class="flex flex-col items-center animate-bounce" style="animation-duration: 1.5s;">
                <span class="text-3xl filter drop-shadow">🌾</span>
                <span class="text-[10px] text-pink-300 font-bold">Silia Aktif 2</span>
              </div>
              <div class="flex flex-col items-center animate-bounce" style="animation-duration: 2.1s;">
                <span class="text-3xl filter drop-shadow">🌾</span>
                <span class="text-[10px] text-pink-300 font-bold">Silia Aktif 3</span>
              </div>
              <div class="flex flex-col items-center animate-bounce" style="animation-duration: 1.7s;">
                <span class="text-3xl filter drop-shadow">🌾</span>
                <span class="text-[10px] text-pink-300 font-bold">Silia Aktif 4</span>
              </div>
              <div class="flex flex-col items-center animate-bounce" style="animation-duration: 2.3s;">
                <span class="text-3xl filter drop-shadow">🌾</span>
                <span class="text-[10px] text-pink-300 font-bold">Silia Aktif 5</span>
              </div>
            </div>
            
            <!-- Badges Layer -->
            <div class="w-full flex items-center justify-between text-[11px] px-2">
              <span class="px-2.5 py-1 rounded-full bg-pink-900/60 border border-pink-400/40 text-pink-200 font-semibold">
                💧 Selaput Lendir (Mukus): 37°C Lembap & Hangat
              </span>
              <span class="px-2.5 py-1 rounded-full bg-rose-900/60 border border-rose-400/40 text-rose-200 font-semibold">
                🩸 Anyaman Kapiler Hangat
              </span>
            </div>

            <div class="text-center mt-2">
              <button onclick="App.showToast('💨 Wush! Partikel debu dan kotoran sukses terperangkap dalam lendir lengket dan disapu oleh silia!')" class="btn-squishy-primary py-1.5 px-4 text-xs font-bold shadow-md">
                Uji Tangkap Debu Masuk 💨
              </button>
            </div>
          </div>

          <div class="p-3.5 rounded-xl bg-pink-50 border border-pink-200 text-xs text-slate-700 leading-relaxed">
            <strong class="text-pink-950 block font-bold mb-1">3 Peran Sakti Rongga Hidung:</strong>
            <ul class="list-disc pl-4 space-y-1">
              <li><strong>Penyaringan Mekanis:</strong> Rambut hidung & jutaan silia bergetar menyaring debu, serbuk sari, dan bulu halus.</li>
              <li><strong>Penjerapan Kuman (Mukus):</strong> Sel goblet memproduksi lendir lengket untuk membunuh dan mengikat mikroba berbahaya.</li>
              <li><strong>Penyesuaian Suhu & Kelembapan:</strong> Pembuluh darah kapiler memanaskan udara dingin agar persis sama dengan suhu tubuh (37°C) sebelum mencapai paru-paru.</li>
            </ul>
          </div>
        </div>
      `;
    } else if (resolvedId === 'faring') {
      specificContent = `
        <div class="space-y-4">
          <div class="h-64 rounded-2xl bg-gradient-to-tr from-rose-950 via-slate-900 to-indigo-950 p-4 flex flex-col items-center justify-between relative overflow-hidden text-white border border-indigo-500/30">
            <div class="text-center space-y-1">
              <span class="text-4xl">👅🔀</span>
              <h4 class="font-heading text-sm font-bold text-indigo-300">Persimpangan Lalu Lintas Faring (Tekak)</h4>
              <p class="text-xs text-slate-300 max-w-sm">
                Tabung berotot di belakang hidung dan mulut yang membagi dua jalur: ke trakea (saluran napas) atau ke esofagus (saluran pencernaan).
              </p>
            </div>

            <!-- Visual Dual Conduits -->
            <div class="flex items-center gap-4 w-full justify-center">
              <div class="p-2.5 rounded-xl bg-sky-950/80 border border-sky-400/50 flex flex-col items-center text-center w-36">
                <span class="text-xl">🌬️</span>
                <span class="text-[11px] font-bold text-sky-300">Jalur Depan</span>
                <span class="text-[10px] text-slate-300">Menuju Laring & Trakea (Udara)</span>
              </div>
              <span class="text-xl font-black text-amber-400">⚡</span>
              <div class="p-2.5 rounded-xl bg-amber-950/80 border border-amber-400/50 flex flex-col items-center text-center w-36">
                <span class="text-xl">🥪</span>
                <span class="text-[11px] font-bold text-amber-300">Jalur Belakang</span>
                <span class="text-[10px] text-slate-300">Menuju Esofagus (Makanan)</span>
              </div>
            </div>

            <div class="flex items-center gap-2">
              <button onclick="App.showToast('🌬️ Mode Udara: Katup epiglotis terbuka, udara dari hidung/mulut mengalir lancar ke trakea!')" class="btn-squishy-primary py-1.5 px-3 text-xs font-bold">
                Alirkan Udara Napas 🌬️
              </button>
              <button onclick="App.showToast('🥪 Mode Makanan: Faring mengarahkan bolus makanan ke esofagus saat menelan!')" class="btn-squishy-gold py-1.5 px-3 text-xs font-bold">
                Simulasi Menelan 🥪
              </button>
            </div>
          </div>

          <div class="p-3.5 rounded-xl bg-indigo-50 border border-indigo-200 text-xs text-slate-700 leading-relaxed">
            <strong class="text-indigo-950 block font-bold mb-1">3 Zona Utama Faring:</strong>
            <ul class="list-disc pl-4 space-y-1">
              <li><strong>Nasofaring:</strong> Bagian atas di belakang rongga hidung yang hanya dilalui udara pernapasan.</li>
              <li><strong>Orofaring:</strong> Bagian tengah di belakang rongga mulut tempat udara dan makanan bergantian lewat.</li>
              <li><strong>Laringofaring:</strong> Bagian terbawah yang mengarahkan udara ke saluran napas depan dan makanan ke saluran cerna belakang.</li>
            </ul>
          </div>
        </div>
      `;
    } else if (resolvedId === 'hidung_faring') {
      specificContent = `
        <div class="space-y-4">
          <div class="h-60 rounded-2xl bg-gradient-to-tr from-pink-900 via-rose-950 to-slate-900 p-4 flex flex-col items-center justify-center relative overflow-hidden text-white border border-pink-500/30">
            <div class="w-full flex items-center justify-around h-32 mt-4 relative">
              <div class="flex flex-col items-center animate-bounce" style="animation-duration: 2s;">
                <span class="text-3xl">🌾</span>
                <span class="text-[10px] text-pink-300 font-bold">Silia 1</span>
              </div>
              <div class="flex flex-col items-center animate-bounce" style="animation-duration: 1.7s;">
                <span class="text-3xl">🌾</span>
                <span class="text-[10px] text-pink-300 font-bold">Silia 2</span>
              </div>
              <div class="flex flex-col items-center animate-bounce" style="animation-duration: 2.2s;">
                <span class="text-3xl">🌾</span>
                <span class="text-[10px] text-pink-300 font-bold">Silia 3</span>
              </div>
            </div>
            <div class="text-center mt-auto">
              <button onclick="App.showToast('💨 Wush! Partikel debu berhasil ditangkap oleh silia dan lendir!')" class="btn-squishy-primary py-1.5 px-4 text-xs font-bold">
                Tiup Partikel Debu Masuk 💨
              </button>
            </div>
          </div>
        </div>
      `;
    } else if (resolvedId === 'laring') {
      specificContent = `
        <div class="space-y-4">
          <div class="h-64 rounded-2xl bg-gradient-to-tr from-purple-950 via-slate-900 to-amber-950 p-4 flex flex-col items-center justify-between relative overflow-hidden text-white border border-purple-500/30">
            <div class="flex items-center gap-2">
              <span class="px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-400/40 text-xs font-bold" id="epiglottisStatusLabel">
                Mode: Bernapas (Katup Epiglotis Terbuka)
              </span>
            </div>

            <!-- Visual Katup Epiglotis Dinamis -->
            <div class="relative w-40 h-32 flex items-center justify-center">
              <div id="epiglottisFlapVisual" class="w-16 h-8 rounded-t-full bg-amber-400 border-2 border-amber-200 shadow-lg transition-transform duration-500 -translate-y-4"></div>
              <div class="absolute bottom-4 w-28 h-10 border-2 border-dashed border-sky-400 rounded-xl flex items-center justify-center text-[10px] text-sky-200">
                Pipa Trakea Menuju Paru
              </div>
            </div>

            <!-- Kontrol Katup Epiglotis & Pita Suara -->
            <div class="flex items-center gap-2">
              <button onclick="Simulasi3D.toggleEpiglottisSim('napas')" class="px-3 py-1.5 rounded-full bg-sky-600 text-white text-xs font-bold shadow-xs">
                🫁 Bernapas (Katup Buka)
              </button>
              <button onclick="Simulasi3D.toggleEpiglottisSim('telan')" class="px-3 py-1.5 rounded-full bg-amber-600 text-white text-xs font-bold shadow-xs">
                🍲 Menelan (Katup Tutup)
              </button>
              <button onclick="App.showToast('🗣️ LAA-LAA-LAA! Pita suaramu bergetar menghasilkan gelombang suara melodis!')" class="px-3 py-1.5 rounded-full bg-pink-600 text-white text-xs font-bold shadow-xs">
                Pita Suara 🗣️
              </button>
            </div>
          </div>

          <div class="p-3.5 rounded-xl bg-purple-50 border border-purple-200 text-xs text-slate-700 leading-relaxed">
            <strong class="text-purple-950 block font-bold mb-1">Dua Fungsi Sakti Laring:</strong>
            <ul class="list-disc pl-4 space-y-1">
              <li><strong>Pencegah Tersedak:</strong> Saat kamu menelan makanan, epiglotis otomatis melipat ke bawah menutup trakea sehingga makanan tidak masuk ke paru-paru.</li>
              <li><strong>Sumber Suara:</strong> Udara yang dihembuskan menggetarkan pita suara sehingga tercipta suara saat berbicara atau bernyanyi.</li>
            </ul>
          </div>
        </div>
      `;
    } else if (resolvedId === 'trakea') {
      specificContent = `
        <div class="space-y-4">
          <div class="h-64 rounded-2xl bg-gradient-to-tr from-cyan-950 via-slate-900 to-sky-950 p-4 flex flex-col items-center justify-between relative overflow-hidden text-white border border-cyan-500/30">
            <!-- C-Shape Cross Section 3D -->
            <div class="flex items-center gap-6 mt-2">
              <div class="relative w-36 h-36 rounded-full border-8 border-cyan-300 border-r-transparent flex items-center justify-center shadow-[0_0_35px_rgba(34,211,238,0.4)]">
                <span class="text-center font-heading text-[11px] font-bold text-cyan-200 leading-tight">
                  Cincin Rawan<br/>Huruf "C"<br/>
                  <span class="text-[9px] text-slate-300">(Kartilago Hialin)</span>
                </span>
                <span class="absolute right-[-14px] top-1/2 -translate-y-1/2 text-[9px] text-pink-300 bg-pink-900/80 px-1.5 py-0.5 rounded border border-pink-400/40">
                  Otot Trakealis
                </span>
              </div>
              <div class="flex flex-col gap-1.5 text-xs text-slate-200 max-w-[180px]">
                <div class="p-2 rounded-lg bg-cyan-950/60 border border-cyan-400/30">
                  <strong class="text-cyan-300 block">16-20 Cincin</strong>
                  Tersusun vertikal menjaga pipa tetap membulat terbuka.
                </div>
                <div class="p-2 rounded-lg bg-pink-950/60 border border-pink-400/30">
                  <strong class="text-pink-300 block">Eskalator Silia</strong>
                  Menyapu lendir dan kotoran naik ke atas menuju faring.
                </div>
              </div>
            </div>

            <div class="w-full text-center">
              <button onclick="App.showToast('🧹 Eskalator mukosilier trakea aktif bergerak ke atas membersihkan partikel asing!')" class="btn-squishy-primary py-1.5 px-4 text-xs font-bold">
                Jalankan Eskalator Mukosilier 🧹
              </button>
            </div>
          </div>

          <div class="p-3.5 rounded-xl bg-cyan-50 border border-cyan-200 text-xs text-slate-700 leading-relaxed">
            <strong class="text-cyan-950 block font-bold mb-1">Keistimewaan Struktur Batang Trakea:</strong>
            <p>
              Bentuk cincin huruf "C" terbuka di bagian belakang memberi ruang bagi esofagus di belakangnya mengembang saat menelan makanan, sekaligus menjaga pipa napas tidak pernah kempis saat tekanan udara berubah drastis.
            </p>
          </div>
        </div>
      `;
    } else if (resolvedId === 'bronkus') {
      specificContent = `
        <div class="space-y-4">
          <div class="h-64 rounded-2xl bg-gradient-to-tr from-blue-950 via-slate-900 to-sky-950 p-4 flex flex-col items-center justify-between relative overflow-hidden text-white border border-blue-500/30">
            <div class="text-center space-y-1">
              <span class="text-4xl">🌿🔬</span>
              <h4 class="font-heading text-sm font-bold text-sky-300">Bifurkasi Karina: Bronkus Utama Kanan & Kiri</h4>
              <p class="text-xs text-slate-300 max-w-sm">
                Trakea membelah di carina menjadi dua cabang utama yang membawa udara segar ke paru-paru kanan dan kiri.
              </p>
            </div>

            <!-- Visual Perbedaan Bronkus Kanan & Kiri -->
            <div class="grid grid-cols-2 gap-3 w-full max-w-sm">
              <div class="p-2.5 rounded-xl bg-blue-900/40 border border-blue-400/40 text-center">
                <span class="text-xs font-bold text-sky-300 block">Bronkus Kanan</span>
                <span class="text-[10px] text-slate-300">Lebih pendek, lebar & lebih vertikal (membelah jadi 3 cabang lobus).</span>
              </div>
              <div class="p-2.5 rounded-xl bg-indigo-900/40 border border-indigo-400/40 text-center">
                <span class="text-xs font-bold text-indigo-300 block">Bronkus Kiri</span>
                <span class="text-[10px] text-slate-300">Lebih panjang & mendatar karena melintasi ruang jantung.</span>
              </div>
            </div>

            <div class="text-center">
              <button onclick="App.showToast('🌿 Udara terbagi merata ke paru kanan dan paru kiri melalui kedua cabang bronkus!')" class="btn-squishy-primary py-1.5 px-4 text-xs font-bold">
                Alirkan Udara ke Kedua Paru 🌿
              </button>
            </div>
          </div>

          <div class="p-3.5 rounded-xl bg-blue-50 border border-blue-200 text-xs text-slate-700 leading-relaxed">
            <strong class="text-blue-950 block font-bold mb-1">Anatomi Bronkus:</strong>
            <p>
              Dinding bronkus dilapisi lempeng kartilago ireguler dan anyaman silia pembersih yang menyaring sisa debu mikro sebelum mencapai ranting bronkiolus.
            </p>
          </div>
        </div>
      `;
    } else if (resolvedId === 'paru') {
      specificContent = `
        <div class="space-y-4">
          <div class="h-60 rounded-2xl bg-gradient-to-tr from-rose-950 via-slate-900 to-pink-950 p-4 flex flex-col items-center justify-center relative overflow-hidden text-white border border-rose-500/30">
            <div class="text-center space-y-2">
              <span class="text-5xl">🫁✨</span>
              <h4 class="font-heading text-sm font-bold text-rose-300">Struktur Spons Merah Muda Paru-Paru</h4>
              <p class="text-xs text-slate-300 max-w-xs">
                Paru-paru tersusun atas jutaan kantung udara elastis. Paru kanan memiliki 3 lobus dan paru kiri memiliki 2 lobus dengan lekukan jantung!
              </p>
              <div class="flex items-center justify-center gap-2 mt-2">
                <button onclick="Simulasi3D.toggleSplitParu()" class="btn-squishy-coral py-1.5 px-3 text-xs font-bold">
                  Belah/Tutup Lapisan Paru ✂️
                </button>
              </div>
            </div>
          </div>

          <div class="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-xs text-slate-700 leading-relaxed">
            <strong class="text-rose-950 block font-bold mb-1">Tahukah Kamu?</strong>
            <p>
              Warna pink kemerahan sehat menandakan paru-paru penuh dengan jaringan kapiler darah segar kaya oksigen!
            </p>
          </div>
        </div>
      `;
    } else if (resolvedId === 'bronkiolus') {
      specificContent = `
        <div class="space-y-4">
          <div class="h-60 rounded-2xl bg-gradient-to-tr from-emerald-950 via-slate-900 to-teal-950 p-4 flex flex-col items-center justify-center relative overflow-hidden text-white border border-emerald-500/30">
            <div class="text-center space-y-2">
              <span class="text-5xl">🌱🔬</span>
              <h4 class="font-heading text-sm font-bold text-emerald-300">Pohon Bronkiolus (Zoom Mikroskopis)</h4>
              <p class="text-xs text-slate-300 max-w-xs">
                Percabangan bronkus yang mengecil tanpa tulang rawan, dikelilingi cincin otot polos yang mengatur aliran udara ke alveoli.
              </p>
              <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
                🌿 Diameter: &lt; 1 milimeter
              </div>
            </div>
          </div>

          <div class="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-slate-700 leading-relaxed">
            <strong class="text-emerald-950 block font-bold mb-1">Peran Vital Bronkiolus:</strong>
            <p>
              Bronkiolus adalah jembatan pembagi udara. Pada orang dengan asma, otot bronkiolus mengalami penyempitan yang membuat napas berbunyi mengi.
            </p>
          </div>
        </div>
      `;
    } else if (resolvedId === 'alveoli') {
      specificContent = `
        <div class="space-y-4">
          <div class="h-60 rounded-2xl bg-gradient-to-tr from-rose-950 via-indigo-950 to-slate-900 p-4 flex flex-col items-center justify-center relative overflow-hidden text-white border border-rose-500/30">
            <div class="text-center space-y-2">
              <span class="text-5xl">🍇🔬</span>
              <h4 class="font-heading text-sm font-bold text-rose-300">Kantung Alveoli & Kapiler Darah (Zoom 1000x)</h4>
              <p class="text-xs text-slate-300 max-w-xs">
                Dinding alveolus hanya setebal satu lapisan sel, sehingga gas oksigen dan karbon dioksida bisa menembus (difusi) dalam hitungan milidetik!
              </p>
              <button onclick="Simulasi3D.closeMicroscopicModal(); Simulasi3D.switchMode('alveoli');" class="btn-squishy-primary py-1.5 px-4 text-xs font-bold mt-2">
                Buka Simulasi Difusi Alveoli Penuh ➔
              </button>
            </div>
          </div>
        </div>
      `;
    } else if (resolvedId === 'diafragma') {
      specificContent = `
        <div class="space-y-4">
          <div class="h-60 rounded-2xl bg-gradient-to-tr from-orange-950 via-slate-900 to-amber-950 p-4 flex flex-col items-center justify-center relative overflow-hidden text-white border border-orange-500/30">
            <div class="text-center space-y-2">
              <span class="text-5xl">🛡️</span>
              <h4 class="font-heading text-sm font-bold text-orange-300">Kubah Kuat Otot Diafragma</h4>
              <p class="text-xs text-slate-300 max-w-xs">
                Mesin pompa napas terpenting tubuh! Mendatar saat menarik napas dan melengkung naik saat hembus napas.
              </p>
              <button onclick="Simulasi3D.closeMicroscopicModal(); Simulasi3D.switchMode('pernapasan');" class="btn-squishy-secondary py-1.5 px-4 text-xs font-bold mt-2">
                Uji Gerakan Tarik & Embus Napas ➔
              </button>
            </div>
          </div>
        </div>
      `;
    }

    modalBody.innerHTML = specificContent;
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  },

  closeMicroscopicModal() {
    const modal = document.getElementById('modalBedahOrganDetail');
    if (modal) {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    }
  },

  toggleEpiglottisSim(type) {
    const flap = document.getElementById('epiglottisFlapVisual');
    const label = document.getElementById('epiglottisStatusLabel');
    if (!flap || !label) return;

    if (type === 'napas') {
      flap.style.transform = 'translateY(-16px) rotate(0deg)';
      label.textContent = 'Mode: Bernapas (Epiglotis Terbuka)';
      label.className = 'px-3 py-1 rounded-full bg-sky-500/20 text-sky-300 border border-sky-400/40 text-xs font-bold';
      App.showToast('Katup Epiglotis terbuka tegak, udara mengalir bebas ke paru-paru! 🫁');
    } else {
      flap.style.transform = 'translateY(8px) rotate(45deg)';
      label.textContent = 'Mode: Menelan Makanan (Epiglotis Menutup)';
      label.className = 'px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/40 text-xs font-bold';
      App.showToast('Katup Epiglotis melipat menutup trakea, makanan diarahkan ke kerongkongan! 🍲');
    }
  },

  // =========================================================================
  // MODE 2: SIMULASI MEKANISME INSPIRASI & EKSPIRASI (TARIK & EMBUSKAN)
  // =========================================================================
  setBreathMode(mode, fromAuto = false) {
    // Jika tombol manual ditekan saat siklus otomatis berjalan, hentikan siklus
    if (!fromAuto && this.breathState.isAutoBreathing) {
      this.toggleAutoBreathLoop();
    }

    this.breathState.mode = mode;

    const btnTarik = document.getElementById('btnTarikNapas');
    const btnEmbus = document.getElementById('btnEmbusNapas');
    const statusBox = document.getElementById('breathStatusBox');
    const labelDiafragma = document.getElementById('labelDiafragmaAction');
    const labelRusuk = document.getElementById('labelRusukAction');
    const labelVolume = document.getElementById('labelVolumeAction');
    const capacityBar = document.getElementById('breathCapacityBar');
    const arrowIn = document.getElementById('arrowNapasIn');
    const arrowOut = document.getElementById('arrowNapasOut');
    const diafragmaPath = document.getElementById('diafragmaCurvePath');
    const diafragmaArrow = document.getElementById('diafragmaMotionArrow');
    const ribArrows = document.getElementById('ribArrowsInhale');
    const simParu = document.getElementById('sim-paru');
    const simDiafragma = document.getElementById('sim-diafragma');

    if (mode === 'tarik') {
      // INSPIRASI (TARIK NAPAS)
      // 1. Transformasi DOM: Skala Paru Mengembang (1.08) & Efek Glow Pendar Biru Halus
      if (simParu) {
        simParu.style.transform = 'scale(1.08)';
        simParu.style.filter = 'drop-shadow(0 0 20px rgba(14, 165, 233, 0.55)) drop-shadow(0 8px 25px rgba(2, 132, 199, 0.25))';
      }
      const ambientGlow = document.getElementById('lungAmbientGlow');
      if (ambientGlow) {
        ambientGlow.className = 'absolute w-60 h-60 rounded-full bg-sky-400/25 blur-3xl pointer-events-none transition-all duration-700 scale-110';
      }
      if (simDiafragma) simDiafragma.style.transform = 'translateY(15px)';

      // Update Partikel O2 Biru
      if (this.particleEngine) {
        this.particleEngine.setMode('tarik');
      }

      // 2. Pembaruan Teks Status Biologis
      if (labelVolume) labelVolume.textContent = 'Membesar & Mengembang Penuh';
      if (labelDiafragma) labelDiafragma.textContent = 'Berkontraksi & Mendatar (Turun)';
      if (labelRusuk) labelRusuk.textContent = 'Berkontraksi & Terangkat ke atas/luar ↗️';

      // 3. Tombol Aksi & Styling Indikator
      if (btnTarik) btnTarik.className = 'btn-squishy-primary py-3.5 px-4 text-xs font-bold flex-1 shadow-md';
      if (btnEmbus) btnEmbus.className = 'py-3.5 px-4 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-heading text-xs font-bold border border-slate-300 flex-1 transition-all';
      if (statusBox) statusBox.className = 'p-4 rounded-2xl bg-sky-50 border border-sky-200 flex flex-col gap-2.5 transition-all';

      // 4. Kapasitas Paru & Arah Aliran Udara
      if (capacityBar) {
        capacityBar.style.width = '90%';
        capacityBar.className = 'h-full rounded-full bg-gradient-to-r from-sky-400 to-teal-400 transition-all duration-700';
      }
      if (arrowIn) arrowIn.style.opacity = '1';
      if (arrowOut) arrowOut.style.opacity = '0';

      // 5. Bentuk Kurva Diafragma Mendatar & Panah
      if (diafragmaPath) {
        diafragmaPath.setAttribute('d', 'M30 185 Q100 188 170 185');
        diafragmaPath.setAttribute('stroke', '#0284C7');
      }
      if (diafragmaArrow) {
        diafragmaArrow.setAttribute('d', 'M100 172 L100 182 M96 178 L100 182 L104 178');
        diafragmaArrow.setAttribute('stroke', '#0284C7');
      }
      if (ribArrows) ribArrows.style.opacity = '1';

    } else {
      // EKSPIRASI (EMBUSKAN NAPAS)
      // 1. Transformasi DOM: Skala Paru Kembali Semula (1) & Efek Glow Pendar Halus
      if (simParu) {
        simParu.style.transform = 'scale(1)';
        simParu.style.filter = 'drop-shadow(0 0 16px rgba(249, 115, 22, 0.35)) drop-shadow(0 4px 12px rgba(239, 68, 68, 0.2))';
      }
      const ambientGlow = document.getElementById('lungAmbientGlow');
      if (ambientGlow) {
        ambientGlow.className = 'absolute w-48 h-48 rounded-full bg-orange-400/20 blur-3xl pointer-events-none transition-all duration-700 scale-90';
      }
      if (simDiafragma) simDiafragma.style.transform = 'translateY(0)';

      // Update Partikel CO2 Merah
      if (this.particleEngine) {
        this.particleEngine.setMode('embus');
      }

      // 2. Pembaruan Teks Status Biologis
      if (labelVolume) labelVolume.textContent = 'Mengecil & Mengempis (Tekanan Tinggi)';
      if (labelDiafragma) labelDiafragma.textContent = 'Relaksasi & Melengkung ke Atas';
      if (labelRusuk) labelRusuk.textContent = 'Relaksasi & Turun ke posisi semula ↙️';

      // 3. Tombol Aksi & Styling Indikator
      if (btnEmbus) btnEmbus.className = 'btn-squishy-coral py-3.5 px-4 text-xs font-bold flex-1 shadow-md';
      if (btnTarik) btnTarik.className = 'py-3.5 px-4 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-heading text-xs font-bold border border-slate-300 flex-1 transition-all';
      if (statusBox) statusBox.className = 'p-4 rounded-2xl bg-orange-50 border border-orange-200 flex flex-col gap-2.5 transition-all';

      // 4. Kapasitas Paru & Arah Aliran Udara
      if (capacityBar) {
        capacityBar.style.width = '30%';
        capacityBar.className = 'h-full rounded-full bg-gradient-to-r from-amber-400 to-orange-500 transition-all duration-700';
      }
      if (arrowIn) arrowIn.style.opacity = '0';
      if (arrowOut) arrowOut.style.opacity = '1';

      // 5. Bentuk Kurva Diafragma Melengkung Naik & Panah
      if (diafragmaPath) {
        diafragmaPath.setAttribute('d', 'M30 185 Q100 160 170 185');
        diafragmaPath.setAttribute('stroke', '#F97316');
      }
      if (diafragmaArrow) {
        diafragmaArrow.setAttribute('d', 'M100 182 L100 172 M96 176 L100 172 L104 176');
        diafragmaArrow.setAttribute('stroke', '#F97316');
      }
      if (ribArrows) ribArrows.style.opacity = '0.2';
    }
  },

  toggleAutoBreathLoop() {
    this.breathState.isAutoBreathing = !this.breathState.isAutoBreathing;
    const btn = document.getElementById('btnAutoBreathLoop');

    if (this.breathState.isAutoBreathing) {
      if (btn) {
        btn.innerHTML = '<span class="material-symbols-outlined text-[18px]">pause_circle</span><span>Hentikan Siklus Otomatis</span>';
        btn.classList.add('bg-rose-500', 'text-white', 'border-rose-600', 'hover:bg-rose-600');
        btn.classList.remove('bg-white', 'text-slate-800', 'hover:bg-slate-50', 'border-slate-200');
      }

      const val = this.breathState.activitySpeed || 15;
      const stepMs = Math.round((60 / val) * 1000 / 2);

      // Jalankan pergantian pertama secara bergantian
      const nextMode = (this.breathState.mode === 'tarik') ? 'embus' : 'tarik';
      this.setBreathMode(nextMode, true);

      if (this.breathState.autoTimer) clearInterval(this.breathState.autoTimer);
      this.breathState.autoTimer = setInterval(() => {
        const next = (this.breathState.mode === 'tarik') ? 'embus' : 'tarik';
        this.setBreathMode(next, true);
      }, stepMs);

      if (typeof SoundFX !== 'undefined' && SoundFX.play) {
        SoundFX.play('button');
      }
    } else {
      if (btn) {
        btn.innerHTML = '<span class="material-symbols-outlined text-[18px] text-sky-600">autorenew</span><span>Bernapas Otomatis (Siklus Irama)</span>';
        btn.classList.remove('bg-rose-500', 'text-white', 'border-rose-600', 'hover:bg-rose-600');
        btn.classList.add('bg-white', 'text-slate-800', 'hover:bg-slate-50', 'border-slate-200');
      }
      if (this.breathState.autoTimer) {
        clearInterval(this.breathState.autoTimer);
        this.breathState.autoTimer = null;
      }
    }
  },

  setActivitySpeed(val) {
    this.breathState.activitySpeed = val;
    const label = document.getElementById('activitySpeedLabel');
    const desc = document.getElementById('activitySpeedDesc');

    if (label) label.textContent = `${val}x / Menit`;
    if (desc) {
      if (val <= 20) desc.textContent = 'Kondisi Santai / Duduk Belajar (Pernapasan Normal)';
      else if (val <= 35) desc.textContent = 'Kondisi Berjalan Cepat / Naik Tangga Sekolah';
      else desc.textContent = 'Kondisi Berlari Kencang / Berolahraga Berat (Otot butuh banyak O₂!)';
    }

    // Hitung transition duration CSS dinamis (15 bpm -> 0.8s, 50 bpm -> 0.25s)
    const transitionSec = (0.8 - ((val - 15) / (50 - 15)) * 0.55).toFixed(2);
    const simParu = document.getElementById('sim-paru');
    const simDiafragma = document.getElementById('sim-diafragma');
    const diafragmaPath = document.getElementById('diafragmaCurvePath');
    const diafragmaArrow = document.getElementById('diafragmaMotionArrow');

    if (simParu) {
      simParu.style.transition = `transform ${transitionSec}s ease-in-out, filter ${transitionSec}s ease-in-out`;
      simParu.style.transitionDuration = `${transitionSec}s`;
    }
    if (simDiafragma) simDiafragma.style.transitionDuration = `${transitionSec}s`;
    if (diafragmaPath) diafragmaPath.style.transitionDuration = `${transitionSec}s`;
    if (diafragmaArrow) diafragmaArrow.style.transitionDuration = `${transitionSec}s`;

    // Sinkronisasi Real-Time Kecepatan Animasi Partikel (Requirement 3)
    if (this.particleEngine) {
      this.particleEngine.setSpeed(val);
    }

    // Jika bernapas otomatis aktif, perbarui interval tempo secara real-time
    if (this.breathState.isAutoBreathing) {
      if (this.breathState.autoTimer) clearInterval(this.breathState.autoTimer);
      const stepMs = Math.round((60 / val) * 1000 / 2);
      this.breathState.autoTimer = setInterval(() => {
        const nextMode = (this.breathState.mode === 'tarik') ? 'embus' : 'tarik';
        this.setBreathMode(nextMode, true);
      }, stepMs);
    }
  },

  // =========================================================================
  // MODE 3: SIMULASI MIKRO PERTUKARAN GAS ALVEOLI
  // =========================================================================
  setAlveoliStep(stepNumber) {
    this.alveoliState.currentStep = stepNumber;

    // Update Step Buttons styling
    for (let i = 1; i <= 4; i++) {
      const stepBtn = document.getElementById(`btnStepAlveoli-${i}`);
      if (stepBtn) {
        if (i === stepNumber) {
          stepBtn.className = 'px-3.5 py-1.5 rounded-full text-xs font-bold bg-sky-600 text-white shadow-xs transition-all scale-105';
        } else if (i < stepNumber) {
          stepBtn.className = 'px-3.5 py-1.5 rounded-full text-xs font-bold bg-emerald-900/50 text-emerald-300 border border-emerald-400/50 transition-all';
        } else {
          stepBtn.className = 'px-3.5 py-1.5 rounded-full text-xs font-bold bg-slate-800 text-slate-300 hover:bg-slate-700 transition-all';
        }
      }
    }

    // Aktifkan visual partikel sesuai langkah pada engine kanvas mikroskop
    if (this.alveoliDiffusionEngine) {
      this.alveoliDiffusionEngine.setStep(stepNumber);
    }

    const stepCard = document.getElementById('alveoliStepExplanation');

    if (stepNumber === 1) {
      // Step 1: Oksigen Masuk dari Atas
      if (stepCard) {
        stepCard.innerHTML = `
          <div class="flex items-start gap-3">
            <span class="text-2xl">1️⃣</span>
            <div>
              <strong class="font-heading text-sm font-extrabold text-sky-800 block">Langkah 1: Udara Segar Kaya Oksigen Masuk ke Rongga Alveolus</strong>
              <p class="text-xs text-slate-700 mt-1 leading-relaxed">
                Saat kamu menarik napas, jutaan molekul gas <strong>Oksigen (O₂)</strong> bercahaya biru neon mengalir turun dari bronkiolus memenuhi rongga gua alveolus yang berlipat-lipat luas.
              </p>
            </div>
          </div>
        `;
      }
    } else if (stepNumber === 2) {
      // Step 2: Difusi O2 Menembus Dinding ke Darah
      if (stepCard) {
        stepCard.innerHTML = `
          <div class="flex items-start gap-3">
            <span class="text-2xl">2️⃣</span>
            <div>
              <strong class="font-heading text-sm font-extrabold text-emerald-800 block">Langkah 2: Difusi Oksigen Menembus Membran ke Kapiler Darah</strong>
              <p class="text-xs text-slate-700 mt-1 leading-relaxed">
                Karena konsentrasi O₂ di rongga alveolus lebih tinggi daripada di kapiler, molekul <strong>O₂ menembus epitel tipis alveolus dan endotel kapiler</strong> (hanya 1 sel tipis!). Di dalam darah, O₂ diikat kuat oleh hemoglobin sehingga sel darah merah berubah merah cerah.
              </p>
            </div>
          </div>
        `;
      }
      this.triggerBloodCellOxygenation();
    } else if (stepNumber === 3) {
      // Step 3: Difusi CO2 Keluar dari Darah ke Rongga
      if (stepCard) {
        stepCard.innerHTML = `
          <div class="flex items-start gap-3">
            <span class="text-2xl">3️⃣</span>
            <div>
              <strong class="font-heading text-sm font-extrabold text-purple-800 block">Langkah 3: Karbon Dioksida Dilepaskan dari Darah ke Alveolus</strong>
              <p class="text-xs text-slate-700 mt-1 leading-relaxed">
                Secara bersamaan, sel darah yang membawa gas sisa metabolisme melepaskan <strong>Karbon Dioksida (CO₂)</strong> ungu pekat menembus membran kapiler darah menuju ke dalam rongga gua alveolus.
              </p>
            </div>
          </div>
        `;
      }
    } else if (stepNumber === 4) {
      // Step 4: CO2 Dikeluarkan ke Atas
      if (stepCard) {
        stepCard.innerHTML = `
          <div class="flex items-start gap-3">
            <span class="text-2xl">4️⃣</span>
            <div>
              <strong class="font-heading text-sm font-extrabold text-indigo-800 block">Langkah 4: Udara Kotor Dihembuskan Keluar Tubuh</strong>
              <p class="text-xs text-slate-700 mt-1 leading-relaxed">
                Saat kamu mengembuskan napas, rongga dada menyempit dan gas karbon dioksida di dalam alveolus terdorong naik keluar melewati saluran napas atas dan dibuang melalui hidung!
              </p>
            </div>
          </div>
        `;
      }
    }
  },

  nextAlveoliStep() {
    let next = (this.alveoliState.currentStep % 4) + 1;
    this.setAlveoliStep(next);
  },

  toggleAlveoliAutoSimulation() {
    this.alveoliState.isPlaying = !this.alveoliState.isPlaying;
    const btn = document.getElementById('btnPlayAlveoliSim');

    if (this.alveoliState.isPlaying) {
      if (btn) {
        btn.innerHTML = '<span class="material-symbols-outlined text-[18px]">stop_circle</span><span>Hentikan Simulasi</span>';
        btn.classList.add('bg-rose-500', 'text-white');
      }
      if (this.alveoliDiffusionEngine) {
        this.alveoliDiffusionEngine.setContinuous(true);
      }
      this.alveoliState.playTimer = setInterval(() => {
        let next = (this.alveoliState.currentStep % 4) + 1;
        this.alveoliState.currentStep = next;
        for (let i = 1; i <= 4; i++) {
          const stepBtn = document.getElementById(`btnStepAlveoli-${i}`);
          if (stepBtn) {
            if (i === next) {
              stepBtn.className = 'px-3.5 py-1.5 rounded-full text-xs font-bold bg-sky-600 text-white shadow-xs transition-all scale-105';
            } else if (i < next) {
              stepBtn.className = 'px-3.5 py-1.5 rounded-full text-xs font-bold bg-emerald-900/50 text-emerald-300 border border-emerald-400/50 transition-all';
            } else {
              stepBtn.className = 'px-3.5 py-1.5 rounded-full text-xs font-bold bg-slate-800 text-slate-300 hover:bg-slate-700 transition-all';
            }
          }
        }
        if (next === 2) this.triggerBloodCellOxygenation();
      }, 3000);
    } else {
      if (btn) {
        btn.innerHTML = '<span class="material-symbols-outlined text-[18px]">play_circle</span><span>Mulai Simulasi Difusi Gas</span>';
        btn.classList.remove('bg-rose-500', 'text-white');
      }
      if (this.alveoliDiffusionEngine) {
        this.alveoliDiffusionEngine.setContinuous(false);
      }
      clearInterval(this.alveoliState.playTimer);
      this.setAlveoliStep(this.alveoliState.currentStep);
    }
  },

  triggerBloodCellOxygenation() {
    const rbc = document.getElementById('rbcOxygenatedTarget');
    if (rbc) {
      rbc.style.backgroundColor = '#DC2626';
      rbc.style.borderColor = '#ffffff';
      rbc.style.boxShadow = '0 0 20px rgba(239, 68, 68, 0.95)';
      setTimeout(() => {
        if (rbc) {
          rbc.style.backgroundColor = '';
          rbc.style.borderColor = '';
          rbc.style.boxShadow = '';
        }
      }, 1600);
    }
  },

  dragO2Molecule() {
    App.showToast('Molekul O₂ menembus membran alveolus menuju sel darah merah! 🩸✨');
    this.setAlveoliStep(2);
  },

  dragCO2Molecule() {
    App.showToast('Molekul CO₂ menembus keluar dari kapiler darah menuju saluran napas! 🍃');
    this.setAlveoliStep(3);
  },

  // Integrasi Progres Guru & Siswa
  checkLabCompletion() {
    if (AppState.student) {
      AppState.student.simulationCompleted = true;
      if (!AppState.student.simBonusAwarded) {
        AppState.student.points = (AppState.student.points !== undefined ? AppState.student.points : 0) + 100;
        AppState.student.score = AppState.student.points;
        AppState.student.simBonusAwarded = true;
        AppState.saveStudent(AppState.student);
      }
    }
    localStorage.setItem('tarik_embus_simulasi_status', 'completed');
  },

  finishLabAndGoToQuiz() {
    this.checkLabCompletion();
    App.showToast('Luar biasa! Kamu telah menuntaskan praktikum Lab 3D! (+100 Poin) ⭐ Menuju Arena Kuis...');
    setTimeout(() => {
      App.navigateTo('screen-tantangan');
    }, 600);
  }
};

// Safe Auto-Initialization on DOM Ready
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    try {
      if (typeof Simulasi3D !== 'undefined' && Simulasi3D.init) {
        Simulasi3D.init();
      }
    } catch (e) {
      console.warn('Auto-init Simulasi3D caught:', e);
    }
  });
}
