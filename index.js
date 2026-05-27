const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

const ASSETS_TOKEN = process.env.ASSETS_TOKEN || '';
let PEOPLE = [];
try {
  PEOPLE = JSON.parse(process.env.ACCOUNTS_JSON || '{"people":[]}').people || [];
} catch (err) {
  console.error('ACCOUNTS_JSON parse failed:', err.message);
}

app.use(express.static(path.join(__dirname)));

app.get('/', (req, res) => {
  res.send(`<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>우리 친구들 - 23년의 우정</title>
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;700&family=Gaegu:wght@400;700&display=swap" rel="stylesheet">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }

    body {
      min-height: 100vh;
      background: linear-gradient(180deg, #ffecd2 0%, #fcb69f 50%, #ffecd2 100%);
      font-family: 'Noto Sans KR', sans-serif;
      padding: 30px 20px;
      overflow-x: hidden;
    }

    h1 {
      text-align: center;
      color: #d63384;
      font-family: 'Gaegu', cursive;
      font-size: clamp(28px, 6vw, 50px);
      margin-bottom: 8px;
      text-shadow: 2px 2px 0 #fff;
    }

    .subtitle {
      text-align: center;
      color: #6f42c1;
      font-size: clamp(14px, 2.5vw, 20px);
      margin-bottom: 40px;
      font-weight: 500;
    }

    .container {
      max-width: 1400px;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      gap: 30px;
    }

    .row {
      display: flex;
      justify-content: center;
      gap: 20px;
      flex-wrap: wrap;
    }

    .family-card {
      background: rgba(255,255,255,0.95);
      border-radius: 30px;
      padding: 20px;
      box-shadow: 0 10px 40px rgba(214, 51, 132, 0.2);
      text-align: center;
      min-width: 200px;
      max-width: 240px;
      position: relative;
      border: 3px solid #ffb6c1;
    }

    .family-card.center-card {
      background: linear-gradient(145deg, #fff0f5, #ffe4ec);
      border: 3px solid #d63384;
    }

    .character-area {
      height: 130px;
      position: relative;
      margin-bottom: 10px;
      background: linear-gradient(180deg, #e8f5e9 0%, #c8e6c9 100%);
      border-radius: 20px;
      overflow: hidden;
    }

    .character {
      position: absolute;
      width: 42px;
      height: 42px;
    }

    .character svg {
      width: 100%;
      height: 100%;
    }

    .names {
      padding-top: 12px;
      border-top: 2px dashed #ffb6c1;
    }

    .couple-names {
      color: #d63384;
      font-weight: 700;
      font-size: 14px;
      margin-bottom: 6px;
    }

    .children-names {
      color: #6f42c1;
      font-size: 12px;
      margin-bottom: 4px;
    }

    .pet-names {
      color: #20c997;
      font-size: 11px;
    }

    .single-name {
      color: #d63384;
      font-weight: 700;
      font-size: 16px;
    }

    .single-label {
      color: #6f42c1;
      font-size: 11px;
      margin-top: 4px;
    }

    footer {
      text-align: center;
      margin-top: 50px;
      color: #d63384;
      font-size: 14px;
      font-family: 'Gaegu', cursive;
    }

    .floating-heart {
      position: fixed;
      pointer-events: none;
      z-index: 9999;
      animation: floatDown 2s ease-out forwards;
    }

    @keyframes floatDown {
      0% { opacity: 1; transform: translateY(0) scale(1) rotate(0deg); }
      100% { opacity: 0; transform: translateY(100vh) scale(0.5) rotate(45deg); }
    }

    @media (max-width: 768px) {
      .family-card { min-width: 160px; padding: 15px; }
      .character-area { height: 100px; }
      .character { width: 32px; height: 32px; }
      .row { gap: 12px; }
    }
  </style>
</head>
<body>
  <h1>💕 우리 친구들 💕</h1>
  <p class="subtitle">23년간 이어온 소중한 우정</p>

  <div class="container">
    <div class="row">
      <div class="family-card">
        <div class="character-area" id="family1"></div>
        <div class="names">
          <div class="couple-names">김시준 ♥ 김소담</div>
          <div class="children-names">김지은</div>
          <div class="pet-names">🐱 김지평</div>
        </div>
      </div>

      <div class="family-card">
        <div class="character-area" id="family2"></div>
        <div class="names">
          <div class="couple-names">이욱재 ♥ Marina Engel</div>
          <div class="pet-names">🐱🐱 고양이 두마리</div>
        </div>
      </div>

      <div class="family-card">
        <div class="character-area" id="family3"></div>
        <div class="names">
          <div class="couple-names">최민지 ♥ 조우상</div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="family-card center-card">
        <div class="character-area" id="family7"></div>
        <div class="names">
          <div class="single-name">김민석</div>
          <div class="single-label">우리들의 든든한 친구</div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="family-card">
        <div class="character-area" id="family4"></div>
        <div class="names">
          <div class="couple-names">이단비 ♥ 공경식</div>
          <div class="children-names">공하윤 · 공하엘</div>
        </div>
      </div>

      <div class="family-card">
        <div class="character-area" id="family5"></div>
        <div class="names">
          <div class="couple-names">강다운 ♥ 박세원</div>
          <div class="children-names">박다희 · 박다현</div>
          <div class="pet-names">🐕 강칠석</div>
        </div>
      </div>

      <div class="family-card">
        <div class="character-area" id="family6"></div>
        <div class="names">
          <div class="couple-names">김창현 ♥ 임경은</div>
          <div class="children-names">김도윤 · 김도율 · 김도유</div>
        </div>
      </div>
    </div>
  </div>

  <footer>✨ 2003 ~ 2026 · Forever Friends ✨</footer>

  <script>
    const chars = {
      man: '<svg viewBox="0 0 64 64"><circle cx="32" cy="18" r="12" fill="#FFE0BD"/><path d="M20 16c0-7 5-12 12-12s12 5 12 12" fill="#4A4A4A"/><circle cx="28" cy="16" r="2" fill="#333"/><circle cx="36" cy="16" r="2" fill="#333"/><path d="M29 22c1.5 1.5 4 1.5 6 0" stroke="#333" stroke-width="2" fill="none" stroke-linecap="round"/><rect x="24" y="32" width="16" height="20" rx="4" fill="#4A90D9"/><rect x="20" y="32" width="6" height="16" rx="2" fill="#4A90D9"/><rect x="38" y="32" width="6" height="16" rx="2" fill="#4A90D9"/><rect x="26" y="52" width="5" height="8" rx="2" fill="#5D4037"/><rect x="33" y="52" width="5" height="8" rx="2" fill="#5D4037"/></svg>',
      woman: '<svg viewBox="0 0 64 64"><circle cx="32" cy="18" r="12" fill="#FFE0BD"/><path d="M18 20c0-9 6-16 14-16s14 7 14 16c0 2-1 3-2 4-2-7-6-10-12-10s-10 3-12 10c-1-1-2-2-2-4z" fill="#5D4037"/><circle cx="28" cy="16" r="2" fill="#333"/><circle cx="36" cy="16" r="2" fill="#333"/><path d="M29 22c1.5 1.5 4 1.5 6 0" stroke="#333" stroke-width="2" fill="none" stroke-linecap="round"/><path d="M24 32h16l4 22H20l4-22z" fill="#E91E8C"/><rect x="26" y="54" width="5" height="6" rx="2" fill="#FFE0BD"/><rect x="33" y="54" width="5" height="6" rx="2" fill="#FFE0BD"/></svg>',
      girl: '<svg viewBox="0 0 64 64"><circle cx="32" cy="20" r="10" fill="#FFE0BD"/><path d="M22 22c0-7 4-12 10-12s10 5 10 12" fill="#5D4037"/><circle cx="14" cy="20" r="4" fill="#5D4037"/><circle cx="50" cy="20" r="4" fill="#5D4037"/><circle cx="29" cy="18" r="1.5" fill="#333"/><circle cx="35" cy="18" r="1.5" fill="#333"/><path d="M30 23c1 1 3 1 4 0" stroke="#333" stroke-width="1.5" fill="none" stroke-linecap="round"/><path d="M26 32h12l3 16H23l3-16z" fill="#FF69B4"/><rect x="27" y="48" width="4" height="6" rx="1" fill="#FFE0BD"/><rect x="33" y="48" width="4" height="6" rx="1" fill="#FFE0BD"/></svg>',
      boy: '<svg viewBox="0 0 64 64"><circle cx="32" cy="20" r="10" fill="#FFE0BD"/><path d="M24 16c0-5 3-8 8-8s8 3 8 8" fill="#4A4A4A"/><circle cx="29" cy="18" r="1.5" fill="#333"/><circle cx="35" cy="18" r="1.5" fill="#333"/><path d="M30 23c1 1 3 1 4 0" stroke="#333" stroke-width="1.5" fill="none" stroke-linecap="round"/><rect x="26" y="32" width="12" height="14" rx="3" fill="#5DADE2"/><rect x="27" y="46" width="4" height="6" rx="1" fill="#5D4037"/><rect x="33" y="46" width="4" height="6" rx="1" fill="#5D4037"/></svg>',
      cat: '<svg viewBox="0 0 64 64"><ellipse cx="32" cy="36" rx="14" ry="12" fill="#F5A623"/><circle cx="32" cy="22" r="12" fill="#F5A623"/><polygon points="22,14 20,4 28,12" fill="#F5A623"/><polygon points="42,14 44,4 36,12" fill="#F5A623"/><polygon points="21,6 22,14 28,12" fill="#FFB6C1"/><polygon points="43,6 42,14 36,12" fill="#FFB6C1"/><ellipse cx="27" cy="20" rx="2.5" ry="3" fill="#333"/><ellipse cx="37" cy="20" rx="2.5" ry="3" fill="#333"/><circle cx="28" cy="19" r="1" fill="#fff"/><circle cx="38" cy="19" r="1" fill="#fff"/><ellipse cx="32" cy="26" rx="2" ry="1.5" fill="#FFB6C1"/><path d="M30 28c1 1 3 1 4 0" stroke="#333" stroke-width="1" fill="none"/></svg>',
      dog: '<svg viewBox="0 0 64 64"><ellipse cx="32" cy="38" rx="14" ry="10" fill="#FAFAFA"/><circle cx="32" cy="24" r="12" fill="#FAFAFA"/><ellipse cx="18" cy="18" rx="5" ry="8" fill="#FAFAFA"/><ellipse cx="46" cy="18" rx="5" ry="8" fill="#FAFAFA"/><circle cx="27" cy="22" r="2" fill="#333"/><circle cx="37" cy="22" r="2" fill="#333"/><circle cx="28" cy="21" r="0.8" fill="#fff"/><circle cx="38" cy="21" r="0.8" fill="#fff"/><ellipse cx="32" cy="28" rx="3" ry="2.5" fill="#333"/><path d="M29 32c1.5 1.5 4.5 1.5 6 0" stroke="#E91E63" stroke-width="2" fill="none" stroke-linecap="round"/></svg>'
    };

    const families = {
      family1: ['man', 'woman', 'girl', 'cat'],
      family2: ['man', 'woman', 'cat', 'cat'],
      family3: ['woman', 'man'],
      family4: ['woman', 'man', 'girl', 'girl'],
      family5: ['woman', 'man', 'girl', 'boy', 'dog'],
      family6: ['man', 'woman', 'boy', 'boy', 'boy'],
      family7: ['man']
    };

    function initFamily(containerId, members) {
      const container = document.getElementById(containerId);
      if (!container) return;

      members.forEach((type, i) => {
        const div = document.createElement('div');
        div.className = 'character';
        div.innerHTML = chars[type];

        const maxX = container.offsetWidth - 45;
        const maxY = container.offsetHeight - 45;

        div.x = Math.random() * maxX;
        div.y = Math.random() * maxY;
        div.vx = (Math.random() - 0.5) * 1.5;
        div.vy = (Math.random() - 0.5) * 1.5;

        div.style.left = div.x + 'px';
        div.style.top = div.y + 'px';

        container.appendChild(div);

        animateCharacter(div, container);
      });
    }

    function animateCharacter(el, container) {
      function move() {
        const maxX = container.offsetWidth - 45;
        const maxY = container.offsetHeight - 45;

        el.x += el.vx;
        el.y += el.vy;

        if (el.x <= 0 || el.x >= maxX) { el.vx *= -1; el.x = Math.max(0, Math.min(el.x, maxX)); }
        if (el.y <= 0 || el.y >= maxY) { el.vy *= -1; el.y = Math.max(0, Math.min(el.y, maxY)); }

        el.style.left = el.x + 'px';
        el.style.top = el.y + 'px';

        requestAnimationFrame(move);
      }
      move();
    }

    window.onload = () => {
      Object.keys(families).forEach(id => initFamily(id, families[id]));
    };

    const hearts = ['💕', '💗', '💖', '💝', '❤️', '🧡', '💛', '💚', '💙', '💜'];
    let lastHeartTime = 0;

    function createHeart(x, y) {
      const heart = document.createElement('div');
      heart.className = 'floating-heart';
      heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
      heart.style.left = x + 'px';
      heart.style.top = y + 'px';
      heart.style.fontSize = (15 + Math.random() * 15) + 'px';
      document.body.appendChild(heart);
      setTimeout(() => heart.remove(), 2000);
    }

    document.addEventListener('mousemove', (e) => {
      if (Date.now() - lastHeartTime > 80) {
        createHeart(e.clientX, e.clientY);
        lastHeartTime = Date.now();
      }
    });

    document.addEventListener('click', (e) => {
      for (let i = 0; i < 6; i++) {
        setTimeout(() => {
          createHeart(e.clientX + (Math.random()-0.5)*50, e.clientY + (Math.random()-0.5)*50);
        }, i * 50);
      }
    });
  </script>
</body>
</html>`);
});

function fmtInt(n) {
  return Math.round(n).toLocaleString('ko-KR');
}

async function fetchPrice(code) {
  const url = `https://polling.finance.naver.com/api/realtime/domestic/stock/${code}`;
  const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
  if (!res.ok) throw new Error(`naver ${code} HTTP ${res.status}`);
  const data = await res.json();
  const d = data?.datas?.[0];
  if (!d) throw new Error(`naver ${code} empty`);
  return Number(String(d.closePrice).replace(/,/g, ''));
}

app.get('/api/assets', async (req, res) => {
  const auth = req.headers.authorization || '';
  const token = auth.replace(/^Bearer\s+/i, '');
  if (!ASSETS_TOKEN || token !== ASSETS_TOKEN) {
    return res.status(401).type('text/plain').send('unauthorized');
  }

  const uniqueCodes = [
    ...new Set(PEOPLE.flatMap((p) => (p.holdings || []).map((h) => h.code))),
  ];
  const fetched = await Promise.all(
    uniqueCodes.map((c) =>
      fetchPrice(c)
        .then((price) => [c, { price }])
        .catch((err) => [c, { error: err.message }])
    )
  );
  const prices = new Map(fetched);

  const blocks = PEOPLE.map((person) => {
    let totalCost = 0;
    let totalValue = 0;
    for (const h of person.holdings || []) {
      const p = prices.get(h.code) || {};
      totalCost += h.quantity * h.avgPrice;
      totalValue += h.quantity * (p.price ?? 0);
    }
    const profitLoss = totalValue - totalCost;
    const rate = totalCost > 0 ? (profitLoss / totalCost) * 100 : 0;
    return [
      person.name,
      `- 총합 : ${fmtInt(totalValue)}원`,
      `- 손익 : ${(profitLoss >= 0 ? '+' : '') + fmtInt(profitLoss)}원`,
      `- 비율 : ${(rate >= 0 ? '+' : '') + rate.toFixed(2)}%`,
    ].join('\n');
  });

  const errors = [];
  for (const [code, p] of prices) {
    if (p.error) errors.push(`! ${code}: ${p.error}`);
  }
  const body = blocks.join('\n\n');
  res.type('text/plain').send(errors.length ? `${body}\n\n${errors.join('\n')}` : body);
});

app.listen(PORT, () => console.log('Server running on port ' + PORT));
