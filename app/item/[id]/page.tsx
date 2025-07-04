import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import { supabase } from "@/lib/supabase"
import { notFound } from "next/navigation"
import { MessageForm } from "@/components/MessageForm"

export default async function ItemPage({ params }: { params: { id: string } }) {
  const { id } = params
  const { data: listing, error } = await supabase
    .from('listings')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !listing) return notFound()

  return (
    <div className="flex justify-center p-8">
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <div className="aspect-square relative bg-gray-100 rounded-lg overflow-hidden">
            {listing.img ? (
              <Image 
                src={listing.img}
                alt={listing.title}
                fill
                className="object-cover"
              />
            ) : (
              <span className="text-gray-400 flex items-center justify-center h-full w-full">No image</span>
            )}
          </div>
        </div>
        <div className="space-y-6">
          <div className="p-4 border rounded-lg">
            <h1 className="text-2xl font-bold">{listing.title}</h1>
            <p className="text-3xl font-bold mt-2">${listing.price}</p>
            <p className="text-sm text-gray-500 mt-2">
              Listed {listing.created_at ? new Date(listing.created_at).toLocaleString() : ''}
            </p>
            {listing.description && (
              <p className="mt-4 text-base text-gray-700 whitespace-pre-line">{listing.description}</p>
            )}
          </div>
          <div className="p-4 border rounded-lg">
            <h2 className="font-semibold">Seller Information</h2>
            <p>{listing.email}</p>
          </div>
          <div className="p-4 border rounded-lg">
            <h2 className="font-semibold mb-2">Send seller a message</h2>
            <MessageForm />
          </div>
        </div>
      </div>
    </div>
  )
} 