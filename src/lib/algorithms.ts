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
  react: {
    iterative: `// React/TypeScript - Algoritma Iteratif
export function iterativeSquareSum(n: number): { sum: number; operations: number } {
  let sum = 0;
  let operations = 0;

  for (let i = 1; i <= n; i++) {
    sum += i * i;     // Kuadratkan dan tambahkan
    operations += 3;  // perbandingan, perkalian, penjumlahan
  }

  return { sum, operations };
}

// Contoh penggunaan di React Component
const SquareCalculator: React.FC = () => {
  const [n, setN] = useState(10);
  const result = iterativeSquareSum(n);
  
  return (
    <div>
      <p>Jumlah: {result.sum}</p>
      <p>Operasi: {result.operations}</p>
    </div>
  );
};`,
    recursive: `// React/TypeScript - Algoritma Rekursif
export function recursiveSquareSum(n: number): { sum: number; operations: number } {
  let operations = 0;

  function recurse(current: number): number {
    operations++;  // Function call sebagai operasi
    if (current === 0) return 0;  // Base case
    
    operations += 2;  // perkalian dan penjumlahan
    return (current * current) + recurse(current - 1);
  }

  const sum = recurse(n);
  return { sum, operations };
}

// Contoh penggunaan di React Component
const RecursiveCalculator: React.FC = () => {
  const [n, setN] = useState(10);
  const result = recursiveSquareSum(n);
  
  return (
    <div>
      <p>Jumlah: {result.sum}</p>
      <p>Operasi: {result.operations}</p>
    </div>
  );
};`,
  },
  pseudocode: {
    iterative: `ALGORITMA IterativeSquareSum
// Menghitung jumlah deret bilangan kuadrat secara iteratif
// Input: n (bilangan bulat positif)
// Output: sum (jumlah deret kuadrat 1² + 2² + ... + n²)

BEGIN
    sum ← 0
    operations ← 0
    
    FOR i ← 1 TO n DO
        squared ← i × i           // Hitung kuadrat
        sum ← sum + squared       // Tambahkan ke total
        operations ← operations + 3
    END FOR
    
    RETURN sum, operations
END

// Kompleksitas Waktu: O(n)
// Kompleksitas Ruang: O(1)`,
    recursive: `ALGORITMA RecursiveSquareSum
// Menghitung jumlah deret bilangan kuadrat secara rekursif
// Input: n (bilangan bulat positif)
// Output: sum (jumlah deret kuadrat 1² + 2² + ... + n²)

FUNCTION RecursiveSquareSum(n)
BEGIN
    // Base Case
    IF n = 0 THEN
        RETURN 0
    END IF
    
    // Recursive Case
    squared ← n × n
    RETURN squared + RecursiveSquareSum(n - 1)
END

// Kompleksitas Waktu: O(n)
// Kompleksitas Ruang: O(n) - karena call stack`,
  },
};
