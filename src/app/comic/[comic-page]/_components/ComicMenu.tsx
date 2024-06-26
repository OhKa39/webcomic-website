import Link from "next/link";

export default function ComicMenu({ data, path }: { data: any; path: any }) {
  return data.map((chapter: any) => (
    <div className=" overflow-auto" key={chapter.chapterNumber}>
      <ol className="leading-8  hover:text-red-300 transition-opacity duration-300">
        <li>
          <Link href={`${path}/${chapter.chapterNumber}`}>
            Chương {chapter.chapterNumber}
          </Link>
        </li>
      </ol>
    </div>
  ));
}
