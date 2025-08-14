// src/components/article-card.tsx
import type { Article } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { format } from 'date-fns';

type ArticleCardProps = {
  article: Article;
};

export function ArticleCard({ article }: ArticleCardProps) {
  return (
    <Link href={`/articles/${article.slug}`}>
      <div className="group overflow-hidden rounded-lg bg-white shadow-lg border border-gray-200 transition-all duration-300 hover:shadow-xl hover:border-red-800/20">
        <div className="relative">
          <Image
            src={article.imageUrl}
            alt={article.title}
            width={400}
            height={225}
            data-ai-hint="news article"
            className="w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <Badge variant="secondary" className="absolute top-3 right-3 bg-red-800 text-white hover:bg-red-900">
            {article.category.name}
          </Badge>
        </div>
        <div className="p-4">
          <h3 className="font-headline text-xl font-bold leading-tight text-gray-900 group-hover:text-red-800 transition-colors duration-200">
            {article.title}
          </h3>
          <p className="mt-2 text-sm text-gray-600">
            {article.excerpt}
          </p>
          <p className="mt-4 text-xs text-gray-500">
             {format(new Date(article.createdAt), 'MMMM d, yyyy')}
          </p>
        </div>
      </div>
    </Link>
  );
}