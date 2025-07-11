export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          first_name: string
          last_name: string
          email: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          first_name: string
          last_name: string
          email: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          first_name?: string
          last_name?: string
          email?: string
          created_at?: string
          updated_at?: string
        }
      }
      listings: {
        Row: {
          id: string
          img: string
          title: string
          price: number
          email: string
          description: string
          created_at: string
          category: string
          location: string
        }
        Insert: {
          id?: string
          img: string
          title: string
          price: number
          email: string
          description: string
          created_at?: string
          category: string
          location: string
        }
        Update: {
          id?: string
          img?: string
          title?: string
          price?: number
          email?: string
          description?: string
          created_at?: string
          category?: string
          location?: string
        }
      }
    }
  }
}
