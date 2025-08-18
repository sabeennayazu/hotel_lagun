export interface RoomType {
  id: number;
  name: string;
  description: string;
  max_adults: number;
  price: number;
  total_price: number;
  category: { name: string };
  bed_type: { name: string | null };
  image?: string;
}
