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

  public connect(from: string, to: string) {
    const fromNode = this.peopleList.get(from);
    if (fromNode == null) throw new Error("wrong from node");

    const toNode = this.peopleList.get(to);
    if (toNode == null) throw new Error("wrong to node");

    this.adjacencyList.get(fromNode)?.push(toNode);
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
