"use client"
import { TEMPLATE } from '@/app/dashboard/_components/TemplateListSection'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Loader2Icon } from 'lucide-react'
import React, { useState } from 'react'

interface PROPS{
    selectedTemplate?:TEMPLATE
    useFormInput:any
    loading:boolean
    setLoading:any

}
function FormSection({selectedTemplate,useFormInput,loading,setLoading}:PROPS) {
    const[formData,setFormData]=useState<any>();
    const handleInputChange=(event:any)=>{
        const{name,value}=event.target;
        setFormData({...formData,[name]:value})

    }
    const onSubmit=(e:any)=>{
        setLoading(true);
        e.preventDefault();
        useFormInput(formData)
    }
  return (
    <div className='p-5 shadow-lg border rounded-lg bg-white'>
        <img src={selectedTemplate?.icon} alt='icon' width={70} height={70}/> 
        <h2 className='font-bold text=2xl mb=2 text-primary'>{selectedTemplate?.name}</h2>
        <p className='text-gray-500 text-sm '>{selectedTemplate?.desc}</p>
        <form className='mt-3 my-2  flex-col'onSubmit={onSubmit}>
            {selectedTemplate?.form?.map((item,index)=>(   
                <div className='my-2  gap-2 mb-7'>
                    <label>{item.label}</label>
                    {item.field=='input'?
                    <Input name={item.name} required={item?.required}
                    onChange={handleInputChange}/>
                :item.field=='textarea'?
            <Textarea name={item.name} required={item?.required}
            onChange={handleInputChange}/>:null}
                    
                </div>
             ))}
             <Button type="submit"className='w-full py-6'>
                {loading&&<Loader2Icon className='animate-spin'/>}Generate content</Button>
        </form>
      
    </div>
  )
}

export default FormSection
