"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { CartesianGrid, Line, LineChart, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartConfig = {
  persen_hadir: {
    label: "Persentase Hadir",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

export function StatistikItikaf() {
  const [chartData, setChartData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("https://api.shollu.com/api/statistics-event-all")
        setChartData(
          response.data.map((item: any) => ({
            date: item.date,
            persen_hadir: item.persen_hadir,
            total_hadir: item.total_hadir,
          }))
        )
      } catch (error) {
        console.error("Error fetching attendance data:", error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchData()
    const interval = setInterval(fetchData, 8000)
    return () => clearInterval(interval)
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Statistik Kehadiran Smart I'Tikaf</CardTitle>
        <CardDescription>Persentase Kehadiran per Hari</CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <ChartContainer config={chartConfig}>
            <LineChart
              accessibilityLayer
              data={chartData}
              margin={{ left: 12, right: 12 }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.substring(5)}
              />
              <ChartTooltip
                cursor={false}
                content={({ payload }: any) => (
                  <div className="bg-white px-2 py-2">
                      <p className="font-bold">{`Tanggal: ${payload[0]?.payload.date}`}</p>
                      <p className="font-bold">{`Persentase Hadir: ${payload[0]?.payload.persen_hadir.toFixed(2)} %`}</p>
                      <p className="font-bold">{`Total Hadir: ${payload[0]?.payload.total_hadir}`} Orang</p>
                  </div>
                )}
              />
              <Line
                dataKey="persen_hadir"
                type="natural"
                stroke="var(--color-persen_hadir)"
                strokeWidth={2}
                dot={{ fill: "var(--color-persen_hadir)" }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  )
}