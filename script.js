const FALLBACK = { wins: 50, losses: 53 };
const ORIOLES_TEAM_ID = 110;
const SEASON = 2026;
const SIMULATIONS = 10000;
let MAX_CALLS = Math.random() < 0.5 ? 5 : 6;
let sessionDealIds = [];

/*
  modelImpact is the estimated marginal change in Baltimore's 2026 expected
  wins after accounting for the player being replaced. It is intentionally
  smaller than a player's raw WAR projection. These assumptions are exposed
  in README.md so editors can retune them without changing the engine.
*/
const deals = [
  {
    "id": "joe-ryan",
    "need": "starter",
    "group": "starter",
    "priority": 10,
    "stageMin": 0,
    "city": "Minnesota",
    "player": "Joe Ryan",
    "type": "Buy",
    "time": "Deadline week",
    "about": "A controllable, high-strikeout starter who would raise the rotation’s October ceiling.",
    "offer": [
      "Orioles receive RHP Joe Ryan",
      "Twins receive an MLB-ready young player and two premium prospects"
    ],
    "hard": "The talent is obvious, but the prospect cost would be the largest of your deadline.",
    "question": "Do you pay the premium for a frontline starter?",
    "accept": "Acquire Ryan",
    "decline": "Pass on Ryan",
    "fills": [
      "starter"
    ],
    "modelImpact": 1.05,
    "acceptedSummary": "Acquired Joe Ryan",
    "declinedSummary": "Passed on Joe Ryan"
  },
  {
    "id": "logan-webb",
    "need": "starter",
    "group": "starter",
    "priority": 10,
    "stageMin": 0,
    "city": "San Francisco",
    "player": "Logan Webb",
    "type": "Blockbuster",
    "time": "Deadline week",
    "about": "A durable frontline starter who could lead the rotation now and beyond this season.",
    "offer": [
      "Orioles receive RHP Logan Webb",
      "Giants receive a young major leaguer and three premium prospects"
    ],
    "hard": "This would be a franchise-shaping prospect package, not a normal deadline rental.",
    "question": "Do you make the blockbuster offer?",
    "accept": "Acquire Webb",
    "decline": "Walk away",
    "fills": [
      "starter"
    ],
    "modelImpact": 1.2,
    "acceptedSummary": "Acquired Logan Webb",
    "declinedSummary": "Passed on Logan Webb"
  },
  {
    "id": "sandy-alcantara",
    "need": "starter",
    "group": "starter",
    "priority": 9,
    "stageMin": 0,
    "city": "Miami",
    "player": "Sandy Alcantara",
    "type": "Blockbuster",
    "time": "Deadline week",
    "about": "A former Cy Young Award winner with ace-level upside and more volatility than the safest targets.",
    "offer": [
      "Orioles receive RHP Sandy Alcantara",
      "Marlins receive two top prospects and a young pitcher"
    ],
    "hard": "You would be buying ceiling while accepting health and performance risk.",
    "question": "Do you bet on Alcantara’s upside?",
    "accept": "Acquire Alcantara",
    "decline": "Reject the gamble",
    "fills": [
      "starter"
    ],
    "modelImpact": 0.95,
    "acceptedSummary": "Acquired Sandy Alcantara",
    "declinedSummary": "Passed on Sandy Alcantara"
  },
  {
    "id": "reid-detmers",
    "need": "starter",
    "group": "starter",
    "priority": 7,
    "stageMin": 2,
    "city": "Los Angeles",
    "player": "Reid Detmers",
    "type": "Buy",
    "time": "Deadline week",
    "about": "A left-handed starter with swing-and-miss traits and multiple years of control.",
    "offer": [
      "Orioles receive LHP Reid Detmers",
      "Angels receive two top-15 Orioles prospects"
    ],
    "hard": "This is a traits-and-control bet rather than a guaranteed October ace.",
    "question": "Do you buy low on Detmers?",
    "accept": "Acquire Detmers",
    "decline": "Keep the prospects",
    "fills": [
      "starter"
    ],
    "modelImpact": 0.7,
    "acceptedSummary": "Acquired Reid Detmers",
    "declinedSummary": "Passed on Reid Detmers",
    "requiresDeclinedGroup": "starter"
  },
  {
    "id": "michael-wacha",
    "need": "starter",
    "group": "starter",
    "priority": 6,
    "stageMin": 2,
    "city": "Kansas City",
    "player": "Michael Wacha",
    "type": "Buy",
    "time": "Deadline week",
    "about": "A veteran starter who would add stability and protect the rotation against injury.",
    "offer": [
      "Orioles receive RHP Michael Wacha",
      "Royals receive two mid-level prospects"
    ],
    "hard": "This is depth and reliability, not the frontline upgrade you originally wanted.",
    "question": "Do you settle for rotation insurance?",
    "accept": "Acquire Wacha",
    "decline": "Pass on Wacha",
    "fills": [
      "starter"
    ],
    "modelImpact": 0.4,
    "acceptedSummary": "Acquired Michael Wacha",
    "declinedSummary": "Passed on Michael Wacha",
    "requiresDeclinedGroup": "starter"
  },
  {
    "id": "adrian-morejon",
    "need": "backEnd",
    "group": "premium-relief",
    "priority": 10,
    "stageMin": 0,
    "city": "San Diego",
    "player": "Adrián Morejón",
    "type": "Buy",
    "time": "Deadline week",
    "about": "A high-leverage left-hander who could address two bullpen needs with one roster spot.",
    "offer": [
      "Orioles receive LHP Adrián Morejón",
      "Padres receive a top-10 prospect and a young major league reliever"
    ],
    "hard": "San Diego can demand a premium because Morejón solves both late-inning and left-handed needs.",
    "question": "Do you pay extra for the two-for-one bullpen solution?",
    "accept": "Acquire Morejón",
    "decline": "Reject the price",
    "fills": [
      "backEnd",
      "lefty"
    ],
    "modelImpact": 0.65,
    "acceptedSummary": "Acquired Adrián Morejón",
    "declinedSummary": "Passed on Adrián Morejón",
    "secondaryNeed": "lefty"
  },
  {
    "id": "luke-weaver",
    "need": "backEnd",
    "group": "back-end",
    "priority": 8,
    "stageMin": 1,
    "city": "New York",
    "player": "Luke Weaver",
    "type": "Buy",
    "time": "Deadline week",
    "about": "A proven late-inning right-hander who could immediately handle leverage innings.",
    "offer": [
      "Orioles receive RHP Luke Weaver",
      "New York receives a near-major-league position prospect"
    ],
    "hard": "He helps the back end but does not solve the need for a trusted left-hander.",
    "question": "Do you make the targeted bullpen upgrade?",
    "accept": "Acquire Weaver",
    "decline": "End talks",
    "fills": [
      "backEnd"
    ],
    "modelImpact": 0.35,
    "acceptedSummary": "Acquired Luke Weaver",
    "declinedSummary": "Passed on Luke Weaver"
  },
  {
    "id": "kenley-jansen",
    "need": "backEnd",
    "group": "back-end",
    "priority": 7,
    "stageMin": 1,
    "city": "Los Angeles",
    "player": "Kenley Jansen",
    "type": "Buy",
    "time": "Deadline week",
    "about": "A veteran closer with extensive high-leverage and postseason experience.",
    "offer": [
      "Orioles receive RHP Kenley Jansen",
      "Angels receive a mid-level pitching prospect"
    ],
    "hard": "You would be paying for certainty and experience rather than long-term control.",
    "question": "Do you add the veteran closer?",
    "accept": "Acquire Jansen",
    "decline": "Pass on Jansen",
    "fills": [
      "backEnd"
    ],
    "modelImpact": 0.3,
    "acceptedSummary": "Acquired Kenley Jansen",
    "declinedSummary": "Passed on Kenley Jansen"
  },
  {
    "id": "ryan-zeferjahn",
    "need": "backEnd",
    "group": "back-end",
    "priority": 7,
    "stageMin": 1,
    "city": "Los Angeles",
    "player": "Ryan Zeferjahn",
    "type": "Buy",
    "time": "Deadline week",
    "about": "A power reliever with team control who could grow into a larger late-inning role.",
    "offer": [
      "Orioles receive RHP Ryan Zeferjahn",
      "Angels receive two lower-level prospects"
    ],
    "hard": "The price reflects future control even though he is less established than the veteran options.",
    "question": "Do you pay for the controllable reliever?",
    "accept": "Acquire Zeferjahn",
    "decline": "Pass on Zeferjahn",
    "fills": [
      "backEnd"
    ],
    "modelImpact": 0.32,
    "acceptedSummary": "Acquired Ryan Zeferjahn",
    "declinedSummary": "Passed on Ryan Zeferjahn"
  },
  {
    "id": "brock-burke",
    "need": "lefty",
    "group": "lefty",
    "priority": 8,
    "stageMin": 1,
    "city": "Cincinnati",
    "player": "Brock Burke",
    "type": "Buy",
    "time": "Deadline week",
    "about": "A dedicated left-handed relief option for difficult matchup pockets.",
    "offer": [
      "Orioles receive LHP Brock Burke",
      "Reds receive a Double-A pitcher"
    ],
    "hard": "This fills a narrow role rather than transforming the entire bullpen.",
    "question": "Do you spend prospect capital on the lefty specialist?",
    "accept": "Acquire Burke",
    "decline": "Trust the current lefties",
    "fills": [
      "lefty"
    ],
    "modelImpact": 0.25,
    "acceptedSummary": "Acquired Brock Burke",
    "declinedSummary": "Passed on Brock Burke"
  },
  {
    "id": "daniel-lynch",
    "need": "lefty",
    "group": "lefty",
    "priority": 7,
    "stageMin": 1,
    "city": "Kansas City",
    "player": "Daniel Lynch IV",
    "type": "Buy",
    "time": "Deadline week",
    "about": "A multi-inning left-hander who could cover matchups and provide length.",
    "offer": [
      "Orioles receive LHP Daniel Lynch IV",
      "Royals receive a young position prospect"
    ],
    "hard": "His versatility is useful, but his role may overlap with pitchers already on the roster.",
    "question": "Do you add the versatile left-hander?",
    "accept": "Acquire Lynch",
    "decline": "Pass on Lynch",
    "fills": [
      "lefty"
    ],
    "modelImpact": 0.28,
    "acceptedSummary": "Acquired Daniel Lynch IV",
    "declinedSummary": "Passed on Daniel Lynch IV"
  },
  {
    "id": "steven-okert",
    "need": "lefty",
    "group": "lefty",
    "priority": 6,
    "stageMin": 2,
    "city": "Chicago",
    "player": "Steven Okert",
    "type": "Buy",
    "time": "Deadline week",
    "about": "A lower-cost veteran lefty who could be deployed against specific matchup pockets.",
    "offer": [
      "Orioles receive LHP Steven Okert",
      "Cubs receive a lower-level prospect"
    ],
    "hard": "The acquisition cost is modest, but so is the projected upgrade.",
    "question": "Do you make the smaller lefty move?",
    "accept": "Acquire Okert",
    "decline": "Stand pat",
    "fills": [
      "lefty"
    ],
    "modelImpact": 0.18,
    "acceptedSummary": "Acquired Steven Okert",
    "declinedSummary": "Passed on Steven Okert"
  },
  {
    "id": "luis-arraez",
    "need": "bat",
    "group": "bat",
    "priority": 9,
    "stageMin": 1,
    "city": "San Francisco",
    "player": "Luis Arraez",
    "type": "Buy",
    "time": "Deadline week",
    "about": "An elite contact hitter who would lengthen the lineup and add infield flexibility.",
    "offer": [
      "Orioles receive INF Luis Arraez",
      "Giants receive a top-15 prospect and a lower-level lottery ticket"
    ],
    "hard": "Adding him would reduce opportunities for young infielders Baltimore still needs to evaluate.",
    "question": "Do you trade future value for a steadier bat?",
    "accept": "Acquire Arraez",
    "decline": "Stay with the young hitters",
    "fills": [
      "bat"
    ],
    "modelImpact": 0.7,
    "acceptedSummary": "Acquired Luis Arraez",
    "declinedSummary": "Passed on Luis Arraez"
  },
  {
    "id": "jung-hoo-lee",
    "need": "bat",
    "group": "bat",
    "priority": 9,
    "stageMin": 1,
    "city": "San Francisco",
    "player": "Jung Hoo Lee",
    "type": "Blockbuster",
    "time": "Deadline week",
    "about": "A contact-oriented center fielder whose defense and on-base skills could improve multiple parts of the club.",
    "offer": [
      "Orioles receive OF Jung Hoo Lee",
      "Giants receive a premium prospect package"
    ],
    "hard": "The contract and acquisition cost would make this more than a short-term deadline move.",
    "question": "Do you make the long-term bet on Lee?",
    "accept": "Acquire Lee",
    "decline": "Reject the price",
    "fills": [
      "bat"
    ],
    "modelImpact": 0.8,
    "acceptedSummary": "Acquired Jung Hoo Lee",
    "declinedSummary": "Passed on Jung Hoo Lee"
  },
  {
    "id": "isaac-paredes",
    "need": "bat",
    "group": "bat",
    "priority": 8,
    "stageMin": 1,
    "city": "Houston",
    "player": "Isaac Paredes",
    "type": "Buy",
    "time": "Deadline week",
    "about": "A right-handed power bat with defensive flexibility around the infield.",
    "offer": [
      "Orioles receive INF Isaac Paredes",
      "Astros receive two top-15 prospects"
    ],
    "hard": "The fit is strong, but Houston would be reluctant to help another American League contender cheaply.",
    "question": "Do you pay the intraleague premium?",
    "accept": "Acquire Paredes",
    "decline": "Pass on Paredes",
    "fills": [
      "bat"
    ],
    "modelImpact": 0.65,
    "acceptedSummary": "Acquired Isaac Paredes",
    "declinedSummary": "Passed on Isaac Paredes"
  },
  {
    "id": "mickey-moniak",
    "need": "bat",
    "group": "bat",
    "priority": 6,
    "stageMin": 2,
    "city": "Colorado",
    "player": "Mickey Moniak",
    "type": "Buy",
    "time": "Deadline week",
    "about": "A less expensive outfield upgrade with power and platoon value.",
    "offer": [
      "Orioles receive OF Mickey Moniak",
      "Rockies receive a Double-A pitcher and a lower-level prospect"
    ],
    "hard": "The price is lower, but so is the certainty that he meaningfully changes the offense.",
    "question": "Do you make the smaller offensive upgrade?",
    "accept": "Acquire Moniak",
    "decline": "Stand pat on offense",
    "fills": [
      "bat"
    ],
    "modelImpact": 0.4,
    "acceptedSummary": "Acquired Mickey Moniak",
    "declinedSummary": "Passed on Mickey Moniak",
    "requiresDeclinedGroup": "bat"
  },
  {
    "id": "ward-sell",
    "need": "sell",
    "group": "sell",
    "priority": 8,
    "stageMin": 3,
    "city": "Seattle",
    "player": "Taylor Ward",
    "type": "Sell",
    "time": "Deadline week",
    "about": "A contender wants Ward’s on-base ability and middle-of-the-order experience.",
    "offer": [
      "Mariners receive OF/DH Taylor Ward",
      "Orioles receive a Double-A starter and a high-upside infield prospect"
    ],
    "hard": "Selling Ward would improve the system while weakening a team still within reach of October.",
    "question": "Do you cash in on Ward?",
    "accept": "Trade Ward",
    "decline": "Keep Ward",
    "fills": [],
    "modelImpact": -0.85,
    "acceptedSummary": "Traded Taylor Ward",
    "declinedSummary": "Kept Taylor Ward",
    "sellerOnly": true
  },
  {
    "id": "kittredge-sell",
    "need": "sell",
    "group": "sell",
    "priority": 7,
    "stageMin": 3,
    "city": "Los Angeles",
    "player": "Andrew Kittredge",
    "type": "Sell",
    "time": "Deadline week",
    "about": "A contender offers future value for a veteran reliever who could help in October.",
    "offer": [
      "Dodgers receive RHP Andrew Kittredge",
      "Orioles receive two pitching prospects"
    ],
    "hard": "Moving him makes sense for the future but directly deepens the bullpen problem.",
    "question": "Do you sell the veteran reliever?",
    "accept": "Trade Kittredge",
    "decline": "Keep Kittredge",
    "fills": [],
    "modelImpact": -0.4,
    "acceptedSummary": "Traded Andrew Kittredge",
    "declinedSummary": "Kept Andrew Kittredge",
    "sellerOnly": true
  },
  {
    "id": "rogers-sell",
    "need": "sell",
    "group": "sell",
    "priority": 8,
    "stageMin": 3,
    "city": "Chicago",
    "player": "Trevor Rogers",
    "type": "Sell",
    "time": "Deadline week",
    "about": "A contender is willing to pay for a controllable starter after a strong stretch.",
    "offer": [
      "Cubs receive LHP Trevor Rogers",
      "Orioles receive a premium position prospect and a young pitcher"
    ],
    "hard": "Selling high could reshape the farm system, but it removes rotation quality from the present club.",
    "question": "Do you move Rogers for the prospect haul?",
    "accept": "Trade Rogers",
    "decline": "Keep Rogers",
    "fills": [],
    "modelImpact": -0.75,
    "acceptedSummary": "Traded Trevor Rogers",
    "declinedSummary": "Kept Trevor Rogers",
    "sellerOnly": true
  },
  {
    "id": "rutschman-sell",
    "need": "sell",
    "group": "sell",
    "priority": 5,
    "stageMin": 4,
    "city": "Boston",
    "player": "Adley Rutschman",
    "type": "Blockbuster",
    "time": "Deadline week",
    "about": "A rival makes a franchise-altering offer for Baltimore’s star catcher.",
    "offer": [
      "Red Sox receive C Adley Rutschman",
      "Orioles receive three premium young players and additional prospect depth"
    ],
    "hard": "This is not a normal deadline trade. It changes the identity and timeline of the franchise.",
    "question": "Do you accept the overwhelming offer for Rutschman?",
    "accept": "Trade Rutschman",
    "decline": "End the conversation",
    "fills": [],
    "modelImpact": -1.5,
    "acceptedSummary": "Traded Adley Rutschman in a blockbuster",
    "declinedSummary": "Kept Adley Rutschman",
    "sellerOnly": true,
    "rare": true
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

const bucketIds = {
  starter: ["joe-ryan", "logan-webb", "sandy-alcantara"],
  backEnd: ["adrian-morejon", "luke-weaver", "kenley-jansen", "ryan-zeferjahn"],
  lefty: ["brock-burke", "daniel-lynch", "steven-okert"],
  bat: ["luis-arraez", "jung-hoo-lee", "isaac-paredes"],
  seller: ["ward-sell", "kittredge-sell", "rogers-sell"]
};

function randomItem(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function shuffled(items) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function buildSessionDeck() {
  const selected = [
    randomItem(bucketIds.starter),
    randomItem(bucketIds.backEnd),
    randomItem(bucketIds.lefty),
    randomItem(bucketIds.bat),
    randomItem(bucketIds.seller)
  ];

  // Adley is a rare surprise seller call, replacing the ordinary seller slot.
  if (Math.random() < 0.08) selected[4] = "rutschman-sell";

  if (MAX_CALLS === 6) {
    const flexPool = deals
      .filter(deal => !selected.includes(deal.id) && deal.id !== "rutschman-sell")
      .map(deal => deal.id);
    selected.push(randomItem(flexPool));
  }

  sessionDealIds = shuffled(selected);
}


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

function globallyEligibleDeals() {
  const filled = filledNeeds();
  const declined = declinedGroups();
  const callNumber = state.answers.length;

  return deals.filter(deal => {
    if (state.seenIds.has(deal.id)) return false;
    if (deal.stageMin > callNumber) return false;
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
  const eligible = globallyEligibleDeals();
  if (!eligible.length) return null;

  // First use the pre-drawn session deck. This creates genuinely different
  // groups of calls on each playthrough instead of repeatedly favoring the
  // same high-priority scenarios.
  const deckCandidates = sessionDealIds
    .map(id => eligible.find(deal => deal.id === id))
    .filter(Boolean);

  if (deckCandidates.length) return randomItem(deckCandidates);

  // If a prior move invalidated a deck call, replace it with a random valid
  // scenario so the player still receives five or six decisions.
  const replacementPool = eligible.filter(deal => !sessionDealIds.includes(deal.id));
  if (replacementPool.length) {
    const replacement = randomItem(replacementPool);
    sessionDealIds.push(replacement.id);
    return replacement;
  }

  return randomItem(eligible);
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
    buildSessionDeck();
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
  MAX_CALLS = Math.random() < 0.5 ? 5 : 6;
  state.answers = [];
  state.currentDeal = null;
  state.seenIds = new Set();
  state.started = true;
  buildSessionDeck();
  updateHeader();
  renderIncoming();
}

updateHeader();
renderStart();
loadLiveRecord();
