'use strict';

// ══════════════════════════════════════════════════════
//  PROTOCOL DATA
//  Source: timer-warm-up-protocol.csv (Updated Parent/Child)
// ══════════════════════════════════════════════════════
const TOTAL_SEC = 3600; // 60-minute full protocol

const STAGES = [
  { 
    id: '1', type: 'P', startSec: 3600, 
    description: 'Перевірка обладнання', 
    refActions: '• Секретар перевіряє готовність та підключення обладнання (підключення ноутбука до мережі інтернет, до принтера та до монітора для технічного делегата, перевіряє встановлені драйвери для принтера та оновленняпрограмного забезпечення та програми e- Scoresheet).\n\n• Впродовж всього матчу секретар обов’язково використовує USB-накопичувач для резервного зберігання даних.', 
    teamActions: '', color: '#4361ee' 
  },
  { 
    id: '1.1', type: 'C', startSec: 2700, parentId: '1',
    description: 'Секретар заповнює дані про матч та перевіряє склади...', 
    refActions: 'Секретар заповнює дані про матч та перевіряє склади команд відповідно до затвердженої форми.', 
    teamActions: '', color: '#4361ee'
  },
  { 
    id: '1.2', type: 'C', startSec: 2100, parentId: '1',
    description: 'Судді перевіряють ігрові м’ячі та обладнання', 
    refActions: '• Судді перевіряють:\n - Ігрові м’ячі, електронний протокол та планшети;\n - Все необхідне обладнання: базер, табло, манішки для Ліберо тощо, а також резервне обладнання;\n\n• Секретар друкує протокол матчу (Scoresheet) та склади команд (Roster verification). Активує «онлайн» рахунок (Live match).', 
    teamActions: '', color: '#4361ee'
  },
  
  { 
    id: '2', type: 'P', startSec: 1200, 
    description: 'Перевірка висоти сітки', 
    refActions: '• 1-й суддя свистком завершує розминку команд;\n\n• 1-й та 2-й суддя перевіряють:\n - Висоту та еластичність сітки;\n - Положення антен та бокових стрічок.', 
    teamActions: 'Команди знаходяться біля своїх лавок.', color: '#52b788' 
  },
  
  { 
    id: '3', type: 'P', startSec: 1140, 
    description: 'Офіційне фотографування команд', 
    refActions: 'Технічний делегат запрошує команди до Офіційного фотографування', 
    teamActions: 'Команда(и) в ігровій формі запрошуються увійти на ігровий майданчик та слідувати вказівкам офіційного фотографа.\n\n• Команди займають місця біля відповідних командних лавок.', color: '#95d5b2' 
  },
  
  { 
    id: '4', type: 'P', startSec: 1020, 
    description: 'Жеребкування для вибору подачі та сторін майданчика', 
    refActions: '• 1-й та 2-й судді проводять жеребкування. Суддівська бригада знаходиться біля стійки (обличчям до столу секретаря).\n\n• Після жеребкування 1-й суддя інформує секретаря та Технічного делегата про його результати. Секретар вносить до протоколу інформацію отриману від 1-го судді. Роздільної розминки для команд немає!!!', 
    teamActions: '• Капітани команд знаходяться перед столом секретаря;\n\n• Після жеребкування капітани та тренери команд підписують протокол;\n\n• Після цього офіційні особи команд направляються до своїх командних лавок.', color: '#ffd60a' 
  },
  
  { 
    id: '5', type: 'P', startSec: 960, 
    description: 'Офіційна розминка на сітці', 
    refActions: '• 1-й суддя свистком сповіщає про початок офіційної розминки «на сітці» для обох команд 10 хв. Судді дають необхідні інструкції секретарю, лінійним суддям, подавальникам м’ячів, швидким протиральникам майданчика та ін.', 
    teamActions: '• Команди розминаються на сітці разом ; (Роздільної розминки для команд немає ).\n\n• Команди повинні бути в офіційній ігровій формі;', color: '#ff9500' 
  },
  { 
    id: '5.1', type: 'C', startSec: 750, parentId: '5',
    description: 'Зміна зони атаки (атака з 2-ої зони)', 
    refActions: '', 
    teamActions: 'Команди змінюють зону атаки', color: '#ff9500'
  },
  { 
    id: '5.2', type: 'C', startSec: 720, parentId: '5',
    description: 'Розташування для 1-ї партії', 
    refActions: '• 2-й суддя повинен переконатися, що тренер або помічник тренера кожної команди не пізніше ніж за 12 хвилин подав заповнені та підписані картки розташування, або стартове розташування через додаток електронного протоколу та склади команд, прийняті секретарем матчу.', 
    teamActions: '• При використанні планшетів, команди повинні відправити розташування в електронному вигляді секретарю (не пізніше ніж за 12 хвилин до початку матчу).', color: '#ff9500'
  },
  
  { 
    id: '6', type: 'P', startSec: 540, 
    description: 'Офіційна розминка на сітці: Розминка подачі команди А', 
    refActions: '• 1-суддя дає свисток про окремий 90 сек. період розминки подачі для кожної команди. Для розминки подачі команда А отримує першою 90 секунд на майданчику, після чого такий самий час надається команді Б. Команді, що проводить розминку подачі дозволено використовувати обидві сторони ігрового майданчика.', 
    teamActions: '', color: '#ff6b35' 
  },
  { 
    id: '6.1', type: 'C', startSec: 540, parentId: '6',
    description: 'Подача команди А', 
    refActions: '', 
    teamActions: 'Команда Б повинна залишатися за межами майданчика, на лаві запасних, та не може перешкоджати команді, яка виконує подачу.', color: '#ff6b35'
  },
  { 
    id: '6.2', type: 'C', startSec: 450, parentId: '6',
    description: 'Подача команди Б', 
    refActions: '', 
    teamActions: 'Команда А повинна залишатися за межами майданчика, на лаві запасних, та не може перешкоджати команді, яка виконує подачу.', color: '#ff6b35'
  },
  
  { 
    id: '7', type: 'P', startSec: 360, 
    description: 'Закінчення офіційної розминки', 
    refActions: '• 1-й суддя свистком сповіщає про закінчення Офіційної розминки.\n\n• Судді запитують дозволу Технічного делегата ГО ФВУ розпочати матч.', 
    teamActions: '• По свистку 1-го судді команди повинні зупинити Офіційну розминку та негайно повернутись до своєї командної лавки.', color: '#e63946' 
  },
  
  { 
    id: '8', type: 'P', startSec: 330, 
    description: 'Судді, лінійні судді та команди готуються до презентації', 
    refActions: '• 1-й та 2-й судді стоять біля стійки (1-ий суддя стоїть на стороні команди А, 2-ий суддя на стороні команди Б).', 
    teamActions: 'Команди шикуються на лицьових лініях. Капітани команд стоять на продовженнях бокової лінії ближче до столу секретаря. Перший Ліберо стоїть поруч з капітаном та всі інші гравці вздовж лицьової лінії. Другий Ліберо стоїть в кінці шеренги.', color: '#c77dff' 
  },
  
  { 
    id: '9', type: 'P', startSec: 300, 
    description: 'Фанфари: Презентація', 
    refActions: '• Диктор представляє матч: оголошує назву змагань та команди.\n• При потребі, проводиться привітання, вручення відзнак та інше.\n• Хвилина мовчання\n•  Диктор оголошує Державний гімн України. Лунає Державний гімн України. Впродовж того, як лунає Державний гімн України, команди, судді стоять обличчям до Державного прапору України.\n• 1-й суддя дає свисток, гравці обмінюються  рукостисканнями під сіткою з командою суперника.', 
    teamActions: 'Після рукостискання, гравці повертаються до своїх командних лавок та готуються до оголошення стартового складу команди.', color: '#9d4edd' 
  },
  
  { 
    id: '10', type: 'P', startSec: 180, 
    description: 'Фанфари: Презентація суддівської бригади', 
    refActions: '• 1-й та 2-й судді виходять на середину майданчика та розташовуються біля сітки, обличчям до головної камери ТБ.\n\n• Після представлення суддів, 1-й суддя йде до суддівської вишки, 2-й суддя розташовується навпроти.', 
    teamActions: '● Обидві команди знаходяться біля своїх командних лавок.', color: '#f72585' 
  },
  
  { 
    id: '11', type: 'P', startSec: 150, 
    description: 'Презентація стартового складу команд...', 
    refActions: '● Диктор оголошує прізвища та номера гравців стартового складу, гравців Ліберо та Головного тренера (Першою представляється команда гостей, потім команда - господар. При іграх нейтральних команд - першою представляється команда, записана першою в програмі змагань).', 
    teamActions: '• При оголошенні прізвища гравці стартового складу та Ліберо команди гостей виходять на ігровий майданчик, вітаючи глядачів.\n• Головний тренер після оголошення його прізвища піднімається та вітає глядачів.\n• Представлення команди господарів відбувається таким самим чином.\n• Інші члени команди будуть представлені при виході на майданчик під час заміни.', color: '#b5179e' 
  },
  { 
    id: '11.1', type: 'C', startSec: 75, parentId: '11', // Triggers at half of parent's duration
    description: 'Дії 2-го судді після презентації', 
    refActions: '-----Після презентації-----\n2-й суддя:\n• Перевіряє позиції гравців стартового складу згідно картки розташування чи планшета (першою перевіряється команда, що подає). Секретар також повинен перевірити позиції гравців стартового складу;\n• Дозволяє Ліберо вийти на майданчик (при потребі);\n• Дає м\'яч гравцю, який буде подавати.', 
    teamActions: '', color: '#b5179e'
  },
  
  { 
    id: '12', type: 'P', startSec: 0, 
    description: 'Перша подача', 
    refActions: '• 2-й суддя сигналізує 1-му судді, про готовність розпочати гру.\n\n• 1-й суддя, свистком дозволяє першу подачу, згідно часу початку матчу.', 
    teamActions: '', color: '#7209b7' 
  },
];

// Calculate durations
(function initDurations() {
  const parents = STAGES.filter(s => s.type === 'P');
  
  parents.forEach((p, i) => {
    const nextParent = parents[i + 1];
    p.donutDur = nextParent ? (p.startSec - nextParent.startSec) : 0;
  });

  STAGES.forEach((s, i) => {
    const nextStage = STAGES[i + 1];
    s.duration = nextStage ? (s.startSec - nextStage.startSec) : 0;
  });
})();

// ══════════════════════════════════════════════════════
//  SVG CONSTANTS & HELPERS
// ══════════════════════════════════════════════════════
const SVGNS  = 'http://www.w3.org/2000/svg';
const DR     = 150;
const DSW    = 42;
const C      = 2 * Math.PI * DR;
const ARC_GAP = 4;
const CX = 200, CY = 200;

let isRunning       = false;
let rafId           = null;
let startTs         = null;   // Date.now()
let elapsedAtPause  = 0;
let curStageIdx     = 0;
let isFinished      = false;
let sessionName     = null;
let lastServerStateStr = "";

const eid = id => document.getElementById(id);
let E = {};

function fmt(sec) {
  const s = Math.max(0, Math.ceil(sec));
  const m = Math.floor(s / 60);
  return `${String(m).padStart(2,'0')}:${String(s % 60).padStart(2,'0')}`;
}

function getElapsed() {
  return startTs === null
    ? elapsedAtPause
    : elapsedAtPause + (Date.now() - startTs) / 1000;
}

function getTotalRemaining() {
  return Math.max(0, TOTAL_SEC - getElapsed());
}

function findStageIdx(T) {
  let idx = 0;
  for (let i = 0; i < STAGES.length; i++) {
    if (STAGES[i].startSec >= T) idx = i;
    else break;
  }
  return idx;
}

function getActiveParent(T) {
  let activeParent = null;
  for (let i = 0; i < STAGES.length; i++) {
    if (STAGES[i].type === 'P' && STAGES[i].startSec >= T) activeParent = STAGES[i];
  }
  return activeParent;
}

// ══════════════════════════════════════════════════════
//  DONUT LOGIC
// ══════════════════════════════════════════════════════
function buildDonut() {
  const group = E.stageArcs;
  group.innerHTML = '';
  const parents = STAGES.filter(s => s.type === 'P');
  let currentOffset = 0;
  
  parents.forEach(stage => {
    let len;
    if (stage.id === '1') {
      len = 0.20 * C; // 20% of the donut
    } else {
      // Remaining 1200 seconds take 80% of the donut
      len = (stage.donutDur / 1200) * (0.80 * C);
    }
    
    stage.arcLen = len;
    stage.arcOffset = currentOffset;
    
    if (len <= 0) return;
    const vis = Math.max(0, len - ARC_GAP);
    const c = document.createElementNS(SVGNS, 'circle');
    c.setAttribute('cx', CX);
    c.setAttribute('cy', CY);
    c.setAttribute('r', DR);
    c.setAttribute('fill', 'none');
    c.setAttribute('stroke', stage.color);
    c.setAttribute('stroke-width', DSW);
    c.setAttribute('stroke-dasharray', `${vis} ${C - vis}`);
    c.setAttribute('stroke-dashoffset', -currentOffset);
    c.setAttribute('transform', `rotate(-90 ${CX} ${CY})`);
    c.setAttribute('class', 'stage-arc');
    c.setAttribute('id', `arc-${stage.id.replace('.','-')}`);
    group.appendChild(c);
    
    currentOffset += len;
  });
  
  buildTicks();
  E.arcConsumed.setAttribute('stroke-dasharray', `0 ${C}`);
}

function buildTicks() {
  const g = E.tickMarks;
  g.innerHTML = '';
  const rOuter = DR + DSW / 2;
  
  // Base ticks every 5 minutes
  const tickElapsedSet = new Set();
  for (let min = 0; min <= 55; min += 5) {
    tickElapsedSet.add(min);
  }
  
  // Specific requested text labels
  const textRemainingSet = new Set([45, 30]);
  
  // Add ticks and labels for every parent stage
  const parents = STAGES.filter(s => s.type === 'P');
  parents.forEach(p => {
    const rem = p.startSec / 60;
    const minElapsed = 60 - rem;
    tickElapsedSet.add(minElapsed);
    
    // Skip labeling '0' to avoid overlap with '60' at the top
    if (rem > 0) {
      textRemainingSet.add(rem);
    }
  });

  tickElapsedSet.forEach(min => {
    const minRemaining = 60 - min;
    const isMajor = textRemainingSet.has(minRemaining);
    
    // Map time to nonlinear circle percentage
    let percent;
    if (min <= 40) {
      // First 40 minutes map to 0% to 20% of the circle
      percent = (min / 40) * 0.20;
    } else {
      // Remaining 20 minutes map to 20% to 100% of the circle
      percent = 0.20 + ((min - 40) / 20) * 0.80;
    }
    
    const angle = (percent * 360 - 90) * (Math.PI / 180);
    
    const r1 = rOuter + 3;
    const r2 = r1 + (isMajor ? 8 : 4);
    const line = document.createElementNS(SVGNS, 'line');
    line.setAttribute('x1', (CX + Math.cos(angle) * r1).toFixed(2));
    line.setAttribute('y1', (CY + Math.sin(angle) * r1).toFixed(2));
    line.setAttribute('x2', (CX + Math.cos(angle) * r2).toFixed(2));
    line.setAttribute('y2', (CY + Math.sin(angle) * r2).toFixed(2));
    line.setAttribute('stroke', isMajor ? 'var(--text-muted)' : 'var(--border)');
    line.setAttribute('stroke-width', isMajor ? '1.5' : '0.8');
    g.appendChild(line);
    
    if (isMajor) {
      const lr  = r2 + 11;
      const txt = document.createElementNS(SVGNS, 'text');
      txt.setAttribute('x', (CX + Math.cos(angle) * lr).toFixed(2));
      txt.setAttribute('y', (CY + Math.sin(angle) * lr).toFixed(2));
      txt.setAttribute('text-anchor', 'middle');
      txt.setAttribute('dominant-baseline', 'middle');
      txt.setAttribute('fill', 'var(--text-muted)');
      
      let lbl = '';
      if (minRemaining % 1 === 0) {
        lbl = String(minRemaining);
      } else {
        const m = Math.floor(minRemaining);
        const s = Math.round((minRemaining - m) * 60);
        lbl = `${m}:${String(s).padStart(2,'0')}`;
      }
      
      txt.setAttribute('font-size', '8');
      txt.setAttribute('font-family', 'monospace');
      txt.textContent = lbl;
      g.appendChild(txt);
    }
  });
}

function setArcStates(T) {
  const activeParent = getActiveParent(T);
  const parents = STAGES.filter(s => s.type === 'P');
  
  parents.forEach(p => {
    const arc = eid(`arc-${p.id.replace('.','-')}`);
    if (!arc) return;
    arc.classList.remove('arc-active');
    
    if (!activeParent) {
      arc.style.opacity = '0.38';
    } else if (p.startSec > activeParent.startSec) {
      arc.style.opacity = '0.1'; // already passed
    } else if (p.id === activeParent.id) {
      arc.style.opacity = '1';
      arc.classList.add('arc-active');
    } else {
      arc.style.opacity = '0.38'; // future
    }
  });
}

function updateConsumedArc(T) {
  const activeParent = getActiveParent(T);
  if (!activeParent || !activeParent.donutDur) {
    E.arcConsumed.setAttribute('stroke-dasharray', `0 ${C}`);
    return;
  }
  
  const parentRem = T - (activeParent.startSec - activeParent.donutDur);
  const elapsed = 1 - (parentRem / activeParent.donutDur);
  const len = Math.max(0, elapsed * activeParent.arcLen);
  
  E.arcConsumed.setAttribute('stroke-dasharray', `${len} ${C - len}`);
  E.arcConsumed.setAttribute('stroke-dashoffset', -activeParent.arcOffset);
}

function updateDonutCenter(T) {
  const activeParent = getActiveParent(T);
  E.dcTotalTime.textContent = fmt(T);
  
  if (!activeParent || !activeParent.donutDur) {
    E.dcStageName.textContent = '—';
    E.dcStageTime.textContent = '—';
    E.dcStageTime.style.color = '';
    return;
  }
  
  const short = activeParent.description.length > 24 ? activeParent.description.slice(0, 24) + '…' : activeParent.description;
  E.dcStageName.textContent = short;
  
  const parentRem = T - (activeParent.startSec - activeParent.donutDur);
  E.dcStageTime.textContent = fmt(parentRem);
  
  const ratio = parentRem / activeParent.donutDur;
  E.dcStageTime.style.color = ratio < 0.15 ? '#ff4444' : ratio < 0.25 ? '#ff9900' : '';
}

// ══════════════════════════════════════════════════════
//  DETAILS & LIST
// ══════════════════════════════════════════════════════
function updateDetails(idx, T) {
  const stage = STAGES[idx];
  const stageRem = Math.max(0, T - (STAGES[idx + 1] ? STAGES[idx + 1].startSec : 0));
  
  E.detailsBadge.textContent = stage.id.includes('.') ? stage.id : String(stage.id).padStart(2, '0');
  E.detailsBadge.style.background = `linear-gradient(135deg, ${stage.color}, ${stage.color}aa)`;
  E.detailsTitle.textContent = stage.description || 'Дії';
  
  const ratio = stage.duration > 0 ? (stageRem / stage.duration) : 1;
  const timerCol = ratio < 0.15 ? '#ff4444' : ratio < 0.25 ? '#ff9900' : '';
  E.detailsVal.textContent = stage.duration > 0 ? fmt(stageRem) : '—';
  E.detailsVal.style.color = timerCol;
  
  E.progFill.style.width = stage.duration > 0 ? `${(1 - ratio) * 100}%` : '100%';
  E.progFill.style.background = stage.color;
  
  // Actions Grid
  const refCol = eid('col-ref');
  const teamCol = eid('col-team');
  const refText = eid('ref-content');
  const teamText = eid('team-content');
  
  if (stage.refActions) {
    refCol.classList.remove('hidden');
    refText.textContent = stage.refActions;
  } else {
    refCol.classList.add('hidden');
  }
  
  if (stage.teamActions) {
    teamCol.classList.remove('hidden');
    teamText.textContent = stage.teamActions;
  } else {
    teamCol.classList.add('hidden');
  }
}

function renderList(fromIdx) {
  const list = E.stageList;
  const remaining = STAGES.slice(fromIdx);
  list.innerHTML = '';
  
  remaining.forEach((stage, i) => {
    const isCurr = (i === 0);
    const isChild = stage.type === 'C';
    const div = document.createElement('div');
    
    div.className = `si${isCurr ? ' si-current' : ''}${isChild ? ' si-child' : ''} si-entering`;
    div.id = `si-${fromIdx + i}`;
    
    const idLabel = stage.id.includes('.') ? stage.id : String(stage.id).padStart(2,'0');
    
    div.innerHTML = `
      <div class="si-indicator"></div>
      <div class="si-num">${idLabel}</div>
      <div class="si-bar" style="background:${stage.color}"></div>
      <div class="si-body">
        <div class="si-name">${stage.description || 'Дії'}</div>
        <div class="si-meta">Старт: ${fmt(stage.startSec)}&nbsp;&nbsp;·&nbsp;&nbsp;Тривалість: ${stage.duration > 0 ? fmt(stage.duration) : '—'}</div>
      </div>
      <div class="si-dur" id="si-dur-${fromIdx + i}">${stage.duration > 0 ? fmt(stage.duration) : '—'}</div>`;
    list.appendChild(div);
    setTimeout(() => div.classList.remove('si-entering'), 350);
  });
  
  const n = remaining.length;
  E.listCountBadge.textContent = `${n} ${n === 1 ? 'етап' : n < 5 ? 'етапи' : 'етапів'}`;
}

// ══════════════════════════════════════════════════════
//  TIMER LOOP
// ══════════════════════════════════════════════════════
function tick() {
  const T = getTotalRemaining();
  const idx = findStageIdx(T);

  if (idx !== curStageIdx) {
    curStageIdx = idx;
    renderList(idx);
    setArcStates(T);
  }

  updateDonutCenter(T);
  updateDetails(idx, T);
  updateConsumedArc(T);

  const stageRem = Math.max(0, T - (STAGES[idx + 1] ? STAGES[idx + 1].startSec : 0));
  const durEl = eid(`si-dur-${idx}`);
  if (durEl && STAGES[idx].duration > 0) durEl.textContent = fmt(stageRem);

  if (T <= 0) { handleFinish(); return; }
  if (isRunning) rafId = requestAnimationFrame(tick);
}

// ══════════════════════════════════════════════════════
//  CONTROLS & SERVER STATE SYNC
// ══════════════════════════════════════════════════════
async function saveState() {
  if (!sessionName) return;
  const state = { isRunning, startTs, elapsedAtPause, curStageIdx, isFinished };
  
  // Backup to local
  localStorage.setItem(`vtimer_${sessionName}`, JSON.stringify(state));
  
  // Sync to server
  try {
    const res = await fetch(`/api/sessions/${sessionName}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(state)
    });
    if (res.ok) {
      lastServerStateStr = JSON.stringify(state);
    }
  } catch(e) {
    console.error("Failed to sync to server", e);
  }
}

async function pollServer() {
  if (!sessionName) return;
  try {
    const res = await fetch(`/api/sessions/${sessionName}`);
    if (!res.ok) return;
    const state = await res.json();
    if (!state) return;
    
    const stateStr = JSON.stringify(state);
    if (stateStr !== lastServerStateStr) {
      lastServerStateStr = stateStr;
      
      isRunning = state.isRunning;
      startTs = state.startTs;
      elapsedAtPause = state.elapsedAtPause;
      curStageIdx = state.curStageIdx;
      isFinished = state.isFinished;
      
      restoreUI();
      if (isRunning && !rafId) {
        startTimer(false);
      } else if (isFinished) {
        handleFinish(false);
      } else if (!isRunning && rafId) {
        pauseTimer(false);
      }
    }
  } catch(e) {
    // network error, continue running locally
  }
}

function startTimer(isNewAction = true) {
  if (isFinished) return;
  isRunning = true;
  if (isNewAction) {
    startTs = Date.now();
    saveState();
  }
  setStatus('running');
  rafId = requestAnimationFrame(tick);
}

function pauseTimer(isNewAction = true) {
  isRunning = false;
  if (isNewAction) {
    elapsedAtPause = getElapsed();
    startTs = null;
    saveState();
  }
  if (rafId) { cancelAnimationFrame(rafId); rafId = null; }
  setStatus('paused');
}

function resetTimer(isNewAction = true) {
  pauseTimer(false);
  isFinished = false;
  elapsedAtPause = 0;
  startTs = null;
  curStageIdx = 0;
  
  if (isNewAction) saveState();

  setStatus('idle');
  E.matchOverlay.classList.remove('visible');
  E.dcTotalTime.style.color = '';
  E.dcStageTime.style.color = '';
  E.arcConsumed.setAttribute('stroke-dasharray', `0 ${C}`);

  setArcStates(TOTAL_SEC);
  renderList(0);
  updateDetails(0, TOTAL_SEC);
  updateDonutCenter(TOTAL_SEC);
}

function handleFinish(isNewAction = true) {
  isRunning = false;
  isFinished = true;
  if (rafId) { cancelAnimationFrame(rafId); rafId = null; }
  setStatus('finished');
  E.dcTotalTime.textContent = '00:00';
  E.dcTotalTime.style.color = '#ff4444';
  E.matchOverlay.classList.add('visible');
  
  if (isNewAction) saveState();
}

function setStatus(state) {
  const CFG = {
    idle:     { dot: '',         text: 'Очікування', icon: '&#9654;', lbl: 'Старт' },
    running:  { dot: 'running',  text: 'Активний',   icon: '&#9646;&#9646;', lbl: 'Пауза' },
    paused:   { dot: 'paused',   text: 'Пауза',      icon: '&#9654;', lbl: 'Продовжити' },
    finished: { dot: 'finished', text: 'Матч розпочато', icon: '&#10003;', lbl: 'Завершено' },
  };
  const c = CFG[state] || CFG.idle;
  E.statusDot.className = `status-dot ${c.dot}`.trim();
  E.statusText.textContent = c.text;
  E.btnPlayIcon.innerHTML = c.icon;
  E.btnPlayLabel.textContent = c.lbl;
}

function restoreUI() {
  const T = getTotalRemaining();
  const idx = findStageIdx(T);
  curStageIdx = idx;
  setArcStates(T);
  renderList(idx);
  
  if (T <= 0) {
    handleFinish(false);
  } else {
    updateDonutCenter(T);
    updateDetails(idx, T);
    updateConsumedArc(T);
  }
}

// ══════════════════════════════════════════════════════
//  SESSIONS & THEME INIT
// ══════════════════════════════════════════════════════
async function initSession() {
  const modal = eid('session-modal');
  const input = eid('session-input');
  const btnValidate = eid('btn-validate');
  const btnStart = eid('btn-start-session');
  const err = eid('session-error');
  const listCont = eid('active-sessions-list');
  const stepAuth = eid('step-auth');
  const stepChoose = eid('step-choose');
  
  const activeSession = sessionStorage.getItem('activeSessionName');
  if (activeSession) {
    modal.style.display = 'none';
    loadSession(activeSession, false);
    return;
  }

  let validatedName = "";

  btnValidate.addEventListener('click', async () => {
    const name = input.value.trim().toLowerCase();
    
    // Secure server-side authentication
    try {
      const authRes = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: name })
      });
      const authData = await authRes.json();
      
      if (!authData.valid) {
        err.textContent = 'Помилка: Користувач не знайдений у списку дозволених.';
        err.style.display = 'block';
        return;
      }
    } catch (e) {
      err.textContent = 'Помилка з\'єднання з сервером авторизації.';
      err.style.display = 'block';
      return;
    }
    
    validatedName = name;
    err.style.display = 'none';
    
    // Switch UI to Step 2
    stepAuth.style.display = 'none';
    stepChoose.style.display = 'block';
    
    // Fetch the user's own active session from server
    try {
      const res = await fetch(`/api/sessions/${validatedName}`);
      if (res.ok) {
        const state = await res.json();
        if (state) {
          listCont.innerHTML = '<p style="font-size:13px; color:var(--text-sec); margin-bottom:8px;">Ваша активна сесія:</p>';
          const b = document.createElement('button');
          b.className = 'btn btn-ghost';
          b.style.width = '100%';
          b.style.justifyContent = 'center';
          b.textContent = `Приєднатися до '${validatedName}'`;
          b.onclick = () => {
            sessionStorage.setItem('activeSessionName', validatedName);
            modal.style.display = 'none';
            loadSession(validatedName, false);
          };
          listCont.appendChild(b);
        } else {
          listCont.innerHTML = '<p style="font-size:13px; color:var(--text-muted);">Немає активних сесій для вашого користувача.</p>';
        }
      }
    } catch(e) {
      listCont.innerHTML = '<p style="font-size:13px; color:#ff4444;">Помилка підключення до сервера (тільки локальний режим).</p>';
    }
  });

  input.addEventListener('keydown', e => {
    if (e.key === 'Enter') btnValidate.click();
    err.style.display = 'none';
  });

  btnStart.addEventListener('click', () => {
    sessionStorage.setItem('activeSessionName', validatedName);
    modal.style.display = 'none';
    // Start a completely new session (overwriting server if it exists)
    loadSession(validatedName, true);
  });
}

function loadSession(name, forceReset) {
  sessionName = name;
  
  if (forceReset) {
    resetTimer(true);
    return;
  }
  
  // Try server
  fetch(`/api/sessions/${sessionName}`)
    .then(r => r.json())
    .then(state => {
      if (state) applyState(state);
      else loadLocalFallback();
    })
    .catch(() => loadLocalFallback());
}

function loadLocalFallback() {
  const raw = localStorage.getItem(`vtimer_${sessionName}`);
  if (raw) {
    try { applyState(JSON.parse(raw)); } 
    catch(e) { console.error(e); }
  }
}

function applyState(state) {
  lastServerStateStr = JSON.stringify(state);
  isRunning = state.isRunning;
  startTs = state.startTs;
  elapsedAtPause = state.elapsedAtPause;
  curStageIdx = state.curStageIdx;
  isFinished = state.isFinished;
  
  restoreUI();
  if (isRunning) {
    startTimer(false); 
  } else if (isFinished) {
    handleFinish(false);
  } else {
    pauseTimer(false); 
  }
}

function initTheme() {
  const themeBtn = eid('btn-theme');
  const icon = eid('theme-icon');
  
  const savedTheme = localStorage.getItem('vtimer_theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
  icon.innerHTML = savedTheme === 'dark' ? '☀️' : '🌙';

  themeBtn.addEventListener('click', () => {
    const curr = document.documentElement.getAttribute('data-theme');
    const next = curr === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('vtimer_theme', next);
    icon.innerHTML = next === 'dark' ? '☀️' : '🌙';
  });
}

// ══════════════════════════════════════════════════════
//  INIT
// ══════════════════════════════════════════════════════
function init() {
  E = {
    statusDot:      eid('status-dot'),
    statusText:     eid('status-text'),
    btnPlay:        eid('btn-play'),
    btnPlayIcon:    eid('btn-play-icon'),
    btnPlayLabel:   eid('btn-play-label'),
    btnReset:       eid('btn-reset'),
    btnDismiss:     eid('btn-dismiss'),
    dcTotalTime:    eid('dc-total-time'),
    dcStageTime:    eid('dc-stage-time'),
    dcStageName:    eid('dc-stage-name'),
    detailsBadge:   eid('details-badge'),
    detailsTitle:   eid('details-title'),
    detailsVal:     eid('details-countdown-val'),
    progFill:       eid('prog-fill'),
    stageList:      eid('stage-list'),
    listCountBadge: eid('list-count-badge'),
    stageArcs:      eid('stage-arcs'),
    arcConsumed:    eid('arc-consumed'),
    tickMarks:      eid('tick-marks'),
    matchOverlay:   eid('match-overlay'),
  };

  buildDonut();
  setArcStates(TOTAL_SEC);
  renderList(0);
  updateDetails(0, TOTAL_SEC);
  updateDonutCenter(TOTAL_SEC);
  setStatus('idle');

  initTheme();
  initSession();

  // Poll server every 1.5 seconds for cross-browser sync
  setInterval(pollServer, 1500);

  E.btnPlay.addEventListener('click', () => {
    if (isFinished) return;
    isRunning ? pauseTimer(true) : startTimer(true);
  });
  E.btnReset.addEventListener('click', () => resetTimer(true));
  E.btnDismiss.addEventListener('click', () => {
    E.matchOverlay.classList.remove('visible');
    E.matchOverlay.setAttribute('aria-hidden', 'true');
  });

  document.addEventListener('keydown', e => {
    if (e.target.tagName === 'BUTTON' || e.target.tagName === 'INPUT') return;
    if (e.code === 'Space') {
      e.preventDefault();
      if (!isFinished) isRunning ? pauseTimer(true) : startTimer(true);
    } else if (e.code === 'KeyR') {
      resetTimer(true);
    }
  });
}

document.addEventListener('DOMContentLoaded', init);
