import { GuardInfoReader, GuardInfo, ShiftInfo } from '../reader/guard-info-reader';

const reader = new GuardInfoReader('../inputs/input4.txt');
const guardInfosUnordered = reader.read();

computeResult(guardInfosUnordered);

interface GuardTimeEntry {
    minuteStart: number;
    minuteEnd: number;
}


function computeResult(guardInfosUnordered: GuardInfo[]): void {
    const guardInfos = sortGuardInfos(guardInfosUnordered);
    const minutesPerGuard = computeMinutesPerGuard(guardInfos);
    const idGuardSleepiest = findSleepiestGuard(minutesPerGuard);
    const sleepiestMinute = findSleepiestMinute(minutesPerGuard.get(idGuardSleepiest)!);
    console.log(sleepiestMinute * idGuardSleepiest);
}

function sortGuardInfos(guardInfosUnordered: GuardInfo[]): GuardInfo[] {
    const guardInfosOrdered = guardInfosUnordered.sort((a, b) => {
        if (a.month < b.month) {
            return -1;
        }
        if (b.month < a.month) {
            return 1;
        }
        if (a.day < b.day) {
            return -1;
        }
        if (b.day < a.day) {
            return 1;
        }
        if (a.hour < b.hour) {
            return -1;
        }
        if (b.hour < a.hour) {
            return 1;
        }
        if (a.minute < b.minute) {
            return -1;
        }
        if (b.minute < a.minute) {
            return 1;
        }
        return 0;
    });
    return guardInfosOrdered;
}

function computeMinutesPerGuard(guardInfos: GuardInfo[]): Map<number, GuardTimeEntry[]> {

    let minutesPerGuard = new Map<number, GuardTimeEntry[]>();
    let idGuard = 0;
    let minuteStart = -1;
    let minuteEnd = -1;

    guardInfos.forEach((guardInfo) => {
        if (guardInfo.shiftInfo === ShiftInfo.START) {
            idGuard = guardInfo.id;
            return;
        }

        if (guardInfo.shiftInfo === ShiftInfo.ASLEEP) {
            minuteStart = guardInfo.minute;
            return;
        }

        minuteEnd = guardInfo.minute;
        if (minutesPerGuard.has(idGuard)) {
            minutesPerGuard.get(idGuard)?.push({ minuteStart, minuteEnd });
            return;
        }

        minutesPerGuard.set(idGuard, [{ minuteStart, minuteEnd }]);
    });

    return minutesPerGuard;
}

function findSleepiestGuard(minutesPerGuard: Map<number, GuardTimeEntry[]>): number {
    let idGuardSleepiest = 0;
    let minutesAsleepMax = 0;
    minutesPerGuard.forEach((guardTimeEntries, guardId) => {
        const minutesAsleep = guardTimeEntries.reduce((minutesSum, guardTimeEntry) => {
            let minutesSlept = guardTimeEntry.minuteEnd - guardTimeEntry.minuteStart;
            if (minutesSlept < 0) {
                minutesSlept += 60;
            }
            return minutesSum + minutesSlept;
        }, 0);
        if (minutesAsleep > minutesAsleepMax) {
            minutesAsleepMax = minutesAsleep;
            idGuardSleepiest = guardId;
        }
    });

    return idGuardSleepiest;
}

function findSleepiestMinute(guardTimeEntries: GuardTimeEntry[]): number {

    let minutesAsleep = new Array(60).fill(0);

    guardTimeEntries.forEach((guardTimeEntry) => {
        for (let i = guardTimeEntry.minuteStart; i < guardTimeEntry.minuteEnd; ++i) {
            if (i > 59) {
                i = 0;
            }
            minutesAsleep[i] += 1;
        }
    });

    const indexMax = minutesAsleep.indexOf(Math.max(...minutesAsleep));
    return indexMax;
}