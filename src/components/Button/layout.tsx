"use client"
type ButtonType = {
  name: String;
  className: String;
  onClickFunction?: any;
  disabled?: boolean;
};

export default function Button(props: ButtonType) {
  return (
    <>
      {props.disabled ? (
        <button
          className={`bg-[#064C72] p-2 rounded-full text-white
          ${props.className}
          `}
          type="button"
          disabled
          onClick={props.onClickFunction}
        >
          {props.name}
        </button>
      ) : (
        <button
          className={`bg-[#064C72] p-2 rounded-full text-white
          ${props.className}
          `}
          type="button"
          onClick={props.onClickFunction}
        >
          {props.name}
        </button>
      )}
    </>
  );
}