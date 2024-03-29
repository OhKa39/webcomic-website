import React from "react";
import { auth } from "@clerk/nextjs";
import Container from "@/components/Container";
import { FaShoppingCart } from "react-icons/fa";

export default function page() {
  const { userId }: { userId: string | null } = auth();
  return (
    <div className="max-w-6xl mx-auto p-3 space-y-3 overflow-auto">
      <div className="container">
        <div></div>
        <h1 className="text-blue-600 text-xl mt-5">
          <p>
            <FaShoppingCart className="hidden sm:inline" />
            Truyện đang theo dõi
          </p>
        </h1>
        {
          // userId ? <Container/> :
          <div className="h-20 flex items-center bg-slate-200">
            <h1>
              Xin lỗi, không tìm thấy kết quả nào!! Hãy đăng nhập để sử dụng
              tính năng này.
            </h1>
          </div>
        }
      </div>
    </div>
  );
}
