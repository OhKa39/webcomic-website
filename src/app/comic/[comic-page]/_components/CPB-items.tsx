"use client";
import { Button } from "@nextui-org/react";
import { useState } from "react";
import { User } from "@prisma/client";
import { useToast } from "@/components/ui/use-toast";

export default function ButtonForComicPage({
  color,
  textFalse,
  textTrue,
  state,
  iconFalse,
  iconTrue,
  id,
  comicId,
}: {
  color: any;
  textFalse: string;
  textTrue: string;
  state: boolean;
  iconFalse: any;
  iconTrue: any;
  id: User;
  comicId: string;
}) {
  console.log("state", state);
  // console.log("state", state);
  const [isFollowed, setIsFollowed] = useState(state);
  const urlPage = process.env.NEXT_PUBLIC_URL;
  const { toast } = useToast();

  async function handleClick() {
    try {
      if (!id) {
        toast({
          variant: "warning",
          title: "Đã có lỗi xảy ra",
          description: "Vui lòng đăng nhập để sử dụng tính năng này",
        });
      }
      else {
        const query = {
          eventType: isFollowed ? "UNFOLLOW" : "FOLLOW",
          comicsId: comicId,
        };

        const data = fetch(`${urlPage}/api/events`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ query }),
        }).then((data) => data.json());
        toast({
          variant: "success",
          title: `${!isFollowed ? "Theo dõi" : "Hủy theo dõi"} thành công`,
        });
        setIsFollowed(!isFollowed);
      }
    } catch (error) {
      console.error("Error updating event:", error);
    }
  }

  return (
    <div className="inline">
      <Button
        className="font-bold"
        color={isFollowed ? "danger" : color}
        onClick={handleClick}
      >
        {isFollowed ? iconTrue : iconFalse}
        {isFollowed ? textTrue : textFalse}
      </Button>
    </div>
  );
}
