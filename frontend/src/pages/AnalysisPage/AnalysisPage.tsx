import React from 'react';
import { CorrelationChart } from '../../components/Charts/CorrelationChart';
import type { CorrelationDataPoint } from '../../components/Charts/CorrelationChart';
import './AnalysisPage.css';

/**
 * AnalysisPage (p2) - 센서/영상 비교 분석
 *
 * 온도/변위 상관관계 차트, 센서 데이터 테이블, 영상 비교 영역을 포함합니다.
 */
export const AnalysisPage: React.FC = () => {
  // Mock sensor data
  const sensorData = [
    { id: 'SEN-001', name: '온도 센서 #1', value: '24.5', unit: '\°C', status: 'normal', location: 'A구역' },
    { id: 'SEN-002', name: '온도 센서 #2', value: '26.8', unit: '\°C', status: 'normal', location: 'A구역' },
    { id: 'SEN-003', name: '변위 센서 #1', value: '0.12', unit: 'mm', status: 'warning', location: 'B구역' },
    { id: 'SEN-004', name: '변위 센서 #2', value: '0.08', unit: 'mm', status: 'normal', location: 'B구역' },
    { id: 'SEN-005', name: '진동 센서 #1', value: '2.4', unit: 'Hz', status: 'normal', location: 'C구역' },
    { id: 'SEN-006', name: '압력 센서 #1', value: '1.02', unit: 'bar', status: 'danger', location: 'D구역' },
  ];

  // 냉동기 온도-진동 상관관계 Mock 데이터 (최근 24시간, 25개 포인트)
  // 열원사업소 냉동기: 온도가 높아지면 진동도 증가하는 양의 상관관계
  const correlationData: CorrelationDataPoint[] = [
    { temp: 38.2, disp: 0.12, sensorId: '냉동기#1 00:00' },
    { temp: 39.1, disp: 0.15, sensorId: '냉동기#1 01:00' },
    { temp: 38.8, disp: 0.13, sensorId: '냉동기#1 02:00' },
    { temp: 37.5, disp: 0.10, sensorId: '냉동기#1 03:00' },
    { temp: 37.2, disp: 0.09, sensorId: '냉동기#1 04:00' },
    { temp: 38.0, disp: 0.11, sensorId: '냉동기#1 05:00' },
    { temp: 40.5, disp: 0.22, sensorId: '냉동기#1 06:00' },
    { temp: 42.3, disp: 0.28, sensorId: '냉동기#1 07:00' },
    { temp: 44.8, disp: 0.38, sensorId: '냉동기#1 08:00' },
    { temp: 46.2, disp: 0.45, sensorId: '냉동기#1 09:00' },
    { temp: 47.5, disp: 0.52, sensorId: '냉동기#1 10:00' },
    { temp: 48.1, disp: 0.58, sensorId: '냉동기#1 11:00' },
    { temp: 48.8, disp: 0.62, sensorId: '냉동기#1 12:00' },
    { temp: 49.2, disp: 0.65, sensorId: '냉동기#1 13:00' },
    { temp: 48.5, disp: 0.60, sensorId: '냉동기#1 14:00' },
    { temp: 47.8, disp: 0.55, sensorId: '냉동기#1 15:00' },
    { temp: 46.5, disp: 0.48, sensorId: '냉동기#1 16:00' },
    { temp: 45.2, disp: 0.42, sensorId: '냉동기#1 17:00' },
    { temp: 44.0, disp: 0.35, sensorId: '냉동기#1 18:00' },
    { temp: 42.8, disp: 0.30, sensorId: '냉동기#1 19:00' },
    { temp: 41.5, disp: 0.25, sensorId: '냉동기#1 20:00' },
    { temp: 40.2, disp: 0.20, sensorId: '냉동기#1 21:00' },
    { temp: 39.5, disp: 0.17, sensorId: '냉동기#1 22:00' },
    { temp: 38.8, disp: 0.14, sensorId: '냉동기#1 23:00' },
    { temp: 38.5, disp: 0.13, sensorId: '냉동기#1 24:00' },
  ];

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'warning': return 'status-warning';
      case 'danger': return 'status-danger';
      default: return 'status-normal';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'warning': return '주의';
      case 'danger': return '위험';
      default: return '정상';
    }
  };

  return (
    <div className="page-container analysis-page">
      {/* 상관관계 차트 영역 */}
      <div className="card">
        <div className="card-hd">
          <h3>
            <svg className="card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 3v18h18" />
              <path d="M18 17V9" />
              <path d="M13 17V5" />
              <path d="M8 17v-3" />
            </svg>
            온도/변위 상관관계 분석
          </h3>
          <div className="card-actions">
            <select className="card-select">
              <option value="1h">1시간</option>
              <option value="6h">6시간</option>
              <option value="24h" selected>24시간</option>
              <option value="7d">7일</option>
            </select>
            <button className="btn btn-sm btn-secondary">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              내보내기
            </button>
          </div>
        </div>
        <div className="card-bd">
          <CorrelationChart
            data={correlationData}
            title=""
            showTrendLine={true}
          />
        </div>
      </div>

      {/* 센서 데이터 테이블 및 영상 비교 영역 */}
      <div className="analysis-grid">
        {/* 센서 데이터 테이블 */}
        <div className="card">
          <div className="card-hd">
            <h3>
              <svg className="card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <line x1="3" y1="9" x2="21" y2="9" />
                <line x1="9" y1="21" x2="9" y2="9" />
              </svg>
              센서 데이터 테이블
            </h3>
            <span className="card-badge">실시간</span>
          </div>
          <div className="card-bd">
            <div className="table-wrapper">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>센서 ID</th>
                    <th>센서명</th>
                    <th>측정값</th>
                    <th>위치</th>
                    <th>상태</th>
                  </tr>
                </thead>
                <tbody>
                  {sensorData.map(sensor => (
                    <tr key={sensor.id}>
                      <td className="cell-mono">{sensor.id}</td>
                      <td>{sensor.name}</td>
                      <td className="cell-mono cell-value">
                        {sensor.value}
                        <span className="cell-unit">{sensor.unit}</span>
                      </td>
                      <td>{sensor.location}</td>
                      <td>
                        <span className={`status-badge ${getStatusClass(sensor.status)}`}>
                          {getStatusLabel(sensor.status)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* 영상 비교 영역 */}
        <div className="card">
          <div className="card-hd">
            <h3>
              <svg className="card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="3" width="20" height="14" rx="2" />
                <line x1="8" y1="21" x2="16" y2="21" />
                <line x1="12" y1="17" x2="12" y2="21" />
              </svg>
              영상 비교
            </h3>
            <div className="card-actions">
              <span className="compare-label">기준 vs 실시간</span>
              <button className="btn btn-sm btn-icon" title="이전 프레임">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
              <button className="btn btn-sm btn-icon" title="다음 프레임">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </div>
          </div>
          <div className="card-bd">
            <div className="video-compare">
              {/* 왼쪽: 기준 이미지 (고정) */}
              <div className="video-frame">
                <div className="video-content">
                  <img
                    src="/gauge-base.png"
                    alt="기준 계기판"
                    className="gauge-image"
                  />
                  <div className="video-label">
                    <span className="label-badge base">BASE</span>
                    <span>기준 상태</span>
                  </div>
                </div>
              </div>
              {/* 오른쪽: 수치 상승 상태 (비교용) */}
              <div className="video-frame">
                <div className="video-content">
                  <img
                    src="/gauge-live.png"
                    alt="실시간 계기판"
                    className="gauge-image gauge-animated"
                  />
                  <div className="video-label">
                    <span className="label-badge live">LIVE</span>
                    <span>실시간 모니터링</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="video-controls">
              <div className="compare-info">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="16" x2="12" y2="12" />
                  <line x1="12" y1="8" x2="12.01" y2="8" />
                </svg>
                <span>바늘 위치와 수치 변화를 비교하세요</span>
              </div>
              <button className="btn btn-sm btn-primary">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
                차이점 분석
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 트렌드 분석 요약 */}
      <div className="card">
        <div className="card-hd">
          <h3>
            <svg className="card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
            트렌드 분석 요약
          </h3>
        </div>
        <div className="card-bd">
          <div className="trend-summary">
            <div className="trend-item">
              <div className="trend-label">온도 변화율</div>
              <div className="trend-value trend-up">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                  <polyline points="17 6 23 6 23 12" />
                </svg>
                +2.3%
              </div>
              <div className="trend-desc">지난 1시간 대비</div>
            </div>
            <div className="trend-item">
              <div className="trend-label">변위 변화율</div>
              <div className="trend-value trend-down">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="23 18 13.5 8.5 8.5 13.5 1 6" />
                  <polyline points="17 18 23 18 23 12" />
                </svg>
                -0.8%
              </div>
              <div className="trend-desc">지난 1시간 대비</div>
            </div>
            <div className="trend-item">
              <div className="trend-label">이상 감지</div>
              <div className="trend-value trend-warning">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                  <line x1="12" y1="9" x2="12" y2="13" />
                  <line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
                2건
              </div>
              <div className="trend-desc">주의 필요 항목</div>
            </div>
            <div className="trend-item">
              <div className="trend-label">데이터 품질</div>
              <div className="trend-value trend-normal">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
                98.5%
              </div>
              <div className="trend-desc">수집 성공률</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalysisPage;
