"use client";
import { pusherClient } from "@/lib/pusher";
import React, { useState, useEffect } from "react";
import CommentItem from "./CommentItem";
import { FaAngleDown } from "react-icons/fa";
import { Pagination } from "@nextui-org/react";

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
  console.log(initialData)
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

    return () => {
      pusherClient.unsubscribe(id!);
      pusherClient.unbind(`commentMessage: ${id}`);
    };
  }, []);

  return (
    <div>
      {inComingComments.length > 0 && commentID !== undefined && (
        <div
          className="mt-1 cursor-grab flex space-x-1 items-center hover:text-blue-600"
          onClick={() => setIsOpen(!isOpen)}
        >
          <FaAngleDown />
          {!isOpen
            ? `Hiển thị ${inComingComments.length} câu trả lời`
            : "Ẩn tất cả"}
        </div>
      )}

      {(isOpen || commentID === undefined) &&
        inComingComments.map((attr: any) => (
          <CommentItem
            key={attr.id}
            id={attr.id}
            avatarURL={attr.user.imageUrl}
            fullName={attr.user.name}
            likeNumber={attr.likes}
            role={attr.user.role}
            content={attr.content}
            updatedTime={attr.updateAt}
            user={user}
            comicID={comicID}
            chapterID={chapterID}
            depth={depth} //level nested
            commentReplies={attr.commentReplies}
            parentID={commentID ?? undefined}
          />
        ))}
    </div>
  );
};

export default Comments;
