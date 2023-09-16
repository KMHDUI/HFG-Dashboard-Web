'use client';
import Image from 'next/image'
import Link from 'next/link';
import ImageCover from '@/assets/imagecover.png'
import {Philosopher } from 'next/font/google'
import { useState, useRef, ChangeEvent, Dispatch, SetStateAction } from 'react';
import axios from 'axios';

const philosopher = Philosopher({ 
    weight: ['400', '700'],
    style:['normal', 'italic'],
    subsets:['latin'],
    display:'swap'
      
    });

type InputTypeDropZone = {
  selectedFiles : File | null,
  setSelectedFiles: Dispatch<SetStateAction<File | null>>
}

export default function DropInput(props: InputTypeDropZone){

    // const [selectedFiles, setSelectedFiles] = useState<File | null>(null);

    const inputRef = useRef<HTMLInputElement | null>(null);

    const removeFileHandler = (e: any) => {
      e.preventDefault();
      // setSelectedFiles(null);
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    };

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files;
      if (files) {
        const file = files[0];
        if (file) {
          props.setSelectedFiles(file);
          return;
        }
      }
      props.setSelectedFiles(null);
    };
  
    function NotValue(){
        return  <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
            </svg>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG, and PDF (MAX. 3Mb)</p>
    </div>
    }

  return (
    <div className="flex items-center justify-center w-full mt-5">
        <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
            {props.selectedFiles ? <p>{props.selectedFiles.name}</p> : NotValue()}
            <input 
                id="dropzone-file" 
                type="file" 
                className="hidden" 
                accept='image/jpeg, image/png, application/pdf'
                onChange={handleFileChange}
                />
        </label>
    </div> 
  )
}
