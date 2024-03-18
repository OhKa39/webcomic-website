import React from 'react'
import ContainerItems from './Container-items'
//import axios from "axios";

import file1 from 'D:/TruongDH/KTPM/1.json'
import file2 from 'D:/TruongDH/KTPM/2.json'
import file3 from 'D:/TruongDH/KTPM/3.json'

const data : object[] = []
data.push(file1)
data.push(file2) 
data.push(file3) 



export default function Container() {
    // const data = [
    //     { id: "1", link: "1", linkImg: "/anh1.jpg", name: "truyen1", time: "10" },
    //     { id: "2", link: "2", linkImg: "/anh2.jpg", name: "truyen2", time: "10" },
    //     { id: "3", link: "3", linkImg: "/anh3.jpg", name: "truyen3", time: "10" },
    //     { id: "4", link: "4", linkImg: "/anh4.jpg", name: "truyen4", time: "10" },
    //     { id: "5", link: "5", linkImg: "/anh5.jpg", name: "truyen5", time: "10" },
    //     { id: "6", link: "6", linkImg: "/anh6.jpg", name: "truyen6", time: "10" }
    // ]

    return (
        <div className="grid grid-cols-5 mx-auto max-w-6xl py-4 w-full gap-5">
            <ContainerItems data={data} />
        </div>
    )
}



