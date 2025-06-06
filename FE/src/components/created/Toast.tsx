"use client"

import { toast } from "sonner"

const toastDefaultDuration = 1500;
interface ShowToastType{
    message : string,
    variant? : 'success' | 'error' | 'info'
    duration? : number
}
export function useToast() {

  const showToast = ({variant='success',message,duration=toastDefaultDuration}:ShowToastType)=> toast[variant](message,{duration,position:'top-right'})

  return {showToast}
}
