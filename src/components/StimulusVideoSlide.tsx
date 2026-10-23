import React, { useState, useEffect, useRef } from 'react';
import {
  BookOpen,
  ChevronRight,
  Compass,
  ExternalLink,
  FileVideo,
  Flame,
  Film,
  Maximize2,
  Pause,
  Play,
  RotateCcw,
  ShieldCheck,
  SkipBack,
  SkipForward,
  Smartphone,
  Sparkles,
  Upload,
  Volume2,
  VolumeX,
  Youtube,
} from 'lucide-react';
import { STIMULUS_VIDEO_SCENES } from '../data/presentationData';

interface StimulusVideoSlideProps {
  onOpenModal: (modalKey: string) => void;
  onProceedToMaterial: () => void;
}

interface PortraitShortItem {
  id: string;
  videoId: string;
  label: string;
  title: string;
  subtitle: string;
  shortUrl: string;
}

const PORTRAIT_SHORTS: PortraitShortItem[] = [
  {
    id: 'short-1',
    videoId: '1_ufYAMlYC0',
    label: 'Video Stimulus 01 · Portrait Short',
    title: 'Kisah Teladan Kepemimpinan Islam #1',
    subtitle: 'Keteladanan, Integritas & Amanah Pemimpin Panutan',
    shortUrl: 'https://www.youtube.com/shorts/1_ufYAMlYC0',
  },
  {
    id: 'short-2',
    videoId: 'fJBQoO1oTEY',
    label: 'Video Stimulus 02 · Portrait Short',
    title: 'Kisah Teladan Kepemimpinan Islam #2',
    subtitle: 'Visi, Keberanian & Akhlak Mulia di Masa Kejayaan Islam',
    shortUrl: 'https://www.youtube.com/shorts/fJBQoO1oTEY',
  },
];

export default function StimulusVideoSlide({
  onOpenModal,
  onProceedToMaterial,
}: StimulusVideoSlideProps) {
  // Default to 'youtube' so the 2 portrait videos are immediately visible
  const [playerMode, setPlayerMode] = useState<'youtube' | 'cinematic' | 'local'>('youtube');
  const [focusedShortId, setFocusedShortId] = useState<'both' | 'short-1' | 'short-2'>('both');

  // Cinematic Storyboard states
  const [currentSceneIdx, setCurrentSceneIdx] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [sceneElapsed, setSceneElapsed] = useState<number>(0);
  const [voiceEnabled, setVoiceEnabled] = useState<boolean>(false);

  // Local Video states
  const [localVideoUrl, setLocalVideoUrl] = useState<string | null>(null);
  const [localVideoName, setLocalVideoName] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const currentScene = STIMULUS_VIDEO_SCENES[currentSceneIdx];

  // Speech synthesis helper for Indonesian narration
  const speakScene = (text: string) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'id-ID';
    utterance.rate = 0.98;
    window.speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    if (isPlaying && voiceEnabled && playerMode === 'cinematic') {
      speakScene(`${currentScene.title}. ${currentScene.narration} ${currentScene.quote}`);
    } else if (!isPlaying && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [currentSceneIdx, isPlaying, voiceEnabled, playerMode, currentScene]);

  // Auto-advance scenes when playing in cinematic mode
  useEffect(() => {
    if (!isPlaying || playerMode !== 'cinematic') return;

    const timer = window.setInterval(() => {
      setSceneElapsed((prev) => {
        if (prev + 1 >= currentScene.durationSec) {
          if (currentSceneIdx < STIMULUS_VIDEO_SCENES.length - 1) {
            setCurrentSceneIdx((idx) => idx + 1);
            return 0;
          } else {
            setIsPlaying(false);
            return currentScene.durationSec;
          }
        }
        return prev + 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isPlaying, playerMode, currentSceneIdx, currentScene.durationSec]);

  const handleSelectScene = (index: number) => {
    setCurrentSceneIdx(index);
    setSceneElapsed(0);
  };

  const handleLocalFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (localVideoUrl) {
      URL.revokeObjectURL(localVideoUrl);
    }
    const url = URL.createObjectURL(file);
    setLocalVideoUrl(url);
    setLocalVideoName(file.name);
  };

  const progressPercent = Math.min(
    100,
    Math.round((sceneElapsed / currentScene.durationSec) * 100)
  );

  const visibleShorts =
    focusedShortId === 'both'
      ? PORTRAIT_SHORTS
      : PORTRAIT_SHORTS.filter((item) => item.id === focusedShortId);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-3">
        <div>
          <div className="text-xs font-bold uppercase tracking-widest text-[#F3C623] mb-1">
            PENGANTAR SEBELUM MATERI UTAMA · VIDEO STIMULUS KEPEMIMPINAN
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-[2.55rem] font-extrabold tracking-tight text-white leading-tight">
            Kisah Kepemimpinan <span className="text-[#F3C623]">Masa Kejayaan Islam</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-200 mt-1">
            Simak dua video singkat (format potret 9:16) tentang keteladanan pemimpin panutan di masa kejayaan Islam sebelum memasuki materi inti.
          </p>
        </div>

        {/* Mode Switcher Tabs */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#07111E]/90 border border-[#D4AF37]/40 self-start">
          <button
            onClick={() => {
              setPlayerMode('youtube');
              setIsPlaying(false);
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
              playerMode === 'youtube'
                ? 'bg-gradient-to-r from-[#D4AF37] to-[#F3C623] text-[#0B192C] shadow-sm'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>2 Video Portrait (Shorts)</span>
          </button>
          <button
            onClick={() => {
              setPlayerMode('cinematic');
              setIsPlaying(false);
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
              playerMode === 'cinematic'
                ? 'bg-gradient-to-r from-[#D4AF37] to-[#F3C623] text-[#0B192C] shadow-sm'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <Film className="w-3.5 h-3.5" />
            <span>Narasi Storyboard</span>
          </button>
          <button
            onClick={() => {
              setPlayerMode('local');
              setIsPlaying(false);
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
              playerMode === 'local'
                ? 'bg-gradient-to-r from-[#D4AF37] to-[#F3C623] text-[#0B192C] shadow-sm'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <FileVideo className="w-3.5 h-3.5" />
            <span>Video Lokal (.mp4)</span>
          </button>
        </div>
      </div>

      {/* Main 12-Column Split: Left 7 Cols Portrait Video Stage + Right 5 Cols Kisah & Refleksi */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        {/* LEFT 7 COLUMNS: PORTRAIT VIDEO STAGE */}
        <div className="lg:col-span-7 rounded-2xl bg-[#091526]/95 border border-[#D4AF37]/55 shadow-2xl flex flex-col justify-between overflow-hidden">
          {playerMode === 'youtube' && (
            <div className="flex flex-col justify-between h-full p-4 sm:p-5 space-y-4">
              {/* Top Controls Bar for Portrait Layout */}
              <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-[#D4AF37]/25">
                <div className="flex items-center gap-2 text-xs font-bold text-[#F3C623]">
                  <Youtube className="w-4 h-4 text-[#F3C623]" />
                  <span>Tampilan Layar Potret (9:16 Vertical Shorts)</span>
                </div>

                <div className="flex items-center gap-1.5 bg-[#07111E] p-1 rounded-lg border border-slate-800">
                  <button
                    onClick={() => setFocusedShortId('both')}
                    className={`px-2.5 py-1 rounded text-[11px] font-bold transition-colors cursor-pointer whitespace-nowrap ${
                      focusedShortId === 'both'
                        ? 'bg-[#F3C623] text-[#0B192C]'
                        : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    Tampil 2 Video Sejajar
                  </button>
                  <button
                    onClick={() => setFocusedShortId('short-1')}
                    className={`px-2.5 py-1 rounded text-[11px] font-bold transition-colors cursor-pointer whitespace-nowrap ${
                      focusedShortId === 'short-1'
                        ? 'bg-[#F3C623] text-[#0B192C]'
                        : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    Fokus Video 1
                  </button>
                  <button
                    onClick={() => setFocusedShortId('short-2')}
                    className={`px-2.5 py-1 rounded text-[11px] font-bold transition-colors cursor-pointer whitespace-nowrap ${
                      focusedShortId === 'short-2'
                        ? 'bg-[#F3C623] text-[#0B192C]'
                        : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    Fokus Video 2
                  </button>
                </div>
              </div>

              {/* Dual Portrait (9:16) Frames Container */}
              <div
                className={`grid ${
                  focusedShortId === 'both'
                    ? 'grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6'
                    : 'grid-cols-1 max-w-[290px] mx-auto w-full'
                } items-center justify-items-center my-auto`}
              >
                {visibleShorts.map((short, idx) => (
                  <div
                    key={short.id}
                    className="w-full max-w-[255px] flex flex-col items-center rounded-2xl bg-[#07111E] border-2 border-[#D4AF37]/60 shadow-xl overflow-hidden group"
                  >
                    {/* Phone-style Top Notch / Header Bar */}
                    <div className="w-full px-3 py-2 bg-[#0B192C] border-b border-[#D4AF37]/30 flex items-center justify-between gap-2">
                      <span className="text-[11px] font-extrabold text-[#F3C623] truncate">
                        Video 0{idx + 1} · Shorts
                      </span>
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() =>
                            setFocusedShortId(
                              focusedShortId === short.id ? 'both' : (short.id as 'short-1' | 'short-2')
                            )
                          }
                          title={
                            focusedShortId === short.id
                              ? 'Tampilkan keduanya'
                              : 'Perbesar video ini'
                          }
                          className="text-slate-300 hover:text-[#F3C623] transition-colors cursor-pointer"
                        >
                          <Maximize2 className="w-3.5 h-3.5" />
                        </button>
                        <a
                          href={short.shortUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="Buka di tab baru YouTube"
                          className="text-slate-300 hover:text-[#F3C623] transition-colors"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>

                    {/* True 9:16 Vertical Portrait Video Frame */}
                    <div className="relative w-full aspect-[9/16] max-h-[370px] bg-black overflow-hidden">
                      <iframe
                        className="w-full h-full border-0"
                        src={`https://www.youtube.com/embed/${short.videoId}?rel=0&modestbranding=1&playsinline=1`}
                        title={short.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                      />
                    </div>

                    {/* Bottom Caption Bar inside Portrait Frame */}
                    <div className="w-full px-3 py-2 bg-[#0B192C]/95 border-t border-[#D4AF37]/25 text-center">
                      <p className="text-xs font-bold text-white truncate">
                        {short.title}
                      </p>
                      <p className="text-[10px] text-slate-300 truncate">
                        {short.subtitle}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {playerMode === 'cinematic' && (
            <>
              <div className="relative min-h-[280px] sm:min-h-[320px] p-6 sm:p-8 flex flex-col justify-between bg-gradient-to-br from-[#07111E] via-[#10233E] to-[#0B192C] overflow-hidden">
                <SceneVisualIllustration
                  theme={currentScene.visualTheme}
                  isPlaying={isPlaying}
                />

                <div className="relative z-10 flex items-center justify-between gap-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#F3C623]">
                    {currentScene.eraBadge}
                  </span>
                  <span className="text-xs font-mono-tabular text-slate-300">
                    Babak {currentScene.id} / {STIMULUS_VIDEO_SCENES.length} ·{' '}
                    {currentScene.keyTrait}
                  </span>
                </div>

                <div className="relative z-10 my-auto py-4 space-y-3 max-w-2xl">
                  <h3 className="text-xl sm:text-2xl font-extrabold text-white leading-snug">
                    {currentScene.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-100 leading-relaxed">
                    {currentScene.narration}
                  </p>
                  <blockquote className="p-3.5 rounded-xl bg-[#07111E]/85 border border-[#D4AF37]/45 text-xs sm:text-sm text-[#F3C623] italic leading-relaxed">
                    {currentScene.quote}
                  </blockquote>
                </div>

                <div className="relative z-10 space-y-1.5">
                  <div className="h-1.5 w-full rounded-full bg-slate-800 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#D4AF37] to-[#F3C623] transition-all duration-500"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="px-5 py-3.5 bg-[#07111E] border-t border-[#D4AF37]/30 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      if (
                        sceneElapsed >= currentScene.durationSec &&
                        currentSceneIdx === STIMULUS_VIDEO_SCENES.length - 1
                      ) {
                        setCurrentSceneIdx(0);
                        setSceneElapsed(0);
                      }
                      setIsPlaying((prev) => !prev);
                    }}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#F3C623] text-[#0B192C] font-extrabold text-xs flex items-center gap-1.5 cursor-pointer hover:brightness-110 transition-all shadow-md"
                  >
                    {isPlaying ? (
                      <>
                        <Pause className="w-3.5 h-3.5" />
                        <span>Jeda Cerita</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-3.5 h-3.5" />
                        <span>Putar Cerita Stimulus</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() =>
                      handleSelectScene(Math.max(0, currentSceneIdx - 1))
                    }
                    disabled={currentSceneIdx === 0}
                    aria-label="Babak sebelumnya"
                    className="p-2 rounded-lg border border-slate-700 text-slate-200 hover:border-[#F3C623] disabled:opacity-35 cursor-pointer"
                  >
                    <SkipBack className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() =>
                      handleSelectScene(
                        Math.min(
                          STIMULUS_VIDEO_SCENES.length - 1,
                          currentSceneIdx + 1
                        )
                      )
                    }
                    disabled={currentSceneIdx === STIMULUS_VIDEO_SCENES.length - 1}
                    aria-label="Babak selanjutnya"
                    className="p-2 rounded-lg border border-slate-700 text-slate-200 hover:border-[#F3C623] disabled:opacity-35 cursor-pointer"
                  >
                    <SkipForward className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => {
                      setIsPlaying(false);
                      setCurrentSceneIdx(0);
                      setSceneElapsed(0);
                    }}
                    aria-label="Ulangi dari babak 1"
                    className="p-2 rounded-lg border border-slate-700 text-slate-300 hover:border-[#F3C623] cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <div className="hidden sm:flex items-center gap-1">
                    {STIMULUS_VIDEO_SCENES.map((sc, i) => (
                      <button
                        key={sc.id}
                        onClick={() => handleSelectScene(i)}
                        className={`w-6 h-6 rounded-md text-[11px] font-mono-tabular font-bold transition-colors cursor-pointer ${
                          currentSceneIdx === i
                            ? 'bg-[#F3C623] text-[#0B192C]'
                            : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                        }`}
                      >
                        {sc.id}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => setVoiceEnabled((prev) => !prev)}
                    className={`px-3 py-1.5 rounded-lg border text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors ${
                      voiceEnabled
                        ? 'border-[#F3C623] bg-[#D4AF37]/20 text-[#F3C623]'
                        : 'border-slate-700 text-slate-300 hover:border-slate-500'
                    }`}
                  >
                    {voiceEnabled ? (
                      <>
                        <Volume2 className="w-3.5 h-3.5" />
                        <span>Narator Aktif</span>
                      </>
                    ) : (
                      <>
                        <VolumeX className="w-3.5 h-3.5" />
                        <span>Suara Narator</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </>
          )}

          {playerMode === 'local' && (
            <div className="flex flex-col justify-between h-full p-6 bg-[#07111E]">
              <input
                ref={fileInputRef}
                type="file"
                accept="video/mp4,video/webm,video/ogg"
                onChange={handleLocalFileChange}
                className="hidden"
              />
              {localVideoUrl ? (
                <div className="space-y-3 my-auto">
                  <video
                    src={localVideoUrl}
                    controls
                    autoPlay
                    className="w-full max-h-[340px] rounded-xl border border-[#D4AF37]/40 bg-black mx-auto"
                  />
                  <div className="flex items-center justify-between text-xs text-slate-300">
                    <span>Memutar: {localVideoName}</span>
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="px-3 py-1.5 rounded-lg border border-[#D4AF37]/50 text-[#F3C623] font-bold cursor-pointer"
                    >
                      Ganti File Video
                    </button>
                  </div>
                </div>
              ) : (
                <div className="my-auto text-center py-10 space-y-4">
                  <div className="w-16 h-16 rounded-2xl bg-[#D4AF37]/15 border border-[#D4AF37]/50 flex items-center justify-center mx-auto text-[#F3C623]">
                    <Upload className="w-8 h-8" />
                  </div>
                  <div className="space-y-1 max-w-md mx-auto">
                    <h3 className="text-lg font-extrabold text-white">
                      Putar File Video Stimulus dari Laptop/Flashdisk
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Jika proyektor aula sedang offline, Anda dapat memilih file video (.mp4 / .webm) langsung dari perangkat Anda.
                    </p>
                  </div>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#F3C623] text-[#0B192C] font-extrabold text-xs sm:text-sm inline-flex items-center gap-2 cursor-pointer shadow-lg"
                  >
                    <FileVideo className="w-4 h-4" />
                    <span>Pilih File Video (.mp4)</span>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* RIGHT 5 COLUMNS: 3 KISAH PANUTAN KEJAYAAN ISLAM & DISKUSI PEMANTIK */}
        <div className="lg:col-span-5 flex flex-col justify-between gap-3.5">
          <div className="space-y-2.5">
            <div className="text-xs font-extrabold uppercase tracking-wider text-[#F3C623]">
              3 Poin Hikmah Kepemimpinan Kejayaan Islam (Klik Detail):
            </div>

            {/* Story Card 1 */}
            <button
              onClick={() => onOpenModal('tokoh-umar-abdul-aziz')}
              className="w-full text-left rounded-xl bg-[#0F223A]/85 border border-[#D4AF37]/40 hover:border-[#F3C623] p-3.5 transition-all cursor-pointer group"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-[11px] font-bold text-[#F3C623] uppercase">
                    1. Shiddiq &amp; Amanah · Damaskus
                  </span>
                  <h4 className="text-sm font-extrabold text-white group-hover:text-[#F3C623] transition-colors">
                    Umar bin Abdul Aziz &amp; Lentera Baitul Mal
                  </h4>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    Mematikan lampu minyak negara saat membicarakan urusan pribadi agar tidak mengkhianati amanah rakyat.
                  </p>
                </div>
                <BookOpen className="w-4 h-4 text-[#F3C623] shrink-0 mt-1" />
              </div>
            </button>

            {/* Story Card 2 */}
            <button
              onClick={() => onOpenModal('tokoh-alfatih')}
              className="w-full text-left rounded-xl bg-[#0F223A]/85 border border-[#D4AF37]/40 hover:border-[#F3C623] p-3.5 transition-all cursor-pointer group"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-[11px] font-bold text-[#F3C623] uppercase">
                    2. Fathanah &amp; Percaya Diri · Usia 21 Tahun
                  </span>
                  <h4 className="text-sm font-extrabold text-white group-hover:text-[#F3C623] transition-colors">
                    Sultan Muhammad Al-Fatih &amp; Strategi Brilian
                  </h4>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    Memadukan tahajud, penguasaan 6 bahasa, dan rekayasa sains untuk menyelesaikan masalah besar di usia muda.
                  </p>
                </div>
                <BookOpen className="w-4 h-4 text-[#F3C623] shrink-0 mt-1" />
              </div>
            </button>

            {/* Story Card 3 */}
            <button
              onClick={() => onOpenModal('tokoh-shalahuddin')}
              className="w-full text-left rounded-xl bg-[#0F223A]/85 border border-[#D4AF37]/40 hover:border-[#F3C623] p-3.5 transition-all cursor-pointer group"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-[11px] font-bold text-[#F3C623] uppercase">
                    3. Tabligh &amp; Uswah Hasanah · Al-Quds
                  </span>
                  <h4 className="text-sm font-extrabold text-white group-hover:text-[#F3C623] transition-colors">
                    Shalahuddin Al-Ayyubi &amp; Kemuliaan Akhlak
                  </h4>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    Menaklukkan hati kawan maupun lawan dengan kasih sayang, keadilan, dan keteguhan menepati janji.
                  </p>
                </div>
                <BookOpen className="w-4 h-4 text-[#F3C623] shrink-0 mt-1" />
              </div>
            </button>
          </div>

          {/* Pertanyaan Pemantik sebelum masuk Materi Utama */}
          <div className="rounded-xl bg-gradient-to-r from-[#D4AF37]/15 to-[#0B192C]/90 border border-[#D4AF37]/55 p-4 space-y-2.5">
            <div className="text-xs font-extrabold text-[#F3C623] uppercase tracking-wider">
              Refleksi Video Stimulus:
            </div>
            <p className="text-xs text-slate-100 leading-relaxed">
              “Setelah menonton kedua video singkat di samping, karakter kepemimpinan apa yang paling menginspirasi kalian untuk diterapkan di OSIS?”
            </p>
            <button
              onClick={onProceedToMaterial}
              className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#F3C623] text-[#0B192C] font-extrabold text-xs flex items-center justify-center gap-1.5 cursor-pointer hover:brightness-110 transition-all shadow-md"
            >
              <span>Masuk ke Materi Utama: Makna Khalifah Fil Ardh</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function SceneVisualIllustration({
  theme,
  isPlaying,
}: {
  theme: 'candle' | 'ships' | 'jerusalem' | 'scholars' | 'reflection';
  isPlaying: boolean;
}) {
  return (
    <div className="pointer-events-none absolute right-6 top-1/2 -translate-y-1/2 opacity-25 sm:opacity-35">
      {theme === 'candle' && (
        <div
          className={`w-44 h-44 rounded-full border-2 border-[#F3C623]/60 bg-[#D4AF37]/10 flex items-center justify-center ${
            isPlaying ? 'scale-105' : ''
          } transition-transform duration-700`}
        >
          <Flame className="w-24 h-24 text-[#F3C623]" />
        </div>
      )}
      {theme === 'ships' && (
        <div className="w-44 h-44 rounded-full border-2 border-[#F3C623]/60 bg-[#D4AF37]/10 flex items-center justify-center">
          <Compass className="w-24 h-24 text-[#F3C623]" />
        </div>
      )}
      {theme === 'scholars' && (
        <div className="w-44 h-44 rounded-full border-2 border-[#F3C623]/60 bg-[#D4AF37]/10 flex items-center justify-center">
          <Sparkles className="w-24 h-24 text-[#F3C623]" />
        </div>
      )}
      {theme === 'jerusalem' && (
        <div className="w-44 h-44 rounded-full border-2 border-[#F3C623]/60 bg-[#D4AF37]/10 flex items-center justify-center">
          <ShieldCheck className="w-24 h-24 text-[#F3C623]" />
        </div>
      )}
      {theme === 'reflection' && (
        <div className="w-44 h-44 rounded-full border-2 border-[#F3C623]/60 bg-[#D4AF37]/10 flex items-center justify-center">
          <BookOpen className="w-24 h-24 text-[#F3C623]" />
        </div>
      )}
    </div>
  );
}
