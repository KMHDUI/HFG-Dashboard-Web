import Image from 'next/image'
import Link from 'next/link';

import Cover from "@/assets/imagecover.png";
import InstagramIcon from "@/assets/Instagram.svg"
import LinkedInIcon from "@/assets/Linkedin.svg"
import LocationIcon from "@/assets/map_location.svg"
import MailIcon from "@/assets/email.svg"
import PhoneIcon from "@/assets/phone.svg"
import ArrowIcon from "@/assets/arrow.svg"

export default function Footer() {
  return (
    <>
    <section className="min-h-[200px] w-screen bg-cover relative">
        <div className='absolute overflow-hidden w-full h-full '>
            <Image className="absolute bottom-[-80px] z-0 w-full h-auto scale-[2.5] md:scale-100" src={Cover} alt='image-background'/>
            <div className='absolute w-full h-full bg-black opacity-30'></div>
        </div>
        <div className='grid md:grid-cols-3 relative z-1 p-16 md:p-20 text-white'>
            <div>
                <h1 className='text-2xl font-bold'>Hindu For Generation 17</h1>
                <h3 className='font-light'>Revival Ignites Passion</h3>
                <div className='flex gap-5 mt-4'>
                    <Link href={'https://www.instagram.com/hfg_ui/'}><Image  src={InstagramIcon} alt='icon-intagram'/></Link>
                    <Image  src={LinkedInIcon} alt='icon-linkedin'/>
                </div>
            </div>
            <div className='mt-8 md:mt-0'>
                <h3 className='font-bold'>Links</h3>
                <div className='mt-3 flex flex-col gap-3 font-light	'>
                    <Link href={''}>Home</Link>
                    <Link href={''}>About</Link>
                    <Link href={''}>Competition</Link>
                    <Link href={''}>Galery</Link>
                    <Link href={''}>Sponsorship</Link>
                    <Link href={''} className='bg-white rounded-full w-max px-3 p-1 flex gap-2'>
                        <p className='text-[#064C72]'>Donation</p>
                        <Image src={ArrowIcon} alt='direct-icon'/>
                    </Link>
                </div>
            </div>
            <div className='mt-8 md:mt-0 flex flex-col gap-3'>
                <h3 className='font-bold'>Contact</h3>
                <span className='flex gap-4'>
                    <Image className='self-start' src={LocationIcon} alt='location-icon'/>
                    <p>Sekretariat KMHD UI,<br/>Pusgiwa Universitas Indonesia, Depok, Jawa Barat</p>
                </span>
                <span className='flex gap-4'>
                    <Image src={MailIcon} alt='location-icon'/>
                    <p>hfg@kmhdui.com</p>
                </span>
                <span className='flex w-full gap-4'>
                    <Image className='self-start' src={PhoneIcon} alt='location-icon'/>
                    <div className='grid cols-span-2 w-full'>
                        <div>
                            <p className='font-semibold'>Nesya</p>
                            <p>0895 1863 0890</p>
                        </div>
                        <div>
                            <p className='font-semibold'>Essa</p>
                            <p>0895 3230 22259</p>
                        </div>
                    </div>
                </span>
            </div>
        </div>
        <div className='relative z-1 border-t-[1px]'>
             <p className='p-3 text-center text-white'>©2023 Hindu For Generation 17. All Rights Reserved</p>
        </div>
    </section>
    </>
  )
}
