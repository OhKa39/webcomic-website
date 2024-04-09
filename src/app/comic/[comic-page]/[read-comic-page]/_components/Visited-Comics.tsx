export default function visitedComics(comicChapter : any, comicId : any ) {
    const localStorageComics = JSON.parse(localStorage.getItem("visited-comics") || "[]")
    let comics = localStorageComics.filter((u: any) => u.comicId !== comicId);
    comics.push({comicChapter, comicId})
    localStorage.setItem("visited-comics", JSON.stringify(comics))
}
