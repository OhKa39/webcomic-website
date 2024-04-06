import { FaHeart } from "react-icons/fa6";
import { FaHeartBroken } from "react-icons/fa";
import ButtonForComicPage from "@/app/comic/[comic-page]/_components/CPB-items";
import { User, Events } from "@prisma/client"


type props = {
  profileFetch: User,
  comicId: string,
  currentEvent: Events
}
export default function ComicPageButton({ profileFetch, comicId, currentEvent }: props) {
  const listButton = [
    {
      color: "warning",
      text: "Theo dõi",
      text2: "Bỏ theo dõi",
      icon: <FaHeart />,
      icon2: <FaHeartBroken />,
      id: profileFetch,
      comicId,
      isFollow: (currentEvent?.eventType === "FOLLOW" ? true : false) ?? false
    },
  ];
  console.log("State check", currentEvent?.eventType)
  return listButton.map((i) => (
    <ButtonForComicPage
      key={i.text}
      color={i.color}
      text={i.text}
      text2={i.text2}
      state={i.isFollow} // if miss undefined ????? 
      icon={i.icon}
      icon2={i.icon2}
      id={profileFetch}
      comicId={comicId} />

  ));
}
