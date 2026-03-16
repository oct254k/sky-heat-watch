import React from 'react';
import './GaugePage.css';
import { TrendChart, type TrendDataSet } from '../../components/Charts/TrendChart';

/**
 * GaugePage (p3) - 계측기 감시
 *
 * 대형 게이지 모니터링, 실시간 수치 표시, 트렌드 차트를 포함합니다.
 */
export const GaugePage: React.FC = () => {
  // Mock gauge data
  const gauges = [
    {
      id: 'GAU-001',
      name: '주 배관 압력',
      value: 2.45,
      unit: 'bar',
      min: 0,
      max: 5,
      warningMin: 1,
      warningMax: 4,
      dangerMin: 0.5,
      dangerMax: 4.5,
      status: 'normal',
      trend: 'stable',
    },
    {
      id: 'GAU-002',
      name: '유량계',
      value: 128.5,
      unit: 'm\³/h',
      min: 0,
      max: 200,
      warningMin: 50,
      warningMax: 180,
      dangerMin: 20,
      dangerMax: 195,
      status: 'warning',
      trend: 'up',
    },
    {
      id: 'GAU-003',
      name: '수위 센서',
      value: 78,
      unit: '%',
      min: 0,
      max: 100,
      warningMin: 20,
      warningMax: 90,
      dangerMin: 10,
      dangerMax: 95,
      status: 'normal',
      trend: 'down',
    },
    {
      id: 'GAU-004',
      name: '배관 온도',
      value: 45.2,
      unit: '\°C',
      min: 0,
      max: 100,
      warningMin: 10,
      warningMax: 70,
      dangerMin: 5,
      dangerMax: 85,
      status: 'normal',
      trend: 'stable',
    },
  ];

  // 냉동기 운전 트렌드 데이터 (최근 6시간, 30분 간격)
  const chillerTrendData: TrendDataSet = {
    labels: [
      '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
      '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
      '15:00',
    ],
    // 토출온도 (압축기 토출 온도)
    temperature: [
      42.5, 43.2, 44.8, 45.5, 46.2, 46.8,
      47.5, 47.2, 46.5, 45.8, 45.2, 44.5,
      43.8,
    ],
    // 고압 (bar를 0.1 스케일로 변환하여 표시)
    displacement: [
      0.15, 0.16, 0.17, 0.18, 0.17, 0.16,
      0.15, 0.16, 0.17, 0.18, 0.17, 0.16,
      0.15,
    ],
  };

  const getPercentage = (value: number, min: number, max: number) => {
    return Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100));
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'warning': return 'gauge-warning';
      case 'danger': return 'gauge-danger';
      default: return 'gauge-normal';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
            <polyline points="17 6 23 6 23 12" />
          </svg>
        );
      case 'down':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="23 18 13.5 8.5 8.5 13.5 1 6" />
            <polyline points="17 18 23 18 23 12" />
          </svg>
        );
      default:
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        );
    }
  };

  return (
    <div className="page-container gauge-page">
      {/* 게이지 모니터링 헤더 */}
      <div className="card">
        <div className="card-hd">
          <h3>
            <svg className="card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            계측기 실시간 모니터링
          </h3>
          <div className="card-actions">
            <span className="last-update">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              마지막 업데이트: 2초 전
            </span>
            <button className="btn btn-sm btn-secondary">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="1 4 1 10 7 10" />
                <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
              </svg>
              새로고침
            </button>
          </div>
        </div>
      </div>

      {/* 대형 게이지 그리드 */}
      <div className="gauge-grid">
        {gauges.map(gauge => (
          <div key={gauge.id} className={`gauge-card ${getStatusClass(gauge.status)}`}>
            <div className="gauge-header">
              <span className="gauge-id">{gauge.id}</span>
              <span className={`gauge-trend trend-${gauge.trend}`}>
                {getTrendIcon(gauge.trend)}
              </span>
            </div>

            <div className="gauge-visual">
              <svg viewBox="0 0 200 120" className="gauge-meter">
                {/* 배경 아크 */}
                <path
                  d="M 20 100 A 80 80 0 0 1 180 100"
                  fill="none"
                  stroke="var(--border)"
                  strokeWidth="12"
                  strokeLinecap="round"
                />
                {/* 경고 영역 (왼쪽) */}
                <path
                  d="M 20 100 A 80 80 0 0 1 50 45"
                  fill="none"
                  stroke="var(--warn-md)"
                  strokeWidth="12"
                  strokeLinecap="round"
                  opacity="0.5"
                />
                {/* 경고 영역 (오른쪽) */}
                <path
                  d="M 150 45 A 80 80 0 0 1 180 100"
                  fill="none"
                  stroke="var(--warn-md)"
                  strokeWidth="12"
                  strokeLinecap="round"
                  opacity="0.5"
                />
                {/* 값 아크 */}
                <path
                  d="M 20 100 A 80 80 0 0 1 180 100"
                  fill="none"
                  stroke={gauge.status === 'danger' ? 'var(--danger)' : gauge.status === 'warning' ? 'var(--warn)' : 'var(--ok)'}
                  strokeWidth="12"
                  strokeLinecap="round"
                  strokeDasharray={`${getPercentage(gauge.value, gauge.min, gauge.max) * 2.51} 251`}
                />
                {/* 중앙 원 */}
                <circle cx="100" cy="100" r="8" fill="var(--txt1)" />
                {/* 바늘 */}
                <line
                  x1="100"
                  y1="100"
                  x2={100 + 60 * Math.cos(Math.PI - (getPercentage(gauge.value, gauge.min, gauge.max) / 100) * Math.PI)}
                  y2={100 - 60 * Math.sin((getPercentage(gauge.value, gauge.min, gauge.max) / 100) * Math.PI)}
                  stroke="var(--txt1)"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            <div className="gauge-value">
              <span className="gauge-number">{gauge.value.toFixed(1)}</span>
              <span className="gauge-unit">{gauge.unit}</span>
            </div>

            <div className="gauge-name">{gauge.name}</div>

            <div className="gauge-range">
              <span>{gauge.min}</span>
              <div className="gauge-range-bar">
                <div
                  className="gauge-range-fill"
                  style={{ width: `${getPercentage(gauge.value, gauge.min, gauge.max)}%` }}
                />
              </div>
              <span>{gauge.max}</span>
            </div>

            <div className="gauge-limits">
              <span className="limit-label">경고: {gauge.warningMin} - {gauge.warningMax}</span>
              <span className="limit-label">위험: &lt;{gauge.dangerMin} / &gt;{gauge.dangerMax}</span>
            </div>
          </div>
        ))}
      </div>

      {/* 트렌드 차트 영역 */}
      <div className="card">
        <div className="card-hd">
          <h3>
            <svg className="card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 3v18h18" />
              <path d="M7 16l4-4 4 4 4-8" />
            </svg>
            시간대별 트렌드
          </h3>
          <div className="card-actions">
            <select className="card-select">
              <option value="all">전체 계측기</option>
              <option value="GAU-001">주 배관 압력</option>
              <option value="GAU-002">유량계</option>
              <option value="GAU-003">수위 센서</option>
              <option value="GAU-004">배관 온도</option>
            </select>
            <select className="card-select">
              <option value="1h">1시간</option>
              <option value="6h">6시간</option>
              <option value="24h" selected>24시간</option>
              <option value="7d">7일</option>
            </select>
          </div>
        </div>
        <div className="card-bd">
          <TrendChart
            data={chillerTrendData}
            title="냉동기 운전 현황 (최근 6시간)"
            showFill={true}
          />
        </div>
      </div>
    </div>
  );
};

export default GaugePage;
