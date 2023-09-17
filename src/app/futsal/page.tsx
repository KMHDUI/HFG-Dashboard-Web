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

export default function Futsal() {
  return (
    <main className='w-screen'>
        <section className='min-h-screen'>
            <HeaderPengumpulan HeaderName={"RULEBOOK FUTSAL HFG 17th"}></HeaderPengumpulan>
            <div className=''>
                <iframe className='w-full h-screen' src='Regulasi_Futsal_HFG_17th.pdf'> </iframe>
            </div>
        </section>
    <Footer/>
    </main>
  )
}
