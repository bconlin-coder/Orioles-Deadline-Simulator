const baseline = { y2026: 48, y2027: 61, y2028: 66 };
const trades = [
  {
    "city": "Seattle",
    "team": "Seattle Mariners",
    "player": "Taylor Ward",
    "type": "Sell",
    "time": "July 30 · 9:12 a.m.",
    "about": "Taylor Ward is a 32-year-old Orioles corner outfielder and designated hitter. He provides on-base ability and middle-of-the-order experience, but he is eligible for free agency after the season.",
    "offer": [
      "Seattle’s No. 11 prospect, a Double-A right-hander projected as a possible back-end starter",
      "A lower-level middle infielder with offensive upside"
    ],
    "hard": "Trading Ward weakens Baltimore’s lineup during a playoff race. Keeping him preserves an established bat, but the Orioles could lose him after the season without receiving this prospect package.",
    "question": "Do you turn a current Orioles regular into future pitching depth?",
    "yes": "Trade Ward",
    "no": "Keep Ward",
    "yesImpact": [
      -6,
      5,
      7
    ],
    "noImpact": [
      4,
      -2,
      -3
    ]
  },
  {
    "city": "Miami",
    "team": "Miami Marlins",
    "player": "Anthony Bender",
    "type": "Buy",
    "time": "July 30 · 11:46 a.m.",
    "about": "Anthony Bender is a Marlins right-handed reliever with a power sinker and a history of generating ground balls. Unlike many deadline bullpen options, he remains under club control through 2027.",
    "offer": [
      "Baltimore’s No. 7 prospect, a High-A position player with everyday upside",
      "A young relief prospect"
    ],
    "hard": "Bender could help in two playoff races, but relievers are volatile. Baltimore would surrender a meaningful position-player prospect for a pitcher who might work only one inning at a time.",
    "question": "Do you pay a premium for a controllable late-inning arm?",
    "yes": "Acquire Bender",
    "no": "Decline the deal",
    "yesImpact": [
      6,
      5,
      -5
    ],
    "noImpact": [
      -2,
      -2,
      4
    ]
  },
  {
    "city": "Detroit",
    "team": "Detroit Tigers",
    "player": "Tarik Skubal",
    "type": "Blockbuster",
    "time": "July 31 · 8:03 a.m.",
    "about": "Tarik Skubal is the Tigers’ ace and one of baseball’s best starting pitchers. He would immediately become Baltimore’s Game 1 starter in a postseason series, but he can become a free agent after the season.",
    "offer": [
      "Jackson Holliday",
      "Baltimore’s No. 4 prospect",
      "An MLB-ready young starting pitcher"
    ],
    "hard": "No player in this game raises Baltimore’s immediate ceiling more. No deal costs more future value, either.",
    "question": "Do you sacrifice a major portion of the young core for one run with an ace?",
    "yes": "Go all in for Skubal",
    "no": "Reject the price",
    "yesImpact": [
      18,
      -15,
      -18
    ],
    "noImpact": [
      -5,
      8,
      10
    ]
  },
  {
    "city": "Los Angeles",
    "team": "Los Angeles Dodgers",
    "player": "Andrew Kittredge",
    "type": "Sell",
    "time": "July 31 · 1:28 p.m.",
    "about": "Andrew Kittredge is a veteran Orioles reliever who can handle setup and occasional save situations. He is eligible for free agency after the season.",
    "offer": [
      "A Double-A starter with a chance to become a No. 5 starter",
      "A teenage outfielder with tools and significant development risk"
    ],
    "hard": "Kittredge helps Baltimore’s bullpen today. The offered players are unlikely to help immediately, but they could prevent another veteran from leaving without a return.",
    "question": "Do you sell a trusted Orioles reliever while the team is still contending?",
    "yes": "Trade Kittredge",
    "no": "Keep Kittredge",
    "yesImpact": [
      -4,
      4,
      6
    ],
    "noImpact": [
      3,
      -2,
      -3
    ]
  },
  {
    "city": "Anaheim",
    "team": "Los Angeles Angels",
    "player": "Reid Detmers",
    "type": "Buy",
    "time": "Aug. 1 · 10:17 a.m.",
    "about": "Reid Detmers is a 27-year-old Angels left-handed starter with swing-and-miss ability and an uneven major league track record. Baltimore would control him through 2028.",
    "offer": [
      "Baltimore’s No. 3 prospect",
      "A second prospect ranked in the organization’s top 15"
    ],
    "hard": "Detmers offers three playoff races of rotation upside, but he is not a guaranteed ace. The Orioles would be paying for years of control as much as current performance.",
    "question": "Do you trade two strong prospects for a controllable starter?",
    "yes": "Acquire Detmers",
    "no": "Keep the prospects",
    "yesImpact": [
      6,
      9,
      6
    ],
    "noImpact": [
      -3,
      -4,
      7
    ]
  },
  {
    "city": "Texas",
    "team": "Texas Rangers",
    "player": "Adley Rutschman",
    "type": "Blockbuster",
    "time": "Aug. 2 · 5:41 p.m.",
    "about": "Adley Rutschman is the Orioles’ starting catcher, a former No. 1 overall pick and one of the faces of the franchise. Baltimore controls him through 2027. Samuel Basallo gives the organization another possible long-term answer behind the plate.",
    "offer": [
      "A consensus top-40 overall prospect who is nearly major league ready",
      "A young MLB starting pitcher with five years of team control",
      "A lower-level catching prospect with everyday upside"
    ],
    "hard": "Trading Rutschman could replenish the roster before he approaches free agency. It could also become one of the most regrettable moves in franchise history if he returns to star form.",
    "question": "Do you trade a franchise cornerstone before his value or team control declines?",
    "yes": "Trade Rutschman",
    "no": "Keep Rutschman",
    "yesImpact": [
      -8,
      -3,
      15
    ],
    "noImpact": [
      5,
      7,
      -8
    ]
  }
];

const app = document.getElementById("app");
const score2026 = document.getElementById("score-2026");
const score2027 = document.getElementById("score-2027");
const score2028 = document.getElementById("score-2028");
const bar2026 = document.getElementById("bar-2026");
const bar2027 = document.getElementById("bar-2027");
const bar2028 = document.getElementById("bar-2028");

const state = {
  index: 0,
  outlook: { ...baseline },
  answers: [],
  pending: null,
  callAnswered: false
};

const clamp = value => Math.max(5, Math.min(95, value));
const signed = value => value > 0 ? `+${value}` : `${value}`;

function updateScoreboard() {
  const y26 = clamp(state.outlook.y2026);
  const y27 = clamp(state.outlook.y2027);
  const y28 = clamp(state.outlook.y2028);

  score2026.textContent = `${y26}%`;
  score2027.textContent = `${y27}%`;
  score2028.textContent = `${y28}%`;

  bar2026.style.width = `${y26}%`;
  bar2027.style.width = `${y27}%`;
  bar2028.style.width = `${y28}%`;
}

function topProgress() {
  const complete = Math.round((state.index / trades.length) * 100);
  return `
    <div class="progress-row">
      <span>Decision ${state.index + 1} of ${trades.length}</span>
      <span>${complete}% complete</span>
    </div>
    <div class="progress"><span style="width:${complete}%"></span></div>
  `;
}

function renderIncomingCall() {
  updateScoreboard();
  const trade = trades[state.index];
  state.callAnswered = false;

  app.innerHTML = `
    ${topProgress()}
    <section class="call-screen">
      <div class="call-ring" aria-hidden="true">☎</div>
      <div class="call-label">Incoming trade call</div>
      <h2 class="call-city">${trade.city}</h2>
      <p class="call-sub">${trade.city} is calling.</p>
      <button class="answer-call" type="button">Answer call</button>
    </section>
  `;

  app.querySelector(".answer-call").addEventListener("click", renderDecision);
}

function renderDecision() {
  const trade = trades[state.index];
  state.callAnswered = true;
  const offerMarkup = trade.offer.map(item => `<li>${item}</li>`).join("");

  app.innerHTML = `
    ${topProgress()}
    <article>
      <div class="call-strip">
        <span class="trade-tag ${trade.type.toLowerCase()}">${trade.type}</span>
        <span class="timestamp">${trade.time}</span>
        <span class="call-status">☎ Call connected</span>
      </div>

      <h2 class="player-name">${trade.player}</h2>
      <p class="team-line">${trade.city} is calling.</p>

      <section class="info-block">
        <h3>What you need to know</h3>
        <p>${trade.about}</p>
      </section>

      <section class="info-block">
        <h3>The offer</h3>
        <ul class="offer-list">${offerMarkup}</ul>
      </section>

      <aside class="hard-call">
        <strong>Why this is hard</strong>
        <span>${trade.hard}</span>
      </aside>

      <p class="question">${trade.question}</p>

      <div class="choice-grid">
        <button class="choice primary" type="button" data-choice="yes">${trade.yes}</button>
        <button class="choice" type="button" data-choice="no">${trade.no}</button>
      </div>

      <div class="reaction" id="reaction"></div>
    </article>
  `;

  app.querySelectorAll("[data-choice]").forEach(button => {
    button.addEventListener("click", () => previewChoice(button.dataset.choice));
  });
}

function previewChoice(choice) {
  if (state.pending) return;

  const trade = trades[state.index];
  const impactArray = choice === "yes" ? trade.yesImpact : trade.noImpact;
  const impact = { y2026: impactArray[0], y2027: impactArray[1], y2028: impactArray[2] };
  state.pending = { choice, impact };

  app.querySelectorAll("[data-choice]").forEach(button => button.disabled = true);

  const reaction = document.getElementById("reaction");
  reaction.classList.add("visible");
  reaction.innerHTML = `
    <strong>Your decision: ${choice === "yes" ? trade.yes : trade.no}</strong>
    <div>${choice === "yes"
      ? "You accepted the offer and reshaped Baltimore’s roster."
      : "You declined the offer and kept the current plan intact."}</div>
    <div class="impact-line">
      Outlook change:
      2026 ${signed(impact.y2026)} ·
      2027 ${signed(impact.y2027)} ·
      2028 ${signed(impact.y2028)}
    </div>
    <button class="next" type="button">
      ${state.index === trades.length - 1 ? "See your final report" : "Take the next call"}
    </button>
  `;

  reaction.querySelector(".next").addEventListener("click", commitChoice);
}

function commitChoice() {
  const trade = trades[state.index];
  const { choice, impact } = state.pending;

  Object.keys(state.outlook).forEach(year => {
    state.outlook[year] += impact[year];
  });

  state.answers.push({
    player: trade.player,
    decision: choice === "yes" ? trade.yes : trade.no,
    impact
  });

  state.index += 1;
  state.pending = null;

  if (state.index < trades.length) {
    renderIncomingCall();
  } else {
    renderResults();
  }

  window.scrollTo({ top: 0, behavior: "smooth" });
}

function grade(value) {
  if (value >= 82) return "A";
  if (value >= 72) return "B";
  if (value >= 60) return "C";
  if (value >= 48) return "D";
  return "F";
}

function getProfile() {
  const now = state.outlook.y2026;
  const future = (state.outlook.y2027 + state.outlook.y2028) / 2;

  if (now >= 67 && future < 57) {
    return {
      name: "All-In Contender",
      copy: "You pushed hard for 2026 and accepted a thinner future. The roster is more dangerous now, but your margin for error later is smaller."
    };
  }

  if (now <= 44 && future >= 70) {
    return {
      name: "Long-Term Builder",
      copy: "You protected and expanded the future at the expense of the current run. Your deadline requires patience, but it could age well."
    };
  }

  return {
    name: "Balanced Operator",
    copy: "You tried to improve the present without stripping the organization. You did not maximize one window, but you preserved multiple paths forward."
  };
}

function renderYear(year, key, note) {
  const items = state.answers.map(answer => {
    const delta = answer.impact[key];
    const cls = delta >= 0 ? "positive" : "negative";
    return `
      <li>
        <span class="impact-player">${answer.player}</span>
        <span>${answer.decision}</span>
        <span class="delta ${cls}">${signed(delta)}</span>
      </li>
    `;
  }).join("");

  return `
    <h3 class="section-title">${year} outlook</h3>
    <p class="year-note">${note}</p>
    <ul class="impact-list">${items}</ul>
  `;
}

function renderResults() {
  updateScoreboard();
  const profile = getProfile();

  const aggressiveness = clamp(50 + state.answers.reduce((sum, a) => sum + Math.abs(a.impact.y2026), 0));
  const presentGrade = grade(clamp(state.outlook.y2026));
  const rosterGrade = grade(clamp(state.outlook.y2027));
  const futureGrade = grade(clamp(state.outlook.y2028));
  const riskGrade = grade(100 - Math.min(95, aggressiveness));

  const decisions = state.answers.map(answer => `
    <li><span>${answer.player}</span><strong>${answer.decision}</strong></li>
  `).join("");

  app.innerHTML = `
    <header class="results-header">
      <div class="results-kicker">Deadline complete</div>
      <h2 class="results-title">Your GM report</h2>
      <div class="personality">${profile.name}</div>
      <p>${profile.copy}</p>
    </header>

    <section class="report-grid" aria-label="Final grades">
      <article class="report-card">
        <span class="report-label">2026</span>
        <strong class="report-grade">${presentGrade}</strong>
      </article>
      <article class="report-card">
        <span class="report-label">2027</span>
        <strong class="report-grade">${rosterGrade}</strong>
      </article>
      <article class="report-card">
        <span class="report-label">2028</span>
        <strong class="report-grade">${futureGrade}</strong>
      </article>
      <article class="report-card">
        <span class="report-label">Risk control</span>
        <strong class="report-grade">${riskGrade}</strong>
      </article>
    </section>

    <h3 class="section-title">Your six decisions</h3>
    <ul class="decision-list">${decisions}</ul>

    ${renderYear("2026", "y2026", "Immediate roster strength and playoff value.")}
    ${renderYear("2027", "y2027", "Next season’s roster and near-term control.")}
    ${renderYear("2028", "y2028", "Long-term depth, control and flexibility.")}

    <button class="restart" type="button">Play again</button>
  `;

  app.querySelector(".restart").addEventListener("click", restartGame);
}

function restartGame() {
  state.index = 0;
  state.outlook = { ...baseline };
  state.answers = [];
  state.pending = null;
  renderIncomingCall();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

renderIncomingCall();
