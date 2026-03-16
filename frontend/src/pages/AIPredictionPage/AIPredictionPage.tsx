import React, { useState } from 'react';
import './AIPredictionPage.css';

/**
 * AIPredictionPage (p9) - AI 예측 분석
 *
 * AI 기반 장비 고장 예측, 패턴 분석, 수명 추적을 포함합니다.
 */
export const AIPredictionPage: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<'all' | 'warning' | 'caution' | 'info'>('all');

  // 전력/전압/전류 이상 감지 데이터 (첫 줄 표시용)
  const powerAnomalies = [
    { id: 'PWR-001', type: '전류', equipment: '냉동기 #2', value: '125.8A', threshold: '100A', status: 'warning', change: '+25.8%' },
    { id: 'PWR-002', type: '전압', equipment: '변압기 TR-01', value: '±7.2%', threshold: '±5%', status: 'warning', change: '변동폭 증가' },
    { id: 'PWR-003', type: '전력', equipment: '터보냉동기 #1', value: '85.2kW', threshold: '75kW', status: 'caution', change: '+13.6%' },
    { id: 'PWR-004', type: '역률', equipment: 'AICC 수배전반', value: '0.72', threshold: '0.85', status: 'caution', change: '-15.3%' },
    { id: 'PWR-005', type: '고조파', equipment: '공항청사 MCC', value: '8.5%', threshold: '5%', status: 'caution', change: '+70%' },
    { id: 'PWR-006', type: '전류', equipment: '펌프 P-102', value: '불균형 12%', threshold: '10%', status: 'caution', change: '+20%' },
  ];

  // AI 예측 데이터
  const predictions = [
    {
      id: 'AI-001',
      severity: 'warning',
      category: 'lifecycle',
      equipment: '스크류냉동기 #2',
      location: 'AICC B1F',
      title: '장비 수명 주기 경고',
      description: '동일 모델 3년 전 베어링 마모 고장. 현재 2년 11개월 도달.',
      prediction: '30일 내 베어링 점검',
      confidence: 87,
    },
    {
      id: 'AI-002',
      severity: 'warning',
      category: 'pattern',
      equipment: '냉각탑 팬 #3',
      location: '관제탑 옥상',
      title: '진동 스파이크 주기 단축',
      description: '진동 발생 주기 48h→24h→12h 단축 추세.',
      prediction: '팬 밸런싱/베어링 교체',
      confidence: 92,
    },
    {
      id: 'AI-003',
      severity: 'warning',
      category: 'power',
      equipment: '변압기 TR-01',
      location: '공항청사 전기실',
      title: '전압 변동폭 증가',
      description: '전압 변동 ±3%→±7%, 고조파 왜곡률 상승.',
      prediction: '전력 품질 필터 점검',
      confidence: 85,
    },
    {
      id: 'AI-004',
      severity: 'caution',
      category: 'power',
      equipment: '터보냉동기 #1',
      location: '공항청사 지하',
      title: '전력 소비량 8.3% 증가',
      description: '동일 부하 대비 효율 저하 징후.',
      prediction: '냉매 충전량 점검',
      confidence: 78,
    },
    {
      id: 'AI-005',
      severity: 'caution',
      category: 'maintenance',
      equipment: '공조기 AHU-05',
      location: 'AICC 3F',
      title: '필터 막힘률 72%',
      description: '평균 교체 주기 대비 85% 경과.',
      prediction: '2주 내 필터 교체',
      confidence: 95,
    },
    {
      id: 'AI-006',
      severity: 'caution',
      category: 'temperature',
      equipment: '펌프 P-102',
      location: '관제탑 B1F',
      title: '모터 온도 상승 추세',
      description: '14일간 +0.3°C/일 상승. 냉각 계통 이상.',
      prediction: '7일 내 과열 위험',
      confidence: 81,
    },
    {
      id: 'AI-007',
      severity: 'caution',
      category: 'weather',
      equipment: '냉각탑 팬 #1~#4',
      location: '관제탑 옥상',
      title: '우천 예보 (80%)',
      description: '오늘 오후 비 예보. 외부 장비 점검 권장.',
      prediction: '외부 장비 모니터링 강화',
      confidence: 90,
    },
    {
      id: 'AI-008',
      severity: 'caution',
      category: 'power',
      equipment: 'AICC 수배전반',
      location: 'AICC B1F',
      title: '역률 저하 (0.72)',
      description: '기준 0.85 대비 15% 하락. 전력 요금 증가 우려.',
      prediction: '역률 개선 설비 점검',
      confidence: 83,
    },
    {
      id: 'AI-009',
      severity: 'info',
      category: 'lifecycle',
      equipment: '냉각수 펌프 #4',
      location: 'AICC B2F',
      title: '수명 74% 경과',
      description: '가동 18,500시간 / 예상 25,000시간.',
      prediction: '8개월 후 오버홀 검토',
      confidence: 88,
    },
    {
      id: 'AI-010',
      severity: 'info',
      category: 'weather',
      equipment: '외부 배관',
      location: 'AICC 옥상',
      title: '동파 위험 예측',
      description: '내일 새벽 -5°C 예보. 외부 배관 주의.',
      prediction: '순환 펌프 가동 권장',
      confidence: 88,
    },
    {
      id: 'AI-011',
      severity: 'info',
      category: 'load',
      equipment: '전체 시스템',
      location: '열원사업소',
      title: '냉방 부하 증가 예측',
      description: '다음 주 평균 기온 +5°C 상승 예보.',
      prediction: '냉동기 추가 가동 준비',
      confidence: 72,
    },
    {
      id: 'AI-012',
      severity: 'caution',
      category: 'weather',
      equipment: '전기실 환풍기',
      location: '공항청사 B1F',
      title: '침수 위험 알림',
      description: '강수량 50mm+ 시 반지하 침수 이력.',
      prediction: '배수펌프 점검 필요',
      confidence: 76,
    },
  ];

  // 장비 수명 현황 데이터
  const equipmentLifecycle = [
    { name: '스크류냉동기 #1', age: 4.2, expectedLife: 15, status: 'normal', lastMaintenance: '2024-01-10' },
    { name: '스크류냉동기 #2', age: 2.9, expectedLife: 15, status: 'warning', lastMaintenance: '2023-11-15' },
    { name: '터보냉동기 #1', age: 5.8, expectedLife: 20, status: 'normal', lastMaintenance: '2024-01-05' },
    { name: '냉각탑 팬 #1', age: 3.5, expectedLife: 10, status: 'normal', lastMaintenance: '2023-12-20' },
    { name: '냉각탑 팬 #2', age: 3.5, expectedLife: 10, status: 'normal', lastMaintenance: '2023-12-20' },
    { name: '냉각탑 팬 #3', age: 3.5, expectedLife: 10, status: 'caution', lastMaintenance: '2023-10-05' },
    { name: '공조기 AHU-05', age: 6.2, expectedLife: 15, status: 'caution', lastMaintenance: '2023-09-15' },
    { name: '펌프 P-102', age: 2.1, expectedLife: 12, status: 'caution', lastMaintenance: '2023-08-20' },
  ];

  // 통계
  const stats = {
    totalPredictions: predictions.length,
    warnings: predictions.filter(p => p.severity === 'warning').length,
    cautions: predictions.filter(p => p.severity === 'caution').length,
    powerIssues: powerAnomalies.length,
    avgConfidence: Math.round(predictions.reduce((sum, p) => sum + p.confidence, 0) / predictions.length),
  };

  const filteredPredictions = selectedTab === 'all'
    ? predictions
    : predictions.filter(p => p.severity === selectedTab);

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'warning':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
            <line x1="12" y1="9" x2="12" y2="13" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
        );
      case 'caution':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        );
      default:
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="16" x2="12" y2="12" />
            <line x1="12" y1="8" x2="12.01" y2="8" />
          </svg>
        );
    }
  };

  const getSeverityLabel = (severity: string) => {
    switch (severity) {
      case 'warning': return '경고';
      case 'caution': return '주의';
      default: return '정보';
    }
  };

  const getLifecyclePercent = (age: number, expectedLife: number) => {
    return Math.min(100, (age / expectedLife) * 100);
  };

  return (
    <div className="page-container ai-prediction-page">
      {/* 전력/전압/전류 이상 감지 (첫 줄) */}
      <div className="power-anomaly-section">
        <div className="power-anomaly-header">
          <div className="power-anomaly-title">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
            <span>전력 이상 감지</span>
            <span className="power-count">{powerAnomalies.length}건</span>
          </div>
          <span className="power-updated">최근 5분 내 갱신</span>
        </div>
        <div className="power-anomaly-list">
          {powerAnomalies.map(item => (
            <div key={item.id} className={`power-anomaly-item status-${item.status}`}>
              <span className="power-type">{item.type}</span>
              <span className="power-equipment">{item.equipment}</span>
              <span className="power-value">{item.value}</span>
              <span className="power-threshold">기준: {item.threshold}</span>
              <span className={`power-change ${item.status}`}>{item.change}</span>
            </div>
          ))}
        </div>
      </div>

      {/* AI 분석 요약 */}
      <div className="ai-summary">
        <div className="ai-summary-card ai-brain">
          <div className="ai-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M12 2a4 4 0 0 1 4 4v1a4 4 0 0 1-4 4 4 4 0 0 1-4-4V6a4 4 0 0 1 4-4z" />
              <path d="M12 11v4" />
              <path d="M8 22h8" />
              <path d="M12 15a7 7 0 0 0 7 7" />
              <path d="M12 15a7 7 0 0 1-7 7" />
              <circle cx="12" cy="6" r="1" />
            </svg>
          </div>
          <div className="ai-summary-content">
            <div className="ai-summary-value">{stats.totalPredictions}</div>
            <div className="ai-summary-label">AI 예측 항목</div>
          </div>
          <div className="ai-pulse"></div>
        </div>

        <div className="ai-summary-card ai-warning">
          <div className="ai-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
          </div>
          <div className="ai-summary-content">
            <div className="ai-summary-value">{stats.warnings}</div>
            <div className="ai-summary-label">경고</div>
          </div>
        </div>

        <div className="ai-summary-card ai-caution">
          <div className="ai-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </div>
          <div className="ai-summary-content">
            <div className="ai-summary-value">{stats.cautions}</div>
            <div className="ai-summary-label">주의</div>
          </div>
        </div>

        <div className="ai-summary-card ai-confidence">
          <div className="ai-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
          </div>
          <div className="ai-summary-content">
            <div className="ai-summary-value">{stats.avgConfidence}%</div>
            <div className="ai-summary-label">평균 신뢰도</div>
          </div>
        </div>
      </div>

      {/* 메인 그리드 */}
      <div className="ai-grid">
        {/* AI 예측 목록 */}
        <div className="card ai-predictions-card">
          <div className="card-hd">
            <h3>
              <svg className="card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2a4 4 0 0 1 4 4v1a4 4 0 0 1-4 4 4 4 0 0 1-4-4V6a4 4 0 0 1 4-4z" />
                <path d="M9 22V12h6v10" />
              </svg>
              AI 예측 분석
            </h3>
            <div className="card-tabs">
              <button
                className={`tab-btn ${selectedTab === 'all' ? 'active' : ''}`}
                onClick={() => setSelectedTab('all')}
              >
                전체 ({predictions.length})
              </button>
              <button
                className={`tab-btn tab-warning ${selectedTab === 'warning' ? 'active' : ''}`}
                onClick={() => setSelectedTab('warning')}
              >
                경고 ({stats.warnings})
              </button>
              <button
                className={`tab-btn tab-caution ${selectedTab === 'caution' ? 'active' : ''}`}
                onClick={() => setSelectedTab('caution')}
              >
                주의 ({stats.cautions})
              </button>
              <button
                className={`tab-btn tab-info ${selectedTab === 'info' ? 'active' : ''}`}
                onClick={() => setSelectedTab('info')}
              >
                정보
              </button>
            </div>
          </div>
          <div className="card-bd compact-list">
            <table className="predictions-table">
              <thead>
                <tr>
                  <th>상태</th>
                  <th>장비</th>
                  <th>예측 내용</th>
                  <th>조치 권고</th>
                  <th>신뢰도</th>
                </tr>
              </thead>
              <tbody>
                {filteredPredictions.map(pred => (
                  <tr key={pred.id} className={`row-${pred.severity}`}>
                    <td>
                      <span className={`severity-badge ${pred.severity}`}>
                        {getSeverityIcon(pred.severity)}
                        {getSeverityLabel(pred.severity)}
                      </span>
                    </td>
                    <td>
                      <div className="cell-equipment">
                        <strong>{pred.equipment}</strong>
                        <span className="cell-location">{pred.location}</span>
                      </div>
                    </td>
                    <td>
                      <div className="cell-prediction">
                        <span className="cell-title">{pred.title}</span>
                        <span className="cell-desc">{pred.description}</span>
                      </div>
                    </td>
                    <td>
                      <span className="cell-action">{pred.prediction}</span>
                    </td>
                    <td>
                      <div className="cell-confidence">
                        <div className="confidence-mini">
                          <div className="confidence-fill-mini" style={{ width: `${pred.confidence}%` }} />
                        </div>
                        <span>{pred.confidence}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 장비 수명 현황 */}
        <div className="card lifecycle-card">
          <div className="card-hd">
            <h3>
              <svg className="card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              장비 수명 현황
            </h3>
            <span className="card-badge">실시간 추적</span>
          </div>
          <div className="card-bd">
            <div className="lifecycle-list">
              {equipmentLifecycle.map((eq, idx) => (
                <div key={idx} className={`lifecycle-item status-${eq.status}`}>
                  <div className="lifecycle-info">
                    <span className="lifecycle-name">{eq.name}</span>
                    <span className="lifecycle-maintenance">
                      최근 정비: {eq.lastMaintenance}
                    </span>
                  </div>
                  <div className="lifecycle-bar-wrap">
                    <div className="lifecycle-bar">
                      <div
                        className={`lifecycle-fill ${eq.status}`}
                        style={{ width: `${getLifecyclePercent(eq.age, eq.expectedLife)}%` }}
                      />
                    </div>
                    <div className="lifecycle-labels">
                      <span>{eq.age}년</span>
                      <span>{eq.expectedLife}년</span>
                    </div>
                  </div>
                  <div className={`lifecycle-status ${eq.status}`}>
                    {eq.status === 'warning' && '경고'}
                    {eq.status === 'caution' && '주의'}
                    {eq.status === 'normal' && '정상'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* AI 학습 현황 */}
      <div className="card ai-learning-card">
        <div className="card-hd">
          <h3>
            <svg className="card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
              <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
            </svg>
            AI 학습 데이터 현황
          </h3>
        </div>
        <div className="card-bd">
          <div className="learning-stats">
            <div className="learning-stat">
              <div className="learning-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="17 8 12 3 7 8" />
                  <line x1="12" y1="3" x2="12" y2="15" />
                </svg>
              </div>
              <div className="learning-content">
                <div className="learning-value">1,247,832</div>
                <div className="learning-label">수집된 데이터 포인트</div>
              </div>
            </div>
            <div className="learning-stat">
              <div className="learning-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <line x1="3" y1="9" x2="21" y2="9" />
                  <line x1="9" y1="21" x2="9" y2="9" />
                </svg>
              </div>
              <div className="learning-content">
                <div className="learning-value">156</div>
                <div className="learning-label">과거 고장 이력</div>
              </div>
            </div>
            <div className="learning-stat">
              <div className="learning-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                </svg>
              </div>
              <div className="learning-content">
                <div className="learning-value">48</div>
                <div className="learning-label">분석 패턴</div>
              </div>
            </div>
            <div className="learning-stat">
              <div className="learning-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 20V10" />
                  <path d="M18 20V4" />
                  <path d="M6 20v-4" />
                </svg>
              </div>
              <div className="learning-content">
                <div className="learning-value">94.2%</div>
                <div className="learning-label">예측 정확도</div>
              </div>
            </div>
            <div className="learning-stat">
              <div className="learning-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </div>
              <div className="learning-content">
                <div className="learning-value">3년</div>
                <div className="learning-label">학습 기간</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIPredictionPage;
