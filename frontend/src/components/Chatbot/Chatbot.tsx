import React, { useState, useRef, useEffect } from 'react';
import './Chatbot.css';
import { generateScenarioResponse, SCENARIO_QUICK_QUESTIONS } from './chatScenarios';

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

// 빠른 질문 목록 (시나리오 확장)
const QUICK_QUESTIONS = [
  ...SCENARIO_QUICK_QUESTIONS.slice(0, 4),  // 시나리오 빠른 질문 4개
  { id: 'q5', label: '현재 알람 현황', query: '현재 알람 현황 알려줘' },
  { id: 'q6', label: '냉동기 상태', query: '냉동기 상태 알려줘' },
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
      text: '안녕하세요! 열원사업소 AI 운영 어시스턴트입니다. 설비 상태, 알람, 점검일지 등 궁금한 점을 질문해 주세요.',
      type: 'text',
    };
  }

  // 냉동기 관련
  if (lowerQuery.includes('냉동기') || lowerQuery.includes('스크류') || lowerQuery.includes('chiller')) {
    return {
      sender: 'ai',
      text: '**스크류냉동기 현황** (6대)\n\n현재 4대 가동 중, 2대 대기 상태입니다.',
      type: 'table',
      tableData: {
        headers: ['설비', '상태', '용량', '고압', '저압', '토출온도'],
        rows: [
          ['AICC #1', { value: '●가동', status: 'ok' }, '82.24 USRT', '13.5', '4.2', '72°C'],
          ['AICC #2', { value: '●가동', status: 'ok' }, '82.24 USRT', '14.1', '4.5', '75°C'],
          ['관제탑 #1', { value: '●가동', status: 'ok' }, '40 USRT', '12.8', '3.8', '68°C'],
          ['관제탑 #2', { value: '○대기', status: 'warn' }, '40 USRT', '-', '-', '-'],
          ['공항청사 #1', { value: '●가동', status: 'ok' }, '60.19 USRT', '13.2', '4.0', '70°C'],
          ['공항청사 #2', { value: '○대기', status: 'warn' }, '60.19 USRT', '-', '-', '-'],
        ],
      },
      actions: [
        { label: '상세 보기', action: 'p3' },
        { label: '트렌드 차트', action: 'chart' },
      ],
    };
  }

  // 알람 관련
  if (lowerQuery.includes('알람') || lowerQuery.includes('경고') || lowerQuery.includes('긴급') || lowerQuery.includes('이상')) {
    return {
      sender: 'ai',
      text: '**현재 알람 현황**\n\n총 3건의 알람이 발생했습니다.',
      type: 'alarm',
      alarms: [
        { level: 'danger', title: 'AICC 팬류 F-01 진동 임계값 초과', desc: '3.8mm/s > 3.0mm/s · 14:32' },
        { level: 'warn', title: '관제탑 냉동기 #1 압력 이상', desc: '4.8bar < 5.0bar · 09:15' },
        { level: 'info', title: 'AICC 냉각탑 정기 점검 완료', desc: 'CAM-01 ~ CAM-02 · 08:00' },
      ],
      actions: [
        { label: '알람 페이지', action: 'p4' },
        { label: 'CCTV 확인', action: 'p2' },
      ],
    };
  }

  // 점검일지 관련
  if (lowerQuery.includes('점검') || lowerQuery.includes('일지') || lowerQuery.includes('보고서')) {
    return {
      sender: 'ai',
      text: '**오늘 점검일지** (2026-03-15)\n\n✓ 자동 생성 완료\n✓ 냉동기 6대 데이터 수집\n✓ 진동센서 12개 정상\n✓ 알람 3건 기록',
      type: 'table',
      tableData: {
        headers: ['항목', '상태', '비고'],
        rows: [
          ['냉동기 점검', { value: '완료', status: 'ok' }, '6대 모두 정상'],
          ['센서 데이터', { value: '정상', status: 'ok' }, '12개 센서 수집'],
          ['알람 이력', { value: '3건', status: 'warn' }, '긴급 1, 경고 2'],
          ['특이사항', { value: '있음', status: 'warn' }, '팬류 F-01 점검 필요'],
        ],
      },
      actions: [
        { label: '점검일지 보기', action: 'p8' },
        { label: 'PDF 다운로드', action: 'download' },
      ],
    };
  }

  // 진동 센서 관련
  if (lowerQuery.includes('진동') || lowerQuery.includes('센서') || lowerQuery.includes('vib')) {
    return {
      sender: 'ai',
      text: '**진동 센서 현황** (12개)\n\n11개 정상, 1개 주의 상태입니다.',
      type: 'table',
      tableData: {
        headers: ['센서 ID', '위치', 'RMS', 'Peak', '상태'],
        rows: [
          ['VIB-01', 'AICC 냉각탑 #1', '2.1 mm/s', '3.2 mm/s', { value: '정상', status: 'ok' }],
          ['VIB-02', 'AICC 냉각탑 #2', '2.3 mm/s', '3.5 mm/s', { value: '정상', status: 'ok' }],
          ['VIB-03', 'AICC 팬류 F-01', '3.8 mm/s', '5.1 mm/s', { value: '⚠ 주의', status: 'warn' }],
          ['VIB-04', 'AICC 팬류 F-02', '1.9 mm/s', '2.8 mm/s', { value: '정상', status: 'ok' }],
          ['VIB-05', '관제탑 냉동기 #1', '1.8 mm/s', '2.6 mm/s', { value: '정상', status: 'ok' }],
        ],
      },
      actions: [
        { label: '전체 보기', action: 'p1' },
        { label: '트렌드 분석', action: 'p9' },
      ],
    };
  }

  // 에너지 관련
  if (lowerQuery.includes('에너지') || lowerQuery.includes('전력') || lowerQuery.includes('사용량')) {
    return {
      sender: 'ai',
      text: '**오늘 에너지 현황**\n\n총 전력 사용량: 2,847 kWh\n전일 대비: -3.2% ↓',
      type: 'table',
      tableData: {
        headers: ['건물', '사용량', '전일비', '상태'],
        rows: [
          ['AICC', '1,245 kWh', '-2.1%', { value: '정상', status: 'ok' }],
          ['관제탑', '892 kWh', '-4.5%', { value: '절감', status: 'ok' }],
          ['공항청사', '710 kWh', '-3.8%', { value: '절감', status: 'ok' }],
        ],
      },
    };
  }

  // 설비 현황
  if (lowerQuery.includes('설비') || lowerQuery.includes('현황') || lowerQuery.includes('상태')) {
    return {
      sender: 'ai',
      text: '**전체 설비 현황**\n\n총 32대 설비 중 30대 정상 운영 중입니다.',
      type: 'table',
      tableData: {
        headers: ['구분', '전체', '정상', '주의', '가동률'],
        rows: [
          ['냉동기', '6', '6', '0', { value: '100%', status: 'ok' }],
          ['냉각탑', '4', '4', '0', { value: '100%', status: 'ok' }],
          ['팬류', '8', '7', '1', { value: '87.5%', status: 'warn' }],
          ['공조기', '6', '6', '0', { value: '100%', status: 'ok' }],
          ['펌프', '8', '7', '1', { value: '87.5%', status: 'warn' }],
        ],
      },
      actions: [
        { label: '설비 현황', action: 'p5' },
      ],
    };
  }

  // 도움말
  if (lowerQuery.includes('도움') || lowerQuery.includes('help') || lowerQuery.includes('뭐') || lowerQuery.includes('기능')) {
    return {
      sender: 'ai',
      text: '**사용 가능한 질문 예시**\n\n• "냉동기 상태 알려줘"\n• "현재 알람 현황"\n• "오늘 점검일지 보여줘"\n• "진동 센서 현황"\n• "에너지 사용량"\n• "전체 설비 현황"\n\n위와 같은 질문을 하시면 관련 정보를 안내해 드립니다.',
      type: 'text',
    };
  }

  // 기본 응답
  return {
    sender: 'ai',
    text: '죄송합니다. 해당 질문을 이해하지 못했습니다.\n\n"냉동기 상태", "알람 현황", "점검일지" 등의 키워드로 질문해 주세요.\n\n"도움말"을 입력하시면 사용 가능한 질문 예시를 볼 수 있습니다.',
    type: 'text',
  };
};

// 현재 시간 포맷
const getCurrentTime = () => {
  return new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' });
};

// 아이콘 컴포넌트들
const ChatIcon = () => (
  <svg viewBox="0 0 24 24">
    <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
  </svg>
);

const SendIcon = () => (
  <svg viewBox="0 0 24 24">
    <line x1="22" y1="2" x2="11" y2="13" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);

const CloseIcon = () => (
  <svg viewBox="0 0 24 24">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const MinimizeIcon = () => (
  <svg viewBox="0 0 24 24">
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const BotIcon = () => (
  <svg viewBox="0 0 24 24">
    <rect x="3" y="11" width="18" height="10" rx="2" />
    <circle cx="12" cy="5" r="2" />
    <path d="M12 7v4" />
    <line x1="8" y1="16" x2="8" y2="16" />
    <line x1="16" y1="16" x2="16" y2="16" />
  </svg>
);

export interface ChatbotProps {
  onNavigate?: (page: string) => void;
}

export const Chatbot: React.FC<ChatbotProps> = ({ onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);
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
    if (isOpen && messages.length === 0) {
      const welcomeMessage: ChatMessage = {
        id: 'welcome',
        sender: 'ai',
        text: '안녕하세요! 👋\n열원사업소 AI 운영 어시스턴트입니다.\n\n설비 상태, 알람, 점검일지 등 궁금한 점을 질문해 주세요.',
        time: getCurrentTime(),
        type: 'text',
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen, messages.length]);

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
    setInput('');
    setIsTyping(true);

    // 타이핑 효과 후 응답
    setTimeout(() => {
      const response = generateResponse(input.trim());
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
    setTimeout(() => handleSend(), 100);
  };

  // 액션 버튼 클릭
  const handleAction = (action: string) => {
    if (action.startsWith('p')) {
      onNavigate?.(action);
      setIsOpen(false);
    } else if (action === 'download') {
      alert('PDF 다운로드 기능은 추후 구현 예정입니다.');
    } else if (action === 'chart') {
      alert('차트 보기 기능은 추후 구현 예정입니다.');
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
      <table className="chat-table">
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
      <div key={i} className={`chat-alarm-card ${alarm.level}`}>
        <div className="chat-alarm-header">
          <span className={`chat-alarm-badge ${alarm.level}`}>
            {alarm.level === 'danger' ? '긴급' : alarm.level === 'warn' ? '경고' : '정보'}
          </span>
        </div>
        <div className="chat-alarm-title">{alarm.title}</div>
        <div className="chat-alarm-desc">{alarm.desc}</div>
      </div>
    ));
  };

  return (
    <>
      {/* 플로팅 버튼 */}
      <button
        className="chat-floating-btn"
        onClick={() => setIsOpen(true)}
        aria-label="AI 챗봇 열기"
        style={{ display: isOpen ? 'none' : 'flex' }}
      >
        <ChatIcon />
      </button>

      {/* 오버레이 */}
      <div
        className={`chat-overlay ${isOpen ? 'visible' : ''}`}
        onClick={() => setIsOpen(false)}
      />

      {/* 챗봇 패널 */}
      <div className={`chat-panel ${isOpen ? 'open' : ''}`}>
        {/* 헤더 */}
        <div className="chat-header">
          <div className="chat-header-title">
            <div className="chat-header-icon">
              <BotIcon />
            </div>
            <div className="chat-header-text">
              <h3>AI 운영 어시스턴트</h3>
              <span>열원사업소 · 온라인</span>
            </div>
          </div>
          <div className="chat-header-actions">
            <button className="chat-header-btn" onClick={() => setIsOpen(false)} title="최소화">
              <MinimizeIcon />
            </button>
            <button className="chat-header-btn" onClick={() => setIsOpen(false)} title="닫기">
              <CloseIcon />
            </button>
          </div>
        </div>

        {/* 메시지 영역 */}
        <div className="chat-messages">
          {messages.map((msg) => {
            // 시나리오 타입 체크
            const scenarioTypes = ['analysis', 'wo', 'checklist', 'history', 'plan', 'simulation'];
            const isScenario = msg.type && scenarioTypes.includes(msg.type);
            const scenarioClass = isScenario ? `chat-scenario-${msg.type}` : '';

            return (
            <div key={msg.id} className={`chat-message ${msg.sender} ${scenarioClass}`}>
              <div className="chat-message-avatar">
                {msg.sender === 'ai' ? '🤖' : '👤'}
              </div>
              <div className="chat-message-content">
                <div className="chat-message-text" style={{ whiteSpace: 'pre-wrap' }}>
                  {msg.text}
                </div>
                {msg.type === 'table' && renderTable(msg.tableData)}
                {msg.type === 'alarm' && renderAlarms(msg.alarms)}
                {msg.actions && (
                  <div className="chat-actions">
                    {msg.actions.map((action, i) => (
                      <button
                        key={i}
                        className="chat-action-btn"
                        onClick={() => handleAction(action.action)}
                      >
                        {action.label}
                      </button>
                    ))}
                  </div>
                )}
                <div className="chat-message-time">{msg.time}</div>
              </div>
            </div>
            );
          })}

          {/* 타이핑 인디케이터 */}
          {isTyping && (
            <div className="chat-message ai">
              <div className="chat-message-avatar">🤖</div>
              <div className="chat-typing">
                <div className="chat-typing-dots">
                  <span className="chat-typing-dot" />
                  <span className="chat-typing-dot" />
                  <span className="chat-typing-dot" />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* 빠른 질문 */}
        <div className="chat-quick-questions">
          <div className="chat-quick-title">빠른 질문</div>
          <div className="chat-quick-btns">
            {QUICK_QUESTIONS.map((q) => (
              <button
                key={q.id}
                className="chat-quick-btn"
                onClick={() => handleQuickQuestion(q.query)}
              >
                {q.label}
              </button>
            ))}
          </div>
        </div>

        {/* 입력 영역 */}
        <div className="chat-input-area">
          <div className="chat-input-wrapper">
            <textarea
              ref={inputRef}
              className="chat-input"
              placeholder="메시지를 입력하세요..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              rows={1}
            />
          </div>
          <button
            className="chat-send-btn"
            onClick={handleSend}
            disabled={!input.trim()}
            aria-label="전송"
          >
            <SendIcon />
          </button>
        </div>
      </div>
    </>
  );
};

export default Chatbot;
