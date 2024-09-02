import React from 'react'

const ServiceCard = ({serviceData}) => {
    const {provider, price, service, description} = serviceData;
  return (
    <div className='max-w-[400px] border-2 border-white px-8 pt-2 pb-8'>
        <div className='w-full'>
            <img src="/services/serviceImg.svg" alt="" />
        </div>
        <div className='flex justify-between text-gray-400'>
            <h3>{provider}</h3>
            <p>{price}</p>
        </div>
        <h2 className='text-2xl my-2'>{service}</h2>
        <p className='text-justify'>{description}</p>
    </div>
  )
}

export default ServiceCard