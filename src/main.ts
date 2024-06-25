import Graphs from "./Graphs";

const graph = new Graphs();

graph.insert("X");
graph.insert("A");
graph.insert("B");
graph.insert("P");

graph.connect("X", "A");
graph.connect("X", "B");
graph.connect("A", "P");
graph.connect("B", "P");
graph.connect("P", "X");

console.log(graph.hasCycle());
