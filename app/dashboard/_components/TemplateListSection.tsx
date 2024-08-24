import template from '@/app/(data)/template'
import React, { useEffect } from 'react'
import TemplateCard from './TemplateCard'

export interface TEMPLATE{
  name:string,
  desc:string,
  icon:string,
  category:string,
  slug:string,
  aiPrompt:string,
  form?:FORM[]
}
export interface FORM{
  label:string,
  field:string,
  name:string,
  required?:boolean
}
function TemplateListSection({userSearchInput}:any) {
  const [templateList,setTempaltelist]=React.useState(template)
  useEffect(()=>{
    console.log(userSearchInput)
    if(userSearchInput){
      const filterData=template.filter((item:TEMPLATE)=>item.name.toLowerCase().includes(userSearchInput.toLowerCase())
    );setTempaltelist(filterData); 
     }
     else{
       setTempaltelist(template)}
  },[userSearchInput])
  return (
    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 p-10'>
      {templateList.map((item:TEMPLATE,index:number)=>(
        <TemplateCard{...item}/>
      ))}
      
    </div>
  )
}

export default TemplateListSection
