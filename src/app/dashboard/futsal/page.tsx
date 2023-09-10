import Image from 'next/image'
import Link from 'next/link';
import ImageCover from '@/assets/imagecover.png'
import HeaderPengumpulan from '@/components/HeaderPengumpulan/layout';

export default function Futsal() {
  return (
    <>
        {/* INI MERUPAKAN REGIS FUTSAL MANAGE */}
        <HeaderPengumpulan />
        <div className='grid'>
            <div>
                <div>
                    <p>Institution Code</p>
                    
                </div>
                <div>
            
                </div>
            </div>
            <div>
                <h3>Data Diri Official</h3>
                <div>
                    <p>Nama Lengkap</p>
                    <p>: I Made Urip Subagyo</p>
                </div>
                <div>
                    <p>Tanggal Lahir</p>
                    <p>: 13 November 2002</p>
                </div>
                <div>
                    <p>Email</p>
                    <p>: hfg@kmhdui.com</p>
                </div>
                <div>
                    <p>Nomor Handphone</p>
                    <p>: 06222</p>
                </div>
                <div>
                    <p>Jurusan</p>
                    <p>: Computer Science</p>
                </div>
                <div>
                    <p>Angkatan</p>
                    <p>: XXiwie</p>
                </div>
            </div>
        </div>
        
    </>
  )
}
