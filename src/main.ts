import Graphs from "./Graphs";

const graph = new Graphs();

graph.insert("erfan");
graph.insert("ali");
graph.insert("reza");
graph.insert("hasn");
graph.insert("mohsen");

graph.connect("erfan", "ali");
graph.connect("erfan", "ali");
graph.connect("erfan", "mohsen");

graph.connect("reza", "ali");
graph.connect("hasn", "ali");
graph.connect("mohsen", "ali");

graph.connect("hasn", "mohsen");
graph.removeNode("ali");

console.log(graph);
