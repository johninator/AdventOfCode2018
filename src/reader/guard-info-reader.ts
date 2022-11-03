import { displayPartsToString, getDefaultFormatCodeSettings, isMinusToken } from 'typescript';
import { Reader } from './reader';

export enum ShiftInfo {
    START,
    ASLEEP,
    WAKEUP
}

export interface GuardInfo {
    month: number;
    day: number;
    hour: number;
    minute: number;
    id: number;
    shiftInfo: ShiftInfo;
}

export class GuardInfoReader extends Reader {
    read(): GuardInfo[] {
        const fileContent = super.read();
        const lines = fileContent.split(/\r?\n/).map((value: string) => {
            return value;
        });

        let guardInfos: GuardInfo[] = [];

        lines.forEach((line: string) => {
            const firstDashIndex = line.indexOf('-');
            const secondDashIndex = line.indexOf('-', firstDashIndex + 1);
            const colonIndex = line.indexOf(':');
            const closingBracketIndex = line.indexOf(']');
            const hashIndex = line.indexOf('#');
            const beginsIndex = line.indexOf('begins');

            const month: number = parseInt(line.substring(firstDashIndex + 1, secondDashIndex));
            const day: number = parseInt(line.substring(secondDashIndex + 1, secondDashIndex + 3));
            const hour: number = parseInt(line.substring(colonIndex + -2, colonIndex));
            const minute: number = parseInt(line.substring(colonIndex + 1, closingBracketIndex));
            const id: number = (hashIndex === -1) ? -1 : parseInt(line.substring(hashIndex + 1, beginsIndex));
            const shiftInfo: ShiftInfo = (() => {

                if (hashIndex !== -1) {
                    return ShiftInfo.START;
                }

                const shiftInfoString = line.substring(closingBracketIndex + 2);

                if (shiftInfoString === 'wakes up') {
                    return ShiftInfo.WAKEUP;
                }
                return ShiftInfo.ASLEEP;
            }).call(this);
            

            guardInfos.push({
                month: month,
                day: day,
                hour: hour,
                minute: minute,
                id: id,
                shiftInfo: shiftInfo
            });
        });

        return guardInfos;
    }
}
