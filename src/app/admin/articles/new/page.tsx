import { CmsArticleEditor } from "@/components/admin/cms/CmsArticleEditor";
import { isArticleContentType, type ArticleContentType } from "@/lib/article-content-types";

interface PageProps {
  searchParams: Promise<{ type?: string }>;
}

export default async function NewArticlePage({ searchParams }: PageProps) {
  const { type } = await searchParams;
  const defaultContentType: ArticleContentType =
    type && isArticleContentType(type) ? type : "article";

  return <CmsArticleEditor mode="create" defaultContentType={defaultContentType} />;
}
