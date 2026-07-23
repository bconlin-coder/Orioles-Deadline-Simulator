const FALLBACK = { wins: 50, losses: 53 };
const ORIOLES_TEAM_ID = 110;
const SEASON = 2026;
const SIMULATIONS = 10000;
const MAX_CALLS = 6;

/*
  modelImpact is the estimated marginal change in Baltimore's 2026 expected
  wins after accounting for the player being replaced. It is intentionally
  smaller than a player's raw WAR projection. These assumptions are exposed
  in README.md so editors can retune them without changing the engine.
*/
const deals = [
  {
    id: "joe-ryan",
    need: "starter",
    group: "starter",
    priority: 10,
    stageMin: 0,
    city: "Minnesota",
    player: "Joe Ryan",
    type: "Buy",
    time: "July 29 · 10:18 a.m.",
    about: "Ryan would give Baltimore a dependable, high-strikeout starter for the stretch run and another controllable rotation piece beyond 2026.",
    offer: ["Orioles receive RHP Joe Ryan", "Twins receive an MLB-ready young player and two premium prospects"],
    hard: "The rotation has performed well, so Baltimore would be paying a major prospect price to improve a relative strength.",
    question: "Do you pay a premium for a frontline starter?",
    accept: "Acquire Ryan",
    decline: "Pass on Ryan",
    fills: ["starter"],
    modelImpact: 1.05,
    acceptedSummary: "Acquired Joe Ryan",
    declinedSummary: "Declined Minnesota’s price for Joe Ryan"
  },
  {
    id: "reid-detmers",
    need: "starter",
    group: "starter",
    priority: 7,
    stageMin: 2,
    requiresDeclinedGroup: "starter",
    city: "Los Angeles",
    player: "Reid Detmers",
    type: "Buy",
    time: "July 30 · 9:14 a.m.",
    about: "Detmers offers left-handed upside and multiple years of control, but his performance has been less predictable than Ryan’s.",
    offer: ["Orioles receive LHP Reid Detmers", "Angels receive two prospects ranked among Baltimore’s top 15"],
    hard: "This is a bet on traits and team control rather than a guaranteed October ace.",
    question: "After passing on the premium starter, do you bet on Detmers?",
    accept: "Acquire Detmers",
    decline: "Keep the prospects",
    fills: ["starter"],
    modelImpact: 0.75,
    acceptedSummary: "Acquired Reid Detmers",
    declinedSummary: "Passed on Reid Detmers"
  },
  {
    id: "adrian-morejon",
    need: "backEnd",
    secondaryNeed: "lefty",
    group: "premium-relief",
    priority: 10,
    stageMin: 0,
    city: "San Diego",
    player: "Adrián Morejón",
    type: "Buy",
    time: "July 29 · 2:41 p.m.",
    about: "Morejón is the rare reliever who could address both of Baltimore’s bullpen problems: late-inning quality and a trusted left-handed matchup option.",
    offer: ["Orioles receive LHP Adrián Morejón", "Padres receive a top-10 Orioles prospect and a young major league reliever"],
    hard: "A two-for-one solution is valuable, but San Diego knows Baltimore is trying to fill two needs with one move.",
    question: "Do you pay extra for one reliever who can solve two problems?",
    accept: "Acquire Morejón",
    decline: "Reject the price",
    fills: ["backEnd", "lefty"],
    modelImpact: 0.65,
    acceptedSummary: "Acquired Adrián Morejón",
    declinedSummary: "Passed on Adrián Morejón"
  },
  {
    id: "luke-weaver",
    need: "backEnd",
    group: "back-end",
    priority: 8,
    stageMin: 1,
    city: "New York",
    player: "Luke Weaver",
    type: "Buy",
    time: "July 30 · 11:22 a.m.",
    about: "Weaver would add a proven late-inning right-hander without requiring the blockbuster return demanded for the top relief targets.",
    offer: ["Orioles receive RHP Luke Weaver", "Mets receive a near-major-league position prospect"],
    hard: "Weaver helps the ninth inning, but acquiring him would still leave Baltimore without a dependable left-handed reliever.",
    question: "Do you make a targeted move for the back of the bullpen?",
    accept: "Acquire Weaver",
    decline: "End talks",
    fills: ["backEnd"],
    modelImpact: 0.35,
    acceptedSummary: "Acquired Luke Weaver",
    declinedSummary: "Passed on Luke Weaver"
  },
  {
    id: "brock-burke",
    need: "lefty",
    group: "lefty",
    priority: 8,
    stageMin: 2,
    city: "Cincinnati",
    player: "Brock Burke",
    type: "Buy",
    time: "July 30 · 4:03 p.m.",
    about: "Burke would give Baltimore a dedicated left-handed relief option for the difficult lefty pockets it could encounter in October.",
    offer: ["Orioles receive LHP Brock Burke", "Reds receive a Double-A pitcher"],
    hard: "This is a narrower upgrade than Morejón. Burke fills one specific role rather than transforming the entire bullpen.",
    question: "Do you spend prospect capital on a specialist?",
    accept: "Acquire Burke",
    decline: "Trust the current lefties",
    fills: ["lefty"],
    modelImpact: 0.25,
    acceptedSummary: "Acquired Brock Burke",
    declinedSummary: "Passed on Brock Burke"
  },
  {
    id: "luis-arraez",
    need: "bat",
    group: "bat",
    priority: 9,
    stageMin: 1,
    city: "San Francisco",
    player: "Luis Arraez",
    type: "Buy",
    time: "July 30 · 6:17 p.m.",
    about: "Arraez would add contact, on-base ability and another option at second base to a lineup carrying several everyday hitters below a .700 OPS.",
    offer: ["Orioles receive 2B Luis Arraez", "Giants receive a top-15 prospect and a lower-level lottery ticket"],
    hard: "Adding Arraez would force Baltimore to reduce playing time for young infielders it still needs to evaluate.",
    question: "Do you trade future value for a steadier major league bat?",
    accept: "Acquire Arraez",
    decline: "Stay with the young infielders",
    fills: ["bat"],
    modelImpact: 0.7,
    acceptedSummary: "Acquired Luis Arraez",
    declinedSummary: "Passed on Luis Arraez"
  },
  {
    id: "mickey-moniak",
    need: "bat",
    group: "bat",
    priority: 6,
    stageMin: 3,
    requiresDeclinedGroup: "bat",
    city: "Colorado",
    player: "Mickey Moniak",
    type: "Buy",
    time: "July 31 · 9:08 a.m.",
    about: "Moniak offers a less expensive way to improve the outfield without committing the prospect package required for the top hitters.",
    offer: ["Orioles receive OF Mickey Moniak", "Rockies receive a Double-A pitcher and a lower-level prospect"],
    hard: "The price is lower, but so is the certainty that Moniak meaningfully changes Baltimore’s offense.",
    question: "After passing on the premium bat, do you make a smaller upgrade?",
    accept: "Acquire Moniak",
    decline: "Stand pat on offense",
    fills: ["bat"],
    modelImpact: 0.4,
    acceptedSummary: "Acquired Mickey Moniak",
    declinedSummary: "Passed on Mickey Moniak"
  },
  {
    id: "ward-sell",
    need: "sell",
    group: "sell",
    priority: 8,
    stageMin: 3,
    sellerOnly: true,
    city: "Seattle",
    player: "Taylor Ward",
    type: "Sell",
    time: "July 31 · 11:36 a.m.",
    about: "Seattle wants Ward’s on-base ability and middle-of-the-order experience. The offer would replenish Baltimore’s system but weaken the current lineup.",
    offer: ["Mariners receive OF/DH Taylor Ward", "Orioles receive a Double-A starter and a high-upside infield prospect"],
    hard: "Accepting would mean pivoting toward the future while the Orioles remain within reach of a wild-card spot.",
    question: "Has your deadline stalled enough to justify selling?",
    accept: "Trade Ward",
    decline: "Keep Ward",
    fills: [],
    modelImpact: -0.85,
    acceptedSummary: "Traded Taylor Ward for two prospects",
    declinedSummary: "Kept Taylor Ward for the playoff push"
  },
  {
    id: "final-push",
    need: "flex",
    group: "flex",
    priority: 4,
    stageMin: 4,
    city: "Kansas City",
    player: "Michael Wacha",
    type: "Buy",
    time: "July 31 · 5:41 p.m.",
    about: "Wacha is not the ace Baltimore initially sought, but he would deepen the rotation and protect the club against an injury during the stretch run.",
    offer: ["Orioles receive RHP Michael Wacha", "Royals receive two mid-level prospects"],
    hard: "This is depth rather than a headline move, and the rotation may already be the strongest part of the roster.",
    question: "Do you use your final prospect capital on rotation insurance?",
    accept: "Acquire Wacha",
    decline: "Close the deadline",
    fills: [],
    modelImpact: 0.35,
    acceptedSummary: "Acquired Michael Wacha",
    declinedSummary: "Passed on Michael Wacha"
  }
];

const needMeta = {
  backEnd: { label: "Back-end reliever" },
  lefty: { label: "Left-handed reliever" },
  starter: { label: "Frontline starter" },
  bat: { label: "Capable hitter" }
};

const state = {
  record: { ...FALLBACK },
  answers: [],
  currentDeal: null,
  seenIds: new Set(),
  started: false
};

const app = document.getElementById("app");
const recordEl = document.getElementById("record");
const remainingEl = document.getElementById("remaining");
const approachEl = document.getElementById("approach");
const dataStatusEl = document.getElementById("data-status");
const needsGridEl = document.getElementById("needs-grid");
const needsCountEl = document.getElementById("needs-count");

function gamesRemaining() {
  return Math.max(0, 162 - state.record.wins - state.record.losses);
}

function acceptedDeals() {
  return state.answers.filter(answer => answer.accepted);
}

function declinedGroups() {
  return new Set(state.answers.filter(answer => !answer.accepted).map(answer => answer.deal.group));
}

function filledNeeds() {
  const filled = new Set();
  acceptedDeals().forEach(answer => answer.deal.fills.forEach(need => filled.add(need)));
  return filled;
}

function netImpact() {
  return acceptedDeals().reduce((sum, answer) => sum + answer.deal.modelImpact, 0);
}

function updateNeedsBoard() {
  const filled = filledNeeds();
  needsGridEl.innerHTML = Object.entries(needMeta).map(([key, meta]) => `
    <article class="need ${filled.has(key) ? "filled" : ""}">
      <span class="need-name">${meta.label}</span>
      <span class="need-status">${filled.has(key) ? "✓ Addressed" : "○ Still open"}</span>
    </article>
  `).join("");
  needsCountEl.textContent = `${filled.size} of 4 addressed`;
}

function updateHeader() {
  recordEl.textContent = `${state.record.wins}-${state.record.losses}`;
  remainingEl.textContent = gamesRemaining();

  const impact = netImpact();
  let approach = "Undecided";
  if (state.answers.length) {
    if (impact >= 2.2) approach = "All-in buyer";
    else if (impact >= 1.1) approach = "Aggressive buyer";
    else if (impact > 0.2) approach = "Measured buyer";
    else if (impact < -0.2) approach = "Deadline seller";
    else approach = "Mostly stood pat";
  }
  approachEl.textContent = approach;
  updateNeedsBoard();
}

async function loadLiveRecord() {
  const url = `https://statsapi.mlb.com/api/v1/standings?leagueId=103&season=${SEASON}&standingsTypes=regularSeason`;
  try {
    const response = await fetch(url, { cache: "no-store" });
    if (!response.ok) throw new Error("MLB request failed");
    const data = await response.json();
    let found = null;

    for (const group of data.records || []) {
      for (const teamRecord of group.teamRecords || []) {
        if (teamRecord.team?.id === ORIOLES_TEAM_ID) {
          found = { wins: Number(teamRecord.wins), losses: Number(teamRecord.losses) };
        }
      }
    }

    if (!found || !Number.isFinite(found.wins) || !Number.isFinite(found.losses)) {
      throw new Error("Orioles record not found");
    }

    state.record = found;
    const stamp = new Intl.DateTimeFormat("en-US", {
      month: "short", day: "numeric", hour: "numeric", minute: "2-digit"
    }).format(new Date());
    dataStatusEl.textContent = `Record updated from MLB data: ${stamp}.`;
  } catch (error) {
    state.record = { ...FALLBACK };
    dataStatusEl.textContent = "Live record unavailable. Using the saved 50-53 record.";
  }

  updateHeader();
  if (!state.started) renderStart();
}

function isSellerPath() {
  const buyDecisions = state.answers.filter(answer => answer.deal.type !== "Sell");
  const declines = buyDecisions.filter(answer => !answer.accepted).length;
  return state.answers.length >= 3 && (netImpact() < 0.45 || declines >= 3);
}

function eligibleDeals() {
  const filled = filledNeeds();
  const declined = declinedGroups();
  const callNumber = state.answers.length;

  return deals.filter(deal => {
    if (state.seenIds.has(deal.id)) return false;
    if (deal.stageMin > callNumber) return false;
    if (deal.sellerOnly && !isSellerPath()) return false;
    if (deal.requiresDeclinedGroup && !declined.has(deal.requiresDeclinedGroup)) return false;

    if (deal.need in needMeta && filled.has(deal.need)) return false;
    if (deal.group === "starter" && filled.has("starter")) return false;
    if (deal.group === "bat" && filled.has("bat")) return false;
    if (deal.group === "back-end" && filled.has("backEnd")) return false;
    if (deal.group === "lefty" && filled.has("lefty")) return false;
    if (deal.group === "premium-relief" && filled.has("backEnd") && filled.has("lefty")) return false;

    return true;
  });
}

function chooseNextDeal() {
  const eligible = eligibleDeals();
  if (!eligible.length) {
    return deals.find(deal => deal.id === "final-push" && !state.seenIds.has(deal.id)) || null;
  }

  const filled = filledNeeds();
  const openNeeds = Object.keys(needMeta).filter(need => !filled.has(need));
  const weighted = eligible.map(deal => {
    let score = deal.priority;
    if (openNeeds.includes(deal.need)) score += 4;
    if (deal.secondaryNeed && openNeeds.includes(deal.secondaryNeed)) score += 3;
    if (deal.sellerOnly && isSellerPath()) score += 5;
    score += Math.random() * 3;
    return { deal, score };
  });

  weighted.sort((a, b) => b.score - a.score);
  return weighted[0].deal;
}

function progressMarkup() {
  const call = state.answers.length + 1;
  const pct = Math.round((state.answers.length / MAX_CALLS) * 100);
  return `
    <div class="progress-row">
      <span>Call ${Math.min(call, MAX_CALLS)} of ${MAX_CALLS}</span>
      <span>${pct}% complete</span>
    </div>
    <div class="progress"><span style="width:${pct}%"></span></div>
  `;
}

function renderStart() {
  app.innerHTML = `
    <section class="start-screen">
      <div class="call-label">Your assignment</div>
      <h2>Choose a direction</h2>
      <p>The Orioles are <strong>${state.record.wins}-${state.record.losses}</strong> with <strong>${gamesRemaining()} games remaining</strong>. Four needs are on the board, but every transaction changes which calls come next.</p>
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

  if (state.answers.length >= MAX_CALLS) {
    renderRecap();
    return;
  }

  state.currentDeal = chooseNextDeal();
  if (!state.currentDeal) {
    renderRecap();
    return;
  }

  const deal = state.currentDeal;
  app.innerHTML = `
    ${progressMarkup()}
    <section class="call-screen">
      <div class="call-icon" aria-hidden="true">☎</div>
      <div class="call-label">Incoming trade call</div>
      <h2>${deal.city}</h2>
      <p>${deal.city} is calling. The proposal reflects the needs still open on your roster board.</p>
      <button class="primary" id="answer-btn" type="button">Answer call</button>
    </section>
  `;
  document.getElementById("answer-btn").addEventListener("click", renderDecision);
}

function renderDecision() {
  const deal = state.currentDeal;
  const fills = deal.fills.length
    ? deal.fills.map(need => needMeta[need].label).join(" + ")
    : "No roster need — strategic choice";

  app.innerHTML = `
    ${progressMarkup()}
    <article>
      <div class="call-strip">
        <span class="trade-tag ${deal.type.toLowerCase()}">${deal.type}</span>
        <span class="timestamp">${deal.time}</span>
        <span class="call-status">☎ Call connected</span>
      </div>

      <h2 class="player-name">${deal.player}</h2>
      <p class="team-line">${deal.city} is calling · ${fills}</p>

      <div class="info-grid">
        <section class="info-block">
          <h3>What you need to know</h3>
          <p>${deal.about}</p>
        </section>
        <section class="info-block">
          <h3>The offer</h3>
          <ul class="offer-list">${deal.offer.map(item => `<li>${item}</li>`).join("")}</ul>
        </section>
      </div>

      <aside class="hard-call">
        <strong>Why this is hard</strong>
        ${deal.hard}
      </aside>

      <p class="question">${deal.question}</p>

      <div class="choice-grid">
        <button class="choice accept" data-accepted="true" type="button">
          ${deal.accept}
          <span class="choice-note">${deal.fills.length ? `Addresses: ${fills}` : "Changes your deadline direction"}</span>
        </button>
        <button class="choice" data-accepted="false" type="button">
          ${deal.decline}
          <span class="choice-note">The engine may offer an alternative later</span>
        </button>
      </div>
    </article>
  `;

  app.querySelectorAll(".choice").forEach(button => {
    button.addEventListener("click", () => choose(button.dataset.accepted === "true"));
  });
}

function choose(accepted) {
  const deal = state.currentDeal;
  state.answers.push({ deal, accepted });
  state.seenIds.add(deal.id);
  state.currentDeal = null;
  updateHeader();
  renderIncoming();
}

function renderRecap() {
  const items = state.answers.map(({ deal, accepted }) => `
    <li><b>${accepted ? "DEAL" : "NO DEAL"}</b> — ${accepted ? deal.acceptedSummary : deal.declinedSummary}</li>
  `).join("");

  app.innerHTML = `
    <section>
      <div class="call-label">The deadline has passed</div>
      <h2 class="player-name">Your deadline moves</h2>
      <p class="team-line">${filledNeeds().size} of four roster needs addressed</p>
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
  for (let i = 0; i < n; i++) if (Math.random() < p) wins++;
  return wins;
}

function calculateModel() {
  const impact = netImpact();
  const remaining = gamesRemaining();
  const baselinePct = 0.504;
  const expectedPct = Math.max(0.30, Math.min(0.70, baselinePct + impact / Math.max(1, remaining)));

  const totals = [];
  let playoffCount = 0;

  for (let i = 0; i < SIMULATIONS; i++) {
    /*
      The talent shock allows the existing Orioles roster to collectively run
      hot or cold. Standard deviation: 2.8 wins over the remaining schedule.
      Game-level binomial variance is layered on top of that.
    */
    const teamTalentShockWins = randomNormal() * 2.8;
    const trialPct = Math.max(0.27, Math.min(0.73, expectedPct + teamTalentShockWins / Math.max(1, remaining)));
    const restWins = binomial(remaining, trialPct);
    const finalWins = state.record.wins + restWins;
    const cutoff = Math.round(83.1 + randomNormal() * 1.8);

    totals.push(finalWins);
    if (finalWins >= cutoff) playoffCount++;
  }

  totals.sort((a, b) => a - b);
  const averageWins = totals.reduce((sum, wins) => sum + wins, 0) / totals.length;
  const playoffPct = Math.round(playoffCount / SIMULATIONS * 100);

  // Draw one genuinely random season from the 10,000 outcomes.
  const yourWins = totals[Math.floor(Math.random() * totals.length)];
  const yourLosses = 162 - yourWins;
  const surprise = yourWins - averageWins;

  return { impact, averageWins, playoffPct, yourWins, yourLosses, surprise };
}

function startSimulation() {
  app.innerHTML = `
    <section class="sim-screen">
      <div class="call-label">Running the model</div>
      <h2>Simulating 10,000 seasons</h2>
      <ul class="sim-steps" id="sim-steps">
        <li class="active">Applying your deadline moves…</li>
        <li>Projecting the existing roster…</li>
        <li>Adding hot- and cold-streak variance…</li>
        <li>Calculating the AL wild-card race…</li>
      </ul>
    </section>
  `;

  const steps = [...document.querySelectorAll("#sim-steps li")];
  let step = 0;
  const timer = setInterval(() => {
    steps.forEach((item, index) => item.classList.toggle("active", index === step));
    step++;
    if (step >= steps.length) clearInterval(timer);
  }, 350);

  setTimeout(() => renderResults(calculateModel()), 1550);
}

function philosophy(model) {
  if (model.impact >= 2.2) return "October or Bust";
  if (model.impact >= 1.1) return "Aggressive Buyer";
  if (model.impact >= 0.35) return "Measured Buyer";
  if (model.impact < -0.2) return "Deadline Seller";
  return "Cautious Operator";
}

function outcomeFor(wins, playoffPct) {
  if (wins >= 92) return "Won the AL East and reached October";
  if (wins >= 87) return "Claimed an American League wild-card berth";
  if (wins >= 85 && playoffPct >= 45) return "Survived the bubble and reached the postseason";
  if (wins >= 83) return "Stayed alive until the final week but missed October";
  return "Fell short of the postseason";
}

function surpriseCopy(model) {
  if (model.surprise >= 4) {
    return { label: "You caught fire", text: `This run finished ${model.surprise.toFixed(1)} wins above the roster’s average projection.` };
  }
  if (model.surprise <= -4) {
    return { label: "Bad break", text: `This run finished ${Math.abs(model.surprise).toFixed(1)} wins below the roster’s average projection.` };
  }
  return { label: "A typical outcome", text: "This simulated season landed reasonably close to the roster’s average projection." };
}

function biggestMove() {
  const accepted = acceptedDeals();
  if (!accepted.length) {
    return { title: "Standing pat", text: "You declined every proposal and asked the current roster to save the season without outside help." };
  }
  const best = [...accepted].sort((a, b) => b.deal.modelImpact - a.deal.modelImpact)[0];
  return { title: best.deal.player, text: `${best.deal.acceptedSummary}. It was your largest modeled 2026 upgrade.` };
}

function biggestRisk() {
  const ward = state.answers.find(answer => answer.deal.id === "ward-sell" && answer.accepted);
  if (ward) return { title: "Selling while contending", text: "Trading Taylor Ward reduced the current roster’s projection in exchange for future value." };

  const missed = state.answers
    .filter(answer => !answer.accepted && answer.deal.modelImpact > 0)
    .sort((a, b) => b.deal.modelImpact - a.deal.modelImpact)[0];

  if (missed) return { title: `Passing on ${missed.deal.player}`, text: "You declined the largest upgrade that reached your phone." };
  return { title: "Paying the deadline premium", text: "You accepted the major upgrades and absorbed the prospect cost embedded in the hypothetical packages." };
}

function renderResults(model) {
  const made = model.yourWins >= 86;
  const surprise = surpriseCopy(model);
  const move = biggestMove();
  const risk = biggestRisk();

  app.innerHTML = `
    <section class="results">
      <div class="result-hero">
        <div class="kicker">Your simulated season</div>
        <div class="result-record">${model.yourWins}-${model.yourLosses}</div>
        <p class="result-outcome">${made ? "✓" : "—"} ${outcomeFor(model.yourWins, model.playoffPct)}</p>
        <div class="surprise-note">
          <span class="surprise-label">${surprise.label}</span>
          ${surprise.text}
        </div>
      </div>

      <div class="result-grid">
        <div class="result-box primary-result">
          <span class="result-label">Playoff probability</span>
          <strong>${model.playoffPct}%</strong>
        </div>
        <div class="result-box">
          <span class="result-label">Average projection</span>
          <strong>${model.averageWins.toFixed(1)} wins</strong>
        </div>
        <div class="result-box">
          <span class="result-label">Modeled deadline impact</span>
          <strong>${model.impact >= 0 ? "+" : ""}${model.impact.toFixed(2)} wins</strong>
        </div>
      </div>

      <h2>${philosophy(model)}</h2>
      <p class="result-copy">Your transactions shifted the center of Baltimore’s projected outcomes. The simulator then allowed the existing roster to collectively outperform or underperform expectations, creating one random season from 10,000 trials.</p>

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

      <p class="method-note"><strong>Methodology:</strong> The live record comes from MLB’s standings feed when available. Baltimore begins with a .504 rest-of-season winning percentage. Each accepted trade applies a documented marginal-win adjustment, not the player’s full WAR. Every trial adds both ordinary game variance and a team-level performance shock so the current Orioles can run hot or cold. A variable playoff cut line is then applied. Trade offers are hypothetical.</p>

      <div class="actions">
        <button class="primary" id="replay-btn" type="button">Try another deadline</button>
      </div>
    </section>
  `;

  document.getElementById("replay-btn").addEventListener("click", resetGame);
}

function resetGame() {
  state.answers = [];
  state.currentDeal = null;
  state.seenIds = new Set();
  state.started = true;
  updateHeader();
  renderIncoming();
}

updateHeader();
renderStart();
loadLiveRecord();
