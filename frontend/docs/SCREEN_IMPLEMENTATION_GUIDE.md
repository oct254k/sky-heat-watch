# 인천공항 AI 감시 시스템 - 화면 구현 가이드

## 개요

이 문서는 `frontend/docs/index_original.html` 파일의 화면 구성을 분석하고, 동일한 화면을 재구현하기 위한 상세 가이드입니다.

## 스크린샷 참조

| 해상도 | 파일 경로 | 설명 |
|--------|----------|------|
| 1920x1080 (Desktop) | `screenshots/desktop_1920_full.png` | 데스크톱 전체 페이지 |
| 1280x800 (Laptop) | `screenshots/desktop_1280_full.png` | 노트북 해상도 |
| 768x1024 (Tablet) | `screenshots/tablet_768_full.png` | 태블릿 (반응형 이슈 있음) |
| 375x812 (Mobile) | `screenshots/mobile_375_full.png` | 모바일 (반응형 이슈 있음) |

> **참고**: 현재 768px 이하에서는 레이아웃이 깨지는 반응형 이슈가 있습니다. 재구현 시 반응형 대응 필요.

---

## 1. 전체 레이아웃 구조

### 소스 참조: 라인 1-70 (CSS 변수 및 기본 레이아웃)

```
index_original.html: 1-70
```

### 1.1 CSS 변수 (Design Tokens)

**라인 10-11**: 색상 시스템 정의

```css
:root {
  /* 브랜드 컬러 */
  --iafc-green: #00AAB5;    /* 메인 teal 색상 */
  --iafc-blue: #5785C5;     /* 보조 파란색 */
  --iafc-yellow: #F99D1B;   /* 경고/강조 노란색 */

  /* 배경/표면 색상 */
  --bg: #F1F4F7;
  --surface: #FFFFFF;
  --surface2: #F7F9FB;
  --surface3: #EEF1F5;

  /* 상태 색상 */
  --ok: #059669;       /* 정상 - 녹색 */
  --warn: #D97706;     /* 경고 - 주황색 */
  --danger: #DC2626;   /* 위험 - 빨간색 */

  /* 레이아웃 변수 */
  --sb: 220px;         /* 사이드바 너비 */
  --hdr: 52px;         /* 헤더 높이 */
  --gnb: 48px;         /* GNB 높이 */
  --r: 10px;           /* 기본 border-radius */
}
```

### 1.2 전체 레이아웃 구조

**라인 13-14, 32-33**: 메인 레이아웃

```
┌─────────────────────────────────────────────────────────┐
│                      GNB (48px)                         │  ← #gnb
├────────────────┬────────────────────────────────────────┤
│                │              HEADER (44px)              │  ← #hdr
│   SIDEBAR      ├─────────────────────────────────────────┤
│   (220px)      │                                         │
│                │                                         │
│     #sb        │              CONTENT                    │  ← #content
│                │              #main                      │
│                │                                         │
│                │                                         │
└────────────────┴─────────────────────────────────────────┘
```

**HTML 구조 (라인 32-57)**:
```html
<body>
  <div id="gnb">...</div>           <!-- 상단 글로벌 내비게이션 -->
  <div id="app-body">               <!-- 메인 컨테이너 -->
    <nav id="sb">...</nav>          <!-- 좌측 사이드바 -->
    <div id="main">
      <div id="hdr">...</div>       <!-- 페이지 헤더 -->
      <div id="content">...</div>   <!-- 페이지 콘텐츠 -->
    </div>
  </div>
</body>
```

---

## 2. GNB (Global Navigation Bar)

### 소스 참조: 라인 14-31 (CSS), 라인 979-1001 (HTML)

### 2.1 GNB 구조

```
┌──────────────────────────────────────────────────────────────────────┐
│ [로고] │ 시스템명 ● │ [구역선택▼] │ 상태 │ 시간 │ [테마] │ [사용자] │
└──────────────────────────────────────────────────────────────────────┘
```

**스타일 특징**:
- 높이: 48px (`var(--gnb)`)
- 하단 border: 2px solid teal (`var(--iafc-green)`)
- 배경: 흰색 (`var(--surface)`)

### 2.2 주요 컴포넌트

| 컴포넌트 | 클래스 | 설명 |
|----------|--------|------|
| 로고 영역 | `#gnb-logo` | 너비 220px, 오른쪽 border |
| 시스템명 | `#gnb-system-name` | 녹색 pulse 애니메이션 dot 포함 |
| 구역 선택 | `#zone-selector` | 드롭다운 방식 |
| 시간 표시 | `.gnb-time` | JetBrains Mono 폰트 |
| 테마 토글 | `.theme-switch` | Light/Dark 전환 |
| 사용자 정보 | `#gnb-user` | 역할 배지 + 이름 + 로그아웃 |

---

## 3. 사이드바 (Sidebar)

### 소스 참조: 라인 33-56 (CSS), 라인 1003-1073 (HTML)

### 3.1 사이드바 구조

```
┌──────────────────┐
│ [실시간 모니터링] │  ← .sb-group-lbl
├──────────────────┤
│ ▪ 실시간 관제    │  ← .nav-item.active
│ ▪ 센서·영상 분석 │  ← .nav-item
│ ▪ 계측기 감시    │
│ ▪ 알람 관리 [5]  │  ← .nav-badge
├──────────────────┤
│ [PoC 시범사업]   │
│ ▪ 구축 개요      │
│ ▪ H/W 구성 상세  │
├──────────────────┤
│ [시스템 관리]    │
│ ▪ 시스템 상태    │
│ ...              │
├──────────────────┤
│ 시스템 가동률    │  ← .sb-footer
│ ████████░ 99.8%  │
└──────────────────┘
```

### 3.2 네비게이션 아이템 스타일

**라인 39-43**:
```css
.nav-item {
  display: flex;
  align-items: center;
  gap: 9px;
  padding: 8px 14px;
  border-left: 2px solid transparent;
}

.nav-item.active {
  background: var(--iafc-green-lt);
  color: var(--iafc-green);
  border-left-color: var(--iafc-green);
  font-weight: 700;
}
```

---

## 4. KPI 카드 영역

### 소스 참조: 라인 83-98 (CSS), 라인 1096-1152 (HTML)

### 4.1 KPI 그리드

**라인 83**: 5열 그리드
```css
.kpi-row {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 10px;
}
```

### 4.2 개별 KPI 카드 구조

```
┌─────────────────────────┐
│▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│  ← 상단 3px 색상 바 (::before)
├────────┬────────────────┤
│ [아이콘] │ CCTV 상태     │  ← .kpi-name
│  42px   │ 14/14          │  ← .kpi-num (font-size: 23px)
│         │ 고정형7·PTZ7   │  ← .kpi-sub
│         │ ● 정상         │  ← .tag.tag-ok
└────────┴────────────────┘
```

**HTML 예시 (라인 1097-1107)**:
```html
<div class="kpi" style="--kc:var(--iafc-green)">
  <div class="kpi-icon" style="background:var(--iafc-green-lt);color:var(--iafc-green)">
    <svg>...</svg>
  </div>
  <div class="kpi-info">
    <div class="kpi-name">CCTV 상태</div>
    <div class="kpi-num">14<span>/14</span></div>
    <div class="kpi-sub">고정형 7 · PTZ 7</div>
    <div class="tag tag-ok">● 정상</div>
  </div>
</div>
```

---

## 5. CCTV 모니터링 그리드

### 소스 참조: 라인 107-146 (CSS), 라인 1154-1796 (HTML)

### 5.1 CCTV 카드 헤더

**라인 1156-1175**:
- 카드 제목 + 서브텍스트
- 연결 상태 badge (`14/14 연결`)
- 도면/실사 토글 스위치

### 5.2 CCTV 탭

**라인 103-106** (CSS), **라인 1176-1181** (HTML):
```html
<div class="ctabs">
  <button class="ctab active" data-cat="all">전체 (14)</button>
  <button class="ctab" data-cat="expansion">수축/팽창 (4)</button>
  <button class="ctab" data-cat="gauge">게이지/밸브 (3)</button>
  <button class="ctab" data-cat="ptz">PTZ 광역 (7)</button>
</div>
```

### 5.3 CCTV 카드 그리드

**라인 111**:
```css
.cctv-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);  /* 4열 */
  gap: 8px;
  padding: 12px 15px;
}
```

### 5.4 개별 CCTV 카메라 카드

**라인 112-146** (CSS), **라인 1184-1236** (HTML - CAM-01 예시):

```
┌─────────────────────────────────────┐
│ [AI]                    [고정형]    │  ← .cam-ai, .cam-type
│                                     │
│      ┌─────────────────────┐        │  ← SVG 도면 or 실사 이미지
│      │   배관 SVG 도면     │        │
│      │   AI▶ 변위 0.08mm ✓ │        │
│      └─────────────────────┘        │
│                                     │
│                        [↕ 0.08mm]   │  ← .cam-val
├─────────────────────────────────────┤
│ CAM-01 구간1            [LIVE]      │  ← .cam-ov
│ 수축팽창 · A구역                    │
└─────────────────────────────────────┘
```

**주요 클래스**:
| 클래스 | 설명 |
|--------|------|
| `.cam` | 16:10 aspect-ratio, cursor:pointer |
| `.cam.alert-cam` | 경고 상태 (빨간 border) |
| `.cam-inner` | 배경 그라데이션 |
| `.cam-svg` | 도면/실사 모드용 |
| `.cam-scan` | 스캔 라인 애니메이션 |
| `.cam-ai` | AI 상태 배지 (n=정상, d=감지) |
| `.cam-val` | 측정값 표시 |
| `.cam-ov` | 오버레이 (ID + 위치 + LIVE) |
| `.aib` | AI 바운딩 박스 (경고시) |

---

## 6. 실시간 알람 패널

### 소스 참조: 라인 147-165 (CSS), 라인 1799-1812 (HTML)

### 6.1 알람 아이템 구조

**라인 148-165**:
```
┌─────────────────────────────────────┐
│ [경고] ─────────────────── 2분 전   │  ← .al-hd
├─────────────────────────────────────┤
│ A구역 구간2 배관#3 변위 임계값 근접 │  ← .al-title
│ CAM-02 구간2                        │  ← .al-desc
│ 현재: 0.45mm    임계: 0.50mm        │  ← .al-vals
└─────────────────────────────────────┘
```

**알람 등급별 스타일**:
| 클래스 | 색상 | border-left |
|--------|------|-------------|
| `.al-red` | danger-lt 배경 | 3px solid danger |
| `.al-orange` | warn-lt 배경 | 3px solid warn |
| `.al-blue` | iafc-blue-lt 배경 | 3px solid iafc-blue |

---

## 7. 센서 데이터 그리드

### 소스 참조: 라인 166-176 (CSS), 라인 1815-1831 (HTML)

### 7.1 센서 그리드 레이아웃

**라인 166**:
```css
.sensor-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);  /* 6열 */
  gap: 8px;
  padding: 12px 15px;
}
```

### 7.2 센서 카드 구조

**라인 167-176** (`.sc` 클래스):
```
┌───────────────────────┐
│ ● TEMP-01             │  ← .sc-id (dot + ID)
│ A구역 · 배관 #1       │  ← .sc-loc
│ 42.3°C                │  ← .sc-temp
│ ↕ 0.08mm              │  ← .sc-disp
└───────────────────────┘
```

**상태별 클래스**:
- `.sc.warn` - 경고 상태 (노란색 border)
- `.sc.danger` - 위험 상태 (빨간색 border)

---

## 8. 밸브 상태 그리드

### 소스 참조: 라인 177-191 (CSS), 라인 1833-1842 (HTML)

### 8.1 밸브 그리드

**라인 177**:
```css
.valve-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);  /* 4열 */
  gap: 10px;
  padding: 12px 15px;
}
```

### 8.2 밸브 카드 구조

```
┌─────────────────────────┐
│ 밸브 #1    [완전개방]   │  ← .vc-hd
├─────────────────────────┤
│       ┌─────┐           │
│       │ 90° │           │  ← .vc-dial (SVG 게이지)
│       └─────┘           │
│     개방각 90°          │  ← .vc-angle
│   C구역 · CAM-06        │  ← .vc-cam
└─────────────────────────┘
```

---

## 9. 시스템 상태 카드

### 소스 참조: 라인 192-202 (CSS), 라인 1843-1851 (HTML)

### 9.1 시스템 상태 그리드

**라인 192**:
```css
.sys-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);  /* 기본 3열 */
  gap: 10px;
  padding: 12px 15px;
}
```

### 9.2 시스템 상태 카드

```
┌─────────────────────────────────┐
│ ● AI 영상 분석 서버   정상 운영 │  ← .sys-top
├─────────────────────────────────┤
│ ████████████████████░░░░        │  ← .sys-bar
│ 99.8%                  가동률   │  ← .sys-meta
└─────────────────────────────────┘
```

---

## 10. 반응형 고려사항

### 현재 상태

현재 `index_original.html`은 **데스크톱 전용 레이아웃**으로 구현되어 있습니다.

### 반응형 구현 시 고려사항

| Breakpoint | 권장 변경사항 |
|------------|---------------|
| ≤1440px | KPI 그리드 3~4열로 축소 |
| ≤1024px | CCTV 그리드 3열, 사이드바 collapse |
| ≤768px | CCTV 그리드 2열, 탭 스크롤 |
| ≤480px | CCTV 그리드 1열, 모바일 내비게이션 |

### 추천 미디어쿼리

```css
/* Tablet */
@media (max-width: 1024px) {
  #sb { width: 0; display: none; }
  .kpi-row { grid-template-columns: repeat(3, 1fr); }
  .cctv-grid { grid-template-columns: repeat(3, 1fr); }
  .sensor-grid { grid-template-columns: repeat(4, 1fr); }
}

/* Mobile */
@media (max-width: 768px) {
  .kpi-row { grid-template-columns: repeat(2, 1fr); }
  .cctv-grid { grid-template-columns: repeat(2, 1fr); }
  .sensor-grid { grid-template-columns: repeat(2, 1fr); }
  .valve-grid { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 480px) {
  .kpi-row { grid-template-columns: 1fr; }
  .cctv-grid { grid-template-columns: 1fr; }
}
```

---

## 11. 다크모드 지원

### 소스 참조: 라인 11 (CSS)

`body.dark` 클래스가 적용되면 CSS 변수들이 다크 테마 값으로 재정의됩니다.

```css
body.dark {
  --bg: #0D1117;
  --surface: #161B22;
  --surface2: #1C2333;
  --txt1: #E6EDF3;
  --txt2: #9BADC0;
  /* ... */
}
```

---

## 12. 주요 페이지별 소스 위치

| 페이지 | HTML 라인 | 설명 |
|--------|----------|------|
| 로그인 화면 | 399-425 (CSS), JavaScript 동적 | 오버레이 모달 형태 |
| 실시간 관제 (p1) | 1094-1852 | 메인 대시보드 |
| 센서·영상 비교 분석 (p2) | 1854-1904 | 상관관계 차트 |
| 계측기 감시 (p3) | 1906-2157 | 게이지 모니터링 |
| 알람·이벤트 관리 (p4) | 2159-2201 | 알람 테이블 |
| 시스템 상태 (p5) | 2203-2270 | 서버/네트워크 상태 |
| 임계값 설정 (p6) | 2272-2363 | 설정 슬라이더 |
| 구축 개요 (p7) | 2365-2499 | PoC 배관망 지도 |

---

## 13. 외부 의존성

### 폰트

**라인 7**:
```html
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
```

- **Noto Sans KR**: 본문 텍스트 (`--sans`)
- **JetBrains Mono**: 숫자/코드 (`--mono`)

### 차트 라이브러리

**라인 8**:
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.min.js"></script>
```

---

## 14. 구현 체크리스트

### Phase 1: 기본 구조
- [ ] CSS 변수 시스템 구현
- [ ] 기본 레이아웃 (GNB + Sidebar + Main)
- [ ] 다크모드 토글

### Phase 2: 핵심 컴포넌트
- [ ] KPI 카드
- [ ] CCTV 그리드 (도면/실사 토글 포함)
- [ ] 알람 패널
- [ ] 센서 그리드
- [ ] 밸브 상태 카드
- [ ] 시스템 상태 카드

### Phase 3: 인터랙션
- [ ] 네비게이션 페이지 전환
- [ ] CCTV 탭 필터링
- [ ] 구역 선택 드롭다운
- [ ] 차트 통합 (Chart.js)

### Phase 4: 반응형
- [ ] 태블릿 레이아웃 (768-1024px)
- [ ] 모바일 레이아웃 (≤768px)
- [ ] 사이드바 collapse 기능

---

## 부록: 이미지 리소스

### CCTV 도면 SVG
- 라인 1186-1223: CAM-01 도면 SVG 예시
- 배관, 익스팬션 조인트, 온도 표시 등 인라인 SVG로 구현

### 실사 이미지 (Fallback)
- Unsplash에서 산업 배관 이미지 사용
- `onerror` 핸들러로 fallback 처리

---

*문서 작성일: 2026-03-12*
*원본 파일: frontend/docs/index_original.html*
