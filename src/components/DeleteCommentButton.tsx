"use client";
import { Button } from "@nextui-org/react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { MdDeleteOutline } from "react-icons/md";
import { Comments } from "@prisma/client";
import { useToast } from "@/components/ui/use-toast";

export default function DeleteCommentButton({
  comment,
  parentId,
}: {
  comment: Comments;
  parentId: string | undefined;
}) {
  const { toast } = useToast();

  async function onHandler(comment: Comments, parentId: string | undefined) {
    const urlPage = process.env.NEXT_PUBLIC_URL;

    const query = {
      comment,
      parentId,
    };
    console.log(query);
    const url = `${urlPage}/api/comment`;
    const dataFetch = await fetch(url, {
      method: `DELETE`,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    });
    const data = await dataFetch.json();
    if (dataFetch.status === 200)
      toast({
        variant: "success",
        title: `Thành công`,
        description: `Xóa bình luận thành công`,
      });
    else
      toast({
        variant: "warning",
        title: `Đã có lỗi xảy ra`,
        description: `Xóa bình luận thất bại: ${data.message}`,
      });
  }

  return (
    <Dialog>
      <DialogTrigger>
        <MdDeleteOutline />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Bạn có chắc muốn xóa bình luận này?</DialogTitle>
          <DialogDescription>
            Hành động này không thể được hoàn tác. Thao tác này sẽ xóa vĩnh viễn
            dữ liệu của bạn khỏi máy chủ của chúng tôi.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-start">
          <div className="flex space-x-2">
            <DialogClose asChild>
              <Button size="sm" color="warning">
                Hủy
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button
                size="sm"
                color="danger"
                onClick={() => {
                  onHandler(comment, parentId);
                }}
              >
                Xóa
              </Button>
            </DialogClose>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
