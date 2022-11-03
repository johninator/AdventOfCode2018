import { GuardInfoReader, GuardInfo, ShiftInfo } from '../reader/guard-info-reader';

const reader = new GuardInfoReader('../inputs/input4.txt');
const guardInfosUnordered = reader.read();
const guardInfos = guardInfosUnordered.sort((a,b) => {
    if (a.month < b.month) { return -1;} 
    if (b.month < a.month) { return 1; } 
    if (a.day < b.day) { return -1; } 
    if (b.day < a.day) { return 1; } 
    if (a.hour < b.hour) { return -1; } 
    if (b.hour < a.hour) { return 1; } 
    if (a.minute < b.minute) { return -1; } 
    if (b.minute < a.minute) { return 1; } 
    return 0;
});

computeResult(guardInfos);

interface GuardTimeEntry {
    minuteStart: number;
    minuteEnd: number;
}

function computeResult(guardInfos: GuardInfo[]): number {

    let minutesPerGuard = new Map<number, GuardTimeEntry[]>();
    let idGuard = 0;
    let guardTimeEntry: GuardTimeEntry = {minuteStart: -1, minuteEnd: -1};

    guardInfos.forEach((guardInfo) => {
        idGuard = guardInfo.id !== -1 ? guardInfo.id : idGuard;
        if (guardInfo.shiftInfo === ShiftInfo.WAKEUP) {
            guardTimeEntry.minuteStart = guardInfo.minute;
            return;
        }
        guardTimeEntry.minuteEnd = guardInfo.minute;
        if (minutesPerGuard.has(idGuard)) {
            minutesPerGuard.get(idGuard)?.push(guardTimeEntry);
            return;
        }
        minutesPerGuard.set(idGuard, [guardTimeEntry]);
    });

    console.log(minutesPerGuard);


    return 0;
}

