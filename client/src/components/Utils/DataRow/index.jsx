import React from 'react'

const DataRow = ({label,value,Icon}) => {
  return (
    <>
    <p className="flex flex-row items-center gap-2 ">
        <strong>{label} : </strong>
        {Icon && Icon }
        {(label==='E-mail' || typeof value !== 'string')
        ?value
        :value?.charAt(0).toUpperCase() + value?.slice(1)}
       
        </p>

    </>
  )
}

export default DataRow