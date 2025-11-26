export type DiagramNode = {
  id: string;
  label: string;
  depth: number;
};

export type DiagramEdge = {
  id: string;
  source: string;
  target: string;
};

export interface ParseResult {
  nodes: DiagramNode[];
  edges: DiagramEdge[];
}

export function parseDiagramText(text: string): ParseResult {
  const lines = text.split('\n').filter(line => line.trim().length > 0);
  const nodes: DiagramNode[] = [];
  const edges: DiagramEdge[] = [];
  const stack: string[] = [];

  lines.forEach((line, index) => {
    const leadingSpaces = line.match(/^(\s*)/)?.[1].length || 0;
    const depth = Math.floor(leadingSpaces / 2);

    let label = line.trim();
    label = label.replace(/^>+\s*/, '');

    const nodeId = `node-${index}`;
    nodes.push({ id: nodeId, label, depth });

    if (depth > 0 && stack[depth - 1]) {
      edges.push({
        id: `edge-${stack[depth - 1]}-${nodeId}`,
        source: stack[depth - 1],
        target: nodeId,
      });
    }

    stack[depth] = nodeId;
    for (let i = depth + 1; i < stack.length; i++) {
      stack[i] = '';
    }
  });

  return { nodes, edges };
}

export function getLayoutedElements(
  nodes: DiagramNode[],
  edges: DiagramEdge[],
  direction: 'TB' | 'LR' = 'LR'
) {
  const nodeWidth = 180;
  const nodeHeight = 50;
  const horizontalSpacing = 80;
  const verticalSpacing = 30;

  const depthCounts: number[] = [];
  const depthPositions: number[] = [];

  nodes.forEach((node) => {
    if (depthCounts[node.depth] === undefined) {
      depthCounts[node.depth] = 0;
    }
    depthCounts[node.depth]++;
  });

  const flowNodes = nodes.map((node) => {
    if (depthPositions[node.depth] === undefined) {
      depthPositions[node.depth] = 0;
    }
    const positionIndex = depthPositions[node.depth];
    depthPositions[node.depth]++;

    let x: number, y: number;

    if (direction === 'LR') {
      x = node.depth * (nodeWidth + horizontalSpacing);
      y = positionIndex * (nodeHeight + verticalSpacing);
    } else {
      x = positionIndex * (nodeWidth + horizontalSpacing);
      y = node.depth * (nodeHeight + verticalSpacing);
    }

    return {
      id: node.id,
      type: 'default',
      data: { label: node.label },
      position: { x, y },
      style: {
        width: nodeWidth,
        height: nodeHeight,
        background: '#fafaf9',
        border: '2px solid #a8a29e',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '14px',
        fontWeight: 500,
        color: '#1c1917',
      },
    };
  });

  const flowEdges = edges.map((edge) => ({
    id: edge.id,
    source: edge.source,
    target: edge.target,
    type: 'smoothstep',
    style: { stroke: '#78716c', strokeWidth: 2 },
    markerEnd: {
      type: 'arrowclosed',
      color: '#78716c',
      width: 20,
      height: 20,
    },
  }));

  return { nodes: flowNodes, edges: flowEdges };
}
