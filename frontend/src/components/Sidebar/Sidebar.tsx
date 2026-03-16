import React from 'react';
import './Sidebar.css';

// Navigation Item 아이콘 SVG 컴포넌트들
const icons = {
  // p1: 실시간 관제 - 4개 사각형 그리드
  dashboard: (
    <svg viewBox="0 0 24 24">
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
    </svg>
  ),
  // p2: 영상 모니터링 - 라인 차트
  analytics: (
    <svg viewBox="0 0 24 24">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
  ),
  // p3: 냉동기 현황 - 원형 레이더
  gauge: (
    <svg viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.07 4.93a10 10 0 010 14.14M4.93 4.93a10 10 0 000 14.14" />
    </svg>
  ),
  // p4: 알람·이벤트 관리 - 벨
  alarm: (
    <svg viewBox="0 0 24 24">
      <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" />
    </svg>
  ),
  // p5: 설비 현황 - 심박수 라인
  system: (
    <svg viewBox="0 0 24 24">
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
  ),
  // p6: 임계값 설정 - 톱니바퀴/태양
  settings: (
    <svg viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="3" />
      <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
    </svg>
  ),
  // p7: 점검일지 - 클립보드/체크리스트
  checklist: (
    <svg viewBox="0 0 24 24">
      <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" />
      <rect x="9" y="3" width="6" height="4" rx="1" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  ),
  // p8: 연동 현황 - 링크/연결
  link: (
    <svg viewBox="0 0 24 24">
      <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" />
    </svg>
  ),
  // p9: AI 예측 - 브레인/AI
  brain: (
    <svg viewBox="0 0 24 24">
      <path d="M12 2a4 4 0 014 4v1a4 4 0 01-4 4 4 4 0 01-4-4V6a4 4 0 014-4z" />
      <path d="M12 11v4" />
      <path d="M8 22h8" />
      <path d="M12 15a7 7 0 007 7" />
      <path d="M12 15a7 7 0 01-7 7" />
      <circle cx="12" cy="6" r="1" />
    </svg>
  ),
};

// 네비게이션 그룹 및 아이템 정의
interface NavItem {
  id: string;
  label: string;
  icon: keyof typeof icons;
  badge?: number;
}

interface NavGroup {
  label: string;
  items: NavItem[];
}

const navigationGroups: NavGroup[] = [
  {
    label: '실시간 모니터링',
    items: [
      { id: 'p1', label: '실시간 관제', icon: 'dashboard' },
      { id: 'p2', label: '영상 모니터링', icon: 'analytics' },
      { id: 'p3', label: '냉동기 현황', icon: 'gauge' },
      { id: 'p4', label: '알람·이벤트 관리', icon: 'alarm', badge: 5 },
    ],
  },
  {
    label: '설비 관리',
    items: [
      { id: 'p5', label: '설비 현황', icon: 'system' },
      { id: 'p6', label: '임계값 설정', icon: 'settings' },
    ],
  },
  {
    label: '일지 관리',
    items: [
      { id: 'p8', label: '점검일지', icon: 'checklist' },
    ],
  },
  {
    label: 'AI 분석',
    items: [
      { id: 'p9', label: 'AI 예측 분석', icon: 'brain' },
    ],
  },
  {
    label: '시스템',
    items: [
      { id: 'p7', label: '연동 현황', icon: 'link' },
    ],
  },
];

export interface SidebarProps {
  /** 현재 활성 페이지 (p1~p8) */
  activePage: string;
  /** 페이지 변경 콜백 */
  onPageChange: (page: string) => void;
  /** 알람 배지 숫자 (p4 아이템) */
  alarmCount?: number;
  /** 시스템 가동률 퍼센트 (기본 99.8) */
  uptimePercent?: number;
  /** 사이드바 접힘 상태 */
  collapsed?: boolean;
  /** 추가 className */
  className?: string;
}

/**
 * Sidebar 컴포넌트
 *
 * SKY 모니터링 시스템의 좌측 네비게이션 사이드바입니다.
 * 원본 index_original.html Lines 1003-1073 기반으로 구현되었습니다.
 */
export const Sidebar: React.FC<SidebarProps> = ({
  activePage,
  onPageChange,
  alarmCount,
  uptimePercent = 99.8,
  collapsed = false,
  className = '',
}) => {
  // 알람 개수가 props로 전달되면 해당 값 사용, 아니면 기본값
  const getItemBadge = (item: NavItem): number | undefined => {
    if (item.id === 'p4' && alarmCount !== undefined) {
      return alarmCount;
    }
    return item.badge;
  };

  const handleNavClick = (pageId: string) => {
    onPageChange(pageId);
  };

  return (
    <nav
      id="sb"
      className={`sidebar ${collapsed ? 'collapsed' : ''} ${className}`.trim()}
      role="navigation"
      aria-label="메인 네비게이션"
    >
      <div className="sb-nav">
        {navigationGroups.map((group, groupIndex) => (
          <React.Fragment key={group.label}>
            {/* 그룹 라벨 */}
            <div className="sb-group-lbl">{group.label}</div>

            {/* 네비게이션 아이템들 */}
            {group.items.map((item) => {
              const badge = getItemBadge(item);
              const isActive = activePage === item.id;

              return (
                <div
                  key={item.id}
                  className={`nav-item ${isActive ? 'active' : ''}`}
                  data-page={item.id}
                  onClick={() => handleNavClick(item.id)}
                  role="button"
                  tabIndex={0}
                  aria-current={isActive ? 'page' : undefined}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleNavClick(item.id);
                    }
                  }}
                >
                  {icons[item.icon]}
                  <span>{item.label}</span>
                  {badge !== undefined && badge > 0 && (
                    <span className="nav-badge" aria-label={`${badge}개의 알림`}>
                      {badge}
                    </span>
                  )}
                </div>
              );
            })}

            {/* 그룹 간 구분선 (마지막 그룹 제외) */}
            {groupIndex < navigationGroups.length - 1 && (
              <div className="sb-divider" role="separator" />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* 하단 시스템 가동률 표시 */}
      <div className="sb-footer">
        <div className="sb-uptime-lbl">시스템 가동률</div>
        <div className="sb-bar">
          <div
            className="sb-bar-fill"
            style={{ width: `${Math.min(100, Math.max(0, uptimePercent))}%` }}
            role="progressbar"
            aria-valuenow={uptimePercent}
            aria-valuemin={0}
            aria-valuemax={100}
          />
        </div>
        <div className="sb-val">{uptimePercent.toFixed(1)}%</div>
        <div className="sb-sub">최근 30일 · 정상운영</div>
      </div>
    </nav>
  );
};

export default Sidebar;
