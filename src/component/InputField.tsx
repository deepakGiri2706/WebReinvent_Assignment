
interface inputProps{
    label:string,
    id:string,
    placeholder:string
    type?:string,
    handleInputChange:(key:string, value:string)=>void
}
export default function InputField(props  : inputProps){
    const {label, id, placeholder, type = "text"} = props
    const handleChange=(key: string,value: string)=>{

        props?.handleInputChange(key, value)
    }
    return (
        <>
          <div className="mb-4">
            <label htmlFor="username" className="sr-only">{label}</label>
            <input
              onChange={(e)=>handleChange(id, e.target.value, )}
              type={type}
              id={id}
              placeholder={placeholder}
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#0e141b] focus:outline-0 focus:ring-0 border-none bg-[#e7edf3] focus:border-none h-14 placeholder:text-[#4e7397] p-4 text-base font-normal leading-normal"
            />
          </div>
        </>
    )

    
}