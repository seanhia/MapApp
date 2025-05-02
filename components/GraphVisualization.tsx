// import Svg, { Circle, Rect } from 'react-native-svg';
import graph from '@/constants/boilerplate_graph.json'
import React, { useEffect, useRef, useState } from 'react';
import { SafeAreaView, PanResponder, Dimensions, Text } from 'react-native';
import Svg, { Circle, Line, Text as SvgText } from 'react-native-svg';
import * as d3 from 'd3-force';
import { GraphData, GraphNode, GraphEdge } from '@/data/types';
import { Colors } from '@/constants/Colors.ts'
import { useTheme } from '@/hooks/useTheme'

const { width, height } = Dimensions.get('window')

const colors = {
  approved: Colors.dark.button,
  not_friends: '#aaa',
  default: '#999',
  you: Colors.dark.tint,
  recommend: Colors.light.button

};

type Props = {
  data: GraphData;
};

const ForceGraph = ({ data }: Props) => {
  const { styles } = useTheme()
  const [nodes, setNodes] = useState<GraphNode[]>([]);
  const [edges, setEdges] = useState<GraphEdge[]>([]);

  console.log('data: ', data, ' - ', typeof data);
  console.log('data.nodes: ', data.nodes, ' - ', typeof data.nodes);
  console.log('data.edges: ', data.edges, ' - ', typeof data.edges);

  if (!data || !Array.isArray(data.edges)) {
    console.error("Invalid graph data:", data);
    return;
  }

  const simulationRef = useRef<d3.Simulation<GraphNode, undefined>>();

  useEffect(() => {
    const sim = d3.forceSimulation(data.nodes)
      .force('charge', d3.forceManyBody().strength(-100))
      .force('collied', d3.forceCollide().radius(100))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('link', d3.forceLink(data.edges).id((d: any) => d.id).distance(100))
      .on('tick', () => {
        setNodes([...data.nodes]);
        setEdges([...data.edges]);
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
    <SafeAreaView>
      <Text style={styles.heading}>Network</Text>
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
                {...responder.panHandlers}
              />
              <SvgText
                x={node.x}
                y={node.y! - 30}
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
    </SafeAreaView>
  );
};

export default ForceGraph;
