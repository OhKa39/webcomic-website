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
      //True: eventTypes == "FOLLOW"
      color: "warning",
      textFalse: "Theo dõi",
      textTrue: "Bỏ theo dõi",
      iconFalse: <FaHeart />,
      iconTrue: <FaHeartBroken />,
      id: profileFetch,
      comicId,
      CurrentFollow: ((currentEvent?.eventType === "FOLLOW" ? true : false) ?? false)
    },
  ];
  // console.log("State check", currentEvent?.eventType)
  return listButton.map((i) => (
    <ButtonForComicPage
      key={i.textFalse}
      color={i.color}
      textFalse={i.textFalse}
      textTrue={i.textTrue}
      state={i.CurrentFollow} // if miss undefined ????? 
      iconFalse={i.iconFalse}
      iconTrue={i.iconTrue}
      id={profileFetch}
      comicId={comicId} />
  ),);
}
