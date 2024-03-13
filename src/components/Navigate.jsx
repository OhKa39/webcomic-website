import HeaderItems from "./Header-items"
import { FaBookmark } from "react-icons/fa";
import { IoPricetags } from "react-icons/io5";
import { GrHistory } from "react-icons/gr";
import { IoIosNotifications } from "react-icons/io";
import { FaRankingStar } from "react-icons/fa6";

export default function Navigate() {
  return (
    <div className="flex bg-amber-400 item-center justify-center p-3 mx-auto gap-5">    
        <HeaderItems title='tags' address='/tags' Icon={IoPricetags}/>
        <HeaderItems title='follow' address='/follow' Icon={FaBookmark}/>
        <HeaderItems title='history' address='/history' Icon={GrHistory}/>
        <HeaderItems title='notification' address='/notification' Icon={IoIosNotifications}/>
        <HeaderItems title='rank' address='/rank' Icon={FaRankingStar}/>
    </div>
  )
}
