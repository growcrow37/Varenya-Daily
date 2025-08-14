import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { getCommentsByArticleId, getArticles } from "@/lib/data";
import { MoreHorizontal, Pin, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export default async function AdminCommentsPage() {
  const allArticles = await getArticles();
  const allComments = (await Promise.all(
    allArticles.map(article => getCommentsByArticleId(article.id).then(comments => comments.map(c => ({...c, articleTitle: article.title, articleSlug: article.slug}))))
  )).flat();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Comments</CardTitle>
        <CardDescription>Manage all comments from your visitors.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Comment</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>In Response To</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {allComments.map((comment) => (
              <TableRow key={comment.id}>
                <TableCell className="max-w-sm">
                    <p className="truncate">{comment.content}</p>
                    <span className="text-xs text-muted-foreground">{new Date(comment.createdAt).toLocaleDateString()}</span>
                </TableCell>
                <TableCell>{comment.author}</TableCell>
                <TableCell>
                  <Link
                    href={`/articles/${comment.articleSlug}`}
                    className="hover:underline"
                    legacyBehavior>
                    {comment.articleTitle}
                  </Link>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button aria-haspopup="true" size="icon" variant="ghost">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Toggle menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>
                        <Pin className="mr-2 h-4 w-4"/>
                        Pin Comment
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-500 hover:!text-red-500">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
