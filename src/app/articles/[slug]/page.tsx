// src/app/articles/[slug]/page.tsx
import { getArticleBySlug } from "@/lib/data";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { AdPlaceholder } from "@/components/ad-placeholder";
import { CommentList } from "@/components/comment-list";
import { CommentForm } from "@/components/comment-form";
import { format } from "date-fns";
import { Calendar, Tag } from "lucide-react";

type ArticlePageProps = {
  params: {
    slug: string;
  };
};

export default async function ArticlePage({ params }: ArticlePageProps) {
  const article = await getArticleBySlug(params.slug);

  if (!article) {
    notFound();
  }

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8 bg-background">
      <article>
        <header className="mb-8">
          <div className="mb-4">
            <Badge variant="secondary" className="bg-primary text-primary-foreground hover:bg-primary/90">
              {article.category.name}
            </Badge>
          </div>
          <h1 className="font-headline text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
            {article.title}
          </h1>
          <div className="mt-4 flex items-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center space-x-2 text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>{format(new Date(article.createdAt), "MMMM d, yyyy")}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Tag className="h-4 w-4" />
              <span>{article.tags.slice(0, 2).join(', ')}</span>
            </div>
          </div>
        </header>

        <Image
          src={article.imageUrl}
          alt={article.title}
          width={1200}
          height={675}
          data-ai-hint="news article header"
          className="mb-8 w-full rounded-lg object-cover shadow-lg"
        />

        <div className="prose prose-lg max-w-none leading-relaxed text-foreground/90">
          <p className="text-xl italic text-muted-foreground mb-6">
            {article.excerpt}
          </p>
          <p className="mb-6 text-foreground">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
            euismod, nisl nec ultricies lacinia, nisl nisl aliquet nisl, eget
            aliquet nisl nisl sit amet nisl. Sed euismod, nisl nec ultricies
            lacinia, nisl nisl aliquet nisl, eget aliquet nisl nisl sit amet
            nisl.
          </p>
          <AdPlaceholder className="my-8 h-48 w-full" />
          <p className="mb-6">
            Praesent commodo cursus magna, vel scelerisque nisl consectetur et. text-foreground
            Donec sed odio dui. Nullam id dolor id nibh ultricies vehicula ut id
            elit. Curabitur blandit tempus porttitor.
          </p>
          <p className="mb-6 text-foreground">
            Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor
            auctor. Duis mollis, est non commodo luctus, nisi erat porttitor
            ligula, eget lacinia odio sem nec elit. Morbi leo risus, porta ac
            consectetur ac, vestibulum at eros.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap gap-2">
          {article.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-100">
              border-border text-foreground hover:bg-accent
            </Badge>
          ))}
        </div>
      </article>

      <section className="mt-12 border-t border-gray-200 pt-8">
        <h2 className="font-headline text-3xl font-bold text-foreground">Comments</h2>
        <CommentForm articleId={article.id} />
        <CommentList articleId={article.id} />
      </section>
    </div>
  );
}