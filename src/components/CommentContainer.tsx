import React from "react";
import Comments from "./Comments";

async function getData({
  comicID,
  chapterID,
}: {
  comicID?: string;
  chapterID?: string;
}) {
  const urlPage = process.env.NEXT_PUBLIC_URL;
  const response = await fetch(
    `${urlPage}/api/comment?ComicId=${comicID}&chapterId=${chapterID}`,
    {
      method: "GET",
    }
  );
  return await response.json();
}

const CommentContainer = async ({
  comicID,
  chapterID,
}: {
  comicID?: string;
  chapterID?: string;
}) => {
  // const [data, setData] = useState([]);
  //   console.log("data");
  // const urlPage = process.env.NEXT_PUBLIC_URL;
  // console.log(
  //   `${urlPage}/api/comment?ComicId=${comicID}&chapterId=${chapterID}`
  // );
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch(
  //         `${urlPage}/api/comment?ComicId=${comicID}&chapterId=${chapterID}`,
  //         {
  //           method: "GET",
  //         }
  //       );
  //       if (!response.ok) {
  //         throw new Error("Failed to fetch comic types");
  //       }
  //       const responseData = await response.json();
  //       setData(responseData);
  //     } catch (error) {
  //       console.error("Error fetching comic types:", error);
  //     }
  //   };

  //   fetchData();
  // }, []);
  const data = await getData({ comicID, chapterID });
  return (
    <div className="mt-5">
      {/* {data.map((attr: any) => (
        <CommentItem
          key={attr.id}
          avatarURL={attr.user.imageUrl}
          fullName={attr.user.name}
          likeNumber={attr.likes}
          role={attr.user.role}
          content={attr.content}
          updatedTime={attr.updateAt}
        />
      ))} */}
      <Comments initialData={data} comicID={comicID} chapterID={chapterID} />
    </div>
  );
};

export default CommentContainer;
