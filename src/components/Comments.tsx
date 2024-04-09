"use client";
import { pusherClient } from "@/lib/pusher";
import React, { useState, useEffect, memo } from "react";
import CommentItem from "./CommentItem";
import { FaAngleDown } from "react-icons/fa";
// import { Pagination } from "@nextui-org/react"
import { FaAngleUp } from "react-icons/fa";

const Comments = ({
  initialData,
  comicID,
  chapterID,
  commentID,
  user,
  depth,
}: {
  initialData: any;
  comicID?: string;
  chapterID?: string;
  commentID?: string;
  user: any;
  depth: number;
}) => {
  const [inComingComments, setInComingComments] = useState<any[]>([
    ...initialData,
  ]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  // console.log(id!);

  useEffect(() => {
    const id = commentID || comicID || chapterID;
    pusherClient.subscribe(id!);
    pusherClient.bind(`commentMessage: ${id}`, (data: any) => {
      // console.log(data);
      const stateHandler = !commentID
        ? (prev: any[]) => [data, ...prev]
        : (prev: any[]) => [...prev, data];
      setInComingComments(stateHandler);
    });

    pusherClient.bind(`commentMessageDelete: ${id}`, (data: any) => {
      setInComingComments((prev: any) => [
        ...prev.filter((ele: any) => ele.id != data),
      ]);
    });

    return () => {
      pusherClient.unsubscribe(id!);
      pusherClient.unbind(`commentMessage: ${id}`);
      pusherClient.unbind(`commentMessageDelete: ${id}`);
    };
  }, []);

  return (
    <div>
      {inComingComments.length > 0 && commentID !== undefined && (
        <div
          className="mt-1 cursor-pointer hover:text-blue-600 dark:hover:text-yellow-400"
          onClick={() => setIsOpen(!isOpen)}
        >
          {!isOpen ? (
            <div className="flex space-x-1 items-center">
              <FaAngleDown />
              {`Hiển thị ${inComingComments.length} câu trả lời`}
            </div>
          ) : (
            <div className="flex space-x-1 items-center">
              <FaAngleUp />
              {`Ẩn tất cả`}
            </div>
          )}
        </div>
      )}

      {(isOpen || commentID === undefined) &&
        inComingComments.map((attr: any) => (
          <CommentItem
            key={attr.id}
            commentSent={attr}
            user={user}
            comicID={comicID}
            chapterID={chapterID}
            depth={depth} //level nested
            parentID={commentID ?? undefined}
          />
        ))}
    </div>
  );
};

export default memo(Comments);
