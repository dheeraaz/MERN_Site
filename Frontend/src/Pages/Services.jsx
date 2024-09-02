import React, { useEffect, useState } from 'react'
import { ServiceCard } from '../Components'
import { getServicesAPI } from '../constants/apiURLS'

const Services = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    ; (async () => {

      try {
        const response = await fetch(getServicesAPI, {
          method: "GET",
        })

        if (response.ok) {
          const jsonData = await response.json();
          setServices(jsonData.data);
        }
      } catch (error) {
        console.error(error)
      }
      
    })()
  }, [])

  return (
    <>
      <h2 className='mt-4 pb-2 text-4xl font-inter inline-block relative before:absolute before:content-[""] before:block before:w-1/2 before:bottom-0 before:left-0 before:border-2 before:border-blue-500  '>Services</h2>
      <section className='my-8 grid grid-cols-3 gap-8'>
        {services && (services.map((service) => {
          return <ServiceCard key={service._id} serviceData={service} />
        }))}
      </section>
    </>
  )
}

export default Services