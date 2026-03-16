# SKY 모니터링 시스템 개발 가이드

이 문서는 Claude 에이전트가 모니터링 시스템 프론트엔드를 개발할 때 참조해야 하는 가이드입니다.

## 필수 참조 문서

개발 시작 전 반드시 아래 문서들을 읽어야 합니다:

| 문서 | 경로 | 설명 |
|------|------|------|
| **화면 구현 가이드** | `frontend/docs/SCREEN_IMPLEMENTATION_GUIDE.md` | 전체 화면 구조, CSS, 컴포넌트 설명 |
| **원본 HTML** | `frontend/docs/index_original.html` | 참조용 원본 소스 (청크 단위로 읽을 것) |
| **스크린샷** | `frontend/docs/screenshots/` | 각 뷰포트별 화면 캡처 |

## 개발 워크플로우

### 1단계: 문서 파악

```
1. SCREEN_IMPLEMENTATION_GUIDE.md 전체 읽기
2. 스크린샷 이미지 확인 (desktop_1920_full.png 등)
3. 구현할 섹션의 라인 번호 확인
```

### 2단계: 소스 코드 참조

가이드 문서에 명시된 라인 번호를 기준으로 원본 소스를 참조합니다:

```
예시: KPI 카드 구현 시
→ SCREEN_IMPLEMENTATION_GUIDE.md에서 "KPI 카드" 섹션 확인
→ "Lines 83-98" 참조하라고 되어 있으면
→ index_original.html의 83~98번 줄을 Read tool로 읽기
```

**주의**: `index_original.html`은 646KB로 매우 큽니다. 반드시 offset/limit 파라미터를 사용하여 필요한 부분만 읽으세요.

```
# 올바른 방법
Read(file_path="frontend/docs/index_original.html", offset=83, limit=20)

# 잘못된 방법 (전체 파일 읽기 시도 - 실패함)
Read(file_path="frontend/docs/index_original.html")
```

### 3단계: 컴포넌트 구현

React/Vue 등 프레임워크로 변환 시:
1. 원본 HTML 구조 유지
2. CSS 변수 시스템 그대로 사용
3. 클래스명 컨벤션 유지

---

## 재사용 필수 리소스

### 모니터링 이미지 및 도면 - 그대로 가져오기

**모든 SVG 도면과 아이콘은 `frontend/docs/ASSETS_REFERENCE.md`에 추출되어 있습니다.**
새로 만들지 말고 해당 문서에서 복사해서 사용하세요.

```
frontend/docs/ASSETS_REFERENCE.md 내용:
├── 1. KPI 아이콘 (9종) - CCTV, 온도계, 밸브, 알람 등
├── 2. CCTV 카메라 도면 (14개) - 배관, 압력게이지, 밸브, PTZ 등
├── 3. 밸브 다이얼 게이지 SVG
├── 4. 실사 이미지 URL (Unsplash)
└── 5. 색상 팔레트 (상태별: 정상/경고/긴급)
```

### 사용 예시

```jsx
// ASSETS_REFERENCE.md에서 SVG 코드 복사
import { ExpansionJointSvg } from './diagrams';

// 또는 인라인으로 직접 사용
<svg viewBox="0 0 160 100">
  {/* ASSETS_REFERENCE.md의 CAM-01 코드 그대로 복사 */}
</svg>
```

### 주의사항

- SVG 도면은 정교하게 설계됨 - 좌표/비율 수정 금지
- 색상 변경 시 CSS 변수 사용
- 실사 이미지 URL은 Unsplash에서 제공 (개발용)

---

## CSS 시스템

### 필수 CSS 변수

`index_original.html` Lines 1-70에 정의된 CSS 변수를 반드시 사용:

```css
:root {
  --bg-primary: #1a1d23;
  --bg-secondary: #22262d;
  --bg-card: #2a2f38;
  --text-primary: #ffffff;
  --text-secondary: #a0a7b5;
  --accent-blue: #3498db;
  --accent-green: #27ae60;
  --accent-red: #e74c3c;
  --accent-orange: #f39c12;
  --shadow-card: 0 4px 6px rgba(0, 0, 0, 0.3);
}
```

### 레이아웃 그리드

| 컴포넌트 | 그리드 | 참조 라인 |
|----------|--------|-----------|
| KPI 카드 | 5열 | Lines 83-98 |
| CCTV 카드 | 4열 | Lines 107-146 |
| 센서 그리드 | 6열 | Lines 166-176 |
| 밸브 카드 | 4열 | Lines 177-191 |

---

## 페이지 구조

```
index_original.html 페이지 구성:

p1: 메인 대시보드 (Lines 1094-1852)
p2: 상세 모니터링 (Lines 1854-1950)
p3: CCTV 전체 보기 (Lines 1952-2050)
p4: 알람 이력 (Lines 2052-2150)
p5: 센서 상세 (Lines 2152-2250)
p6: 밸브 제어 (Lines 2252-2350)
p7: 설정 (Lines 2352-2450)
```

---

## 반응형 주의사항

현재 원본은 **데스크톱 전용**입니다. 반응형 구현 시:

1. 768px 이하: 그리드를 2열 또는 1열로 변경
2. 사이드바: 모바일에서 햄버거 메뉴로 전환
3. 차트: 가로 스크롤 또는 축소 처리

스크린샷 참조:
- `screenshots/tablet_768_full.png` - 현재 깨지는 상태 확인용
- `screenshots/mobile_375_full.png` - 현재 깨지는 상태 확인용

---

## 개발 체크리스트

컴포넌트 개발 완료 전 확인:

- [ ] SCREEN_IMPLEMENTATION_GUIDE.md의 해당 섹션 읽음
- [ ] 원본 HTML 라인 참조하여 구조 확인
- [ ] CSS 변수 시스템 사용
- [ ] SVG 도면/이미지는 원본 그대로 복사
- [ ] 스크린샷과 비교하여 레이아웃 일치 확인
- [ ] 다크모드 지원 (body.dark 클래스)

---

## 파일 구조 권장

```
frontend/
├── src/
│   ├── assets/
│   │   ├── diagrams/          # SVG 도면 (원본에서 추출)
│   │   │   ├── cctv-layout.svg
│   │   │   ├── valve-diagram.svg
│   │   │   └── sensor-icons.svg
│   │   └── styles/
│   │       └── variables.css  # CSS 변수 (Lines 1-70 기반)
│   ├── components/
│   │   ├── KpiCard/
│   │   ├── CctvCard/
│   │   ├── AlarmPanel/
│   │   ├── SensorGrid/
│   │   └── ValveCard/
│   └── pages/
│       ├── Dashboard/         # p1
│       ├── Monitoring/        # p2
│       ├── CctvView/          # p3
│       └── ...
├── docs/
│   ├── SCREEN_IMPLEMENTATION_GUIDE.md
│   ├── index_original.html
│   └── screenshots/
└── CLAUDE.md (이 파일)
```

---

## 문의 시 포함할 정보

작업 중 문제 발생 시 아래 정보를 포함하여 질문:

1. 참조한 가이드 문서 섹션
2. 원본 HTML 라인 번호
3. 현재 구현 코드
4. 예상 결과 vs 실제 결과 스크린샷
