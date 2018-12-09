import flatMap = require('lodash/flatMap');
import filter = require('lodash/filter');
import includes = require('lodash/includes');
import sortBy = require('lodash/sortBy');
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

const inVals: string[] = input;
interface Node {
    letter: string;
    links: Array<string>;
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
            links: []
        } as Node;
        graph.push(linkNode);
    }
    if (!node) {
        node = {
            letter: step,
            links: []
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
let visited = [];
let visitNext: string[] = [];
const visitNode = (workingNode: Node) => {
    if (!visited.includes(workingNode.letter)) {
        // console.log(`visiting ${workingNode.letter}`);
        visited.push(workingNode.letter);
        workingNode.links.forEach((str) => visitNext.push(str));
        visitNext = visitNext.filter((str) => str !== workingNode.letter) || [];
        let canBeVisited = visitNext.filter((str) => {
            const needsToVisit = graph.filter(n => n.links.includes(str)).map((n) => n.letter);
            return needsToVisit.every((letter) => visited.includes(letter));
        });
        canBeVisited = sortBy(canBeVisited);
        while (canBeVisited.length > 0) {
            let str = canBeVisited.shift();
            let foundLink = graph.find((node) => node.letter === str);
            if (foundLink) {
                visitNode(foundLink);
            }
        }
    }
};
startNodes.forEach((startNode) => {
    visitNode(startNode);
    console.log(`${startNode.letter}: ${visited.join('')}`);
});
