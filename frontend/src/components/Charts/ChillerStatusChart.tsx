/**
 * ChillerStatusChart - 냉동기 가동 현황 도넛 차트
 * 열원사업소 6대 스크류냉동기 가동률 표시
 */
import type { ChartOptions, ChartData } from 'chart.js';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import './Charts.css';

// Chart.js 컴포넌트 등록
ChartJS.register(ArcElement, Tooltip, Legend);

export interface ChillerStatus {
  zone: string;
  running: number;
  total: number;
  capacity: number; // USRT
}

interface ChillerStatusChartProps {
  data?: ChillerStatus[];
  title?: string;
  className?: string;
}

// 기본 냉동기 데이터 (열원사업소 기준)
const defaultChillerData: ChillerStatus[] = [
  { zone: 'AICC', running: 2, total: 2, capacity: 164.48 },
  { zone: '관제탑', running: 1, total: 2, capacity: 80 },
  { zone: '공항청사', running: 2, total: 2, capacity: 120.38 },
];

export function ChillerStatusChart({
  data = defaultChillerData,
  title = '냉동기 가동 현황',
  className = '',
}: ChillerStatusChartProps) {
  // CSS 변수에서 색상 가져오기
  const iafcGreen = getComputedStyle(document.documentElement)
    .getPropertyValue('--iafc-green')
    .trim() || '#00AAB5';

  const iafcBlue = getComputedStyle(document.documentElement)
    .getPropertyValue('--iafc-blue')
    .trim() || '#5785C5';

  const txt2 = getComputedStyle(document.documentElement)
    .getPropertyValue('--txt2')
    .trim() || '#455060';

  const borderColor = getComputedStyle(document.documentElement)
    .getPropertyValue('--border')
    .trim() || '#E2E7EE';

  // 전체 가동률 계산
  const totalRunning = data.reduce((sum, d) => sum + d.running, 0);
  const totalChillers = data.reduce((sum, d) => sum + d.total, 0);
  const totalCapacity = data.reduce((sum, d) => sum + d.capacity, 0);
  const runningCapacity = data.reduce(
    (sum, d) => sum + (d.capacity / d.total) * d.running,
    0
  );
  const utilizationRate = (runningCapacity / totalCapacity) * 100;

  // 도넛 차트 데이터
  const chartData: ChartData<'doughnut'> = {
    labels: data.map((d) => d.zone),
    datasets: [
      {
        data: data.map((d) => (d.capacity / d.total) * d.running),
        backgroundColor: [iafcGreen, iafcBlue, '#F5A623'],
        borderColor: borderColor,
        borderWidth: 2,
        hoverOffset: 8,
      },
    ],
  };

  // 차트 옵션
  const options: ChartOptions<'doughnut'> = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '65%',
    plugins: {
      legend: {
        position: 'right' as const,
        labels: {
          color: txt2,
          font: {
            family: "'Noto Sans KR', sans-serif",
            size: 12,
          },
          usePointStyle: true,
          pointStyle: 'circle',
          padding: 16,
          generateLabels: (chart) => {
            const datasets = chart.data.datasets;
            return (chart.data.labels as string[]).map((label, i) => ({
              text: `${label} (${data[i].running}/${data[i].total}대)`,
              fillStyle: (datasets[0].backgroundColor as string[])[i],
              strokeStyle: borderColor,
              lineWidth: 2,
              hidden: false,
              index: i,
              fontColor: txt2,
            }));
          },
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
          label: (context) => {
            const index = context.dataIndex;
            const zone = data[index];
            return [
              `가동: ${zone.running}/${zone.total}대`,
              `용량: ${((zone.capacity / zone.total) * zone.running).toFixed(1)} USRT`,
            ];
          },
        },
      },
    },
  };

  return (
    <div className={`chart-container ${className}`}>
      {title && <h3 className="chart-title">{title}</h3>}
      <div className="chart-wrapper chiller-chart-wrapper">
        <div className="chiller-chart-center">
          <span className="chiller-utilization">{utilizationRate.toFixed(0)}%</span>
          <span className="chiller-label">가동률</span>
        </div>
        <Doughnut data={chartData} options={options} />
      </div>
      <div className="chart-stats">
        <span className="stat-item">
          <span className="stat-label">가동 중:</span>
          <span className="stat-value" style={{ color: iafcGreen }}>
            {totalRunning}/{totalChillers}대
          </span>
        </span>
        <span className="stat-item">
          <span className="stat-label">총 용량:</span>
          <span className="stat-value">
            {totalCapacity.toFixed(1)} USRT
          </span>
        </span>
        <span className="stat-item">
          <span className="stat-label">가동 용량:</span>
          <span className="stat-value" style={{ color: iafcBlue }}>
            {runningCapacity.toFixed(1)} USRT
          </span>
        </span>
      </div>
    </div>
  );
}

export default ChillerStatusChart;
