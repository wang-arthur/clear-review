# Peer Review Process Diagram

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@xyflow/react@12.4.4/dist/style.css">

```jsx
import * as React from 'npm:react';
import { ReactFlow, applyEdgeChanges, applyNodeChanges, Background, MiniMap, Controls } from 'npm:@xyflow/react';
import { initialNodes, initialEdges, COLORS } from '/data/peer-review/nodes-edges.js';

const nodeColor = (node) => {

  switch (node.id) {
    case 'accept':
      return COLORS.green;
    case 'reject':
      return COLORS.red;
    case 'withdraw':
      return COLORS.blue;
  }

  switch (node.type) {
    case 'group':
        return COLORS.light_gray;
    default:
      return COLORS.pale_lilac;
  }
};

function PeerReviewDiagram() {
  const [nodes, setNodes] = React.useState(initialNodes);
  const [edges, setEdges] = React.useState(initialEdges);
  
  const onNodesChange = React.useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [],
  );
  const onEdgesChange = React.useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [],
  );

  return (
    <div className="border border-1"
      style={{ width: '70vw', height: '70vh' }}> 
      <ReactFlow
        nodes={nodes}
        onNodesChange={onNodesChange}
        edges={edges}
        onEdgesChange={onEdgesChange}
        fitView>
        <MiniMap nodeColor={nodeColor} nodeStrokeWidth={5} zoomable panable />
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  );
}

display(
    <PeerReviewDiagram />
);
