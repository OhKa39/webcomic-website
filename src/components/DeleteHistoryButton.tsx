"use client";
import { TiDelete } from "react-icons/ti";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";

export default function DeleteHistoryButton({
  result,
  setcomicIdToDelete,
}: {
  result: any;
  setcomicIdToDelete: any;
}) {
  const { toast } = useToast();
  const deleteComic = async (userId: string, newComicIdToDelete: string) => {
    const urlPage = process.env.NEXT_PUBLIC_URL;
    const data = await fetch(
      `${urlPage}/api/SignedinHistory?userId=${userId}&comicId=${newComicIdToDelete}`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      }
    );
    // return data.json();
  };
  const handleClick = (newComicIdToDelete: string, userId: string) => {
    if (userId) {
      setcomicIdToDelete(newComicIdToDelete);
      deleteComic(userId, newComicIdToDelete);
      toast({
        variant: "success",
        title: "Đã xóa thành công!",
      });
    } else {
      const localStorageComics = JSON.parse(
        localStorage.getItem("visited-comics") || "[]"
      );
      let comics = localStorageComics.filter(
        (u: any) => u.comicId !== newComicIdToDelete
      );
      localStorage.setItem("visited-comics", JSON.stringify(comics));
      setcomicIdToDelete(newComicIdToDelete);
    }
  };
  return (
    <Button
      className=""
      variant="ghost"
      onClick={() => handleClick(result.id, result.userID)}
    >
      <TiDelete />
    </Button>
  );
}
