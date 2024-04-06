"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

import { AiOutlineLike } from "react-icons/ai";
import { FaRegMessage } from "react-icons/fa6";
import moment from "moment";
import CommentInput from "./CommentInput";
import Comments from "./Comments";

type CommentItemType = {
  depth: number;
  id: string;
  avatarURL: string;
  fullName: string;
  role: string;
  content: string;
  updatedTime: Date;
  likeNumber: Number;
  user: any;
  comicID?: string;
  chapterID?: string;
  commentReplies: any[];
  parentID?: string;
};

const CommentItem = ({
  depth,
  id,
  avatarURL,
  fullName,
  role,
  content,
  updatedTime,
  likeNumber,
  user,
  comicID,
  chapterID,
  commentReplies,
  parentID,
}: CommentItemType) => {
  const MAX_DEPTH = 6;
  const [isReply, setIsReply] = useState(false);
  const [time, setTime] = useState<string>(
    moment(updatedTime).fromNow().toString()
  );

  useEffect(() => {
    const id = setTimeout(() => {
      setTime(moment(updatedTime).fromNow().toString());
    }, 60000);
    return () => clearTimeout(id);
  }, [time]);

  return (
    <div className="flex space-x-2 w-full rounded-md pb-2 mt-3">
      <div className="mt-2 mx-2">
        <Image
          src={avatarURL}
          width={40}
          height={40}
          alt="Avatar"
          className="rounded-full"
        />
      </div>

      <div className="content grow">
        <div className="w-full flex mt-1 space-x-2 header pb-1 border-b-2 border-yellow-600 dark:border-yellow-400">
          <div className="text-yellow-600 dark:text-yellow-400">{fullName}</div>
          <div className="text-xs flex items-center text-center backdrop:text-xs text-violet-950 border-2 border-fuchsia-900">
            {role}
          </div>
        </div>
        <div className="comment-content mt-1 text-pretty md:w-fit overflow-y-auto">
          <p>{content}</p>
        </div>
        <div className="button-controls flex space-x-4 item-center">
          <div className="like-button items-center space-x-1 flex">
            <AiOutlineLike className="cursor-grab hover:text-blue-500" />
            <p>{likeNumber.toString()}</p>
          </div>
          <div
            className="reply-button items-center space-x-1 flex cursor-grab hover:text-blue-500"
            onClick={() => setIsReply(!isReply)}
          >
            <FaRegMessage />
            <p>Trả lời</p>
          </div>
          <div className="time">
            <p>{time}</p>
          </div>
        </div>

        {isReply && (
          <div>
            <CommentInput
              user={user}
              comicsID={comicID}
              chapterID={chapterID}
              commentID={depth === MAX_DEPTH ? parentID : id} // Nếu vượt quá ngưỡng các comment khi trả lời sẽ cùng cấp nhau
            />
          </div>
        )}

        {depth < MAX_DEPTH && (
          <Comments
            depth={depth + 1}
            initialData={commentReplies}
            user={user}
            comicID={comicID}
            chapterID={chapterID}
            commentID={id}
          />
        )}
      </div>
    </div>
  );
};

export default CommentItem;
