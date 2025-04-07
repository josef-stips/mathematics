import os from "os";
import { promises as fs } from 'fs';
import path, { dirname } from "path";
import { filePath } from "../constants";


interface dataInterface {
    number: number;
    normalTime: number;
    memoTime: number;
    quotient: number;
    fibonacci_number: number;
}

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

async function writeFile(path: string, data: dataInterface): Promise<void> {
    let initContent = 
      `[
          {"${data.number}": 
              {
                  "number": ${data.number},
                  "normal_fibonacci_function": ${data.normalTime},
                  "memoization_fibonacci_function": ${data.memoTime},
                  "quotient": ${data.quotient},
                  "fibonacci_number": ${data.fibonacci_number}
              }
          }
      ]`;
  
    try {
        const content = await fs.readFile(path, 'utf8');
        const jsonContent = JSON.parse(content);

        jsonContent.push({
            [data.number]: {
                number: data.number,
                normal_fibonacci_function: data.normalTime,
                memoization_fibonacci_function: data.memoTime,
                quotient: data.quotient,
                fibonacci_number: data.fibonacci_number,
            },
        });

        await fs.writeFile(path, JSON.stringify(jsonContent, null, 2), 'utf8');
        console.log("File updated with new content.");

    } catch (err: any) {

        if (err.code === 'ENOENT') {
            await fs.writeFile(path, initContent, 'utf8');
            console.log("File initialized with new content.");
        } else {
            console.error("Error reading or writing the file:", err);
        }
    }
  }

async function main() {
    for (let i = 0; i <= 40; i++) {
        const data: dataInterface = {
            number: i,
            normalTime: 0,
            memoTime: 0,
            quotient: 0,
            fibonacci_number: 0,
        };
    
        performance.mark("start_normal");
        fibonacci(data.number);
        performance.mark("end_normal");
        performance.measure("Normal Fibonacci", "start_normal", "end_normal");
    
        performance.mark("start_memo");
        data.fibonacci_number = memo_fibonacci(data.number, []);
        performance.mark("end_memo");
        performance.measure("Memoized Fibonacci", "start_memo", "end_memo");
    
        const normalMeasure = performance.getEntriesByName("Normal Fibonacci").pop();
        const memoMeasure = performance.getEntriesByName("Memoized Fibonacci").pop();
    
        if (normalMeasure && memoMeasure) {
            data.normalTime = normalMeasure.duration;
            data.memoTime = memoMeasure.duration;
            data.quotient = data.normalTime / data.memoTime;
        }
    
        await writeFile(filePath, data);
    
        performance.clearMarks();
        performance.clearMeasures();
    }
    
}

main();