import { useState, useEffect, useCallback } from 'react';
import './App.css';

// Layout components
import { Layout } from './components/Layout';
import { GNB } from './components/GNB';
import { Sidebar } from './components/Sidebar';

// Pages
import { Dashboard } from './pages/Dashboard';
import { AnalysisPage } from './pages/AnalysisPage';
import { GaugePage } from './pages/GaugePage';
import { AlarmPage } from './pages/AlarmPage';
import { SystemPage } from './pages/SystemPage';
import { SettingsPage } from './pages/SettingsPage';
import { InspectionLogPage } from './pages/InspectionLogPage';
import { OverviewPage } from './pages/OverviewPage';
import { AIPredictionPage } from './pages/AIPredictionPage';
import { ChatbotPage } from './pages/ChatbotPage';

// Components
import { Chatbot } from './components/Chatbot';

// Page props type
interface PageProps {
  isAdminMode?: boolean;
}

// Page mapping (화면설계서 기준)
const pages: Record<string, React.ComponentType<PageProps>> = {
  p1: Dashboard,
  p2: AnalysisPage as React.ComponentType<PageProps>,      // 영상 모니터링
  p3: GaugePage as React.ComponentType<PageProps>,         // 냉동기 현황
  p4: AlarmPage as React.ComponentType<PageProps>,
  p5: SystemPage as React.ComponentType<PageProps>,        // 설비 현황
  p6: SettingsPage as React.ComponentType<PageProps>,
  p7: OverviewPage as React.ComponentType<PageProps>,      // 연동 현황
  p8: InspectionLogPage as React.ComponentType<PageProps>, // 점검일지
  p9: AIPredictionPage as React.ComponentType<PageProps>,  // AI 예측 분석
  p10: ChatbotPage as React.ComponentType<PageProps>,      // AI 챗봇
};

// Page titles (화면설계서 기준)
const pageTitles: Record<string, { title: string; subtitle: string }> = {
  p1: { title: '실시간 관제', subtitle: 'CCTV·센서 통합 모니터링' },
  p2: { title: '영상 모니터링', subtitle: '냉각탑·팬류 CCTV 전체 화면' },
  p3: { title: '냉동기 현황', subtitle: '스크류냉동기 상세 데이터' },
  p4: { title: '알람·이벤트 관리', subtitle: '알람 이력 조회 및 관리' },
  p5: { title: '설비 현황', subtitle: '건물별 설비 상태 (AICC·관제탑·공항청사)' },
  p6: { title: '임계값 설정', subtitle: '진동·온도·압력 임계값 설정' },
  p7: { title: '연동 현황', subtitle: 'BEMS·DDC·Century 연동 상태' },
  p8: { title: '점검일지', subtitle: '일일/주간/월간 점검일지 자동화' },
  p9: { title: 'AI 예측 분석', subtitle: '장비 고장 예측·패턴 분석·수명 추적' },
  p10: { title: 'AI 챗봇', subtitle: '설비 상태·알람·점검일지 질의응답' },
};

function App() {
  // Theme state
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  // Current page state
  const [activePage, setActivePage] = useState('p1');

  // Alarm count (could be fetched from API)
  const [alarmCount] = useState(5);

  // Admin mode state
  const [isAdminMode, setIsAdminMode] = useState(false);

  // Apply theme to body
  useEffect(() => {
    if (isDark) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  // Theme toggle handler
  const handleThemeToggle = useCallback(() => {
    setIsDark(prev => !prev);
  }, []);

  // Page change handler
  const handlePageChange = useCallback((page: string) => {
    setActivePage(page);
  }, []);

  // Logout handler
  const handleLogout = useCallback(() => {
    console.log('Logout clicked');
    // Implement logout logic
  }, []);

  // Export handler
  const handleExport = useCallback(() => {
    console.log('Export clicked');
    // Implement export logic
  }, []);

  // Admin mode toggle handler (더블클릭으로 활성화)
  const handleAdminModeToggle = useCallback(() => {
    setIsAdminMode(prev => !prev);
  }, []);

  // Get current page component
  const CurrentPage = pages[activePage] || Dashboard;
  const currentPageInfo = pageTitles[activePage] || pageTitles.p1;

  // Header component
  const Header = (
    <div id="hdr">
      <h2 className="hdr-title">{currentPageInfo.title}</h2>
      <span className="hdr-sub">{currentPageInfo.subtitle}</span>
      <div className="hdr-right">
        <span className="hdr-time">최종 업데이트</span>
        <span className="hdr-time">{new Date().toLocaleTimeString('ko-KR')}</span>
        <div className="hdr-live">
          <span>실시간</span>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <Layout
        gnb={
          <GNB
            isDark={isDark}
            onThemeToggle={handleThemeToggle}
            userName="김관리"
            userRole="관리자"
            userDept="시설관리팀"
            onLogout={handleLogout}
            onExport={handleExport}
            isAdminMode={isAdminMode}
            onAdminModeToggle={handleAdminModeToggle}
          />
        }
        sidebar={
          <Sidebar
            activePage={activePage}
            onPageChange={handlePageChange}
            alarmCount={alarmCount}
            uptimePercent={99.8}
          />
        }
        header={Header}
      >
        <CurrentPage isAdminMode={isAdminMode} />
      </Layout>

      {/* AI 챗봇 플로팅 버튼 (챗봇 페이지가 아닐 때만 표시) */}
      {activePage !== 'p10' && (
        <Chatbot onNavigate={handlePageChange} />
      )}
    </>
  );
}

export default App;
