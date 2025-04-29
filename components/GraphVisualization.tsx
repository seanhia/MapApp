// import Svg, { Circle, Rect } from 'react-native-svg';
import graph from '@/constants/boilerplate_graph.json'
import React, { useEffect, useRef, useState } from 'react';
import { View, PanResponder } from 'react-native';
import Svg, { Circle, Line, Text as SvgText } from 'react-native-svg';
import * as d3 from 'd3-force';
import { GraphData, GraphNode, GraphEdge } from '@/data/types';

const width = 400;
const height = 600;

const colors = {
  approved: '#4CAF50',
  invalid: '#F44336',
  default: '#999'

};

type Props = {
  data: GraphData;
};

const ForceGraph = ({ data }: Props) => {
  const [nodes, setNodes] = useState<GraphNode[]>([]);
  const [edges, setEdges] = useState<GraphEdge[]>([]);

  const simulationRef = useRef<d3.Simulation<GraphNode, undefined>>();

  useEffect(() => {
    const sim = d3.forceSimulation(graph.nodes)
      .force('charge', d3.forceManyBody().strength(-100))
      .force('collied', d3.forceCollide().radius(100))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('link', d3.forceLink(graph.edges).id((d: any) => d.id).distance(100))
      .on('tick', () => {
        setNodes([...graph.nodes]);
        setEdges([...graph.edges]);
      });



    simulationRef.current = sim;

    return () => {
      sim.stop();
    };
  }, []);

  const createResponder = (node: GraphNode) =>
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        node.fx = node.x;
        node.fy = node.y;
      },
      onPanResponderMove: (_, gesture) => {
        node.fx = node.x! + gesture.dx;
        node.fy = node.y! + gesture.dy;
        simulationRef.current?.alpha(1).restart();
      },
      onPanResponderRelease: () => {
        node.fx = null;
        node.fy = null;
        simulationRef.current?.alpha(0.5).restart();
      }
    });

  return (
    <View>
      <Svg height={height} width={width}>
        {edges.map((edge, index) => (
          <Line
            key={index}
            x1={edge.source.x}
            y1={edge.source.y}
            x2={edge.target.x}
            y2={edge.target.y}
            stroke="#ccc"
            strokeWidth="2"
          />
        ))}
        {nodes.map((node, index) => {
          const responder = createResponder(node);
          const color = colors[node.group] || colors.default;

          return (
            <React.Fragment key={index}>
              <Circle
                cx={node.x}
                cy={node.y}
                r={20}
                fill={color}
              />
              <SvgText
                x={node.x}
                y={node.y - 30}
                fontSize="12"
                fill="#000"
                textAnchor="middle"
              >
                {node.label}
              </SvgText>
            </React.Fragment>
          );
        })}
      </Svg>
    </View>
  );
};

export default ForceGraph;
