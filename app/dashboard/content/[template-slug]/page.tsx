"use client"
import React, { useContext, useState } from 'react'
import FormSection from './_components/FormSection'
import OutputSection from './_components/OutputSection'
import template from '@/app/(data)/template'
import { TEMPLATE } from '../../_components/TemplateListSection'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import NextLink from 'next/link'
import { chatSession } from '@/utils/Aimodel'
import { db } from '@/utils/db'
import { AIOutput } from '@/utils/schema'
import { useUser } from '@clerk/nextjs'
import moment, { isMoment } from 'moment'
import { TotalUsageContext } from '@/app/(context)/TotalUsageContext'
import { useRouter } from 'next/navigation'
interface PROPS {
    params:{
        'template-slug':string
    }
}



function CreateNewContent(props:PROPS) {
    const selectedTemplate:TEMPLATE|undefined=template?.find((item)=>item.slug==props.params['template-slug']);
    const [loading,setLoading]=useState(false);
    const[aiOutput,setAiOutput]=useState<string>('');
    const {user}=useUser();
    const router=useRouter();
    const {totalUsage,setTotalUsage}=useContext(TotalUsageContext);

    const GenerateAIContent=async(formData:any)=>{
      if(totalUsage>=40000){

        console.log("Please Upgrade");
        router.push('/dashboard/billing')
        return ;
      }
      const SelectedPrompt=selectedTemplate?.aiPrompt;

      const FinalAIPrompt=JSON.stringify(formData)+","+SelectedPrompt;
      const result=await chatSession.sendMessage(FinalAIPrompt);
      console.log(result.response.text());
      setAiOutput(result.response.text());
      await SaveInDb(formData,selectedTemplate?.slug,result.response.text(),user);
      setLoading(false);



    }

    const SaveInDb = async (formData: any, slug: any, aiResp: string, user: any) => {
      console.log("Hehehhehhe");
      console.log(aiResp);
      try {
          const result = await db.insert(AIOutput).values({
              formData: formData, // Ensure field name matches
              aiResponse: aiResp, // Match the field name in schema
              templateSlug: slug,
              createdBy: user?.primaryEmailAddress?.emailAddress || 'default@example.com',
              createdAt: new Date().toISOString(), // Format the date as a string
          });
          return result;
      } catch (error) {
          
         
      }
  };
  return (
    <div className='p-10 '>
      <NextLink href={"/dashboard"}>
      
        <Button ><ArrowLeft/>Back</Button>
      </NextLink>
      
      
      
      <div className='grid grid-cols-2 md:grid-cols-3 gap-5 py-5'>
        {/*FormSection*/}
        <FormSection selectedTemplate={selectedTemplate}
        useFormInput={(v:any)=>GenerateAIContent(v)}
        loading={loading}
        setLoading={setLoading}/>
        {/*OutputSection*/}
        <div className='col-span-2'>
          <OutputSection aiOutput={aiOutput}/>
        </div>


      </div>
    </div>

  )
}

export default CreateNewContent
// Remove the second definition of the moment() function

