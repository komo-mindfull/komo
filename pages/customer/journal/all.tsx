import type { NextPage } from "next";
import { FC, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { getStoredToken } from "../../../src/utils";
import { useRouter } from "next/router";
import toast from "react-hot-toast";

///////// React Flow

import { useCallback } from "react";

import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Node,
  useViewport,
} from "reactflow";
// 👇 you need to import the reactflow styles
import "reactflow/dist/style.css";
import useDisclosure from "../../../src/useDisclosure";

const initialNodes = [
  { id: "1", position: { x: 0, y: 0 }, data: { label: "1" } },
  { id: "2", position: { x: 0, y: 100 }, data: { label: "2" } },
];

const initialEdges = [{ id: "e1-2", source: "1", target: "2" }];

const MoodColorMapping = new Map<string, Array<string>>([
  ["happy", ["green", "white"]],
  ["sad", ["blue", "white"]],
  ["nervous", ["pink", "black"]],
  ["anxious", ["crimson", "white"]],
]);

const Journal: NextPage = () => {
  const router = useRouter();
  const [journalEntries, setJournalEntries] = useState<Array<any>>([]);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const { isOpen, onClose, onOpen } = useDisclosure();
  useEffect(() => {
    console.log(isOpen)
  }, [isOpen])
  const query = useQuery(
    "getAllJournals",
    async () => {
      const response = await fetch("https://komo.jupeeter.tech/journal", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${getStoredToken()}`,
        },
      });

      const data = await response.json();
      return data;
      return {
        data: [{}],
        nodes: [1, 2, 3, 4],
        edges: [
          ["1", "2"],
          ["2", "3"],
          ["3", "4"],
        ],
      };
    },
    {
      onSuccess: (data) => {
        // this function down here is very bad & inefficient & should be changed ASAP
        const getNodeColor = (id: number) => {
          for (const node of data.data) {
            if (node.id === id) {
              return MoodColorMapping.get(node.mood);
            }
          }
        };
        const myNodes = data.nodes.map((node: number, i: number) => {
          const nodeColor = getNodeColor(node) as Array<string>;
          return {
            id: node.toString(),
            position: {
              x: 200 + Math.floor(Math.random() * 3) * 50,
              y: i * 100 + 100,
            },
            data: { label: node.toString() },
            style: {
              background: nodeColor[0],
              color: nodeColor[1],
              height: "30px",
              width: "30px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyCenter: "center",
            },
            connectable: false,
          };
        });
        const myEdges = data.edges.map((edge: Array<number>, i: number) => {
          return {
            id: `e${edge[0]}-${edge[1]}`,
            source: edge[0].toString(),
            target: edge[1].toString(),
            animated: true,
          };
        });
        setNodes(myNodes);
        setEdges(myEdges);
        setJournalEntries(data.data);
      },
      onError: (error) => {
        console.log(error);
        toast("An Error Occurred", {
          duration: 5000,
        });
      },
    }
  );
  if (query.isLoading) return <>loading</>;
  return (
    <section className="relative flex flex-col items-center justify-center w-full h-screen">
      <button
        className="fixed top-0 left-0 m-8 text-4xl"
        onClick={() => router.push("/customer/journal")}
      >
        🠔
      </button>
      <h1 className="absolute text-xl font-bold top-8">My Journals</h1>
      <div className="w-full h-full">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          zoomOnPinch={false}
          zoomOnDoubleClick={false}
          zoomOnScroll={false}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          fitView={true}
        >
          {/* <Controls /> */}
          <Background />
        </ReactFlow>
      </div>
      <SingleJournal onClose={onClose} isOpen={isOpen} />
    </section>
  );
};

const SingleJournal: FC<{
  journalEntry?: any;
  onClose: () => void;
  isOpen: boolean;
}> = ({ journalEntry, onClose, isOpen }) => {
  if (!isOpen) return null;
  return (
    <div className="absolute top-0 left-0 z-10 grid w-full h-full m-8 rounded-xl bg-base-100 place-items-center">
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Journal Entry</h1>
        <p className="text-xl" onClick={onClose}>Mood: Happy</p>
      </div>
    </div>
  );
};

export default Journal;
