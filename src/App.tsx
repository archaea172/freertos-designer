import { useRef } from "react";

import {
  ReactFlow,
  Background,
  Controls,
  Panel,
  useNodesState,
  useEdgesState,
  addEdge,
  type Node,
  type Edge,
} from '@xyflow/react';

import '@xyflow/react/dist/style.css'

const initialNodes: Node[] = [
  {
    id: 'example',
    position: { x: 100, y: 100},
    data: { label: 'SensorTask'},
    style: { background: '#dbeafe'},
  },
];

const initialEdges: Edge[] = [];

function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const nextId = useRef(1);
  const addNode = (kind: 'task' | 'queue') => {
    const id = nextId.current++;

    const newNode: Node = {
      id: `${kind}-${id}`,
      position: {
        x: 100 + id*30,
        y: 100 + id*30,
      },
      data: {
        label: kind ==='task'
          ? `Task${id}`
          : `Queue${id}`,
      },
      style: {
        background: kind === 'task'
          ? '#dbeafe'
          : '#fef3c7',
      },
    };

    setNodes((currentNodes) => [
      ...currentNodes,
      newNode,
    ]);
  };

  return (
    <div style={{width: '100vw', height: '100vh'}}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={(connection) => {
          setEdges((currentEdges) =>
            addEdge(connection, currentEdges)
          );
        }}
        fitView
      >
        <Background />
        <Controls />

        <Panel position="top-left">
          <div style={{
            display: 'flex',
            gap: '8px',
            background: 'white',
            padding: '10px',
            borderRadius: '8px',
          }}>
            <button onClick={() => addNode('task')}>
              + task
            </button>
            <button onClick={() => addNode('queue')}>
              + queue
            </button>
          </div>
        </Panel>
      </ReactFlow>
    </div>
  );
}

export default App;
