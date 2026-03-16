import React from 'react';
import type { CctvCamera } from './CctvCard';
import './DiagramDetailModal.css';

export interface DiagramDetailModalProps {
  camera: CctvCamera;
  diagram: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

/**
 * 도면 상세 보기 모달
 * 더블클릭 시 전체 화면으로 도면과 장비 정보를 표시
 */
export const DiagramDetailModal: React.FC<DiagramDetailModalProps> = ({
  camera,
  diagram,
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const { id, name, location, zone, type, status, aiStatus, value, category } = camera;

  // 상태에 따른 색상
  const getStatusColor = () => {
    switch (status) {
      case 'danger': return '#DC2626';
      case 'warning': return '#D97706';
      default: return '#10B981';
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'danger': return '긴급';
      case 'warning': return '경고';
      default: return '정상';
    }
  };

  const getCategoryText = () => {
    switch (category) {
      case 'chiller': return '스크류냉동기';
      case 'coolingTower': return '냉각탑';
      case 'fan': return '팬류/공조기';
      default: return '기타';
    }
  };

  // ESC 키로 닫기
  React.useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  // 배경 클릭으로 닫기
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div className="diagram-modal-backdrop" onClick={handleBackdropClick}>
      <div className="diagram-modal">
        {/* 헤더 */}
        <div className="diagram-modal-header">
          <div className="diagram-modal-title">
            <span className="diagram-modal-id">{id}</span>
            <h2>{name}</h2>
            <span className="diagram-modal-location">{zone} · {location}</span>
          </div>
          <button className="diagram-modal-close" onClick={onClose}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        {/* 메인 컨텐츠 */}
        <div className="diagram-modal-content">
          {/* 도면 영역 */}
          <div className="diagram-modal-diagram">
            <div className="diagram-wrapper">
              {diagram}
            </div>
          </div>

          {/* 정보 패널 */}
          <div className="diagram-modal-info">
            <h3>장비 정보</h3>

            <div className="info-grid">
              <div className="info-item">
                <span className="info-label">장비 유형</span>
                <span className="info-value">{getCategoryText()}</span>
              </div>
              <div className="info-item">
                <span className="info-label">카메라 유형</span>
                <span className="info-value">{type === 'fixed' ? '고정형' : 'PTZ'}</span>
              </div>
              <div className="info-item">
                <span className="info-label">설치 위치</span>
                <span className="info-value">{zone} {location}</span>
              </div>
              <div className="info-item">
                <span className="info-label">운전 상태</span>
                <span className="info-value" style={{ color: getStatusColor() }}>
                  {getStatusText()}
                </span>
              </div>
              {value && (
                <div className="info-item">
                  <span className="info-label">현재 값</span>
                  <span className="info-value highlight">{value}</span>
                </div>
              )}
              <div className="info-item">
                <span className="info-label">AI 상태</span>
                <span className="info-value">
                  {aiStatus === 'n' ? '정상 감시중' : '이상 감지'}
                </span>
              </div>
            </div>

            {/* 장비별 추가 정보 */}
            <div className="equipment-details">
              <h4>장비 상세</h4>
              {category === 'chiller' && (
                <div className="detail-list">
                  <div className="detail-row">
                    <span>냉매 종류</span>
                    <span>R-134a</span>
                  </div>
                  <div className="detail-row">
                    <span>정격 용량</span>
                    <span>{value || '82.24 USRT'}</span>
                  </div>
                  <div className="detail-row">
                    <span>압축기 타입</span>
                    <span>스크류식</span>
                  </div>
                  <div className="detail-row">
                    <span>냉수 출구 온도</span>
                    <span>7°C</span>
                  </div>
                  <div className="detail-row">
                    <span>냉각수 입구 온도</span>
                    <span>32°C</span>
                  </div>
                </div>
              )}
              {category === 'coolingTower' && (
                <div className="detail-list">
                  <div className="detail-row">
                    <span>타입</span>
                    <span>밀폐형 냉각탑</span>
                  </div>
                  <div className="detail-row">
                    <span>냉각 용량</span>
                    <span>500 RT</span>
                  </div>
                  <div className="detail-row">
                    <span>입수 온도</span>
                    <span>38°C</span>
                  </div>
                  <div className="detail-row">
                    <span>출수 온도</span>
                    <span>{value || '32°C'}</span>
                  </div>
                  <div className="detail-row">
                    <span>팬 RPM</span>
                    <span>720 RPM</span>
                  </div>
                </div>
              )}
              {category === 'fan' && (
                <div className="detail-list">
                  <div className="detail-row">
                    <span>타입</span>
                    <span>AHU (공기조화기)</span>
                  </div>
                  <div className="detail-row">
                    <span>풍량</span>
                    <span>2,400 CMH</span>
                  </div>
                  <div className="detail-row">
                    <span>급기 온도</span>
                    <span>12°C</span>
                  </div>
                  <div className="detail-row">
                    <span>환기 온도</span>
                    <span>26°C</span>
                  </div>
                  <div className="detail-row">
                    <span>필터 상태</span>
                    <span>정상 (교체 D-45)</span>
                  </div>
                </div>
              )}
            </div>

            {/* AI 분석 결과 */}
            <div className="ai-analysis">
              <h4>AI 분석 결과</h4>
              <div className={`analysis-status ${status}`}>
                <div className="analysis-icon">
                  {status === 'normal' ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                      <polyline points="22 4 12 14.01 9 11.01"/>
                    </svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"/>
                      <line x1="12" y1="8" x2="12" y2="12"/>
                      <line x1="12" y1="16" x2="12.01" y2="16"/>
                    </svg>
                  )}
                </div>
                <div className="analysis-text">
                  {status === 'normal' && '모든 지표가 정상 범위 내에서 운전 중입니다.'}
                  {status === 'warning' && '일부 지표가 임계값에 근접하고 있습니다. 모니터링이 필요합니다.'}
                  {status === 'danger' && '이상 상태가 감지되었습니다. 즉각적인 점검이 필요합니다.'}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 푸터 */}
        <div className="diagram-modal-footer">
          <span className="footer-hint">ESC 또는 배경 클릭으로 닫기</span>
          <button className="btn-secondary" onClick={onClose}>닫기</button>
        </div>
      </div>
    </div>
  );
};

export default DiagramDetailModal;
