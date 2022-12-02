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
import TextUpdaterNode from "../../../components/customNode";

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
  const router = useRouter();
  const initialNodes = [
    {
      id: "1",
      position: { x: 0, y: 0 },
      data: { label: "1", colors: ["green", "white"], setRandomNum },
      type: "textUpdater",
    },
    {
      id: "2",
      position: { x: 0, y: 100 },
      data: { label: "2", colors: ["orange", "black"], setRandomNum },
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
        <p className="text-xl" onClick={onClose}>
          Mood: Happy
        </p>
      </div>
    </div>
  );
};

export default Journal;
