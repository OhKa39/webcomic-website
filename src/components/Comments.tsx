"use client";
import { pusherClient } from "@/lib/pusher";
import React, { useState, useEffect, Suspense } from "react";
import CommentItem from "./CommentItem";

const Comments = ({
  initialData,
  comicID,
  chapterID,
}: {
  initialData: any;
  comicID?: string;
  chapterID?: string;
}) => {
  const [inComingComments, setInComingComments] = useState<any[]>([
    ...initialData,
  ]);

  const id = comicID === undefined ? chapterID : comicID;
  // console.log(id!);
  useEffect(() => {
    pusherClient.subscribe(id!);
    pusherClient.bind("commentMessage", (data: any) => {
      // console.log(data);
      setInComingComments((prev: any[]) => [data, ...prev]);
    });

    return () => {
      pusherClient.unsubscribe(id!);
      pusherClient.unbind("commentMessage");
    };
  }, []);
  // console.log(`inComingComments${inComingComments}`);
  return (
    <div>
      {/* {initialData.map((attr: any) => (
        <CommentItem
          key={attr.id}
          avatarURL={attr.user.imageUrl}
          fullName={attr.user.name}
          likeNumber={attr.likes}
          role={attr.user.role}
          content={attr.content}
          updatedTime={attr.updateAt}
        />
      ))} */}
      {inComingComments.map((attr: any) => (
        <CommentItem
          key={attr.id}
          avatarURL={attr.user.imageUrl}
          fullName={attr.user.name}
          likeNumber={attr.likes}
          role={attr.user.role}
          content={attr.content}
          updatedTime={attr.updateAt}
        />
      ))}
    </div>
  );
};

export default Comments;
