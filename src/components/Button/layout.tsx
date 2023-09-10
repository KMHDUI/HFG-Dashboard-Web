type ButtonType = {
  name:String
  className:String,
  onClickFunction:any
}

'use client';

export default function Button(props: ButtonType) {
    return (
      <>
        <button className={
          `bg-[#064C72] p-2 rounded-full text-white

          ${props.className}
          `  
        }
        // onClick={() => props.onClick}
        type="button"
        onClick={props.onClickFunction}
        >
          {props.name}
            
        </button>
      </>
    )
  }
  