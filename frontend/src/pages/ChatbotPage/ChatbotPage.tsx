import React, { useState, useRef, useEffect } from 'react';
import './ChatbotPage.css';
import { generateScenarioResponse, SCENARIO_QUICK_QUESTIONS } from '../../components/Chatbot/chatScenarios';

// 메시지 타입
interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  time: string;
  type?: 'text' | 'table' | 'alarm' | 'analysis' | 'wo' | 'checklist' | 'history' | 'plan' | 'simulation';
  tableData?: { headers: string[]; rows: (string | { value: string; status?: string })[][] };
  alarms?: { level: 'danger' | 'warn' | 'info'; title: string; desc: string }[];
  actions?: { label: string; action: string }[];
}

// 대화 히스토리 타입
interface ChatHistory {
  id: string;
  title: string;
  time: string;
}

// 빠른 질문 목록 (시나리오 확장)
const QUICK_QUESTIONS = [
  ...SCENARIO_QUICK_QUESTIONS,  // 시나리오 빠른 질문 전체
  { id: 'q7', label: '현재 알람 현황', query: '현재 알람 현황 알려줘' },
  { id: 'q8', label: '전체 설비 현황', query: '전체 설비 현황' },
];

// 대화 히스토리 샘플
const CHAT_HISTORY: ChatHistory[] = [
  { id: 'h1', title: '냉동기 상태 조회', time: '오늘 10:32' },
  { id: 'h2', title: '알람 현황 분석', time: '오늘 09:15' },
  { id: 'h3', title: '점검일지 확인', time: '어제 16:45' },
  { id: 'h4', title: '에너지 사용량 조회', time: '어제 14:20' },
];

// 키워드 기반 응답 생성 (프로토타입용)
const generateResponse = (query: string): Omit<ChatMessage, 'id' | 'time'> => {
  const lowerQuery = query.toLowerCase();

  // 시나리오 응답 먼저 확인
  const scenarioResponse = generateScenarioResponse(query);
  if (scenarioResponse) {
    return {
      sender: 'ai',
      ...scenarioResponse,
    };
  }

  // 인사말
  if (lowerQuery.includes('안녕') || lowerQuery.includes('하이') || lowerQuery.includes('hello')) {
    return {
      sender: 'ai',
      text: '안녕하세요! 열원사업소 AI 운영 어시스턴트입니다.\n\n설비 상태, 알람, 점검일지 등 궁금한 점을 자유롭게 질문해 주세요. 빠른 질문 버튼을 활용하시면 더 편리합니다.',
      type: 'text',
    };
  }

  // 냉동기 관련
  if (lowerQuery.includes('냉동기') || lowerQuery.includes('스크류') || lowerQuery.includes('chiller')) {
    return {
      sender: 'ai',
      text: '**스크류냉동기 현황** (6대)\n\n현재 4대 가동 중, 2대 대기 상태입니다. 모든 가동 중인 냉동기는 정상 범위 내에서 운전 중입니다.',
      type: 'table',
      tableData: {
        headers: ['설비', '상태', '용량', '고압(kg/cm²)', '저압(kg/cm²)', '토출온도'],
        rows: [
          ['AICC #1', { value: '● 가동', status: 'ok' }, '82.24 USRT', '13.5', '4.2', '72°C'],
          ['AICC #2', { value: '● 가동', status: 'ok' }, '82.24 USRT', '14.1', '4.5', '75°C'],
          ['관제탑 #1', { value: '● 가동', status: 'ok' }, '40 USRT', '12.8', '3.8', '68°C'],
          ['관제탑 #2', { value: '○ 대기', status: 'warn' }, '40 USRT', '-', '-', '-'],
          ['공항청사 #1', { value: '● 가동', status: 'ok' }, '60.19 USRT', '13.2', '4.0', '70°C'],
          ['공항청사 #2', { value: '○ 대기', status: 'warn' }, '60.19 USRT', '-', '-', '-'],
        ],
      },
      actions: [
        { label: '냉동기 상세 보기', action: 'p3' },
        { label: '트렌드 차트', action: 'chart' },
      ],
    };
  }

  // 알람 관련
  if (lowerQuery.includes('알람') || lowerQuery.includes('경고') || lowerQuery.includes('긴급') || lowerQuery.includes('이상')) {
    return {
      sender: 'ai',
      text: '**현재 알람 현황**\n\n총 3건의 알람이 발생했습니다.\n- 긴급: 1건\n- 경고: 1건\n- 정보: 1건',
      type: 'alarm',
      alarms: [
        { level: 'danger', title: '[DX] AICC 팬류 F-01 진동 임계값 초과', desc: '현재값: 3.8mm/s > 임계값: 3.0mm/s · 발생: 14:32' },
        { level: 'warn', title: '[AI] 관제탑 냉동기 #1 베어링 결함 징후', desc: 'FFT 분석 BPFO 패턴 감지 · 14일 내 점검 권장' },
        { level: 'info', title: 'AICC 냉각탑 정기 점검 완료', desc: 'CAM-01 ~ CAM-02 정상 확인 · 08:00' },
      ],
      actions: [
        { label: '알람 페이지 이동', action: 'p4' },
        { label: 'CCTV 확인', action: 'p2' },
      ],
    };
  }

  // 점검일지 관련
  if (lowerQuery.includes('점검') || lowerQuery.includes('일지') || lowerQuery.includes('보고서')) {
    return {
      sender: 'ai',
      text: '**오늘 점검일지** (2026-03-16)\n\n✓ 자동 생성 완료 (시스템)\n✓ 냉동기 6대 데이터 수집 완료\n✓ 진동센서 12개 정상 수집\n✓ 알람 3건 기록됨',
      type: 'table',
      tableData: {
        headers: ['점검 항목', '상태', '비고'],
        rows: [
          ['냉동기 운전 현황', { value: '완료', status: 'ok' }, '6대 중 4대 가동'],
          ['센서 데이터 수집', { value: '정상', status: 'ok' }, '12개 센서 100% 수집'],
          ['알람 이력 기록', { value: '3건', status: 'warn' }, '긴급 1, 경고 1, 정보 1'],
          ['특이사항', { value: '있음', status: 'warn' }, '팬류 F-01 점검 필요'],
        ],
      },
      actions: [
        { label: '점검일지 보기', action: 'p8' },
        { label: 'PDF 다운로드', action: 'download' },
        { label: 'Excel 다운로드', action: 'download' },
      ],
    };
  }

  // 진동 센서 관련
  if (lowerQuery.includes('진동') || lowerQuery.includes('센서') || lowerQuery.includes('vib')) {
    return {
      sender: 'ai',
      text: '**진동 센서 현황** (12개)\n\n11개 정상, 1개 주의 상태입니다.\n\n⚠️ VIB-03 (AICC 팬류 F-01)에서 임계값 초과가 감지되었습니다.',
      type: 'table',
      tableData: {
        headers: ['센서 ID', '위치', 'RMS', 'Peak', '온도', '상태'],
        rows: [
          ['VIB-01', 'AICC 냉각탑 #1', '2.1 mm/s', '3.2 mm/s', '25.3°C', { value: '정상', status: 'ok' }],
          ['VIB-02', 'AICC 냉각탑 #2', '2.3 mm/s', '3.5 mm/s', '26.1°C', { value: '정상', status: 'ok' }],
          ['VIB-03', 'AICC 팬류 F-01', '3.8 mm/s', '5.1 mm/s', '28.5°C', { value: '⚠ 주의', status: 'warn' }],
          ['VIB-04', 'AICC 팬류 F-02', '1.9 mm/s', '2.8 mm/s', '24.2°C', { value: '정상', status: 'ok' }],
          ['VIB-05', '관제탑 냉동기 #1', '1.8 mm/s', '2.6 mm/s', '22.5°C', { value: '정상', status: 'ok' }],
          ['VIB-06', '관제탑 냉동기 #2', '2.0 mm/s', '2.9 mm/s', '23.0°C', { value: '정상', status: 'ok' }],
        ],
      },
      actions: [
        { label: '실시간 관제', action: 'p1' },
        { label: 'AI 예측 분석', action: 'p9' },
      ],
    };
  }

  // 에너지 관련
  if (lowerQuery.includes('에너지') || lowerQuery.includes('전력') || lowerQuery.includes('사용량')) {
    return {
      sender: 'ai',
      text: '**오늘 에너지 현황** (BEMS 연동)\n\n총 전력 사용량: 2,847 kWh\n전일 대비: -3.2% ↓ (절감)\n\n💡 AI 최적 제어로 불필요 전력 소모를 절감하고 있습니다.',
      type: 'table',
      tableData: {
        headers: ['건물', '금일 사용량', '전일 대비', '월 누계', '상태'],
        rows: [
          ['AICC', '1,245 kWh', '-2.1% ↓', '32,450 kWh', { value: '정상', status: 'ok' }],
          ['관제탑', '892 kWh', '-4.5% ↓', '21,280 kWh', { value: '절감', status: 'ok' }],
          ['공항청사', '710 kWh', '-3.8% ↓', '18,960 kWh', { value: '절감', status: 'ok' }],
        ],
      },
    };
  }

  // 설비 현황
  if (lowerQuery.includes('설비') || lowerQuery.includes('현황') || lowerQuery.includes('상태')) {
    return {
      sender: 'ai',
      text: '**전체 설비 현황**\n\n총 32대 설비 중 30대 정상 운영 중입니다.\n\n⚠️ 팬류 1대, 펌프 1대에서 주의 상태가 감지되었습니다.',
      type: 'table',
      tableData: {
        headers: ['설비 구분', '전체', '정상', '주의', '가동률'],
        rows: [
          ['스크류냉동기', '6', '6', '0', { value: '100%', status: 'ok' }],
          ['냉각탑', '4', '4', '0', { value: '100%', status: 'ok' }],
          ['팬류', '8', '7', '1', { value: '87.5%', status: 'warn' }],
          ['공조기', '6', '6', '0', { value: '100%', status: 'ok' }],
          ['펌프', '8', '7', '1', { value: '87.5%', status: 'warn' }],
        ],
      },
      actions: [
        { label: '설비 현황 보기', action: 'p5' },
        { label: '임계값 설정', action: 'p6' },
      ],
    };
  }

  // 예측/분석 관련
  if (lowerQuery.includes('예측') || lowerQuery.includes('분석') || lowerQuery.includes('ai') || lowerQuery.includes('고장')) {
    return {
      sender: 'ai',
      text: '**AI 예측 분석 현황**\n\n현재 1건의 예지보전 권고사항이 있습니다.\n\n🔍 **관제탑 냉동기 #1 베어링 결함 징후**\n- 분석 방법: FFT 스펙트럼 분석\n- 감지 패턴: BPFO (외륜 결함 주파수)\n- 신뢰도: 87%\n- 권장 조치: 14일 내 베어링 점검',
      type: 'text',
      actions: [
        { label: 'AI 예측 분석', action: 'p9' },
        { label: '점검 일정 등록', action: 'schedule' },
      ],
    };
  }

  // 도움말
  if (lowerQuery.includes('도움') || lowerQuery.includes('help') || lowerQuery.includes('뭐') || lowerQuery.includes('기능') || lowerQuery.includes('어떻게')) {
    return {
      sender: 'ai',
      text: '**AI 운영 어시스턴트 사용 가이드**\n\n다음과 같은 질문을 하실 수 있습니다:\n\n📊 **설비 관련**\n• "냉동기 상태 알려줘"\n• "진동 센서 현황"\n• "전체 설비 현황"\n\n🚨 **알람 관련**\n• "현재 알람 현황"\n• "긴급 알람 확인"\n\n📋 **보고서 관련**\n• "오늘 점검일지 보여줘"\n• "에너지 사용량"\n\n🔮 **AI 분석**\n• "예측 분석 결과"\n• "고장 예측 현황"\n\n아래 빠른 질문 버튼을 활용하시면 더 편리합니다!',
      type: 'text',
    };
  }

  // 기본 응답
  return {
    sender: 'ai',
    text: '죄송합니다. 해당 질문을 정확히 이해하지 못했습니다.\n\n다음과 같은 키워드로 질문해 주세요:\n• 냉동기, 센서, 설비 (상태 조회)\n• 알람, 경고 (알람 현황)\n• 점검일지, 보고서 (일지 조회)\n• 에너지, 전력 (사용량 조회)\n\n"도움말"을 입력하시면 자세한 사용 방법을 안내해 드립니다.',
    type: 'text',
  };
};

// 현재 시간 포맷
const getCurrentTime = () => {
  return new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' });
};

// 아이콘 컴포넌트들
const BotIcon = () => (
  <svg viewBox="0 0 24 24">
    <rect x="3" y="11" width="18" height="10" rx="2" />
    <circle cx="12" cy="5" r="2" />
    <path d="M12 7v4" />
    <circle cx="8" cy="16" r="1" />
    <circle cx="16" cy="16" r="1" />
  </svg>
);

const SendIcon = () => (
  <svg viewBox="0 0 24 24">
    <line x1="22" y1="2" x2="11" y2="13" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);

export interface ChatbotPageProps {
  onNavigate?: (page: string) => void;
}

export const ChatbotPage: React.FC<ChatbotPageProps> = ({ onNavigate }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // 스크롤 자동 이동
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // 웰컴 메시지
  useEffect(() => {
    if (messages.length === 0) {
      const welcomeMessage: ChatMessage = {
        id: 'welcome',
        sender: 'ai',
        text: '안녕하세요! 👋\n\n열원사업소 **AI 운영 어시스턴트**입니다.\n\n설비 상태, 알람 현황, 점검일지 등 궁금한 점을 자유롭게 질문해 주세요.\n아래 빠른 질문 버튼을 활용하시면 더 편리합니다.',
        time: getCurrentTime(),
        type: 'text',
      };
      setMessages([welcomeMessage]);
    }
  }, [messages.length]);

  // 메시지 전송
  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: input.trim(),
      time: getCurrentTime(),
      type: 'text',
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = input.trim();
    setInput('');
    setIsTyping(true);

    // 타이핑 효과 후 응답
    setTimeout(() => {
      const response = generateResponse(currentInput);
      const aiMessage: ChatMessage = {
        id: `ai-${Date.now()}`,
        time: getCurrentTime(),
        ...response,
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 800 + Math.random() * 500);
  };

  // 빠른 질문 클릭
  const handleQuickQuestion = (query: string) => {
    setInput(query);
    setTimeout(() => {
      const userMessage: ChatMessage = {
        id: `user-${Date.now()}`,
        sender: 'user',
        text: query,
        time: getCurrentTime(),
        type: 'text',
      };
      setMessages(prev => [...prev, userMessage]);
      setIsTyping(true);

      setTimeout(() => {
        const response = generateResponse(query);
        const aiMessage: ChatMessage = {
          id: `ai-${Date.now()}`,
          time: getCurrentTime(),
          ...response,
        };
        setMessages(prev => [...prev, aiMessage]);
        setIsTyping(false);
      }, 800 + Math.random() * 500);

      setInput('');
    }, 100);
  };

  // 액션 버튼 클릭
  const handleAction = (action: string) => {
    if (action.startsWith('p')) {
      onNavigate?.(action);
    } else if (action === 'download') {
      alert('다운로드 기능은 추후 구현 예정입니다.');
    } else if (action === 'chart') {
      alert('차트 보기 기능은 추후 구현 예정입니다.');
    } else if (action === 'schedule') {
      alert('점검 일정 등록 기능은 추후 구현 예정입니다.');
    }
  };

  // 엔터키 전송
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // 테이블 렌더링
  const renderTable = (data: ChatMessage['tableData']) => {
    if (!data) return null;
    return (
      <table className="chatbot-fs-table">
        <thead>
          <tr>
            {data.headers.map((header, i) => (
              <th key={i}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.rows.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => (
                <td
                  key={j}
                  className={typeof cell === 'object' ? `status-${cell.status}` : ''}
                >
                  {typeof cell === 'object' ? cell.value : cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  // 알람 카드 렌더링
  const renderAlarms = (alarms: ChatMessage['alarms']) => {
    if (!alarms) return null;
    return alarms.map((alarm, i) => (
      <div key={i} className={`chatbot-fs-alarm ${alarm.level}`}>
        <div className="chatbot-fs-alarm-header">
          <span className={`chatbot-fs-alarm-badge ${alarm.level}`}>
            {alarm.level === 'danger' ? '긴급' : alarm.level === 'warn' ? '경고' : '정보'}
          </span>
        </div>
        <div className="chatbot-fs-alarm-title">{alarm.title}</div>
        <div className="chatbot-fs-alarm-desc">{alarm.desc}</div>
      </div>
    ));
  };

  return (
    <div className="chatbot-page">
      <div className="chatbot-fullscreen">
        {/* 헤더 */}
        <div className="chatbot-fs-header">
          <div className="chatbot-fs-title">
            <div className="chatbot-fs-icon">
              <BotIcon />
            </div>
            <div className="chatbot-fs-text">
              <h2>AI 운영 어시스턴트</h2>
              <p>열원사업소 · 설비 상태, 알람, 점검일지 질의응답</p>
            </div>
          </div>
          <div className="chatbot-fs-status">
            온라인
          </div>
        </div>

        {/* 메인 영역 */}
        <div className="chatbot-fs-main">
          {/* 대화 영역 */}
          <div className="chatbot-fs-chat">
            {/* 메시지 목록 */}
            <div className="chatbot-fs-messages">
              {messages.map((msg) => (
                <div key={msg.id} className={`chatbot-fs-message ${msg.sender}`}>
                  <div className="chatbot-fs-avatar">
                    {msg.sender === 'ai' ? '🤖' : '👤'}
                  </div>
                  <div className="chatbot-fs-bubble">
                    <div className="chatbot-fs-text" style={{ whiteSpace: 'pre-wrap' }}>
                      {msg.text}
                    </div>
                    {msg.type === 'table' && renderTable(msg.tableData)}
                    {msg.type === 'alarm' && renderAlarms(msg.alarms)}
                    {msg.actions && (
                      <div className="chatbot-fs-actions">
                        {msg.actions.map((action, i) => (
                          <button
                            key={i}
                            className="chatbot-fs-action-btn"
                            onClick={() => handleAction(action.action)}
                          >
                            {action.label}
                          </button>
                        ))}
                      </div>
                    )}
                    <div className="chatbot-fs-time">{msg.time}</div>
                  </div>
                </div>
              ))}

              {/* 타이핑 인디케이터 */}
              {isTyping && (
                <div className="chatbot-fs-message ai">
                  <div className="chatbot-fs-avatar">🤖</div>
                  <div className="chatbot-fs-typing">
                    <div className="chatbot-fs-typing-dots">
                      <span className="chatbot-fs-typing-dot" />
                      <span className="chatbot-fs-typing-dot" />
                      <span className="chatbot-fs-typing-dot" />
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* 빠른 질문 */}
            <div className="chatbot-fs-quick">
              <div className="chatbot-fs-quick-title">빠른 질문</div>
              <div className="chatbot-fs-quick-btns">
                {QUICK_QUESTIONS.map((q) => (
                  <button
                    key={q.id}
                    className="chatbot-fs-quick-btn"
                    onClick={() => handleQuickQuestion(q.query)}
                  >
                    {q.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 입력 영역 */}
            <div className="chatbot-fs-input-area">
              <div className="chatbot-fs-input-wrapper">
                <textarea
                  ref={inputRef}
                  className="chatbot-fs-input"
                  placeholder="메시지를 입력하세요... (예: 냉동기 상태 알려줘)"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  rows={1}
                />
              </div>
              <button
                className="chatbot-fs-send-btn"
                onClick={handleSend}
                disabled={!input.trim()}
                aria-label="전송"
              >
                <SendIcon />
              </button>
            </div>
          </div>

          {/* 사이드 패널 - 히스토리 */}
          <div className="chatbot-fs-sidebar">
            <div className="chatbot-fs-sidebar-header">
              <div className="chatbot-fs-sidebar-title">대화 기록</div>
            </div>
            <div className="chatbot-fs-sidebar-content">
              {CHAT_HISTORY.map((item) => (
                <div key={item.id} className="chatbot-fs-history-item">
                  <div className="chatbot-fs-history-title">{item.title}</div>
                  <div className="chatbot-fs-history-time">{item.time}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatbotPage;
