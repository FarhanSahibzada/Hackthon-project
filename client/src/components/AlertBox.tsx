import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
  } from "@/components/ui/alert-dialog"
import React from "react"

  interface alertBoxProps {
    title : string,
    description : string,
    isopen : boolean,
    setIsOpen : React.Dispatch<React.SetStateAction<boolean>>

  }
export default function AlertBox({isopen , setIsOpen , title , description} : alertBoxProps) {
  return (
    <AlertDialog open={isopen}  onOpenChange={setIsOpen}>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>{title}</AlertDialogTitle>
      <AlertDialogDescription>
        {description}
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel onClick={()=> setIsOpen(false) }>Done</AlertDialogCancel>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>

  )
}
