import { ColumnsType } from '@/components';

import { Article } from '@/types';

export interface IAdminArticlesTableProps {
  columns: ColumnsType;
  data: Article[];
  handleDeleteArticle: (articleId: string) => void;
}
