import React from 'react';

interface DiagramProps {
  className?: string;
  width?: number | string;
  height?: number | string;
}

/**
 * CAM-01: AICC 스크류냉동기 #1 - 정상 상태
 * 열원사업소 냉동기 도면 (파스텔 오렌지 테마)
 */
export const CAM01Diagram: React.FC<DiagramProps> = ({ className, width = '100%', height = 'auto' }) => (
  <svg viewBox="0 0 160 100" preserveAspectRatio="xMidYMid meet" className={className} width={width} height={height}>
    <defs>
      <linearGradient id="chiller01-body" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#3a3530"/>
        <stop offset="50%" stopColor="#2a2825"/>
        <stop offset="100%" stopColor="#201d1a"/>
      </linearGradient>
      <linearGradient id="chiller01-motor" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#4a4540"/>
        <stop offset="50%" stopColor="#3a3530"/>
        <stop offset="100%" stopColor="#2a2825"/>
      </linearGradient>
    </defs>

    {/* 바닥 */}
    <rect x="0" y="78" width="160" height="22" fill="#151210"/>
    <line x1="0" y1="78" x2="160" y2="78" stroke="#2a2520" strokeWidth="0.8"/>

    {/* 냉동기 베이스 */}
    <rect x="8" y="72" width="144" height="6" rx="1" fill="#2a2520" stroke="#4a4035" strokeWidth="0.5"/>

    {/* 메인 냉동기 본체 */}
    <rect x="12" y="32" width="100" height="40" rx="3" fill="url(#chiller01-body)" stroke="#6a5a4a" strokeWidth="1"/>

    {/* 압축기 하우징 (스크류 부분) */}
    <rect x="16" y="36" width="45" height="32" rx="2" fill="#2a2520" stroke="#B08060" strokeWidth="0.8"/>
    <ellipse cx="38" cy="52" rx="18" ry="12" fill="#1a1815" stroke="#A07050" strokeWidth="0.6"/>
    <ellipse cx="38" cy="52" rx="12" ry="8" fill="#201d1a" stroke="#B08060" strokeWidth="0.5"/>
    {/* 스크류 로터 표시 */}
    <line x1="28" y1="48" x2="48" y2="48" stroke="#FFB088" strokeWidth="1" strokeDasharray="3,2"/>
    <line x1="28" y1="52" x2="48" y2="52" stroke="#FFB088" strokeWidth="1" strokeDasharray="3,2"/>
    <line x1="28" y1="56" x2="48" y2="56" stroke="#FFB088" strokeWidth="1" strokeDasharray="3,2"/>
    <text x="38" y="66" textAnchor="middle" fontSize="3.5" fill="#FFC0A0" fontFamily="monospace">SCREW</text>

    {/* 열교환기 (쉘앤튜브) */}
    <rect x="65" y="38" width="42" height="28" rx="2" fill="#2a2520" stroke="#9a7a5a" strokeWidth="0.8"/>
    {/* 열교환 튜브 패턴 */}
    <line x1="70" y1="42" x2="102" y2="42" stroke="#C09070" strokeWidth="0.8"/>
    <line x1="70" y1="47" x2="102" y2="47" stroke="#C09070" strokeWidth="0.8"/>
    <line x1="70" y1="52" x2="102" y2="52" stroke="#C09070" strokeWidth="0.8"/>
    <line x1="70" y1="57" x2="102" y2="57" stroke="#C09070" strokeWidth="0.8"/>
    <line x1="70" y1="62" x2="102" y2="62" stroke="#C09070" strokeWidth="0.8"/>
    <text x="86" y="50" textAnchor="middle" fontSize="3" fill="#FFD0B0" fontFamily="monospace">EVAP</text>

    {/* 모터 섹션 */}
    <rect x="116" y="38" width="32" height="28" rx="2" fill="url(#chiller01-motor)" stroke="#B08060" strokeWidth="0.8"/>
    <ellipse cx="132" cy="52" rx="10" ry="10" fill="#2a2520" stroke="#FFB088" strokeWidth="0.6"/>
    <ellipse cx="132" cy="52" rx="5" ry="5" fill="#1a1815" stroke="#C09070" strokeWidth="0.5"/>
    <line x1="132" y1="47" x2="132" y2="57" stroke="#FFC0A0" strokeWidth="0.8"/>
    <line x1="127" y1="52" x2="137" y2="52" stroke="#FFC0A0" strokeWidth="0.8"/>
    <text x="132" y="66" textAnchor="middle" fontSize="3" fill="#FFC0A0" fontFamily="monospace">MOTOR</text>

    {/* 냉매 배관 - 입구 */}
    <rect x="0" y="42" width="12" height="8" rx="1" fill="#4a3a2a" stroke="#B08060" strokeWidth="0.8"/>
    <text x="6" y="48" textAnchor="middle" fontSize="3" fill="#FFD0B0" fontFamily="monospace">IN</text>

    {/* 냉매 배관 - 출구 */}
    <rect x="148" y="42" width="12" height="8" rx="1" fill="#2a4a3a" stroke="#5A9A7A" strokeWidth="0.8"/>
    <text x="154" y="48" textAnchor="middle" fontSize="3" fill="#8ACFAF" fontFamily="monospace">OUT</text>

    {/* 제어 패널 */}
    <rect x="14" y="18" width="28" height="12" rx="1" fill="#1a1815" stroke="#5a4a3a" strokeWidth="0.6"/>
    <rect x="16" y="20" width="8" height="4" rx="0.5" fill="#10b981"/>
    <rect x="26" y="20" width="8" height="4" rx="0.5" fill="#1a1815" stroke="#4a3a2a" strokeWidth="0.3"/>
    <circle cx="38" cy="24" r="2" fill="#FFB088"/>

    {/* 온도/압력 게이지 */}
    <circle cx="56" cy="24" r="6" fill="#1a1815" stroke="#A07050" strokeWidth="0.6"/>
    <text x="56" y="23" textAnchor="middle" fontSize="4" fill="#10b981" fontFamily="monospace">7</text>
    <text x="56" y="27" textAnchor="middle" fontSize="2.5" fill="#FFC0A0" fontFamily="monospace">℃</text>

    <circle cx="72" cy="24" r="6" fill="#1a1815" stroke="#A07050" strokeWidth="0.6"/>
    <text x="72" y="23" textAnchor="middle" fontSize="3.5" fill="#10b981" fontFamily="monospace">4.2</text>
    <text x="72" y="27" textAnchor="middle" fontSize="2.5" fill="#FFC0A0" fontFamily="monospace">bar</text>

    {/* 용량 표시 */}
    <rect x="82" y="18" width="30" height="12" rx="1.5" fill="rgba(255,176,136,0.15)" stroke="rgba(255,176,136,0.5)" strokeWidth="0.6"/>
    <text x="97" y="26" textAnchor="middle" fontSize="4.5" fill="#FFB088" fontFamily="monospace" fontWeight="bold">82.24</text>
    <text x="115" y="26" textAnchor="start" fontSize="3" fill="#FFC0A0" fontFamily="monospace">USRT</text>

    {/* AI 상태 표시 */}
    <rect x="36" y="4" width="88" height="10" rx="2" fill="rgba(16,185,129,0.12)" stroke="rgba(16,185,129,0.5)" strokeWidth="0.7"/>
    <text x="80" y="11" textAnchor="middle" fontSize="4" fill="#10b981" fontFamily="monospace">AI: 냉동기 운전 정상</text>
  </svg>
);

/**
 * CAM-02: AICC 스크류냉동기 #2 - 정상 상태
 * 열원사업소 냉동기 도면 (파스텔 오렌지 테마)
 */
export const CAM02Diagram: React.FC<DiagramProps> = ({ className, width = '100%', height = 'auto' }) => (
  <svg viewBox="0 0 160 100" preserveAspectRatio="xMidYMid meet" className={className} width={width} height={height}>
    <defs>
      <linearGradient id="chiller02-body" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#3a3530"/>
        <stop offset="50%" stopColor="#2a2825"/>
        <stop offset="100%" stopColor="#201d1a"/>
      </linearGradient>
    </defs>

    {/* 바닥 */}
    <rect x="0" y="78" width="160" height="22" fill="#151210"/>
    <line x1="0" y1="78" x2="160" y2="78" stroke="#2a2520" strokeWidth="0.8"/>

    {/* 냉동기 베이스 */}
    <rect x="8" y="72" width="144" height="6" rx="1" fill="#2a2520" stroke="#4a4035" strokeWidth="0.5"/>

    {/* 메인 냉동기 본체 */}
    <rect x="12" y="32" width="100" height="40" rx="3" fill="url(#chiller02-body)" stroke="#6a5a4a" strokeWidth="1"/>

    {/* 압축기 하우징 */}
    <rect x="16" y="36" width="45" height="32" rx="2" fill="#2a2520" stroke="#B08060" strokeWidth="0.8"/>
    <ellipse cx="38" cy="52" rx="18" ry="12" fill="#1a1815" stroke="#A07050" strokeWidth="0.6"/>
    <ellipse cx="38" cy="52" rx="12" ry="8" fill="#201d1a" stroke="#B08060" strokeWidth="0.5"/>
    {/* 스크류 로터 */}
    <line x1="28" y1="48" x2="48" y2="48" stroke="#FFB088" strokeWidth="1" strokeDasharray="3,2"/>
    <line x1="28" y1="52" x2="48" y2="52" stroke="#FFB088" strokeWidth="1" strokeDasharray="3,2"/>
    <line x1="28" y1="56" x2="48" y2="56" stroke="#FFB088" strokeWidth="1" strokeDasharray="3,2"/>
    <text x="38" y="66" textAnchor="middle" fontSize="3.5" fill="#FFC0A0" fontFamily="monospace">SCREW</text>

    {/* 열교환기 */}
    <rect x="65" y="38" width="42" height="28" rx="2" fill="#2a2520" stroke="#9a7a5a" strokeWidth="0.8"/>
    <line x1="70" y1="42" x2="102" y2="42" stroke="#C09070" strokeWidth="0.8"/>
    <line x1="70" y1="47" x2="102" y2="47" stroke="#C09070" strokeWidth="0.8"/>
    <line x1="70" y1="52" x2="102" y2="52" stroke="#C09070" strokeWidth="0.8"/>
    <line x1="70" y1="57" x2="102" y2="57" stroke="#C09070" strokeWidth="0.8"/>
    <line x1="70" y1="62" x2="102" y2="62" stroke="#C09070" strokeWidth="0.8"/>
    <text x="86" y="50" textAnchor="middle" fontSize="3" fill="#FFD0B0" fontFamily="monospace">COND</text>

    {/* 모터 */}
    <rect x="116" y="38" width="32" height="28" rx="2" fill="#2a2520" stroke="#B08060" strokeWidth="0.8"/>
    <ellipse cx="132" cy="52" rx="10" ry="10" fill="#2a2520" stroke="#FFB088" strokeWidth="0.6"/>
    <ellipse cx="132" cy="52" rx="5" ry="5" fill="#1a1815" stroke="#C09070" strokeWidth="0.5"/>
    <line x1="132" y1="47" x2="132" y2="57" stroke="#FFC0A0" strokeWidth="0.8"/>
    <line x1="127" y1="52" x2="137" y2="52" stroke="#FFC0A0" strokeWidth="0.8"/>
    <text x="132" y="66" textAnchor="middle" fontSize="3" fill="#FFC0A0" fontFamily="monospace">MOTOR</text>

    {/* 냉매 배관 */}
    <rect x="0" y="42" width="12" height="8" rx="1" fill="#4a3a2a" stroke="#B08060" strokeWidth="0.8"/>
    <text x="6" y="48" textAnchor="middle" fontSize="3" fill="#FFD0B0" fontFamily="monospace">IN</text>
    <rect x="148" y="42" width="12" height="8" rx="1" fill="#2a4a3a" stroke="#5A9A7A" strokeWidth="0.8"/>
    <text x="154" y="48" textAnchor="middle" fontSize="3" fill="#8ACFAF" fontFamily="monospace">OUT</text>

    {/* 제어 패널 */}
    <rect x="14" y="18" width="28" height="12" rx="1" fill="#1a1815" stroke="#5a4a3a" strokeWidth="0.6"/>
    <rect x="16" y="20" width="8" height="4" rx="0.5" fill="#10b981"/>
    <rect x="26" y="20" width="8" height="4" rx="0.5" fill="#1a1815" stroke="#4a3a2a" strokeWidth="0.3"/>
    <circle cx="38" cy="24" r="2" fill="#10b981"/>

    {/* 온도/압력 게이지 */}
    <circle cx="56" cy="24" r="6" fill="#1a1815" stroke="#A07050" strokeWidth="0.6"/>
    <text x="56" y="23" textAnchor="middle" fontSize="4" fill="#10b981" fontFamily="monospace">8</text>
    <text x="56" y="27" textAnchor="middle" fontSize="2.5" fill="#FFC0A0" fontFamily="monospace">℃</text>

    <circle cx="72" cy="24" r="6" fill="#1a1815" stroke="#A07050" strokeWidth="0.6"/>
    <text x="72" y="23" textAnchor="middle" fontSize="3.5" fill="#10b981" fontFamily="monospace">4.1</text>
    <text x="72" y="27" textAnchor="middle" fontSize="2.5" fill="#FFC0A0" fontFamily="monospace">bar</text>

    {/* 용량 표시 */}
    <rect x="82" y="18" width="30" height="12" rx="1.5" fill="rgba(255,176,136,0.15)" stroke="rgba(255,176,136,0.5)" strokeWidth="0.6"/>
    <text x="97" y="26" textAnchor="middle" fontSize="4.5" fill="#FFB088" fontFamily="monospace" fontWeight="bold">82.24</text>
    <text x="115" y="26" textAnchor="start" fontSize="3" fill="#FFC0A0" fontFamily="monospace">USRT</text>

    {/* AI 상태 */}
    <rect x="36" y="4" width="88" height="10" rx="2" fill="rgba(16,185,129,0.12)" stroke="rgba(16,185,129,0.5)" strokeWidth="0.7"/>
    <text x="80" y="11" textAnchor="middle" fontSize="4" fill="#10b981" fontFamily="monospace">AI: 냉동기 #2 정상</text>
  </svg>
);

/**
 * CAM-03: 수축팽창 구간3 - 수직배관 (B구역)
 */
export const CAM03Diagram: React.FC<DiagramProps> = ({ className, width = '100%', height = 'auto' }) => (
  <svg viewBox="0 0 160 100" preserveAspectRatio="xMidYMid meet" className={className} width={width} height={height}>
    <rect x="0" y="75" width="160" height="25" fill="#121a14"/>
    <line x1="0" y1="75" x2="160" y2="75" stroke="#1e3222" strokeWidth="0.8"/>

    {/* 수직 배관 */}
    <rect x="22" y="10" width="12" height="65" rx="2" fill="#1e4d3a" stroke="#3A9A7A" strokeWidth="1"/>
    <rect x="23" y="10" width="3" height="65" fill="rgba(80,200,150,0.1)"/>

    {/* 플랜지 표시 */}
    <rect x="20" y="20" width="16" height="8" rx="1" fill="none" stroke="#2d5a4a" strokeWidth="0.5" strokeDasharray="2,1"/>
    <rect x="20" y="35" width="16" height="8" rx="1" fill="none" stroke="#2d5a4a" strokeWidth="0.5" strokeDasharray="2,1"/>
    <rect x="20" y="50" width="16" height="8" rx="1" fill="none" stroke="#2d5a4a" strokeWidth="0.5" strokeDasharray="2,1"/>

    {/* 수평 배관 */}
    <rect x="34" y="38" width="90" height="12" rx="2" fill="#2B4A3A" stroke="#3A9A7A" strokeWidth="1"/>
    <rect x="34" y="40" width="90" height="3" fill="rgba(80,200,150,0.1)"/>

    {/* 밸브 */}
    <rect x="124" y="28" width="12" height="22" rx="2" fill="#1e4d3a" stroke="#3A9A7A" strokeWidth="1"/>

    {/* 온도 게이지 */}
    <circle cx="90" cy="30" r="8" fill="#0d1f18" stroke="#3A9A7A" strokeWidth="0.8"/>
    <text x="90" y="28" textAnchor="middle" fontSize="5" fill="#3A9A7A" fontFamily="monospace">48C</text>
    <text x="90" y="34" textAnchor="middle" fontSize="3.5" fill="#5abf9f" fontFamily="monospace">중온수</text>

    {/* AI 분석 */}
    <rect x="40" y="56" width="56" height="10" rx="2" fill="rgba(0,170,181,0.12)" stroke="rgba(0,170,181,0.5)" strokeWidth="0.7"/>
    <text x="68" y="63" textAnchor="middle" fontSize="4" fill="#00aab5" fontFamily="monospace">AI: 변위 0.23mm 정상</text>
  </svg>
);

/**
 * CAM-05: 압력 게이지 - 긴급 알람 상태 (C구역)
 */
export const CAM05Diagram: React.FC<DiagramProps> = ({ className, width = '100%', height = 'auto' }) => (
  <svg viewBox="0 0 160 100" preserveAspectRatio="xMidYMid meet" className={className} width={width} height={height}>
    <rect x="0" y="72" width="160" height="28" fill="#1a1010"/>

    {/* 배관 (위험 색상) */}
    <rect x="5" y="50" width="55" height="14" rx="2" fill="#3a1a1a" stroke="#8B3030" strokeWidth="1"/>
    <rect x="100" y="50" width="55" height="14" rx="2" fill="#3a1a1a" stroke="#8B3030" strokeWidth="1"/>

    {/* 압력 게이지 (원형) */}
    <circle cx="80" cy="42" r="22" fill="#1e1212" stroke="#cc4444" strokeWidth="1.5"/>
    <circle cx="80" cy="42" r="19" fill="#140e0e" stroke="#993333" strokeWidth="0.5"/>

    {/* 게이지 눈금 */}
    <g stroke="#555" strokeWidth="0.5">
      <line x1="80" y1="24" x2="80" y2="27"/>
      <line x1="93" y1="27" x2="91" y2="29.5"/>
      <line x1="98" y1="40" x2="95" y2="40.5"/>
      <line x1="67" y1="27" x2="69" y2="29.5"/>
      <line x1="62" y1="40" x2="65" y2="40.5"/>
    </g>

    <text x="80" y="36" textAnchor="middle" fontSize="4" fill="#888" fontFamily="monospace">bar</text>

    {/* 바늘 (위험 위치) */}
    <line x1="80" y1="42" x2="93" y2="30" stroke="#ff4444" strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="80" cy="42" r="2.5" fill="#cc3333"/>

    {/* 수치 */}
    <text x="80" y="49" textAnchor="middle" fontSize="6" fill="#ff6666" fontFamily="monospace" fontWeight="bold">4.2</text>

    {/* AI 긴급 알림 */}
    <rect x="44" y="68" width="72" height="10" rx="2" fill="rgba(220,38,38,0.2)" stroke="rgba(220,38,38,0.7)" strokeWidth="0.7"/>
    <text x="80" y="75" textAnchor="middle" fontSize="4" fill="#ff8888" fontFamily="monospace">AI: 압력 4.2bar 임계초과!</text>

    {/* 연결부 */}
    <rect x="58" y="50" width="22" height="5" rx="0" fill="#3a1a1a" stroke="#8B3030" strokeWidth="0.8"/>
    <rect x="80" y="50" width="22" height="5" rx="0" fill="#3a1a1a" stroke="#8B3030" strokeWidth="0.8"/>

    {/* ALERT 배지 */}
    <rect x="4" y="4" width="48" height="12" rx="2" fill="rgba(220,38,38,0.15)" stroke="#dc2626" strokeWidth="0.7"/>
    <text x="28" y="12" textAnchor="middle" fontSize="4.5" fill="#ff4444" fontFamily="monospace">ALERT 긴급</text>
  </svg>
);

/**
 * CAM-06: 밸브 완전개방 상태 (C구역)
 */
export const CAM06Diagram: React.FC<DiagramProps> = ({ className, width = '100%', height = 'auto' }) => (
  <svg viewBox="0 0 160 100" preserveAspectRatio="xMidYMid meet" className={className} width={width} height={height}>
    <rect x="0" y="72" width="160" height="28" fill="#121a14"/>
    <line x1="0" y1="72" x2="160" y2="72" stroke="#1e3222" strokeWidth="0.8"/>

    {/* 배관 */}
    <rect x="5" y="44" width="150" height="12" rx="2" fill="#1e4d3a" stroke="#3A9A7A" strokeWidth="1"/>
    <rect x="5" y="46" width="150" height="3" fill="rgba(80,200,150,0.1)"/>

    {/* 밸브 바디 */}
    <rect x="72" y="30" width="16" height="26" rx="2" fill="#1e4d3a" stroke="#3A9A7A" strokeWidth="1"/>

    {/* 밸브 게이지 */}
    <circle cx="80" cy="36" r="10" fill="#1a3028" stroke="#3A9A7A" strokeWidth="1.2"/>
    <circle cx="80" cy="36" r="7" fill="#0d1f18" stroke="#2d7a5a" strokeWidth="0.5"/>

    {/* 밸브 핸들 (완전 개방 - 수직) */}
    <rect x="78" y="22" width="4" height="10" rx="1" fill="#3A9A7A" stroke="#5abf9f" strokeWidth="0.5"/>
    <rect x="74" y="20" width="12" height="4" rx="1" fill="#5abf9f"/>
    <circle cx="80" cy="36" r="2" fill="#3A9A7A"/>

    <text x="80" y="58" textAnchor="middle" fontSize="4.5" fill="#3A9A7A" fontFamily="monospace">완전개방</text>

    {/* 지지대 */}
    <rect x="38" y="56" width="3" height="16" fill="#2a3a4a"/>
    <rect x="119" y="56" width="3" height="16" fill="#2a3a4a"/>

    {/* AI 상태 */}
    <rect x="94" y="28" width="56" height="10" rx="2" fill="rgba(0,170,181,0.12)" stroke="rgba(0,170,181,0.5)" strokeWidth="0.7"/>
    <text x="122" y="35" textAnchor="middle" fontSize="4" fill="#00aab5" fontFamily="monospace">AI: 밸브 정상개방</text>
  </svg>
);

/**
 * CAM-07: 밸브 부분개방 45도 - 경고 (D구역)
 */
export const CAM07Diagram: React.FC<DiagramProps> = ({ className, width = '100%', height = 'auto' }) => (
  <svg viewBox="0 0 160 100" preserveAspectRatio="xMidYMid meet" className={className} width={width} height={height}>
    <rect x="0" y="72" width="160" height="28" fill="#1a1f2a"/>
    <line x1="0" y1="72" x2="160" y2="72" stroke="#2a3040" strokeWidth="0.8"/>

    <rect x="5" y="44" width="150" height="12" rx="2" fill="#2B5F7A" stroke="#4A90A4" strokeWidth="1"/>
    <rect x="5" y="46" width="150" height="3" fill="rgba(100,180,220,0.1)"/>

    {/* 밸브 (경고 색상) */}
    <circle cx="80" cy="50" r="12" fill="#1a2d40" stroke="#E8B84B" strokeWidth="1.2"/>

    {/* 밸브 디스크 (45도 회전) */}
    <ellipse cx="80" cy="50" rx="8" ry="3" fill="#2a4060" stroke="#E8B84B" strokeWidth="0.8" transform="rotate(-45 80 50)"/>

    {/* 핸들 (45도) */}
    <rect x="78" y="36" width="4" height="10" rx="1" fill="#E8B84B"/>
    <rect x="74" y="34" width="12" height="4" rx="1" fill="#E8B84B"/>

    {/* 상태 표시 */}
    <rect x="58" y="66" width="44" height="8" rx="1.5" fill="rgba(232,184,75,0.2)" stroke="#E8B84B" strokeWidth="0.6"/>
    <text x="80" y="72" textAnchor="middle" fontSize="4" fill="#E8B84B" fontFamily="monospace">부분개방 45</text>

    <rect x="35" y="56" width="3" height="16" fill="#2a3a4a"/>
    <rect x="122" y="56" width="3" height="16" fill="#2a3a4a"/>

    {/* AI 경고 */}
    <rect x="95" y="28" width="56" height="10" rx="2" fill="rgba(232,184,75,0.15)" stroke="rgba(232,184,75,0.6)" strokeWidth="0.7"/>
    <text x="123" y="35" textAnchor="middle" fontSize="4" fill="#E8B84B" fontFamily="monospace">AI: 밸브 45 경고</text>
  </svg>
);

/**
 * PTZ-01: A구역 배관터널 광역
 */
export const PTZ01Diagram: React.FC<DiagramProps> = ({ className, width = '100%', height = 'auto' }) => (
  <svg viewBox="0 0 160 100" preserveAspectRatio="xMidYMid meet" className={className} width={width} height={height}>
    <defs>
      <linearGradient id="ptz01-tg1" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#0a1520"/>
        <stop offset="50%" stopColor="#1c2c3c"/>
        <stop offset="100%" stopColor="#0a1520"/>
      </linearGradient>
    </defs>
    <rect x="0" y="0" width="160" height="100" fill="url(#ptz01-tg1)"/>

    {/* 다층 배관 */}
    <rect x="0" y="8" width="160" height="8" rx="0" fill="#1a3a4a" stroke="#3a6a8a" strokeWidth="0.5"/>
    <rect x="0" y="9" width="160" height="2" fill="rgba(100,180,220,0.12)"/>

    <rect x="0" y="30" width="160" height="10" rx="0" fill="#1e4d3a" stroke="#2a7a5a" strokeWidth="0.5"/>
    <rect x="0" y="31" width="160" height="2" fill="rgba(80,200,150,0.1)"/>

    <rect x="0" y="55" width="160" height="8" rx="0" fill="#1a3a4a" stroke="#3a6a8a" strokeWidth="0.5"/>
    <rect x="0" y="56" width="160" height="2" fill="rgba(100,180,220,0.1)"/>

    {/* 바닥 */}
    <rect x="0" y="78" width="160" height="22" fill="#0d1520"/>
    <line x1="0" y1="78" x2="160" y2="78" stroke="#1e2d3e" strokeWidth="0.8"/>

    {/* 지지대 */}
    <rect x="20" y="16" width="3" height="62" fill="#1a2a3a"/>
    <rect x="55" y="16" width="3" height="62" fill="#1a2a3a"/>
    <rect x="102" y="16" width="3" height="62" fill="#1a2a3a"/>
    <rect x="137" y="16" width="3" height="62" fill="#1a2a3a"/>

    {/* PTZ 시야각 표시 */}
    <path d="M 80 85 L 30 15 M 80 85 L 130 15" stroke="rgba(0,170,181,0.3)" strokeWidth="0.5" fill="none" strokeDasharray="3,2"/>

    {/* AI 상태 */}
    <rect x="36" y="68" width="88" height="10" rx="2" fill="rgba(0,170,181,0.12)" stroke="rgba(0,170,181,0.5)" strokeWidth="0.7"/>
    <text x="80" y="75" textAnchor="middle" fontSize="4" fill="#00aab5" fontFamily="monospace">AI: A구역 배관 전체 정상</text>
  </svg>
);

/**
 * PTZ-04: 열화상 감지 - 긴급 (B구역)
 */
export const PTZ04Diagram: React.FC<DiagramProps> = ({ className, width = '100%', height = 'auto' }) => (
  <svg viewBox="0 0 160 100" preserveAspectRatio="xMidYMid meet" className={className} width={width} height={height}>
    <defs>
      <radialGradient id="ptz04-heatgrd" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="rgba(255,100,0,0.6)"/>
        <stop offset="40%" stopColor="rgba(255,50,0,0.3)"/>
        <stop offset="100%" stopColor="rgba(180,0,0,0.0)"/>
      </radialGradient>
    </defs>
    <rect x="0" y="0" width="160" height="100" fill="#1a0808"/>
    <rect x="0" y="0" width="160" height="100" fill="rgba(30,5,5,0.8)"/>

    {/* 배관 */}
    <rect x="5" y="42" width="150" height="14" rx="2" fill="#3a1010" stroke="#cc2222" strokeWidth="0.8"/>

    {/* 열화상 히트맵 */}
    <circle cx="85" cy="49" r="18" fill="url(#ptz04-heatgrd)"/>
    <circle cx="85" cy="49" r="10" fill="rgba(255,120,0,0.3)"/>
    <circle cx="85" cy="49" r="5" fill="rgba(255,200,0,0.4)"/>

    {/* 등온선 */}
    <ellipse cx="85" cy="49" rx="22" ry="14" fill="none" stroke="rgba(255,80,0,0.4)" strokeWidth="0.6" strokeDasharray="2,1"/>
    <ellipse cx="85" cy="49" rx="14" ry="9" fill="none" stroke="rgba(255,140,0,0.5)" strokeWidth="0.6" strokeDasharray="2,1"/>

    {/* 온도 표시 */}
    <text x="85" y="47" textAnchor="middle" fontSize="7" fill="#ffcc00" fontFamily="monospace" fontWeight="bold">68C</text>
    <text x="85" y="55" textAnchor="middle" fontSize="4" fill="#ff8844" fontFamily="monospace">임계:65C</text>

    {/* THERMAL 배지 */}
    <rect x="4" y="4" width="48" height="12" rx="2" fill="rgba(220,38,38,0.2)" stroke="#dc2626" strokeWidth="0.7"/>
    <text x="28" y="12" textAnchor="middle" fontSize="4.5" fill="#ff6666" fontFamily="monospace">THERMAL</text>

    {/* AI 긴급 알림 */}
    <rect x="30" y="68" width="100" height="10" rx="2" fill="rgba(220,38,38,0.2)" stroke="rgba(220,38,38,0.7)" strokeWidth="0.7"/>
    <text x="80" y="75" textAnchor="middle" fontSize="4" fill="#ff8888" fontFamily="monospace">AI: 온도 급상승! 긴급대응</text>
  </svg>
);

/**
 * PTZ-07: 메인 기계실 (펌프실)
 */
export const PTZ07Diagram: React.FC<DiagramProps> = ({ className, width = '100%', height = 'auto' }) => (
  <svg viewBox="0 0 160 100" preserveAspectRatio="xMidYMid meet" className={className} width={width} height={height}>
    <rect x="0" y="0" width="160" height="100" fill="#111820"/>
    <rect x="0" y="75" width="160" height="25" fill="#0d1218"/>
    <line x1="0" y1="75" x2="160" y2="75" stroke="#1a2535" strokeWidth="0.8"/>

    {/* 펌프 #1 */}
    <rect x="10" y="45" width="30" height="30" rx="2" fill="#1a2a3a" stroke="#3a6a9a" strokeWidth="0.8"/>
    <ellipse cx="25" cy="60" rx="10" ry="10" fill="#1a3a4a" stroke="#4a8ab5" strokeWidth="0.8"/>
    <ellipse cx="25" cy="60" rx="5" ry="5" fill="#0d1f2a" stroke="#3a7aa5" strokeWidth="0.5"/>
    <rect x="35" y="57" width="12" height="5" rx="1" fill="#1a3a4a" stroke="#3a6a8a" strokeWidth="0.5"/>
    <text x="25" y="80" textAnchor="middle" fontSize="3.5" fill="#4a8ab5" fontFamily="monospace">PUMP-01</text>

    {/* 펌프 #2 */}
    <rect x="120" y="45" width="30" height="30" rx="2" fill="#1a2a3a" stroke="#3a6a9a" strokeWidth="0.8"/>
    <ellipse cx="135" cy="60" rx="10" ry="10" fill="#1a3a4a" stroke="#4a8ab5" strokeWidth="0.8"/>
    <ellipse cx="135" cy="60" rx="5" ry="5" fill="#0d1f2a" stroke="#3a7aa5" strokeWidth="0.5"/>
    <rect x="113" y="57" width="12" height="5" rx="1" fill="#1a3a4a" stroke="#3a6a8a" strokeWidth="0.5"/>
    <text x="135" y="80" textAnchor="middle" fontSize="3.5" fill="#4a8ab5" fontFamily="monospace">PUMP-02</text>

    {/* 메인 배관 */}
    <rect x="40" y="55" width="80" height="10" rx="1" fill="#1a3550" stroke="#3a6a9a" strokeWidth="0.8"/>
    <rect x="40" y="57" width="80" height="2" fill="rgba(100,180,220,0.1)"/>

    {/* 수직 배관들 */}
    <rect x="55" y="10" width="6" height="45" rx="1" fill="#1a3040" stroke="#3a6a8a" strokeWidth="0.5"/>
    <rect x="70" y="15" width="6" height="40" rx="1" fill="#1e4d3a" stroke="#2d7a5a" strokeWidth="0.5"/>
    <rect x="85" y="10" width="6" height="45" rx="1" fill="#1a3040" stroke="#3a6a8a" strokeWidth="0.5"/>
    <rect x="100" y="15" width="6" height="40" rx="1" fill="#1e4d3a" stroke="#2d7a5a" strokeWidth="0.5"/>

    {/* AI 상태 */}
    <rect x="36" y="5" width="88" height="10" rx="2" fill="rgba(0,170,181,0.12)" stroke="rgba(0,170,181,0.5)" strokeWidth="0.7"/>
    <text x="80" y="12" textAnchor="middle" fontSize="4" fill="#00aab5" fontFamily="monospace">AI: 기계실 전체 정상운영</text>
  </svg>
);

/**
 * CoolingTowerDiagram: 냉각탑 도면
 * AICC 옥상 냉각탑 설비
 */
export const CoolingTowerDiagram: React.FC<DiagramProps> = ({ className, width = '100%', height = 'auto' }) => (
  <svg viewBox="0 0 160 100" preserveAspectRatio="xMidYMid meet" className={className} width={width} height={height}>
    <defs>
      <linearGradient id="ct-tower" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#2a4050"/>
        <stop offset="100%" stopColor="#1a3040"/>
      </linearGradient>
      <linearGradient id="ct-water" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#2a5a7a"/>
        <stop offset="100%" stopColor="#1a4a6a"/>
      </linearGradient>
    </defs>

    {/* 하늘/배경 */}
    <rect x="0" y="0" width="160" height="100" fill="#0d1520"/>

    {/* 바닥 */}
    <rect x="0" y="82" width="160" height="18" fill="#0a1218"/>
    <line x1="0" y1="82" x2="160" y2="82" stroke="#1e2d3e" strokeWidth="0.8"/>

    {/* 냉각탑 본체 (사다리꼴) */}
    <path d="M30 20 L50 82 L110 82 L130 20 Z" fill="url(#ct-tower)" stroke="#3a6a8a" strokeWidth="1"/>

    {/* 냉각탑 상단 팬 하우징 */}
    <rect x="25" y="8" width="110" height="14" rx="2" fill="#2a4a5a" stroke="#4a7a9a" strokeWidth="0.8"/>

    {/* 팬 */}
    <circle cx="80" cy="15" r="8" fill="#1a3545" stroke="#5aafcf" strokeWidth="0.6"/>
    <line x1="74" y1="15" x2="86" y2="15" stroke="#6ac0e0" strokeWidth="1"/>
    <line x1="80" y1="9" x2="80" y2="21" stroke="#6ac0e0" strokeWidth="1"/>
    <line x1="75" y1="10" x2="85" y2="20" stroke="#6ac0e0" strokeWidth="0.8"/>
    <line x1="85" y1="10" x2="75" y2="20" stroke="#6ac0e0" strokeWidth="0.8"/>

    {/* 물 떨어지는 효과 (충전재) */}
    <rect x="40" y="28" width="80" height="35" fill="#152535" stroke="#2a5a7a" strokeWidth="0.5"/>
    <line x1="45" y1="32" x2="45" y2="58" stroke="#3a7a9a" strokeWidth="0.5" strokeDasharray="2,3"/>
    <line x1="55" y1="32" x2="55" y2="58" stroke="#3a7a9a" strokeWidth="0.5" strokeDasharray="2,3"/>
    <line x1="65" y1="32" x2="65" y2="58" stroke="#3a7a9a" strokeWidth="0.5" strokeDasharray="2,3"/>
    <line x1="75" y1="32" x2="75" y2="58" stroke="#3a7a9a" strokeWidth="0.5" strokeDasharray="2,3"/>
    <line x1="85" y1="32" x2="85" y2="58" stroke="#3a7a9a" strokeWidth="0.5" strokeDasharray="2,3"/>
    <line x1="95" y1="32" x2="95" y2="58" stroke="#3a7a9a" strokeWidth="0.5" strokeDasharray="2,3"/>
    <line x1="105" y1="32" x2="105" y2="58" stroke="#3a7a9a" strokeWidth="0.5" strokeDasharray="2,3"/>
    <line x1="115" y1="32" x2="115" y2="58" stroke="#3a7a9a" strokeWidth="0.5" strokeDasharray="2,3"/>

    {/* 수조 */}
    <rect x="45" y="65" width="70" height="17" rx="1" fill="url(#ct-water)" stroke="#4a8aba" strokeWidth="0.8"/>
    <rect x="47" y="72" width="66" height="8" fill="rgba(100,200,255,0.15)"/>
    <text x="80" y="76" textAnchor="middle" fontSize="4" fill="#7dd3fc" fontFamily="monospace">BASIN</text>

    {/* 입수관 */}
    <rect x="0" y="40" width="35" height="6" rx="1" fill="#2B5F7A" stroke="#4A90A4" strokeWidth="0.6"/>
    <text x="17" y="45" textAnchor="middle" fontSize="3" fill="#7dd3fc" fontFamily="monospace">HOT IN</text>

    {/* 출수관 */}
    <rect x="125" y="72" width="35" height="6" rx="1" fill="#1e4d3a" stroke="#3A9A7A" strokeWidth="0.6"/>
    <text x="142" y="77" textAnchor="middle" fontSize="3" fill="#5abf9f" fontFamily="monospace">COLD OUT</text>

    {/* 온도 표시 */}
    <rect x="4" y="50" width="22" height="10" rx="1.5" fill="rgba(232,184,75,0.15)" stroke="#E8B84B" strokeWidth="0.5"/>
    <text x="15" y="57" textAnchor="middle" fontSize="4.5" fill="#E8B84B" fontFamily="monospace">38°C</text>

    <rect x="134" y="60" width="22" height="10" rx="1.5" fill="rgba(16,185,129,0.15)" stroke="#10b981" strokeWidth="0.5"/>
    <text x="145" y="67" textAnchor="middle" fontSize="4.5" fill="#10b981" fontFamily="monospace">32°C</text>

    {/* AI 상태 */}
    <rect x="36" y="88" width="88" height="10" rx="2" fill="rgba(16,185,129,0.12)" stroke="rgba(16,185,129,0.5)" strokeWidth="0.7"/>
    <text x="80" y="95" textAnchor="middle" fontSize="4" fill="#10b981" fontFamily="monospace">AI: 냉각탑 정상 운전</text>
  </svg>
);

/**
 * FanAHUDiagram: 팬류/공조기 도면
 * 관제탑 AHU (Air Handling Unit)
 */
export const FanAHUDiagram: React.FC<DiagramProps> = ({ className, width = '100%', height = 'auto' }) => (
  <svg viewBox="0 0 160 100" preserveAspectRatio="xMidYMid meet" className={className} width={width} height={height}>
    <defs>
      <linearGradient id="ahu-body" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#2a4a5a"/>
        <stop offset="100%" stopColor="#1a3a4a"/>
      </linearGradient>
    </defs>

    {/* 배경 */}
    <rect x="0" y="0" width="160" height="100" fill="#0d1520"/>
    <rect x="0" y="82" width="160" height="18" fill="#0a1218"/>
    <line x1="0" y1="82" x2="160" y2="82" stroke="#1e2d3e" strokeWidth="0.8"/>

    {/* AHU 메인 케이싱 */}
    <rect x="12" y="25" width="136" height="50" rx="3" fill="url(#ahu-body)" stroke="#3a6a8a" strokeWidth="1"/>

    {/* 필터 섹션 */}
    <rect x="16" y="30" width="25" height="40" rx="1" fill="#1a3040" stroke="#3a5a7a" strokeWidth="0.6"/>
    <line x1="20" y1="33" x2="20" y2="67" stroke="#4a7a9a" strokeWidth="0.5"/>
    <line x1="24" y1="33" x2="24" y2="67" stroke="#4a7a9a" strokeWidth="0.5"/>
    <line x1="28" y1="33" x2="28" y2="67" stroke="#4a7a9a" strokeWidth="0.5"/>
    <line x1="32" y1="33" x2="32" y2="67" stroke="#4a7a9a" strokeWidth="0.5"/>
    <line x1="36" y1="33" x2="36" y2="67" stroke="#4a7a9a" strokeWidth="0.5"/>
    <text x="28" y="75" textAnchor="middle" fontSize="3" fill="#6ac0e0" fontFamily="monospace">FILTER</text>

    {/* 냉각코일 섹션 */}
    <rect x="45" y="30" width="30" height="40" rx="1" fill="#1a3545" stroke="#2a5a7a" strokeWidth="0.6"/>
    <line x1="48" y1="35" x2="72" y2="35" stroke="#4a9aba" strokeWidth="0.8"/>
    <line x1="48" y1="40" x2="72" y2="40" stroke="#4a9aba" strokeWidth="0.8"/>
    <line x1="48" y1="45" x2="72" y2="45" stroke="#4a9aba" strokeWidth="0.8"/>
    <line x1="48" y1="50" x2="72" y2="50" stroke="#4a9aba" strokeWidth="0.8"/>
    <line x1="48" y1="55" x2="72" y2="55" stroke="#4a9aba" strokeWidth="0.8"/>
    <line x1="48" y1="60" x2="72" y2="60" stroke="#4a9aba" strokeWidth="0.8"/>
    <line x1="48" y1="65" x2="72" y2="65" stroke="#4a9aba" strokeWidth="0.8"/>
    <text x="60" y="75" textAnchor="middle" fontSize="3" fill="#7dd3fc" fontFamily="monospace">COIL</text>

    {/* 팬 섹션 */}
    <rect x="80" y="30" width="40" height="40" rx="1" fill="#1a3040" stroke="#3a6a8a" strokeWidth="0.6"/>
    <circle cx="100" cy="50" r="15" fill="#152535" stroke="#4a8ab5" strokeWidth="0.8"/>
    <circle cx="100" cy="50" r="10" fill="#0d2030" stroke="#5aafcf" strokeWidth="0.6"/>
    {/* 팬 블레이드 */}
    <line x1="92" y1="50" x2="108" y2="50" stroke="#6ac0e0" strokeWidth="1.5"/>
    <line x1="100" y1="42" x2="100" y2="58" stroke="#6ac0e0" strokeWidth="1.5"/>
    <line x1="93" y1="43" x2="107" y2="57" stroke="#6ac0e0" strokeWidth="1"/>
    <line x1="107" y1="43" x2="93" y2="57" stroke="#6ac0e0" strokeWidth="1"/>
    <circle cx="100" cy="50" r="3" fill="#5aafcf"/>
    <text x="100" y="75" textAnchor="middle" fontSize="3" fill="#6ac0e0" fontFamily="monospace">FAN</text>

    {/* 모터 */}
    <rect x="124" y="35" width="20" height="30" rx="2" fill="#1a3a4a" stroke="#4a8ab5" strokeWidth="0.6"/>
    <ellipse cx="134" cy="50" rx="6" ry="6" fill="#0d2030" stroke="#3a7aa5" strokeWidth="0.5"/>
    <text x="134" y="75" textAnchor="middle" fontSize="3" fill="#6ac0e0" fontFamily="monospace">MOTOR</text>

    {/* 급기 덕트 (왼쪽) */}
    <rect x="0" y="42" width="12" height="16" rx="1" fill="#2a4a5a" stroke="#4a7a9a" strokeWidth="0.5"/>
    <path d="M3 45 L9 50 L3 55" stroke="#5aafcf" strokeWidth="0.8" fill="none"/>
    <text x="6" y="40" textAnchor="middle" fontSize="2.5" fill="#7dd3fc" fontFamily="monospace">RA</text>

    {/* 배기 덕트 (오른쪽) */}
    <rect x="148" y="42" width="12" height="16" rx="1" fill="#1e4d3a" stroke="#3A9A7A" strokeWidth="0.5"/>
    <path d="M151 45 L157 50 L151 55" stroke="#5abf9f" strokeWidth="0.8" fill="none"/>
    <text x="154" y="40" textAnchor="middle" fontSize="2.5" fill="#5abf9f" fontFamily="monospace">SA</text>

    {/* 온도 표시 */}
    <circle cx="28" cy="15" r="6" fill="#0d1f2a" stroke="#3a7aa5" strokeWidth="0.6"/>
    <text x="28" y="14" textAnchor="middle" fontSize="4" fill="#E8B84B" fontFamily="monospace">26</text>
    <text x="28" y="18" textAnchor="middle" fontSize="2.5" fill="#6ac0e0" fontFamily="monospace">℃</text>

    <circle cx="60" cy="15" r="6" fill="#0d1f2a" stroke="#3a7aa5" strokeWidth="0.6"/>
    <text x="60" y="14" textAnchor="middle" fontSize="4" fill="#10b981" fontFamily="monospace">12</text>
    <text x="60" y="18" textAnchor="middle" fontSize="2.5" fill="#6ac0e0" fontFamily="monospace">℃</text>

    {/* 풍량 표시 */}
    <rect x="100" y="10" width="30" height="10" rx="1.5" fill="rgba(0,170,181,0.15)" stroke="rgba(0,170,181,0.5)" strokeWidth="0.5"/>
    <text x="115" y="17" textAnchor="middle" fontSize="4" fill="#00d4e0" fontFamily="monospace">2400 CMH</text>

    {/* AI 상태 */}
    <rect x="36" y="88" width="88" height="10" rx="2" fill="rgba(16,185,129,0.12)" stroke="rgba(16,185,129,0.5)" strokeWidth="0.7"/>
    <text x="80" y="95" textAnchor="middle" fontSize="4" fill="#10b981" fontFamily="monospace">AI: 공조기 정상 운전</text>
  </svg>
);
