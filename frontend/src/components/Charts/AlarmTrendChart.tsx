/**
 * AlarmTrendChart - 알람 발생 추이 바 차트
 * 최근 7일간 알람 발생 현황 (긴급/경고/주의)
 */
import type { ChartOptions, ChartData } from 'chart.js';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import './Charts.css';

// Chart.js 컴포넌트 등록
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export interface AlarmDailyData {
  date: string;
  critical: number;
  warning: number;
  info: number;
}

interface AlarmTrendChartProps {
  data?: AlarmDailyData[];
  title?: string;
  className?: string;
}

// 기본 7일 알람 데이터
const defaultAlarmData: AlarmDailyData[] = [
  { date: '03/09', critical: 0, warning: 2, info: 5 },
  { date: '03/10', critical: 1, warning: 3, info: 4 },
  { date: '03/11', critical: 0, warning: 1, info: 6 },
  { date: '03/12', critical: 2, warning: 4, info: 3 },
  { date: '03/13', critical: 0, warning: 2, info: 5 },
  { date: '03/14', critical: 1, warning: 1, info: 4 },
  { date: '03/15', critical: 0, warning: 3, info: 7 },
];

export function AlarmTrendChart({
  data = defaultAlarmData,
  title = '최근 7일 알람 발생 추이',
  className = '',
}: AlarmTrendChartProps) {
  // CSS 변수에서 색상 가져오기
  const danger = getComputedStyle(document.documentElement)
    .getPropertyValue('--danger')
    .trim() || '#E25D5D';

  const warning = getComputedStyle(document.documentElement)
    .getPropertyValue('--warning')
    .trim() || '#F5A623';

  const iafcBlue = getComputedStyle(document.documentElement)
    .getPropertyValue('--iafc-blue')
    .trim() || '#5785C5';

  const txt2 = getComputedStyle(document.documentElement)
    .getPropertyValue('--txt2')
    .trim() || '#455060';

  const borderColor = getComputedStyle(document.documentElement)
    .getPropertyValue('--border')
    .trim() || '#E2E7EE';

  // 통계 계산
  const totalCritical = data.reduce((sum, d) => sum + d.critical, 0);
  const totalWarning = data.reduce((sum, d) => sum + d.warning, 0);
  const totalInfo = data.reduce((sum, d) => sum + d.info, 0);
  const totalAlarms = totalCritical + totalWarning + totalInfo;

  // 차트 데이터
  const chartData: ChartData<'bar'> = {
    labels: data.map((d) => d.date),
    datasets: [
      {
        label: '긴급',
        data: data.map((d) => d.critical),
        backgroundColor: danger,
        borderColor: danger,
        borderWidth: 0,
        borderRadius: 4,
        barPercentage: 0.7,
        categoryPercentage: 0.8,
      },
      {
        label: '경고',
        data: data.map((d) => d.warning),
        backgroundColor: warning,
        borderColor: warning,
        borderWidth: 0,
        borderRadius: 4,
        barPercentage: 0.7,
        categoryPercentage: 0.8,
      },
      {
        label: '주의',
        data: data.map((d) => d.info),
        backgroundColor: iafcBlue,
        borderColor: iafcBlue,
        borderWidth: 0,
        borderRadius: 4,
        barPercentage: 0.7,
        categoryPercentage: 0.8,
      },
    ],
  };

  // 차트 옵션
  const options: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
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
          pointStyle: 'rectRounded',
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
          title: (items) => `${items[0].label} 알람 현황`,
          label: (context) => {
            const label = context.dataset.label || '';
            const value = context.parsed.y;
            return `${label}: ${value}건`;
          },
          footer: (items) => {
            const total = items.reduce((sum, item) => sum + (item.parsed.y ?? 0), 0);
            return `합계: ${total}건`;
          },
        },
      },
    },
    scales: {
      x: {
        stacked: true,
        grid: {
          display: false,
        },
        ticks: {
          color: txt2,
          font: {
            family: "'Noto Sans KR', sans-serif",
            size: 11,
          },
        },
      },
      y: {
        stacked: true,
        beginAtZero: true,
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
          stepSize: 2,
        },
        title: {
          display: true,
          text: '발생 건수',
          color: txt2,
          font: {
            family: "'Noto Sans KR', sans-serif",
            size: 12,
            weight: 500,
          },
        },
      },
    },
  };

  return (
    <div className={`chart-container ${className}`}>
      {title && <h3 className="chart-title">{title}</h3>}
      <div className="chart-wrapper">
        <Bar data={chartData} options={options} />
      </div>
      <div className="chart-stats">
        <span className="stat-item">
          <span className="stat-label">총 알람:</span>
          <span className="stat-value">{totalAlarms}건</span>
        </span>
        <span className="stat-item">
          <span className="stat-label">긴급:</span>
          <span className="stat-value" style={{ color: danger }}>
            {totalCritical}건
          </span>
        </span>
        <span className="stat-item">
          <span className="stat-label">경고:</span>
          <span className="stat-value" style={{ color: warning }}>
            {totalWarning}건
          </span>
        </span>
        <span className="stat-item">
          <span className="stat-label">주의:</span>
          <span className="stat-value" style={{ color: iafcBlue }}>
            {totalInfo}건
          </span>
        </span>
      </div>
    </div>
  );
}

export default AlarmTrendChart;
