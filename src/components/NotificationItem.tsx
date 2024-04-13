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
  if (data.entityNotification.id === "661962f9da0105ab37470cb9") {
    //Người dùng đã bình luận...
    if (!!data.commentActor.comicsId) {
      const stringTemplate = `${data.commentActor.user.name} ${
        data.entityNotification.entityContent
      } comment của ${
        user.id === data.events.user.id ? "bạn" : `${data.events.user.name}`
      } trong truyện ${data.commentActor.comics.comicName}: "${
        data.commentActor.content
      }"`;

      const linkString = `/comic/${data.commentActor.comicsId}?commentID=${data.commentActor.id}`;
      const avatarLink = data.commentActor.user.imageUrl;
      const isRead = data.isRead;
      const timeCreatedAt = data.commentActor.createdAt;
      return { stringTemplate, linkString, avatarLink, isRead, timeCreatedAt };
    }
  }
}

async function clickHandler(id: string, isRead: boolean, userID: string) {
  const urlPage = process.env.NEXT_PUBLIC_URL;
  const query = {
    id,
    isRead,
    userID,
  };
  const url = `${urlPage}/api/notification`;
  const dataFetch = await fetch(url, {
    method: "PUT",
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
    }, 1000);
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
