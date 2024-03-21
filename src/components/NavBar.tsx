import HeaderItems from "./Header-items"
import { FaBookmark, FaBrain, FaElementor } from "react-icons/fa";
import { IoPricetags } from "react-icons/io5";
import { GrHistory } from "react-icons/gr";
import { IoIosNotifications } from "react-icons/io";
import { FaRankingStar } from "react-icons/fa6";

export default function NavBar() {
    return (
        <div className="flex bg-amber-400 item-center justify-center p-3 mx-auto gap-5">
            <HeaderItems title='Thể Loại' address='/tags' Icon={IoPricetags} />
            <HeaderItems title='Theo Dõi' address='/follow' Icon={FaBookmark} />
            <HeaderItems title='Lịch Sử' address='/history' Icon={GrHistory} />
<<<<<<< HEAD
            <HeaderItems title='Thông Báo' address='/notification' Icon={IoIosNotifications} />
=======
>>>>>>> 1a2684f6ae1da4484ee7041bc81d7700946fd118
            <HeaderItems title='rank' address='/rank' Icon={FaRankingStar} />
        </div>
    )
}
