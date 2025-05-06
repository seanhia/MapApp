// import Svg, { Circle, Rect } from 'react-native-svg';
import graph from '@/constants/boilerplate_graph.json'
import React, { useEffect, useRef, useState } from 'react';
import { SafeAreaView, PanResponder, Dimensions, Text } from 'react-native';
import Svg, { Circle, Line, Text as SvgText } from 'react-native-svg';
import * as d3 from 'd3-force';
import { GraphData, GraphNode, GraphEdge, User } from '@/data/types';
import { Colors } from '@/constants/Colors.ts'
import { legendItems } from '@/data/types';
import { useTheme } from '@/hooks/useTheme'
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const { width, height } = Dimensions.get('window')

const colors = {
  approved: Colors.dark.tint, // light blue
  not_friends: '#9E9E9E',    // gray
  you: Colors.light.button,  // light yellow
  recommend: Colors.dark.button,      // orange
  default: '#607D8B',        // fallback color
};

type Props = {
  data: GraphData;
  userId: string | string[];
};

const ForceGraph = ({ data, userId }: Props) => {
  const { styles } = useTheme()
  const [nodes, setNodes] = useState<GraphNode[]>([]);
  const [edges, setEdges] = useState<GraphEdge[]>([]);


  if (!data || !Array.isArray(data.edges)) {
    console.error("Invalid graph data:", data);
    return;
  }

  const simulationRef = useRef<d3.Simulation<GraphNode, undefined>>();

  useEffect(() => {
    console.log('data: ', data, ' - ', typeof data);
    console.log('data.nodes: ', data.nodes, ' - ', typeof data.nodes);
    console.log('data.edges: ', data.edges, ' - ', typeof data.edges);
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

    // Stop the simulation and updates after 3 seconds
    const stopTimeout = setTimeout(() => {
      sim.stop();
      console.log('Simulation stopped after timeout');
    }, 1000);

    return () => {
      sim.stop();
      clearTimeout(stopTimeout);
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
    <GestureHandlerRootView style={styles.fullContainer}>
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
          const firstDegree = edges.filter(
            edge => (edge.source.id === userId || edge.target.id === userId));
          const firstDegreeIds = new Set<string>();
          firstDegree.forEach(edge => {
            firstDegreeIds.add(edge.source.id);
            firstDegreeIds.add(edge.target.id);
          });

          // Step 2: Find second-degree edges
          const secondDegreeEdges = edges.filter(edge => {
            return (
              firstDegreeIds.has(edge.source.id) || firstDegreeIds.has(edge.target.id)
            );
          });

          // Step 3: Get second-degree node IDs
          const secondDegreeIds = new Set<string>();
          secondDegreeEdges.forEach(edge => {
            if (!firstDegreeIds.has(edge.source.id) && edge.source.id !== userId) {
              secondDegreeIds.add(edge.source.id);
            }
            if (!firstDegreeIds.has(edge.target.id) && edge.target.id !== userId) {
              secondDegreeIds.add(edge.target.id);
            }
          });

          if (node.id == userId) {
            node.group = 'you';
          } else if (firstDegreeIds.has(node.id)) {
            node.group = 'approved';
          } else if (secondDegreeIds.has(node.id)) {
            node.group = 'recommend';
          } else {
            node.group = 'not_friends';
          }




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
    </GestureHandlerRootView>
  );
};

export default ForceGraph;
