export interface Page {
  id: number;
  title: string;
  slug: string;
  content: any[];
  parentPage?: Page;  // The parent page (optional)
}

export interface PageResponse {
  data: Page[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}
