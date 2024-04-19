"use client";
import { Button } from "@nextui-org/react";
import { useState, useEffect } from "react";
import { User } from "@prisma/client";
import { useToast } from "@/components/ui/use-toast";

export default function ButtonForComicPage({
  color,
  textFalse,
  textTrue,
  iconFalse,
  iconTrue,
  profile,
  comicId,
}: {
  color: any;
  textFalse: string;
  textTrue: string;
  iconFalse: any;
  iconTrue: any;
  profile: User;
  comicId: string;
}) {
  // console.log("state", state);
  // console.log("state", state);
  const [isFollowed, setIsFollowed] = useState(false);
  const urlPage = process.env.NEXT_PUBLIC_URL;
  const { toast } = useToast();

  useEffect(() => {
    const getCurrentEvents = async () => {
      const urlPage = process.env.NEXT_PUBLIC_URL;
      const data = await fetch(
        `${urlPage}/api/follow/${comicId}?userID=${profile?.id}`,
        {
          cache: "no-cache",
        }
      );
      // console.log(`${urlPage}/api/events/${comicID}?${userID}`);
      const dataFetch = await data.json();
      setIsFollowed(dataFetch?.isTurnOn ?? false);
    };
    getCurrentEvents();
  }, []);

  async function handleClick() {
    try {
      if (!profile) {
        toast({
          variant: "warning",
          title: "Đã có lỗi xảy ra",
          description: "Vui lòng đăng nhập để sử dụng tính năng này",
        });
      } else {
        const query = {
          eventType: isFollowed ? "UNFOLLOW" : "FOLLOW",
          comicsId: comicId,
        };

        const data = fetch(`${urlPage}/api/follow`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ query }),
        }).then((data) => data.json());
        toast({
          variant: "success",
          title: "Thành công",
          description: `${
            !isFollowed ? "Theo dõi" : "Hủy theo dõi"
          } thành công`,
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
