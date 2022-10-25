import React from 'react'

export default function Element({ item, className }) {
  return (
      <div className={ className + " transition-all duration-150 text-center p-2 rounded-md cursor-pointer"}>
        <div className="flex items-center justify-between">
          <span className="font-medium" style={{fontSize : 10}}>{ item.number }</span>
          {/* <span className='text-xs'>{ item.boil }</span> */}
        </div>
        <h2 className="text-2xl font-medium leading-6">{ item.symbol }</h2>
        <p className='truncate' style={{fontSize : 9}}>{ item.name }</p>
        {/* <p className="text-sm">{ item.weight }</p> */}
      </div>
  )
}
