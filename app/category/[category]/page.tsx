/* eslint-disable */
import { ListingCard } from '@/components/ListingCard'
import { notFound } from 'next/navigation'
import { supabase } from '@/lib/supabase'

const validCategories = [
  'Vehicles',
  'Property Rentals',
  'Apparel',
  'Electronics',
  'Toys & Games',
  'Sporting Goods',
  'Garden & Outdoor',
]

function normalize(str: string) {
  return str.toLowerCase().replace(/&/g, 'and').replace(/\s+/g, '-')
}

interface PageProps {
  params: {
    category: string
  }
}

export async function generateStaticParams() {
  return validCategories.map((category) => ({
    category: normalize(category),
  }))
}

export default async function CategoryPage({ params }: any) {
  const { category } = params;
  const categoryName = validCategories.find(
    (cat) => normalize(cat) === category
  )
  if (!categoryName) return notFound()

  const { data: listings, error } = await supabase
    .from('listings')
    .select('*')
    .eq('category', categoryName)
    .order('created_at', { ascending: false })

  return (
    <div className="flex min-h-screen">
      <main className="flex-1 p-8 bg-gray-50">
        <h1 className="text-3xl font-bold mb-8">{categoryName}</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {error && <p className="col-span-full text-center text-red-500">Failed to load listings.</p>}
          {listings && listings.length === 0 && (
            <p className="col-span-full text-center text-gray-500">No items listed in this category.</p>
          )}
          {listings && listings.map(listing => (
            <ListingCard key={listing.id} listing={{
              id: listing.id,
              title: listing.title,
              price: listing.price,
              location: listing.location,
              imageUrl: listing.img,
              category: listing.category || '',
            }} />
          ))}
        </div>
      </main>
    </div>
  )
}
