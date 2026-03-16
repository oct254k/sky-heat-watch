import React, { useState, useCallback, useRef, useEffect } from 'react';
import './AdminSettingsPanel.css';
import defaultConfig from '../../config/cameraConfig.json';

// CCTV 카메라 설정 데이터 타입
interface CameraConfig {
  id: string;
  name: string;
  building: string;
  equipment: string;
  customImage?: string | null;
  rois: ROI[];
  thresholds?: {
    tempWarning: number;
    tempDanger: number;
    vibrationWarning: number;
    vibrationDanger: number;
  };
}

// ROI (관심영역) 타입
interface ROI {
  id: string;
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
}

// 설정 파일 전체 타입
interface ConfigData {
  cameras: CameraConfig[];
  globalSettings: {
    aiDetectionEnabled: boolean;
    alertSoundEnabled: boolean;
    autoSaveInterval: number;
  };
  lastUpdated: string | null;
}

// LocalStorage 키
const STORAGE_KEY = 'heatSourceCameraConfig';

// 저장된 설정 불러오기
const loadSavedConfig = (): CameraConfig[] => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved) as ConfigData;
      return parsed.cameras;
    }
  } catch (e) {
    console.warn('설정 불러오기 실패:', e);
  }
  return defaultConfig.cameras as CameraConfig[];
};

// 탭 타입
type SettingsTab = 'cameras' | 'rois' | 'thresholds';

export interface AdminSettingsPanelProps {
  onClose?: () => void;
}

/**
 * AdminSettingsPanel - 관리자 설정 패널
 *
 * CCTV 카메라 도면/이미지 업로드 및 ROI 설정을 위한 관리자 전용 패널입니다.
 * 상단 헤더의 관리자 버튼을 더블클릭하면 활성화됩니다.
 */
export const AdminSettingsPanel: React.FC<AdminSettingsPanelProps> = ({
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<SettingsTab>('cameras');
  const [selectedCamera, setSelectedCamera] = useState<string>('CAM-01');
  const [cameras, setCameras] = useState<CameraConfig[]>(loadSavedConfig);
  const [isDrawingROI, setIsDrawingROI] = useState(false);
  const [newROI, setNewROI] = useState<Partial<ROI> | null>(null);
  const [isSaved, setIsSaved] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const configInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  // 현재 선택된 카메라 데이터
  const currentCamera = cameras.find(c => c.id === selectedCamera) || cameras[0];

  // Base64 이미지 입력 모달 상태
  const [showBase64Modal, setShowBase64Modal] = useState(false);
  const [base64Input, setBase64Input] = useState('');

  // 변경 감지
  useEffect(() => {
    setIsSaved(false);
  }, [cameras]);

  // LocalStorage에 저장
  const handleSave = useCallback(() => {
    const configData: ConfigData = {
      cameras,
      globalSettings: defaultConfig.globalSettings,
      lastUpdated: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(configData));
    setIsSaved(true);
    // 다른 컴포넌트에 설정 변경 알림
    window.dispatchEvent(new Event('cameraConfigUpdated'));
    alert('설정이 저장되었습니다.');
  }, [cameras]);

  // JSON 파일로 내보내기
  const handleExport = useCallback(() => {
    const configData: ConfigData = {
      cameras,
      globalSettings: defaultConfig.globalSettings,
      lastUpdated: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(configData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `camera_config_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }, [cameras]);

  // JSON 파일 불러오기
  const handleImport = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target?.result as string) as ConfigData;
        if (data.cameras && Array.isArray(data.cameras)) {
          setCameras(data.cameras);
          alert('설정을 불러왔습니다.');
        } else {
          alert('잘못된 설정 파일 형식입니다.');
        }
      } catch {
        alert('JSON 파일 파싱 오류');
      }
    };
    reader.readAsText(file);
    // Reset input
    e.target.value = '';
  }, []);

  // 파일 업로드 핸들러
  const handleFileUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const imageData = event.target?.result as string;
      setCameras(prev => prev.map(c =>
        c.id === selectedCamera ? { ...c, customImage: imageData } : c
      ));
    };
    reader.readAsDataURL(file);
  }, [selectedCamera]);

  // Base64 이미지 적용 핸들러
  const handleBase64Apply = useCallback(() => {
    let imageData = base64Input.trim();

    // data:image 접두사가 없으면 추가
    if (imageData && !imageData.startsWith('data:image')) {
      imageData = `data:image/jpeg;base64,${imageData}`;
    }

    if (imageData) {
      setCameras(prev => prev.map(c =>
        c.id === selectedCamera ? { ...c, customImage: imageData } : c
      ));
      setBase64Input('');
      setShowBase64Modal(false);
    }
  }, [base64Input, selectedCamera]);

  // 클립보드에서 이미지 붙여넣기 핸들러
  const handlePaste = useCallback((e: React.ClipboardEvent) => {
    const items = e.clipboardData?.items;
    if (!items) return;

    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf('image') !== -1) {
        const file = items[i].getAsFile();
        if (file) {
          const reader = new FileReader();
          reader.onload = (event) => {
            const imageData = event.target?.result as string;
            setCameras(prev => prev.map(c =>
              c.id === selectedCamera ? { ...c, customImage: imageData } : c
            ));
          };
          reader.readAsDataURL(file);
          e.preventDefault();
          break;
        }
      }
    }
  }, [selectedCamera]);

  // ROI 그리기 시작
  const handleCanvasMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDrawingROI) return;

    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setNewROI({
      id: `roi-${Date.now()}`,
      name: `관심영역 ${currentCamera.rois.length + 1}`,
      x,
      y,
      width: 0,
      height: 0,
      color: '#00AAB5',
    });
  }, [isDrawingROI, currentCamera.rois.length]);

  // ROI 그리기 중
  const handleCanvasMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!newROI || !canvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const currentX = ((e.clientX - rect.left) / rect.width) * 100;
    const currentY = ((e.clientY - rect.top) / rect.height) * 100;

    setNewROI(prev => prev ? {
      ...prev,
      width: currentX - (prev.x || 0),
      height: currentY - (prev.y || 0),
    } : null);
  }, [newROI]);

  // ROI 그리기 완료
  const handleCanvasMouseUp = useCallback(() => {
    if (!newROI || !newROI.width || !newROI.height) {
      setNewROI(null);
      return;
    }

    // 최소 크기 체크
    if (Math.abs(newROI.width) < 5 || Math.abs(newROI.height) < 5) {
      setNewROI(null);
      return;
    }

    const roi: ROI = {
      id: newROI.id || `roi-${Date.now()}`,
      name: newROI.name || '관심영역',
      x: Math.min(newROI.x || 0, (newROI.x || 0) + (newROI.width || 0)),
      y: Math.min(newROI.y || 0, (newROI.y || 0) + (newROI.height || 0)),
      width: Math.abs(newROI.width || 0),
      height: Math.abs(newROI.height || 0),
      color: newROI.color || '#00AAB5',
    };

    setCameras(prev => prev.map(c =>
      c.id === selectedCamera ? { ...c, rois: [...c.rois, roi] } : c
    ));

    setNewROI(null);
    setIsDrawingROI(false);
  }, [newROI, selectedCamera]);

  // ROI 삭제
  const handleDeleteROI = useCallback((roiId: string) => {
    setCameras(prev => prev.map(c =>
      c.id === selectedCamera
        ? { ...c, rois: c.rois.filter(r => r.id !== roiId) }
        : c
    ));
  }, [selectedCamera]);

  // 이미지 삭제
  const handleDeleteImage = useCallback(() => {
    setCameras(prev => prev.map(c =>
      c.id === selectedCamera ? { ...c, customImage: undefined } : c
    ));
  }, [selectedCamera]);

  return (
    <div className="admin-panel">
      <div className="admin-panel-header">
        <div className="admin-panel-title">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
          </svg>
          <h3>관리자 설정</h3>
          <span className="admin-mode-badge">Admin Mode</span>
        </div>
        <div className="admin-header-actions">
          {/* JSON 파일 불러오기 */}
          <input
            ref={configInputRef}
            type="file"
            accept=".json"
            onChange={handleImport}
            style={{ display: 'none' }}
          />
          <button className="btn btn-secondary btn-sm" onClick={() => configInputRef.current?.click()}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
            불러오기
          </button>
          <button className="btn btn-secondary btn-sm" onClick={handleExport}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            내보내기
          </button>
          <button className={`btn btn-sm ${isSaved ? 'btn-secondary' : 'btn-primary'}`} onClick={handleSave}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
              <polyline points="17 21 17 13 7 13 7 21" />
              <polyline points="7 3 7 8 15 8" />
            </svg>
            {isSaved ? '저장됨' : '저장'}
          </button>
          {onClose && (
            <button className="admin-panel-close" onClick={onClose}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* 탭 네비게이션 */}
      <div className="admin-tabs">
        <button
          className={`admin-tab ${activeTab === 'cameras' ? 'active' : ''}`}
          onClick={() => setActiveTab('cameras')}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M23 7l-7 5 7 5V7z" />
            <rect x="1" y="5" width="15" height="14" rx="2" />
          </svg>
          CCTV 설정
        </button>
        <button
          className={`admin-tab ${activeTab === 'rois' ? 'active' : ''}`}
          onClick={() => setActiveTab('rois')}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <rect x="7" y="7" width="10" height="10" />
          </svg>
          관심영역(ROI)
        </button>
        <button
          className={`admin-tab ${activeTab === 'thresholds' ? 'active' : ''}`}
          onClick={() => setActiveTab('thresholds')}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 20V10M6 20V4M18 20v-4" />
          </svg>
          임계값
        </button>
      </div>

      <div className="admin-content">
        {/* 카메라 선택 사이드바 */}
        <div className="admin-sidebar">
          <h4>카메라 목록</h4>
          <div className="camera-list">
            {cameras.map(camera => (
              <div
                key={camera.id}
                className={`camera-item ${selectedCamera === camera.id ? 'active' : ''}`}
                onClick={() => setSelectedCamera(camera.id)}
              >
                <div className="camera-item-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M23 7l-7 5 7 5V7z" />
                    <rect x="1" y="5" width="15" height="14" rx="2" />
                  </svg>
                  {camera.customImage && <span className="has-image-dot" />}
                </div>
                <div className="camera-item-info">
                  <span className="camera-item-name">{camera.name}</span>
                  <span className="camera-item-building">{camera.building}</span>
                </div>
                {camera.rois.length > 0 && (
                  <span className="roi-count">{camera.rois.length}</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 메인 설정 영역 */}
        <div className="admin-main">
          {activeTab === 'cameras' && (
            <div className="camera-settings">
              <div className="settings-header">
                <h4>{currentCamera.name}</h4>
                <span className="equipment-tag">{currentCamera.equipment}</span>
              </div>

              <div className="image-upload-area" onPaste={handlePaste} tabIndex={0}>
                <div
                  className="image-preview"
                  ref={canvasRef}
                  onMouseDown={handleCanvasMouseDown}
                  onMouseMove={handleCanvasMouseMove}
                  onMouseUp={handleCanvasMouseUp}
                  onMouseLeave={handleCanvasMouseUp}
                  style={{ cursor: isDrawingROI ? 'crosshair' : 'default' }}
                >
                  {currentCamera.customImage ? (
                    <img src={currentCamera.customImage} alt={currentCamera.name} />
                  ) : (
                    <div className="no-image">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="3" width="18" height="18" rx="2" />
                        <circle cx="8.5" cy="8.5" r="1.5" />
                        <path d="M21 15l-5-5L5 21" />
                      </svg>
                      <span>장비 도면 또는 이미지를 업로드하세요</span>
                    </div>
                  )}

                  {/* ROI 오버레이 */}
                  {currentCamera.rois.map(roi => (
                    <div
                      key={roi.id}
                      className="roi-box"
                      style={{
                        left: `${roi.x}%`,
                        top: `${roi.y}%`,
                        width: `${roi.width}%`,
                        height: `${roi.height}%`,
                        borderColor: roi.color,
                      }}
                    >
                      <span className="roi-label">{roi.name}</span>
                    </div>
                  ))}

                  {/* 그리는 중인 ROI */}
                  {newROI && (
                    <div
                      className="roi-box drawing"
                      style={{
                        left: `${Math.min(newROI.x || 0, (newROI.x || 0) + (newROI.width || 0))}%`,
                        top: `${Math.min(newROI.y || 0, (newROI.y || 0) + (newROI.height || 0))}%`,
                        width: `${Math.abs(newROI.width || 0)}%`,
                        height: `${Math.abs(newROI.height || 0)}%`,
                      }}
                    />
                  )}
                </div>

                <div className="image-actions">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    style={{ display: 'none' }}
                  />
                  <button
                    className="btn btn-primary"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="17 8 12 3 7 8" />
                      <line x1="12" y1="3" x2="12" y2="15" />
                    </svg>
                    파일 업로드
                  </button>
                  <button
                    className="btn btn-secondary"
                    onClick={() => setShowBase64Modal(true)}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="9" y="9" width="13" height="13" rx="2" />
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                    </svg>
                    Base64 붙여넣기
                  </button>
                  {currentCamera.customImage && (
                    <button
                      className="btn btn-danger"
                      onClick={handleDeleteImage}
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="3 6 5 6 21 6" />
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                      </svg>
                      삭제
                    </button>
                  )}
                  <button
                    className={`btn ${isDrawingROI ? 'btn-active' : 'btn-secondary'}`}
                    onClick={() => setIsDrawingROI(!isDrawingROI)}
                    disabled={!currentCamera.customImage}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="3" width="18" height="18" rx="2" />
                      <rect x="7" y="7" width="10" height="10" />
                    </svg>
                    {isDrawingROI ? 'ROI 그리기 중...' : 'ROI 추가'}
                  </button>
                </div>

                {/* Base64 입력 모달 */}
                {showBase64Modal && (
                  <div className="base64-modal-overlay" onClick={() => setShowBase64Modal(false)}>
                    <div className="base64-modal" onClick={e => e.stopPropagation()}>
                      <div className="base64-modal-header">
                        <h4>Base64 이미지 붙여넣기</h4>
                        <button className="modal-close" onClick={() => setShowBase64Modal(false)}>
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                          </svg>
                        </button>
                      </div>
                      <div className="base64-modal-body">
                        <p className="base64-hint">
                          <code>data:image/jpeg;base64,...</code> 형식의 이미지 데이터를 붙여넣으세요.
                          <br />또는 Base64 문자열만 붙여넣어도 됩니다.
                        </p>
                        <textarea
                          className="base64-textarea"
                          placeholder="Base64 이미지 데이터를 여기에 붙여넣으세요..."
                          value={base64Input}
                          onChange={e => setBase64Input(e.target.value)}
                          rows={6}
                        />
                      </div>
                      <div className="base64-modal-footer">
                        <button className="btn btn-secondary" onClick={() => setShowBase64Modal(false)}>
                          취소
                        </button>
                        <button
                          className="btn btn-primary"
                          onClick={handleBase64Apply}
                          disabled={!base64Input.trim()}
                        >
                          적용
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'rois' && (
            <div className="roi-settings">
              <div className="settings-header">
                <h4>관심영역 목록 - {currentCamera.name}</h4>
              </div>

              {currentCamera.rois.length === 0 ? (
                <div className="empty-state">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <rect x="7" y="7" width="10" height="10" />
                  </svg>
                  <span>등록된 관심영역이 없습니다</span>
                  <p>CCTV 설정 탭에서 이미지를 업로드하고 ROI를 추가하세요</p>
                </div>
              ) : (
                <div className="roi-list">
                  {currentCamera.rois.map(roi => (
                    <div key={roi.id} className="roi-item">
                      <div
                        className="roi-color"
                        style={{ background: roi.color }}
                      />
                      <div className="roi-info">
                        <span className="roi-name">{roi.name}</span>
                        <span className="roi-coords">
                          {Math.round(roi.x)}%, {Math.round(roi.y)}% /
                          {Math.round(roi.width)}x{Math.round(roi.height)}
                        </span>
                      </div>
                      <button
                        className="btn-icon btn-danger"
                        onClick={() => handleDeleteROI(roi.id)}
                      >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="3 6 5 6 21 6" />
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'thresholds' && (
            <div className="threshold-settings">
              <div className="settings-header">
                <h4>AI 판단 임계값 설정</h4>
              </div>
              <div className="threshold-list">
                <div className="threshold-item">
                  <label>진동 경고 임계값</label>
                  <div className="threshold-input">
                    <input type="number" defaultValue="3.0" step="0.1" />
                    <span>mm/s</span>
                  </div>
                </div>
                <div className="threshold-item">
                  <label>진동 위험 임계값</label>
                  <div className="threshold-input">
                    <input type="number" defaultValue="5.0" step="0.1" />
                    <span>mm/s</span>
                  </div>
                </div>
                <div className="threshold-item">
                  <label>온도 상한 경고</label>
                  <div className="threshold-input">
                    <input type="number" defaultValue="80" step="1" />
                    <span>°C</span>
                  </div>
                </div>
                <div className="threshold-item">
                  <label>온도 상한 위험</label>
                  <div className="threshold-input">
                    <input type="number" defaultValue="90" step="1" />
                    <span>°C</span>
                  </div>
                </div>
              </div>
              <div className="threshold-actions">
                <button className="btn btn-primary">저장</button>
                <button className="btn btn-secondary">기본값 복원</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminSettingsPanel;
