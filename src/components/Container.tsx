import React from "react";
import ContainerItems from "./Container-items";
export default function Container({ data }: { data: any }) {
  // console.log(data);

  return (
    <div>
      <div className="grid grid-cols-5 mx-auto max-w-6xl py-4 w-full gap-5">
        <ContainerItems data={data} />
      </div>
    </div>
  );
}
