import { useEffect, useState } from "react";
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

export default function MutliCalculator() {

  const [currentVipLevel, setCurrentVipLevel] = useState('royalBlack');
  const [selectedMethod, setSelectedMethod] = useState('self');
  const [vipMethodPoints, setVipMethodPoints] = useState(50);
  const [vipMaintainPoints, setVipMaintainPoints] = useState(5000000);
  const [pointToCash, setPointToCash] = useState(92);
  const [giftDiscount, setGiftDiscount] = useState(82);
  const [maplePointsTomapleCoins, setMaplePointsTomapleCoins] = useState(6);
  const [coinValueMethod, setCoinValueMethod] = useState('auto');
  const [coinValue, setCoinValue] = useState(21200000);
  const [showResults, setShowResults] = useState(false);
  const [calculationResults, setCalculationResults] = useState({
    cost: 0,
    incomeByGift: 0,
    incomeByMapleCoins: 0,
    toRoyalTierCashByGift: 0,
    toRoyalTierPointsByGift: 0,
    vipPointsEquivalentMapleCoins: 0,
    coinValue: 0
  });

  // 當VIP等級變化時，更新相關狀態
  useEffect(() => {
    if (selectedMethod === 'self') {
      setVipMethodPoints(vipLevels[currentVipLevel].self);
    } else {
      setVipMethodPoints(vipLevels[currentVipLevel].gift);
    }
    setVipMaintainPoints(vipLevels[currentVipLevel].maintain);
  }, [currentVipLevel, selectedMethod]);

  // 處理VIP等級按鈕點擊
  const handleVipLevelChange = (level) => {
    setCurrentVipLevel(level);
    setVipMaintainPoints(vipLevels[level].maintain);
  };

  // 切換使用方式
  const handleMethodChange = (method) => {
    setSelectedMethod(method);
    if (method === 'self') {
      setVipMethodPoints(vipLevels[currentVipLevel].self);
    } else {
      setVipMethodPoints(vipLevels[currentVipLevel].gift);
    }
  };

  // 處理表單提交
  const handleSubmit = (e) => {
    e.preventDefault();

    const pointToCashDecimal = pointToCash * 0.01;
    const giftDiscountDecimal = giftDiscount * 0.01;
    const diamondTierPointToVIP = Number(vipMethodPoints);

    // 計算
    const mapleCoinMallExchangeRate = 100000000 / maplePointsTomapleCoins;  // 1楓點:x楓幣
    const vipPointsEquivalentMaplePoints = vipMaintainPoints / maplePointsToVIP;  // VIP點數換楓點
    const vipPointsEquivalentMapleCoins = vipPointsEquivalentMaplePoints * mapleCoinMallExchangeRate; // VIP點數換楓幣

    const toRoyalTierPointsByGift = vipMaintainPoints / diamondTierPointToVIP;  // 送禮需要多少點數
    const toRoyalTierCashByGift = toRoyalTierPointsByGift * pointToCashDecimal;  // 送禮需要多少現金
    const incomeByGift = toRoyalTierPointsByGift * giftDiscountDecimal;  // 送禮折扣後的現金收入

    let calculatedCoinValue;
    if (coinValueMethod === 'auto') {
      // 自動計算幣值
      calculatedCoinValue = vipPointsEquivalentMapleCoins / (toRoyalTierCashByGift - incomeByGift);
    } else {
      // 使用手動輸入的幣值
      calculatedCoinValue = coinValue;
    }

    const incomeByMapleCoins = vipPointsEquivalentMapleCoins / calculatedCoinValue; // 賣幣收入
    const cost = incomeByGift + incomeByMapleCoins - toRoyalTierCashByGift;

    // 更新計算結果
    setCalculationResults({
      cost,
      incomeByGift,
      incomeByMapleCoins,
      toRoyalTierCashByGift,
      toRoyalTierPointsByGift,
      vipPointsEquivalentMapleCoins,
      coinValue: calculatedCoinValue
    });

    setShowResults(true);
  };

  // 格式化數字為台灣地區格式
  const formatNumber = (num) => {
    return num.toLocaleString('zh-TW', { maximumFractionDigits: 2 });
  };

  // 結果卡片的樣式類別
  const getResultClass = () => {
    if (calculationResults.cost > 0) {
      return 'profit';
    } else if (calculationResults.cost < 0) {
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
                <h2 className="h4 mb-0 fw-bold">維持階級</h2>
              </div>
              <div className="card-body">
                <form id="calculatorForm" onSubmit={handleSubmit}>
                  <div className="row mb-3">
                    <label className="col-lg-3 col-form-label">VIP階級</label>
                    <div id="vipLevel" className="col-lg-9 d-flex flex-wrap align-items-center">
                      {renderVipLevelButtons()}
                    </div>
                  </div>

                  <div className="row mb-3">
                    <label className="col-lg-3 col-form-label">使用方式</label>
                    <div className="col-lg-9 d-flex align-items-center">
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="vipMethod"
                          id="vipBySelf"
                          value={vipLevels[currentVipLevel].self}
                          checked={selectedMethod === 'self'}
                          onChange={() => handleMethodChange('self')}
                        />
                        <label className="form-check-label" htmlFor="vipBySelf">自用 ({vipLevels[currentVipLevel].self}VIP點/點)</label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="vipMethod"
                          id="vipByGift"
                          value={vipLevels[currentVipLevel].gift}
                          checked={selectedMethod === 'gift'}
                          onChange={() => handleMethodChange('gift')}
                        />
                        <label className="form-check-label" htmlFor="vipByGift">送禮 ({vipLevels[currentVipLevel].gift}VIP點/點)</label>
                      </div>
                    </div>
                  </div>

                  <div className="row mb-3">
                    <label htmlFor="vipMaintainPoints" className="col-lg-3 col-form-label">VIP維持點數</label>
                    <div className="col-lg-9">
                      <input
                        type="number"
                        className="form-control"
                        id="vipMaintainPoints"
                        value={vipMaintainPoints}
                        required
                      />
                      <div className="form-text">還差多少VIP點數</div>
                    </div>
                  </div>

                  <div className="row mb-3">
                    <label htmlFor="pointToCash" className="col-lg-3 col-form-label">點數折數</label>
                    <div className="col-lg-9">
                      <div className="input-group">
                        <input
                          type="number"
                          className="form-control"
                          id="pointToCash"
                          value={pointToCash}
                          onChange={(e) => setPointToCash(Number(e.target.value))}
                          required
                        />
                        <span className="input-group-text">%</span>
                      </div>
                      <div className="form-text">點數折扣百分比</div>
                    </div>
                  </div>

                  <div id="giftDiscountInputContainer" className="row mb-3">
                    <label htmlFor="giftDiscount" className="col-lg-3 col-form-label">送禮折數</label>
                    <div className="col-lg-9">
                      <div className="input-group">
                        <input
                          type="number"
                          className="form-control"
                          id="giftDiscount"
                          value={giftDiscount}
                          onChange={(e) => setGiftDiscount(Number(e.target.value))}
                          required
                        />
                        <span className="input-group-text">%</span>
                      </div>
                      <div className="form-text">送禮折扣百分比</div>
                    </div>
                  </div>

                  <div className="row mb-3">
                    <label htmlFor="maplePointsTomapleCoins" className="col-lg-3 col-form-label">楓幣商城匯率</label>
                    <div className="col-lg-9">
                      <input
                        type="number"
                        className="form-control"
                        id="maplePointsTomapleCoins"
                        value={maplePointsTomapleCoins}
                        onChange={(e) => setMaplePointsTomapleCoins(Number(e.target.value))}
                        required
                      />
                      <div className="form-text">楓點兌換楓幣比例</div>
                    </div>
                  </div>

                  <div className="row mb-3">
                    <label className="col-lg-3 col-form-label">幣值</label>
                    <div className="col-lg-9 my-2">
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="coinValueMethod"
                          id="coinValueAuto"
                          value="auto"
                          onChange={() => setCoinValueMethod('auto')}
                          checked={coinValueMethod === 'auto'}
                        />
                        <label className="form-check-label" htmlFor="coinValueAuto">自動計算</label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="coinValueMethod"
                          id="coinValueManual"
                          value="manual"
                          onChange={() => setCoinValueMethod('manual')}
                          checked={coinValueMethod === 'manual'}
                        />
                        <label className="form-check-label" htmlFor="coinValueManual">手動輸入</label>
                      </div>
                      {coinValueMethod === "manual" && (
                        <div className="mt-2">
                          <input
                            type="number"
                            className="form-control"
                            id="coinValue"
                            value={coinValue}
                            onChange={(e) => setCoinValue(Number(e.target.value))}
                            required
                          />
                          <div className="form-text">賣幣的幣值</div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="d-grid gap-2">
                    <button type="submit" className="btn btn-primary py-2">
                      計算
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          {showResults && (
            <div className="col-lg-6">
              <div id="results" className="card">
                <div className="card-header">
                  <h4 className="h4 mb-0 fw-bold">計算結果</h4>
                </div>
                <div className="card-body">
                  <div id="finalResult" className={`p-4 rounded mb-4 text-center ${getResultClass()}`}>
                    <div className="mb-2 fw-bold">點數 {pointToCash}折 | 送禮 {giftDiscount}折</div>
                    <div className={`fw-bold fs-4 ${calculationResults.cost > 0 ? 'text-success' :
                      calculationResults.cost < 0 ? 'text-danger' : 'text-warning'}`
                    }>
                      總{calculationResults.cost > 0 ? '盈利' : calculationResults.cost < 0 ? '虧損' : '盈虧'}:
                      {formatNumber(calculationResults.cost)}
                    </div>
                    <div className="mt-1 text-muted" style={{ fontSize: '0.9em' }}>
                      (基於 {formatNumber(vipMaintainPoints)} VIP點數計算)
                    </div>
                  </div>

                  <div className="calculation-steps">
                    <div className="calc-row border-bottom p-2">
                      <div className="d-flex justify-content-between">
                        <span>送禮收入</span>
                        <span>{formatNumber(calculationResults.incomeByGift)}</span>
                      </div>
                      <div className="calc-formula-text">消費點數 × 送禮折數</div>
                      <div className="calculation-formula text-muted">
                        {formatNumber(calculationResults.toRoyalTierPointsByGift)} × {giftDiscount}%
                      </div>
                    </div>

                    <div className="calc-row border-bottom p-2">
                      <div className="d-flex justify-content-between">
                        <span>賣幣收入</span>
                        <span>{formatNumber(calculationResults.incomeByMapleCoins)}</span>
                      </div>
                      <div className="calc-formula-text">
                        (VIP點數 ÷ VIP點數換楓點) × (100000000 ÷ 楓幣商城匯率) ÷ 幣值
                      </div>
                      <div className="calculation-formula text-muted">
                        ({formatNumber(vipMaintainPoints)} ÷ {formatNumber(maplePointsToVIP)}) ×
                        (100000000 ÷ {formatNumber(maplePointsTomapleCoins)}) ÷ {formatNumber(calculationResults.coinValue)}
                      </div>
                    </div>

                    <div className="calc-row border-bottom p-2">
                      <div className="d-flex justify-content-between">
                        <span>花費金額</span>
                        <span>{formatNumber(calculationResults.toRoyalTierCashByGift)}</span>
                      </div>
                      <div className="calc-formula-text">消費點數 × 點數折數</div>
                      <div className="calculation-formula text-muted">
                        {formatNumber(calculationResults.toRoyalTierPointsByGift)} × {pointToCash}%
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>

  );
}