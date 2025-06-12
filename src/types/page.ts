export interface PageSeo {
  metaTitle: string;
  metaDescription: string;
}

export interface Page {
  id: string;
  title: string;
  slug: string;
  content: string; // HTML content from a rich text editor
  seo: PageSeo;
  status: 'published' | 'draft';
  createdAt: string; // ISO 8601 date string
  updatedAt: string; // ISO 8601 date string
} 