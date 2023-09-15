'use client'
import Image from 'next/image'
import Link from 'next/link';
import ImageCover from '@/assets/imagecover.png'
import HeaderPengumpulan from '@/components/HeaderPengumpulan/layout';
import DropInput from '@/components/DropInput/layout';
import Button from '@/components/Button/layout';
import { useEffect, useState } from 'react';
import { getCookie } from 'cookies-next';
import uploadHandler from '@/utils/uploudHandler';
import BackGrey from '@/assets/back_grey.svg'


import axios from 'axios';
type submision= {
    id: String,
    submission_status: String,
    competition_name: String,
    competition_using_submission : boolean,
    url: String | null,
}

export default function Submition({ params }: { params: { id: string }}) {
    const [data, setData] = useState<submision>();   
    const [selectedFiles, setSelectedFiles] = useState<File | null>(null);
    const [agree, setAgree] = useState<boolean>(false);
    const [URL, setURL] = useState<String | null>(null);

    const config = {
        headers: {
        'Authorization': 'Bearer ' + getCookie('token')
        }
    }

    useEffect(() => {
        const url = `https://api-hfg-3s5y7jj3ma-as.a.run.app/api/v1/competition/${params.id}`
        
        axios.get(url, config).then(
            (response) => {
                if(response.status == 200){
                    const res = response.data.data
                    setData({
                        id: res.id,
                        submission_status: res.submission_status,
                        competition_name: res.competition_name,
                        competition_using_submission : res.competition_using_submission,
                        url: res.url,
                    })
                }else{
                    // PUSH TO 404
                }
            }
        ).catch(
            () => {
                // router push
            }
        )

    }, [])

    const uploudFile = (file : File, folderName: string) => {
        const data =  uploadHandler(file, folderName);
        return data
    }

    const handleSubmission = async () => {
        if(agree && selectedFiles != null){
            const urlSubmission = await uploudFile(selectedFiles, `Submision${data?.competition_name}`);
            setURL(urlSubmission.url)
            console.log(URL)
            axios.post('https://api-hfg-3s5y7jj3ma-as.a.run.app/api/v1/competition/submit',{
                    code: data?.id,
                    url: URL
            }, config).then(() => {
                // PUSH DETAIL BACK
            }).catch()
        }
    }
  return (
    <>
        <HeaderPengumpulan HeaderName={`Pengumpulan Lomba ${data?.competition_name}`} />
        <div className='p-10 md:p-24 xl:p-32'>
            <Link href={`/dashboard/detail/${params.id}`} className='flex gap-3'>
                <Image src={BackGrey} alt='img' ></Image>
                <p className='font-semibold text-[#687590]'>Detail</p>
            </Link>
            <div>
                {data?.submission_status == "Submitted" ? <></> :<DropInput selectedFiles={selectedFiles} setSelectedFiles={setSelectedFiles}></DropInput>}
                <div className="flex items-center mt-10">
                    {data?.submission_status == "Submitted" ? <input checked disabled id="link-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" /> :                     <input id="link-checkbox" type="checkbox" onClick={() => setAgree(!agree)} value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />}
                    <label className="ml-2 ">Saya menyetujui bahwa yang saya kumpulkan merupakan hasil dan pengerjaan saya sendiri</label>
                </div>

                <p className='mt-10'>Hal yang perlu diperhatikan:</p>
                <ul className='ml-2'>
                    <li>1. Pendaftaran tidak dianggap terjadi sebelum proses pembayaran dilakukan.</li>
                    <li>2. Proses pembayaran akan dilakukan ketika klik tombol submit.</li>
                    <li>3. Yang memberi centang dibawah ini telah membaca dan membaca SYARAT DAN KETENTUAN LOMBA Essai 17 Hindu For Generation yang telah diinformasikan oleh panitia.</li>
                </ul>
                {agree ? <Button name={'Submit'} className={'w-full  mt-16 '} onClickFunction={handleSubmission}/> : <></>}
            </div>
        </div>
    </>
  )
}
