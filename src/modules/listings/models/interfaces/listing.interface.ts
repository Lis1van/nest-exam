export interface Listing {
  id: string;
  title: string;
  description: string;
  status: 'active' | 'review' | 'archived';
  userId: string;
}
