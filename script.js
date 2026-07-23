const FALLBACK = { wins: 50, losses: 53 };
const ORIOLES_TEAM_ID = 110;
const SEASON = 2026;
const SIMULATIONS = 10000;

/*
  rosWar values are FanGraphs Depth Charts rest-of-season WAR as accessed
  July 23, 2026. Taylor Ward's 1.0 value is derived from FanGraphs'
  projected full-season WAR minus his year-to-date WAR.
*/
const calls = [
  {
    city: "Minnesota",
    player: "Joe Ryan",
    type: "Buy",
    time: "July 29 · 10:18 a.m.",
    about: "Ryan would give Baltimore a dependable, high-strikeout starter for the stretch run. FanGraphs Depth Charts projects him for 1.3 WAR over the rest of the season.",
    offer: [
      "Orioles receive RHP Joe Ryan",
      "Twins receive an MLB-ready young player and two prospects"
    ],
    hard: "Ryan is one of the better starters plausibly available, so Minnesota can demand both immediate help and prospect value.",
    question: "Do you pay a premium for a frontline starter?",
    accept: "Acquire Ryan",
    decline: "Pass on Ryan",
    rosWar: 1.3,
    acceptedSummary: "Acquired Joe Ryan",
    declinedSummary: "Declined Minnesota’s price for Joe Ryan"
  },
  {
    city: "Los Angeles",
    player: "Reid Detmers",
    type: "Buy",
    time: "July 29 · 3:42 p.m.",
    about: "Detmers is a controllable left-handed starter with bat-missing ability and an uneven track record. FanGraphs Depth Charts projects roughly 1.1 WAR over the rest of the season.",
    offer: [
      "Orioles receive LHP Reid Detmers",
      "Angels receive two prospects ranked among Baltimore’s top 15"
    ],
    hard: "The Orioles would be buying upside and control rather than certainty. The prospect price reflects the years beyond 2026.",
    question: "Do you bet on Detmers’ upside?",
    accept: "Acquire Detmers",
    decline: "Keep the prospects",
    rosWar: 1.1,
    acceptedSummary: "Acquired Reid Detmers",
    declinedSummary: "Passed on Reid Detmers"
  },
  {
    city: "San Diego",
    player: "Mason Miller",
    type: "Blockbuster",
    time: "July 30 · 8:06 a.m.",
    about: "Miller is an elite late-inning weapon with premium velocity and multiple years of control. FanGraphs Depth Charts projects 1.1 rest-of-season WAR.",
    offer: [
      "Orioles receive RHP Mason Miller",
      "Padres receive a top-five Orioles prospect, a second top-15 prospect and a young major leaguer"
    ],
    hard: "No reliever on the board offers more impact, but the acquisition price is closer to the cost of a controllable starter than a typical bullpen rental.",
    question: "Do you make a blockbuster move for an elite closer?",
    accept: "Acquire Miller",
    decline: "Reject the price",
    rosWar: 1.1,
    acceptedSummary: "Went all in for Mason Miller",
    declinedSummary: "Refused San Diego’s blockbuster demand"
  },
  {
    city: "Seattle",
    player: "Taylor Ward",
    type: "Sell",
    time: "July 30 · 1:19 p.m.",
    about: "Seattle wants Ward’s on-base ability and middle-of-the-order experience. FanGraphs’ full-season and year-to-date figures imply about 1.0 WAR of remaining value.",
    offer: [
      "Mariners receive OF/DH Taylor Ward",
      "Orioles receive a Double-A starting pitcher and a high-upside infield prospect"
    ],
    hard: "Trading Ward would replenish the system but remove one of Baltimore’s better projected hitters from a club still chasing October.",
    question: "Do you sell a productive hitter during the playoff race?",
    accept: "Trade Ward",
    decline: "Keep Ward",
    rosWar: -1.0,
    acceptedSummary: "Traded Taylor Ward for two prospects",
    declinedSummary: "Kept Taylor Ward for the playoff push"
  },
  {
    city: "Boston",
    player: "Aroldis Chapman",
    type: "Buy",
    time: "July 31 · 10:37 a.m.",
    about: "Chapman remains a high-leverage left-hander with swing-and-miss stuff. FanGraphs Depth Charts projects 0.6 WAR over the rest of the season.",
    offer: [
      "Orioles receive LHP Aroldis Chapman",
      "Red Sox receive a near-major-league position prospect"
    ],
    hard: "The on-field upgrade is real, but making a deadline deal inside the division raises the price and the scrutiny.",
    question: "Do you strengthen the bullpen through an AL East rival?",
    accept: "Acquire Chapman",
    decline: "End talks",
    rosWar: 0.6,
    acceptedSummary: "Acquired Aroldis Chapman",
    declinedSummary: "Passed on Aroldis Chapman"
  },
  {
    city: "Cincinnati",
    player: "Eugenio Suárez",
    type: "Buy",
    time: "July 31 · 5:54 p.m.",
    about: "Suárez offers right-handed power but has struggled overall in 2026. FanGraphs Depth Charts projects 0.3 WAR over the rest of the season.",
    offer: [
      "Orioles receive 3B Eugenio Suárez",
      "Reds receive a Double-A pitcher and salary relief"
    ],
    hard: "The acquisition cost is manageable, but the projected upgrade is modest and his contact and defensive limitations create downside.",
    question: "Do you make one final move for a power bat?",
    accept: "Acquire Suárez",
    decline: "Stand pat",
    rosWar: 0.3,
    acceptedSummary: "Added Eugenio Suárez",
    declinedSummary: "Passed on Eugenio Suárez"
  }
];

const state = {
  index: 0,
  record: { ...FALLBACK },
  answers: [],
  started: false
};

const app = document.getElementById("app");
const recordEl = document.getElementById("record");
const remainingEl = document.getElementById("remaining");
const approachEl = document.getElementById("approach");
const dataStatusEl = document.getElementById("data-status");

function gamesRemaining() {
  return Math.max(0, 162 - state.record.wins - state.record.losses);
}

function updateHeader() {
  recordEl.textContent = `${state.record.wins}-${state.record.losses}`;
  remainingEl.textContent = gamesRemaining();

  const accepted = state.answers.filter(a => a.accepted);
  const war = accepted.reduce((sum, a) => sum + a.call.rosWar, 0);

  let approach = "Undecided";
  if (state.answers.length) {
    if (war >= 3.0) approach = "All-in buyer";
    else if (war >= 1.0) approach = "Aggressive buyer";
    else if (war > 0.15) approach = "Measured buyer";
    else if (war < -0.2) approach = "Deadline seller";
    else approach = "Mostly stood pat";
  }
  approachEl.textContent = approach;
}

async function loadLiveRecord() {
  const url = `https://statsapi.mlb.com/api/v1/standings?leagueId=103&season=${SEASON}&standingsTypes=regularSeason`;
  try {
    const response = await fetch(url, { cache: "no-store" });
    if (!response.ok) throw new Error("MLB data request failed");
    const data = await response.json();

    let found = null;
    for (const recordGroup of data.records || []) {
      for (const teamRecord of recordGroup.teamRecords || []) {
        if (teamRecord.team && teamRecord.team.id === ORIOLES_TEAM_ID) {
          found = {
            wins: Number(teamRecord.wins),
            losses: Number(teamRecord.losses)
          };
        }
      }
    }

    if (!found || !Number.isFinite(found.wins) || !Number.isFinite(found.losses)) {
      throw new Error("Orioles record not found");
    }

    state.record = found;
    const stamp = new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit"
    }).format(new Date());

    dataStatusEl.textContent = `Record updated from MLB data: ${stamp}.`;
  } catch (error) {
    state.record = { ...FALLBACK };
    dataStatusEl.textContent = "Live record unavailable. Using the saved 50-53 record.";
  }
  updateHeader();
  if (!state.started) renderStart();
}

function progressMarkup() {
  const pct = Math.round((state.index / calls.length) * 100);
  return `
    <div class="progress-row">
      <span>Call ${Math.min(state.index + 1, calls.length)} of ${calls.length}</span>
      <span>${pct}% complete</span>
    </div>
    <div class="progress"><span style="width:${pct}%"></span></div>
  `;
}

function renderStart() {
  const remaining = gamesRemaining();
  app.innerHTML = `
    <section class="start-screen">
      <div class="call-label">Your assignment</div>
      <h2>Build a playoff team</h2>
      <p>The Orioles are <strong>${state.record.wins}-${state.record.losses}</strong> with <strong>${remaining} games remaining</strong>. The postseason is within reach, but the club needs help. Take six calls and decide how much of the future you are willing to spend on 2026.</p>
      <button class="primary" id="start-btn" type="button">Enter the deadline room</button>
    </section>
  `;
  document.getElementById("start-btn").addEventListener("click", () => {
    state.started = true;
    renderIncoming();
  });
}

function renderIncoming() {
  updateHeader();
  const call = calls[state.index];
  app.innerHTML = `
    ${progressMarkup()}
    <section class="call-screen">
      <div class="call-icon" aria-hidden="true">☎</div>
      <div class="call-label">Incoming trade call</div>
      <h2>${call.city}</h2>
      <p>${call.city} is calling.</p>
      <button class="primary" id="answer-btn" type="button">Answer call</button>
    </section>
  `;
  document.getElementById("answer-btn").addEventListener("click", renderDecision);
}

function renderDecision() {
  const call = calls[state.index];
  app.innerHTML = `
    ${progressMarkup()}
    <article>
      <div class="call-strip">
        <span class="trade-tag ${call.type.toLowerCase()}">${call.type}</span>
        <span class="timestamp">${call.time}</span>
        <span class="call-status">☎ Call connected</span>
      </div>

      <h2 class="player-name">${call.player}</h2>
      <p class="team-line">${call.city} is calling.</p>

      <div class="info-grid">
        <section class="info-block">
          <h3>What you need to know</h3>
          <p>${call.about}</p>
        </section>
        <section class="info-block">
          <h3>The offer</h3>
          <ul class="offer-list">${call.offer.map(item => `<li>${item}</li>`).join("")}</ul>
        </section>
      </div>

      <aside class="hard-call">
        <strong>Why this is hard</strong>
        ${call.hard}
      </aside>

      <p class="question">${call.question}</p>

      <div class="choice-grid">
        <button class="choice accept" data-accepted="true" type="button">
          ${call.accept}
          <span class="choice-note">Approve the proposed transaction</span>
        </button>
        <button class="choice" data-accepted="false" type="button">
          ${call.decline}
          <span class="choice-note">Leave the current roster unchanged</span>
        </button>
      </div>
    </article>
  `;

  app.querySelectorAll(".choice").forEach(button => {
    button.addEventListener("click", () => choose(button.dataset.accepted === "true"));
  });
}

function choose(accepted) {
  state.answers.push({ call: calls[state.index], accepted });
  state.index += 1;
  updateHeader();

  if (state.index < calls.length) renderIncoming();
  else renderRecap();
}

function renderRecap() {
  const items = state.answers.map(({ call, accepted }) => `
    <li><b>${accepted ? "DEAL" : "NO DEAL"}</b> — ${accepted ? call.acceptedSummary : call.declinedSummary}</li>
  `).join("");

  app.innerHTML = `
    <section>
      <div class="call-label">The deadline has passed</div>
      <h2 class="player-name">Your deadline moves</h2>
      <p class="team-line">The phones are quiet. Now the season has to play out.</p>
      <div class="recap">
        <h3>Transaction log</h3>
        <ul>${items}</ul>
      </div>
      <div class="actions">
        <button class="primary" id="simulate-btn" type="button">Simulate the rest of the season</button>
      </div>
    </section>
  `;
  document.getElementById("simulate-btn").addEventListener("click", startSimulation);
}

function randomNormal() {
  let u = 0, v = 0;
  while (u === 0) u = Math.random();
  while (v === 0) v = Math.random();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}

function binomial(n, p) {
  let wins = 0;
  for (let i = 0; i < n; i++) {
    if (Math.random() < p) wins++;
  }
  return wins;
}

function calculateModel() {
  const accepted = state.answers.filter(a => a.accepted);
  const netWar = accepted.reduce((sum, a) => sum + a.call.rosWar, 0);
  const remaining = gamesRemaining();
  const gamesPlayed = state.record.wins + state.record.losses;

  // FanGraphs Depth Charts projected Baltimore for a .504 rest-of-season
  // winning percentage on July 23, 2026. One projected WAR is treated as
  // approximately one additional win over the remaining schedule.
  const baselinePct = .504;
  const adjustedPct = Math.max(.30, Math.min(.70, baselinePct + (netWar / Math.max(1, remaining))));

  const totals = [];
  let playoffCount = 0;

  for (let i = 0; i < SIMULATIONS; i++) {
    const seasonVariance = randomNormal() * .012;
    const p = Math.max(.28, Math.min(.72, adjustedPct + seasonVariance));
    const restWins = binomial(remaining, p);
    const finalWins = state.record.wins + restWins;

    // The cut-line distribution is calibrated so the no-trade model is close
    // to FanGraphs' 24.8% Orioles playoff probability on July 23, 2026.
    const cutoff = Math.round(83.1 + randomNormal() * 1.8);
    const madePlayoffs = finalWins >= cutoff;

    totals.push(finalWins);
    if (madePlayoffs) playoffCount++;
  }

  totals.sort((a, b) => a - b);
  const averageWins = totals.reduce((a, b) => a + b, 0) / totals.length;
  const medianWins = totals[Math.floor(totals.length / 2)];
  const playoffPct = Math.round((playoffCount / SIMULATIONS) * 100);

  // Pick a single representative playthrough close to the median, with modest randomness.
  const targetIndex = Math.max(0, Math.min(totals.length - 1,
    Math.floor(totals.length * (.42 + Math.random() * .16))
  ));
  const yourWins = totals[targetIndex];
  const yourLosses = 162 - yourWins;

  return { netWar, averageWins, medianWins, playoffPct, yourWins, yourLosses };
}

function startSimulation() {
  app.innerHTML = `
    <section class="sim-screen">
      <div class="call-label">Running the model</div>
      <h2>Simulating 10,000 seasons</h2>
      <div class="sim-dots" aria-hidden="true"><span></span><span></span><span></span></div>
      <p>Applying your deadline moves to the Orioles’ rest-of-season outlook…</p>
    </section>
  `;
  setTimeout(() => renderResults(calculateModel()), 1050);
}


function philosophy(model) {
  if (model.netWar >= 3.0) return "October or Bust";
  if (model.netWar >= 1.2) return "Aggressive Buyer";
  if (model.netWar >= .35) return "Measured Buyer";
  if (model.netWar < -.2) return "Deadline Seller";
  return "Cautious Operator";
}

function outcomeFor(wins, playoffPct) {
  if (wins >= 92) return "Won the AL East and reached October";
  if (wins >= 87) return "Claimed an American League wild-card berth";
  if (wins >= 85 && playoffPct >= 45) return "Survived the bubble and reached the postseason";
  if (wins >= 83) return "Stayed alive until the final week but missed October";
  return "Fell short of the postseason";
}

function biggestMove() {
  const accepted = state.answers.filter(a => a.accepted);
  if (!accepted.length) return {
    title: "Standing pat",
    text: "You declined every proposal and asked the current roster to save the season without outside help."
  };
  const best = [...accepted].sort((a, b) => b.call.rosWar - a.call.rosWar)[0];
  return {
    title: best.call.player,
    text: `${best.call.acceptedSummary}. In the prototype model, this was your largest rest-of-season upgrade.`
  };
}

function biggestRisk() {
  const wardDeal = state.answers.find(a => a.call.player === "Taylor Ward" && a.accepted);
  if (wardDeal) {
    return {
      title: "Selling while contending",
      text: "Trading Taylor Ward removed the largest amount of projected 2026 value from your roster."
    };
  }
  const declined = state.answers.filter(a => !a.accepted).sort((a, b) => b.call.rosWar - a.call.rosWar)[0];
  if (declined && declined.call.rosWar > 0) {
    return {
      title: `Passing on ${declined.call.player}`,
      text: `You declined the largest projected upgrade left on the board: ${declined.call.rosWar.toFixed(1)} rest-of-season WAR.`
    };
  }
  return {
    title: "Paying the deadline premium",
    text: "You accepted every major upgrade and assumed the long-term cost embedded in the hypothetical trade packages."
  };
}

function renderResults(model) {
  const made = model.yourWins >= 86;
  const move = biggestMove();
  const risk = biggestRisk();

  app.innerHTML = `
    <section class="results">
      <div class="result-hero">
        <div class="kicker">Your simulated season</div>
        <div class="result-record">${model.yourWins}-${model.yourLosses}</div>
        <p class="result-outcome">${made ? "✓" : "—"} ${outcomeFor(model.yourWins, model.playoffPct)}</p>
      </div>

      <div class="result-grid">
        <div class="result-box">
          <span class="result-label">Playoff probability</span>
          <strong>${model.playoffPct}%</strong>
        </div>
        <div class="result-box">
          <span class="result-label">Average finish</span>
          <strong>${model.averageWins.toFixed(1)} wins</strong>
        </div>
        <div class="result-box">
          <span class="result-label">Net projected value</span>
          <strong>${model.netWar >= 0 ? "+" : ""}${model.netWar.toFixed(1)} WAR</strong>
        </div>
      </div>

      <h2>${philosophy(model)}</h2>
      <p class="result-copy">Your accepted moves changed the prototype’s rest-of-season projection by <strong>${model.netWar >= 0 ? "+" : ""}${model.netWar.toFixed(2)} wins</strong>. The model then simulated the remaining ${gamesRemaining()} games 10,000 times.</p>

      <div class="analysis-grid">
        <section class="analysis-card">
          <h3>Biggest move</h3>
          <p><strong>${move.title}</strong><br>${move.text}</p>
        </section>
        <section class="analysis-card">
          <h3>Biggest risk</h3>
          <p><strong>${risk.title}</strong><br>${risk.text}</p>
        </section>
      </div>

      <p class="method-note"><strong>Methodology:</strong> The live record comes from MLB’s standings feed when available. Player values use FanGraphs Depth Charts rest-of-season WAR as accessed July 23, 2026. Baltimore’s no-trade baseline uses FanGraphs’ .504 rest-of-season winning percentage and 24.8% playoff probability from the same date. The simulator converts each net WAR change into an equivalent change in expected wins and runs 10,000 remaining-season trials. Trade proposals and prospect packages are hypothetical and are not reported offers.</p>

      <div class="actions">
        <button class="primary" id="replay-btn" type="button">Try another deadline</button>
      </div>
    </section>
  `;

  document.getElementById("replay-btn").addEventListener("click", resetGame);
}

function resetGame() {
  state.index = 0;
  state.answers = [];
  state.started = true;
  updateHeader();
  renderIncoming();
}

updateHeader();
renderStart();
loadLiveRecord();
