/**
 * AI 챗봇 시나리오 데이터
 *
 * 시나리오 1: 이상 분석 및 WO(작업지시서) 발행
 * 시나리오 2: 점검일지 자동 완성 및 이력 조회
 * 시나리오 3: 성수기 대비 점검 계획 및 시뮬레이션
 */

export interface ChatScenarioResponse {
  text: string;
  type?: 'text' | 'table' | 'alarm' | 'analysis' | 'wo' | 'checklist' | 'history' | 'plan' | 'simulation';
  tableData?: { headers: string[]; rows: (string | { value: string; status?: string })[][] };
  alarms?: { level: 'danger' | 'warn' | 'info'; title: string; desc: string }[];
  actions?: { label: string; action: string }[];
}

// 시나리오 1: 이상 분석 키워드
const SCENARIO_1_ANALYSIS_KEYWORDS = [
  'aicc 2호기', 'aicc-chl-002', '2호기 고압', '고압 경보', '고압 발생',
  '원인 분석', '원인이 뭐', '분석해줘', '고압 원인'
];

const SCENARIO_1_WO_KEYWORDS = [
  'wo 발행', 'wo발행', '작업지시서', '발행해줘', 'wo 만들어', '정비 요청'
];

// 시나리오 2: 점검일지 자동 완성 키워드
const SCENARIO_2_CHECKLIST_KEYWORDS = [
  '점검 결과', '자동 채워', '센서 데이터로', '점검일지 자동', '성능 점검',
  '관제탑 냉동기', '오늘 점검', '데이터로 채워'
];

const SCENARIO_2_HISTORY_KEYWORDS = [
  '이상 이력', '3개월', '최근 이력', '이력 보여', '과거 이력', '이상 기록'
];

// 시나리오 3: 성수기 대비 점검 계획 키워드
const SCENARIO_3_PLAN_KEYWORDS = [
  '성수기', '여름', '피크', '7월', '8월', '사전 점검', '점검 일정',
  '대비해서', '일정 잡아'
];

const SCENARIO_3_SIMULATION_KEYWORDS = [
  '고장나면', '버틸 수', '나머지로', '여유율', '시뮬레이션',
  '1대 이탈', '1대 고장'
];

// 키워드 매칭 함수
const matchesKeywords = (query: string, keywords: string[]): boolean => {
  const lowerQuery = query.toLowerCase();
  return keywords.some(keyword => lowerQuery.includes(keyword.toLowerCase()));
};

// 시나리오 응답 생성 함수
export const generateScenarioResponse = (query: string): ChatScenarioResponse | null => {
  // 시나리오 1-1: AICC 2호기 고압 경보 원인 분석
  if (matchesKeywords(query, SCENARIO_1_ANALYSIS_KEYWORDS)) {
    return {
      text: `🔍 **AICC-CHL-002 이상 분석**

**고압:** 32.1 bar ▲ (임계값 30.0 초과)
**냉각수 온도:** 35.2°C (+4.1°C ↑) / **전류:** 148A

🤖 **AI 추정 원인** (유사 4건 매칭)
**1순위** — 냉각탑 팬 효율 저하 : 스케일
**2순위** — 냉매 과충전 가능성

📌 **2024.08 관제탑 1호기 동일 증상**
→ 베어링 교체 후 2h 내 정상 복귀`,
      type: 'analysis',
      actions: [
        { label: 'WO 발행', action: 'wo_create' },
        { label: 'CCTV 확인', action: 'p2' },
        { label: '트렌드 분석', action: 'chart' },
      ],
    };
  }

  // 시나리오 1-2: WO(작업지시서) 발행
  if (matchesKeywords(query, SCENARIO_1_WO_KEYWORDS)) {
    return {
      text: `📄 **WO-2026-0316-004 생성 완료**

**설비:** AICC-CHL-002 / 긴급 정비
**담당:** 이시설 (현장팀) 즉시 배정
✅ **담당자 알림 발송 완료**`,
      type: 'wo',
      actions: [
        { label: 'WO 상세 보기', action: 'wo_detail' },
        { label: '점검일지 연결', action: 'p8' },
      ],
    };
  }

  // 시나리오 2-1: 점검일지 자동 완성
  if (matchesKeywords(query, SCENARIO_2_CHECKLIST_KEYWORDS)) {
    return {
      text: `⚙️ **점검일지 자동 완성** (2026.03.16)
━━━━━━━━━━━━━━━━━━━━━

**관제탑-CHL-001**
고압 24.8 bar ✅  저압 4.2 bar ✅
전류 82A (88%)  열류 0.91  진동 0.8mm/s ✅

**관제탑-CHL-002**
고압 25.1 bar ✅  저압 4.1 bar ✅
전류 85A (91%)  열류 0.90  진동 1.1mm/s ✅

📊 **BEMS 일사용량 자동 반영:** 24 MWh
✅ **3종 점검표 모두 기입 완료**`,
      type: 'checklist',
      actions: [
        { label: '점검일지 확인', action: 'p8' },
        { label: 'PDF 다운로드', action: 'download' },
        { label: '이력 조회', action: 'history' },
      ],
    };
  }

  // 시나리오 2-2: 이상 이력 조회
  if (matchesKeywords(query, SCENARIO_2_HISTORY_KEYWORDS)) {
    return {
      text: `📁 **이상 이력** (2025.12 ~ 2026.03)
**총 3건** — 긴급 정비 0건 (경미)

• 2026.02.11 CHL-001 저압경보 → 냉매보충
• 2026.01.28 CHL-002 진동이상 → 윤활보충
• 2025.12.19 CHL-001 고압주의 → 에어빼기

⚠️ **CHL-001 저압 이상 반복 → 냉매누설 정밀확인 권고**`,
      type: 'history',
      actions: [
        { label: '상세 이력 보기', action: 'p4' },
        { label: '정밀점검 요청', action: 'wo_create' },
      ],
    };
  }

  // 시나리오 3-1: 성수기 대비 점검 계획
  if (matchesKeywords(query, SCENARIO_3_PLAN_KEYWORDS)) {
    return {
      text: `😎 **성수기 대비 점검 계획** (6월 완료)
7~8월 인천공항 일 이용객 ~25만명 피크

🔴 **6/1~10  AICC 1·2호기**
냉각탑 팬 베어링·벨트 / 스케일 세정

🔴 **6/1~10  공항청사 1·2호기**
압축기 진동 6점 측정 / 오일 분석

🟠 **6/11~20  관제탑 1·2호기**
전류·열류 부하 시험 / 임계값 재설정

✅ **일정 등록 및 WO 일괄 생성 가능**`,
      type: 'plan',
      actions: [
        { label: '일정 등록', action: 'schedule' },
        { label: 'WO 일괄 생성', action: 'wo_batch' },
        { label: '시뮬레이션', action: 'simulate' },
      ],
    };
  }

  // 시나리오 3-2: 냉방 부하 여유율 시뮬레이션
  if (matchesKeywords(query, SCENARIO_3_SIMULATION_KEYWORDS)) {
    return {
      text: `📊 **냉방 부하 여유율 시뮬레이션**

**전체 용량** 364.86 USRT / **피크 부하** ~320 USRT

**AICC 1대 이탈** → 282 USRT
⚠️ 피크 시 부하율 107~117% — **단기만 가능**

**관제탑 1대 이탈** → 325 USRT ✅ **정상 운영**

💡 **AICC 예비 부품(베어링·오일필터) 사전 확보 권고**`,
      type: 'simulation',
      actions: [
        { label: '예비품 확인', action: 'parts' },
        { label: '점검 일정 등록', action: 'schedule' },
      ],
    };
  }

  return null;
};

// 시나리오 빠른 질문 (시나리오 순서대로 정렬)
export const SCENARIO_QUICK_QUESTIONS = [
  // 시나리오 1: 이상 분석 및 WO 발행
  { id: 'sq1', label: '고압 경보 분석', query: 'AICC 2호기 고압 경보 발생했어, 원인이 뭔지 분석해줘' },
  { id: 'sq2', label: 'WO 발행', query: 'WO 발행해줘' },
  // 시나리오 2: 점검일지 자동 완성 및 이력 조회
  { id: 'sq3', label: '점검일지 자동완성', query: '관제탑 냉동기 2대 오늘 성능 점검 결과를 센서 데이터로 자동 채워줘' },
  { id: 'sq4', label: '이상 이력 조회', query: '관제탑 냉동기 최근 3개월 이상 이력 보여줘' },
  // 시나리오 3: 성수기 대비 점검 계획 및 시뮬레이션
  { id: 'sq5', label: '성수기 점검계획', query: '곧 여름 성수기야. 7~8월 피크 대비해서 냉동기 사전 점검 일정 잡아줘' },
  { id: 'sq6', label: '부하 시뮬레이션', query: '냉동기 1대 고장나면 나머지로 버틸 수 있어?' },
];
