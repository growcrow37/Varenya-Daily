import { AdPlaceholder } from "@/components/ad-placeholder";
import { ArticleCard } from "@/components/article-card";
import { Button } from "@/components/ui/button";
import { getArticles } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default async function Home() {
  const articles = await getArticles();
  const featuredArticle = articles[0];
  const recentArticles = articles.slice(1, 5);
  const importantArticles = articles.slice(5, 9);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <AdPlaceholder className="h-24 w-full" />
      </div>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Featured Article */}
          {featuredArticle && (
            <div className="mb-12">
              <Link href={`/articles/${featuredArticle.slug}`}>
                <div className="group relative block overflow-hidden rounded-lg bg-card shadow-lg">
                  <Image
                    src={featuredArticle.imageUrl}
                    alt={featuredArticle.title}
                    width={800}
                    height={450}
                    priority
                    data-ai-hint="news article"
                    className="w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  <div className="absolute bottom-0 w-full p-6 text-white md:p-8">
                    <span className="mb-2 inline-block rounded-full bg-primary/80 px-3 py-1 text-sm font-semibold text-primary-foreground">
                      {featuredArticle.category.name}
                    </span>
                    <h1 className="font-headline text-3xl font-bold leading-tight md:text-4xl lg:text-5xl">
                      {featuredArticle.title}
                    </h1>
                    <p className="mt-2 hidden text-lg text-gray-300 md:block">
                      {featuredArticle.excerpt}
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          )}

          {/* Recent Articles */}
          <div>
            <h2 className="font-headline text-3xl font-bold">Recent News</h2>
            <div className="mt-6 grid grid-cols-1 gap-8 md:grid-cols-2">
              {recentArticles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <aside className="lg:col-span-1">
          <div className="sticky top-24">
            <div className="mb-8">
              <AdPlaceholder className="h-64 w-full" />
            </div>
            <div className="rounded-lg bg-card p-6 shadow-lg">
              <h3 className="font-headline text-2xl font-bold">
                Important Reads
              </h3>
              <ul className="mt-4 space-y-4">
                {importantArticles.map((article) => (
                  <li key={article.id} className="border-b border-border pb-4 last:border-b-0 last:pb-0">
                    <Link href={`/articles/${article.slug}`}>
                      <div className="group flex items-center space-x-4">
                        <div className="flex-grow">
                          <p className="text-sm text-muted-foreground">{article.category.name}</p>
                          <h4 className="font-semibold leading-tight group-hover:text-primary">
                            {article.title}
                          </h4>
                        </div>
                        <ArrowRight className="h-5 w-5 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1 group-hover:text-primary" />
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
