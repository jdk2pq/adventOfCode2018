import sortBy = require('lodash/sortBy');
import filter from 'lodash/filter';
import find from 'lodash/find';
import includes = require('lodash/includes');
import moment = require("moment");
import maxBy = require("lodash/maxBy");
import range = require("lodash/range");
import countBy = require("lodash/countBy");
import {input} from "./input";
const testInput = [
    '[1518-11-01 00:00] Guard #10 begins shift',
    '[1518-11-01 00:05] falls asleep',
    '[1518-11-01 00:25] wakes up',
    '[1518-11-01 00:30] falls asleep',
    '[1518-11-01 00:55] wakes up',
    '[1518-11-01 23:58] Guard #99 begins shift',
    '[1518-11-02 00:40] falls asleep',
    '[1518-11-02 00:50] wakes up',
    '[1518-11-03 00:05] Guard #10 begins shift',
    '[1518-11-03 00:24] falls asleep',
    '[1518-11-03 00:29] wakes up',
    '[1518-11-04 00:02] Guard #99 begins shift',
    '[1518-11-04 00:36] falls asleep',
    '[1518-11-04 00:46] wakes up',
    '[1518-11-05 00:03] Guard #99 begins shift',
    '[1518-11-05 00:45] falls asleep',
    '[1518-11-05 00:55] wakes up'
];

const inVals = input;
const format = 'YYYY-MM-DD HH:mm';

const sortedValues: string[] = sortBy(inVals, (single: string) => {
    return moment(single.split(']')[0].replace(/\[/, ''), format).valueOf()
});

const onlyGuardValues: string[] = sortedValues.filter((single) => includes(single, 'Guard'));

const guards: {addedTogether: number, vals: number[]}[] = [];
onlyGuardValues.forEach((singleGuard: string, idx: number) => {
    const guard = +singleGuard.split(' ')[3].replace(/#/, '');
    const guardEndShift = onlyGuardValues[idx + 1];
    const guardValues =  sortedValues.slice(sortedValues.indexOf(singleGuard) + 1, guardEndShift ? sortedValues.indexOf(guardEndShift) : sortedValues.length);
    // console.log(guardValues);
    let acc = guards[guard] ? guards[guard].addedTogether : 0;
    const vals = guards[guard] ? guards[guard].vals : [];
    guardValues.forEach((value, i) => {
        if (includes(value, 'falls asleep')) {
            const startStr = value.split(']')[0].replace(/\[/, '');
            const start = moment(startStr, format);
            const endStr = guardValues[i + 1].split(']')[0].replace(/\[/, '');
            const end = moment(endStr, format);
            const duration = moment.duration(start.diff(end));
            const inc = Math.abs(duration.asMinutes());
            acc = acc + inc;
            range(inc).forEach((num) => {
                // console.log(start.minute() + num % 59);
                vals.push((start.minute() + num) % 59);
            });
        }
    });
    guards[guard] = { addedTogether: acc, vals: vals };
});
const max = maxBy(guards, function (guard) {
    if (guard) {
        const counts = countBy(guard.vals);
        return maxBy(guard.vals, (val) => counts[val]);
    }
});
console.log(guards.indexOf(max));
const counts = countBy(max.vals);
console.log(maxBy(max.vals, (val) => counts[val]));
console.log(guards.indexOf(max) * maxBy(max.vals, (val) => counts[val]));