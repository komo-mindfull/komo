import type { NextPage } from "next";
import { FC, useEffect, useMemo, useState } from "react";
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
import SingleJournal from "../../../components/SingleJournal";
import TextUpdaterNode from "../../../components/customNode";

const initialNodes = [
  { id: "1", position: { x: 0, y: 0 }, data: { label: "1" } },
  { id: "2", position: { x: 0, y: 100 }, data: { label: "2" } },
];

const initialEdges = [{ id: "e1-2", source: "1", target: "2" }];

const MoodColorMapping = new Map<string, Array<string>>([
  ["happy", ["green", "white"]],
  ["sad", ["black", "white"]],
  ["nervous", ["pink", "black"]],
  ["anxious", ["crimson", "white"]],
]);

const Journal: NextPage = () => {
  const router = useRouter();
  const [journalEntries, setJournalEntries] = useState<Array<any>>([]);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [activeJournal, setActiveJournal] = useState<any>({});
  const openJournal = (journal: any) => {
    setActiveJournal(journal);
    onOpen();
  };
  const nodeTypes = useMemo(() => ({ textUpdater: TextUpdaterNode }), []);
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
        data: [
          {
            id: 1,
            title: "Hello",
            mood: "happy",
            reason: "123123",
            reflection: "123123",
            date_created: "2022-12-01T17:12:36.296956+00:00",
          },
          {
            id: 2,
            title: "Dev Bartan",
            mood: "sad",
            reason: "Donno",
            reflection: "That gal was looking very fine",
            date_created: "2022-12-01T17:45:12.261211+00:00",
          },
          {
            id: 3,
            title: "Shivom Srivastava",
            mood: "happy",
            reason: "Feeling Very fine",
            reflection: "happy",
            date_created: "2022-12-01T17:51:23.125452+00:00",
          },
          {
            id: 4,
            title: "Dev Bartan Bad",
            mood: "anxious",
            reason: "Coz dev brtan bad",
            reflection: "Dev Brtn Bad",
            date_created: "2022-12-01T19:48:36.755010+00:00",
          },
        ],
        nodes: [1, 2, 3, 4],
        edges: [
          [1, 2],
          [1, 3],
        ],
      };
    },
    {
      onSuccess: (data) => {
        const myNodes = data.data.map(
          (
            node: {
              id: number;
              title: string;
              mood: string;
              reason: string;
              reflection: string;
              date_created: string;
            },
            i: number
          ) => {
            return {
              id: node.id.toString(),
              position: {
                x: 200 + Math.floor(Math.random() * 3) * 50,
                y: i * 100 + 100,
              },
              data: {
                label: node.id.toString(),
                journalData: node,
                colors: (MoodColorMapping as any).get(node.mood),
                openJournal,
              },
              type: "textUpdater",
              connectable: false
            };
          }
        );

        const myEdges = data.edges.map((edge: Array<number>, i: number) => {
          return {
            id: `e${edge[0]}-${edge[1]}`,
            source: edge[0].toString(),
            target: edge[1].toString(),
            animated: true,
            type: "straight",
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
          nodeTypes={nodeTypes}
        >
          {/* <Controls /> */}
          <Background />
        </ReactFlow>
      </div>
      <SingleJournal
        journalEntry={activeJournal}
        onClose={onClose}
        isOpen={isOpen}
      />
    </section>
  );
};

export default Journal;
