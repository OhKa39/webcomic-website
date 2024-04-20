import Container from "@/components/Container";

async function getData(localComic: any) {
  if (localComic.length == 0) return;
  const urlPage = process.env.NEXT_PUBLIC_URL;
  let url = `${urlPage}/api/history?IDs=${localComic}`;
  const data = await fetch(url);
  return data.json();
}
export default async function HistoryItems({data, comicIdToDelete, setcomicIdToDelete}:{data:any, comicIdToDelete:any,setcomicIdToDelete:any}) {
  if (data.length == 0) return(<h1>không tìm thấy truyện!</h1>)
  const comicAfterDelete = data.filter((i:any)=>i.comicId !== comicIdToDelete) //xoa thg co id can xoa
  
  const comicIdArray = comicAfterDelete.map((i: any) => i.comicId);
  const comicIdString = comicIdArray.join(",");
  if (comicIdArray.length < 1) return <h1>không tìm thấy truyện!</h1>;
  let localComic = await getData(comicIdString);

  localComic.forEach((i: any) => {
    comicAfterDelete.forEach((j: any) => {
      if (i.id === j.comicId) i.chapterNumber = j.comicChapter;
    });
  });
  
  return (
    <div>
      <Container
        data={localComic}
        setcomicIdToDelete={setcomicIdToDelete}
        comicIdToDelete={comicIdToDelete}
      />
    </div>
  );
}
