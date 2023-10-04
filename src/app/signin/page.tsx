"use client";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer/layout";
import Cover from "@/assets/image-1.png";
import Input from "@/components/Input/layout";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { setCookie } from "cookies-next";
import AccessDeniedIcon from "@/assets/errorr.svg";
import axios from "axios";

export default function SignIn() {
  const [email, setEmail] = useState<String>();
  const [password, setPassword] = useState<String>();
  const [invalid, setInvalid] = useState<boolean>(false);
  const [invalidMessage, _setInvalidMessage] = useState<String>("");
  let router = useRouter();

  const handleSignIn = async () => {
    await axios
      .post("https://api-hfg-3s5y7jj3ma-as.a.run.app/api/v1/user/login", {
        email: email,
        password: password,
      })
      .then((response) => {
        setCookie("token", response.data.token, { maxAge: 60 * 60 * 6 });
        localStorage.setItem("token", response.data.token);
        router.push("/dashboard");
      })
      .catch((_err: any) => {
        setInvalid(true);
      });
  };

  function modalPopUp() {
    return (
      <div className="fixed top-0 left-0 right-0 z-50 p-4 w-screen h-screen flex justify-center items-center">
        <div className=" relative bg-white drop-shadow-md rounded-xl overflow-hidden p-14 flex flex-col">
          <Image
            src={AccessDeniedIcon}
            alt="img"
            className="h-[100px] w-auto"
          ></Image>
          <p className="text-xl font-bold mt-3">Access Denied</p>
          <p className="">{invalidMessage}</p>
          <button
            onClick={() => {
              setInvalid(!invalid);
              router.push("/signin");
            }}
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="w-screen ">
      {invalid ? modalPopUp() : <></>}
      <div className=" h-screen grid md:grid-cols-2 p-10 gap-20">
        <section className="hidden md:block overflow-hidden relative h-full rounded-3xl">
          <div>
            <Image
              src={Cover}
              alt="cover"
              className="absolute z-0 md:scale-[2] lg:scale-[1.5] xl:scale-[1]"
            />
            <div className="absolute w-full h-full bg-black opacity-20"></div>
          </div>
        </section>
        <section className="flex justify-center flex-col lg:p-8 xl:p-20">
          <h3 className="text-4xl font-bold">Sign In</h3>
          <p className="mt-2">Log In Your Account Hindu For Generation 17</p>
          <form className=" mt-28 lg:max-w-[80%]">
            <div className="mt-10">
              <p>Email</p>
              <Input typeInput="email" className="mt-2" onChange={setEmail} />
            </div>
            <div className="mt-6">
              <p>Password</p>
              <Input
                typeInput="password"
                className="mt-2"
                onChange={setPassword}
              />
              <Link href={"/forgotpassword"}>
                <p className="text-[#064C72] text-end mt-2 font-semibold">
                  Lupa Password?
                </p>
              </Link>
            </div>
            {invalid ? (
              <p className="text-[#E9331A] text-center">
                Invalid username or password
              </p>
            ) : (
              <></>
            )}
            <div className="">
              <input
                type="submit"
                onClick={(e) => {
                  e.preventDefault();
                  handleSignIn();
                }}
                className="cursor-pointer mt-20 w-full bg-[#064C72] p-2 rounded-full text-white"
              />
              <span className="flex gap-1 justify-center w-full mt-2 text-[#064C72]">
                <p>Already have an account?</p>
                <Link href={"/signup"} className="font-bold">
                  Sign Up
                </Link>
              </span>
            </div>
          </form>
        </section>
      </div>
      <Footer />
    </main>
  );
}
