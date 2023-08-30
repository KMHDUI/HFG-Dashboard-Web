type ButtonType = {
  name:String
  className:String
}


export default function Button(props: ButtonType) {
    return (
      <>
        <button className={
          `bg-[#064C72] p-2 rounded-full text-white

          ${props.className}
          `
        }>
            {props.name}
        </button>
      </>
    )
  }
  