import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Newspaper, MessageSquare, PlusCircle } from "lucide-react";

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="font-headline text-3xl font-bold">Dashboard</h1>
        <Link href="/admin/articles/new">
            <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                New Article
            </Button>
        </Link>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Articles</CardTitle>
            <Newspaper className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">9</div>
            <p className="text-xs text-muted-foreground">7 Published, 2 Drafts</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Comments</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Awaiting moderation: 0</p>
          </CardContent>
        </Card>
         <Card className="bg-primary/5 border-primary/20">
          <CardHeader>
            <CardTitle>Welcome, Admin!</CardTitle>
            <CardDescription>
                Manage your content, view comments, and configure site settings from here.
            </CardDescription>
          </CardHeader>
          <CardContent>
             <Link href="/admin/articles">
                 <Button variant="outline">Manage Articles</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
