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

const formSchema = z.object({
  content: z.string().min(1, {
    message: "Nội dung bình luận phải chứa ít nhất 1 kí tự",
  }),
});

const CommentInput = () => {
  const [text, setText] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nội dung</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Textarea
                      placeholder="Hãy bình luận văn minh để tránh bị khóa tài khoản"
                      className="h-10"
                      {...field}
                    />
                    <div className="absolute top-2 right-2">
                      <EmojiPicker
                        onChange={(emoji: string) =>
                          field.onChange(`${field.value} ${emoji}`)
                        }
                      />
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" variant="yellotheme">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default CommentInput;
