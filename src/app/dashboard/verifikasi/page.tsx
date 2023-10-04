"use client";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer/layout";
import logoutIcon from "@/assets/logout.svg";
import Cover from "@/assets/image-1.png";
import ImageBack from "@/assets/back.svg";
import InputCustom from "@/components/Input/layout";
import Button from "@/components/Button/layout";
import DropInput from "@/components/DropInput/layout";
import { Select, Option, Input } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import uploadHandler from "@/utils/uploudHandler";

type responeseUser = {
  college: String;
  email: String;
  fullname: String;
  nickname: String;
  phone: String;
  status: String;
};

export default function Verifikasi() {
  const [data, setData] = useState<responeseUser>();
  const [jurusan, setJurusan] = useState<String>();
  const [angkatan, setAngkatan] = useState<Number>();
  const [tanggalLahir, setTanggalLahir] = useState<String>();
  const [KTM, setKTM] = useState<String>();
  const [selectedFilesKTM, setSelectedFilesKTM] = useState<File | null>(null);
  const [selectedFilesHaloBelanja, setSelectedFilesHaloBelanja] =
    useState<File | null>(null);
  const [isLoading, setIslLoading] = useState<boolean>(false);
  const [done, setDone] = useState<boolean>(false);

  let router = useRouter();

  useEffect(() => {
    let config = {
      headers: {
        Authorization: "Bearer " + getCookie("token"),
      },
    };
    axios
      .get(
        `https://api-hfg-3s5y7jj3ma-as.a.run.app/api/v1/user/profile`,
        config
      )
      .then((res) => {
        setData(res.data.data);
      });
  }, []);

  const uploudFile = (file: File, folderName: string) => {
    const data = uploadHandler(file, folderName);
    return data;
  };

  const handleVerifikasi = async () => {
    setIslLoading(!isLoading);
    let config = {
      headers: {
        Authorization: "Bearer " + getCookie("token"),
      },
    };

    if (
      selectedFilesKTM != null &&
      selectedFilesHaloBelanja != null &&
      angkatan != null &&
      tanggalLahir != null
    ) {
      const linkKTM = await uploudFile(selectedFilesKTM, "KTM");
      const linkHaloBelanja = await uploudFile(
        selectedFilesHaloBelanja,
        "AppHaloBelanja"
      );
      setDone(!done);
      if (linkKTM.success == true && linkHaloBelanja.success == true) {
        axios
          .post(
            "https://api-hfg-3s5y7jj3ma-as.a.run.app/api/v1/user/verification",
            {
              major: jurusan,
              batch: Number(angkatan),
              bod: tanggalLahir,
              sn: KTM,
              snUrl: linkKTM.url,
              haloBelanjaUrl: linkHaloBelanja.url,
            },
            {
              headers: {
                Authorization: "Bearer " + getCookie("token"),
              },
            }
          )
          .then((ress: any) => {
            console.log(ress);
            setIslLoading(!isLoading);
            router.push("/dashboard");
          })
          .catch((ee) => {
            router.push("/dashboard");
          });
      } else {
        router.push("/dashboard");
      }
    }
  };

  function loadingAnimation() {
    return (
      <div className="fixed w-screen h-screen bg-black bg-opacity-50 top-0 left-0 right-0 z-50 p-4 w-screen h-screen flex justify-center items-center">
        {done ? (
          <div></div>
        ) : (
          <div className=" relative bg-white drop-shadow-md rounded-xl overflow-hidden p-10">
            <div role="status" className="flex flex-col  items-center">
              <svg
                aria-hidden="true"
                className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <p className="mt-10">Mohon Tunggu</p>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="w-screen">
      {isLoading ? loadingAnimation() : <></>}
      <section
        className="w-full
                flex flex-col md:flex-row
                "
      >
        <section className="relative overflow-hidden">
          <div className="h-full w-auto absolute z-0">
            <Image
              className="object-cover w-full h-auto md:h-full md:w-auto"
              src={Cover}
              alt="cover"
            ></Image>
            <div className="absolute w-full h-full bg-black opacity-30"></div>
          </div>
          <Link
            className="p-16 relative z-1 text-white flex gap-5"
            href={"/dashboard"}
          >
            <Image
              src={ImageBack}
              alt="back-icon"
              className="h-[16px] w-auto self-center"
            />
            <p>Dashboard</p>
          </Link>
        </section>

        <form className="flex flex-col gap-3 p-10 md:p-20 w-full">
          <h1 className="font-bold text-3xl my-2 text-center">
            Form Verifikasi
          </h1>
          {/* <div className="text-center py-4 lg:px-4">
                    <div className="p-2 bg-[#CD1900] items-center text-white leading-none lg:rounded-full flex lg:inline-flex" role="alert">
                        <span className="flex rounded-full bg-[#FFB21E] uppercase px-2 py-1 text-xs font-bold mr-3">Alert</span>
                        <span className="font-semibold mr-2 text-left flex-auto">Untuk Saat ini sistem belum dapat menerima verifikasi anda</span>
                    </div>
                </div> */}
          <div className="flex flex-col gap-4 ">
            <span className="grid grid-cols-3">
              <p className="">Nama Lengkap</p>
              <span className="flex gap-2 col-span-2">
                <p>:</p>
                <p>{data?.fullname}</p>
              </span>
            </span>
            <span className="grid grid-cols-3">
              <p>Nomor Handphone</p>
              <span className="flex gap-2 col-span-2">
                <p>:</p>
                <p>{data?.phone}</p>
              </span>
            </span>
            <span className="grid grid-cols-3">
              <p>Alamat Email</p>
              <span className="flex gap-2 col-span-2">
                <p>:</p>
                <p>{data?.email}</p>
              </span>
            </span>
            <span className="grid grid-cols-3">
              <p>Status Pendidikan</p>
              <span className="flex gap-2 col-span-2">
                <p>:</p>
                <p>{data?.status}</p>
              </span>
            </span>
            <span className="grid grid-cols-3">
              <p>Asal Pendidikan</p>
              <span className="flex gap-2 col-span-2">
                <p>:</p>
                <p>{data?.college}</p>
              </span>
            </span>
            <span className="grid grid-cols-3 items-center">
              <p>Jurusan</p>
              <span className="flex gap-2 items-center col-span-2">
                <p>:</p>
                <InputCustom
                  typeInput="text"
                  className=""
                  onChange={setJurusan}
                />
              </span>
            </span>
            <span className="grid grid-cols-3 items-center">
              <p>Angkatan</p>
              <span className="flex gap-2 items-center col-span-2">
                <p>:</p>
                <InputCustom
                  typeInput="number"
                  className=""
                  onChange={setAngkatan}
                />
              </span>
            </span>
            <span className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="grid content-between h-full">
                <p>Tanggal Lahir (yyyy-mm-dd)</p>
                <InputCustom
                  typeInput="text"
                  className=""
                  onChange={setTanggalLahir}
                />
              </div>
              <div className="content-between">
                <p>Nomor Kartu Tanda Mahasiswa/Pelajar</p>
                <InputCustom
                  typeInput="number"
                  className=""
                  onChange={setKTM}
                />
              </div>
            </span>
          </div>
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-10 mt-10">
            <div>
              <div className="mt-4">
                <p>Uploud File KTM</p>
                <DropInput
                  selectedFiles={selectedFilesKTM}
                  setSelectedFiles={setSelectedFilesKTM}
                ></DropInput>
              </div>
            </div>

            <div>
              <div className="mt-4">
                <p>Uploud File Screenshot Aplikasi Halo Belanja</p>
                <DropInput
                  selectedFiles={selectedFilesHaloBelanja}
                  setSelectedFiles={setSelectedFilesHaloBelanja}
                ></DropInput>
              </div>
            </div>
          </div>

          <Button
            name="Submit"
            className="mx-0 md:mx-28 mt-6"
            onClickFunction={handleVerifikasi}
          />
        </form>
      </section>
      <Footer />
    </div>
  );
}
