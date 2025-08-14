export type Category = {
  id: string;
  name: string;
  slug: string;
};

export type Comment = {
  id: string;
  author: string;
  content: string;
  createdAt: string;
  articleId: string;
};

export type Article = {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  imageUrl: string;
  status: "Published" | "Draft";
  createdAt: string;
  category: Category;
  tags: string[];
  comments: Comment[];
};
