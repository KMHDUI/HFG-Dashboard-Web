import Image from 'next/image'
import Link from 'next/link';
import ImageCover from '@/assets/imagecover.png'
import HeaderPengumpulan from '@/components/HeaderPengumpulan/layout';
import DropInput from '@/components/DropInput/layout';
import Button from '@/components/Button/layout';

export default function Submition() {
  return (
    <>
        <HeaderPengumpulan />
        <div className='p-10 md:p-24 xl:p-32'>
            <Link href={'/'} className=''>Dashboard</Link>

            {/* SUBMITION */}
            <div>
                <DropInput/>
                <div className="flex items-center mt-10">
                    <input id="link-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                    <label className="ml-2 ">Saya menyetujui bahwa yang saya kumpulkan merupakan hasil dan pengerjaan saya sendiri</label>
                </div>

                <p className='mt-10'>Hal yang perlu diperhatikan:</p>
                <ul className='ml-2'>
                    <li>1. Pendaftaran tidak dianggap terjadi sebelum proses pembayaran dilakukan.</li>
                    <li>2. Proses pembayaran akan dilakukan ketika klik tombol submit.</li>
                    <li>3. Yang memberi centang dibawah ini telah membaca dan membaca SYARAT DAN KETENTUAN LOMBA Essai 17 HINDU FOR GENERATION yang telah diinformasikan oleh panitia.</li>
                </ul>

                {/* <Button name={'Submit'} className={'w-full  mt-16 '}/> */}
            </div>
        </div>
    </>
  )
}
