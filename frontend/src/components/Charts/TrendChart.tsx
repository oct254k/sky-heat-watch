/**
 * TrendChart - 시간대별 온도/변위 트렌드 라인 차트
 * 24시간 데이터 표시, 영역 채우기 포함
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

export interface TrendDataSet {
  labels: string[];
  temperature: number[];
  displacement: number[];
}

interface TrendChartProps {
  data?: TrendDataSet;
  title?: string;
  showFill?: boolean;
  className?: string;
}

// 기본 24시간 데이터
const defaultTrendData: TrendDataSet = {
  labels: [
    '00:00', '01:00', '02:00', '03:00', '04:00', '05:00',
    '06:00', '07:00', '08:00', '09:00', '10:00', '11:00',
    '12:00', '13:00', '14:00', '15:00', '16:00', '17:00',
    '18:00', '19:00', '20:00', '21:00', '22:00', '23:00',
  ],
  temperature: [
    40.2, 40.5, 41.0, 41.8, 42.3, 43.1,
    44.0, 44.8, 45.2, 45.8, 46.2, 46.5,
    46.8, 46.5, 46.0, 45.5, 45.0, 44.5,
    44.0, 43.5, 43.0, 42.5, 41.8, 41.0,
  ],
  displacement: [
    0.05, 0.06, 0.08, 0.12, 0.15, 0.20,
    0.28, 0.38, 0.45, 0.52, 0.58, 0.62,
    0.65, 0.62, 0.55, 0.48, 0.42, 0.35,
    0.30, 0.25, 0.20, 0.15, 0.10, 0.07,
  ],
};

export function TrendChart({
  data = defaultTrendData,
  title = '24시간 온도/변위 트렌드',
  showFill = true,
  className = '',
}: TrendChartProps) {
  // CSS 변수에서 색상 가져오기
  const iafcBlue = getComputedStyle(document.documentElement)
    .getPropertyValue('--iafc-blue')
    .trim() || '#5785C5';

  const iafcGreen = getComputedStyle(document.documentElement)
    .getPropertyValue('--iafc-green')
    .trim() || '#00AAB5';

  const txt2 = getComputedStyle(document.documentElement)
    .getPropertyValue('--txt2')
    .trim() || '#455060';

  const borderColor = getComputedStyle(document.documentElement)
    .getPropertyValue('--border')
    .trim() || '#E2E7EE';

  // 차트 데이터 구성
  const chartData: ChartData<'line'> = {
    labels: data.labels,
    datasets: [
      {
        label: '온도 (°C)',
        data: data.temperature,
        borderColor: iafcBlue,
        backgroundColor: showFill
          ? `${iafcBlue}20`
          : 'transparent',
        fill: showFill,
        tension: 0.4,
        pointRadius: 3,
        pointHoverRadius: 6,
        pointBackgroundColor: iafcBlue,
        pointBorderColor: '#FFFFFF',
        pointBorderWidth: 2,
        borderWidth: 2,
        yAxisID: 'y',
      },
      {
        label: '변위 (mm)',
        data: data.displacement,
        borderColor: iafcGreen,
        backgroundColor: showFill
          ? `${iafcGreen}20`
          : 'transparent',
        fill: showFill,
        tension: 0.4,
        pointRadius: 3,
        pointHoverRadius: 6,
        pointBackgroundColor: iafcGreen,
        pointBorderColor: '#FFFFFF',
        pointBorderWidth: 2,
        borderWidth: 2,
        yAxisID: 'y1',
      },
    ],
  };

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
            size: 12,
          },
          usePointStyle: true,
          pointStyle: 'circle',
          padding: 16,
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
          size: 12,
        },
        callbacks: {
          title: (tooltipItems) => {
            return `시간: ${tooltipItems[0].label}`;
          },
          label: (context) => {
            const label = context.dataset.label || '';
            const value = context.parsed.y;
            if (value == null) return '';
            if (label.includes('온도')) {
              return `${label}: ${value.toFixed(1)}°C`;
            }
            return `${label}: ${value.toFixed(2)}mm`;
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
          maxRotation: 45,
          minRotation: 0,
          autoSkip: true,
          maxTicksLimit: 12,
        },
      },
      y: {
        type: 'linear' as const,
        display: true,
        position: 'left' as const,
        title: {
          display: true,
          text: '온도 (°C)',
          color: iafcBlue,
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
          color: iafcBlue,
          font: {
            family: "'JetBrains Mono', monospace",
            size: 11,
          },
        },
      },
      y1: {
        type: 'linear' as const,
        display: true,
        position: 'right' as const,
        title: {
          display: true,
          text: '변위 (mm)',
          color: iafcGreen,
          font: {
            family: "'Noto Sans KR', sans-serif",
            size: 12,
            weight: 500,
          },
        },
        grid: {
          drawOnChartArea: false,
        },
        ticks: {
          color: iafcGreen,
          font: {
            family: "'JetBrains Mono', monospace",
            size: 11,
          },
        },
      },
    },
  };

  // 최신 값 계산
  const latestTemp = data.temperature[data.temperature.length - 1];
  const latestDisp = data.displacement[data.displacement.length - 1];
  const avgTemp = data.temperature.reduce((a, b) => a + b, 0) / data.temperature.length;
  const avgDisp = data.displacement.reduce((a, b) => a + b, 0) / data.displacement.length;

  return (
    <div className={`chart-container ${className}`}>
      {title && <h3 className="chart-title">{title}</h3>}
      <div className="chart-wrapper">
        <Line data={chartData} options={options} />
      </div>
      <div className="chart-stats">
        <span className="stat-item">
          <span className="stat-label">현재 온도:</span>
          <span className="stat-value" style={{ color: iafcBlue }}>
            {latestTemp.toFixed(1)}°C
          </span>
        </span>
        <span className="stat-item">
          <span className="stat-label">평균 온도:</span>
          <span className="stat-value" style={{ color: iafcBlue }}>
            {avgTemp.toFixed(1)}°C
          </span>
        </span>
        <span className="stat-item">
          <span className="stat-label">현재 변위:</span>
          <span className="stat-value" style={{ color: iafcGreen }}>
            {latestDisp.toFixed(2)}mm
          </span>
        </span>
        <span className="stat-item">
          <span className="stat-label">평균 변위:</span>
          <span className="stat-value" style={{ color: iafcGreen }}>
            {avgDisp.toFixed(2)}mm
          </span>
        </span>
      </div>
    </div>
  );
}

export default TrendChart;
