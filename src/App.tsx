import React, { useState, useEffect, useCallback } from 'react';
import {
  Award,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Clock,
  Download,
  ExternalLink,
  Film,
  Handshake,
  Heart,
  HelpCircle,
  Lightbulb,
  Maximize2,
  MessageCircle,
  Minimize2,
  Pause,
  Play,
  RotateCcw,
  Scale,
  ShieldCheck,
  Sparkles,
  Timer,
  UserCheck,
  Users,
  X,
} from 'lucide-react';
import { MODAL_REFERENCES, ModalReferenceItem } from './data/presentationData';
import StimulusVideoSlide from './components/StimulusVideoSlide';
import LeaderRoleModelsSlide from './components/LeaderRoleModelsSlide';

interface TimerModalState {
  isOpen: boolean;
  sessionTitle: string;
  sessionSubtitle: string;
  durationMinutes: number;
  includeCaseGuide?: boolean;
}

const SLIDE_TITLES = [
  '1. Sampul Utama',
  '2. Video Stimulus: Kejayaan Islam',
  '3. Makna Khalifah Fil Ardh',
  '4. Fondasi Rasa Percaya Diri',
  '5. Karakter Kunci Khalifah',
  '6. Tokoh Panutan Dunia & Indonesia',
  '7. Langkah Praktis di Lapangan',
  '8. Aktivitas Interaktif Sesi',
  '9. Penutup & Tanya Jawab',
];

export default function App() {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [activeModalKey, setActiveModalKey] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  // Interactive Timer State (Slide 8)
  const [timerModal, setTimerModal] = useState<TimerModalState | null>(null);
  const [secondsLeft, setSecondsLeft] = useState<number>(600);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);

  // Interactive Live Workshop Notes
  const [muhasabahStrength, setMuhasabahStrength] = useState<string>('');
  const [muhasabahFear, setMuhasabahFear] = useState<string>('');
  const [caseStep1, setCaseStep1] = useState<string>('');
  const [caseStep2, setCaseStep2] = useState<string>('');
  const [caseStep3, setCaseStep3] = useState<string>('');

  const totalSlides = SLIDE_TITLES.length;

  const goToSlide = useCallback(
    (index: number) => {
      if (index >= 0 && index < totalSlides) {
        setCurrentSlide(index);
      }
    },
    [totalSlides]
  );

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev < totalSlides - 1 ? prev + 1 : prev));
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev > 0 ? prev - 1 : prev));
  }, []);

  const closeAllModals = useCallback(() => {
    setActiveModalKey(null);
    setTimerModal(null);
    setIsTimerRunning(false);
  }, []);

  // Keyboard navigation (ArrowRight, ArrowLeft, Escape)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      const isInputFocused =
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable;

      if (e.key === 'Escape') {
        closeAllModals();
        return;
      }

      if (activeModalKey || timerModal || isInputFocused) {
        return;
      }

      if (e.key === 'ArrowRight') {
        e.preventDefault();
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prevSlide();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeModalKey, timerModal, nextSlide, prevSlide, closeAllModals]);

  // Fullscreen state listener
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () =>
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Countdown timer interval
  useEffect(() => {
    if (!isTimerRunning) return;
    const interval = window.setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          setIsTimerRunning(false);
          try {
            const ctx = new (window.AudioContext ||
              (window as unknown as { webkitAudioContext: typeof AudioContext })
                .webkitAudioContext)();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(528, ctx.currentTime);
            gain.gain.setValueAtTime(0.15, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(
              0.001,
              ctx.currentTime + 1.2
            );
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start();
            osc.stop(ctx.currentTime + 1.2);
          } catch {
            // Optional audio chime
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isTimerRunning]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  const openSessionTimer = (
    durationMinutes: number,
    sessionTitle: string,
    sessionSubtitle: string,
    includeCaseGuide = false
  ) => {
    setActiveModalKey(null);
    setSecondsLeft(durationMinutes * 60);
    setIsTimerRunning(false);
    setTimerModal({
      isOpen: true,
      sessionTitle,
      sessionSubtitle,
      durationMinutes,
      includeCaseGuide,
    });
  };

  const formatTimer = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60)
      .toString()
      .padStart(2, '0');
    const secs = (totalSec % 60).toString()
      .padStart(2, '0');
    return `${mins}:${secs}`;
  };

  const activeModalData: ModalReferenceItem | null = activeModalKey
    ? MODAL_REFERENCES[activeModalKey] || null
    : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B192C] via-[#132238] to-[#0D2538] text-slate-100 flex flex-col justify-between relative overflow-hidden select-none sm:select-auto">
      {/* Subtle Ambient Islamic Geometric Arch & Filigree Backdrop */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
        <div className="absolute -top-36 -left-36 w-[32rem] h-[32rem] rounded-full bg-[#D4AF37]/[0.05] blur-3xl" />
        <div className="absolute top-1/3 -right-36 w-[36rem] h-[36rem] rounded-full bg-cyan-500/[0.04] blur-3xl" />
        <svg
          className="absolute -top-20 -left-20 w-80 h-80 text-[#D4AF37]/[0.08]"
          viewBox="0 0 200 200"
          fill="none"
          aria-hidden="true"
        >
          <g stroke="currentColor" strokeWidth="0.9">
            <polygon points="100,8 126,74 192,100 126,126 100,192 74,126 8,100 74,74" />
            <polygon
              points="100,8 126,74 192,100 126,126 100,192 74,126 8,100 74,74"
              transform="rotate(45 100 100)"
            />
            <circle cx="100" cy="100" r="64" />
            <circle cx="100" cy="100" r="42" />
          </g>
        </svg>
        <svg
          className="absolute -bottom-24 -right-20 w-96 h-96 text-[#D4AF37]/[0.07]"
          viewBox="0 0 200 200"
          fill="none"
          aria-hidden="true"
        >
          <g stroke="currentColor" strokeWidth="0.9">
            <polygon points="100,8 126,74 192,100 126,126 100,192 74,126 8,100 74,74" />
            <polygon
              points="100,8 126,74 192,100 126,126 100,192 74,126 8,100 74,74"
              transform="rotate(45 100 100)"
            />
            <circle cx="100" cy="100" r="70" />
          </g>
        </svg>
      </div>

      {/* Top Navigation Bar (Strict 3-Zone Contract: Brand — 5 Nav Links — 1 Primary Action) */}
      <header className="relative z-20 flex items-center justify-between gap-8 px-6 lg:px-12 py-3.5 border-b border-[#D4AF37]/25 bg-[#0B192C]/85 backdrop-blur-md">
        {/* Zone 1: Single-line Brand Wordmark */}
        <button
          onClick={() => goToSlide(0)}
          className="text-base lg:text-lg font-extrabold tracking-tight text-[#F3C623] whitespace-nowrap shrink-0 cursor-pointer hover:opacity-90 transition-opacity"
        >
          LDKS OSIS · Khalifah Fil Ardh
        </button>

        {/* Zone 2: 5 concise single-line text navigation links */}
        <nav className="hidden lg:flex items-center gap-6 text-xs font-medium text-slate-300">
          {[
            { idx: 1, label: 'Video Stimulus', activeMatch: [1] },
            { idx: 2, label: 'Materi Inti', activeMatch: [2, 3, 4] },
            { idx: 5, label: 'Tokoh Panutan', activeMatch: [5] },
            { idx: 6, label: 'Langkah & Sesi', activeMatch: [6, 7] },
            { idx: 8, label: 'Diskusi & FAQ', activeMatch: [8] },
          ].map((item) => {
            const isActive = item.activeMatch.includes(currentSlide);
            return (
              <button
                key={item.idx}
                onClick={() => goToSlide(item.idx)}
                className={`whitespace-nowrap shrink-0 py-1 border-b-2 transition-colors cursor-pointer ${
                  isActive
                    ? 'border-[#F3C623] text-[#F3C623] font-bold'
                    : 'border-transparent text-slate-300 hover:text-white hover:border-[#D4AF37]/50'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1 Primary Action (Fullscreen Toggle) */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={toggleFullscreen}
            className="px-4 py-2 text-xs font-bold text-[#0B192C] bg-gradient-to-r from-[#D4AF37] to-[#F3C623] rounded-lg hover:brightness-110 transition-all flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer shadow-sm"
          >
            {isFullscreen ? (
              <>
                <Minimize2 className="w-3.5 h-3.5" />
                <span>Keluar Layar Penuh</span>
              </>
            ) : (
              <>
                <Maximize2 className="w-3.5 h-3.5" />
                <span>Layar Penuh</span>
              </>
            )}
          </button>
        </div>
      </header>

      {/* Main Projector-Friendly 16:9 Stage */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-4 sm:px-8 lg:px-14 py-5 overflow-y-auto">
        <div
          key={currentSlide}
          className="w-full max-w-[1380px] my-auto animate-slide-enter"
        >
          {/* =========================================================
              SLIDE 1 (idx 0): COVER / JUDUL UTAMA
          ========================================================= */}
          {currentSlide === 0 && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
              <div className="lg:col-span-7 flex flex-col justify-center py-4 lg:py-8 relative">
                <div className="pl-5 sm:pl-8 border-l border-[#D4AF37]/70 relative space-y-5">
                  <span
                    aria-hidden="true"
                    className="absolute -left-[6.5px] top-1/2 -translate-y-1/2 text-[#F3C623] text-sm bg-[#0B192C] py-1"
                  >
                    ◇
                  </span>

                  <div className="flex flex-wrap items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#F3C623]">
                    <span>MODUL LDKS - LEADERSHIP TRAINING</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-slate-300">OSIS Berkarakter Khalifah</span>
                  </div>

                  <div className="space-y-2">
                    <h1 className="text-4xl sm:text-5xl lg:text-[3.6rem] font-extrabold text-[#F3C623] tracking-tight leading-[1.08]">
                      Kepemimpinan:
                    </h1>
                    <h2
                      className="text-2xl sm:text-3xl lg:text-[2.45rem] font-bold text-white leading-[1.2] tracking-tight"
                      style={{ textWrap: 'balance' }}
                    >
                      Menumbuhkan &amp; Membangun Rasa Percaya Diri dalam Menjadi Khalifah Panutan
                    </h2>
                  </div>

                  <div className="w-64 sm:w-80 h-[1.5px] bg-gradient-to-r from-[#D4AF37] via-[#F3C623]/60 to-transparent" />

                  <p className="text-base sm:text-xl text-slate-200 leading-relaxed max-w-xl font-normal">
                    Membangun Jiwa Pemimpin Muda Berintegritas, Berdaya, dan Menginspirasi.
                  </p>

                  <div className="pt-2 space-y-5">
                    <div>
                      <p className="text-sm font-semibold text-[#F3C623] mb-1">
                        Pemateri:
                      </p>
                      <p className="text-2xl sm:text-3xl lg:text-[2.15rem] font-extrabold text-white tracking-tight whitespace-nowrap">
                        Abu Haripin, M.Pd.
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 pt-1">
                      <button
                        onClick={() => goToSlide(1)}
                        className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#F3C623] text-[#0B192C] font-extrabold text-xs sm:text-sm hover:brightness-110 transition-all flex items-center gap-2 cursor-pointer shadow-lg shadow-[#D4AF37]/15 whitespace-nowrap"
                      >
                        <Film className="w-4 h-4 shrink-0" />
                        <span>Putar Video Stimulus Pembuka</span>
                      </button>
                      <button
                        onClick={() => goToSlide(5)}
                        className="px-4 py-2.5 rounded-xl border border-[#D4AF37]/50 bg-[#132238]/80 text-xs sm:text-sm font-bold text-[#F3C623] hover:border-[#F3C623] hover:bg-[#D4AF37]/15 transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
                      >
                        <Award className="w-4 h-4 shrink-0" />
                        <span>Tokoh Panutan Dunia &amp; RI</span>
                      </button>
                      <a
                        href="/presentasi-ldks-osis.html"
                        download="Presentasi_LDKS_OSIS_Abu_Haripin.html"
                        className="px-3.5 py-2.5 rounded-xl border border-slate-700 bg-[#0B192C]/80 text-xs font-semibold text-slate-300 hover:border-[#F3C623] hover:text-[#F3C623] transition-all flex items-center gap-1.5 whitespace-nowrap"
                      >
                        <Download className="w-3.5 h-3.5 shrink-0" />
                        <span>Unduh HTML</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 flex items-stretch">
                <OsisLeaderVisualCard
                  imageSrc="/assets/aistudio/osis_leader_arch.jpg"
                  caption="OSIS Berkarakter Khalifah · Pemimpin Muda Berintegritas"
                  subcaption="Abu Haripin, M.Pd."
                />
              </div>
            </div>
          )}

          {/* =========================================================
              SLIDE 2 (idx 1): VIDEO STIMULUS KEPEMIMPINAN KEJAYAAN ISLAM
          ========================================================= */}
          {currentSlide === 1 && (
            <StimulusVideoSlide
              onOpenModal={(key) => setActiveModalKey(key)}
              onProceedToMaterial={() => goToSlide(2)}
            />
          )}

          {/* =========================================================
              SLIDE 3 (idx 2): MAKNA KHALIFAH FIL ARDH
          ========================================================= */}
          {currentSlide === 2 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
                  Makna <span className="text-[#F3C623]">Khalifah Fil Ardh</span>
                </h2>
                <GoldenDivider />
                <p className="text-sm sm:text-lg text-slate-200">
                  Memahami amanah, memimpin dengan teladan, membawa kebaikan untuk bumi.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
                <div className="lg:col-span-3 hidden lg:flex">
                  <OsisLeaderVisualCard
                    imageSrc="/assets/aistudio/osis_leader_closing.jpg"
                    caption="Khalifah Fil Ardh"
                    subcaption="QS. Al-Baqarah: 30"
                    compact
                  />
                </div>

                <div className="lg:col-span-9 grid grid-cols-1 md:grid-cols-3 gap-5">
                  {/* Card 01 */}
                  <div className="rounded-2xl bg-[#0F223A]/80 backdrop-blur-xl border border-[#D4AF37]/40 hover:border-[#F3C623] transition-all duration-200 p-6 flex flex-col justify-between shadow-xl">
                    <div>
                      <div className="text-4xl font-extrabold text-[#F3C623] font-mono-tabular mb-2">
                        01
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold text-[#F3C623] leading-snug mb-3">
                        Manusia sebagai Khalifah di Bumi
                      </h3>
                      <div className="h-[1px] w-full bg-[#D4AF37]/30 mb-4" />
                      <p className="text-sm text-slate-100 leading-relaxed mb-4">
                        Amanah untuk mengelola, menjaga, dan memakmurkan bumi.
                      </p>
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                        <strong className="text-white font-semibold">Contoh:</strong> Ketua panitia mengajak anggota menjaga kebersihan fasilitas dan ikut membereskan ruangan setelah acara.
                      </p>
                    </div>

                    <button
                      onClick={() => setActiveModalKey('qs-albaqarah-30')}
                      className="w-full text-left p-4 rounded-xl border border-[#D4AF37]/50 bg-[#0B192C]/80 hover:bg-[#D4AF37]/15 hover:border-[#F3C623] transition-all cursor-pointer group"
                    >
                      <div className="flex items-center justify-between text-xs font-bold text-[#F3C623] mb-1">
                        <span>Baca Detail:</span>
                        <BookOpen className="w-4 h-4 text-[#F3C623] group-hover:scale-110 transition-transform" />
                      </div>
                      <p className="text-xs sm:text-sm font-bold text-white">
                        QS. Al-Baqarah: 30
                      </p>
                      <p className="text-xs text-slate-300 mt-0.5">
                        (Mandat menjaga keteraturan dan anti-kerusakan).
                      </p>
                    </button>
                  </div>

                  {/* Card 02 */}
                  <div className="rounded-2xl bg-[#0F223A]/80 backdrop-blur-xl border border-[#D4AF37]/40 hover:border-[#F3C623] transition-all duration-200 p-6 flex flex-col justify-between shadow-xl">
                    <div>
                      <div className="text-4xl font-extrabold text-[#F3C623] font-mono-tabular mb-2">
                        02
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold text-[#F3C623] leading-snug mb-3">
                        Peran Ganda OSIS: Pemimpin &amp; Teladan
                      </h3>
                      <div className="h-[1px] w-full bg-[#D4AF37]/30 mb-4" />
                      <p className="text-sm text-slate-100 leading-relaxed mb-4">
                        Memimpin dengan integritas, menginspirasi dengan aksi nyata.
                      </p>
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                        <strong className="text-white font-semibold">Contoh:</strong> Pengurus OSIS hadir 30 menit lebih awal saat piket gerbang dan tertib memakai seragam lengkap tanpa dispensasi.
                      </p>
                    </div>

                    <button
                      onClick={() => setActiveModalKey('prinsip-kepemimpinan')}
                      className="w-full text-left p-4 rounded-xl border border-[#D4AF37]/50 bg-[#0B192C]/80 hover:bg-[#D4AF37]/15 hover:border-[#F3C623] transition-all cursor-pointer group"
                    >
                      <div className="flex items-center justify-between text-xs font-bold text-[#F3C623] mb-1">
                        <span>Prinsip Kepemimpinan:</span>
                        <Award className="w-4 h-4 text-[#F3C623] group-hover:scale-110 transition-transform" />
                      </div>
                      <p className="text-xs sm:text-sm font-medium text-white leading-snug">
                        Respek lahir dari konsistensi perilaku, bukan dari pin jabatan.
                      </p>
                    </button>
                  </div>

                  {/* Card 03 */}
                  <div className="rounded-2xl bg-[#0F223A]/80 backdrop-blur-xl border border-[#D4AF37]/40 hover:border-[#F3C623] transition-all duration-200 p-6 flex flex-col justify-between shadow-xl">
                    <div>
                      <div className="text-4xl font-extrabold text-[#F3C623] font-mono-tabular mb-2">
                        03
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold text-[#F3C623] leading-snug mb-3">
                        Menjadi Uswah Hasanah
                      </h3>
                      <div className="h-[1px] w-full bg-[#D4AF37]/30 mb-4" />
                      <p className="text-sm text-slate-100 leading-relaxed mb-4">
                        Contoh yang baik bagi lingkungan, membawa kebaikan di mana pun.
                      </p>
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                        <strong className="text-white font-semibold">Contoh:</strong> Bersegera ke mushola saat adzan berkumandang dan menjadi penengah yang santun di grup media sosial angkatan.
                      </p>
                    </div>

                    <button
                      onClick={() => setActiveModalKey('qs-alahzab-21')}
                      className="w-full text-left p-4 rounded-xl border border-[#D4AF37]/50 bg-[#0B192C]/80 hover:bg-[#D4AF37]/15 hover:border-[#F3C623] transition-all cursor-pointer group"
                    >
                      <div className="flex items-center justify-between text-xs font-bold text-[#F3C623] mb-1">
                        <span>Baca Detail:</span>
                        <BookOpen className="w-4 h-4 text-[#F3C623] group-hover:scale-110 transition-transform" />
                      </div>
                      <p className="text-xs sm:text-sm font-bold text-white">
                        QS. Al-Ahzab: 21
                      </p>
                      <p className="text-xs text-slate-300 mt-0.5">
                        (Keteladanan moral dakwah bil hal).
                      </p>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* =========================================================
              SLIDE 4 (idx 3): FONDASI RASA PERCAYA DIRI
          ========================================================= */}
          {currentSlide === 3 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
                  Fondasi <span className="text-[#F3C623]">Rasa Percaya Diri</span>
                </h2>
                <GoldenDivider />
                <p className="text-sm sm:text-lg text-slate-200">
                  Tiga pilar utama yang membentuk leadership berdaya dan berakhlak.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
                <div className="lg:col-span-3 hidden lg:flex">
                  <OsisLeaderVisualCard
                    imageSrc="/assets/aistudio/osis_leader_closing.jpg"
                    caption="Leadership Berdaya & Berakhlak"
                    subcaption="3 Pilar Kepercayaan Diri"
                    compact
                  />
                </div>

                <div className="lg:col-span-9 grid grid-cols-1 md:grid-cols-3 gap-5">
                  {/* Pillar 1 */}
                  <div className="rounded-2xl bg-[#0F223A]/80 backdrop-blur-xl border border-[#D4AF37]/40 hover:border-[#F3C623] transition-all duration-200 p-6 flex flex-col justify-between shadow-xl">
                    <div>
                      <div className="w-16 h-16 rounded-full bg-gradient-to-b from-[#F3C623] to-[#C99E27] text-[#0B192C] flex items-center justify-center mx-auto mb-4 shadow-md">
                        <Sparkles className="w-8 h-8" />
                      </div>
                      <h3 className="text-base sm:text-lg font-extrabold text-[#F3C623] text-center uppercase tracking-wide mb-3">
                        1. Mengenali Potensi Diri
                      </h3>
                      <div className="h-[1px] w-full bg-[#D4AF37]/30 mb-3.5" />
                      <p className="text-xs sm:text-sm text-slate-100 leading-relaxed mb-3">
                        Pahami kelebihan dan kekuatan unik titipan Allah untuk dikembangkan.
                      </p>
                      <p className="text-xs text-slate-300 leading-relaxed mb-4">
                        <strong className="text-white">Contoh:</strong> Mengetahui minat di bidang logistik atau desain, lalu fokus berkontribusi maksimal tanpa minder dengan divisi lain.
                      </p>
                      <div className="p-3.5 rounded-xl border border-[#D4AF37]/45 bg-[#0B192C]/75 text-center text-xs sm:text-sm text-slate-100 font-medium mb-4">
                        “Setiap potensi saling melengkapi ibarat potongan puzzle.”
                      </div>
                    </div>

                    <button
                      onClick={() => setActiveModalKey('qs-attin-isra')}
                      className="w-full text-left p-3.5 rounded-xl border border-[#D4AF37]/45 bg-[#0B192C]/80 hover:bg-[#D4AF37]/15 hover:border-[#F3C623] transition-all cursor-pointer group"
                    >
                      <div className="flex items-center justify-between text-xs font-bold text-[#F3C623] mb-0.5">
                        <span>Baca Detail: Dalil Self-Potential</span>
                        <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                      </div>
                      <p className="text-xs font-semibold text-white">
                        QS. At-Tin: 4 / QS. Al-Isra: 84
                      </p>
                    </button>
                  </div>

                  {/* Pillar 2 */}
                  <div className="rounded-2xl bg-[#0F223A]/80 backdrop-blur-xl border border-[#D4AF37]/40 hover:border-[#F3C623] transition-all duration-200 p-6 flex flex-col justify-between shadow-xl">
                    <div>
                      <div className="w-16 h-16 rounded-full bg-gradient-to-b from-[#F3C623] to-[#C99E27] text-[#0B192C] flex items-center justify-center mx-auto mb-4 shadow-md">
                        <Heart className="w-8 h-8" />
                      </div>
                      <h3 className="text-base sm:text-lg font-extrabold text-[#F3C623] text-center uppercase tracking-wide mb-3">
                        2. Niat Ikhlas Lillahi Ta&apos;ala
                      </h3>
                      <div className="h-[1px] w-full bg-[#D4AF37]/30 mb-3.5" />
                      <p className="text-xs sm:text-sm text-slate-100 leading-relaxed mb-3">
                        Landasi setiap langkah demi keridhaan Allah untuk mendapat keberkahan.
                      </p>
                      <p className="text-xs text-slate-300 leading-relaxed mb-4">
                        <strong className="text-white">Contoh:</strong> Tetap bersemangat membersihkan area panggung pasca-acara meski penonton dan pujian sudah bubar.
                      </p>
                      <div className="p-3.5 rounded-xl border border-[#D4AF37]/45 bg-[#0B192C]/75 text-center text-xs sm:text-sm text-slate-100 font-medium mb-4">
                        “Ikhlas membuat mental tahan banting saat dikritik dan tidak haus validasi.”
                      </div>
                    </div>

                    <button
                      onClick={() => setActiveModalKey('hadits-niat-ikhlas')}
                      className="w-full text-left p-3.5 rounded-xl border border-[#D4AF37]/45 bg-[#0B192C]/80 hover:bg-[#D4AF37]/15 hover:border-[#F3C623] transition-all cursor-pointer group"
                    >
                      <div className="flex items-center justify-between text-xs font-bold text-[#F3C623] mb-0.5">
                        <span>Baca Detail: Hadits Niat</span>
                        <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                      </div>
                      <p className="text-xs font-semibold text-white">
                        Hadits Niat &amp; Ketulusan Beramal
                      </p>
                    </button>
                  </div>

                  {/* Pillar 3 */}
                  <div className="rounded-2xl bg-[#0F223A]/80 backdrop-blur-xl border border-[#D4AF37]/40 hover:border-[#F3C623] transition-all duration-200 p-6 flex flex-col justify-between shadow-xl">
                    <div>
                      <div className="w-16 h-16 rounded-full bg-gradient-to-b from-[#F3C623] to-[#C99E27] text-[#0B192C] flex items-center justify-center mx-auto mb-4 shadow-md">
                        <Scale className="w-8 h-8" />
                      </div>
                      <h3 className="text-base sm:text-lg font-extrabold text-[#F3C623] text-center uppercase tracking-wide mb-3">
                        3. Percaya Diri vs Kesombongan
                      </h3>
                      <div className="h-[1px] w-full bg-[#D4AF37]/30 mb-3.5" />
                      <p className="text-xs sm:text-sm text-slate-100 leading-relaxed mb-3">
                        Percaya diri menguatkan &amp; menginspirasi; kesombongan merusak kepercayaan.
                      </p>
                      <p className="text-xs text-slate-300 leading-relaxed mb-4">
                        <strong className="text-white">Contoh:</strong> Berani mengusulkan ide program kerja saat rapat, namun tetap lapang dada menerima usulan rekan yang lebih baik.
                      </p>
                      <div className="p-3.5 rounded-xl border border-[#D4AF37]/45 bg-[#0B192C]/75 text-center text-xs sm:text-sm text-slate-100 font-medium mb-4">
                        “Percaya diri merangkul orang lain; kesombongan meremehkan orang lain.”
                      </div>
                    </div>

                    <button
                      onClick={() => setActiveModalKey('hadits-sombong')}
                      className="w-full text-left p-3.5 rounded-xl border border-[#D4AF37]/45 bg-[#0B192C]/80 hover:bg-[#D4AF37]/15 hover:border-[#F3C623] transition-all cursor-pointer group"
                    >
                      <div className="flex items-center justify-between text-xs font-bold text-[#F3C623] mb-0.5">
                        <span>Baca Detail: HR. Muslim</span>
                        <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                      </div>
                      <p className="text-xs font-semibold text-white">
                        Hadits Definisi Sombong &amp; Respek
                      </p>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* =========================================================
              SLIDE 5 (idx 4): KARAKTER KUNCI KHALIFAH
          ========================================================= */}
          {currentSlide === 4 && (
            <div className="space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
                    Karakter Kunci <span className="text-[#F3C623]">Khalifah</span>
                  </h2>
                  <GoldenDivider />
                  <p className="text-sm sm:text-lg text-slate-200">
                    Empat sifat nabi yang membentuk pemimpin panutan di sekolah, dunia, dan Indonesia.
                  </p>
                </div>

                <button
                  onClick={() => goToSlide(5)}
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#F3C623] text-[#0B192C] font-extrabold text-xs sm:text-sm flex items-center gap-2 cursor-pointer self-start shadow-md whitespace-nowrap"
                >
                  <Award className="w-4 h-4" />
                  <span>Lihat Galeri 8 Tokoh Dunia &amp; Indonesia</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {[
                  {
                    id: 'karakter-shiddiq',
                    name: 'Shiddiq',
                    subtitle: '(Jujur & Berintegritas)',
                    desc: 'Menjunjung kebenaran dalam setiap ucapan dan tindakan.',
                    action:
                      'Bendahara menyusun laporan kas acara secara transparan hingga nominal terkecil tanpa manipulasi.',
                    figures: 'Umar bin Abdul Aziz · Bung Hatta & Jend. Hoegeng',
                    Icon: ShieldCheck,
                  },
                  {
                    id: 'karakter-amanah',
                    name: 'Amanah',
                    subtitle: '(Dapat Dipercaya)',
                    desc: 'Bertanggung jawab penuh atas tugas dan janji yang diemban.',
                    action:
                      'Menuntaskan proposal sesuai deadline dan merawat aset sound system/proyektor sekolah hingga kembali utuh.',
                    figures: 'Shalahuddin Al-Ayyubi · Jend. Sudirman & HB IX',
                    Icon: Handshake,
                  },
                  {
                    id: 'karakter-fathanah',
                    name: 'Fathanah',
                    subtitle: '(Cerdas & Solutif)',
                    desc: 'Bijaksana dalam memetakan prioritas dan mengambil keputusan.',
                    action:
                      'Sigap mengalihkan panggung pembukaan ke aula tertutup saat hujan lebat turun tanpa menimbulkan panik.',
                    figures: 'Muhammad Al-Fatih · Prof. Dr. Ing. B.J. Habibie',
                    Icon: Lightbulb,
                  },
                  {
                    id: 'karakter-tabligh',
                    name: 'Tabligh',
                    subtitle: '(Komunikatif & Santun)',
                    desc: 'Menyampaikan pesan kebaikan dengan tutur kata yang jelas dan santun.',
                    action:
                      'Menyosialisasikan tata tertib dan info lomba antarkelas secara persuasif tanpa nada menggurui.',
                    figures: 'Mus’ab bin Umair · K.H. Agus Salim & Ahmad Dahlan',
                    Icon: MessageCircle,
                  },
                ].map((char) => {
                  const IconComp = char.Icon;
                  return (
                    <button
                      key={char.id}
                      onClick={() => setActiveModalKey(char.id)}
                      className="text-left rounded-2xl bg-[#0F223A]/85 backdrop-blur-xl border border-[#D4AF37]/45 hover:border-[#F3C623] transition-all duration-200 p-5 flex flex-col justify-between cursor-pointer group shadow-xl hover:-translate-y-1"
                    >
                      <div>
                        <div className="w-16 h-16 rounded-full border-2 border-[#F3C623] bg-gradient-to-b from-[#D4AF37]/25 to-[#0B192C] flex items-center justify-center mx-auto mb-4 shadow-lg shadow-[#D4AF37]/15 group-hover:scale-105 transition-transform">
                          <IconComp className="w-8 h-8 text-[#F3C623]" />
                        </div>

                        <h3 className="text-xl sm:text-2xl font-extrabold text-[#F3C623] text-center">
                          {char.name}
                        </h3>
                        <p className="text-xs font-bold text-[#F3C623]/90 text-center mb-3">
                          {char.subtitle}
                        </p>

                        <p className="text-xs sm:text-sm text-slate-100 text-center leading-relaxed mb-4">
                          {char.desc}
                        </p>

                        <div className="h-[1px] w-full bg-[#D4AF37]/35 mb-3" />

                        <p className="text-xs text-slate-200 leading-relaxed mb-3">
                          <strong className="text-white">Aksi OSIS:</strong> {char.action}
                        </p>

                        <div className="p-2.5 rounded-xl bg-[#07111E]/85 border border-slate-700/80 text-[11px] text-slate-300">
                          <span className="font-bold text-[#F3C623] block">
                            Tokoh Panutan:
                          </span>
                          {char.figures}
                        </div>
                      </div>

                      <div className="mt-4 pt-2.5 border-t border-[#D4AF37]/20 flex items-center justify-between text-xs font-bold text-[#F3C623]">
                        <span>Lihat Dalil &amp; Detail</span>
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* =========================================================
              SLIDE 6 (idx 5): TOKOH PANUTAN DUNIA & INDONESIA (4 SIFAT NABI)
          ========================================================= */}
          {currentSlide === 5 && (
            <LeaderRoleModelsSlide
              onOpenModal={(modalKey) => setActiveModalKey(modalKey)}
            />
          )}

          {/* =========================================================
              SLIDE 7 (idx 6): LANGKAH PRAKTIS DI LAPANGAN
          ========================================================= */}
          {currentSlide === 6 && (
            <div className="space-y-5">
              <div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
                  Langkah Praktis <span className="text-[#F3C623]">di Lapangan</span>
                </h2>
                <GoldenDivider />
                <p className="text-sm sm:text-lg text-slate-200">
                  Langkah sederhana, dampak besar. Terapkan di setiap kesempatan kepanitiaan.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
                <div className="lg:col-span-9 flex flex-col justify-between gap-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative">
                    {[
                      {
                        num: '01',
                        title: 'Persiapan Matang',
                        desc: 'Rencanakan dengan jelas dan pahami tujuan sebelum bertindak.',
                        aksi: 'Buat rundown terperinci menit per menit, tentukan PIC tiap divisi, dan lakukan gladi bersih H-1.',
                      },
                      {
                        num: '02',
                        title: 'Komunikasi Efektif',
                        desc: 'Sampaikan ide secara lugas dan dengarkan masukan lapangan.',
                        aksi: 'Briefing 10 menit sebelum gerbang dibuka dan gunakan format pesan jelas saat info darurat di grup chat.',
                      },
                      {
                        num: '03',
                        title: 'Manajemen Kesalahan',
                        desc: 'Akui kesalahan, fokus perbaikan cepat, dan hindari menyalahkan rekan.',
                        aksi: 'Saat file presentasi error, MC segera mengisi ice-breaking sementara operator mengunduh file cadangan.',
                      },
                      {
                        num: '04',
                        title: 'Kerjasama Tim',
                        desc: 'Bersatu, saling melengkapi, dan bergerak bersama mencapai target.',
                        aksi: 'Divisi konsumsi yang sudah selesai langsung membantu divisi logistik mengangkat perlengkapan panggung.',
                      },
                    ].map((step, idx) => (
                      <div
                        key={step.num}
                        className="relative rounded-2xl bg-[#0F223A]/85 backdrop-blur-xl border border-[#D4AF37]/45 hover:border-[#F3C623] transition-all p-5 flex flex-col justify-between shadow-lg"
                      >
                        {idx < 3 && (
                          <div
                            aria-hidden="true"
                            className="hidden lg:flex absolute -right-3.5 top-1/2 -translate-y-1/2 z-20 w-5 h-5 rounded-full bg-[#0B192C] border border-[#F3C623] items-center justify-center text-[#F3C623]"
                          >
                            <ChevronRight className="w-3.5 h-3.5" />
                          </div>
                        )}

                        <div>
                          <div className="text-3xl sm:text-4xl font-extrabold text-[#F3C623] font-mono-tabular mb-1.5">
                            {step.num}
                          </div>
                          <h3 className="text-base font-bold text-[#F3C623] mb-3">
                            {step.title}
                          </h3>
                          <div className="h-[1px] w-full bg-[#D4AF37]/30 mb-3" />
                          <p className="text-xs sm:text-sm text-slate-100 leading-relaxed mb-4">
                            {step.desc}
                          </p>
                        </div>

                        <div className="pt-3 border-t border-slate-700/60">
                          <div className="text-xs font-bold text-[#F3C623] mb-1">
                            Aksi:
                          </div>
                          <p className="text-xs text-slate-300 leading-relaxed">
                            {step.aksi}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => setActiveModalKey('unicef-toolkits')}
                    className="w-full text-left rounded-2xl bg-[#0F223A]/90 backdrop-blur-xl border border-[#D4AF37]/55 hover:border-[#F3C623] p-4 sm:px-6 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 cursor-pointer group shadow-lg"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
                      <span className="text-lg sm:text-xl font-extrabold text-[#F3C623] whitespace-nowrap">
                        Baca detail:
                      </span>
                      <div className="hidden sm:block h-9 w-[1px] bg-[#D4AF37]/35" />
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8 text-xs sm:text-sm">
                        <div>
                          <p className="font-extrabold text-white">UNICEF</p>
                          <p className="text-slate-300">
                            Life Skills and Citizenship Education Practical Guides.
                          </p>
                        </div>
                        <div>
                          <p className="font-extrabold text-white">UNICEF</p>
                          <p className="text-slate-300">
                            Community Engagement Toolkit.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="px-4 py-2 rounded-xl bg-[#D4AF37]/15 border border-[#D4AF37]/50 text-xs font-bold text-[#F3C623] group-hover:bg-[#F3C623] group-hover:text-[#0B192C] transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0">
                      <span>Buka Ringkasan Panduan</span>
                      <BookOpen className="w-4 h-4" />
                    </div>
                  </button>
                </div>

                <div className="lg:col-span-3 hidden lg:flex">
                  <OsisLeaderVisualCard
                    imageSrc="/assets/aistudio/osis_leader_closing.jpg"
                    caption="Kepanitiaan Solid & Tangguh"
                    subcaption="Langkah Praktis OSIS"
                    compact
                  />
                </div>
              </div>
            </div>
          )}

          {/* =========================================================
              SLIDE 8 (idx 7): AKTIVITAS INTERAKTIF SESI
          ========================================================= */}
          {currentSlide === 7 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
                  Aktivitas <span className="text-[#F3C623]">Interaktif Sesi</span>
                </h2>
                <GoldenDivider />
                <p className="text-sm sm:text-lg text-slate-200">
                  Menerjemahkan teori kepemimpinan menjadi pemahaman dan aksi nyata.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
                {/* Card 1: Sesi 1 - 10 Menit */}
                <div className="rounded-2xl bg-[#0F223A]/85 backdrop-blur-xl border border-[#D4AF37]/45 hover:border-[#F3C623] transition-all p-6 sm:p-8 flex flex-col justify-between shadow-xl">
                  <div>
                    <div className="flex items-center justify-center mb-5">
                      <span className="px-5 py-1.5 rounded-lg bg-gradient-to-r from-[#D4AF37] to-[#F3C623] text-[#0B192C] text-xs sm:text-sm font-extrabold shadow-sm">
                        Sesi 1 - 10 Menit
                      </span>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 mb-5">
                      <div className="w-20 h-20 rounded-2xl border border-[#D4AF37]/50 bg-[#0B192C]/80 flex items-center justify-center shrink-0">
                        <UserCheck className="w-10 h-10 text-[#F3C623]" />
                      </div>
                      <div className="text-center sm:text-left">
                        <h3 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight mb-2">
                          Refleksi Diri (Muhasabah)
                        </h3>
                        <div className="h-[1px] w-full bg-[#D4AF37]/35 mb-3" />
                        <p className="text-sm text-slate-200 leading-relaxed">
                          Mengenali kelebihan unik dan menaklukkan rasa takut memimpin.
                        </p>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-[#0B192C]/75 border border-[#D4AF37]/30 mb-4">
                      <p className="text-xs sm:text-sm font-bold text-[#F3C623] mb-1.5">
                        Tulis di buku catatan (atau lembar interaktif di bawah):
                      </p>
                      <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                        (1) Satu kelebihan yang paling sering dihargai teman, (2) Satu ketakutan terbesar saat memegang tanggung jawab, dan cara mengatasinya.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
                      <div>
                        <label className="block text-[11px] font-semibold text-[#F3C623] mb-1">
                          1. Kelebihan Unikku:
                        </label>
                        <input
                          type="text"
                          value={muhasabahStrength}
                          onChange={(e) => setMuhasabahStrength(e.target.value)}
                          placeholder="Cth: Teliti menyusun jadwal & sabar..."
                          className="w-full px-3 py-2 rounded-lg bg-[#07111E]/90 border border-slate-700 focus:border-[#F3C623] focus:outline-none text-xs text-slate-100 placeholder:text-slate-500"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-[#F3C623] mb-1">
                          2. Ketakutan &amp; Cara Mengatasi:
                        </label>
                        <input
                          type="text"
                          value={muhasabahFear}
                          onChange={(e) => setMuhasabahFear(e.target.value)}
                          placeholder="Cth: Gugup bicara -> latihan poin inti..."
                          className="w-full px-3 py-2 rounded-lg bg-[#07111E]/90 border border-slate-700 focus:border-[#F3C623] focus:outline-none text-xs text-slate-100 placeholder:text-slate-500"
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() =>
                      openSessionTimer(
                        10,
                        'Sesi 1: Refleksi Diri (Muhasabah)',
                        'Tuliskan: (1) Satu kelebihan yang paling sering dihargai teman, (2) Satu ketakutan terbesar saat memegang tanggung jawab & cara mengatasinya.',
                        false
                      )
                    }
                    className="w-full py-3.5 px-5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#F3C623] text-[#0B192C] font-extrabold text-sm hover:brightness-110 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                  >
                    <Timer className="w-4 h-4" />
                    <span>Buka Timer 10 Menit Interaktif</span>
                  </button>
                </div>

                {/* Card 2: Sesi 2 - 15 Menit */}
                <div className="rounded-2xl bg-[#0F223A]/85 backdrop-blur-xl border border-[#D4AF37]/45 hover:border-[#F3C623] transition-all p-6 sm:p-8 flex flex-col justify-between shadow-xl">
                  <div>
                    <div className="flex items-center justify-center mb-5">
                      <span className="px-5 py-1.5 rounded-lg bg-gradient-to-r from-[#D4AF37] to-[#F3C623] text-[#0B192C] text-xs sm:text-sm font-extrabold shadow-sm">
                        Sesi 2 - 15 Menit
                      </span>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 mb-5">
                      <div className="w-20 h-20 rounded-2xl border border-[#D4AF37]/50 bg-[#0B192C]/80 flex items-center justify-center shrink-0">
                        <Users className="w-10 h-10 text-[#F3C623]" />
                      </div>
                      <div className="text-center sm:text-left">
                        <h3 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight mb-2">
                          Studi Kasus Lapangan
                        </h3>
                        <div className="h-[1px] w-full bg-[#D4AF37]/35 mb-3" />
                        <p className="text-sm text-slate-200 leading-relaxed">
                          Problem solving cepat berlandaskan karakter Shiddiq, Amanah, Fathanah, Tabligh.
                        </p>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-[#0B192C]/75 border border-[#D4AF37]/30 mb-4">
                      <p className="text-xs sm:text-sm font-bold text-[#F3C623] mb-1.5">
                        Skenario:
                      </p>
                      <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                        “Dua hari jelang event, anggaran berkurang 50% dan koordinasi antar-divisi macet. Rumuskan 3 langkah konkret pemecahan masalah dalam tim!”
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mb-5">
                      <input
                        type="text"
                        value={caseStep1}
                        onChange={(e) => setCaseStep1(e.target.value)}
                        placeholder="Langkah 1 (Komunikasi)..."
                        className="w-full px-3 py-2 rounded-lg bg-[#07111E]/90 border border-slate-700 focus:border-[#F3C623] focus:outline-none text-xs text-slate-100 placeholder:text-slate-500"
                      />
                      <input
                        type="text"
                        value={caseStep2}
                        onChange={(e) => setCaseStep2(e.target.value)}
                        placeholder="Langkah 2 (Anggaran)..."
                        className="w-full px-3 py-2 rounded-lg bg-[#07111E]/90 border border-slate-700 focus:border-[#F3C623] focus:outline-none text-xs text-slate-100 placeholder:text-slate-500"
                      />
                      <input
                        type="text"
                        value={caseStep3}
                        onChange={(e) => setCaseStep3(e.target.value)}
                        placeholder="Langkah 3 (Eksekusi)..."
                        className="w-full px-3 py-2 rounded-lg bg-[#07111E]/90 border border-slate-700 focus:border-[#F3C623] focus:outline-none text-xs text-slate-100 placeholder:text-slate-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      onClick={() =>
                        openSessionTimer(
                          15,
                          'Sesi 2: Studi Kasus Lapangan (15 Menit)',
                          'Skenario H-2: Anggaran berkurang 50% & koordinasi antar-divisi macet. Rumuskan 3 langkah konkret pemecahan masalah dalam tim!',
                          true
                        )
                      }
                      className="py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#F3C623] text-[#0B192C] font-extrabold text-xs sm:text-sm hover:brightness-110 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                    >
                      <Timer className="w-4 h-4 shrink-0" />
                      <span>Buka Panduan &amp; Timer 15 Menit</span>
                    </button>
                    <button
                      onClick={() => setActiveModalKey('panduan-studi-kasus')}
                      className="py-3.5 px-4 rounded-xl border border-[#D4AF37]/60 bg-[#0B192C]/80 text-[#F3C623] font-bold text-xs sm:text-sm hover:bg-[#D4AF37]/15 hover:border-[#F3C623] transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <CheckCircle2 className="w-4 h-4 shrink-0" />
                      <span>Kunci Jawaban Studi Kasus</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* =========================================================
              SLIDE 9 (idx 8): PENUTUP & TANYA JAWAB
          ========================================================= */}
          {currentSlide === 8 && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
              <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
                <div>
                  <h2 className="text-3xl sm:text-5xl lg:text-[3.25rem] font-extrabold text-white leading-[1.12] tracking-tight">
                    Memimpin dengan Hati,
                    <br />
                    <span className="text-[#F3C623]">Menjadi Teladan Sejati</span>
                  </h2>

                  <GoldenDivider />

                  <blockquote className="text-base sm:text-xl lg:text-2xl text-slate-100 leading-relaxed font-normal">
                    “Jadilah pemimpin yang menginspirasi, membawa kebaikan di mana pun berada, dan meninggalkan jejak kebaikan abadi.”
                  </blockquote>
                </div>

                <div className="rounded-2xl bg-[#0F223A]/85 backdrop-blur-xl border border-[#D4AF37]/55 p-6 sm:p-8 space-y-4 shadow-2xl">
                  <h3 className="text-xl sm:text-2xl font-extrabold text-[#F3C623] tracking-wide uppercase">
                    RUANG DISKUSI &amp; TANYA JAWAB
                  </h3>

                  <div className="flex items-center gap-2">
                    <span className="text-[#D4AF37] text-xs">◇</span>
                    <div className="h-[1px] w-full bg-gradient-to-r from-[#D4AF37] to-transparent" />
                  </div>

                  <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
                    Kami membuka ruang interaksi. Silakan ajukan pertanyaan, bagikan tantangan di kepengurusan, atau sampaikan gagasan terbaik Anda.
                  </p>

                  <div className="pt-3 flex flex-wrap items-center gap-3">
                    <button
                      onClick={() => setActiveModalKey('faq-kepemimpinan')}
                      className="px-5 py-3.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#F3C623] text-[#0B192C] font-extrabold text-xs sm:text-sm hover:brightness-110 transition-all flex items-center gap-2 cursor-pointer shadow-lg"
                    >
                      <HelpCircle className="w-4 h-4 shrink-0" />
                      <span>FAQ / Pertanyaan Umum Seputar Kepemimpinan OSIS</span>
                    </button>

                    <button
                      onClick={() => goToSlide(0)}
                      className="px-4 py-3.5 rounded-xl border border-[#D4AF37]/45 bg-[#0B192C]/70 text-xs sm:text-sm font-semibold text-slate-200 hover:border-[#F3C623] hover:text-[#F3C623] transition-all flex items-center gap-2 cursor-pointer"
                    >
                      <RotateCcw className="w-4 h-4" />
                      <span>Ulangi dari Slide 1</span>
                    </button>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 flex items-stretch">
                <OsisLeaderVisualCard
                  imageSrc="/assets/aistudio/osis_leader_closing.jpg"
                  caption="Terima Kasih · Salam Kepemimpinan OSIS"
                  subcaption="Pemateri: Abu Haripin, M.Pd."
                />
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Bottom Floating Navigation & Slide Indicator Bar */}
      <footer className="relative z-20 px-6 lg:px-12 py-3.5 border-t border-[#D4AF37]/25 bg-[#0B192C]/90 backdrop-blur-md flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 text-xs sm:text-sm">
          <span className="font-mono-tabular font-bold text-[#F3C623]">
            Slide {currentSlide + 1} dari {totalSlides}
          </span>
          <span className="text-slate-600 hidden md:inline">·</span>
          <span className="text-slate-300 hidden md:inline font-medium">
            {SLIDE_TITLES[currentSlide]}
          </span>
          <span className="text-slate-600 hidden xl:inline">·</span>
          <span className="text-slate-400 hidden xl:inline text-xs">
            Pemateri: <strong className="text-slate-200">Abu Haripin, M.Pd.</strong>
          </span>
        </div>

        {/* Center: Dot Navigation */}
        <div
          className="flex items-center gap-2"
          role="tablist"
          aria-label="Navigasi Slide"
        >
          {SLIDE_TITLES.map((title, idx) => (
            <button
              key={title}
              onClick={() => goToSlide(idx)}
              aria-label={`Buka ${title}`}
              title={title}
              className={`h-2.5 rounded-full transition-all duration-200 cursor-pointer ${
                currentSlide === idx
                  ? 'w-8 bg-[#F3C623] shadow-sm shadow-[#F3C623]/50'
                  : 'w-2.5 bg-slate-600 hover:bg-[#D4AF37]/70'
              }`}
            />
          ))}
        </div>

        {/* Right: Prev / Next Buttons */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className="px-3.5 py-2 rounded-xl border border-[#D4AF37]/45 bg-[#132238]/80 text-xs font-bold text-slate-100 hover:border-[#F3C623] hover:text-[#F3C623] disabled:opacity-35 disabled:pointer-events-none transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Sebelumnya</span>
          </button>
          <button
            onClick={nextSlide}
            disabled={currentSlide === totalSlides - 1}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#F3C623] text-[#0B192C] text-xs font-extrabold hover:brightness-110 disabled:opacity-35 disabled:pointer-events-none transition-all flex items-center gap-1.5 cursor-pointer shadow-md whitespace-nowrap"
          >
            <span className="hidden sm:inline">Selanjutnya</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </footer>

      {/* =========================================================
          POP-UP MODAL: AL-QUR'AN, HADITS, PRINSIP, KARAKTER, TOKOH, UNICEF, FAQ
      ========================================================= */}
      {activeModalData && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-md"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeAllModals();
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            className="w-full max-w-2xl max-h-[88vh] overflow-y-auto rounded-2xl bg-gradient-to-b from-[#132238] to-[#0B192C] border border-[#D4AF37]/65 p-6 sm:p-8 text-slate-100 shadow-2xl animate-modal-enter"
          >
            <div className="flex items-start justify-between gap-4 mb-3">
              <div className="text-xs font-bold uppercase tracking-wider text-[#F3C623]">
                {activeModalData.badge}
              </div>
              <button
                onClick={closeAllModals}
                aria-label="Tutup modal"
                className="p-1.5 rounded-lg border border-slate-700 text-slate-300 hover:text-white hover:border-[#F3C623] transition-colors cursor-pointer shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <h3
              id="modal-title"
              className="text-xl sm:text-2xl font-extrabold text-white leading-snug mb-1.5"
            >
              {activeModalData.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mb-5">
              {activeModalData.subtitle}
            </p>

            {activeModalData.arabic && (
              <div className="rounded-2xl bg-[#07111E]/95 border border-[#D4AF37]/45 p-5 sm:p-6 mb-6 space-y-4">
                <p
                  dir="rtl"
                  lang="ar"
                  className="font-arabic text-2xl sm:text-3xl text-[#F3C623] text-right leading-[2.2]"
                >
                  {activeModalData.arabic}
                </p>
                {activeModalData.latin && (
                  <p className="text-xs sm:text-sm text-amber-200/90 italic leading-relaxed">
                    {activeModalData.latin}
                  </p>
                )}
                <div className="h-[1px] w-full bg-[#D4AF37]/25" />
                {activeModalData.translation && (
                  <p className="text-xs sm:text-sm text-slate-100 leading-relaxed font-medium">
                    {activeModalData.translation}
                  </p>
                )}
              </div>
            )}

            {activeModalData.faqItems && activeModalData.faqItems.length > 0 && (
              <div className="space-y-4 mb-6">
                {activeModalData.faqItems.map((faq, idx) => (
                  <div
                    key={idx}
                    className="rounded-xl bg-[#07111E]/85 border border-[#D4AF37]/35 p-4 sm:p-5 space-y-2.5"
                  >
                    <h4 className="text-sm sm:text-base font-bold text-[#F3C623] leading-snug">
                      {faq.question}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                      {faq.answer}
                    </p>
                    <div className="pt-2 border-t border-slate-800 text-xs text-emerald-300 font-medium">
                      {faq.practicalTip}
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="space-y-3 mb-6">
              <h4 className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-[#F3C623]">
                {activeModalData.reflectionTitle}
              </h4>
              <ul className="space-y-2.5">
                {activeModalData.reflectionPoints.map((pt, i) => (
                  <li
                    key={i}
                    className="text-xs sm:text-sm text-slate-200 leading-relaxed flex items-start gap-2.5"
                  >
                    <span className="text-[#F3C623] font-bold mt-0.5 shrink-0">
                      ◇
                    </span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl bg-[#D4AF37]/15 border border-[#D4AF37]/50 p-4 flex items-start justify-between gap-4">
              <p className="text-xs sm:text-sm text-slate-100 leading-relaxed">
                <strong className="text-[#F3C623]">Komitmen Aksi Nyata: </strong>
                {activeModalData.actionableTakeaway}
              </p>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={closeAllModals}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#F3C623] text-[#0B192C] font-extrabold text-xs sm:text-sm hover:brightness-110 transition-all cursor-pointer"
              >
                Tutup (Esc)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================
          POP-UP MODAL: INTERACTIVE COUNTDOWN TIMER (SESI 1 & SESI 2)
      ========================================================= */}
      {timerModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-md"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeAllModals();
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-gradient-to-b from-[#132238] to-[#0B192C] border border-[#D4AF37]/65 p-6 sm:p-8 text-slate-100 shadow-2xl animate-modal-enter"
          >
            <div className="flex items-start justify-between gap-4 mb-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#F3C623]">
                <Clock className="w-4 h-4" />
                <span>Countdown Timer Aktivitas LDKS OSIS</span>
              </div>
              <button
                onClick={closeAllModals}
                aria-label="Tutup timer"
                className="p-1.5 rounded-lg border border-slate-700 text-slate-300 hover:text-white hover:border-[#F3C623] transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <h3 className="text-xl sm:text-2xl font-extrabold text-white mb-1.5">
              {timerModal.sessionTitle}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mb-6 leading-relaxed">
              {timerModal.sessionSubtitle}
            </p>

            <div className="rounded-2xl bg-[#07111E]/95 border border-[#D4AF37]/50 p-6 sm:p-8 text-center mb-6 relative overflow-hidden">
              <div className="text-6xl sm:text-7xl font-extrabold font-mono-tabular text-[#F3C623] tracking-wider mb-2">
                {formatTimer(secondsLeft)}
              </div>
              <p className="text-xs sm:text-sm font-medium text-slate-300">
                {secondsLeft === 0
                  ? 'Waktu Selesai! Silakan perwakilan memaparkan hasil refleksi/diskusi.'
                  : isTimerRunning
                  ? 'Sesi sedang berjalan — fokus dan kolaboratif!'
                  : 'Tekan "Mulai Timer" untuk memulai hitungan mundur'}
              </p>

              <div className="mt-5 h-2 w-full rounded-full bg-slate-800 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#D4AF37] to-[#F3C623] transition-all duration-500"
                  style={{
                    width: `${Math.max(
                      0,
                      Math.min(
                        100,
                        (secondsLeft / (timerModal.durationMinutes * 60)) * 100
                      )
                    )}%`,
                  }}
                />
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
              <button
                onClick={() => setIsTimerRunning((prev) => !prev)}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#F3C623] text-[#0B192C] font-extrabold text-sm hover:brightness-110 transition-all flex items-center gap-2 cursor-pointer shadow-lg"
              >
                {isTimerRunning ? (
                  <>
                    <Pause className="w-4 h-4" />
                    <span>Jeda Timer</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4" />
                    <span>
                      {secondsLeft < timerModal.durationMinutes * 60
                        ? 'Lanjutkan Timer'
                        : 'Mulai Timer'}
                    </span>
                  </>
                )}
              </button>

              <button
                onClick={() => {
                  setIsTimerRunning(false);
                  setSecondsLeft(timerModal.durationMinutes * 60);
                }}
                className="px-4 py-3 rounded-xl border border-[#D4AF37]/50 bg-[#0B192C]/80 text-xs sm:text-sm font-bold text-slate-200 hover:border-[#F3C623] hover:text-[#F3C623] transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reset ({timerModal.durationMinutes} Menit)</span>
              </button>
            </div>

            {timerModal.includeCaseGuide && (
              <div className="rounded-xl bg-[#07111E]/90 border border-[#D4AF37]/40 p-5 space-y-3">
                <div className="text-xs font-extrabold uppercase tracking-wider text-[#F3C623]">
                  Panduan Penyelesaian Berbasis 4 Sifat Nabi:
                </div>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-200 leading-relaxed">
                  <li>
                    <strong className="text-[#F3C623]">
                      1. Konsolidasi Jujur &amp; Komunikatif (Shiddiq &amp; Tabligh):
                    </strong>{' '}
                    Gelar briefing darurat 15 menit bersama seluruh koordinator divisi, buka data pemangkasan anggaran 50% secara transparan, dan hilangkan sekat miskomunikasi tanpa saling menyalahkan.
                  </li>
                  <li>
                    <strong className="text-[#F3C623]">
                      2. Realokasi Prioritas Inti (Fathanah):
                    </strong>{' '}
                    Pangkas item dekorasi/atribut seremonial non-esensial, manfaatkan inventaris sekolah yang bebas biaya, dan amankan anggaran untuk substansi utama acara.
                  </li>
                  <li>
                    <strong className="text-[#F3C623]">
                      3. Penataan Ulang PIC &amp; Back-up Tim (Amanah):
                    </strong>{' '}
                    Sepakati pembagian tugas H-2 hingga hari-H secara tertulis dan terapkan sistem saling back-up lintas divisi.
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

/* ============================================================================
   HELPER SUBCOMPONENTS
============================================================================ */

function GoldenDivider() {
  return (
    <div className="flex items-center gap-2 my-2.5" aria-hidden="true">
      <span className="text-[#D4AF37] text-sm leading-none">◇</span>
      <div className="h-[1.5px] w-72 sm:w-96 bg-gradient-to-r from-[#D4AF37] via-[#F3C623]/50 to-transparent" />
    </div>
  );
}

function OsisLeaderVisualCard({
  imageSrc,
  caption,
  subcaption,
  compact = false,
}: {
  imageSrc: string;
  caption: string;
  subcaption: string;
  compact?: boolean;
}) {
  const [imgError, setImgError] = useState(false);

  return (
    <div
      className={`relative w-full ${
        compact ? 'min-h-[360px]' : 'min-h-[420px] lg:min-h-[500px]'
      } rounded-2xl overflow-hidden border border-[#D4AF37]/55 bg-gradient-to-b from-[#132238] via-[#0F223A] to-[#0B192C] shadow-2xl flex flex-col justify-end group`}
    >
      {!imgError ? (
        <img
          src={imageSrc}
          alt="Representasi Pemimpin Muda OSIS Berpeci dan Berjas OSIS"
          referrerPolicy="no-referrer"
          onError={() => setImgError(true)}
          className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.02]"
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-gradient-to-b from-[#132238] to-[#0B192C]">
          <div className="w-24 h-24 rounded-full border-2 border-[#D4AF37] bg-[#D4AF37]/15 flex items-center justify-center mb-4">
            <ShieldCheck className="w-12 h-12 text-[#F3C623]" />
          </div>
          <p className="text-base font-extrabold text-[#F3C623]">
            OSIS Berkarakter Khalifah
          </p>
          <p className="text-xs text-slate-300 mt-1">
            Pemimpin Muda Berintegritas, Berdaya &amp; Menginspirasi
          </p>
        </div>
      )}

      <div className="relative z-10 bg-gradient-to-t from-[#07111E] via-[#07111E]/85 to-transparent pt-14 pb-4 px-5">
        <p className="text-xs sm:text-sm font-bold text-[#F3C623] leading-snug">
          {caption}
        </p>
        <p className="text-[11px] text-slate-200 mt-0.5 whitespace-nowrap">
          {subcaption}
        </p>
      </div>
    </div>
  );
}
