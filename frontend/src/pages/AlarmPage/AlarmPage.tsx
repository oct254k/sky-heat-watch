import React, { useState } from 'react';
import './AlarmPage.css';

/**
 * AlarmPage (p4) - 알람/이벤트 관리
 *
 * 알람 이력 테이블, 필터, 알람 통계 요약을 포함합니다.
 */
export const AlarmPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [severityFilter, setSeverityFilter] = useState('all');
  const [zoneFilter, setZoneFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

  // Mock alarm data
  const alarms = [
    { id: 'ALM-001', time: '2024-01-15 14:32:15', severity: 'danger', zone: 'AICC', sensor: 'SEN-001', title: '온도 상한 초과', value: '85.2°C', threshold: '80°C', status: 'active', type: 'temperature' },
    { id: 'ALM-002', time: '2024-01-15 14:28:42', severity: 'warning', zone: '관제탑', sensor: 'SEN-003', title: '진동 경고', value: '3.8mm/s', threshold: '3.0mm/s', status: 'active', type: 'vibration' },
    { id: 'ALM-003', time: '2024-01-15 14:25:18', severity: 'danger', zone: '공항청사', sensor: 'PWR-001', title: '전류 과부하 감지', value: '125.8A', threshold: '100A', status: 'active', type: 'power' },
    { id: 'ALM-004', time: '2024-01-15 14:20:55', severity: 'warning', zone: 'AICC', sensor: 'PWR-002', title: '전력 소비 이상', value: '85.2kW', threshold: '75kW', status: 'active', type: 'power' },
    { id: 'ALM-005', time: '2024-01-15 14:15:33', severity: 'danger', zone: '공항청사', sensor: 'GAU-002', title: '압력 이상', value: '4.8bar', threshold: '4.5bar', status: 'acknowledged', type: 'pressure' },
    { id: 'ALM-006', time: '2024-01-15 14:10:42', severity: 'warning', zone: '관제탑', sensor: 'PWR-003', title: '역률 저하 경고', value: '0.72', threshold: '0.85', status: 'acknowledged', type: 'power' },
    { id: 'ALM-007', time: '2024-01-15 13:58:21', severity: 'info', zone: 'AICC', sensor: 'CAM-02', title: 'CCTV 연결 복구', value: '-', threshold: '-', status: 'resolved', type: 'system' },
    { id: 'ALM-008', time: '2024-01-15 13:45:10', severity: 'warning', zone: '관제탑', sensor: 'VIB-005', title: '진동 감지', value: '3.2mm/s', threshold: '3.0mm/s', status: 'resolved', type: 'vibration' },
    { id: 'ALM-009', time: '2024-01-15 13:35:28', severity: 'danger', zone: '공항청사', sensor: 'PWR-004', title: '전류 불균형 감지', value: '15.2%', threshold: '10%', status: 'resolved', type: 'power' },
    { id: 'ALM-010', time: '2024-01-15 13:22:05', severity: 'danger', zone: '공항청사', sensor: 'CHI-003', title: '냉동기 이상 감지', value: '비정상', threshold: '정상', status: 'resolved', type: 'system' },
    { id: 'ALM-011', time: '2024-01-15 12:55:48', severity: 'info', zone: 'AICC', sensor: 'SYS-001', title: '시스템 점검 완료', value: '-', threshold: '-', status: 'resolved', type: 'system' },
    { id: 'ALM-012', time: '2024-01-15 12:30:22', severity: 'warning', zone: '공항청사', sensor: 'SEN-008', title: '냉각수 온도 경고', value: '38°C', threshold: '35°C', status: 'resolved', type: 'temperature' },
    { id: 'ALM-013', time: '2024-01-15 11:45:33', severity: 'warning', zone: 'AICC', sensor: 'PWR-005', title: '전압 변동 감지', value: '±8.5%', threshold: '±5%', status: 'resolved', type: 'power' },
    { id: 'ALM-014', time: '2024-01-15 11:20:15', severity: 'info', zone: '관제탑', sensor: 'PWR-006', title: '전력 모니터링 정상화', value: '-', threshold: '-', status: 'resolved', type: 'power' },
  ];

  // Statistics
  const stats = {
    total: 14,
    active: 4,
    acknowledged: 2,
    resolved: 8,
    danger: 5,
    warning: 6,
    info: 3,
    power: 6, // 전력/전류 관련 알람
  };

  const getSeverityClass = (severity: string) => {
    switch (severity) {
      case 'danger': return 'severity-danger';
      case 'warning': return 'severity-warning';
      default: return 'severity-info';
    }
  };

  const getSeverityLabel = (severity: string) => {
    switch (severity) {
      case 'danger': return '위험';
      case 'warning': return '경고';
      default: return '정보';
    }
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'active': return 'status-active';
      case 'acknowledged': return 'status-acknowledged';
      default: return 'status-resolved';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active': return '활성';
      case 'acknowledged': return '확인';
      default: return '해제';
    }
  };

  const totalPages = Math.ceil(alarms.length / 5);

  return (
    <div className="page-container alarm-page">
      {/* 알람 통계 요약 */}
      <div className="alarm-stats">
        <div className="stat-card stat-total">
          <div className="stat-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
          </div>
          <div className="stat-content">
            <div className="stat-value">{stats.total}</div>
            <div className="stat-label">전체 알람</div>
          </div>
        </div>

        <div className="stat-card stat-active">
          <div className="stat-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </div>
          <div className="stat-content">
            <div className="stat-value">{stats.active}</div>
            <div className="stat-label">활성 알람</div>
          </div>
        </div>

        <div className="stat-card stat-danger">
          <div className="stat-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
          </div>
          <div className="stat-content">
            <div className="stat-value">{stats.danger}</div>
            <div className="stat-label">위험</div>
          </div>
        </div>

        <div className="stat-card stat-warning">
          <div className="stat-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </div>
          <div className="stat-content">
            <div className="stat-value">{stats.warning}</div>
            <div className="stat-label">경고</div>
          </div>
        </div>

        <div className="stat-card stat-resolved">
          <div className="stat-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
          </div>
          <div className="stat-content">
            <div className="stat-value">{stats.resolved}</div>
            <div className="stat-label">해제됨</div>
          </div>
        </div>

        <div className="stat-card stat-power">
          <div className="stat-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
          </div>
          <div className="stat-content">
            <div className="stat-value">{stats.power}</div>
            <div className="stat-label">전력/전류</div>
          </div>
        </div>
      </div>

      {/* 필터 및 테이블 */}
      <div className="card">
        <div className="card-hd">
          <h3>
            <svg className="card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <line x1="3" y1="9" x2="21" y2="9" />
              <line x1="9" y1="21" x2="9" y2="9" />
            </svg>
            알람 이력
          </h3>
          <div className="card-actions">
            <input type="date" className="card-input" defaultValue="2024-01-15" />
            <select
              className="card-select"
              value={severityFilter}
              onChange={(e) => setSeverityFilter(e.target.value)}
            >
              <option value="all">심각도 전체</option>
              <option value="danger">위험</option>
              <option value="warning">경고</option>
              <option value="info">정보</option>
            </select>
            <select
              className="card-select"
              value={zoneFilter}
              onChange={(e) => setZoneFilter(e.target.value)}
            >
              <option value="all">건물 전체</option>
              <option value="AICC">AICC</option>
              <option value="관제탑">관제탑</option>
              <option value="공항청사">공항청사</option>
            </select>
            <select
              className="card-select"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              <option value="all">유형 전체</option>
              <option value="power">전력/전류</option>
              <option value="temperature">온도</option>
              <option value="vibration">진동</option>
              <option value="pressure">압력</option>
              <option value="system">시스템</option>
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
          <div className="table-wrapper">
            <table className="alarm-table">
              <thead>
                <tr>
                  <th>알람 ID</th>
                  <th>발생 시간</th>
                  <th>심각도</th>
                  <th>건물</th>
                  <th>센서</th>
                  <th>알람 내용</th>
                  <th>측정값</th>
                  <th>임계값</th>
                  <th>상태</th>
                  <th>액션</th>
                </tr>
              </thead>
              <tbody>
                {alarms.map(alarm => (
                  <tr key={alarm.id} className={alarm.status === 'active' ? 'row-active' : ''}>
                    <td className="cell-mono">{alarm.id}</td>
                    <td className="cell-mono cell-time">{alarm.time}</td>
                    <td>
                      <span className={`severity-badge ${getSeverityClass(alarm.severity)}`}>
                        {getSeverityLabel(alarm.severity)}
                      </span>
                    </td>
                    <td>{alarm.zone}</td>
                    <td className="cell-mono">{alarm.sensor}</td>
                    <td className="cell-title">{alarm.title}</td>
                    <td className="cell-mono cell-value">{alarm.value}</td>
                    <td className="cell-mono">{alarm.threshold}</td>
                    <td>
                      <span className={`status-badge ${getStatusClass(alarm.status)}`}>
                        {getStatusLabel(alarm.status)}
                      </span>
                    </td>
                    <td>
                      <div className="action-buttons">
                        {alarm.status === 'active' && (
                          <button className="btn-action btn-acknowledge" title="확인">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          </button>
                        )}
                        <button className="btn-action btn-detail" title="상세">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10" />
                            <line x1="12" y1="16" x2="12" y2="12" />
                            <line x1="12" y1="8" x2="12.01" y2="8" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 페이지네이션 */}
          <div className="pagination">
            <button
              className="btn btn-sm btn-icon"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(1)}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="11 17 6 12 11 7" />
                <polyline points="18 17 13 12 18 7" />
              </svg>
            </button>
            <button
              className="btn btn-sm btn-icon"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(p => p - 1)}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>

            <span className="pagination-info">
              {currentPage} / {totalPages} 페이지
            </span>

            <button
              className="btn btn-sm btn-icon"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(p => p + 1)}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
            <button
              className="btn btn-sm btn-icon"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(totalPages)}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="13 17 18 12 13 7" />
                <polyline points="6 17 11 12 6 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlarmPage;
