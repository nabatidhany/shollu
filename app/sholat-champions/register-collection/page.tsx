'use client'

import React, { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { format, isValid, parseISO } from 'date-fns'
import { id } from 'date-fns/locale'
import { useRouter } from 'next/navigation'

interface Summaries {
  subuh?: number
  dzuhur?: number
  ashar?: number
  maghrib?: number
  isya?: number
}

interface Collection {
  id: number
  name: string
  slug: string
  start_date: string
  end_date: string
  summaries?: Summaries
}

export default function CollectionList() {
  const [collections, setCollections] = useState<Collection[]>([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const fetchCollections = async () => {
      setLoading(true)
      try {
        const res = await fetch(`https://api.shollu.com/api/v1/collections-get?search=${search}`)
        const data = await res.json()
        setCollections(data.collections || [])
      } catch (error) {
        console.error('Failed to fetch collections:', error)
      }
      setLoading(false)
    }

    const debounce = setTimeout(() => {
      fetchCollections()
    }, 500)

    return () => clearTimeout(debounce)
  }, [search])

  return (
    <section className="mt-20 w-full py-10">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2">Koleksi Event yang tersedia</h2>
          <Input
            placeholder="Cari koleksi..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white"
          />
        </div>

        {loading ? (
          <p>Memuat data koleksi...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-6">
            {collections.map((collection) => {
              const start = parseISO(collection.start_date)
              const end = parseISO(collection.end_date)

              const startDateStr = isValid(start)
                ? format(start, 'd MMMM yyyy', { locale: id })
                : 'Tanggal mulai tidak valid'
              const endDateStr = isValid(end)
                ? format(end, 'd MMMM yyyy', { locale: id })
                : 'Tanggal selesai tidak valid'

              return (
                <div
                  key={collection.id}
                  className="transition-transform duration-200 hover:scale-105 cursor-pointer"
                  onClick={() => router.push(`/sholat-champions/register-collection/${collection.slug}`)}
                >
                  <Card className="h-full">
                    <CardHeader>
                      <CardTitle>{collection.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm text-muted-foreground space-y-1">
                      <p>
                        {startDateStr} - {endDateStr}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              )
            })}
            {collections.length === 0 && (
              <p className="col-span-full text-muted-foreground">Tidak ada koleksi ditemukan.</p>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
