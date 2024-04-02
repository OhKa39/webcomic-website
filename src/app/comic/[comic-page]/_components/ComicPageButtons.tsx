import { BiLike } from "react-icons/bi";
import { BiSolidLike } from "react-icons/bi";
import { FaHeart } from "react-icons/fa6";
import { FaHeartBroken } from "react-icons/fa";
import ButtonForComicPage from "@/app/comic/[comic-page]/_components/CPB-items";



export default function ComicPageButton({}) {
  const listButton = [
    {
      color: "warning",
      text: "Like",
      text2: "Bỏ Like",
      icon: <BiSolidLike />,
      icon2: <BiLike />,
    },
    {
      color: "warning",
      text: "Theo dõi",
      text2: "Bỏ theo dõi",
      icon: <FaHeart />,
      icon2: <FaHeartBroken />,
    },
  ];

  return listButton.map((i) => (
    <ButtonForComicPage
      key={i.text}
      color={i.color}
      text={i.text}
      text2={i.text2}
      state="true"
      icon={i.icon}
      icon2={i.icon2}
    />
  ));
}
