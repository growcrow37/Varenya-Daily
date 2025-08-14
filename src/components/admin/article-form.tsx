"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { Article, Category } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Sparkles, X, Loader2 } from "lucide-react";
import { suggestTags, SuggestTagsInput } from "@/ai/flows/suggest-tags";
import { useFlow } from "@genkit-ai/next/react";

type ArticleFormProps = {
  article?: Article;
  categories: Category[];
};

export function ArticleForm({ article, categories }: ArticleFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [title, setTitle] = useState(article?.title || "");
  const [content, setContent] = useState(article?.content || "");
  const [isPublished, setIsPublished] = useState(article?.status === "Published" || false);
  const [tags, setTags] = useState<string[]>(article?.tags || []);
  const [tagInput, setTagInput] = useState("");
  
  const { run: suggestTagsFlow, running } = useFlow(suggestTags);

  const handleSuggestTags = async () => {
    if (!content) {
      toast({
        title: "Content needed",
        description: "Please write some content before suggesting tags.",
        variant: "destructive",
      });
      return;
    }
    const result = await suggestTagsFlow({ blogPostContent: content });
    if (result?.tags) {
        const newTags = result.tags.filter(t => !tags.includes(t));
        setTags([...tags, ...newTags]);
    }
  };

  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && tagInput.trim() !== "") {
        e.preventDefault();
        if (!tags.includes(tagInput.trim())) {
            setTags([...tags, tagInput.trim()]);
        }
        setTagInput("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock save
    toast({
      title: article ? "Article Updated" : "Article Created",
      description: `"${title}" has been saved successfully.`,
    });
    router.push("/admin/articles");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Article Content</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Your amazing article title" />
                </div>
                <div>
                  <Label>Content</Label>
                  <Tabs defaultValue="markdown">
                    <TabsList className="mb-2">
                      <TabsTrigger value="markdown">Markdown</TabsTrigger>
                      <TabsTrigger value="richtext" disabled>Rich Text</TabsTrigger>
                    </TabsList>
                    <TabsContent value="markdown">
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                         <Textarea 
                            placeholder="Write your article in Markdown..."
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            rows={20}
                         />
                         <div className="prose prose-invert rounded-md border p-4 overflow-auto">
                            {/* In a real app, use a markdown renderer here */}
                            <p>Markdown preview will be shown here.</p>
                         </div>
                       </div>
                    </TabsContent>
                    <TabsContent value="richtext">
                        {/* Rich text editor would go here */}
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
                <CardTitle>Publish</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
               <div className="flex items-center space-x-2">
                <Switch id="publish-status" checked={isPublished} onCheckedChange={setIsPublished} />
                <Label htmlFor="publish-status">{isPublished ? 'Published' : 'Draft'}</Label>
              </div>
              <div className="flex gap-2">
                <Button type="submit" className="flex-1">{article ? "Save Changes" : "Create Article"}</Button>
                <Link href="/admin/articles" legacyBehavior>
                    <Button variant="outline" type="button">Cancel</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Details</CardTitle>
              <CardDescription>Category and tags for your article.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="category">Category</Label>
                <Select defaultValue={article?.category.id}>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat.id} value={cat.id}>
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="tags">Tags</Label>
                <div className="flex items-center gap-2 mt-2">
                    <Input 
                        id="tags" 
                        placeholder="Add a tag and press Enter"
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        onKeyDown={handleTagKeyDown}
                    />
                    <Button type="button" variant="outline" onClick={handleSuggestTags} disabled={running}>
                        {running ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
                    </Button>
                </div>
                 <div className="mt-2 flex flex-wrap gap-2">
                    {tags.map(tag => (
                        <Badge key={tag} variant="secondary">
                            {tag}
                            <button type="button" onClick={() => removeTag(tag)} className="ml-1 rounded-full hover:bg-background/50">
                                <X className="h-3 w-3" />
                            </button>
                        </Badge>
                    ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </form>
  );
}
