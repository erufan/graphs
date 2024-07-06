
---

# Graph Data Structure in TypeScript

This repository contains an implementation of a Graph data structure in TypeScript. The Graph supports insertion and removal of nodes, connecting and disconnecting nodes, printing the graph, performing topological sorts, and detecting cycles.

## Features

- **Insert**: Add a new node to the graph.
- **Remove Node**: Delete a node from the graph.
- **Connect**: Create a directed edge between two nodes.
- **Disconnect**: Remove a directed edge between two nodes.
- **Print**: Display the graph's adjacency list.
- **Topological Sort**: Perform a topological sort on the graph.
- **Cycle Detection**: Check if the graph contains a cycle.

## Usage
   ### Example

Here's an example of how to use the `Graphs` class:

```typescript
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

console.log(graph.hasCycle()); // Output: true

graph.print();
// Output:
// X is connected to A,B
// A is connected to P
// B is connected to P
// P is connected to X

console.log(graph.topologicalsorts()); // Output: ["X", "B", "A", "P"]
```
