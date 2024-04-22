"use client";
import React, { useState, useEffect, memo, useRef } from "react";
import Image from "next/image";

import { AiOutlineLike } from "react-icons/ai";
import { FaRegMessage } from "react-icons/fa6";
import moment from "moment";
import CommentInput from "./CommentInput";
import Comments from "./Comments";
import DeleteCommentButton from "./DeleteCommentButton";
import { MdCreate } from "react-icons/md";
import { pusherClient } from "@/lib/pusher";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@nextui-org/react";

async function likeHandler(
  commentID: string,
  isLike: boolean,
  userID: string,
  toast: any
) {
  if (!userID) {
    toast({
      variant: "warning",
      title: `Đã có lỗi xảy ra`,
      description: `Bạn phải đăng nhập để sử dụng chức năng này`,
    });
    return;
  }

  const url = process.env.NEXT_PUBLIC_URL;

  const dataFetch = await fetch(`${url}/api/comment/${commentID}`, {
    method: `POST`,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ isLike }),
  });

  const data = await dataFetch.json();
  if (!dataFetch.ok) {
    toast({
      variant: "warning",
      title: `Đã có lỗi xảy ra`,
      description: `Like bình luận thất bại: ${data.message}`,
    });
  }
}

type CommentItemType = {
  depth: number;
  user: any;
  comicID?: string;
  chapterID?: string;
  parentID?: string;
  commentSent: any;
  query?: string;
  queryCommentChain: string[];
};

const CommentItem = ({
  depth,
  user,
  comicID,
  chapterID,
  parentID,
  commentSent,
  query,
  queryCommentChain,
}: CommentItemType) => {
  const MAX_DEPTH = 2;
  const LIMIT_DIV = 12;
  const [isReply, setIsReply] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [comment, setComment] = useState(commentSent);
  const [height, setHeight] = useState<number>(0);
  const [isExpend, setIsExpend] = useState(false);
  const myRef = useRef<HTMLDivElement | null>(null);
  const heightRef = useRef<HTMLDivElement | null>(null);
  const [time, setTime] = useState<string>(
    moment(comment.updateAt).fromNow().toString()
  );
  const [isHighlight, setIsHighLight] = useState(query === comment.id);
  const { toast } = useToast();

  useEffect(() => {
    const id = setTimeout(() => {
      setTime(moment(comment.updateAt).fromNow().toString());
    }, 60000);
    return () => clearTimeout(id);
  }, [time]);

  useEffect(() => {
    const id = comment.id;
    pusherClient.subscribe(id!);
    pusherClient.bind(`commentMessageEdit: ${id}`, (data: any) => {
      // console.log(data);
      setComment(data);
      setIsEdit(false);
      setTime(moment(data.updateAt).fromNow().toString());
    });

    setHeight(heightRef.current?.clientHeight!);

    if (isHighlight) {
      myRef.current?.scrollIntoView({
        block: "center",
      });
      setTimeout(() => {
        setIsHighLight(!isHighlight);
      }, 5000);
    }

    return () => {
      pusherClient.unsubscribe(id!);
      pusherClient.unbind(`commentMessageEdit: ${id}`);
    };
  }, []);
  // console.log(commentSent);
  console.log(height);
  return (
    <div
      id={comment.id}
      className={`flex space-x-2 w-full rounded-md pb-2 mt-3 ${
        isHighlight ? "bg-yellow-200 dark:bg-slate-600" : ""
      }`}
      ref={myRef}
    >
      <div className="mt-2 mx-2">
        <Image
          src={comment.user.imageUrl}
          width={40}
          height={40}
          alt="Avatar"
          className="rounded-full"
        />
      </div>

      <div className="content grow w-full">
        <div className="w-full flex justify-between mt-1 header pb-1 border-b-2 border-yellow-600 dark:border-yellow-400">
          <div className="header-information flex space-x-2">
            <div className="text-yellow-600 dark:text-yellow-400">
              {comment.user.name}
            </div>
            <div className="text-xs flex items-center text-center backdrop:text-xs text-violet-950 border-2 border-fuchsia-900">
              {comment.user.role}
            </div>
          </div>

          {comment.user.id === user?.id && (
            <div className="header-button flex items-center space-x-1">
              <div
                className="edit-button cursor-pointer hover:text-blue-600 dark:hover:text-yellow-400"
                onClick={() => setIsEdit(!isEdit)}
              >
                <MdCreate size={20} />
              </div>

              <DeleteCommentButton
                comment={comment}
                parentId={parentID ?? (comicID || chapterID)} //Nếu parent ko tồn tại thì reference tới root
              />
            </div>
          )}
        </div>

        {!isEdit ? (
          <div>
            <div
              className={`comment-content mt-1 text-pretty whitespace-pre-line truncate ${
                isExpend ? "max-h-full" : "max-h-12"
              }`}
              ref={heightRef}
            >
              {comment.content}
            </div>
            {height === 4 * LIMIT_DIV && (
              <div className="mt-1 border-t-2 border-yellow-600 dark:border-yellow-400 flex justify-center">
                <Button
                  color="warning"
                  size="sm"
                  className="mt-1 text-white"
                  onClick={() => setIsExpend(!isExpend)}
                >
                  {isExpend ? "Rút gọn" : "Xem thêm"}
                </Button>
              </div>
            )}
          </div>
        ) : (
          <CommentInput
            user={user}
            comicsID={comicID}
            chapterID={chapterID}
            commentID={comment.id}
            content={comment.content}
          />
        )}

        <div className="button-controls flex space-x-4 item-center">
          <div
            className="like-button items-center space-x-1 flex"
            onClick={() =>
              likeHandler(
                comment.id,
                comment.userLikesId.includes(user?.id),
                user?.id,
                toast
              )
            }
          >
            <AiOutlineLike
              className={`cursor-pointer ${
                comment.userLikesId.includes(user?.id)
                  ? "text-blue-500 dark:text-yellow-400"
                  : ""
              } hover:text-blue-500 dark:hover:text-yellow-400`}
            />
            <p>{comment.userLikesId.length.toString()}</p>
          </div>
          <div
            className="reply-button items-center space-x-1 flex cursor-pointer hover:text-blue-500 dark:hover:text-yellow-400"
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
              commentID={depth === MAX_DEPTH ? parentID : comment.id} // Nếu vượt quá ngưỡng các comment khi trả lời sẽ cùng cấp nhau
            />
          </div>
        )}
        {depth < MAX_DEPTH && (
          <Comments
            depth={depth + 1}
            user={user}
            comicID={comicID}
            chapterID={chapterID}
            commentID={comment.id}
            query={query}
            queryCommentChain={queryCommentChain}
          />
        )}
      </div>
    </div>
  );
};

export default memo(CommentItem);
