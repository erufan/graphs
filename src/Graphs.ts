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
      this.removeConection(sourceNode, label);
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

    this.removeConection(fromNode, toLabel);
  }

  public print() {
    for (let sourceNode of this.adjacencyList.keys()) {
      if (this.nodeConnections(sourceNode)!.length > 0) {
        let neighbourLable = this.nodeConnections(sourceNode)!
          .map((x) => x.label)
          .join(",");

        console.log(`${sourceNode.label} is connected to ${neighbourLable}`);
      }
    }
  }

  private removeConection(node: Nodes, label: string) {
    if (this.nodeConnections(node)!.length > 0) {
      this.adjacencyList.set(
        node,
        this.nodeConnections(node)!.filter(
          (connection) => connection.label !== label
        )
      );
    }
  }

  private nodeConnections(node: Nodes) {
    return this.adjacencyList.get(node);
  }
}

export default Graphs;
