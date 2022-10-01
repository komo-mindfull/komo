import type { FC } from "react";

const Loading: FC = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="inline-block w-24 h-24 border-t-8 rounded-full border-t-primary animate-spin"></div>
    </div>
  );
};

export default Loading;
