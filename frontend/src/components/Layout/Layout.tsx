import React, { useState, useCallback } from 'react';
import './Layout.css';

export interface LayoutProps {
  /** GNB (Global Navigation Bar) 컴포넌트 */
  gnb?: React.ReactNode;
  /** Sidebar 컴포넌트 */
  sidebar?: React.ReactNode;
  /** Header 컴포넌트 */
  header?: React.ReactNode;
  /** 메인 콘텐츠 */
  children: React.ReactNode;
  /** GNB 표시 여부 */
  showGnb?: boolean;
  /** 사이드바 표시 여부 */
  showSidebar?: boolean;
  /** 헤더 표시 여부 */
  showHeader?: boolean;
  /** 추가 클래스명 */
  className?: string;
}

/**
 * Layout 컴포넌트
 *
 * 모니터링 시스템의 기본 레이아웃 구조를 제공합니다.
 *
 * 구조:
 * ```
 * <div id="gnb">...</div>
 * <div id="app-body">
 *   <nav id="sb">...</nav>
 *   <div id="main">
 *     <div id="hdr">...</div>
 *     <div id="content">...</div>
 *   </div>
 * </div>
 * ```
 */
export const Layout: React.FC<LayoutProps> = ({
  gnb,
  sidebar,
  header,
  children,
  showGnb = true,
  showSidebar = true,
  showHeader = true,
  className = '',
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const closeSidebar = useCallback(() => {
    setSidebarOpen(false);
  }, []);

  // 레이아웃 클래스 조합
  const layoutClasses = [
    'layout',
    !showGnb && 'layout--no-gnb',
    !showSidebar && 'layout--no-sidebar',
    !showHeader && 'layout--no-header',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={layoutClasses}>
      {/* GNB */}
      {showGnb && (
        <div id="gnb">
          {gnb}
        </div>
      )}

      {/* App Body */}
      <div id="app-body">
        {/* Sidebar */}
        {showSidebar && (
          <>
            <nav id="sb" className={sidebarOpen ? 'open' : ''}>
              {sidebar}
            </nav>
            {/* 모바일 오버레이 */}
            <div
              className={`sidebar-overlay ${sidebarOpen ? 'visible' : ''}`}
              onClick={closeSidebar}
              aria-hidden="true"
            />
          </>
        )}

        {/* Main */}
        <div id="main">
          {/* Header */}
          {showHeader && (
            <div id="hdr">
              {header}
            </div>
          )}

          {/* Content */}
          <div id="content">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

// Context for sidebar control
export interface LayoutContextValue {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  closeSidebar: () => void;
}

export const LayoutContext = React.createContext<LayoutContextValue | null>(null);

/**
 * useLayout hook
 *
 * Layout 컨텍스트에 접근하여 사이드바 제어 등의 기능을 사용합니다.
 */
export const useLayout = (): LayoutContextValue => {
  const context = React.useContext(LayoutContext);
  if (!context) {
    throw new Error('useLayout must be used within a LayoutProvider');
  }
  return context;
};

/**
 * LayoutProvider 컴포넌트
 *
 * Layout 컨텍스트를 제공하는 Provider 컴포넌트입니다.
 * 사이드바 상태를 전역으로 관리할 때 사용합니다.
 */
export const LayoutProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = useCallback(() => {
    setSidebarOpen(prev => !prev);
  }, []);

  const closeSidebar = useCallback(() => {
    setSidebarOpen(false);
  }, []);

  return (
    <LayoutContext.Provider value={{ sidebarOpen, toggleSidebar, closeSidebar }}>
      {children}
    </LayoutContext.Provider>
  );
};

export default Layout;
