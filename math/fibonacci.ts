import { promises as fs } from 'fs';
import path from 'path';

const filePathFib = path.join(__dirname, "fibonacci.json");

interface dataInterface {
    number: number;
    normalTime: number;
    memoTime: number;
    binetTime: number;
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

function binet_fibonacci(n: number): number {
    const phi = (1 + Math.sqrt(5)) / 2;
    
    const fibN = (1 / Math.sqrt(5)) * (Math.pow(phi, n) - Math.pow(1 - phi, n));
    
    return Math.round(fibN);
}

async function writeFile(path: string, data: dataInterface): Promise<void> {
    let initContent = 
      `[
          {"${data.number}": 
              {
                  "number": ${data.number},
                  "normal_fibonacci_function": ${data.normalTime},
                  "memoization_fibonacci_function": ${data.memoTime},
                  "binet_fibonacci_function": ${data.binetTime},
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
                binet_fibonacci_function: data.binetTime,
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
    for (let i = 0; i <= 1000; i++) {
        const data: dataInterface = {
            number: i,
            normalTime: 0,
            memoTime: 0,
            binetTime: 0,
            quotient: 0,
            fibonacci_number: 0,
        };
        
        performance.mark("start_normal");
        await sleep(10);
        //fibonacci(data.number);
        performance.mark("end_normal");
        performance.measure("Normal Fibonacci", "start_normal", "end_normal");
    
        performance.mark("start_memo");
        data.fibonacci_number = memo_fibonacci(data.number, []);
        performance.mark("end_memo");
        performance.measure("Memoized Fibonacci", "start_memo", "end_memo");

        performance.mark("start_binet")
        binet_fibonacci(data.number);
        performance.mark("end_binet")
        performance.measure("Binet Fibonacci", "start_binet", "end_binet");

        const normalMeasure = performance.getEntriesByName("Normal Fibonacci").pop();
        const memoMeasure = performance.getEntriesByName("Memoized Fibonacci").pop();
        const binetMeasure = performance.getEntriesByName("Binet Fibonacci").pop();
    
        if (normalMeasure && memoMeasure && binetMeasure) {
            data.normalTime = normalMeasure.duration;
            data.memoTime = memoMeasure.duration;
            data.binetTime = binetMeasure.duration;
            data.quotient = data.normalTime / data.memoTime;
        }
    
        await writeFile(filePathFib, data);
    
        performance.clearMarks();
        performance.clearMeasures();
    }
    
}

async function sleep(ms: number):Promise<void> {
    return new Promise(res => setTimeout(res, ms))
}

main();