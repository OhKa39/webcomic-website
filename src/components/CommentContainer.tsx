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
  user,
  query,
}: {
  comicID?: string;
  chapterID?: string;
  user: any;
  query?: string;
}) => {
  const data = await getData({ comicID, chapterID });
  return (
    <div className="mt-5">
      <Comments
        depth={0}
        initialData={data}
        comicID={comicID}
        chapterID={chapterID}
        user={user}
        query={query}
      />
    </div>
  );
};

export default CommentContainer;
