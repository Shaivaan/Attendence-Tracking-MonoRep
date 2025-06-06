import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const routes = {
  home : '/',
  mark : '/mark',
  history : '/history'
};

export const base_url = import.meta.env.VITE_API_BASEURL;

export const endpoints = {
  form : 'entry',
  dashboard : 'entry/dashboard',
  history : 'entry/history'
}

export const multipartHeader = {
      'Content-Type': 'multipart/form-data'
    }


export const getFormData = (value : FormInitValueType)=>{
    const form = new FormData();
    const {email,name,photo} = value ;
    form.append('email',email as string);
    form.append('name',name as string);
    form.append('photo',photo as unknown as Blob);
    return form;
}