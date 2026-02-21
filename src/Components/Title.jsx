import React from 'react'

const Title = ({title, description}) => {
  return (
    <div className='text-center text-slate-700'>
        <h1 className='text-3xl sm:text-4xl font-medium'>{title}</h1>
        <p className='max-sm max-w-2xl mt-4 text-slate-500'>{description}</p>
    </div>
  )
}

export default Title