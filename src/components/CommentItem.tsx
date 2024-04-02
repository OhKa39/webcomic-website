import React from "react";
import Image from "next/image";
type CommentItemType = {
  avatarURL: string;
  fullName: string;
  role: string;
  content: string;
  updatedTime: Date;
  likeNumber: Number;
};
import { AiOutlineLike } from "react-icons/ai";
import { FaRegMessage } from "react-icons/fa6";

const CommentItem = ({
  avatarURL,
  fullName,
  role,
  content,
  updatedTime,
  likeNumber,
}: CommentItemType) => {
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
            <AiOutlineLike />
            <p>{likeNumber.toString()}</p>
          </div>
          <div className="reply-button items-center space-x-1 flex">
            <FaRegMessage />
            <p>Trả lời</p>
          </div>
          <div className="time">
            <p>{updatedTime.toString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentItem;
