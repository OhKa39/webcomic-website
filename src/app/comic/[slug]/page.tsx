interface ComicPageProps {
    params: any;
  }

export default function comicPage({params})  {
    console.log(params)
    return (
        <p>comic page</p>
    );
};