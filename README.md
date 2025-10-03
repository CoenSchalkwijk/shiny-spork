# Toolkit

- [Node.js](https://nodejs.org/en)
- [PlayWright](https://playwright.dev/docs/intro)
- [IntelliJ IDEA](https://www.jetbrains.com/idea/) Community edition.

# Werkwijze

- Keuzes, keuzes: `Javascript`, `Typescript`, `Java` of misschien zelfs `Python`? Hangt van de aanwezige kennis af. Mijn inziens biedt Java (of Python) de meest toegankelijke code. Eventueel gecombineerd met [Cucumber](https://cucumber.io/). Omdat dit wel meer moeite vereist om een goed & net project op te tuigen, kies ik voor de opdracht voor `TypeScript`. Voor de langere termijn zou ik hier niet voor kiezen.
- Basis validatie implementeren, afzonderlijke elementen identificeren m.b.v. de web developer tooling in de browser (in mijn geval Chromium).
- Elementen hebben mooie id's... met een willekeurig element in de naam :)
- Bij het werken naar een eerste POC worden er TODO's verzameld. De eerste implementatie gaat recht op het doel af. Wil daarmee (te veel) `premature optimization` voorkomen.

# Uitvoeren tests

Tests `headless` uitvoeren:
```shell
npx playwright test
```

Test uitvoeren binnen UI:
```shell
npx playwright test --ui
```

Test rapport inzien:
```shell
npx playwright test
```
