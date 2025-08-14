import { ArticleForm } from "@/components/admin/article-form";
import { getArticleBySlug, getCategories } from "@/lib/data";
import { notFound } from "next/navigation";

// Note: Using slug for lookup for simplicity. In a real app, ID would be better.
export default async function EditArticlePage({ params }: { params: { id: string } }) {
    // In a real app, you would fetch by ID. Here we find by ID from the mock data.
    const article = (await getArticleBySlug(params.id)); // Using slug as ID for mock
    const categories = await getCategories();

    if (!article) {
        notFound();
    }

    return <ArticleForm article={article} categories={categories} />;
}
