// Algorithm implementations for square number series

export interface AlgorithmResult {
  sequence: number[];
  sum: number;
  operations: number;
  executionTime: number;
}

export interface StepData {
  step: number;
  value: number;
  squared: number;
  currentSum: number;
}

// Iterative algorithm to calculate sum of square numbers
export function iterativeSquareSum(n: number): AlgorithmResult {
  const startTime = performance.now();
  const sequence: number[] = [];
  let sum = 0;
  let operations = 0;

  for (let i = 1; i <= n; i++) {
    const squared = i * i;
    sequence.push(squared);
    sum += squared;
    operations += 3; // comparison, multiplication, addition
  }

  const endTime = performance.now();
  return {
    sequence,
    sum,
    operations,
    executionTime: endTime - startTime,
  };
}

// Recursive algorithm to calculate sum of square numbers
export function recursiveSquareSum(n: number, memo: { ops: number } = { ops: 0 }): AlgorithmResult {
  const startTime = performance.now();
  const sequence: number[] = [];

  function recurse(current: number): number {
    memo.ops += 1; // function call
    if (current === 0) {
      return 0;
    }
    const squared = current * current;
    sequence.unshift(squared);
    memo.ops += 2; // multiplication, addition
    return squared + recurse(current - 1);
  }

  const sum = recurse(n);
  const endTime = performance.now();

  return {
    sequence,
    sum,
    operations: memo.ops,
    executionTime: endTime - startTime,
  };
}

// Generate step-by-step data for visualization
export function generateSteps(n: number): StepData[] {
  const steps: StepData[] = [];
  let currentSum = 0;

  for (let i = 1; i <= n; i++) {
    const squared = i * i;
    currentSum += squared;
    steps.push({
      step: i,
      value: i,
      squared,
      currentSum,
    });
  }

  return steps;
}

// Run experiments for predefined input sizes
export interface ExperimentResult {
  n: number;
  iterativeTime: number;
  recursiveTime: number;
  iterativeOps: number;
  recursiveOps: number;
}

export function runExperiments(): ExperimentResult[] {
  const sizes = [1, 10, 20, 50, 100, 500, 1000, 2000, 5000, 10000];
  const results: ExperimentResult[] = [];

  for (const n of sizes) {
    const iterResult = iterativeSquareSum(n);
    const recResult = recursiveSquareSum(n);

    results.push({
      n,
      iterativeTime: iterResult.executionTime,
      recursiveTime: recResult.executionTime,
      iterativeOps: iterResult.operations,
      recursiveOps: recResult.operations,
    });
  }

  return results;
}

// Code snippets for different languages
export const codeSnippets = {
  pseudocode: {
    iterative: `function iterativeSquareSum(n : integer) → integer
    sum : integer
    i : integer
    sum ← 0

    FOR i ← 1 TO n DO
        sum ← sum + (i * i)
    ENDFOR

    RETURN sum
end function`,
    recursive: `function recursiveSquareSum(n : integer) → integer
    IF n = 0 THEN
        RETURN 0
    ENDIF

    RETURN (n * n) + recursiveSquareSum(n - 1)
end function`,
  },
  react: {
    iterative: `function iterativeSquareSum(n: number): number {
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i * i;
  }
  return sum;
}`,
    recursive: `function recursiveSquareSum(n: number): number {
  if (n === 0) {
    return 0;
  }
  return (n * n) + recursiveSquareSum(n - 1);
}`,
  },
};
