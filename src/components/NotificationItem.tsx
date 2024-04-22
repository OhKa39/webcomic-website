"use client";
import React, { useState, useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IoIosNotifications } from "react-icons/io";
import Image from "next/image";
import Link from "next/link";
import moment from "moment";
import { pusherClient } from "@/lib/pusher";

function literal(data: any, user: any) {
  //Người dùng đã bình luận...
  if (data.entityNotification.id === "661962f9da0105ab37470cb9") {
    const chapter = data.commentActor.comicChapters;
    const comics = !!chapter ? chapter.comics : data.commentActor.comics;
    const actor = data.commentActor.user.name;
    const entityAction = data.entityNotification.entityContent;

    const stringTemplate = `${actor} ${entityAction} comment của 
      ${user.id === data.events.user.id ? "bạn" : data.events.user.name} 
      trong ${!!chapter ? `chapter ${chapter.chapterNumber} của` : ""} 
      truyện ${comics.comicName}: "${
      data.commentActor.content.substring(0, 40) +
      (data.commentActor.content.length > 40 ? "..." : "")
    }"`;
    /*template: {actor} {entityAction} comment của {bạn | người bạn follow}  
                  trong {chapter? "của"} {comicName}: "{comment}"
      */
    const linkString = `/comic/${comics.id}${
      !!chapter ? `/${chapter.chapterNumber}` : ""
    }?commentID=${data.commentActor.id}`;

    const avatarLink = data.commentActor.user.imageUrl;
    const isRead = data.isRead;
    const timeCreatedAt = data.commentActor.createdAt;
    return { stringTemplate, linkString, avatarLink, isRead, timeCreatedAt };
  }
}

async function clickHandler(id: string, isRead: boolean, userID: string) {
  if (isRead) return;
  const urlPage = process.env.NEXT_PUBLIC_URL;
  const query = {
    id,
    isRead,
    userID,
  };
  const url = `${urlPage}/api/notification`;
  const dataFetch = await fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
  });
}

const NotificationItem = ({ data, user }: { data: any; user: any }) => {
  // console.log(data);
  const { linkString, avatarLink, stringTemplate, isRead, timeCreatedAt } =
    literal(data, user)!;

  const [time, setTime] = useState<string>(
    moment(timeCreatedAt).fromNow().toString()
  );

  useEffect(() => {
    const id = setTimeout(() => {
      setTime(moment(timeCreatedAt).fromNow().toString());
    }, 60000);
    return () => clearTimeout(id);
  }, [time]);

  // console.log(formatString);
  return (
    <DropdownMenuItem
      className={`hover:opacity-80 cursor-pointer`}
      onClick={() => {
        clickHandler(data.id, isRead, user.id);
      }}
    >
      <Link href={linkString}>
        <div className="container flex items-center justify-center space-x-2">
          <div>
            <Image
              src={avatarLink}
              alt="Avatar"
              width={40}
              height={40}
              className="rounded-full"
            />
          </div>
          <div className="grow text-sm w-[26rem]">
            {stringTemplate}
            <div>{time}</div>
          </div>
          {!isRead && (
            <div className="w-[0.55rem] h-2 rounded-full bg-yellow-400"></div>
          )}
        </div>
      </Link>
    </DropdownMenuItem>
  );
};

export default NotificationItem;
