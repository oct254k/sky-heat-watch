import React from 'react';
import './OverviewPage.css';

/**
 * OverviewPage (p8) - 연동 현황
 *
 * BEMS/DDC/Century 연동 상태, 시스템 구성도, 프로젝트 정보를 포함합니다.
 */
export const OverviewPage: React.FC = () => {
  // Project info
  const projectInfo = {
    name: '인천공항 열원사업소 AI 모니터링 시스템',
    version: 'PoC v1.0.0',
    buildDate: '2024-01-15',
    client: '인천국제공항공사',
    contractor: 'SKY 테크놀로지',
  };

  // System components - 열원사업소 연동 시스템
  const systemComponents = [
    { id: 'COMP-001', name: 'Century 연동', description: '스크류냉동기 제어 데이터 수집', status: 'active' },
    { id: 'COMP-002', name: 'Honeywell DDC', description: '냉각탑/팬류 제어 연동', status: 'active' },
    { id: 'COMP-003', name: 'BEMS 연동', description: '빌딩에너지관리시스템 데이터', status: 'active' },
    { id: 'COMP-004', name: 'CCTV 통합 관리', description: '8대 카메라 영상 수집 및 분석', status: 'active' },
    { id: 'COMP-005', name: '진동 센서 수집', description: '냉동기 진동 감지 (12채널)', status: 'active' },
    { id: 'COMP-006', name: 'AI 분석 엔진', description: '실시간 이상 감지 및 예측 분석', status: 'active' },
  ];

  // Monitoring zones - 열원사업소 건물
  const monitoringZones = [
    { id: 'ZONE-AICC', name: 'AICC', description: '스크류냉동기 2대, 냉각탑', sensors: 4, cameras: 3, status: 'normal' },
    { id: 'ZONE-TWR', name: '관제탑', description: '스크류냉동기 2대, 팬류', sensors: 4, cameras: 3, status: 'normal' },
    { id: 'ZONE-TERM', name: '공항청사', description: '스크류냉동기 2대, 팬류', sensors: 4, cameras: 2, status: 'normal' },
  ];

  return (
    <div className="page-container overview-page">
      {/* 프로젝트 정보 */}
      <div className="card project-card">
        <div className="project-header">
          <div className="project-logo">
            <svg viewBox="0 0 48 48" fill="none">
              <rect width="48" height="48" rx="8" fill="var(--iafc-blue)" />
              <path d="M12 24h6v-8l6 16 6-16v8h6" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div className="project-info">
            <h2 className="project-name">{projectInfo.name}</h2>
            <div className="project-meta">
              <span className="project-version">{projectInfo.version}</span>
              <span className="project-date">빌드: {projectInfo.buildDate}</span>
            </div>
          </div>
        </div>
        <div className="project-details">
          <div className="detail-item">
            <span className="detail-label">발주처</span>
            <span className="detail-value">{projectInfo.client}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">시공사</span>
            <span className="detail-value">{projectInfo.contractor}</span>
          </div>
        </div>
      </div>

      {/* 연동 현황 다이어그램 */}
      <div className="card">
        <div className="card-hd">
          <h3>
            <svg className="card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" />
              <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" />
            </svg>
            연동 시스템 구성도
          </h3>
          <div className="card-actions">
            <span className="status-badge status-normal">전체 정상</span>
          </div>
        </div>
        <div className="card-bd">
          <div className="pipeline-map">
            {/* SVG Integration Diagram */}
            <svg viewBox="0 0 800 350" className="pipeline-svg">
              {/* Grid background */}
              <defs>
                <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="var(--border)" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />

              {/* Central AI System */}
              <g transform="translate(400, 175)">
                <rect x="-60" y="-40" width="120" height="80" rx="8" fill="var(--iafc-blue)" />
                <text x="0" y="-10" textAnchor="middle" fill="#fff" fontSize="14" fontWeight="600">AI 모니터링</text>
                <text x="0" y="10" textAnchor="middle" fill="#fff" fontSize="11">분석 엔진</text>
                <text x="0" y="28" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">DX + AI</text>
              </g>

              {/* Data Sources - Left */}
              <g transform="translate(100, 80)">
                <rect x="-50" y="-25" width="100" height="50" rx="6" fill="var(--iafc-green)" />
                <text x="0" y="-5" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="600">Century</text>
                <text x="0" y="12" textAnchor="middle" fill="rgba(255,255,255,0.8)" fontSize="9">냉동기 제어</text>
              </g>
              <g transform="translate(100, 175)">
                <rect x="-50" y="-25" width="100" height="50" rx="6" fill="var(--iafc-green)" />
                <text x="0" y="-5" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="600">Honeywell DDC</text>
                <text x="0" y="12" textAnchor="middle" fill="rgba(255,255,255,0.8)" fontSize="9">냉각탑/팬류</text>
              </g>
              <g transform="translate(100, 270)">
                <rect x="-50" y="-25" width="100" height="50" rx="6" fill="var(--iafc-green)" />
                <text x="0" y="-5" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="600">BEMS</text>
                <text x="0" y="12" textAnchor="middle" fill="rgba(255,255,255,0.8)" fontSize="9">에너지관리</text>
              </g>

              {/* Connections - Left to Center */}
              <line x1="150" y1="80" x2="340" y2="150" stroke="var(--iafc-green)" strokeWidth="2" strokeDasharray="4,2" />
              <line x1="150" y1="175" x2="340" y2="175" stroke="var(--iafc-green)" strokeWidth="2" strokeDasharray="4,2" />
              <line x1="150" y1="270" x2="340" y2="200" stroke="var(--iafc-green)" strokeWidth="2" strokeDasharray="4,2" />

              {/* Buildings - Right */}
              <g transform="translate(700, 80)">
                <rect x="-50" y="-25" width="100" height="50" rx="6" fill="var(--ok)" />
                <text x="0" y="-5" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="600">AICC</text>
                <text x="0" y="12" textAnchor="middle" fill="rgba(255,255,255,0.8)" fontSize="9">냉동기 2대</text>
              </g>
              <g transform="translate(700, 175)">
                <rect x="-50" y="-25" width="100" height="50" rx="6" fill="var(--ok)" />
                <text x="0" y="-5" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="600">관제탑</text>
                <text x="0" y="12" textAnchor="middle" fill="rgba(255,255,255,0.8)" fontSize="9">냉동기 2대</text>
              </g>
              <g transform="translate(700, 270)">
                <rect x="-50" y="-25" width="100" height="50" rx="6" fill="var(--ok)" />
                <text x="0" y="-5" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="600">공항청사</text>
                <text x="0" y="12" textAnchor="middle" fill="rgba(255,255,255,0.8)" fontSize="9">냉동기 2대</text>
              </g>

              {/* Connections - Center to Right */}
              <line x1="460" y1="150" x2="650" y2="80" stroke="var(--iafc-blue)" strokeWidth="2" />
              <line x1="460" y1="175" x2="650" y2="175" stroke="var(--iafc-blue)" strokeWidth="2" />
              <line x1="460" y1="200" x2="650" y2="270" stroke="var(--iafc-blue)" strokeWidth="2" />

              {/* Sensors/CCTV Labels */}
              <g transform="translate(550, 100)">
                <rect x="-30" y="-12" width="60" height="24" rx="4" fill="var(--surface)" stroke="var(--border)" />
                <text x="0" y="4" textAnchor="middle" fontSize="9" fill="var(--txt2)">CCTV 3대</text>
              </g>
              <g transform="translate(550, 175)">
                <rect x="-30" y="-12" width="60" height="24" rx="4" fill="var(--surface)" stroke="var(--border)" />
                <text x="0" y="4" textAnchor="middle" fontSize="9" fill="var(--txt2)">CCTV 3대</text>
              </g>
              <g transform="translate(550, 250)">
                <rect x="-30" y="-12" width="60" height="24" rx="4" fill="var(--surface)" stroke="var(--border)" />
                <text x="0" y="4" textAnchor="middle" fontSize="9" fill="var(--txt2)">CCTV 2대</text>
              </g>

              {/* Legend */}
              <g transform="translate(620, 20)">
                <rect x="0" y="0" width="170" height="50" rx="4" fill="var(--surface)" stroke="var(--border)" />
                <text x="85" y="15" textAnchor="middle" fontSize="10" fill="var(--txt2)" fontWeight="600">범례</text>
                <line x1="10" y1="32" x2="30" y2="32" stroke="var(--iafc-green)" strokeWidth="2" strokeDasharray="4,2" />
                <text x="40" y="35" fontSize="9" fill="var(--txt2)">데이터 수집</text>
                <line x1="100" y1="32" x2="120" y2="32" stroke="var(--iafc-blue)" strokeWidth="2" />
                <text x="130" y="35" fontSize="9" fill="var(--txt2)">분석 연동</text>
              </g>
            </svg>
          </div>
        </div>
      </div>

      <div className="overview-grid">
        {/* 시스템 구성 요소 */}
        <div className="card">
          <div className="card-hd">
            <h3>
              <svg className="card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
                <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
                <line x1="6" y1="6" x2="6.01" y2="6" />
                <line x1="6" y1="18" x2="6.01" y2="18" />
              </svg>
              연동 시스템 현황
            </h3>
          </div>
          <div className="card-bd">
            <div className="component-list">
              {systemComponents.map(comp => (
                <div key={comp.id} className="component-item">
                  <div className="component-status">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                  </div>
                  <div className="component-info">
                    <span className="component-name">{comp.name}</span>
                    <span className="component-desc">{comp.description}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 모니터링 건물 */}
        <div className="card">
          <div className="card-hd">
            <h3>
              <svg className="card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 21h18M5 21V7l8-4v18M19 21V11l-6-4M9 9v.01M9 12v.01M9 15v.01M9 18v.01" />
              </svg>
              건물별 현황
            </h3>
          </div>
          <div className="card-bd">
            <div className="zone-list">
              {monitoringZones.map(zone => (
                <div key={zone.id} className={`zone-item zone-${zone.status}`}>
                  <div className="zone-header">
                    <span className="zone-name">{zone.name}</span>
                    <span className={`zone-status status-${zone.status}`}>
                      {zone.status === 'normal' ? '정상' : '주의'}
                    </span>
                  </div>
                  <p className="zone-desc">{zone.description}</p>
                  <div className="zone-stats">
                    <span>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="3" />
                        <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                      </svg>
                      센서 {zone.sensors}개
                    </span>
                    <span>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                        <circle cx="12" cy="13" r="4" />
                      </svg>
                      카메라 {zone.cameras}대
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewPage;
