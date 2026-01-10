"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { PlusCircle, Upload } from "lucide-react"

export function DialogDemo() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="w-full md:w-auto gap-2 hover:bg-accent/50 transition-colors">
          <span className="md:hidden lg:inline">Login</span>
          <span className="hidden md:inline lg:hidden">Login</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <PlusCircle className="h-5 w-5" />
            Post New Advertisement
          </DialogTitle>
          <DialogDescription>
            Create a new listing to sell your item. Fill in the details below and upload photos.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right font-medium">
              Title
            </Label>
            <Input
              id="title"
              placeholder="Enter product title..."
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="price" className="text-right font-medium">
              Price
            </Label>
            <Input
              id="price"
              type="number"
              placeholder="0.00"
              className="col-span-3"
            />
          </div>
        
          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline">Cancel</Button>
            <Button>Post Advertisement</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}