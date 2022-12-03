import type { NextPage } from "next";
import { FC, useEffect, useMemo, useState } from "react";
import { useMutation, useQuery } from "react-query";
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
import TextUpdaterNode from "../../../components/customNode";
import useDisclosure from "../../../src/useDisclosure";
import SingleJournal from "../../../components/SingleJournal";

const initialEdges = [
  { id: "e1-2", source: "1", target: "2", animated: true, type: "straight" },
];

const MoodColorMapping = new Map<string, Array<string>>([
  ["happy", ["green", "white"]],
  ["sad", ["blue", "white"]],
  ["nervous", ["pink", "black"]],
  ["anxious", ["crimson", "white"]],
]);

const Journal: NextPage = () => {
  const [randomNum, setRandomNum] = useState(0);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [activeJournal, setActiveJournal] = useState<any>({});
  const openJournal = (journal: any) => {
    setActiveJournal(journal);
    onOpen();
  };
  const router = useRouter();
  const initialNodes: Array<Node> = [
    {
      id: "1",
      position: { x: 0, y: 0 },
      data: {
        label: "1",
        colors: ["green", "white"],
        openJournal,
        journalData: {
          id: 1,
          title: "I'm a journal title",
          mood: "happy",
          reflection: "bruhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh",
          reason: "I don't know why. I just am. I don't need a reason.",
        },
      },
      type: "textUpdater",
    },
    {
      id: "2",
      position: { x: 0, y: 100 },
      data: {
        label: "2",
        colors: ["orange", "black"],
        openJournal,
        journalData: {
          id: 2,
          title: "I'm not a journal title. I'm alive",
          mood: "sad",
          reflection: "bruhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh",
          reason:
            "hmmmmmmmmmmmm, bruhhhhhh, I'm sad and low yeah. I'm sad I know yeah.",
        },
      },
      type: "textUpdater",
    },
  ];
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const nodeTypes = useMemo(() => ({ textUpdater: TextUpdaterNode }), []);

  return (
    <section className="relative flex flex-col items-center justify-center w-full h-screen">
      <button
        className="fixed top-0 left-0 m-8 text-4xl"
        onClick={() => router.push("/customer/journal")}
      >
        🠔
      </button>
      <h1 className="absolute text-xl font-bold top-8">
        Nodes Playground {randomNum}
      </h1>
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
        isOpen={isOpen}
        onClose={onClose}
      />
    </section>
  );
};



export default Journal;
