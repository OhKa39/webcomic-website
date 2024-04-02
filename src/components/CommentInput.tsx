"use client";
import React, { useState } from "react";
import InputEmoji from "react-input-emoji";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
// import EmojiPicker from "emoji-picker-react";
import EmojiPicker from "@/components/Emoji-picker";
import Image from "next/image";

const formSchema = z.object({
  content: z.string().min(1, {
    message: "Nội dung bình luận phải chứa ít nhất 1 kí tự",
  }),
});

const CommentInput = ({
  user,
  comicsID,
  chapterID,
}: {
  user: any;
  chapterID?: string;
  comicsID?: string;
}) => {
  // console.log(user);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
    },
  });

  function onHandler(values: z.infer<typeof formSchema>) {
    const urlPage = process.env.NEXT_PUBLIC_URL;
    const query = {
      content: values.content,
      comicsID: comicsID,
      chapterID: chapterID,
    };
    const data = fetch(`${urlPage}/api/comment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    }).then((data) => data.json());
    console.log(data);
    console.log(values);
    form.reset();
  }

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onHandler)}
          className="space-y-8 after:clear-both after:table"
        >
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nội dung</FormLabel>
                <FormControl>
                  <div className="relative flex space-x-2">
                    {user && (
                      <div className="avatar">
                        <Image
                          src={user.imageUrl}
                          width={40}
                          height={40}
                          alt="Avatar"
                          className="rounded-full"
                        />
                      </div>
                    )}
                    <Textarea
                      placeholder={
                        !!user
                          ? `Hãy nhập lời bình luận của bạn vào đây`
                          : `Hãy đăng nhập để bình luận`
                      }
                      className="h-10"
                      disabled={!user}
                      {...field}
                    />
                    <div className="absolute top-2 right-2">
                      <EmojiPicker
                        onChange={(emoji: string) =>
                          field.onChange(`${field.value} ${emoji}`)
                        }
                        isDisabled={!user}
                      />
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            disabled={!user}
            variant="yellotheme"
            className="float-right"
          >
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default CommentInput;
