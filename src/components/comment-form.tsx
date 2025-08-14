"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import React from "react";

export function CommentForm({ articleId }: { articleId: string }) {
  const { toast } = useToast();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Here you would typically call a server action to save the comment
    console.log("Submitting comment for article:", articleId);
    toast({
      title: "Comment Submitted",
      description: "Your comment is awaiting moderation.",
    });
    (event.target as HTMLFormElement).reset();
  };

  return (
    <Card className="mt-6 border-border/50 bg-transparent shadow-md">
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              placeholder="Your name"
              required
              className="bg-background"
            />
          </div>
          <div className="grid w-full gap-1.5">
            <Label htmlFor="comment">Your Comment</Label>
            <Textarea
              id="comment"
              name="comment"
              placeholder="Share your thoughts..."
              required
              rows={4}
              className="bg-background"
            />
          </div>
          <Button type="submit">Post Comment</Button>
        </form>
      </CardContent>
    </Card>
  );
}
