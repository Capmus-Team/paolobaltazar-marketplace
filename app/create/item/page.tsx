"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { supabase } from "@/lib/supabase"
import { Upload } from "lucide-react"
import Image from "next/image"

const categories = [
  "Vehicles",
  "Property Rentals",
  "Apparel",
  "Electronics",
  "Toys & Games",
  "Sporting Goods",
  "Garden & Outdoor",
]

export default function CreateItemPage() {
  const [file, setFile] = useState<File | null>(null)
  const [imgPreview, setImgPreview] = useState<string>("")
  const [title, setTitle] = useState("")
  const [price, setPrice] = useState("")
  const [email, setEmail] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState(categories[0])
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState("")
  const [error, setError] = useState("")
  const [location, setLocation] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setSuccess("")
    setError("")
    if (!file || !title.trim() || !price.trim() || !email.trim() || !category.trim() || !location.trim() || !description.trim()) {
      setError("All fields are required.")
      setLoading(false)
      return
    }
    let imgUrl = ""
    if (file) {
      const fileExt = file.name.split('.').pop()
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${fileExt}`
      const { error: uploadError } = await supabase.storage.from('listing-images').upload(fileName, file)
      if (uploadError) {
        setError("Failed to upload image.")
        setLoading(false)
        return
      }
      const { data: publicUrlData } = supabase.storage.from('listing-images').getPublicUrl(fileName)
      imgUrl = publicUrlData.publicUrl
    }
    const { error: insertError } = await supabase.from("listings").insert([
      { img: imgUrl, title, price: Number(price), email, description, category, location }
    ])
    setLoading(false)
    if (insertError) {
      setError("Failed to create listing.")
    } else {
      setSuccess("Listing created!")
      setFile(null)
      setImgPreview("")
      setTitle("")
      setPrice("")
      setEmail("")
      setDescription("")
      setCategory(categories[0])
      setLocation("")
      if (fileInputRef.current) fileInputRef.current.value = ""
    }
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0]
    setFile(f || null)
    if (f) {
      const reader = new FileReader()
      reader.onload = (ev) => {
        setImgPreview(ev.target?.result as string)
      }
      reader.readAsDataURL(f)
    } else {
      setImgPreview("")
    }
  }

  return (
    <div className="flex justify-center p-8">
      <form onSubmit={handleSubmit} className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <label
            htmlFor="file-upload"
            className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition hover:bg-gray-50"
            style={{ minHeight: 180 }}
          >
            <Upload className="w-12 h-12 text-gray-400 mx-auto" />
            <span className="mt-2 text-gray-600">
              {file ? file.name : "Choose File No file chosen"}
            </span>
            <input
              id="file-upload"
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input id="title" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="price">Price</Label>
              <Input id="price" placeholder="Price" type="number" value={price} onChange={e => setPrice(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" placeholder="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="category">Category</Label>
              <select
                id="category"
                className="w-full border rounded px-3 py-2"
                value={category}
                onChange={e => setCategory(e.target.value)}
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div>
              <Label htmlFor="location">Location</Label>
              <Input id="location" placeholder="Location" value={location} onChange={e => setLocation(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
            </div>
          </div>
          <Button className="w-full" type="submit" disabled={loading}>{loading ? "Creating..." : "Create Listing"}</Button>
          {success && <p className="text-green-600 text-center">{success}</p>}
          {error && <p className="text-red-600 text-center">{error}</p>}
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">Preview</h2>
          <div className="aspect-square bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
            {imgPreview ? <Image src={imgPreview} alt="Preview" width={400} height={400} className="object-cover h-full w-full rounded-lg" /> : <span className="text-gray-400">Image preview</span>}
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">{title || "Title"}</h3>
            <p className="text-2xl font-bold">{price ? `$${price}` : "Price"}</p>
            <div>
              <h4 className="font-semibold">Seller Email</h4>
              <p>{email || "Email"}</p>
            </div>
            <p className="text-sm text-gray-500">{description || "Description"}</p>
            <p className="text-sm text-gray-500">{location || "Location"}</p>
            <p className="text-sm text-gray-500">{category}</p>
          </div>
        </div>
      </form>
    </div>
  )
} 