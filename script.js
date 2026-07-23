const baseline = {
  y2026: 48,
  y2027: 61,
  y2028: 66
};

const trades = [
  {
    team: "Seattle Mariners",
    player: "Taylor Ward",
    type: "Sell",
    time: "July 30 · 9:12 a.m.",
    about:
      "Taylor Ward is a 32-year-old Orioles corner outfielder and designated hitter. He provides on-base ability and middle-of-the-order experience, but he is eligible for free agency after the season.",
    offer: [
      "Seattle’s No. 11 prospect, a Double-A right-hander projected as a possible back-end starter",
      "A lower-level middle infielder with offensive upside"
    ],
    hard:
      "Trading Ward weakens Baltimore’s lineup during a playoff race. Keeping him preserves an established bat, but the Orioles could lose him after the season without receiving this prospect package.",
    question:
      "Do you turn a current Orioles regular into future pitching depth?",
    yes: "Trade Ward",
    no: "Keep Ward",
    outcomes: {
      yes: {
        reaction:
          "You sell a veteran rental. The lineup loses depth now, but Baltimore adds two controllable players.",
        impact: { y2026: -6, y2027: 5, y2028: 7 },
        reasons: {
          y2026:
            "The Orioles lose an established hitter during the playoff race.",
          y2027:
            "The acquired starter could compete for inexpensive innings after Ward reaches free agency.",
          y2028:
            "Both acquired players have time to develop into controllable contributors."
        }
      },
      no: {
        reaction:
          "You keep the lineup intact for the stretch run, accepting the risk that Ward leaves after the season.",
        impact: { y2026: 4, y2027: -2, y2028: -3 },
        reasons: {
          y2026:
            "Ward remains in the lineup and protects Baltimore against injuries or slumps.",
          y2027:
            "Ward can depart in free agency, leaving Baltimore without Seattle’s prospects.",
          y2028:
            "The organization passes on two younger players who could have strengthened its depth."
        }
      }
    }
  },
  {
    team: "Miami Marlins",
    player: "Anthony Bender",
    type: "Buy",
    time: "July 30 · 11:46 a.m.",
    about:
      "Anthony Bender is a Marlins right-handed reliever with a power sinker and a history of generating ground balls. Unlike many deadline bullpen options, he remains under club control through 2027.",
    offer: [
      "Baltimore’s No. 7 prospect, a High-A position player with everyday upside",
      "A young relief prospect"
    ],
    hard:
      "Bender could help in two playoff races, but relievers are volatile. Baltimore would surrender a meaningful position-player prospect for a pitcher who might work only one inning at a time.",
    question:
      "Do you pay a premium for a controllable late-inning arm?",
    yes: "Acquire Bender",
    no: "Decline the deal",
    outcomes: {
      yes: {
        reaction:
          "You deepen the bullpen for this season and next, but surrender one of the system’s better position players.",
        impact: { y2026: 6, y2027: 5, y2028: -5 },
        reasons: {
          y2026:
            "Bender gives Baltimore another credible option in close late-inning games.",
          y2027:
            "His remaining team control keeps him in the bullpen next season.",
          y2028:
            "Bender is no longer controlled, while the primary prospect could be reaching the majors."
        }
      },
      no: {
        reaction:
          "You protect the farm system but leave the bullpen largely unchanged.",
        impact: { y2026: -2, y2027: -2, y2028: 4 },
        reasons: {
          y2026:
            "Baltimore accepts greater risk in close games without another late-inning reliever.",
          y2027:
            "The Orioles still lack the controllable bullpen help Bender would have supplied.",
          y2028:
            "Keeping the No. 7 prospect preserves a possible everyday player."
        }
      }
    }
  },
  {
    team: "Detroit Tigers",
    player: "Tarik Skubal",
    type: "Blockbuster",
    time: "July 31 · 8:03 a.m.",
    about:
      "Tarik Skubal is the Tigers’ ace and one of baseball’s best starting pitchers. He would immediately become Baltimore’s Game 1 starter in a postseason series, but he can become a free agent after the season.",
    offer: [
      "Jackson Holliday",
      "Baltimore’s No. 4 prospect",
      "An MLB-ready young starting pitcher"
    ],
    hard:
      "No player in this game raises Baltimore’s immediate ceiling more. No deal costs more future value, either.",
    question:
      "Do you sacrifice a major portion of the young core for one run with an ace?",
    yes: "Go all in for Skubal",
    no: "Reject the price",
    outcomes: {
      yes: {
        reaction:
          "You make the defining win-now move of the deadline. Baltimore gains an ace and loses multiple long-term building blocks.",
        impact: { y2026: 18, y2027: -15, y2028: -18 },
        reasons: {
          y2026:
            "Skubal immediately becomes Baltimore’s best starter and transforms its postseason rotation.",
          y2027:
            "Skubal can leave in free agency, while Holliday and two young pitchers are gone.",
          y2028:
            "The Orioles have surrendered several players who could otherwise form the next core."
        }
      },
      no: {
        reaction:
          "You preserve the young core, but pass on the player most capable of changing a short postseason series.",
        impact: { y2026: -5, y2027: 8, y2028: 10 },
        reasons: {
          y2026:
            "Baltimore passes on a true ace for the stretch run and postseason.",
          y2027:
            "Holliday and the two young pitchers remain in the organization.",
          y2028:
            "Keeping several premium players preserves talent and future trade flexibility."
        }
      }
    }
  },
  {
    team: "Los Angeles Dodgers",
    player: "Andrew Kittredge",
    type: "Sell",
    time: "July 31 · 1:28 p.m.",
    about:
      "Andrew Kittredge is a veteran Orioles reliever who can handle setup and occasional save situations. He is eligible for free agency after the season.",
    offer: [
      "A Double-A starter with a chance to become a No. 5 starter",
      "A teenage outfielder with tools and significant development risk"
    ],
    hard:
      "Kittredge helps Baltimore’s bullpen today. The offered players are unlikely to help immediately, but they could prevent another veteran from leaving without a return.",
    question:
      "Do you sell a trusted Orioles reliever while the team is still contending?",
    yes: "Trade Kittredge",
    no: "Keep Kittredge",
    outcomes: {
      yes: {
        reaction:
          "You exchange present bullpen stability for two long-term assets.",
        impact: { y2026: -4, y2027: 4, y2028: 6 },
        reasons: {
          y2026:
            "Baltimore loses a trusted veteran from a bullpen that needs dependable innings.",
          y2027:
            "The acquired starter could compete for innings instead of Kittredge leaving for nothing.",
          y2028:
            "Both acquired players remain controllable and have time to develop."
        }
      },
      no: {
        reaction:
          "You keep an experienced reliever for the playoff push and accept the free-agent risk.",
        impact: { y2026: 3, y2027: -2, y2028: -3 },
        reasons: {
          y2026:
            "Kittredge remains available for close late-inning games.",
          y2027:
            "He can leave in free agency, leaving Baltimore without the offered starter.",
          y2028:
            "The organization forgoes two young players whose value would arrive later."
        }
      }
    }
  },
  {
    team: "Los Angeles Angels",
    player: "Reid Detmers",
    type: "Buy",
    time: "Aug. 1 · 10:17 a.m.",
    about:
      "Reid Detmers is a 27-year-old Angels left-handed starter with swing-and-miss ability and an uneven major league track record. Baltimore would control him through 2028.",
    offer: [
      "Baltimore’s No. 3 prospect",
      "A second prospect ranked in the organization’s top 15"
    ],
    hard:
      "Detmers offers three playoff races of rotation upside, but he is not a guaranteed ace. The Orioles would be paying for years of control as much as current performance.",
    question:
      "Do you trade two strong prospects for a controllable starter?",
    yes: "Acquire Detmers",
    no: "Keep the prospects",
    outcomes: {
      yes: {
        reaction:
          "You add a rotation option for three seasons, paying a significant prospect price for control and upside.",
        impact: { y2026: 6, y2027: 9, y2028: 6 },
        reasons: {
          y2026:
            "Detmers adds needed rotation depth and more upside than a typical rental.",
          y2027:
            "He remains under control and could occupy a rotation spot for a full season.",
          y2028:
            "Detmers is still controlled, though the two traded prospects may also be major league ready."
        }
      },
      no: {
        reaction:
          "You preserve two of the farm system’s better players but leave the rotation unchanged.",
        impact: { y2026: -3, y2027: -4, y2028: 7 },
        reasons: {
          y2026:
            "Baltimore passes on a starter who could improve the current rotation.",
          y2027:
            "The rotation still lacks Detmers’ controllable upside.",
          y2028:
            "The retained prospects have more development time and remain available for future trades."
        }
      }
    }
  },
  {
    team: "Texas Rangers",
    player: "Adley Rutschman",
    type: "Blockbuster",
    time: "Aug. 2 · 5:41 p.m.",
    about:
      "Adley Rutschman is the Orioles’ starting catcher, a former No. 1 overall pick and one of the faces of the franchise. Baltimore controls him through 2027. Samuel Basallo gives the organization another possible long-term answer behind the plate.",
    offer: [
      "A consensus top-40 overall prospect who is nearly major league ready",
      "A young MLB starting pitcher with five years of team control",
      "A lower-level catching prospect with everyday upside"
    ],
    hard:
      "Trading Rutschman could replenish the roster before he approaches free agency. It could also become one of the most regrettable moves in franchise history if he returns to star form.",
    question:
      "Do you trade a franchise cornerstone before his value or team control declines?",
    yes: "Trade Rutschman",
    no: "Keep Rutschman",
    outcomes: {
      yes: {
        reaction:
          "You make the boldest move of the game, trading a franchise face for three controllable players.",
        impact: { y2026: -8, y2027: -3, y2028: 15 },
        reasons: {
          y2026:
            "Baltimore loses a proven switch-hitting catcher and clubhouse leader.",
          y2027:
            "The return adds talent, but no acquired player is guaranteed to replace Rutschman immediately.",
          y2028:
            "The three controllable players could outlast Rutschman’s current Orioles control window."
        }
      },
      no: {
        reaction:
          "You keep Rutschman for the current race and another full season, postponing the larger contract decision.",
        impact: { y2026: 5, y2027: 7, y2028: -8 },
        reasons: {
          y2026:
            "Rutschman remains at the center of Baltimore’s catching plan.",
          y2027:
            "He is still under team control and gives Baltimore an established catcher.",
          y2028:
            "Without an extension or later trade, he can leave after 2027 and Baltimore will have passed on this return."
        }
      }
    }
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
  pending: null
};

function clamp(value) {
  return Math.max(5, Math.min(95, value));
}

function signed(value) {
  return value > 0 ? `+${value}` : `${value}`;
}

function updateScoreboard() {
  const values = {
    y2026: clamp(state.outlook.y2026),
    y2027: clamp(state.outlook.y2027),
    y2028: clamp(state.outlook.y2028)
  };

  score2026.textContent = `${values.y2026}%`;
  score2027.textContent = `${values.y2027}%`;
  score2028.textContent = `${values.y2028}%`;

  bar2026.style.width = `${values.y2026}%`;
  bar2027.style.width = `${values.y2027}%`;
  bar2028.style.width = `${values.y2028}%`;
}

function renderDecision() {
  updateScoreboard();

  const trade = trades[state.index];
  const complete = Math.round((state.index / trades.length) * 100);
  const offerMarkup = trade.offer.map(item => `<li>${item}</li>`).join("");

  app.innerHTML = `
    <div class="progress-copy">
      <span>Decision ${state.index + 1} of ${trades.length}</span>
      <span>${complete}% complete</span>
    </div>

    <div class="progress-track" aria-hidden="true">
      <span style="width:${complete}%"></span>
    </div>

    <article>
      <div class="call-strip">
        <span class="trade-tag ${trade.type.toLowerCase()}">${trade.type}</span>
        <span class="timestamp">${trade.time}</span>
        <span class="incoming">☎ Incoming call</span>
      </div>

      <h2 class="player-name">${trade.player}</h2>
      <p class="team-line">${trade.team} is on the line.</p>

      <section class="info-section">
        <h3>What you need to know</h3>
        <p>${trade.about}</p>
      </section>

      <section class="info-section">
        <h3>The offer</h3>
        <ul class="offer-list">${offerMarkup}</ul>
      </section>

      <aside class="hard-call">
        <strong>Why this is hard</strong>
        <span>${trade.hard}</span>
      </aside>

      <p class="decision-question">${trade.question}</p>

      <div class="choice-grid">
        <button class="choice-button primary" type="button" data-choice="yes">
          ${trade.yes}
        </button>
        <button class="choice-button" type="button" data-choice="no">
          ${trade.no}
        </button>
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
  const outcome = trade.outcomes[choice];

  state.pending = { choice, outcome };

  app.querySelectorAll("[data-choice]").forEach(button => {
    button.disabled = true;
  });

  const reaction = document.getElementById("reaction");
  reaction.classList.add("visible");

  reaction.innerHTML = `
    <strong class="reaction-title">
      Your decision: ${choice === "yes" ? trade.yes : trade.no}
    </strong>
    <div>${outcome.reaction}</div>
    <div class="impact-inline">
      Immediate changes:
      2026 ${signed(outcome.impact.y2026)} ·
      2027 ${signed(outcome.impact.y2027)} ·
      2028 ${signed(outcome.impact.y2028)}
    </div>
    <button class="next-button" type="button">
      ${state.index === trades.length - 1 ? "See your final results" : "Take the next call"}
    </button>
  `;

  reaction.querySelector(".next-button").addEventListener("click", commitChoice);
}

function commitChoice() {
  const trade = trades[state.index];
  const { choice, outcome } = state.pending;

  Object.keys(state.outlook).forEach(year => {
    state.outlook[year] += outcome.impact[year];
  });

  state.answers.push({
    player: trade.player,
    decision: choice === "yes" ? trade.yes : trade.no,
    impact: outcome.impact,
    reasons: outcome.reasons
  });

  state.index += 1;
  state.pending = null;

  if (state.index < trades.length) {
    renderDecision();
    window.scrollTo({ top: 0, behavior: "smooth" });
  } else {
    renderResults();
  }
}

function getPersonality() {
  const current = state.outlook.y2026;
  const futureAverage = (state.outlook.y2027 + state.outlook.y2028) / 2;
  const tradedRutschman = state.answers.some(
    answer =>
      answer.player === "Adley Rutschman" &&
      answer.decision === "Trade Rutschman"
  );

  if (tradedRutschman && futureAverage >= 68) {
    return {
      name: "Fearless Rebuilder",
      copy:
        "You were willing to move a franchise cornerstone before his control window narrowed. Your deadline could refresh the next core, but it asks fans and the current roster to accept substantial immediate risk."
    };
  }

  if (current >= 67 && futureAverage < 57) {
    return {
      name: "All-In Contender",
      copy:
        "You prioritized the 2026 playoff run and accepted major long-term costs. Your Orioles are more dangerous now, but the organization has fewer inexpensive players and fewer trade assets."
    };
  }

  if (current <= 44 && futureAverage >= 70) {
    return {
      name: "Long-Term Builder",
      copy:
        "You used the deadline to strengthen future rosters. The price is a weaker current club and a greater chance that the 2026 playoff push falls short."
    };
  }

  return {
    name: "Balanced Operator",
    copy:
      "You tried to preserve the current club without stripping the farm system. Your plan does not maximize one season, but it leaves Baltimore with several ways to remain competitive."
  };
}

function renderYear(year, key, description) {
  const list = state.answers
    .map(answer => {
      const delta = answer.impact[key];
      const className = delta >= 0 ? "positive" : "negative";

      return `
        <li>
          <span class="impact-player">${answer.player}</span>
          <span>${answer.reasons[key]}</span>
          <span class="delta ${className}">${signed(delta)}</span>
        </li>
      `;
    })
    .join("");

  return `
    <section class="year-section">
      <h3>${year} outlook</h3>
      <p>${description}</p>
      <ul class="impact-list">${list}</ul>
    </section>
  `;
}

function renderResults() {
  updateScoreboard();

  const personality = getPersonality();
  const decisions = state.answers
    .map(
      answer => `
        <li>
          <span>${answer.player}</span>
          <strong>${answer.decision}</strong>
        </li>
      `
    )
    .join("");

  app.innerHTML = `
    <header class="results-header">
      <div class="results-kicker">Your deadline is complete</div>
      <h2 class="results-title">Your Orioles</h2>
      <div class="personality-name">${personality.name}</div>
      <p>${personality.copy}</p>
    </header>

    <div class="outlook-grid">
      <article class="outlook-card">
        <div class="outlook-year">2026 playoff outlook</div>
        <div class="outlook-score">${clamp(state.outlook.y2026)}%</div>
        <div class="score-track">
          <span style="width:${clamp(state.outlook.y2026)}%"></span>
        </div>
      </article>

      <article class="outlook-card">
        <div class="outlook-year">2027 roster outlook</div>
        <div class="outlook-score">${clamp(state.outlook.y2027)}%</div>
        <div class="score-track">
          <span style="width:${clamp(state.outlook.y2027)}%"></span>
        </div>
      </article>

      <article class="outlook-card">
        <div class="outlook-year">2028 future outlook</div>
        <div class="outlook-score">${clamp(state.outlook.y2028)}%</div>
        <div class="score-track">
          <span style="width:${clamp(state.outlook.y2028)}%"></span>
        </div>
      </article>
    </div>

    <h3>Your six decisions</h3>
    <ul class="decision-list">${decisions}</ul>

    ${renderYear(
      "2026",
      "y2026",
      "Immediate roster quality and playoff strength after the deadline."
    )}

    ${renderYear(
      "2027",
      "y2027",
      "Next season’s roster, including expiring contracts and near-term prospect arrivals."
    )}

    ${renderYear(
      "2028",
      "y2028",
      "The longer-term competitive window, when prospects acquired or surrendered are more likely to matter."
    )}

    <button class="restart-button" id="restart" type="button">Play again</button>
  `;

  document.getElementById("restart").addEventListener("click", restartGame);
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function restartGame() {
  state.index = 0;
  state.outlook = { ...baseline };
  state.answers = [];
  state.pending = null;
  renderDecision();
}

renderDecision();
