import { useCallback } from "react";
import { Handle, Position } from "reactflow";

const handleStyle = { display: "block", background: "#fafafa00", border: "none" };

export default function TextUpdaterNode({ data }: { data : any}) {
  const onChange = useCallback((evt: any) => {
    console.log(evt.target.value);
  }, []);

  return (
    <>
      <div
        style={{
          width: 12,
          height: 12,
          color: data.colors[1],
          background: data.colors[0],
          borderRadius: "50%",
          display: "grid",
          placeItems: "center",
          fontSize: "0.8rem",
          position: "relative",
        }}
        onClick={() => data.setRandomNum(Math.floor(Math.random()*40))}
      >
        <Handle type="source" position={Position.Bottom} style={handleStyle} />{" "}
        <Handle type="target" position={Position.Top} style={handleStyle} />
        <div
          style={{
            position: "absolute",
            bottom: "-12px",
            color: "black",
            fontSize: "6px",
            width: "72px",
          }}
        >
          I&apos;m a journal title
        </div>
      </div>
    </>
  );
}
