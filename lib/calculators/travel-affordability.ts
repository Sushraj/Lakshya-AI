export type TravelAffordabilityVerdict = "SAFE" | "CAUTION" | "DELAY";

export type TravelAffordabilityInput = {
  currentSavings: number | string;
  emergencyFund: number | string;
  monthlyIncome: number | string;
  fixedExpenses: number | string;
  variableExpenses: number | string;
  monthlySavingsGoal: number | string;
  estimatedTripCost: number | string;
  monthsUntilTravel: number;
};

export type TravelAffordabilityResult = {
  monthlyDisposableIncome: number;
  protectedSavings: number;
  availableTravelFunds: number;
  safeTripBudget: number;
  affordabilityRatio: number;
  verdict: TravelAffordabilityVerdict;
  reasons: string[];
};

const ZERO = BigInt(0);
const ONE_HUNDRED = BigInt(100);
const TEN_THOUSAND = BigInt(10_000);

export function calculateTravelAffordability(
  input: TravelAffordabilityInput,
): TravelAffordabilityResult {
  const currentSavings = parseMoneyToCents(input.currentSavings, "current savings");
  const emergencyFund = parseMoneyToCents(input.emergencyFund, "emergency fund");
  const monthlyIncome = parseMoneyToCents(input.monthlyIncome, "monthly income");
  const fixedExpenses = parseMoneyToCents(input.fixedExpenses, "fixed expenses");
  const variableExpenses = parseMoneyToCents(
    input.variableExpenses,
    "variable expenses",
  );
  const monthlySavingsGoal = parseMoneyToCents(
    input.monthlySavingsGoal,
    "monthly savings goal",
  );
  const estimatedTripCost = parseMoneyToCents(
    input.estimatedTripCost,
    "estimated trip cost",
  );
  const monthsUntilTravel = parseMonths(input.monthsUntilTravel);

  const monthlyDisposable =
    monthlyIncome - fixedExpenses - variableExpenses - monthlySavingsGoal;
  const oneMonthEssentialExpenses = fixedExpenses + variableExpenses;
  const protectedSavings = emergencyFund + oneMonthEssentialExpenses;
  const positiveMonthlyDisposable =
    monthlyDisposable > ZERO ? monthlyDisposable : ZERO;
  const positiveMonthlyDisposableBeforeTrip =
    positiveMonthlyDisposable * BigInt(monthsUntilTravel);
  const availableTripMoney =
    currentSavings - protectedSavings - positiveMonthlyDisposableBeforeTrip;
  const halfPositiveMonthlyDisposable = divideCents(
    positiveMonthlyDisposable,
    BigInt(2),
  );
  const safeTripBudget = maxCents(
    ZERO,
    minCents(availableTripMoney, halfPositiveMonthlyDisposable),
  );
  const affordabilityRatio = ratio(safeTripBudget, estimatedTripCost);
  const verdict = getVerdict({
    affordabilityRatio,
    monthlyDisposable,
    safeTripBudget,
    estimatedTripCost,
    emergencyFund,
  });

  return {
    monthlyDisposableIncome: centsToNumber(monthlyDisposable),
    protectedSavings: centsToNumber(protectedSavings),
    availableTravelFunds: centsToNumber(availableTripMoney),
    safeTripBudget: centsToNumber(safeTripBudget),
    affordabilityRatio,
    verdict,
    reasons: getReasons({
      monthlyDisposable,
      protectedSavings,
      availableTripMoney,
      safeTripBudget,
      estimatedTripCost,
      affordabilityRatio,
      emergencyFund,
      verdict,
    }),
  };
}

function getVerdict({
  affordabilityRatio,
  monthlyDisposable,
  safeTripBudget,
  estimatedTripCost,
  emergencyFund,
}: {
  affordabilityRatio: number;
  monthlyDisposable: bigint;
  safeTripBudget: bigint;
  estimatedTripCost: bigint;
  emergencyFund: bigint;
}): TravelAffordabilityVerdict {
  if (
    monthlyDisposable <= ZERO ||
    safeTripBudget <= ZERO ||
    estimatedTripCost > safeTripBudget
  ) {
    return "DELAY";
  }

  if (emergencyFund <= ZERO || affordabilityRatio < 1.2) {
    return "CAUTION";
  }

  return "SAFE";
}

function getReasons({
  monthlyDisposable,
  protectedSavings,
  availableTripMoney,
  safeTripBudget,
  estimatedTripCost,
  affordabilityRatio,
  emergencyFund,
  verdict,
}: {
  monthlyDisposable: bigint;
  protectedSavings: bigint;
  availableTripMoney: bigint;
  safeTripBudget: bigint;
  estimatedTripCost: bigint;
  affordabilityRatio: number;
  emergencyFund: bigint;
  verdict: TravelAffordabilityVerdict;
}) {
  const reasons = [
    `Monthly disposable income is ${formatMoney(monthlyDisposable)} after fixed expenses, variable expenses, and the monthly savings goal.`,
    `Protected savings are ${formatMoney(protectedSavings)}, covering the emergency fund plus one month of essential expenses.`,
    `Available travel funds are ${formatMoney(availableTripMoney)} after protected savings and positive disposable income before travel are reserved.`,
    `The safe trip budget is ${formatMoney(safeTripBudget)} based on the smaller of available travel funds and 50% of positive monthly disposable income.`,
  ];

  if (emergencyFund <= ZERO) {
    reasons.push("Emergency fund is missing, so the trip cannot be marked SAFE.");
  }

  if (monthlyDisposable <= ZERO) {
    reasons.push("Monthly disposable income is zero or below after the savings goal.");
  }

  if (estimatedTripCost > safeTripBudget) {
    reasons.push(
      `Estimated trip cost of ${formatMoney(estimatedTripCost)} is above the safe trip budget.`,
    );
  } else if (verdict === "CAUTION") {
    reasons.push(
      `Estimated trip cost is within budget, but the affordability ratio of ${affordabilityRatio.toFixed(2)} leaves a narrow buffer.`,
    );
  } else {
    reasons.push(
      `Estimated trip cost is covered with an affordability ratio of ${affordabilityRatio.toFixed(2)}.`,
    );
  }

  return reasons;
}

function parseMoneyToCents(value: number | string, fieldName: string) {
  const raw =
    typeof value === "number"
      ? value.toString()
      : value.trim().replace(/,/g, "");

  if (!/^\d+(\.\d{1,2})?$/.test(raw)) {
    throw new RangeError(`${fieldName} must be a non-negative money amount`);
  }

  const [whole, fraction = ""] = raw.split(".");
  return BigInt(whole) * ONE_HUNDRED + BigInt(fraction.padEnd(2, "0"));
}

function parseMonths(value: number) {
  if (!Number.isInteger(value) || value < 0 || value > 600) {
    throw new RangeError("months until travel must be a whole number from 0 to 600");
  }

  return value;
}

function divideCents(value: bigint, divisor: bigint) {
  return value / divisor;
}

function minCents(left: bigint, right: bigint) {
  return left < right ? left : right;
}

function maxCents(left: bigint, right: bigint) {
  return left > right ? left : right;
}

function ratio(numerator: bigint, denominator: bigint) {
  if (denominator === ZERO) {
    return numerator > ZERO ? Number.POSITIVE_INFINITY : 0;
  }

  return Number((numerator * TEN_THOUSAND) / denominator) / 10_000;
}

function centsToNumber(value: bigint) {
  return Number(value) / 100;
}

function formatMoney(value: bigint) {
  const sign = value < ZERO ? "-" : "";
  const absolute = value < ZERO ? -value : value;
  const whole = absolute / ONE_HUNDRED;
  const cents = absolute % ONE_HUNDRED;

  return `${sign}₹${whole.toString()}.${cents.toString().padStart(2, "0")}`;
}
