import { useCallback, useEffect, useState } from "react";
import normalIcon from "../assets/images/normal.png";
import silverIcon from "../assets/images/silver.png";
import goldIcon from "../assets/images/gold.png";
import diamondIcon from "../assets/images/diamond.png";
import royalBlackIcon from "../assets/images/royalBlack.png";

const vipLevels = {
  normal: { self: 20, gift: 16, maintain: 0 },
  silver: { self: 20, gift: 16, maintain: 0 },
  gold: { self: 30, gift: 24, maintain: 225000 },
  diamond: { self: 40, gift: 32, maintain: 1000000 },
  royalBlack: { self: 50, gift: 40, maintain: 5000000 },
};
const maplePointsToVIP = 300;
const wPet = 0.02;
const petRandomBox = 499;
const petCoinForHammer = 3;

export default function PlatinumHammer() {

  const [calculationResults, setCalculationResults] = useState({
    cost: 0,
    coinCost: 0,
    boxCost: 0,
    pointToCash: 92,
    maplePointsTomapleCoins: 8,
    wPetPrice: 1000,
    wPetCount: 0,
    coinWhiteHammerPrice: 0,
    maplePointsWhiteHammerPrice: 0,
    whiteHammerCount: 0,
    maplePointswPetCount: 0,
    maplePointsHammerCount: 0,
    vipPointsEquivalentMapleCoins: 0,
    coinValue: 16000000
  });
  const [currentVipLevel, setCurrentVipLevel] = useState('royalBlack');
  const [vipMethodPoints, setVipMethodPoints] = useState(50);
  const [pointToCash, setPointToCash] = useState(92);
  const [maplePointsTomapleCoins, setMaplePointsTomapleCoins] = useState(8);
  const [petRandomBoxCount, setPetRandomBoxCount] = useState(180);
  const [wPetPrice, setWPetPrice] = useState(1000);
  const [whiteHammerPriceMethod, setWhiteHammerPriceMethod] = useState('auto');
  const [whiteHammerPrice, setWhiteHammerPrice] = useState(60);
  const [coinValue, setCoinValue] = useState(16000000);

  // 表單驗證狀態
  const [errors, setErrors] = useState({
    vipMaintainPoints: "",
    pointToCash: "",
    maplePointsTomapleCoins: "",
    coinValue: ""
  });
  // 表單是否有效狀態
  const [isFormValid, setIsFormValid] = useState(true);

  // 當VIP等級變化時，更新相關狀態
  useEffect(() => {
    setVipMethodPoints(vipLevels[currentVipLevel].self);
  }, [currentVipLevel]);

  // 驗證表單
  const validateForm = useCallback(() => {
    const newErrors = {
      vipMaintainPoints: "",
      pointToCash: "",
      giftDiscount: "",
      maplePointsTomapleCoins: "",
      coinValue: ""
    };

    let valid = true;

    // 驗證點數折數
    if (pointToCash === "" || pointToCash < 0 || pointToCash > 100) {
      newErrors.pointToCash = "範圍僅1~100";
      valid = false;
    }

    // 驗證楓幣商城匯率
    if (maplePointsTomapleCoins === "" || maplePointsTomapleCoins <= 0) {
      newErrors.maplePointsTomapleCoins = "不能低於0";
      valid = false;
    }

    setErrors(newErrors);
    setIsFormValid(valid);

    return valid;
  }, [pointToCash, maplePointsTomapleCoins]);

  // 處理VIP等級按鈕點擊
  const handleVipLevelChange = (level) => {
    setCurrentVipLevel(level);
  };

  // 通用function：處理此畫面的input輸入
  const handleNumericInput = (e, setter, min = 0, max = Infinity) => {
    const value = e.target.value;

    // 空值直接設為空字串
    if (value === "") {
      setter("");
      return;
    }

    const numValue = Number(value);

    // 檢查有沒有在有效範圍內，如果在範圍內就設置狀態
    if (!isNaN(numValue) && numValue >= min && numValue <= max) {
      setter(numValue);
    }
  };

  // 計算結果
  const calculateResults = useCallback(() => {
    if (!isFormValid) return;

    const draws = petRandomBoxCount * 10;
    const originalPointCost = 49.9 * draws;
    const cost = originalPointCost * pointToCash * 0.01;
    const vipPoints = originalPointCost * vipMethodPoints;

    const mapleCoinMallExchangeRate = 100000000 / maplePointsTomapleCoins;  // 每1楓點=xxxx萬楓幣
    const vipPointsEquivalentMaplePoints = vipPoints / maplePointsToVIP;  // VIP點數換楓點
    const vipPointsEquivalentMapleCoins = vipPointsEquivalentMaplePoints * mapleCoinMallExchangeRate; // VIP點數換楓幣

    const incomeByMapleCoins = vipPointsEquivalentMapleCoins / coinValue;

    const wPetCount = draws * wPet;
    const normalPetCount = draws * 0.98; // 98%是普通寵物
    const whiteHammerCount = normalPetCount / petCoinForHammer;

    const wPetCost = wPetCount * wPetPrice;

    const maplePointsDraws = (vipPointsEquivalentMaplePoints / petRandomBox) * 10;
    const maplePointswPetCount = maplePointsDraws * wPet;
    const maplePointsNormalPetCount = maplePointsDraws * 0.98; // 98%是普通寵物
    const maplePointsHammerCount = maplePointsNormalPetCount / petCoinForHammer;

    let coinWhiteHammerPrice;
    let maplePointsWhiteHammerPrice;
    let coinCost;
    let boxCost;
    if (whiteHammerPriceMethod === 'auto') {
      // 自動計算白鎚價格
      coinWhiteHammerPrice = (cost - wPetCost - incomeByMapleCoins) / whiteHammerCount;
      maplePointsWhiteHammerPrice = (cost - ((wPetCount + maplePointswPetCount) * wPetPrice)) / (whiteHammerCount + maplePointsHammerCount);
      coinCost = cost - wPetCost - (whiteHammerCount * coinWhiteHammerPrice) - incomeByMapleCoins;
      boxCost = cost - ((wPetCount + maplePointswPetCount) * wPetPrice) - ((whiteHammerCount + maplePointsHammerCount) * maplePointsWhiteHammerPrice);
    } else {
      // 手動輸入白鎚價格
      coinWhiteHammerPrice = whiteHammerPrice;
      maplePointsWhiteHammerPrice = whiteHammerPrice;
      const hammerCost = whiteHammerCount * whiteHammerPrice;
      coinCost = wPetCost + hammerCost + incomeByMapleCoins - cost;
      boxCost = ((wPetCount + maplePointswPetCount) * wPetPrice) + hammerCost + (maplePointsHammerCount * whiteHammerPrice) - cost;
    }


    // 更新計算結果
    setCalculationResults({
      cost,
      coinCost,
      boxCost,
      pointToCash,
      wPetPrice,
      wPetCount,
      coinWhiteHammerPrice,
      maplePointsWhiteHammerPrice,
      whiteHammerCount,
      maplePointswPetCount,
      maplePointsHammerCount,
      vipPointsEquivalentMapleCoins,
      coinValue
    });
  }, [pointToCash, maplePointsTomapleCoins, vipMethodPoints, isFormValid, coinValue, petRandomBoxCount, wPetPrice, whiteHammerPrice, whiteHammerPriceMethod]);

  // 即時表單驗證
  useEffect(() => {
    validateForm();
  }, [pointToCash, maplePointsTomapleCoins, validateForm]);

  // 即時計算結果
  useEffect(() => {
    if (isFormValid) {
      calculateResults();
    }
  }, [pointToCash, maplePointsTomapleCoins, vipMethodPoints, isFormValid, calculateResults]);

  // 格式化數字為台灣地區格式
  const formatNumber = (num) => {
    return num.toLocaleString('zh-TW', { maximumFractionDigits: 2 });
  };

  // 結果卡片的樣式類別
  const getResultClass = (cost) => {
    if (cost > 0) {
      return 'profit';
    } else if (cost < 0) {
      return 'loss';
    }
    return 'break-even';
  };

  const renderVipLevelButtons = () => {
    const levels = [
      { key: 'normal', name: '非VIP', className: 'btn-outline-primary', icon: normalIcon },
      { key: 'silver', name: '銀', className: 'btn-outline-secondary', icon: silverIcon },
      { key: 'gold', name: '金', className: 'btn-outline-warning', icon: goldIcon },
      { key: 'diamond', name: '鑽石', className: 'btn-outline-info', icon: diamondIcon },
      { key: 'royalBlack', name: '皇家黑', className: 'btn-outline-dark', icon: royalBlackIcon }
    ];

    return levels.map(level => (
      <button
        key={level.key}
        type="button"
        data-level={level.key}
        className={`btn btn-sm ${level.className} me-2 mb-2 ${currentVipLevel === level.key ? 'active' : ''}`}
        onClick={() => handleVipLevelChange(level.key)}
      >
        <img src={level.icon} alt={`${level.name}圖標`} className="level-icon" /> {level.name}
      </button>
    ));
  };

  return (
    <>
      <div className="container mb-4">
        <div className="row g-4">
          <div className="col-lg-6">
            <div className="card">
              <div className="card-header">
                <h2 className="h4 mb-0 fw-bold">寵箱換鎚</h2>
              </div>
              <div className="card-body">
                <div id="calculatorForm">
                  <div className="row mb-3">
                    <label className="col-lg-3 col-form-label">VIP階級</label>
                    <div id="vipLevel" className="col-lg-9 d-flex flex-wrap align-items-center">
                      {renderVipLevelButtons()}
                    </div>
                  </div>

                  <div className="row mb-3">
                    <label htmlFor="pointToCash" className="col-lg-3 col-form-label">
                      點數折數 <span className="text-danger">*</span>
                    </label>
                    <div className="col-lg-9">
                      <div className="input-group">
                        <input
                          type="number"
                          className={`form-control ${errors.pointToCash ? 'is-invalid' : ''}`}
                          id="pointToCash"
                          value={pointToCash}
                          onChange={(e) => handleNumericInput(e, setPointToCash, 1, 100)}
                        />
                        <span className="input-group-text">%</span>
                      </div>
                      {errors.pointToCash ? (
                        <div className="invalid-feedback d-block">{errors.pointToCash}</div>
                      ) : (
                        <div className="form-text">點數折扣百分比</div>
                      )}
                    </div>
                  </div>

                  <div className="row mb-3">
                    <label htmlFor="maplePointsTomapleCoins" className="col-lg-3 col-form-label">
                      楓幣商城匯率 <span className="text-danger">*</span>
                    </label>
                    <div className="col-lg-9">
                      <input
                        type="number"
                        className={`form-control ${errors.maplePointsTomapleCoins ? 'is-invalid' : ''}`}
                        id="maplePointsTomapleCoins"
                        value={maplePointsTomapleCoins}
                        onChange={(e) => handleNumericInput(e, setMaplePointsTomapleCoins, 1)}
                      />
                      {errors.maplePointsTomapleCoins ? (
                        <div className="invalid-feedback">{errors.maplePointsTomapleCoins}</div>
                      ) : (
                        <div className="form-text">楓點兌換楓幣比例</div>
                      )}
                    </div>
                  </div>

                  <div className="row mb-3">
                    <label htmlFor="petRandomBoxCount" className="col-lg-3 col-form-label">
                      寵物隨機箱數量
                    </label>
                    <div className="col-lg-9">
                      <input
                        type="number"
                        className="form-control"
                        id="petRandomBoxCount"
                        value={petRandomBoxCount}
                        onChange={(e) => handleNumericInput(e, setPetRandomBoxCount, 1, 1000)}
                      />
                      <div className="form-text">499/10箱</div>
                    </div>
                  </div>

                  <div className="row mb-3">
                    <label htmlFor="wPetPrice" className="col-lg-3 col-form-label">
                      W寵價格
                    </label>
                    <div className="col-lg-9">
                      <input
                        type="number"
                        className="form-control"
                        id="wPetPrice"
                        value={wPetPrice}
                        onChange={(e) => handleNumericInput(e, setWPetPrice, 0)}
                      />
                      <div className="form-text">W寵價格</div>
                    </div>
                  </div>

                  <div className="row mb-3">
                    <label htmlFor="coinValue" className="col-lg-3 col-form-label">
                      幣值
                    </label>
                    <div className="col-lg-9">
                      <input
                        type="number"
                        className={`form-control ${errors.coinValue ? 'is-invalid' : ''}`}
                        id="coinValue"
                        value={coinValue}
                        onChange={(e) => handleNumericInput(e, setCoinValue, 0)}
                      />
                      {errors.coinValue ? (
                        <div className="invalid-feedback">{errors.coinValue}</div>
                      ) : (
                        <div className="form-text">賣幣的幣值</div>
                      )}
                    </div>
                  </div>

                  <div className="row mb-3">
                    <label className="col-lg-3 col-form-label">白鎚價格</label>
                    <div className="col-lg-9 my-2">
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="whiteHammerPriceMethod"
                          id="coinValueAuto"
                          value="auto"
                          onChange={() => setWhiteHammerPriceMethod('auto')}
                          checked={whiteHammerPriceMethod === 'auto'}
                        />
                        <label className="form-check-label" htmlFor="coinValueAuto">自動計算</label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="whiteHammerPriceMethod"
                          id="coinValueManual"
                          value="manual"
                          onChange={() => setWhiteHammerPriceMethod('manual')}
                          checked={whiteHammerPriceMethod === 'manual'}
                        />
                        <label className="form-check-label" htmlFor="coinValueManual">手動輸入</label>
                      </div>
                      {whiteHammerPriceMethod === "manual" && (
                        <div className="mt-2">
                          <input
                            type="number"
                            className={`form-control ${errors.coinValue ? 'is-invalid' : ''}`}
                            id="whiteHammerPrice"
                            value={whiteHammerPrice}
                            onChange={(e) => handleNumericInput(e, setWhiteHammerPrice, 0)}
                          />
                          {errors.coinValue ? (
                            <div className="invalid-feedback">{errors.coinValue}</div>
                          ) : (
                            <div className="form-text">白鎚價格</div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div id="results" className="card">
              <div className="card-header">
                <h4 className="h4 mb-0 fw-bold">計算結果</h4>
              </div>
              <div className="card-body">
                {!isFormValid ? (
                  <div className="p-4 rounded mb-4 text-center break-even">
                    <div className="fw-bold fs-4 text-warning">
                      請檢查輸入的數值
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="row">
                      <div className="col-6 mb-3">
                        <h5 className="h5 fw-bold">VIP換幣</h5>
                        <div id="finalResult" className={`p-4 rounded mb-4 text-center ${getResultClass(formatNumber(calculationResults.coinCost))}`}>
                          <div className="mb-2 fw-bold">點數 {pointToCash}折 | 楓幣商城匯率 {maplePointsTomapleCoins}</div>
                          <div className={`fw-bold fs-4 ${formatNumber(calculationResults.coinCost) > 0 ? 'text-success' :
                            formatNumber(calculationResults.coinCost) < 0 ? 'text-danger' : 'text-warning'}`
                          }>
                            總{formatNumber(calculationResults.coinCost) > 0 ? '盈利' : formatNumber(calculationResults.coinCost) < 0 ? '虧損' : '盈虧'}:
                            {formatNumber(calculationResults.coinCost)}
                          </div>
                          <div className="mt-1 text-muted" style={{ fontSize: '0.9em' }}>
                            (幣值 {formatNumber(coinValue)} 計算)
                          </div>
                        </div>

                        <div className="calculation-steps">
                          <div className="calc-row border-bottom p-2">
                            <div className="d-flex justify-content-between">
                              <span>寵箱費用</span>
                              <span>{formatNumber(calculationResults.cost)}</span>
                            </div>
                            <div className="calc-formula-text">寵箱費用 × 數量 × 折數</div>
                            <div className="calculation-formula text-muted">
                              {formatNumber(petRandomBox)} × {formatNumber(petRandomBoxCount)} × {pointToCash}%
                            </div>
                          </div>
                          <div className="calc-row border-bottom p-2">
                            <div className="d-flex justify-content-between">
                              <span>W寵收入</span>
                              <span>{formatNumber(calculationResults.wPetPrice * calculationResults.wPetCount)}</span>
                            </div>
                            <div className="calc-formula-text">W寵價格 × 數量</div>
                            <div className="calculation-formula text-muted">
                              {formatNumber(calculationResults.wPetPrice)} × {formatNumber(calculationResults.wPetCount)}
                            </div>
                          </div>
                          <div className="calc-row border-bottom p-2">
                            <div className="d-flex justify-content-between">
                              <span>白鎚收入</span>
                              <span>{formatNumber(calculationResults.coinWhiteHammerPrice * calculationResults.whiteHammerCount)}</span>
                            </div>
                            <div className="calc-formula-text">白鎚價格 × 數量</div>
                            <div className="calculation-formula text-muted">
                              {formatNumber(calculationResults.coinWhiteHammerPrice)} × {formatNumber(calculationResults.whiteHammerCount)}
                            </div>
                          </div>
                          <div className="calc-row border-bottom p-2">
                            <div className="d-flex justify-content-between">
                              <span>賣幣收入</span>
                              <span>{formatNumber(calculationResults.vipPointsEquivalentMapleCoins / calculationResults.coinValue)}</span>
                            </div>
                            <div className="calc-formula-text">楓幣 ÷ 幣值</div>
                            <div className="calculation-formula text-muted">
                              {formatNumber(calculationResults.vipPointsEquivalentMapleCoins)} ÷ {formatNumber(calculationResults.coinValue)}
                            </div>
                          </div>

                        </div>
                      </div>
                      <div className="col-6 mb-3">
                        <h5 className="h5 fw-bold">VIP換點</h5>
                        <div id="finalResult" className={`p-4 rounded mb-4 text-center ${getResultClass(formatNumber(calculationResults.boxCost))}`}>
                          <div className="mb-2 fw-bold">點數 {pointToCash}折 | 楓幣商城匯率 {maplePointsTomapleCoins}</div>
                          <div className={`fw-bold fs-4 ${formatNumber(calculationResults.boxCost) > 0 ? 'text-success' :
                            formatNumber(calculationResults.boxCost) < 0 ? 'text-danger' : 'text-warning'}`
                          }>
                            總{formatNumber(calculationResults.boxCost) > 0 ? '盈利' : formatNumber(calculationResults.boxCost) < 0 ? '虧損' : '盈虧'}:
                            {formatNumber(calculationResults.boxCost)}
                          </div>
                          <div className="mt-1 text-muted" style={{ fontSize: '0.9em' }}>
                            (幣值 {formatNumber(coinValue)} 計算)
                          </div>
                        </div>

                        <div className="calculation-steps">
                          <div className="calc-row border-bottom p-2">
                            <div className="d-flex justify-content-between">
                              <span>寵箱費用</span>
                              <span>{formatNumber(calculationResults.cost)}</span>
                            </div>
                            <div className="calc-formula-text">寵箱費用 × 數量 × 折數</div>
                            <div className="calculation-formula text-muted">
                              {formatNumber(petRandomBox)} × {formatNumber(petRandomBoxCount)} × {pointToCash}%
                            </div>
                          </div>
                          <div className="calc-row border-bottom p-2">
                            <div className="d-flex justify-content-between">
                              <span>W寵收入</span>
                              <span>{formatNumber(calculationResults.wPetPrice * (calculationResults.wPetCount + calculationResults.maplePointswPetCount))}</span>
                            </div>
                            <div className="calc-formula-text">W寵價格 × 數量</div>
                            <div className="calculation-formula text-muted">
                              {formatNumber(calculationResults.wPetPrice)} × {formatNumber(calculationResults.wPetCount + calculationResults.maplePointswPetCount)}
                            </div>
                          </div>
                          <div className="calc-row border-bottom p-2">
                            <div className="d-flex justify-content-between">
                              <span>白鎚收入</span>
                              <span>{formatNumber(calculationResults.maplePointsWhiteHammerPrice * (calculationResults.whiteHammerCount + calculationResults.maplePointsHammerCount))}</span>
                            </div>
                            <div className="calc-formula-text">白鎚價格 × 數量</div>
                            <div className="calculation-formula text-muted">
                              {formatNumber(calculationResults.maplePointsWhiteHammerPrice)} × {formatNumber(calculationResults.whiteHammerCount + calculationResults.maplePointsHammerCount)}
                            </div>
                          </div>
                          <div className="calc-row border-bottom p-2">
                            <div className="d-flex justify-content-between">
                              <span>賣幣收入</span>
                              <span>{formatNumber(0)}</span>
                            </div>
                            <div className="calc-formula-text">楓幣 ÷ 幣值</div>
                            <div className="calculation-formula text-muted">
                              {formatNumber(0)} ÷ {formatNumber(16000000)}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>

  );
}