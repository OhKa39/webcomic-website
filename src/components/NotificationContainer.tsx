"use client";
import React, { useEffect, useState } from "react";
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
import NotificationItem from "./NotificationItem";
import { pusherClient } from "@/lib/pusher";

const getData = async (user: any) => {
  const urlPage = process.env.NEXT_PUBLIC_URL;
  // console.log(`${urlPage}/api/notification?userID=${user.user.id}`);
  const response = await fetch(`${urlPage}/api/notification`, {
    method: "GET",
  });
  return response.json();
};

const NotificationDropDown = ({ user }: { user: any }) => {
  const [data, setData] = useState<any[]>([]);
  const [notReadCount, setNotReadCount] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      const urlPage = process.env.NEXT_PUBLIC_URL;
      // console.log(`${urlPage}/api/notification?userID=${user.id}`);
      const response = await fetch(`${urlPage}/api/notification`, {
        method: "GET",
      });
      const dataFetch = await response.json();
      setData(dataFetch);
      setNotReadCount(
        dataFetch.filter((ele: any) => ele.isRead === false).length
      );
    };
    fetchData();
  }, []);
  // console.log(data);

  useEffect(() => {
    pusherClient.subscribe(user!.id);
    pusherClient.bind(
      `notificationMessage: ${user!.id}`,
      (dataReceive: any) => {
        setData((prev: any[]) => [dataReceive, ...prev]);
        setNotReadCount((prev: number) => prev + 1);
      }
    );

    pusherClient.bind(`NotificationUpdate: ${user!.id}`, (dataReceive: any) => {
      setData((prev: any[]) =>
        prev.map((u: any) => (u.id !== dataReceive.id ? u : dataReceive))
      );
      setNotReadCount((prev: number) => prev - 1);
    });

    return () => {
      pusherClient.unsubscribe(user!.id);
      pusherClient.unbind(`notificationMessage: ${user!.id}`);
      pusherClient.unbind(`NotificationUpdate: ${user!.id}`);
    };
  }, []);
  // const data = await getData(user);
  return (
    <div className="absolute">
      {notReadCount > 0 && (
        <div
          className="
          absolute 
          inline-flex 
          items-center 
          justify-center
          -right-[1.25rem] 
          -top-[0.9rem]
          w-5 
          h-5
          rounded-full 
          bg-red-500 
          text-xs
          select-none
          text-white"
        >
          {notReadCount > 99 ? "!" : notReadCount}
        </div>
      )}
      <DropdownMenuContent
        className="
        max-h-[20rem] 
        overflow-y-auto 
        w-[30rem] 
        bg-slate-300 
        dark:bg-black 
        relative 
        -left-32"
      >
        <DropdownMenuLabel>Các thông báo đã lưu trữ</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {data.map((attr: any) => (
          <NotificationItem key={attr.id} data={attr} user={user} />
        ))}
      </DropdownMenuContent>
    </div>
  );
};

export default NotificationDropDown;
