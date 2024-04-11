'use client'
import { Select, SelectItem } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { TbPlayerTrackNextFilled } from "react-icons/tb";
import { TbPlayerTrackPrevFilled } from "react-icons/tb";

function checkButton(ListChapter: Number, comicChapter: Number) {
    let checkPrev = true;
    let checkNext = true;
  
    const curPage = Number(comicChapter);
    const countChapter = Number(ListChapter);
  
  
    if (isNaN(curPage) || curPage < 1 || curPage > countChapter) {
      checkPrev = false;
      checkNext = false;
    } else if (curPage == countChapter) {
      checkNext = false;
    } else if (curPage == 1) {
      checkPrev = false;
    }
    return [checkNext, checkPrev];
  }

export default function ChapterListBar({listChapter, comicChapter ,comicId} : {listChapter:any, comicChapter:any ,comicId:any}) 
{
    const router = useRouter()
    const nOfChapter = listChapter.length; // lay so phan tu cua mang tren
    const [hasNext, hasPrev] = checkButton(nOfChapter, comicChapter); // check button next, prev

    const handleSelectionChange = (e: any) => {
        const selectedChapter = e.target.value;
        if (selectedChapter == "") return;
        router.push(`/comic/${comicId}/${selectedChapter}`);
      };

    return (
        <div className="p-1 flex w-full mx-auto gap-5 fixed bottom-0 bg-slate-200 dark:bg-gray-700 h-15 -ml-8 justify-center">
            <button
            onClick={() =>
                router.push(`/comic/${comicId}/${Number(comicChapter) - 1}`)
            }
            disabled={!hasPrev}
            className="p-3 rounded-full disabled:invisible  bg-amber-400 flex gap-2 items-center hover:opacity-80 transition-opacity duration-300"
            >
            <TbPlayerTrackPrevFilled className="inline" />
            </button>
            <Select
            className="w-1/2 "
            disableAnimation={true}
            label="Chapter"
            items={listChapter}
            defaultSelectedKeys={[comicChapter]}
            onChange={handleSelectionChange}
            >
            {listChapter.map((chap: any) => (
                <SelectItem
                className=""
                key={chap.chapterNumber}
                textValue={chap.chapterNumber}
                >
                Chương {chap.chapterNumber}
                </SelectItem>
            ))}
            </Select>
            <button
            onClick={() =>
                router.push(`/comic/${comicId}/${Number(comicChapter) + 1}`)
            }
            disabled={!hasNext}
            className="p-3 rounded-full disabled:invisible  bg-amber-400 flex gap-2 items-center hover:opacity-80 transition-opacity duration-300"
            >
            <TbPlayerTrackNextFilled className="inline" />
            </button>
        </div>
    )
}
