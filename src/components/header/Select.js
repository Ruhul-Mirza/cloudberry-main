"use client"

import * as React from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { LocationEditIcon } from "lucide-react"

export function SelectDemo() {
  const locations = [
  { value: "all", label: "All Locations" },
  { value: "hyderabad", label: "Hyderabad" },
  { value: "up", label: "Uttar Pradesh" },
  { value: "mp", label: "Madhya Pradesh" },
  { value: "maharashtra", label: "Maharashtra" },
]


  return (
    <Select defaultValue="all">
      <SelectTrigger className="w-full md:w-[160px] bg-background/50 backdrop-blur-sm hover:bg-accent/50 transition-colors">
        <LocationEditIcon/>
        <SelectValue placeholder="Select category" />
      </SelectTrigger>
      <SelectContent>
        {locations.map((location) => (
          <SelectItem key={location.value} value={location.value}>
            <div className="flex items-center justify-between w-full">
              <span>{location.label}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}