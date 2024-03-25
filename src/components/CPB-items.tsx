'use client'
import {Button} from "@nextui-org/react";
import { useState } from 'react';



export default function ButtonForComicPage({color, text, state}){
    function handleClick() {
        setChooseState(!isChoose)
    }

    const [isChoose, setChooseState] = useState(state)
    return (
            <Button color={isChoose ? color : 'primary'} onClick={handleClick}>{text}</Button>
    )
}