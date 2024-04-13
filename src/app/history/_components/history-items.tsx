import Container from "@/components/Container";

async function getData(localComic: any) {
  if (localComic.length == 0) return;
  const urlPage = process.env.NEXT_PUBLIC_URL;
  let url = `${urlPage}/api/history?IDs=${localComic}`;
  const data = await fetch(url);
  return data.json();
}

export default async function HistoryItems({
  data,
  comicIdToDelete = "65f90375ba609768fc30cfdb",
  setcomicIdToDelete,
}: {
  data: any;
  comicIdToDelete: any;
  setcomicIdToDelete: any;
}) {
  if (data.length == 0) return <h1>không tìm thấy truyện!</h1>;
  const comicIdAfterDelete = data.filter(
    (i: any) => i.comicId !== comicIdToDelete
  ); //xoa thg co id can xoa

  const comicIdString = comicIdAfterDelete.map((i: any) => i.comicId); // map ra mang id
  const chapterNumberString = data.map((i: any) => i.comicChapter); // map ra mang chapter

  const comicIdArray = comicIdString.join(",");
  if (comicIdArray.length < 1) return <h1>không tìm thấy truyện!</h1>;
  let localComic = await getData(comicIdArray);
  localComic.forEach((obj: any, index: any) => {
    obj.chapterNumber = chapterNumberString[index];
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
