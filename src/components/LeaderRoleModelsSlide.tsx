import React, { useState } from 'react';
import {
  Award,
  BookOpen,
  ChevronRight,
  Globe,
  Handshake,
  Lightbulb,
  MapPin,
  MessageCircle,
  ShieldCheck,
} from 'lucide-react';
import { LEADER_ROLE_MODELS, LeaderRoleModel } from '../data/presentationData';

interface LeaderRoleModelsSlideProps {
  onOpenModal: (modalKey: string) => void;
}

export default function LeaderRoleModelsSlide({
  onOpenModal,
}: LeaderRoleModelsSlideProps) {
  const [selectedTrait, setSelectedTrait] = useState<
    'all' | 'shiddiq' | 'amanah' | 'fathanah' | 'tabligh'
  >('all');

  const filteredModels =
    selectedTrait === 'all'
      ? LEADER_ROLE_MODELS
      : LEADER_ROLE_MODELS.filter((m) => m.traitKey === selectedTrait);

  const getTraitIcon = (key: LeaderRoleModel['traitKey']) => {
    switch (key) {
      case 'shiddiq':
        return ShieldCheck;
      case 'amanah':
        return Handshake;
      case 'fathanah':
        return Lightbulb;
      case 'tabligh':
        return MessageCircle;
    }
  };

  return (
    <div className="space-y-5">
      {/* Header & Interactive Filter Control */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
        <div>
          <div className="text-xs font-bold uppercase tracking-widest text-[#F3C623] mb-1">
            TELADAN SEJARAH &amp; BANGSA · MANIFESTASI 4 SIFAT NABI
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-[2.65rem] font-extrabold tracking-tight text-white leading-tight">
            Tokoh Pemimpin Panutan <span className="text-[#F3C623]">Dunia &amp; Indonesia</span>
          </h2>
          <p className="text-xs sm:text-base text-slate-200 mt-1">
            Bukti nyata penerapan sifat Shiddiq, Amanah, Fathanah, dan Tabligh oleh tokoh kejayaan Islam dunia dan pahlawan nasional Indonesia.
          </p>
        </div>

        {/* Interactive Segmented Filter Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-[#07111E]/90 border border-[#D4AF37]/40 self-start">
          {[
            { id: 'all', label: 'Semua (8 Tokoh)' },
            { id: 'shiddiq', label: '1. Shiddiq' },
            { id: 'amanah', label: '2. Amanah' },
            { id: 'fathanah', label: '3. Fathanah' },
            { id: 'tabligh', label: '4. Tabligh' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() =>
                setSelectedTrait(
                  tab.id as 'all' | 'shiddiq' | 'amanah' | 'fathanah' | 'tabligh'
                )
              }
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                selectedTrait === tab.id
                  ? 'bg-gradient-to-r from-[#D4AF37] to-[#F3C623] text-[#0B192C] shadow-sm'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Leader Cards */}
      <div
        className={`grid grid-cols-1 ${
          selectedTrait === 'all'
            ? 'md:grid-cols-2 lg:grid-cols-4'
            : 'md:grid-cols-2'
        } gap-4`}
      >
        {filteredModels.map((leader) => {
          const TraitIcon = getTraitIcon(leader.traitKey);
          const isIndonesia = leader.scope.includes('Indonesia');

          return (
            <button
              key={leader.id}
              onClick={() => onOpenModal(leader.modalId)}
              className="text-left rounded-2xl bg-[#0F223A]/85 backdrop-blur-xl border border-[#D4AF37]/45 hover:border-[#F3C623] transition-all duration-200 p-5 flex flex-col justify-between cursor-pointer group shadow-xl hover:-translate-y-0.5"
            >
              <div>
                {/* Top Metadata Line (Unboxed clean text per zero-pill discipline) */}
                <div className="flex items-center justify-between gap-2 text-[11px] font-bold uppercase tracking-wider mb-2">
                  <span className="text-[#F3C623] flex items-center gap-1.5">
                    <TraitIcon className="w-3.5 h-3.5 shrink-0" />
                    <span>{leader.traitKey.toUpperCase()}</span>
                  </span>
                  <span className="text-slate-300 flex items-center gap-1">
                    {isIndonesia ? (
                      <MapPin className="w-3 h-3 text-amber-300" />
                    ) : (
                      <Globe className="w-3 h-3 text-cyan-300" />
                    )}
                    <span>{isIndonesia ? 'Tokoh Indonesia' : 'Tokoh Dunia / Islam'}</span>
                  </span>
                </div>

                {/* Leader Name & Role */}
                <h3 className="text-base sm:text-lg font-extrabold text-white group-hover:text-[#F3C623] transition-colors leading-snug">
                  {leader.name}
                </h3>
                <p className="text-xs text-[#F3C623]/90 font-medium mb-2.5">
                  {leader.eraOrRole}
                </p>

                <div className="h-[1px] w-full bg-[#D4AF37]/25 mb-2.5" />

                {/* Story Summary */}
                <p className="text-xs text-slate-200 leading-relaxed mb-3">
                  {leader.storySummary}
                </p>
              </div>

              <div>
                {/* OSIS Takeaway */}
                <div className="p-2.5 rounded-xl bg-[#07111E]/85 border border-slate-700/70 mb-3">
                  <span className="text-[11px] font-bold text-[#F3C623] block mb-0.5">
                    Teladan bagi OSIS:
                  </span>
                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    {leader.osisApplication}
                  </p>
                </div>

                <div className="flex items-center justify-between text-xs font-bold text-[#F3C623]">
                  <span className="flex items-center gap-1">
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Baca Kisah Lengkap</span>
                  </span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
