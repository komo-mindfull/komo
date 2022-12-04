import type { NextPage } from "next";
import { FC, useEffect, useMemo, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
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

const MoodColorMapping = new Map<moodType, Array<string>>([
  ["happy", ["#FFC400", "white"]],
  ["anxious", ["#656262", "white"]],
  ["nervous", ["#7CB342", "black"]],
  ["sad", ["#2A2871", "white"]],
  ["neutral", ["#E57373", "white"]],
  ["angry", ["#FF5252", "white"]],
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
    ["journal", "all"],
    async () => {
      console.log("fetching all journals")
      const response = await fetch("https://komo.jupeeter.tech/journal", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${getStoredToken()}`,
        },
      });

      const data = await response.json();
      return data;
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
            const rn = Math.floor(Math.random() * 4)
            return {
              id: node.id.toString(),
              position: {
                x: 200 +  rn*60,
                y: i*25 + 400,
              },
              data: {
                label: node.id.toString(),
                journalData: node,
                colors: (MoodColorMapping as any).get(node.mood),
                openJournal,
              },
              type: "textUpdater",
              connectable: false,
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
          <Controls />
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
