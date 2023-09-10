import Image from 'next/image'
import Link from 'next/link';


type InputType = {
  typeInput:String,
  className:String,
  onChange: any
}

export default function Input(props: InputType) {
  return (
    <>
      <input 
        type={props.typeInput.toString()} 
        className={`
            bg-[#F4F5FB] w-full p-2 px-4 mt-2
            hover:ring hover:border-[#BED7DC] 
            focus:ring focus:ring-[#BED7DC] focus:ring-2
            rounded-3xl
            ${props.className}
        `}
        onChange={(e) => props.onChange(e.target.value)}
            />
    </>
  )
}
