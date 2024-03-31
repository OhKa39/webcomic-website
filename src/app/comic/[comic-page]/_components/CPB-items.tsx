"use client";
import { Button } from "@nextui-org/react";
import { useState } from "react";
type objectType = {
  color: any;
  text: string;
  text2: string;
  state: any;
  icon: any;
  icon2: any;
};
export default function ButtonForComicPage({
  color,
  text,
  text2,
  state,
  icon,
  icon2,
}: objectType) {
  function handleClick() {
    setChooseState(!isChoose);
  }

  const [isChoose, setChooseState] = useState(state);

  return (
    <div className="inline">
      <Button
        className="font-bold"
        color={isChoose ? color : "danger"}
        onClick={handleClick}
      >
        {isChoose ? icon : icon2}
        {isChoose ? text : text2}
      </Button>
    </div>
  );
}
