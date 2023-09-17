'use client';
import Image from 'next/image'
import Link from 'next/link';
import Footer from '@/components/Footer/layout'
import logoutIcon from "@/assets/logout.svg";
import Cover from "@/assets/image-1.png"
import Input from '@/components/Input/layout';
import Button from '@/components/Button/layout';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { setCookie } from 'cookies-next';
import AccessDeniedIcon from '@/assets/errorr.svg'
import axios from 'axios';

import HeaderPengumpulan from '@/components/HeaderPengumpulan/layout';

export default function Esai() {
  return (
    <main className='w-screen'>
        <section className='min-h-screen'>
            <HeaderPengumpulan HeaderName={"Guidebook Esai HFG 17th"}></HeaderPengumpulan>
            <div className=''>
                <iframe className='w-full h-screen' src='Guidebook_Lomba_Esai.pdf'> </iframe>
            </div>
        </section>
    <Footer/>
    </main>
  )
}
