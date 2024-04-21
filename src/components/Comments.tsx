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
  query,
  queryCommentChain,
}: {
  initialData?: any[];
  comicID?: string;
  chapterID?: string;
  commentID?: string;
  user: any;
  depth: number;
  query?: string;
  queryCommentChain: string[];
}) => {
  // console.log(initialData);
  const [inComingComments, setInComingComments] = useState<any[]>([]);
  const expression: boolean =
    depth <= queryCommentChain.length &&
    queryCommentChain[Math.max(0, depth - 1)] === commentID; //Kiểm tra node cha có nằm trong cấu trúc cây của query hay ko
  const [isOpen, setIsOpen] = useState<boolean>(expression);
  // console.log(id!);

  useEffect(() => {
    const fetchData = async () => {
      const urlPage = process.env.NEXT_PUBLIC_URL;
      // console.log(`${urlPage}/api/notification?userID=${user.id}`);
      // console.log(`${urlPage}/api/comment/${commentID}?isGetRootChain=false`);
      const response = await fetch(
        `${urlPage}/api/comment/${commentID}?isGetRootChain=false`,
        {
          method: "GET",
        }
      );
      const dataFetch = await response.json();
      setInComingComments(dataFetch);
    };

    if (depth !== 0) fetchData();
    else setInComingComments([...initialData!]);
  }, []);

  useEffect(() => {
    const id = commentID || comicID || chapterID;
    pusherClient.subscribe(id!);
    pusherClient.bind(`commentMessage: ${id!}`, (data: any) => {
      // console.log(data);
      const stateHandler = !commentID
        ? (prev: any[]) => [data, ...prev]
        : (prev: any[]) => [...prev, data];
      setInComingComments(stateHandler);
    });

    pusherClient.bind(`commentMessageDelete: ${id!}`, (data: any) => {
      setInComingComments((prev: any) => [
        ...prev.filter((ele: any) => ele.id != data),
      ]);
    });

    return () => {
      pusherClient.unsubscribe(id!);
      pusherClient.unbind(`commentMessage: ${id!}`);
      pusherClient.unbind(`commentMessageDelete: ${id!}`);
    };
  }, []);
  // console.log(inComingComments);
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
            query={query}
            queryCommentChain={queryCommentChain}
          />
        ))}
    </div>
  );
};

export default memo(Comments);
