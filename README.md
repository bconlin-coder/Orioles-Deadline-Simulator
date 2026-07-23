# Can You Get the Orioles to October?

A standalone GitHub Pages game.

## Data used in this version

The game uses:

- The Orioles' live record from MLB's standings feed, with 50-53 as the fallback.
- FanGraphs Depth Charts' July 23, 2026 Orioles rest-of-season winning percentage: .504.
- FanGraphs' July 23, 2026 Orioles playoff probability: 24.8%.
- FanGraphs Depth Charts rest-of-season WAR:
  - Joe Ryan: 1.3
  - Reid Detmers: approximately 1.1
  - Mason Miller: 1.1
  - Aroldis Chapman: 0.6
  - Eugenio Suárez: 0.3
  - Taylor Ward: 1.0, derived from projected full-season WAR minus year-to-date WAR

The trade proposals and prospect packages are hypothetical. They are not presented as reported offers.

## Simulation

1. Start with Baltimore's live record.
2. Use FanGraphs' .504 rest-of-season winning percentage as the no-trade baseline.
3. Add or subtract each accepted player's projected rest-of-season WAR.
4. Convert net WAR to expected wins over the remaining schedule.
5. Run 10,000 simulations.
6. Use a variable playoff cut line calibrated so the no-trade model is close to FanGraphs' 24.8% playoff probability.

## Installation

Upload `index.html`, `style.css` and `script.js` to the root of the existing GitHub Pages repository, replacing the previous files.
