
import { useCallback } from 'react';

import {
  ReactFlow,
  Background,
  Controls,
  useNodesState,
  useEdgesState,
  addEdge,
  type Node,
  type Edge,
  type Connection,
} from '@xyflow/react';

import '@xyflow/react/dist/style.css';

// 最初に表示するタスクとキュー
const initialNodes: Node[] = [
  {
    id: 'sensor',
    type: 'input',
    position: { x: 100, y: 0 },
    data: { label: 'SensorTask' },
    style: { background: '#dbeafe' },
  },
  {
    id: 'queue',
    position: { x: 100, y: 150 },
    data: { label: 'sensorQueue' },
    style: { background: '#fef3c7' },
  },
  {
    id: 'control',
    type: 'output',
    position: { x: 100, y: 300 },
    data: { label: 'ControlTask' },
    style: { background: '#dbeafe' },
  },
];

// ノード間の接続
const initialEdges: Edge[] = [
  {
    id: 'e1',
    source: 'sensor',
    target: 'queue',
    label: 'xQueueSend',
  },
  {
    id: 'e2',
    source: 'queue',
    target: 'control',
    label: 'xQueueReceive',
  },
];

export default function App() {
  const [nodes, , onNodesChange] =
    useNodesState(initialNodes);

  const [edges, setEdges, onEdgesChange] =
    useEdgesState(initialEdges);

  const onConnect = useCallback(
    (connection: Connection) => {
      setEdges((currentEdges) =>
        addEdge(connection, currentEdges)
      );
    },
    [setEdges]
  );

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}
