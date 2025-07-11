import { User } from '@supabase/supabase-js'

export type UserWithMetadata = User & {
  user_metadata: {
    first_name: string
    last_name: string
  }
}
