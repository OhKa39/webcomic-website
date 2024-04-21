import { FaHeart } from "react-icons/fa6";
import { FaHeartBroken } from "react-icons/fa";
import ButtonForComicPage from "@/app/comic/[comic-page]/_components/CPB-items";
import { User, Events } from "@prisma/client";

type props = {
  profileFetch: User;
  comicId: string;
};

export default function ComicPageButton({ profileFetch, comicId }: props) {
  const listButton = [
    {
      //True: eventTypes == "FOLLOW"
      color: "warning",
      textFalse: "Theo dõi",
      textTrue: "Bỏ theo dõi",
      iconFalse: <FaHeart />,
      iconTrue: <FaHeartBroken />,
    },
  ];
  // console.log("State check", currentEvent?.eventType)
  return listButton.map((i) => (
    <ButtonForComicPage
      key={i.textFalse}
      color={i.color}
      textFalse={i.textFalse}
      textTrue={i.textTrue}
      iconFalse={i.iconFalse}
      iconTrue={i.iconTrue}
      profile={profileFetch}
      comicId={comicId}
    />
  ));
}
