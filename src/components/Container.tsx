import React from "react";
import ContainerItems from "./Container-items";
export default function Container({ data }: { data: any }) {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 mx-auto max-w-6xl w-auto gap-5">
        <ContainerItems data={data} />
      </div>
    </div>
  );
}
