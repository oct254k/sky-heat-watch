# 모니터링 시스템 에셋 레퍼런스

이 문서는 `index_original.html`에서 추출한 모든 SVG 아이콘과 도면입니다.
**새로 만들지 말고 이 코드를 그대로 복사해서 사용하세요.**

---

## 1. KPI 아이콘

### CCTV 아이콘
```svg
<svg viewBox="0 0 24 24">
  <path d="M23 7l-7 5 7 5V7z"/>
  <rect x="1" y="5" width="15" height="14" rx="2"/>
</svg>
```

### 온도계 아이콘
```svg
<svg viewBox="0 0 24 24">
  <path d="M14 14.76V3.5a2.5 2.5 0 00-5 0v11.26a4.5 4.5 0 105 0z"/>
</svg>
```

### 수축/팽창 변위 아이콘
```svg
<svg viewBox="0 0 24 24">
  <path d="M8 3H5a2 2 0 00-2 2v3m18 0V5a2 2 0 00-2-2h-3m0 18h3a2 2 0 002-2v-3M3 16v3a2 2 0 002 2h3"/>
</svg>
```

### 밸브 상태 아이콘
```svg
<svg viewBox="0 0 24 24">
  <circle cx="12" cy="12" r="3"/>
  <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/>
</svg>
```

### 긴급 알람 아이콘
```svg
<svg viewBox="0 0 24 24">
  <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
  <line x1="12" y1="9" x2="12" y2="13"/>
  <line x1="12" y1="17" x2="12.01" y2="17"/>
</svg>
```

### 시스템 상태 아이콘 (차트/파형)
```svg
<svg viewBox="0 0 24 24">
  <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
</svg>
```

### 체크 아이콘
```svg
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
  <polyline points="20 6 9 17 4 12"/>
</svg>
```

### 시계 아이콘
```svg
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
  <circle cx="12" cy="12" r="10"/>
  <polyline points="12 6 12 12 16 14"/>
</svg>
```

### 모니터 아이콘
```svg
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
  <rect x="2" y="3" width="20" height="14" rx="2"/>
  <line x1="8" y1="21" x2="16" y2="21"/>
  <line x1="12" y1="17" x2="12" y2="21"/>
</svg>
```

### 위치 핀 아이콘
```svg
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
  <path d="M12 2a5 5 0 0 1 5 5c0 3-5 11-5 11S7 10 7 7a5 5 0 0 1 5-5z"/>
  <circle cx="12" cy="7" r="2"/>
</svg>
```

---

## 2. CCTV 카메라 도면 (14개)

### CAM-01: 수축팽창 구간1 (A구역)
```svg
<svg viewBox="0 0 160 100" preserveAspectRatio="xMidYMid meet">
  <!-- 바닥 -->
  <rect x="0" y="72" width="160" height="28" fill="#1a1f2a"/>
  <line x1="0" y1="72" x2="160" y2="72" stroke="#2a3040" stroke-width="0.8"/>

  <!-- 지지대 -->
  <rect x="28" y="55" width="4" height="17" fill="#2a3a4a"/>
  <rect x="128" y="55" width="4" height="17" fill="#2a3a4a"/>
  <rect x="24" y="70" width="12" height="3" fill="#2a3a4a" rx="1"/>
  <rect x="124" y="70" width="12" height="3" fill="#2a3a4a" rx="1"/>

  <!-- 좌측 배관 -->
  <rect x="5" y="44" width="55" height="14" rx="2" fill="#2B5F7A" stroke="#4A90A4" stroke-width="1"/>
  <rect x="5" y="46" width="55" height="3" fill="rgba(100,180,220,0.15)"/>

  <!-- 신축이음부 (Expansion Joint) -->
  <g transform="translate(60,44)">
    <rect width="40" height="14" rx="0" fill="#1e3345" stroke="#4A90A4" stroke-width="0.5"/>
    <line x1="5" y1="0" x2="5" y2="14" stroke="#4A90A4" stroke-width="1.2"/>
    <line x1="10" y1="0" x2="10" y2="14" stroke="#4A90A4" stroke-width="1.2"/>
    <line x1="15" y1="0" x2="15" y2="14" stroke="#4A90A4" stroke-width="1.2"/>
    <line x1="20" y1="0" x2="20" y2="14" stroke="#4A90A4" stroke-width="1.2"/>
    <line x1="25" y1="0" x2="25" y2="14" stroke="#4A90A4" stroke-width="1.2"/>
    <line x1="30" y1="0" x2="30" y2="14" stroke="#4A90A4" stroke-width="1.2"/>
    <line x1="35" y1="0" x2="35" y2="14" stroke="#4A90A4" stroke-width="1.2"/>
    <text x="20" y="9" text-anchor="middle" font-size="4.5" fill="#7dd3fc" font-family="monospace">EXP.JT</text>
  </g>

  <!-- 우측 배관 -->
  <rect x="100" y="44" width="55" height="14" rx="2" fill="#2B5F7A" stroke="#4A90A4" stroke-width="1"/>
  <rect x="100" y="46" width="55" height="3" fill="rgba(100,180,220,0.15)"/>

  <!-- 변위 센서 표시 -->
  <rect x="74" y="36" width="12" height="7" rx="1" fill="#1a2a3a" stroke="#00aab5" stroke-width="0.8"/>
  <text x="80" y="41.5" text-anchor="middle" font-size="3.5" fill="#00aab5" font-family="monospace">DS-01</text>
  <line x1="80" y1="43" x2="80" y2="44" stroke="#00aab5" stroke-width="0.6"/>

  <!-- AI 분석 결과 박스 -->
  <rect x="56" y="26" width="48" height="10" rx="2" fill="rgba(0,170,181,0.15)" stroke="rgba(0,170,181,0.6)" stroke-width="0.7"/>
  <text x="80" y="33" text-anchor="middle" font-size="4" fill="#00aab5" font-family="monospace">AI▶ 변위 0.08mm ✓정상</text>

  <!-- 온도 표시 -->
  <rect x="8" y="30" width="26" height="9" rx="1.5" fill="rgba(16,185,129,0.2)" stroke="#10b981" stroke-width="0.6"/>
  <text x="21" y="36.5" text-anchor="middle" font-size="4" fill="#10b981" font-family="monospace">42.3°C ●</text>
</svg>
```

### CAM-02: 수축팽창 구간2 - 경고 상태 (A구역)
```svg
<svg viewBox="0 0 160 100" preserveAspectRatio="xMidYMid meet">
  <rect x="0" y="72" width="160" height="28" fill="#1a1f2a"/>
  <line x1="0" y1="72" x2="160" y2="72" stroke="#2a3040" stroke-width="0.8"/>
  <rect x="28" y="55" width="4" height="17" fill="#2a3a4a"/>
  <rect x="128" y="55" width="4" height="17" fill="#2a3a4a"/>
  <rect x="24" y="70" width="12" height="3" fill="#2a3a4a" rx="1"/>
  <rect x="124" y="70" width="12" height="3" fill="#2a3a4a" rx="1"/>

  <!-- 경고 상태 배관 (노란색 계열) -->
  <rect x="5" y="44" width="55" height="14" rx="2" fill="#3D4A1A" stroke="#8B9A2A" stroke-width="1"/>
  <rect x="5" y="46" width="55" height="3" fill="rgba(180,200,50,0.1)"/>

  <!-- 신축이음부 (경고 색상) -->
  <g transform="translate(58,44)">
    <rect width="44" height="14" rx="0" fill="#2a2e10" stroke="#E8B84B" stroke-width="0.7"/>
    <line x1="5" y1="0" x2="5" y2="14" stroke="#E8B84B" stroke-width="1.2"/>
    <line x1="11" y1="0" x2="11" y2="14" stroke="#E8B84B" stroke-width="1.2"/>
    <line x1="17" y1="0" x2="17" y2="14" stroke="#E8B84B" stroke-width="1.2"/>
    <line x1="23" y1="0" x2="23" y2="14" stroke="#E8B84B" stroke-width="1.2"/>
    <line x1="29" y1="0" x2="29" y2="14" stroke="#E8B84B" stroke-width="1.2"/>
    <line x1="35" y1="0" x2="35" y2="14" stroke="#E8B84B" stroke-width="1.2"/>
    <line x1="39" y1="0" x2="39" y2="14" stroke="#E8B84B" stroke-width="1.2"/>
    <text x="22" y="9" text-anchor="middle" font-size="4.5" fill="#E8B84B" font-family="monospace">EXP.JT</text>
  </g>
  <rect x="102" y="44" width="53" height="14" rx="2" fill="#3D4A1A" stroke="#8B9A2A" stroke-width="1"/>

  <!-- 센서 (경고) -->
  <rect x="74" y="36" width="12" height="7" rx="1" fill="#2a1a00" stroke="#E8B84B" stroke-width="0.8"/>
  <text x="80" y="41.5" text-anchor="middle" font-size="3.5" fill="#E8B84B" font-family="monospace">DS-02</text>
  <line x1="80" y1="43" x2="80" y2="44" stroke="#E8B84B" stroke-width="0.6"/>

  <!-- AI 경고 박스 -->
  <rect x="50" y="26" width="60" height="10" rx="2" fill="rgba(232,184,75,0.15)" stroke="rgba(232,184,75,0.7)" stroke-width="0.7"/>
  <text x="80" y="33" text-anchor="middle" font-size="4" fill="#E8B84B" font-family="monospace">AI▶ 변위 0.45mm ▲임계근접</text>

  <rect x="8" y="30" width="26" height="9" rx="1.5" fill="rgba(232,184,75,0.2)" stroke="#E8B84B" stroke-width="0.6"/>
  <text x="21" y="36.5" text-anchor="middle" font-size="4" fill="#E8B84B" font-family="monospace">44.8°C ▲</text>
</svg>
```

### CAM-03: 수축팽창 구간3 - 수직배관 (B구역)
```svg
<svg viewBox="0 0 160 100" preserveAspectRatio="xMidYMid meet">
  <rect x="0" y="75" width="160" height="25" fill="#121a14"/>
  <line x1="0" y1="75" x2="160" y2="75" stroke="#1e3222" stroke-width="0.8"/>

  <!-- 수직 배관 -->
  <rect x="22" y="10" width="12" height="65" rx="2" fill="#1e4d3a" stroke="#3A9A7A" stroke-width="1"/>
  <rect x="23" y="10" width="3" height="65" fill="rgba(80,200,150,0.1)"/>

  <!-- 플랜지 표시 -->
  <rect x="20" y="20" width="16" height="8" rx="1" fill="none" stroke="#2d5a4a" stroke-width="0.5" stroke-dasharray="2,1"/>
  <rect x="20" y="35" width="16" height="8" rx="1" fill="none" stroke="#2d5a4a" stroke-width="0.5" stroke-dasharray="2,1"/>
  <rect x="20" y="50" width="16" height="8" rx="1" fill="none" stroke="#2d5a4a" stroke-width="0.5" stroke-dasharray="2,1"/>

  <!-- 수평 배관 -->
  <rect x="34" y="38" width="90" height="12" rx="2" fill="#2B4A3A" stroke="#3A9A7A" stroke-width="1"/>
  <rect x="34" y="40" width="90" height="3" fill="rgba(80,200,150,0.1)"/>

  <!-- 밸브 -->
  <rect x="124" y="28" width="12" height="22" rx="2" fill="#1e4d3a" stroke="#3A9A7A" stroke-width="1"/>

  <!-- 온도 게이지 -->
  <circle cx="90" cy="30" r="8" fill="#0d1f18" stroke="#3A9A7A" stroke-width="0.8"/>
  <text x="90" y="28" text-anchor="middle" font-size="5" fill="#3A9A7A" font-family="monospace">48°C</text>
  <text x="90" y="34" text-anchor="middle" font-size="3.5" fill="#5abf9f" font-family="monospace">중온수</text>

  <!-- AI 분석 -->
  <rect x="40" y="56" width="56" height="10" rx="2" fill="rgba(0,170,181,0.12)" stroke="rgba(0,170,181,0.5)" stroke-width="0.7"/>
  <text x="68" y="63" text-anchor="middle" font-size="4" fill="#00aab5" font-family="monospace">AI▶ 변위 0.23mm ✓</text>
</svg>
```

### CAM-05: 압력 게이지 - 긴급 알람 상태 (C구역)
```svg
<svg viewBox="0 0 160 100" preserveAspectRatio="xMidYMid meet">
  <rect x="0" y="72" width="160" height="28" fill="#1a1010"/>

  <!-- 배관 (위험 색상) -->
  <rect x="5" y="50" width="55" height="14" rx="2" fill="#3a1a1a" stroke="#8B3030" stroke-width="1"/>
  <rect x="100" y="50" width="55" height="14" rx="2" fill="#3a1a1a" stroke="#8B3030" stroke-width="1"/>

  <!-- 압력 게이지 (원형) -->
  <circle cx="80" cy="42" r="22" fill="#1e1212" stroke="#cc4444" stroke-width="1.5"/>
  <circle cx="80" cy="42" r="19" fill="#140e0e" stroke="#993333" stroke-width="0.5"/>

  <!-- 게이지 눈금 -->
  <g stroke="#555" stroke-width="0.5">
    <line x1="80" y1="24" x2="80" y2="27"/>
    <line x1="93" y1="27" x2="91" y2="29.5"/>
    <line x1="98" y1="40" x2="95" y2="40.5"/>
    <line x1="67" y1="27" x2="69" y2="29.5"/>
    <line x1="62" y1="40" x2="65" y2="40.5"/>
  </g>

  <text x="80" y="36" text-anchor="middle" font-size="4" fill="#888" font-family="monospace">bar</text>

  <!-- 바늘 (위험 위치) -->
  <line x1="80" y1="42" x2="93" y2="30" stroke="#ff4444" stroke-width="1.5" stroke-linecap="round"/>
  <circle cx="80" cy="42" r="2.5" fill="#cc3333"/>

  <!-- 수치 -->
  <text x="80" y="49" text-anchor="middle" font-size="6" fill="#ff6666" font-family="monospace" font-weight="bold">4.2</text>

  <!-- AI 긴급 알림 -->
  <rect x="44" y="68" width="72" height="10" rx="2" fill="rgba(220,38,38,0.2)" stroke="rgba(220,38,38,0.7)" stroke-width="0.7"/>
  <text x="80" y="75" text-anchor="middle" font-size="4" fill="#ff8888" font-family="monospace">AI▶ 압력 4.2bar ▲임계초과!</text>

  <!-- 연결부 -->
  <rect x="58" y="50" width="22" height="5" rx="0" fill="#3a1a1a" stroke="#8B3030" stroke-width="0.8"/>
  <rect x="80" y="50" width="22" height="5" rx="0" fill="#3a1a1a" stroke="#8B3030" stroke-width="0.8"/>

  <!-- ALERT 배지 -->
  <rect x="4" y="4" width="48" height="12" rx="2" fill="rgba(220,38,38,0.15)" stroke="#dc2626" stroke-width="0.7"/>
  <text x="28" y="12" text-anchor="middle" font-size="4.5" fill="#ff4444" font-family="monospace">⚠ ALERT 긴급</text>
</svg>
```

### CAM-06: 밸브 완전개방 상태 (C구역)
```svg
<svg viewBox="0 0 160 100" preserveAspectRatio="xMidYMid meet">
  <rect x="0" y="72" width="160" height="28" fill="#121a14"/>
  <line x1="0" y1="72" x2="160" y2="72" stroke="#1e3222" stroke-width="0.8"/>

  <!-- 배관 -->
  <rect x="5" y="44" width="150" height="12" rx="2" fill="#1e4d3a" stroke="#3A9A7A" stroke-width="1"/>
  <rect x="5" y="46" width="150" height="3" fill="rgba(80,200,150,0.1)"/>

  <!-- 밸브 바디 -->
  <rect x="72" y="30" width="16" height="26" rx="2" fill="#1e4d3a" stroke="#3A9A7A" stroke-width="1"/>

  <!-- 밸브 게이지 -->
  <circle cx="80" cy="36" r="10" fill="#1a3028" stroke="#3A9A7A" stroke-width="1.2"/>
  <circle cx="80" cy="36" r="7" fill="#0d1f18" stroke="#2d7a5a" stroke-width="0.5"/>

  <!-- 밸브 핸들 (완전 개방 - 수직) -->
  <rect x="78" y="22" width="4" height="10" rx="1" fill="#3A9A7A" stroke="#5abf9f" stroke-width="0.5"/>
  <rect x="74" y="20" width="12" height="4" rx="1" fill="#5abf9f"/>
  <circle cx="80" cy="36" r="2" fill="#3A9A7A"/>

  <text x="80" y="58" text-anchor="middle" font-size="4.5" fill="#3A9A7A" font-family="monospace">완전개방</text>

  <!-- 지지대 -->
  <rect x="38" y="56" width="3" height="16" fill="#2a3a4a"/>
  <rect x="119" y="56" width="3" height="16" fill="#2a3a4a"/>

  <!-- AI 상태 -->
  <rect x="94" y="28" width="56" height="10" rx="2" fill="rgba(0,170,181,0.12)" stroke="rgba(0,170,181,0.5)" stroke-width="0.7"/>
  <text x="122" y="35" text-anchor="middle" font-size="4" fill="#00aab5" font-family="monospace">AI▶ 밸브 정상개방</text>
</svg>
```

### CAM-07: 밸브 부분개방 45도 - 경고 (D구역)
```svg
<svg viewBox="0 0 160 100" preserveAspectRatio="xMidYMid meet">
  <rect x="0" y="72" width="160" height="28" fill="#1a1f2a"/>
  <line x1="0" y1="72" x2="160" y2="72" stroke="#2a3040" stroke-width="0.8"/>

  <rect x="5" y="44" width="150" height="12" rx="2" fill="#2B5F7A" stroke="#4A90A4" stroke-width="1"/>
  <rect x="5" y="46" width="150" height="3" fill="rgba(100,180,220,0.1)"/>

  <!-- 밸브 (경고 색상) -->
  <circle cx="80" cy="50" r="12" fill="#1a2d40" stroke="#E8B84B" stroke-width="1.2"/>

  <!-- 밸브 디스크 (45도 회전) -->
  <ellipse cx="80" cy="50" rx="8" ry="3" fill="#2a4060" stroke="#E8B84B" stroke-width="0.8" transform="rotate(-45 80 50)"/>

  <!-- 핸들 (45도) -->
  <rect x="78" y="36" width="4" height="10" rx="1" fill="#E8B84B"/>
  <rect x="74" y="34" width="12" height="4" rx="1" fill="#E8B84B"/>

  <!-- 상태 표시 -->
  <rect x="58" y="66" width="44" height="8" rx="1.5" fill="rgba(232,184,75,0.2)" stroke="#E8B84B" stroke-width="0.6"/>
  <text x="80" y="72" text-anchor="middle" font-size="4" fill="#E8B84B" font-family="monospace">부분개방 45°</text>

  <rect x="35" y="56" width="3" height="16" fill="#2a3a4a"/>
  <rect x="122" y="56" width="3" height="16" fill="#2a3a4a"/>

  <!-- AI 경고 -->
  <rect x="95" y="28" width="56" height="10" rx="2" fill="rgba(232,184,75,0.15)" stroke="rgba(232,184,75,0.6)" stroke-width="0.7"/>
  <text x="123" y="35" text-anchor="middle" font-size="4" fill="#E8B84B" font-family="monospace">AI▶ 밸브 45°경고</text>
</svg>
```

### PTZ-01: A구역 배관터널 광역
```svg
<svg viewBox="0 0 160 100" preserveAspectRatio="xMidYMid meet">
  <defs>
    <linearGradient id="tg1" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#0a1520"/>
      <stop offset="50%" stop-color="#1c2c3c"/>
      <stop offset="100%" stop-color="#0a1520"/>
    </linearGradient>
  </defs>
  <rect x="0" y="0" width="160" height="100" fill="url(#tg1)"/>

  <!-- 다층 배관 -->
  <rect x="0" y="8" width="160" height="8" rx="0" fill="#1a3a4a" stroke="#3a6a8a" stroke-width="0.5"/>
  <rect x="0" y="9" width="160" height="2" fill="rgba(100,180,220,0.12)"/>

  <rect x="0" y="30" width="160" height="10" rx="0" fill="#1e4d3a" stroke="#2a7a5a" stroke-width="0.5"/>
  <rect x="0" y="31" width="160" height="2" fill="rgba(80,200,150,0.1)"/>

  <rect x="0" y="55" width="160" height="8" rx="0" fill="#1a3a4a" stroke="#3a6a8a" stroke-width="0.5"/>
  <rect x="0" y="56" width="160" height="2" fill="rgba(100,180,220,0.1)"/>

  <!-- 바닥 -->
  <rect x="0" y="78" width="160" height="22" fill="#0d1520"/>
  <line x1="0" y1="78" x2="160" y2="78" stroke="#1e2d3e" stroke-width="0.8"/>

  <!-- 지지대 -->
  <rect x="20" y="16" width="3" height="62" fill="#1a2a3a"/>
  <rect x="55" y="16" width="3" height="62" fill="#1a2a3a"/>
  <rect x="102" y="16" width="3" height="62" fill="#1a2a3a"/>
  <rect x="137" y="16" width="3" height="62" fill="#1a2a3a"/>

  <!-- PTZ 시야각 표시 -->
  <path d="M 80 85 L 30 15 M 80 85 L 130 15" stroke="rgba(0,170,181,0.3)" stroke-width="0.5" fill="none" stroke-dasharray="3,2"/>

  <!-- AI 상태 -->
  <rect x="36" y="68" width="88" height="10" rx="2" fill="rgba(0,170,181,0.12)" stroke="rgba(0,170,181,0.5)" stroke-width="0.7"/>
  <text x="80" y="75" text-anchor="middle" font-size="4" fill="#00aab5" font-family="monospace">AI▶ A구역 배관 전체 정상</text>
</svg>
```

### PTZ-04: 열화상 감지 - 긴급 (B구역)
```svg
<svg viewBox="0 0 160 100" preserveAspectRatio="xMidYMid meet">
  <defs>
    <radialGradient id="heatgrd" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="rgba(255,100,0,0.6)"/>
      <stop offset="40%" stop-color="rgba(255,50,0,0.3)"/>
      <stop offset="100%" stop-color="rgba(180,0,0,0.0)"/>
    </radialGradient>
  </defs>
  <rect x="0" y="0" width="160" height="100" fill="#1a0808"/>
  <rect x="0" y="0" width="160" height="100" fill="rgba(30,5,5,0.8)"/>

  <!-- 배관 -->
  <rect x="5" y="42" width="150" height="14" rx="2" fill="#3a1010" stroke="#cc2222" stroke-width="0.8"/>

  <!-- 열화상 히트맵 -->
  <circle cx="85" cy="49" r="18" fill="url(#heatgrd)"/>
  <circle cx="85" cy="49" r="10" fill="rgba(255,120,0,0.3)"/>
  <circle cx="85" cy="49" r="5" fill="rgba(255,200,0,0.4)"/>

  <!-- 등온선 -->
  <ellipse cx="85" cy="49" rx="22" ry="14" fill="none" stroke="rgba(255,80,0,0.4)" stroke-width="0.6" stroke-dasharray="2,1"/>
  <ellipse cx="85" cy="49" rx="14" ry="9" fill="none" stroke="rgba(255,140,0,0.5)" stroke-width="0.6" stroke-dasharray="2,1"/>

  <!-- 온도 표시 -->
  <text x="85" y="47" text-anchor="middle" font-size="7" fill="#ffcc00" font-family="monospace" font-weight="bold">68°C</text>
  <text x="85" y="55" text-anchor="middle" font-size="4" fill="#ff8844" font-family="monospace">임계:65°C</text>

  <!-- THERMAL 배지 -->
  <rect x="4" y="4" width="48" height="12" rx="2" fill="rgba(220,38,38,0.2)" stroke="#dc2626" stroke-width="0.7"/>
  <text x="28" y="12" text-anchor="middle" font-size="4.5" fill="#ff6666" font-family="monospace">🔴 THERMAL</text>

  <!-- AI 긴급 알림 -->
  <rect x="30" y="68" width="100" height="10" rx="2" fill="rgba(220,38,38,0.2)" stroke="rgba(220,38,38,0.7)" stroke-width="0.7"/>
  <text x="80" y="75" text-anchor="middle" font-size="4" fill="#ff8888" font-family="monospace">AI▶ 온도 급상승! 긴급대응</text>
</svg>
```

### PTZ-07: 메인 기계실 (펌프실)
```svg
<svg viewBox="0 0 160 100" preserveAspectRatio="xMidYMid meet">
  <rect x="0" y="0" width="160" height="100" fill="#111820"/>
  <rect x="0" y="75" width="160" height="25" fill="#0d1218"/>
  <line x1="0" y1="75" x2="160" y2="75" stroke="#1a2535" stroke-width="0.8"/>

  <!-- 펌프 #1 -->
  <rect x="10" y="45" width="30" height="30" rx="2" fill="#1a2a3a" stroke="#3a6a9a" stroke-width="0.8"/>
  <ellipse cx="25" cy="60" rx="10" ry="10" fill="#1a3a4a" stroke="#4a8ab5" stroke-width="0.8"/>
  <ellipse cx="25" cy="60" rx="5" ry="5" fill="#0d1f2a" stroke="#3a7aa5" stroke-width="0.5"/>
  <rect x="35" y="57" width="12" height="5" rx="1" fill="#1a3a4a" stroke="#3a6a8a" stroke-width="0.5"/>
  <text x="25" y="80" text-anchor="middle" font-size="3.5" fill="#4a8ab5" font-family="monospace">PUMP-01</text>

  <!-- 펌프 #2 -->
  <rect x="120" y="45" width="30" height="30" rx="2" fill="#1a2a3a" stroke="#3a6a9a" stroke-width="0.8"/>
  <ellipse cx="135" cy="60" rx="10" ry="10" fill="#1a3a4a" stroke="#4a8ab5" stroke-width="0.8"/>
  <ellipse cx="135" cy="60" rx="5" ry="5" fill="#0d1f2a" stroke="#3a7aa5" stroke-width="0.5"/>
  <rect x="113" y="57" width="12" height="5" rx="1" fill="#1a3a4a" stroke="#3a6a8a" stroke-width="0.5"/>
  <text x="135" y="80" text-anchor="middle" font-size="3.5" fill="#4a8ab5" font-family="monospace">PUMP-02</text>

  <!-- 메인 배관 -->
  <rect x="40" y="55" width="80" height="10" rx="1" fill="#1a3550" stroke="#3a6a9a" stroke-width="0.8"/>
  <rect x="40" y="57" width="80" height="2" fill="rgba(100,180,220,0.1)"/>

  <!-- 수직 배관들 -->
  <rect x="55" y="10" width="6" height="45" rx="1" fill="#1a3040" stroke="#3a6a8a" stroke-width="0.5"/>
  <rect x="70" y="15" width="6" height="40" rx="1" fill="#1e4d3a" stroke="#2d7a5a" stroke-width="0.5"/>
  <rect x="85" y="10" width="6" height="45" rx="1" fill="#1a3040" stroke="#3a6a8a" stroke-width="0.5"/>
  <rect x="100" y="15" width="6" height="40" rx="1" fill="#1e4d3a" stroke="#2d7a5a" stroke-width="0.5"/>

  <!-- AI 상태 -->
  <rect x="36" y="5" width="88" height="10" rx="2" fill="rgba(0,170,181,0.12)" stroke="rgba(0,170,181,0.5)" stroke-width="0.7"/>
  <text x="80" y="12" text-anchor="middle" font-size="4" fill="#00aab5" font-family="monospace">AI▶ 기계실 전체 정상운영</text>
</svg>
```

---

## 3. 밸브 다이얼 게이지 (SVG)

### 완전개방 (90도) - 정상
```svg
<svg viewBox="0 0 68 68">
  <circle cx="34" cy="34" r="26" fill="none" stroke="#E2E7EE" stroke-width="4"/>
  <circle cx="34" cy="34" r="26" fill="none" stroke="#059669" stroke-width="4" stroke-dasharray="82 163" stroke-dashoffset="41" stroke-linecap="round"/>
</svg>
```

### 부분개방 (45도) - 경고
```svg
<svg viewBox="0 0 68 68">
  <circle cx="34" cy="34" r="26" fill="none" stroke="#FCD34D" stroke-width="4"/>
  <circle cx="34" cy="34" r="26" fill="none" stroke="#D97706" stroke-width="4" stroke-dasharray="41 163" stroke-dashoffset="41" stroke-linecap="round"/>
</svg>
```

---

## 4. 실사 이미지 URL (Unsplash)

CCTV 실사 모드에서 사용하는 배경 이미지입니다. 개발 시 동일 URL 사용하거나 프로젝트 에셋으로 다운로드하세요.

| 용도 | URL |
|------|-----|
| 배관 실사 1 | `https://unsplash.com/photos/9XsXOdkdxPQ/download?w=800` |
| 배관 실사 2 | `https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&q=80&auto=format&fit=crop` |
| 산업 배관 | `https://unsplash.com/photos/bA45dDtYysc/download?w=800` |
| 배관 터널 | `https://images.unsplash.com/photo-1572204292164-b35ba943fca7?w=800&q=80&auto=format&fit=crop` |
| 기계실 | `https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&q=80&auto=format&fit=crop` |
| 펌프실 | `https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?w=800&q=80&auto=format&fit=crop` |
| 배관 연결부 | `https://images.unsplash.com/photo-1513828583688-c52646db42da?w=800&q=80&auto=format&fit=crop` |
| 산업 밸브 | `https://images.unsplash.com/photo-1580901368919-7738efb0f87e?w=800&q=80&auto=format&fit=crop` |

### 이미지 스타일 필터
```css
filter: brightness(0.82) contrast(1.08) saturate(0.9);
```

---

## 5. 색상 팔레트 (상태별)

### 정상 상태
```css
--ok: #10b981;
--ok-lt: rgba(16, 185, 129, 0.15);
배관: fill="#1e4d3a" stroke="#3A9A7A"
텍스트: fill="#00aab5" 또는 fill="#10b981"
```

### 경고 상태
```css
--warn: #f59e0b;
--warn-lt: rgba(245, 158, 11, 0.15);
배관: fill="#3D4A1A" stroke="#8B9A2A"
텍스트: fill="#E8B84B"
```

### 긴급 상태
```css
--danger: #ef4444;
--danger-lt: rgba(239, 68, 68, 0.15);
배관: fill="#3a1a1a" stroke="#8B3030"
텍스트: fill="#ff4444" 또는 fill="#ff8888"
```

---

## 사용 방법

### React 컴포넌트 예시
```jsx
// components/CctvDiagram/ExpansionJoint.jsx
export const ExpansionJointDiagram = ({ status = 'normal', value, temp }) => (
  <svg viewBox="0 0 160 100" className="cctv-diagram">
    {/* 위의 SVG 코드 그대로 사용 */}
    {/* status에 따라 색상 클래스 변경 */}
  </svg>
);
```

### Vue 컴포넌트 예시
```vue
<template>
  <svg viewBox="0 0 160 100" class="cctv-diagram">
    <!-- SVG 코드 그대로 -->
  </svg>
</template>
```

---

**중요**: 이 SVG 코드들은 정교하게 설계되어 있습니다. 수정 시 비율과 좌표가 틀어질 수 있으니 가능하면 그대로 사용하세요.
