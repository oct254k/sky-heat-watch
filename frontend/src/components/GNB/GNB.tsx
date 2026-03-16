import React, { useState, useEffect, useRef, useCallback } from 'react';
import './GNB.css';

interface GNBProps {
  isDark: boolean;
  onThemeToggle: () => void;
  userName?: string;
  userRole?: string;
  userDept?: string;
  onLogout?: () => void;
  onExport?: () => void;
  onSidebarToggle?: () => void;
  /** 관리자 모드 활성화 콜백 (더블클릭 시) */
  onAdminModeToggle?: () => void;
  /** 관리자 모드 활성 상태 */
  isAdminMode?: boolean;
}

interface Zone {
  id: string;
  name: string;
  status: 'ok' | 'warn' | 'danger';
}

const defaultZones: Zone[] = [
  { id: 'all', name: '전체 건물', status: 'ok' },
  { id: 'aicc', name: 'AICC (냉동기 2대)', status: 'ok' },
  { id: 'tower', name: '관제탑 (냉동기 2대)', status: 'ok' },
  { id: 'terminal', name: '공항청사 (냉동기 2대)', status: 'ok' },
];

const GNB: React.FC<GNBProps> = ({
  isDark,
  onThemeToggle,
  userName = '홍길동',
  userRole = '관리자',
  userDept = '시설관리팀',
  onLogout,
  onExport,
  onSidebarToggle,
  onAdminModeToggle,
  isAdminMode = false,
}) => {
  const [currentTime, setCurrentTime] = useState<string>('--:--:--');
  const [isZoneDropdownOpen, setIsZoneDropdownOpen] = useState(false);
  const [selectedZone, setSelectedZone] = useState<Zone>(defaultZones[0]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 관리자 버튼 더블클릭 핸들러
  const handleAdminDoubleClick = useCallback(() => {
    if (onAdminModeToggle) {
      onAdminModeToggle();
    }
  }, [onAdminModeToggle]);

  // 시간 업데이트 (1초마다)
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
      setCurrentTime(`${hours}:${minutes}:${seconds}`);
    };

    updateTime(); // 초기 실행
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  // 드롭다운 외부 클릭 감지
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsZoneDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleZoneSelect = useCallback((zone: Zone) => {
    setSelectedZone(zone);
    setIsZoneDropdownOpen(false);
  }, []);

  const toggleZoneDropdown = useCallback(() => {
    setIsZoneDropdownOpen((prev) => !prev);
  }, []);

  const getStatusColor = (status: Zone['status']) => {
    switch (status) {
      case 'ok':
        return 'var(--ok)';
      case 'warn':
        return 'var(--warn)';
      case 'danger':
        return 'var(--danger)';
      default:
        return 'var(--ok)';
    }
  };

  return (
    <div id="gnb" className={isDark ? 'dark' : ''}>
      {/* 로고 영역 */}
      <div id="gnb-logo">
        <button
          className="sb-toggle-btn"
          onClick={onSidebarToggle}
          title="사이드바 접기/펼치기"
          aria-label="사이드바 토글"
        >
          <svg
            viewBox="0 0 24 24"
            width="14"
            height="14"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
          >
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
        <span className="gnb-logo-text">인천공항시설관리</span>
      </div>

      {/* 중앙 영역 */}
      <div id="gnb-center">
        <span id="gnb-system-name">인천공항 열원사업소 AI 모니터링 시스템</span>

        {/* 구역 선택 드롭다운 */}
        <div id="zone-selector-wrap" ref={dropdownRef}>
          <div
            id="zone-selector"
            className={isZoneDropdownOpen ? 'open' : ''}
            onClick={toggleZoneDropdown}
            role="button"
            tabIndex={0}
            aria-haspopup="listbox"
            aria-expanded={isZoneDropdownOpen}
          >
            <span
              id="zone-dot"
              style={{ background: getStatusColor(selectedZone.status) }}
            />
            <span id="zone-label-text">{selectedZone.name}</span>
            <svg
              id="zone-arrow"
              width="10"
              height="10"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>

          <div id="zone-dropdown" className={isZoneDropdownOpen ? 'open' : ''} role="listbox">
            <div className="zone-dd-header">구역 선택</div>
            {defaultZones.map((zone) => (
              <div
                key={zone.id}
                className={`zone-dd-item ${selectedZone.id === zone.id ? 'active' : ''}`}
                onClick={() => handleZoneSelect(zone)}
                role="option"
                aria-selected={selectedZone.id === zone.id}
              >
                <span
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: getStatusColor(zone.status),
                    flexShrink: 0,
                  }}
                />
                <span>{zone.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 오른쪽 영역 */}
      <div id="gnb-right">
        {/* 상태 표시 */}
        <div className="gnb-live">전체 정상</div>

        {/* 시간 표시 */}
        <div className="gnb-time" id="gnb-clk">
          {currentTime}
        </div>

        {/* 구분선 */}
        <div id="gnb-sep" />

        {/* 테마 토글 */}
        <div className="theme-switch-wrap" onClick={onThemeToggle}>
          <span className={`theme-switch-lbl ${!isDark ? 'on' : ''}`}>Light</span>
          <label className="theme-switch" onClick={(e) => e.stopPropagation()}>
            <input
              type="checkbox"
              checked={isDark}
              onChange={onThemeToggle}
              aria-label="테마 전환"
            />
            <span className="theme-track">
              <span className="t-icon t-sun">*</span>
              <span className="t-icon t-moon">*</span>
            </span>
          </label>
          <span className={`theme-switch-lbl ${isDark ? 'on' : ''}`}>Dark</span>
        </div>

        {/* 관리자 버튼 - 더블클릭으로 관리자 모드 활성화 */}
        <button
          className={`gnb-admin ${isAdminMode ? 'active' : ''}`}
          onDoubleClick={handleAdminDoubleClick}
          title="더블클릭으로 관리자 모드 전환"
          aria-label="관리자 모드"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
          </svg>
          관리자
        </button>

        {/* 내보내기 버튼 */}
        {onExport && (
          <button className="gnb-export" onClick={onExport}>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            내보내기
          </button>
        )}

        {/* 사용자 정보 */}
        <div id="gnb-user">
          <span className="gnb-role-badge">{userRole}</span>
          <span className="gnb-username">{userName}</span>
          <span className="gnb-dept">{userDept}</span>
          {onLogout && (
            <button className="gnb-logout" onClick={onLogout}>
              로그아웃
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default GNB;
