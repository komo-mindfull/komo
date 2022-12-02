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

const SingleJournal: FC<{
  journalEntry?: any;
  onClose: () => void;
  isOpen: boolean;
}> = ({ journalEntry, onClose, isOpen }) => {
  const addLink = useMutation(
    "addLink",
    async (newChild: number) => {
      throw Error("Not implemented");
      const response = await fetch(
        `https://komo.jupeeter.tech/journal/links/${newChild}`,
        {
          method: "PUT",
          headers: new Headers({
            "Content-Type": "application/json",
            Authorization: `Bearer ${getStoredToken()}`,
          }),
          body: JSON.stringify({
            parent_id: journalEntry.id,
          }),
        }
      );
    },
    {
      onSuccess(data) {
        toast.success("Link added successfully");
        onClose();
      },
      onError(error) {
        toast.error("Error adding link");
      },
    }
  );
  if (!isOpen) return null;
  return (
    <div className="absolute top-0 left-0 w-full h-full bg-green-100 shadow-xl card">
      <div className="card-body">
        <h2 className="mt-8 card-title">{journalEntry.title}</h2>
        {/* This is an accordian */}
        <div className="collapse">
          <input type="checkbox" />
          <div className="font-medium collapse-title">Reason</div>
          <div className="collapse-content">
            <p>{journalEntry.reason}</p>
          </div>
        </div>
        {/* end */}
        {/* This is an accordian */}
        <div className="collapse">
          <input type="checkbox" />
          <div className="font-medium collapse-title">Reflection</div>
          <div className="collapse-content">
            <p>{journalEntry.reflection}</p>
          </div>
        </div>
        {/* end */}
        <input
          type={"number"}
          placeholder={"link to another ↵"}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              addLink.mutate(parseInt(e.currentTarget.value));
            }
          }}
          className={"input input-bordered bg-green-100 my-4"}
        />
        <div className="card-actions">
          <button className="w-full btn btn-error" onClick={onClose}>
            Close Modal
          </button>
        </div>
      </div>
    </div>
  );
};

export default Journal;
