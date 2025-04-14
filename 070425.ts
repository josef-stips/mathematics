function memo_fibonacci(n: number, memo: number[]): number {
    if(memo[n] !== undefined) return memo[n];
    if (n <= 1) return n;

    memo[n] = memo_fibonacci(n - 1, memo) + memo_fibonacci(n - 2, memo);
    return memo[n];
}

function fibonacci(n: number): number {
    if (n <= 1) return n;

    return fibonacci(n - 1) + fibonacci(n - 2);
}

function main() {
    performance.mark("start");

    console.log("normal fibonacci: ", fibonacci(21)); // 10946
    // console.log("memoization fibonacci: ", memo_fibonacci(21, [])); // 10946

    performance.mark("end");
};