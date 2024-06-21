class Nodes {
  constructor(public label: string) {}
}

class Graphs {
  private peopleList = new Map<string, Nodes>();
  private adjacencyList = new Map<Nodes, Nodes[]>();

  public insert(label: string) {
    const node = new Nodes(label);

    this.peopleList.set(label, node);
    this.adjacencyList.set(node, []);
  }

  public removeNode(label: string) {
    const nodeToRemove = this.peopleList.get(label);

    if (!nodeToRemove) return;

    for (let sourceNode of this.adjacencyList.keys()) {
      const neighborConnections = this.adjacencyList.get(sourceNode)!;

      if (neighborConnections.length > 0) {
        this.adjacencyList.set(
          sourceNode,
          neighborConnections.filter((connection) => connection.label !== label)
        );
      }
    }

    this.peopleList.delete(label);
    this.adjacencyList.delete(nodeToRemove);
  }

  public connect(from: string, to: string) {
    const fromNode = this.peopleList.get(from);
    if (fromNode == null) throw new Error("wrong from node");

    const toNode = this.peopleList.get(to);
    if (toNode == null) throw new Error("wrong to node");

    this.adjacencyList.get(fromNode)?.push(toNode);
  }

  public disConnect(fromLabel: string, toLabel: string) {
    const fromNode = this.peopleList.get(fromLabel);
    const toNode = this.peopleList.get(toLabel);

    if (fromNode == null || toNode == null) return;

    const neighborConnections = this.adjacencyList.get(fromNode)!;

    if (neighborConnections.length > 0) {
      this.adjacencyList.set(
        fromNode,
        neighborConnections.filter((connection) => connection.label !== toLabel)
      );
    }
  }

  public print() {
    for (let sourceNode of this.adjacencyList.keys()) {
      const neighborConnections = this.adjacencyList.get(sourceNode);

      if (neighborConnections && neighborConnections.length > 0) {
        let neighbourLable = neighborConnections.map((x) => x.label).join(",");

        console.log(`${sourceNode.label} is connected to ${neighbourLable}`);
      }
    }
  }
}

export default Graphs;
