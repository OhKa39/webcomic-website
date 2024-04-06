"use client"
import { Button } from "@nextui-org/react";
import { useState } from "react";
import { User } from "@prisma/client"
import { useToast } from "@/components/ui/use-toast"

export default function ButtonForComicPage({
  color,
  text,
  text2,
  state,
  icon,
  icon2,
  id,
  comicId
}: {
  color: any;
  text: string;
  text2: string;
  state: boolean;
  icon: any;
  icon2: any;
  id: User;
  comicId: string
}) {
  console.log("state", state)
  const [isFollowed, setIsFollowed] = useState(state);
  const urlPage = process.env.NEXT_PUBLIC_URL;
  const { toast } = useToast()
  async function handleClick() {
    try {
      if (!id) {
        toast({
          variant: "warning",
          title: "Đã có lỗi xảy ra",
          description: "Vui lòng đăng nhập để sử dụng tính năng này",
        })
      } else {
        setIsFollowed(!isFollowed);
        const query = {
          eventType: isFollowed ? 'FOLLOW' : 'UNFOLLOW',
          comicsId: comicId,
        }
        const data = fetch(`${urlPage}/api/events`, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ query }),
        })
          .then((data) => data.json());;
        toast({
          variant: "success",
          title: ` ${isFollowed ? 'Huỷ theo dõi' : 'theo dõi'} thành công`,
        })
      }
    } catch (error) {
      console.error('Error updating event:', error);
    }
  }
  return (
    <div className="inline">
      <Button
        className="font-bold"
        color={isFollowed ? "danger" : color}
        onClick={handleClick}
      >
        {isFollowed ? icon2 : icon}
        {isFollowed ? text2 : text}
      </Button>
    </div>
  );
}
