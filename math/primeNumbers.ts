// 1, 2, 3, 4,  5, 6,  7  8 index
// 2, 3, 5, 7, 11, 13, 17 19 primzahl
// 1, 1, 2, 3, 6,  7,  10 11 differenz
// 1/2, 2/3, 3/5, 4/7, 5/11, 6/13, 7/17 8/19 relation

// eine formel um primzahlen zu berechnen
// 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30
// 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30
// 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30
// 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30
// 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30
// 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30
// 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30

// 1 ist die kleinste ganze Zahl was sie universell macht
// In meiner Ganzrelativen Zahlenfolgen ist 1 die groeßte Zahl die es gibt.
// Jede Zahl n, die nach 1 in der Zahlenfolge auftaucht, ist die 1 in n Teile aufgebrochen.
// Wodurch die Zahl n also n mal kleiner ist als 1.
// Man nimmt auch an, dass diese Zahlenfolge die natuerliche Zahlenfolge ist.
// Man koennte ja meinen, die 1 kann man ebenfalls in kleinere Zahlen teilen.
// Doch ist dies nur eine Frage der Perspektive. Hat man zwei Healften so muss man fuer diese zwei Healften 
// nur eine neue Einheit erfinden und schon sind wir wieder bei zwei einsen.
// Rechnet man zwei einsen zusammen so haben wir eine neue Zahl die doppelt so groß ist wie die vorherigen.
// Doch findet man eine neue Einheit fuer diese neue, doppelt so große Zahl, so hat man wieder nur eine 1.
// Ein mathematisches Universum was unendlich groß ist, ist zwangslaeufig auch unendlich klein.
// Es kommt deshalb darauf an, auf welcher Einheitenperspektive man sich befindet.
// Zum Beispiel koenen wir Tische in der Einheit "Tisch" zeahlen oder aber auch die Milliardan mal Millarden Tischmolekuehle,
// die die Tische zusammensetzen.
// Hat mein ein Reiskorn so zaehlt man in Reiskoernen. Hat man eine ganze Schale mit Reis so zeahlt man in Schallen.
// 100cm sind 1 Meter. 1000 Meter aber sind 1km.
// was im Grunde unzeahlbare Atome sind, ist am Ende nur ein einziges Universum.
// Am Ende hat man nur die 1.

// Deshalb ist in dieser Theorie jede Zahl außer 1 ein subterm der 1.
// Negative Zahlen sind das gleiche aber gespiegelt
// Die 0 steht fuer die Nichtexistenz einer Zahl.
// Eine Kommazahl ist eine Relation zwischen zwei Zahlen.
// Eine Relation ist eine Beziehung zwischen zwei Zahlen.
// Das Resultat ist die Schwingung der beiden Zahlen.

// Die Zahlenfolge sieht so aus:
// 1/1 1/2 1/3 1/4 1/5 1/6 1/7 1/8 1/9 1/10 ...

import {promises as fs} from 'fs';
import path from 'path';

const filePathPrime = path.join(__dirname, 'primeNumbers.json');

function isPrime(num: number): boolean {
    if (num < 2) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) return false;
    }
    return true;
}

function getFirstNPrimes(n: number): number[] {
    const primes: number[] = [];
    let num = 2;

    while (primes.length < n) {
        if (isPrime(num)) {
            primes.push(num);
        }
        num++;
    }

    return primes;
}

interface primeInterface {
    index: number;
    prime: number;
    timeToCalculate: number;
    quotient: number;
    difference: number;
}

async function writeFile(path: string, data: primeInterface[]): Promise<void> {
    const parsedContent = JSON.stringify(data, null, 2);

    try {
        await fs.writeFile(path, parsedContent, 'utf8');

    } catch (error) {
        console.error("Error writing file:", error)   
    }
}

function main() {
    let primes = getFirstNPrimes(1000).map((prime, index) => {
        return {
            index: index + 1,
            prime: prime,
            timeToCalculate: 0,
            quotient: index + 1 / prime,
            difference: Math.abs((index + 1) - prime)
        };
    })

    writeFile(filePathPrime, primes);
};

main();