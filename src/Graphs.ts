class Nodes {
  constructor(public label: string) {}
}

class Graphs {
  private nodes = new Map<string, Nodes>();
  private adjacencyList = new Map<Nodes, Nodes[]>();

  public insert(label: string) {
    const node = new Nodes(label);

    this.nodes.set(label, node);
    this.adjacencyList.set(node, []);
  }

  public removeNode(label: string) {
    const nodeToRemove = this.nodes.get(label);

    if (!nodeToRemove) return;

    for (let sourceNode of this.adjacencyList.keys()) {
      this.removeConection(sourceNode, label);
    }

    this.nodes.delete(label);
    this.adjacencyList.delete(nodeToRemove);
  }

  public connect(from: string, to: string) {
    const fromNode = this.nodes.get(from);
    if (fromNode == null) throw new Error("wrong from node");

    const toNode = this.nodes.get(to);
    if (toNode == null) throw new Error("wrong to node");

    this.adjacencyList.get(fromNode)?.push(toNode);
  }

  public disConnect(fromLabel: string, toLabel: string) {
    const fromNode = this.nodes.get(fromLabel);
    const toNode = this.nodes.get(toLabel);

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

  public topologicalsorts(): string[] {
    let stack: Nodes[] = [];
    let visited: Set<Nodes> = new Set();
    let list: string[] = [];

    for (let node of this.nodes.values()) {
      this.$topologicalsorts(node, stack, visited);
    }
    while (stack.length > 0) {
      list.push(stack.pop()!.label!);
    }

    return list;
  }

  public $topologicalsorts(node: Nodes, stack: Nodes[], visited: Set<Nodes>) {
    if (visited.has(node)) return;

    visited.add(node);

    if (this.nodeConnections(node)) {
      for (let neighbour of this.nodeConnections(node)!) {
        this.$topologicalsorts(neighbour, stack, visited);
      }
    }
    stack.push(node);
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
