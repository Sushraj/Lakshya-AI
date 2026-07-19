const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const ts = require("typescript");

require.extensions[".ts"] = function loadTypeScript(module, filename) {
  const source = fs.readFileSync(filename, "utf8");
  const output = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
      esModuleInterop: true,
    },
    fileName: filename,
  });

  module._compile(output.outputText, filename);
};

const {
  calculateTravelAffordability,
} = require("../lib/calculators/travel-affordability.ts");

const baseInput = {
  currentSavings: "500000.00",
  emergencyFund: "100000.00",
  monthlyIncome: "150000.00",
  fixedExpenses: "40000.00",
  variableExpenses: "30000.00",
  monthlySavingsGoal: "30000.00",
  estimatedTripCost: "20000.00",
  monthsUntilTravel: 1,
};

test("clearly affordable trip", () => {
  const result = calculateTravelAffordability(baseInput);

  assert.equal(result.monthlyDisposableIncome, 50000);
  assert.equal(result.protectedSavings, 170000);
  assert.equal(result.availableTravelFunds, 280000);
  assert.equal(result.safeTripBudget, 25000);
  assert.equal(result.affordabilityRatio, 1.25);
  assert.equal(result.verdict, "SAFE");
  assert.ok(result.reasons.length > 0);
});

test("borderline trip", () => {
  const result = calculateTravelAffordability({
    ...baseInput,
    estimatedTripCost: "23000.00",
  });

  assert.equal(result.affordabilityRatio, 1.0869);
  assert.equal(result.verdict, "CAUTION");
  assert.ok(
    result.reasons.some((reason) => reason.toLowerCase().includes("narrow buffer")),
  );
});

test("unaffordable trip", () => {
  const result = calculateTravelAffordability({
    ...baseInput,
    estimatedTripCost: "35000.00",
  });

  assert.equal(result.affordabilityRatio, 0.7142);
  assert.equal(result.verdict, "DELAY");
  assert.ok(
    result.reasons.some((reason) => reason.includes("above the safe trip budget")),
  );
});

test("missing emergency fund", () => {
  const result = calculateTravelAffordability({
    ...baseInput,
    emergencyFund: "0.00",
  });

  assert.equal(result.protectedSavings, 70000);
  assert.equal(result.verdict, "CAUTION");
  assert.ok(
    result.reasons.some((reason) => reason.includes("Emergency fund is missing")),
  );
});

test("zero disposable income", () => {
  const result = calculateTravelAffordability({
    ...baseInput,
    monthlyIncome: "100000.00",
    fixedExpenses: "60000.00",
    variableExpenses: "30000.00",
    monthlySavingsGoal: "10000.00",
  });

  assert.equal(result.monthlyDisposableIncome, 0);
  assert.equal(result.safeTripBudget, 0);
  assert.equal(result.affordabilityRatio, 0);
  assert.equal(result.verdict, "DELAY");
});
