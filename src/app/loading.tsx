"use client";
import { Spinner } from "@nextui-org/react";

export default function Loading() {
  return (
    <div className="h-screen flex justify-center items-center">
      <Spinner label="Loading..." color="warning" />
      {/* <h2 className="text-5xl text-yellow-600">Đang tải! Vui lòng chờ</h2> */}
    </div>
  );
}
