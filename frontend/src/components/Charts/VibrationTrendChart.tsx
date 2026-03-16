/**
 * VibrationTrendChart - 진동 센서 트렌드 라인 차트
 * 열원사업소 12개 진동 센서 데이터 표시
 */
import type { ChartOptions, ChartData } from 'chart.js';
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
import './Charts.css';

// Chart.js 컴포넌트 등록
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

export interface VibrationDataSet {
  labels: string[];
  sensors: {
    id: string;
    name: string;
    values: number[];
    zone: string;
  }[];
}

interface VibrationTrendChartProps {
  data?: VibrationDataSet;
  title?: string;
  showZones?: ('AICC' | '관제탑' | '공항청사')[];
  className?: string;
}

// 기본 진동 데이터 (최근 12시간)
const defaultVibrationData: VibrationDataSet = {
  labels: [
    '04:00', '05:00', '06:00', '07:00', '08:00', '09:00',
    '10:00', '11:00', '12:00', '13:00', '14:00', '15:00',
  ],
  sensors: [
    { id: 'V-01', name: 'AICC #1 축', values: [0.12, 0.15, 0.18, 0.22, 0.25, 0.28, 0.32, 0.35, 0.33, 0.30, 0.28, 0.25], zone: 'AICC' },
    { id: 'V-02', name: 'AICC #1 베어링', values: [0.08, 0.10, 0.12, 0.15, 0.18, 0.20, 0.22, 0.24, 0.22, 0.20, 0.18, 0.16], zone: 'AICC' },
    { id: 'V-03', name: 'AICC #2 축', values: [0.10, 0.12, 0.14, 0.18, 0.20, 0.22, 0.25, 0.28, 0.26, 0.24, 0.22, 0.20], zone: 'AICC' },
    { id: 'V-04', name: 'AICC #2 베어링', values: [0.06, 0.08, 0.10, 0.12, 0.14, 0.16, 0.18, 0.20, 0.18, 0.16, 0.14, 0.12], zone: 'AICC' },
    { id: 'V-05', name: '관제탑 #1 축', values: [0.15, 0.18, 0.20, 0.24, 0.28, 0.30, 0.35, 0.38, 0.36, 0.32, 0.30, 0.28], zone: '관제탑' },
    { id: 'V-06', name: '관제탑 #1 베어링', values: [0.10, 0.12, 0.14, 0.16, 0.18, 0.20, 0.22, 0.25, 0.23, 0.20, 0.18, 0.16], zone: '관제탑' },
    { id: 'V-07', name: '관제탑 #2 축', values: [0.08, 0.10, 0.12, 0.14, 0.16, 0.18, 0.20, 0.22, 0.20, 0.18, 0.16, 0.14], zone: '관제탑' },
    { id: 'V-08', name: '관제탑 #2 베어링', values: [0.05, 0.06, 0.08, 0.10, 0.12, 0.14, 0.15, 0.16, 0.15, 0.14, 0.12, 0.10], zone: '관제탑' },
    { id: 'V-09', name: '공항청사 #1 축', values: [0.18, 0.20, 0.22, 0.26, 0.30, 0.32, 0.36, 0.40, 0.38, 0.34, 0.32, 0.30], zone: '공항청사' },
    { id: 'V-10', name: '공항청사 #1 베어링', values: [0.12, 0.14, 0.16, 0.18, 0.20, 0.22, 0.24, 0.26, 0.24, 0.22, 0.20, 0.18], zone: '공항청사' },
    { id: 'V-11', name: '공항청사 #2 축', values: [0.14, 0.16, 0.18, 0.22, 0.25, 0.28, 0.30, 0.32, 0.30, 0.28, 0.26, 0.24], zone: '공항청사' },
    { id: 'V-12', name: '공항청사 #2 베어링', values: [0.08, 0.10, 0.12, 0.14, 0.16, 0.18, 0.20, 0.22, 0.20, 0.18, 0.16, 0.14], zone: '공항청사' },
  ],
};

// 센서별 색상 (구역 내 구분용)
const sensorColorVariants: Record<string, string[]> = {
  'AICC': ['#00AAB5', '#00CCD9', '#00E6F0', '#66F0F5'],
  '관제탑': ['#5785C5', '#7299D1', '#8DADDD', '#A8C1E9'],
  '공항청사': ['#F5A623', '#F7B84A', '#F9CA71', '#FBDC98'],
};

export function VibrationTrendChart({
  data = defaultVibrationData,
  title = '진동 센서 트렌드',
  showZones = ['AICC', '관제탑', '공항청사'],
  className = '',
}: VibrationTrendChartProps) {
  // CSS 변수에서 색상 가져오기
  const txt2 = getComputedStyle(document.documentElement)
    .getPropertyValue('--txt2')
    .trim() || '#455060';

  const borderColor = getComputedStyle(document.documentElement)
    .getPropertyValue('--border')
    .trim() || '#E2E7EE';

  const danger = getComputedStyle(document.documentElement)
    .getPropertyValue('--danger')
    .trim() || '#E25D5D';

  // 필터링된 센서 데이터
  const filteredSensors = data.sensors.filter((s) =>
    showZones.includes(s.zone as 'AICC' | '관제탑' | '공항청사')
  );

  // 데이터셋 구성
  const datasets = filteredSensors.map((sensor) => {
    const zoneIndex = data.sensors
      .filter((s) => s.zone === sensor.zone)
      .findIndex((s) => s.id === sensor.id);
    const colors = sensorColorVariants[sensor.zone] || ['#888888'];
    const color = colors[zoneIndex % colors.length];

    return {
      label: sensor.name,
      data: sensor.values,
      borderColor: color,
      backgroundColor: 'transparent',
      tension: 0.3,
      pointRadius: 2,
      pointHoverRadius: 5,
      pointBackgroundColor: color,
      borderWidth: 1.5,
    };
  });

  // 차트 데이터
  const chartData: ChartData<'line'> = {
    labels: data.labels,
    datasets,
  };

  // 경고 임계값 라인 (0.5mm/s)
  const warningThreshold = 0.5;

  // 차트 옵션
  const options: ChartOptions<'line'> = {
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
          color: txt2,
          font: {
            family: "'Noto Sans KR', sans-serif",
            size: 10,
          },
          usePointStyle: true,
          pointStyle: 'line',
          padding: 12,
          boxWidth: 20,
        },
      },
      tooltip: {
        backgroundColor: 'rgba(22, 27, 34, 0.95)',
        titleColor: '#E6EDF3',
        bodyColor: '#9BADC0',
        borderColor: borderColor,
        borderWidth: 1,
        cornerRadius: 8,
        padding: 12,
        titleFont: {
          family: "'Noto Sans KR', sans-serif",
          size: 13,
          weight: 600,
        },
        bodyFont: {
          family: "'Noto Sans KR', sans-serif",
          size: 11,
        },
        callbacks: {
          title: (items) => `시간: ${items[0].label}`,
          label: (context) => {
            const value = context.parsed.y ?? 0;
            const label = context.dataset.label || '';
            const status = value >= warningThreshold ? ' (주의)' : '';
            return `${label}: ${value.toFixed(2)}mm/s${status}`;
          },
        },
      },
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: '시간',
          color: txt2,
          font: {
            family: "'Noto Sans KR', sans-serif",
            size: 12,
            weight: 500,
          },
        },
        grid: {
          color: borderColor,
          lineWidth: 1,
        },
        ticks: {
          color: txt2,
          font: {
            family: "'JetBrains Mono', monospace",
            size: 10,
          },
        },
      },
      y: {
        display: true,
        title: {
          display: true,
          text: '진동 (mm/s)',
          color: txt2,
          font: {
            family: "'Noto Sans KR', sans-serif",
            size: 12,
            weight: 500,
          },
        },
        grid: {
          color: borderColor,
          lineWidth: 1,
        },
        ticks: {
          color: txt2,
          font: {
            family: "'JetBrains Mono', monospace",
            size: 11,
          },
        },
        min: 0,
        suggestedMax: 0.6,
      },
    },
  };

  // 통계 계산
  const allValues = filteredSensors.flatMap((s) => s.values);
  const maxVibration = Math.max(...allValues);
  const avgVibration = allValues.reduce((a, b) => a + b, 0) / allValues.length;
  const warningCount = allValues.filter((v) => v >= warningThreshold).length;

  return (
    <div className={`chart-container ${className}`}>
      {title && <h3 className="chart-title">{title}</h3>}
      <div className="chart-wrapper">
        <Line data={chartData} options={options} />
      </div>
      <div className="chart-stats">
        <span className="stat-item">
          <span className="stat-label">센서 수:</span>
          <span className="stat-value">{filteredSensors.length}개</span>
        </span>
        <span className="stat-item">
          <span className="stat-label">최대 진동:</span>
          <span
            className="stat-value"
            style={{ color: maxVibration >= warningThreshold ? danger : undefined }}
          >
            {maxVibration.toFixed(2)}mm/s
          </span>
        </span>
        <span className="stat-item">
          <span className="stat-label">평균 진동:</span>
          <span className="stat-value">{avgVibration.toFixed(2)}mm/s</span>
        </span>
        {warningCount > 0 && (
          <span className="stat-item">
            <span className="stat-label">경고:</span>
            <span className="stat-value" style={{ color: danger }}>
              {warningCount}건
            </span>
          </span>
        )}
      </div>
    </div>
  );
}

export default VibrationTrendChart;
