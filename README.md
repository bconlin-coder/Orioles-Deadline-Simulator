# Can You Get the Orioles to October? — Adaptive build

Upload these files to the root of the GitHub Pages repository:

- `index.html`
- `style.css`
- `script.js`

## What changed

This build is no longer a fixed six-question sequence.

The trade engine tracks four roster needs identified in the supplied Baltimore Sun analysis:

1. Back-end reliever
2. Left-handed reliever
3. Frontline starter
4. Capable hitter

Accepted trades close needs and remove redundant future calls. For example:

- Acquiring Joe Ryan closes the frontline-starter need, so Reid Detmers will not appear.
- Passing on Joe Ryan can unlock Detmers as a later alternative.
- Acquiring Adrián Morejón closes both bullpen needs.
- Acquiring Luke Weaver closes only the back-end-reliever need, leaving a lefty call available.
- A Taylor Ward sell offer appears only if the user has mostly declined upgrades or added little modeled value.

Each playthrough contains up to six calls, but the calls depend on earlier decisions.

## Simulation design

The simulation separates two concepts:

### 1. Expected roster strength

Baltimore starts with a .504 rest-of-season winning percentage. Each accepted transaction changes the projection by its **marginal model impact**, meaning the estimated improvement over the player or role being replaced.

Current tuning assumptions:

- Joe Ryan: +1.05 wins
- Reid Detmers: +0.75
- Adrián Morejón: +0.65
- Luke Weaver: +0.35
- Brock Burke: +0.25
- Luis Arraez: +0.70
- Mickey Moniak: +0.40
- Taylor Ward trade: -0.85
- Michael Wacha: +0.35

These are editable constants in `script.js`. They are not presented as reported trade values or as each player’s complete WAR projection.

### 2. Baseball randomness

Each of the 10,000 trials includes:

- normal game-to-game variance;
- a team-level hot/cold performance shock with a standard deviation of 2.8 wins;
- a variable American League playoff cut line.

The result screen emphasizes one randomly selected season. The average projection is shown secondarily so a lucky or unlucky result has context.

Examples:

- **You caught fire:** the random season finishes at least four wins above the average projection.
- **Bad break:** it finishes at least four wins below average.
- **A typical outcome:** it finishes near the average.

## Live record

The app requests the Orioles’ record from MLB’s public standings endpoint whenever the page loads. If that request fails, it uses the saved 50-53 fallback.

## Editorial note

All proposals and prospect packages are hypothetical and must not be described as reported offers. Before publication, editors can revise any deal language or `modelImpact` value directly in the `deals` array in `script.js`.
