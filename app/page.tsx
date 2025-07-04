import { ListingCard } from '@/components/ListingCard'
import { supabase } from '@/lib/supabase'

export default async function Home() {
  const { data: listings, error } = await supabase
    .from('listings')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div className="flex min-h-screen">
      <main className="flex-1 p-8 bg-gray-50">
        <h1 className="text-3xl font-bold mb-8">Today's picks</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {error && <p className="col-span-full text-center text-red-500">Failed to load listings.</p>}
          {listings && listings.length === 0 && (
            <p className="col-span-full text-center text-gray-500">No items listed yet.</p>
          )}
          {listings && listings.map(listing => (
            <ListingCard key={listing.id} listing={{
              id: listing.id,
              title: listing.title,
              price: listing.price,
              location: listing.location || '',
              imageUrl: listing.img,
              category: listing.category || '',
            }} />
          ))}
        </div>
      </main>
    </div>
  )
}
