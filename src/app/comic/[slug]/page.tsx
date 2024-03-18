import Image from 'next/image'
import { FaUserTie } from "react-icons/fa";
import { RiCalendarCheckFill } from "react-icons/ri";
import { ImPen } from "react-icons/im";


import file from 'D:/TruongDH/KTPM/2.json'


export default function comicPage({params})  {
    console.log(params)
    return (
        <div className='px-12 sm:px-42 py-5'>
            <div className="gap-5 flex pb-8 ">
                <div className=' flex rounded border-amber-400 border-4'>
                    <Image 
                        src={file.imageLink}
                        width={150}
                        height={150}
                        style={{
                            width: '100%',
                            height: '100%',
                        }}
                        alt="Picture of comic"
                        className=''
                    />
                </div>
                <div className='text-left text-lg'>
                    <h1 className='font-bold'>{file.name}</h1>
                    <ul className='leading-10'>
                        <li> <FaUserTie className='inline'/> Tác giả: {file.author}</li>
                        <li> <RiCalendarCheckFill className='inline'/> Tình trạng: {file.isCompleted}</li>
                    </ul>
                </div>
            </div>
            <div className='flex gap-3 items-center text-lg'>
                <ImPen className='inline '/>
                <p className='font-bold'> Giới thiệu</p>
            </div>
            <div>
                <p className=''>{file.introduce}</p>

            </div>
        </div>     
    );
};