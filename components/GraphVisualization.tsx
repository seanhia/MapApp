import React from 'react';
import { View } from 'react-native';
import Svg, { Circle, Line, Text } from 'react-native-svg';
import type { GraphData } from '@/data/types'; 

interface GraphVisualizerProps {
  graph: any
}

const GraphVisualizer : React.FC<GraphVisualizerProps> = ({ graph })=> {
  if (!graph) {
    // Optionally render a loading state or empty view
    return <View><Text>Loading graph...</Text></View>;
  }

  const { nodes, edges } = graph;

  // arrange nodes in a grid 
  const positionedNodes = nodes.map((node, index) => {
    const spacingX = 120;
    const spacingY = 120;
    const cols = 3;
    return {
      ...node,
      x: 80 + (index % cols) * spacingX,
      y: 100 + Math.floor(index / cols) * spacingY,
    };
  });

  // Helper to get coordinates for a node
  const getNodePosition = (id) => {
    return positionedNodes.find((n) => n.id === id) || { x: 0, y: 0 };
  };
  
  return (
    <View style={{ flex: 1 }}>
      <Svg height="100%" width="100%">
        {/* Draw edge */}
        {edges.map((edge, index) => {
          const source = getNodePosition(edge.source);
          const target = getNodePosition(edge.target);
          return (
            <Line
              key={`edge-${index}`}
              x1={source.x}
              y1={source.y}
              x2={target.x}
              y2={target.y}
              stroke="gray"
              strokeWidth="2"
            />
          ); 
        })}


        {/* Draw Nodes */}
        {positionedNodes.map((node, index) => (
          <React.Fragment key={`node-${node.id}`}>
            <Circle
              cx={node.x}
              cy={node.y}
              r={20}
              fill={
                node.group === 'currentUser'
                  ? '#4e79a7'
                  : node.group === 'mutualFriend'
                  ? '#f28e2b'
                  : '#59a14f'
              }
            />
          <Text 
            x={node.x} 
            y={node.y}
            fontSize="12" 
            fill="black" 
            textAnchor="middle"
          >
            {node.label}
          </Text>
        </React.Fragment>
      ))}
      </Svg>
    </View>
  );
};

export default GraphVisualizer;