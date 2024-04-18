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
  return response.json();
}

async function getCommentRootID({ query }: { query: string | undefined }) {
  const urlPage = process.env.NEXT_PUBLIC_URL;
  const response = await fetch(
    `${urlPage}/api/comment/${query}?isGetRootChain=true`,
    {
      method: "GET",
    }
  );
  return response.json();
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
  query: string | undefined;
}) => {
  const dataFetch = getData({ comicID, chapterID });
  const commentRootFetch = getCommentRootID({ query });
  const [data, commentRootID] = await Promise.all([
    dataFetch,
    commentRootFetch,
  ]);

  // console.log(data);
  return (
    <div className="mt-5">
      <Comments
        depth={0}
        initialData={data}
        comicID={comicID}
        chapterID={chapterID}
        user={user}
        query={query}
        queryCommentChain={commentRootID.rootComment.reverse()}
      />
    </div>
  );
};

export default CommentContainer;
