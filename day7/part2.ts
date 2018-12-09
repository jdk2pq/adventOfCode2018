import flatMap = require('lodash/flatMap');
import filter = require('lodash/filter');
import includes = require('lodash/includes');
import sortBy = require('lodash/sortBy');
import uniqBy = require('lodash/uniqBy');
import {input} from "./input";

const testInput = [
    'Step C must be finished before step A can begin.',
    'Step C must be finished before step F can begin.',
    'Step A must be finished before step B can begin.',
    'Step A must be finished before step D can begin.',
    'Step B must be finished before step E can begin.',
    'Step D must be finished before step E can begin.',
    'Step F must be finished before step E can begin.'
];
const ADDITIONAL_SECONDS = 60;
const MAX_WORKERS = 5;

const abcs = [
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z',
];
const inVals: string[] = input;
interface Node {
    letter: string;
    links: Array<string>;
    time: number;
}
const graph: Array<Node> = [];
inVals.forEach((str) => {
    const split = str.split(' ');
    const step = split[1];
    const link = split[7];
    let node = graph.find((n) => n.letter === step);
    let linkNode = graph.find((n) => n.letter === link);
    if (!linkNode) {
        linkNode = {
            letter: link,
            links: [],
            time: ADDITIONAL_SECONDS + abcs.indexOf(link.toLowerCase()) + 1
        } as Node;
        graph.push(linkNode);
    }
    if (!node) {
        node = {
            letter: step,
            links: [],
            time: ADDITIONAL_SECONDS + abcs.indexOf(step.toLowerCase()) + 1
        } as Node;
        node.links.push(link);
        graph.push(node);
    } else {
        node.links.push(link);
        graph.splice(graph.findIndex((n) => n.letter === step), 1, node);
    }
});
console.log(graph);
const startNodeLetters: string = filter(flatMap(graph, (node: Node) => node.letter), (letter: string) => !includes(flatMap(graph, (node: Node) => node.links), letter));
const startNodes: Node[] = sortBy(graph.filter((node: Node) => startNodeLetters.includes(node.letter)), (node) => node.letter);
let workers = [];
let iter = -1;
let nodesToWorkOn: Node[] = [];
const visited = [];

const workOnNode = () => {
    // console.log('\n new iteration:');
    iter = iter + 1;
    workers.forEach((node: Node, idx: number) => {
        if (iter >= node.time) {
            // console.log('deleting ' + workers[idx]);
            visited.push(node.letter);
            delete workers[idx];
        }
    });
    workers = workers.filter((node) => !!node);
    const nodesThatCanBeWorkedOn = uniqBy(filter(sortBy(nodesToWorkOn.filter((node: Node) => {
        const needsToVisit = graph.filter(n => n.links.includes(node.letter)).map((n) => n.letter);
        return needsToVisit.every((letter) => visited.includes(letter));
    }), (node: Node) => node.letter), (node) => !!node), (n) => n.letter);
    // console.log('workers.length: ' + workers.length);
    // console.log('nodesThatCanBeWorkedOn.length: ' + nodesThatCanBeWorkedOn.length);
    // console.log('workers.length < MAX_WORKERS && nodesThatCanBeWorkedOn.length > 0): ' + (workers.length < MAX_WORKERS && nodesThatCanBeWorkedOn.length > 0));
    if (workers.length < MAX_WORKERS && nodesThatCanBeWorkedOn.length > 0) {
        const nodesGoingToWorker: Node[] = nodesThatCanBeWorkedOn.slice(0, MAX_WORKERS - workers.length);
        // console.log(nodesGoingToWorker);
        nodesGoingToWorker.forEach(node => {
            nodesToWorkOn = nodesToWorkOn.filter((n) => node.letter !== n.letter);
            node.time = node.time + iter;
            workers.push(node);
            node.links.forEach((str) => {
                let foundLink = graph.find((node) => node.letter === str);
                if (foundLink) {
                    nodesToWorkOn.push(foundLink);
                }
            });
        });
    }
    // console.log(iter);
    // console.log(workers);
    if (workers.length > 0 || nodesToWorkOn.length > 0) {
        workOnNode();
    }
};
nodesToWorkOn = nodesToWorkOn.concat(startNodes);
workOnNode();
console.log(iter);