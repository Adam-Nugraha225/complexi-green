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
  cpp: {
    iterative: `#include <iostream>
using namespace std;

// Fungsi iteratif menghitung jumlah deret bilangan kuadrat
int iterativeSquareSum(int n) {
    int sum = 0;
    for (int i = 1; i <= n; i++) {
        sum += i * i;  // Operasi: perbandingan, perkalian, penjumlahan
    }
    return sum;
}

int main() {
    int n = 10;
    cout << "Jumlah deret kuadrat 1.." << n << " = " << iterativeSquareSum(n);
    return 0;
}`,
    recursive: `#include <iostream>
using namespace std;

// Fungsi rekursif menghitung jumlah deret bilangan kuadrat
int recursiveSquareSum(int n) {
    if (n == 0) {
        return 0;  // Base case
    }
    return (n * n) + recursiveSquareSum(n - 1);  // Recursive call
}

int main() {
    int n = 10;
    cout << "Jumlah deret kuadrat 1.." << n << " = " << recursiveSquareSum(n);
    return 0;
}`,
  },
  go: {
    iterative: `package main

import "fmt"

// iterativeSquareSum menghitung jumlah deret bilangan kuadrat secara iteratif
func iterativeSquareSum(n int) int {
    sum := 0
    for i := 1; i <= n; i++ {
        sum += i * i  // Operasi: perbandingan, perkalian, penjumlahan
    }
    return sum
}

func main() {
    n := 10
    fmt.Printf("Jumlah deret kuadrat 1..%d = %d\\n", n, iterativeSquareSum(n))
}`,
    recursive: `package main

import "fmt"

// recursiveSquareSum menghitung jumlah deret bilangan kuadrat secara rekursif
func recursiveSquareSum(n int) int {
    if n == 0 {
        return 0  // Base case
    }
    return (n * n) + recursiveSquareSum(n-1)  // Recursive call
}

func main() {
    n := 10
    fmt.Printf("Jumlah deret kuadrat 1..%d = %d\\n", n, recursiveSquareSum(n))
}`,
  },
  pseudocode: {
    iterative: `function iterativeSquareSum(n : integer) → integer
    sum : integer
    i : integer
    sum ← 0

    FOR i ← 1 TO n DO
        sum ← sum + (i * i)
    ENDFOR

    RETURN sum
end function


PROGRAM UTAMA
    n : integer
    n ← 10

    output("Jumlah deret kuadrat 1.." + n + " = " + iterativeSquareSum(n))
END PROGRAM`,
    recursive: `function recursiveSquareSum(n : integer) → integer
    IF n = 0 THEN
        RETURN 0
    ENDIF

    RETURN (n * n) + recursiveSquareSum(n - 1)
end function


PROGRAM UTAMA
    n : integer
    n ← 10

    output("Jumlah deret kuadrat 1.." + n + " = " + recursiveSquareSum(n))
END PROGRAM`,
  },
  react: {
    iterative: `import { useState } from 'react';

// Interface untuk hasil algoritma
interface AlgorithmResult {
  sequence: number[];
  sum: number;
  operations: number;
  executionTime: number;
}

// Fungsi iteratif menghitung jumlah deret bilangan kuadrat
function iterativeSquareSum(n: number): AlgorithmResult {
  const startTime = performance.now();
  const sequence: number[] = [];
  let sum = 0;
  let operations = 0;

  for (let i = 1; i <= n; i++) {
    const squared = i * i;
    sequence.push(squared);
    sum += squared;
    operations += 3; // perbandingan, perkalian, penjumlahan
  }

  const endTime = performance.now();
  return {
    sequence,
    sum,
    operations,
    executionTime: endTime - startTime,
  };
}

// Komponen React
export default function SquareSumCalculator() {
  const [n, setN] = useState<number>(10);
  const [result, setResult] = useState<AlgorithmResult | null>(null);

  const handleCalculate = () => {
    if (n > 0 && n <= 10000) {
      setResult(iterativeSquareSum(n));
    }
  };

  return (
    <div>
      <input 
        type="number" 
        value={n} 
        onChange={(e) => setN(Math.max(1, Math.min(10000, Number(e.target.value) || 1)))}
        min="1"
        max="10000"
      />
      <button onClick={handleCalculate}>Hitung Iteratif</button>
      {result && (
        <div>
          <p>Jumlah: {result.sum.toLocaleString()}</p>
          <p>Operasi: {result.operations.toLocaleString()}</p>
          <p>Waktu: {result.executionTime.toFixed(4)} ms</p>
        </div>
      )}
    </div>
  );
}`,
    recursive: `import { useState } from 'react';

// Interface untuk hasil algoritma
interface AlgorithmResult {
  sequence: number[];
  sum: number;
  operations: number;
  executionTime: number;
}

// Fungsi rekursif menghitung jumlah deret bilangan kuadrat
function recursiveSquareSum(n: number, memo: { ops: number } = { ops: 0 }): AlgorithmResult {
  const startTime = performance.now();
  const sequence: number[] = [];

  function recurse(current: number): number {
    memo.ops += 1; // function call
    if (current === 0) {
      return 0;
    }
    const squared = current * current;
    sequence.unshift(squared);
    memo.ops += 2; // perkalian, penjumlahan
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

// Komponen React
export default function SquareSumCalculator() {
  const [n, setN] = useState<number>(10);
  const [result, setResult] = useState<AlgorithmResult | null>(null);

  const handleCalculate = () => {
    if (n > 0 && n <= 10000) {
      setResult(recursiveSquareSum(n));
    }
  };

  return (
    <div>
      <input 
        type="number" 
        value={n} 
        onChange={(e) => setN(Math.max(1, Math.min(10000, Number(e.target.value) || 1)))}
        min="1"
        max="10000"
      />
      <button onClick={handleCalculate}>Hitung Rekursif</button>
      {result && (
        <div>
          <p>Jumlah: {result.sum.toLocaleString()}</p>
          <p>Operasi: {result.operations.toLocaleString()}</p>
          <p>Waktu: {result.executionTime.toFixed(4)} ms</p>
        </div>
      )}
    </div>
  );
}`,
  },
};
