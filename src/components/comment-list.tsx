"use client";

import { useEffect, useState } from "react";
import type { Comment } from "@/lib/types";
import { getCommentsByArticleId } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDistanceToNow } from "date-fns";

export function CommentList({ articleId }: { articleId: string }) {
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    getCommentsByArticleId(articleId).then(setComments);
  }, [articleId]);

  return (
    <div className="mt-8 space-y-6">
      {comments.length > 0 ? (
        comments.map((comment) => (
          <Card key={comment.id} className="bg-card/50">
            <CardHeader className="flex flex-row items-center space-x-4 pb-2">
              <Avatar>
                <AvatarFallback>{comment.author.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <CardTitle className="text-base font-semibold">
                  {comment.author}
                </CardTitle>
                <p className="text-xs text-muted-foreground">
                  {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                </p>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-foreground/90">{comment.content}</p>
            </CardContent>
          </Card>
        ))
      ) : (
        <p className="text-center text-muted-foreground">
          No comments yet. Be the first to share your thoughts!
        </p>
      )}
    </div>
  );
}
