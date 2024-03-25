import {Button} from "@nextui-org/react";
import ButtonForComicPage from "@/components/CPB-items"

export default function ComicPageButton({}){
    const listButton = [{color: "warning", text:"Like", },
                        {color: "warning", text:"Theo dõi", }]

    return (
        (
            listButton.map((i)=>(
            <ButtonForComicPage color={i.color} text={i.text} state="true" />
        )))
    )
}