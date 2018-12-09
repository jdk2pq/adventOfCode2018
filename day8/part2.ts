import {input} from "./input";

interface Node {
    numChildNodes: number;
    numMetadata: number;
    metadata: Array<number>;
    childNodes: Array<Node>;
}
const testInput = '2 3 0 3 10 11 12 1 1 0 1 99 2 1 1 2';
const inVals = input;
const split = inVals.split(' ');
const nodes = [];
let startPosition = 0;
const addNode = (): Node => {
    // console.log(`startPosition: ${startPosition}`);
    // console.log(`childNodes: ${split[startPosition]}`);
    // console.log(`metadata: ${split[startPosition + 1]}`);
    const node = {
        numChildNodes: +split[startPosition],
        numMetadata: +split[++startPosition],
        metadata: [],
        childNodes: []
    } as Node;
    for (let j = 0; j < node.numChildNodes; j++) {
        ++startPosition;
        const childNode = addNode();
        node.childNodes.push(childNode);
    }
    for (let i = 0; i < node.numMetadata; i++) {
        node['metadata'].push(+split[++startPosition]);
    }
    nodes.push(node);
    return node;
};
addNode();

const getValue = (workingNode: Node): number => {
    if (workingNode.numChildNodes > 0) {
        return workingNode.metadata.reduce((acc, childNodeOrder: number) => {
            const childNode = workingNode.childNodes[childNodeOrder - 1];
            if (childNode) {
                const value = getValue(childNode);
                // console.log(`value of ${childNode}: ${value}`);
                return acc + value;
            } else {
                // console.log(`can't get ${childNodeOrder} from ${workingNode.childNodes.join(',')}`);
                return acc;
            }
        }, 0);
    } else {
        return workingNode.metadata.reduce((acc, num) => acc + num, 0);
    }
};
// console.log(nodes);
console.log(getValue(nodes[nodes.length - 1]));