import React from 'react';

/* ══════════════════════════════════════════════════════════════
   SIT KALABURAGI — Official Round Crest Logo
   Faithful reproduction: circular emblem with gear-teeth outer
   ring, inner ring, open book, torch flame, laurel leaf details,
   dark navy fill, gold accent, arc text and bottom ribbon.
══════════════════════════════════════════════════════════════ */
export function SITLogo({ className = "w-16 h-16", style = {} }) {
  return (
    <svg className={className} style={style} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="sitGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#c9a227" />
          <stop offset="50%" stopColor="#f0c040" />
          <stop offset="100%" stopColor="#a07820" />
        </linearGradient>
        <linearGradient id="sitBlue" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#1a3c8f" />
          <stop offset="100%" stopColor="#0d1f5c" />
        </linearGradient>
      </defs>

      {/* ── Outer dark circle (navy background) ── */}
      <circle cx="100" cy="100" r="98" fill="url(#sitBlue)" stroke="#c9a227" strokeWidth="3" />

      {/* ── Gear-teeth outer ring (gold) ── */}
      {Array.from({ length: 36 }).map((_, i) => {
        const angle = (i * 10 * Math.PI) / 180;
        const x1 = 100 + 90 * Math.cos(angle);
        const y1 = 100 + 90 * Math.sin(angle);
        const x2 = 100 + 82 * Math.cos(angle);
        const y2 = 100 + 82 * Math.sin(angle);
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#c9a227" strokeWidth="3.5" />;
      })}
      <circle cx="100" cy="100" r="80" fill="none" stroke="#c9a227" strokeWidth="2" />
      <circle cx="100" cy="100" r="74" fill="none" stroke="#c9a227" strokeWidth="1" />

      {/* ── Inner white field ── */}
      <circle cx="100" cy="100" r="73" fill="#ffffff" />

      {/* ── Laurel wreath (left side — stylised leaf curves) ── */}
      {/* Left laurel */}
      <path d="M38 100 Q30 80 42 68 Q44 80 38 100Z" fill="#2d6a2d" />
      <path d="M42 115 Q30 100 38 86 Q46 98 42 115Z" fill="#2d6a2d" />
      <path d="M50 128 Q36 118 40 104 Q50 116 50 128Z" fill="#2d6a2d" />
      <path d="M40 75 Q35 60 48 52 Q47 65 40 75Z" fill="#2d6a2d" />
      {/* Right laurel */}
      <path d="M162 100 Q170 80 158 68 Q156 80 162 100Z" fill="#2d6a2d" />
      <path d="M158 115 Q170 100 162 86 Q154 98 158 115Z" fill="#2d6a2d" />
      <path d="M150 128 Q164 118 160 104 Q150 116 150 128Z" fill="#2d6a2d" />
      <path d="M160 75 Q165 60 152 52 Q153 65 160 75Z" fill="#2d6a2d" />
      {/* Stem bases */}
      <path d="M47 136 Q52 128 56 132 Q52 140 47 136Z" fill="#2d6a2d" />
      <path d="M153 136 Q148 128 144 132 Q148 140 153 136Z" fill="#2d6a2d" />

      {/* ── Open Book (centre) ── */}
      <g transform="translate(67, 72)">
        {/* Left page */}
        <path d="M33 0 Q16 2 4 8 L4 40 Q16 35 33 38Z" fill="#e8dfc0" stroke="#8b6914" strokeWidth="1" />
        {/* Right page */}
        <path d="M33 0 Q50 2 62 8 L62 40 Q50 35 33 38Z" fill="#f5f0e0" stroke="#8b6914" strokeWidth="1" />
        {/* Spine */}
        <rect x="31" y="0" width="4" height="38" fill="#6b4c11" />
        {/* Lines on left page */}
        <line x1="10" y1="14" x2="28" y2="13" stroke="#8b6914" strokeWidth="1" opacity="0.6" />
        <line x1="10" y1="18" x2="28" y2="17" stroke="#8b6914" strokeWidth="1" opacity="0.6" />
        <line x1="10" y1="22" x2="28" y2="21" stroke="#8b6914" strokeWidth="1" opacity="0.6" />
        <line x1="10" y1="26" x2="28" y2="25" stroke="#8b6914" strokeWidth="1" opacity="0.6" />
        {/* Lines on right page */}
        <line x1="38" y1="14" x2="56" y2="13" stroke="#8b6914" strokeWidth="1" opacity="0.6" />
        <line x1="38" y1="18" x2="56" y2="17" stroke="#8b6914" strokeWidth="1" opacity="0.6" />
        <line x1="38" y1="22" x2="56" y2="21" stroke="#8b6914" strokeWidth="1" opacity="0.6" />
        <line x1="38" y1="26" x2="56" y2="25" stroke="#8b6914" strokeWidth="1" opacity="0.6" />
      </g>

      {/* ── Torch above book ── */}
      {/* Flame */}
      <path d="M100 42 C96 52 92 56 95 64 C97 68 100 66 100 66 C100 66 103 68 105 64 C108 56 104 52 100 42Z" fill="#e84242" />
      <path d="M100 48 C98 54 96 57 98 62 C99 64 100 63 100 63 C100 63 101 64 102 62 C104 57 102 54 100 48Z" fill="#f5a623" />
      <path d="M100 52 C99 56 99 58 100 60 Q101 58 101 56Z" fill="#fff176" />
      {/* Handle */}
      <rect x="97" y="64" width="6" height="14" rx="1" fill="#c9a227" />
      <rect x="95" y="77" width="10" height="3" rx="1" fill="#8b6914" />

      {/* ── Gear small (below book) ── */}
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i * 30 * Math.PI) / 180;
        const x1 = 100 + 13 * Math.cos(angle);
        const y1 = 130 + 13 * Math.sin(angle);
        const x2 = 100 + 10 * Math.cos(angle);
        const y2 = 130 + 10 * Math.sin(angle);
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#1a3c8f" strokeWidth="2.5" />;
      })}
      <circle cx="100" cy="130" r="9" fill="none" stroke="#1a3c8f" strokeWidth="2" />
      <circle cx="100" cy="130" r="4" fill="#1a3c8f" />

      {/* ── Bottom ribbon (dark blue band) ── */}
      <path d="M32 150 Q100 165 168 150 L168 155 Q100 170 32 155Z" fill="url(#sitBlue)" />

      {/* ── "SHETTY INSTITUTE OF TECHNOLOGY" arc text (top) ── */}
      <path id="topArc" d="M 26 100 A 74 74 0 0 1 174 100" fill="none" />
      <text fontFamily="Arial, sans-serif" fontWeight="900" fontSize="10.5" fill="#1a3c8f" letterSpacing="0.8">
        <textPath href="#topArc" startOffset="4%">SHETTY INSTITUTE OF TECHNOLOGY</textPath>
      </text>

      {/* ── "KALABURAGI" bottom ribbon text ── */}
      <path id="bottomArc" d="M 42 148 A 62 62 0 0 0 158 148" fill="none" />
      <text fontFamily="Arial, sans-serif" fontWeight="800" fontSize="9.5" fill="#ffffff" letterSpacing="1.5">
        <textPath href="#bottomArc" startOffset="12%">KALABURAGI</textPath>
      </text>

      {/* ── Thin gold divider lines between arc text and inner circle ── */}
      <circle cx="100" cy="100" r="74" fill="none" stroke="#c9a227" strokeWidth="1.5" />
      <circle cx="100" cy="100" r="71" fill="none" stroke="#c9a227" strokeWidth="0.6" opacity="0.7" />
    </svg>
  );
}

/* ══════════════════════════════════════════════════════════════
   MINISTRY OF EDUCATION — Government of India
   Faithful Ashoka Stambha: 4-lion capital, abacus with chakras,
   horse, bull, lion, elephant, chakra wheel, lotus petals,
   Sanskrit motto "Satyameva Jayate" on scroll.
══════════════════════════════════════════════════════════════ */
export function GovtEduLogo({ className = "w-16 h-16", style = {} }) {
  return (
    <svg className={className} style={style} viewBox="0 0 180 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* ── Ashoka Lions Capital ── */}
      {/* Back lions (lighter) */}
      <ellipse cx="90" cy="55" rx="26" ry="20" fill="#c8a84b" opacity="0.4" />
      {/* Front-left lion */}
      <ellipse cx="75" cy="52" rx="13" ry="11" fill="#c8a84b" />
      <path d="M68 46 Q72 38 78 40 Q82 42 78 50 Q74 54 68 52Z" fill="#b8941e" />
      <circle cx="71" cy="44" r="4" fill="#c8a84b" />
      {/* mane */}
      <path d="M66 42 Q64 38 68 36 Q71 38 72 42Z" fill="#8b6914" />
      <path d="M76 40 Q79 36 82 38 Q81 42 77 43Z" fill="#8b6914" />
      {/* Front-right lion (mirror) */}
      <ellipse cx="105" cy="52" rx="13" ry="11" fill="#c8a84b" />
      <path d="M112 46 Q108 38 102 40 Q98 42 102 50 Q106 54 112 52Z" fill="#b8941e" />
      <circle cx="109" cy="44" r="4" fill="#c8a84b" />
      <path d="M114 42 Q116 38 112 36 Q109 38 108 42Z" fill="#8b6914" />
      <path d="M104 40 Q101 36 98 38 Q99 42 103 43Z" fill="#8b6914" />
      {/* Abacus / platform */}
      <rect x="60" y="60" width="60" height="8" rx="2" fill="#c8a84b" />
      {/* Chakra wheel centre */}
      <circle cx="90" cy="64" r="5" fill="#1a3c8f" />
      {Array.from({ length: 24 }).map((_, i) => {
        const a = (i * 15 * Math.PI) / 180;
        return (
          <line key={i}
            x1={90 + 5 * Math.cos(a)} y1={64 + 5 * Math.sin(a)}
            x2={90 + 8 * Math.cos(a)} y2={64 + 8 * Math.sin(a)}
            stroke="#1a3c8f" strokeWidth="1" />
        );
      })}
      {/* Horse (left of chakra) */}
      <ellipse cx="72" cy="64" rx="7" ry="5" fill="#8b6914" />
      <path d="M66 60 Q64 56 68 54 Q70 57 68 60Z" fill="#8b6914" />
      {/* Bull (right of chakra) */}
      <ellipse cx="108" cy="64" rx="7" ry="5" fill="#8b6914" />
      <path d="M114 60 Q116 56 112 54 Q110 57 112 60Z" fill="#8b6914" />
      {/* Bell base / column */}
      <path d="M80 68 Q90 72 100 68 L100 80 Q90 84 80 80Z" fill="#c8a84b" />
      <rect x="82" y="80" width="16" height="6" rx="1" fill="#b8941e" />
      {/* Lotus base */}
      {[-20, -10, 0, 10, 20].map((x, i) => (
        <ellipse key={i} cx={90 + x} cy="90" rx="7" ry="4" fill="#e07070" opacity="0.8" />
      ))}
      {/* Scroll / Banner */}
      <path d="M50 100 Q90 95 130 100 Q90 105 50 100Z" fill="#f5e6a0" stroke="#c8a84b" strokeWidth="1" />
      <path d="M50 100 Q46 103 50 106 Q90 101 130 106 Q134 103 130 100Z" fill="#f5e6a0" stroke="#c8a84b" strokeWidth="0.8" />
      {/* Satyameva Jayate (Sanskrit) */}
      <text x="90" y="104" textAnchor="middle" fontFamily="serif" fontSize="8" fill="#8b1a1a" fontWeight="bold">
        सत्यमेव जयते
      </text>
      {/* "MINISTRY OF EDUCATION" text block */}
      <rect x="38" y="115" width="104" height="32" rx="3" fill="#1a3c8f" />
      <text x="90" y="126" textAnchor="middle" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="8.5" fill="#ffffff" letterSpacing="0.3">
        MINISTRY OF
      </text>
      <text x="90" y="138" textAnchor="middle" fontFamily="Arial, sans-serif" fontWeight="900" fontSize="10" fill="#f0c040" letterSpacing="0.5">
        EDUCATION
      </text>
      {/* "Government of India" sub-line */}
      <text x="90" y="158" textAnchor="middle" fontFamily="Arial, sans-serif" fontWeight="600" fontSize="8" fill="#555555" letterSpacing="0.3">
        Government of India
      </text>
    </svg>
  );
}

/* ══════════════════════════════════════════════════════════════
   AICTE — All India Council for Technical Education
   Faithful: Royal blue circular badge with white AICTE wordmark,
   lamp / diya symbol above, "ALL INDIA COUNCIL FOR TECHNICAL
   EDUCATION" arc text, gold outer ring with spokes.
══════════════════════════════════════════════════════════════ */
export function AICTELogo({ className = "w-16 h-16", style = {} }) {
  return (
    <svg className={className} style={style} viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* ── Outer gold ring with spoke-tooth pattern ── */}
      <circle cx="90" cy="90" r="88" fill="#ffffff" stroke="#c8a84b" strokeWidth="2" />
      {Array.from({ length: 40 }).map((_, i) => {
        const a = (i * 9 * Math.PI) / 180;
        return (
          <line key={i}
            x1={90 + 85 * Math.cos(a)} y1={90 + 85 * Math.sin(a)}
            x2={90 + 78 * Math.cos(a)} y2={90 + 78 * Math.sin(a)}
            stroke="#c8a84b" strokeWidth="2.5" />
        );
      })}
      <circle cx="90" cy="90" r="76" fill="#1a3c8f" />
      <circle cx="90" cy="90" r="72" fill="none" stroke="#c8a84b" strokeWidth="1.5" />

      {/* ── "ALL INDIA COUNCIL FOR TECHNICAL EDUCATION" arc (top) ── */}
      <path id="aicteTopArc" d="M 22 90 A 68 68 0 0 1 158 90" fill="none" />
      <text fontFamily="Arial, sans-serif" fontWeight="700" fontSize="8.5" fill="#f0c040" letterSpacing="0.6">
        <textPath href="#aicteTopArc" startOffset="1%">ALL INDIA COUNCIL FOR TECHNICAL EDUCATION</textPath>
      </text>

      {/* ── Bottom arc text ── */}
      <path id="aicteBottomArc" d="M 35 138 A 62 62 0 0 0 145 138" fill="none" />
      <text fontFamily="Arial, sans-serif" fontWeight="600" fontSize="7.5" fill="#f0c040" letterSpacing="0.8">
        <textPath href="#aicteBottomArc" startOffset="8%">योगः कर्मसु कौशलम्</textPath>
      </text>

      {/* ── Diya / Oil Lamp ── */}
      {/* Flame */}
      <path d="M90 38 C87 44 85 48 87 53 C88 56 90 55 90 55 C90 55 92 56 93 53 C95 48 93 44 90 38Z" fill="#f5a623" />
      <path d="M90 43 C89 46 88 49 89.5 52 Q90 53 90.5 52 C92 49 91 46 90 43Z" fill="#fff9c4" />
      {/* Wick */}
      <rect x="89" y="54" width="2" height="5" fill="#555" />
      {/* Lamp bowl */}
      <path d="M80 58 Q90 64 100 58 Q102 65 90 68 Q78 65 80 58Z" fill="#c8a84b" />
      {/* Lamp spout */}
      <path d="M100 58 Q108 56 110 59 Q106 62 100 60Z" fill="#c8a84b" />
      {/* Stand */}
      <rect x="88" y="68" width="4" height="8" rx="1" fill="#c8a84b" />
      <rect x="83" y="76" width="14" height="3" rx="1" fill="#8b6914" />

      {/* ── AICTE Bold Text ── */}
      <text x="90" y="108" textAnchor="middle" fontFamily="Arial Black, Arial, sans-serif" fontWeight="900" fontSize="22" fill="#ffffff" letterSpacing="2">
        AICTE
      </text>

      {/* ── Inner gold ring at divider ── */}
      <circle cx="90" cy="90" r="58" fill="none" stroke="#c8a84b" strokeWidth="1" opacity="0.5" />
    </svg>
  );
}

/* ══════════════════════════════════════════════════════════════
   IIC — Institution's Innovation Council
   Faithful: 3 coloured swirling spirals/arcs (blue, orange, red)
   arranged in triangular formation + full wordmark text right.
══════════════════════════════════════════════════════════════ */
export function IICLogo({ className = "w-24 h-16", style = {} }) {
  return (
    <svg className={className} style={style} viewBox="0 0 240 130" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* ── 3 Swirl spirals (triangular cluster) ── */}
      {/* Blue spiral (top-left) */}
      <path d="M38 35 C38 20 52 14 60 22 C68 30 62 44 50 44 C42 44 36 38 38 30 C40 22 50 18 56 24"
        stroke="#1a6fbf" strokeWidth="4" fill="none" strokeLinecap="round" />
      <circle cx="60" cy="36" r="7" fill="#1a6fbf" />
      {/* Orange spiral (right) */}
      <path d="M72 52 C72 37 86 31 94 39 C102 47 96 61 84 61 C76 61 70 55 72 47 C74 39 84 35 90 41"
        stroke="#e85c1a" strokeWidth="4" fill="none" strokeLinecap="round" />
      <circle cx="94" cy="53" r="7" fill="#e85c1a" />
      {/* Red spiral (bottom-left) */}
      <path d="M24 68 C24 53 38 47 46 55 C54 63 48 77 36 77 C28 77 22 71 24 63 C26 55 36 51 42 57"
        stroke="#cc2200" strokeWidth="4" fill="none" strokeLinecap="round" />
      <circle cx="46" cy="69" r="7" fill="#cc2200" />

      {/* ── IIC Text block (right side) ── */}
      <text x="115" y="32" fontFamily="Arial, sans-serif" fontWeight="900" fontSize="11" fill="#1a3c8f" letterSpacing="0.5">
        INSTITUTION'S
      </text>
      <text x="115" y="47" fontFamily="Arial, sans-serif" fontWeight="900" fontSize="12" fill="#1a3c8f" letterSpacing="0.5">
        INNOVATION
      </text>
      <text x="115" y="62" fontFamily="Arial, sans-serif" fontWeight="900" fontSize="11" fill="#1a3c8f" letterSpacing="0.5">
        COUNCIL
      </text>
      {/* Thin blue divider */}
      <line x1="115" y1="68" x2="235" y2="68" stroke="#1a3c8f" strokeWidth="1.5" />
      <text x="115" y="80" fontFamily="Arial, sans-serif" fontWeight="500" fontSize="8.5" fill="#444444" letterSpacing="0.3">
        (Ministry of Education's Initiative)
      </text>
      {/* IIC large monogram */}
      <text x="115" y="110" fontFamily="Arial Black, Arial, sans-serif" fontWeight="900" fontSize="28" fill="#1a3c8f" letterSpacing="4" opacity="0.12">
        IIC
      </text>
    </svg>
  );
}

/* ══════════════════════════════════════════════════════════════
   4-LOGO HEADER — Event Report (Document 4 PDF format)
   Layout: SIT Crest | Govt. of India | AICTE | IIC
   Separated by vertical dividers, bounded below by double rule.
══════════════════════════════════════════════════════════════ */
export function FourLogoHeader() {
  return (
    <div className="select-none mb-1">
      {/* Logo row */}
      <div className="flex items-center justify-between gap-2 py-2 px-1">
        <div className="flex flex-col items-center">
          <SITLogo className="w-[68px] h-[68px]" />
        </div>
        <div className="w-px h-16 bg-gray-300 shrink-0" />
        <div className="flex flex-col items-center">
          <GovtEduLogo className="w-[62px] h-[62px]" />
        </div>
        <div className="w-px h-16 bg-gray-300 shrink-0" />
        <div className="flex flex-col items-center">
          <AICTELogo className="w-[62px] h-[62px]" />
        </div>
        <div className="w-px h-16 bg-gray-300 shrink-0" />
        <div className="flex flex-col items-center justify-center">
          <IICLogo className="w-[130px] h-[62px]" />
        </div>
      </div>
      {/* Double-rule separator */}
      <div className="border-t-[3px] border-black mt-1" />
      <div className="border-t border-black mt-[2px]" />
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   SIT CIRCULAR LETTERHEAD — Documents 1 type
   Layout: Centered SIT logo + college name + city + address
   Bounded below by double-rule (3px + 1px).
══════════════════════════════════════════════════════════════ */
export function SITCircularHeader() {
  return (
    <div className="mb-3 select-none font-serif text-black">
      <div className="flex items-center justify-center gap-5">
        <div className="shrink-0">
          <SITLogo className="w-[72px] h-[72px]" />
        </div>
        <div className="text-center">
          <h1 className="text-[20pt] font-black tracking-tight text-black uppercase leading-none">
            SHETTY INSTITUTE OF TECHNOLOGY
          </h1>
          <p className="text-[13pt] font-bold text-black leading-tight mt-0.5">
            KALABURAGI
          </p>
          <p className="text-[9pt] text-gray-700 mt-0.5">
            Shahabad Road, Kalaburagi – 585105 | Phone: 7676522231
          </p>
          <p className="text-[8pt] text-gray-600">
            www.sitgulbarga.org | principal@sitgulbarga.org
          </p>
        </div>
      </div>
      {/* Double rule below header */}
      <div className="mt-2 border-t-[3px] border-black" />
      <div className="border-t border-black mt-[2px]" />
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   SIT INSTITUTIONAL LETTERHEAD — MOM / Action Plan (Docs 2, 3)
   Layout: Trust name top-left | CET code top-right
           SIT Logo left | College info center | VTU logo right
           Affiliation line | Address + contacts
           Council sub-heading between two thin rules.
══════════════════════════════════════════════════════════════ */
export function SITLetterhead({
  trustName = "Shree Shetty Sangappa Trust's",
  cetCode = "CET Code: E-216 (UG)",
  council = "Institution's Innovation Council",
  showTrust = true,
}) {
  return (
    <div className="select-none font-serif text-black mb-3">
      {/* Top row: Trust name + CET code */}
      {showTrust && (
        <div className="flex justify-between text-[9pt] font-semibold text-gray-700 pb-1 border-b border-gray-400 mb-1">
          <span>{trustName}</span>
          <span>{cetCode}</span>
        </div>
      )}

      {/* Logo + Name row */}
      <div className="flex items-center gap-3 py-1">
        {/* Left: SIT Logo */}
        <div className="shrink-0">
          <SITLogo className="w-[68px] h-[68px]" />
        </div>

        {/* Center: College info */}
        <div className="flex-1 text-center">
          <h1 className="text-[17pt] font-black tracking-tight text-black uppercase leading-none">
            SHETTY INSTITUTE OF TECHNOLOGY
          </h1>
          <p className="text-[8pt] font-medium text-gray-700 mt-0.5 leading-tight">
            (Affiliated to Visvesvaraya Technological University, Belgaum &amp; Approved by AICTE, New Delhi)
          </p>
          <p className="text-[9pt] font-semibold text-black leading-tight mt-0.5">
            Shahabad Road, Kalaburagi – 585105, Karnataka, India
          </p>
          <div className="flex justify-center items-center gap-3 text-[8pt] text-gray-700 mt-0.5 flex-wrap">
            <span>Website: www.sitgulbarga.org</span>
            <span>|</span>
            <span>Phone: 7676522231</span>
            <span>|</span>
            <span>E-Mail: principal@sitgulbarga.org</span>
          </div>
        </div>

        {/* Right: VTU Logo placeholder (matching PDFs) */}
        <div className="shrink-0 flex flex-col items-center justify-center">
          <svg viewBox="0 0 80 80" className="w-[58px] h-[58px]" fill="none">
            <circle cx="40" cy="40" r="38" fill="#1a3c8f" stroke="#c8a84b" strokeWidth="2" />
            <circle cx="40" cy="40" r="32" fill="none" stroke="#c8a84b" strokeWidth="1" />
            <text x="40" y="34" textAnchor="middle" fontFamily="Arial Black, sans-serif" fontWeight="900" fontSize="14" fill="#f0c040">VTU</text>
            <text x="40" y="46" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="6" fill="#ffffff" letterSpacing="0.5">BELAGAVI</text>
            <text x="40" y="55" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="5" fill="#c8a84b">ESTABLISHED 1998</text>
            {Array.from({ length: 20 }).map((_, i) => {
              const a = (i * 18 * Math.PI) / 180;
              return <line key={i} x1={40 + 37 * Math.cos(a)} y1={40 + 37 * Math.sin(a)} x2={40 + 32 * Math.cos(a)} y2={40 + 32 * Math.sin(a)} stroke="#c8a84b" strokeWidth="1.5" />;
            })}
          </svg>
        </div>
      </div>

      {/* Double rule */}
      <div className="border-t-[3px] border-black mt-1" />
      <div className="border-t border-black mt-[2px]" />

      {/* Council sub-heading */}
      {council && (
        <>
          <div className="text-center font-bold text-[11pt] text-black py-1">
            {council}
          </div>
          <div className="border-t border-black" />
        </>
      )}
    </div>
  );
}
