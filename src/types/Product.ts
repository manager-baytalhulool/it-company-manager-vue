export interface Product {
  id: number
  name: string
  description: string | null
  demo_url: string | null
  download_url: string | null
  reviews_count: number
  average_rating: number
  created_at: string
  updated_at: string
}

export type ProductIndex = Pick<
  Product,
  'id' | 'name' | 'demo_url' | 'reviews_count' | 'average_rating'
>
