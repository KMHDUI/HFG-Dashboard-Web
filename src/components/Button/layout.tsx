type ButtonType = {
  name:String
  className:String,
  onClickFunction:any,
  disabled: boolean,
}

'use client';

export default function Button(props: ButtonType) {
    return (
      <>
        {props.disabled ? <button className={
          `bg-[#064C72] p-2 rounded-full text-white

          ${props.className}
          `  
        }
        // onClick={() => props.onClick}
        type="button"
        disabled
        onClick={props.onClickFunction}
        >
          {props.name}
            
        </button>:<button className={
          `bg-[#064C72] p-2 rounded-full text-white

          ${props.className}
          `  
        }
        // onClick={() => props.onClick}
        type="button"
      
        onClick={props.onClickFunction}
        >
          {props.name}
            
        </button>}
      </>
    )
  }
  