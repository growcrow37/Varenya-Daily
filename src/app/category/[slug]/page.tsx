import { ArticleCard } from "@/components/article-card";
import { getArticlesByCategory, getCategoryBySlug } from "@/lib/data";
import { notFound } from "next/navigation";

type CategoryPageProps = {
  params: {
    slug: string;
  };
};

export default async function CategoryPage({ params }: CategoryPageProps) {
  const category = await getCategoryBySlug(params.slug);
  if (!category) {
    notFound();
  }

  const articles = await getArticlesByCategory(params.slug);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 border-b border-border pb-4">
        <h1 className="font-headline text-4xl font-bold text-primary">
          Category
        </h1>
        <p className="mt-1 text-5xl font-extrabold text-foreground font-headline">{category.name}</p>
      </div>

      {articles.length > 0 ? (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <h2 className="text-2xl font-semibold">No Articles Found</h2>
          <p className="mt-2 text-muted-foreground">
            There are no articles in the "{category.name}" category yet.
          </p>
        </div>
      )}
    </div>
  );
}
