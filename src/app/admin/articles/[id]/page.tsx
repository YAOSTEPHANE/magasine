"use client";

import { useParams } from "next/navigation";
import { CmsArticleEditor } from "@/components/admin/cms/CmsArticleEditor";

export default function EditArticlePage() {
  const params = useParams();
  const id = params.id as string;

  return <CmsArticleEditor mode="edit" articleId={id} />;
}
