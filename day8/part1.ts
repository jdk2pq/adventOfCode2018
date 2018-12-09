import {input} from "./input";

interface Node {
    numChildNodes: number;
    numMetadata: number;
    metadata: Array<number>;
}
const testInput = '2 3 0 3 10 11 12 1 1 0 1 99 2 1 1 2';
const inVals = input;
const split = inVals.split(' ');
const nodes = [];
let startPosition = 0;
const addNode = () => {
    console.log(`startPosition: ${startPosition}`);
    console.log(`childNodes: ${split[startPosition]}`);
    console.log(`metadata: ${split[startPosition + 1]}`);
    const node = {
        numChildNodes: +split[startPosition],
        numMetadata: +split[++startPosition],
        metadata: []
    } as Node;
    for (let j = 0; j < node.numChildNodes; j++) {
        ++startPosition;
        addNode();
    }
    for (let i = 0; i < node.numMetadata; i++) {
        node['metadata'].push(+split[++startPosition]);
    }
    nodes.push(node);
};
addNode();
console.log(nodes);
console.log(nodes.length);
console.log(nodes.reduce((acc, node: Node) => acc + node.metadata.reduce((a, m) => a + m, 0), 0));