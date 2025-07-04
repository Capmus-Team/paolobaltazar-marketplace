import { Card, CardContent, CardFooter } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"

export type Listing = {
  id: string
  title: string
  price: number
  location: string
  imageUrl: string
  category: string
}

export function ListingCard({ listing }: { listing: Listing }) {
  return (
    <Link href={`/item/${listing.id}`}>
      <Card className="overflow-hidden p-0 gap-0">
        <div className="aspect-square relative w-full">
          <Image 
            src={listing.imageUrl} 
            alt={listing.title} 
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
            className="object-cover rounded-t-lg"
          />
        </div>
        <CardFooter className="p-4 flex-col items-start">
          <p className="text-xl font-semibold">${listing.price.toLocaleString()}</p>
          <p>{listing.title}</p>
          <p>{listing.location}</p>
        </CardFooter>
      </Card>
    </Link>
  )
} 