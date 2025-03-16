# Peer Review Process Diagram

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@xyflow/react@12.4.4/dist/style.css">

```jsx
import * as React from 'npm:react';
import { ReactFlow, applyEdgeChanges, applyNodeChanges, Background } from 'npm:@xyflow/react';
import { initialNodes, initialEdges } from '/data/peer-review/nodes-edges.js';

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
    <div style={{ width: '100vw', height: '100vh' }}> 
      <ReactFlow
        nodes={nodes}
        onNodesChange={onNodesChange}
        edges={edges}
        onEdgesChange={onEdgesChange}
        fitView>
        <Background />
      </ReactFlow>
    </div>
  );
}

display(
    <PeerReviewDiagram />
);
