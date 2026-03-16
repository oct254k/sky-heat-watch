import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import './SystemPage.css';

// Chart.js 모듈 등록
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

/**
 * SystemPage (p5) - 설비 현황
 *
 * 서버 상태 카드, 시스템 리소스 모니터링, 연결 상태 목록을 포함합니다.
 */
export const SystemPage: React.FC = () => {
  // Mock server data
  const servers = [
    {
      id: 'SRV-001',
      name: 'AI 분석 서버',
      status: 'online',
      cpu: 45,
      memory: 68,
      disk: 52,
      uptime: '15일 8시간',
      lastCheck: '2초 전',
    },
    {
      id: 'SRV-002',
      name: '데이터베이스 서버',
      status: 'online',
      cpu: 32,
      memory: 75,
      disk: 48,
      uptime: '30일 2시간',
      lastCheck: '1초 전',
    },
    {
      id: 'SRV-003',
      name: '네트워크 게이트웨이',
      status: 'warning',
      cpu: 78,
      memory: 82,
      disk: 35,
      uptime: '7일 14시간',
      lastCheck: '5초 전',
    },
  ];

  // Mock connection data
  const connections = [
    { id: 'CON-001', name: 'CCTV 컨트롤러', type: 'TCP/IP', ip: '192.168.1.101', port: 8080, status: 'connected', latency: '12ms' },
    { id: 'CON-002', name: '센서 게이트웨이 #1', type: 'Modbus', ip: '192.168.1.102', port: 502, status: 'connected', latency: '8ms' },
    { id: 'CON-003', name: '센서 게이트웨이 #2', type: 'Modbus', ip: '192.168.1.103', port: 502, status: 'connected', latency: '15ms' },
    { id: 'CON-004', name: '밸브 컨트롤러', type: 'OPC-UA', ip: '192.168.1.104', port: 4840, status: 'connected', latency: '22ms' },
    { id: 'CON-005', name: 'AI 추론 엔진', type: 'gRPC', ip: '192.168.1.110', port: 50051, status: 'warning', latency: '156ms' },
    { id: 'CON-006', name: '외부 API 서버', type: 'HTTPS', ip: '10.0.0.50', port: 443, status: 'disconnected', latency: '-' },
  ];

  // 시스템 리소스 모니터링 Mock 데이터 (최근 1시간, 5분 간격, 12개 포인트)
  const timeLabels = [
    '09:00', '09:05', '09:10', '09:15', '09:20', '09:25',
    '09:30', '09:35', '09:40', '09:45', '09:50', '09:55'
  ];

  const cpuData = [42, 45, 48, 52, 55, 51, 47, 43, 46, 50, 53, 45];
  const memoryData = [65, 68, 70, 72, 75, 73, 71, 68, 70, 74, 76, 68];
  const networkInData = [120, 135, 180, 220, 195, 160, 145, 170, 200, 230, 185, 150];
  const networkOutData = [80, 95, 110, 140, 125, 100, 90, 105, 130, 155, 120, 95];
  // Chart.js 옵션
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: '#a0a7b5',
          font: { size: 11 },
          usePointStyle: true,
          pointStyle: 'circle',
        },
      },
      tooltip: {
        backgroundColor: '#2a2f38',
        titleColor: '#ffffff',
        bodyColor: '#a0a7b5',
        borderColor: '#3d4450',
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        grid: { color: 'rgba(255, 255, 255, 0.05)' },
        ticks: { color: '#a0a7b5', font: { size: 10 } },
      },
      y: {
        type: 'linear' as const,
        display: true,
        position: 'left' as const,
        min: 0,
        max: 100,
        grid: { color: 'rgba(255, 255, 255, 0.05)' },
        ticks: {
          color: '#a0a7b5',
          font: { size: 10 },
          callback: function(value: number | string) { return value + '%'; },
        },
        title: { display: true, text: '사용률 (%)', color: '#a0a7b5', font: { size: 10 } },
      },
      y1: {
        type: 'linear' as const,
        display: true,
        position: 'right' as const,
        min: 0,
        max: 300,
        grid: { drawOnChartArea: false },
        ticks: {
          color: '#a0a7b5',
          font: { size: 10 },
          callback: function(value: number | string) { return value + ' Mbps'; },
        },
        title: { display: true, text: '네트워크 (Mbps)', color: '#a0a7b5', font: { size: 10 } },
      },
    },
  };

  // Chart.js 데이터
  const resourceChartData = {
    labels: timeLabels,
    datasets: [
      {
        label: 'CPU 사용률',
        data: cpuData,
        borderColor: '#3498db',
        backgroundColor: 'rgba(52, 152, 219, 0.1)',
        fill: true,
        tension: 0.4,
        pointRadius: 3,
        pointHoverRadius: 5,
        yAxisID: 'y',
      },
      {
        label: '메모리 사용률',
        data: memoryData,
        borderColor: '#27ae60',
        backgroundColor: 'rgba(39, 174, 96, 0.1)',
        fill: true,
        tension: 0.4,
        pointRadius: 3,
        pointHoverRadius: 5,
        yAxisID: 'y',
      },
      {
        label: '네트워크 In',
        data: networkInData,
        borderColor: '#9b59b6',
        backgroundColor: 'transparent',
        fill: false,
        tension: 0.4,
        pointRadius: 2,
        pointHoverRadius: 4,
        borderDash: [5, 5],
        yAxisID: 'y1',
      },
      {
        label: '네트워크 Out',
        data: networkOutData,
        borderColor: '#f39c12',
        backgroundColor: 'transparent',
        fill: false,
        tension: 0.4,
        pointRadius: 2,
        pointHoverRadius: 4,
        borderDash: [5, 5],
        yAxisID: 'y1',
      },
    ],
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'online':
      case 'connected':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
        );
      case 'warning':
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
            <line x1="15" y1="9" x2="9" y2="15" />
            <line x1="9" y1="9" x2="15" y2="15" />
          </svg>
        );
    }
  };

  const getUsageClass = (value: number) => {
    if (value >= 80) return 'usage-danger';
    if (value >= 60) return 'usage-warning';
    return 'usage-normal';
  };

  return (
    <div className="page-container system-page">
      {/* 서버 상태 카드 */}
      <div className="card">
        <div className="card-hd">
          <h3>
            <svg className="card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
              <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
              <line x1="6" y1="6" x2="6.01" y2="6" />
              <line x1="6" y1="18" x2="6.01" y2="18" />
            </svg>
            서버 상태
          </h3>
          <div className="card-actions">
            <span className="last-update">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              마지막 업데이트: 방금
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
        <div className="card-bd">
          <div className="server-grid">
            {servers.map(server => (
              <div key={server.id} className={`server-card status-${server.status}`}>
                <div className="server-header">
                  <div className="server-status">
                    {getStatusIcon(server.status)}
                    <span className={`status-text status-${server.status}`}>
                      {server.status === 'online' ? '온라인' : server.status === 'warning' ? '주의' : '오프라인'}
                    </span>
                  </div>
                  <span className="server-id">{server.id}</span>
                </div>

                <h4 className="server-name">{server.name}</h4>

                <div className="server-metrics">
                  <div className="metric">
                    <div className="metric-header">
                      <span className="metric-label">CPU</span>
                      <span className={`metric-value ${getUsageClass(server.cpu)}`}>{server.cpu}%</span>
                    </div>
                    <div className="metric-bar">
                      <div className={`metric-fill ${getUsageClass(server.cpu)}`} style={{ width: `${server.cpu}%` }} />
                    </div>
                  </div>

                  <div className="metric">
                    <div className="metric-header">
                      <span className="metric-label">메모리</span>
                      <span className={`metric-value ${getUsageClass(server.memory)}`}>{server.memory}%</span>
                    </div>
                    <div className="metric-bar">
                      <div className={`metric-fill ${getUsageClass(server.memory)}`} style={{ width: `${server.memory}%` }} />
                    </div>
                  </div>

                  <div className="metric">
                    <div className="metric-header">
                      <span className="metric-label">디스크</span>
                      <span className={`metric-value ${getUsageClass(server.disk)}`}>{server.disk}%</span>
                    </div>
                    <div className="metric-bar">
                      <div className={`metric-fill ${getUsageClass(server.disk)}`} style={{ width: `${server.disk}%` }} />
                    </div>
                  </div>
                </div>

                <div className="server-footer">
                  <div className="server-info">
                    <span className="info-label">Uptime</span>
                    <span className="info-value">{server.uptime}</span>
                  </div>
                  <div className="server-info">
                    <span className="info-label">마지막 확인</span>
                    <span className="info-value">{server.lastCheck}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 시스템 리소스 모니터링 */}
      <div className="card">
        <div className="card-hd">
          <h3>
            <svg className="card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
            시스템 리소스 모니터링
          </h3>
          <div className="card-actions">
            <select className="card-select">
              <option value="all">전체 서버</option>
              <option value="SRV-001">AI 분석 서버</option>
              <option value="SRV-002">데이터베이스 서버</option>
              <option value="SRV-003">네트워크 게이트웨이</option>
            </select>
            <select className="card-select">
              <option value="1h">1시간</option>
              <option value="6h">6시간</option>
              <option value="24h">24시간</option>
            </select>
          </div>
        </div>
        <div className="card-bd">
          <div className="resource-chart-container">
            <Line options={chartOptions} data={resourceChartData} />
          </div>
        </div>
      </div>

      {/* 연결 상태 목록 */}
      <div className="card">
        <div className="card-hd">
          <h3>
            <svg className="card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 11a9 9 0 0 1 9 9" />
              <path d="M4 4a16 16 0 0 1 16 16" />
              <circle cx="5" cy="19" r="1" />
            </svg>
            연결 상태
          </h3>
          <div className="card-actions">
            <span className="connection-summary">
              <span className="conn-online">4 연결됨</span>
              <span className="conn-warning">1 주의</span>
              <span className="conn-offline">1 연결 안됨</span>
            </span>
          </div>
        </div>
        <div className="card-bd">
          <div className="table-wrapper">
            <table className="connection-table">
              <thead>
                <tr>
                  <th>상태</th>
                  <th>연결 ID</th>
                  <th>이름</th>
                  <th>프로토콜</th>
                  <th>IP 주소</th>
                  <th>포트</th>
                  <th>지연 시간</th>
                  <th>액션</th>
                </tr>
              </thead>
              <tbody>
                {connections.map(conn => (
                  <tr key={conn.id} className={`row-${conn.status}`}>
                    <td>
                      <span className={`connection-status status-${conn.status}`}>
                        {getStatusIcon(conn.status)}
                      </span>
                    </td>
                    <td className="cell-mono">{conn.id}</td>
                    <td>{conn.name}</td>
                    <td>
                      <span className="protocol-badge">{conn.type}</span>
                    </td>
                    <td className="cell-mono">{conn.ip}</td>
                    <td className="cell-mono">{conn.port}</td>
                    <td className={`cell-mono cell-latency ${conn.status === 'warning' ? 'latency-high' : ''}`}>
                      {conn.latency}
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button className="btn-action btn-refresh" title="재연결">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="1 4 1 10 7 10" />
                            <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
                          </svg>
                        </button>
                        <button className="btn-action btn-settings" title="설정">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="3" />
                            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemPage;
