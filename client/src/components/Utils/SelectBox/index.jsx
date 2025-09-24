import { useState } from "react";

const SelectBox = ({label,value,onchange,item,setForm,Id}) => {
    const handleChange=(e)=>{
         const selected = item.find(s => s._id === e.target.value);
         if (selected) { 
             if(Id==='serviceId')
             { setForm((prev) => ({ ...prev, serviceName: selected.name,description:selected.description}));};
            setLabel(selected.name)
        }
    {onchange && onchange(e)}
        }
  const[selectLabel,setLabel]=useState(label);
 return (
    <>
 <label className="block mb-2 text-md font-semibold ">
     {label}        
</label>

   <select
    name={Id}
    value={value}
    onChange={(e)=>handleChange(e)} 
    required
    className="w-full border rounded-lg p-2 mb-4"
    >
    <option value="">-- {selectLabel} --</option>
        {item?.map((s) => (
            <option key={s._id} value={s._id} 
            >
            {s.name}
            </option>
            ))}
 </select>

    </>  
)
}

export default SelectBox