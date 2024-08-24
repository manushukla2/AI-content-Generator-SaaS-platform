'use client'
import React,{useEffect,useState} from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button'; // Adjust path as necessary
import { db } from '@/utils/db';
import { AIOutput } from '@/utils/schema';
import TemplateCard from '../_components/TemplateCard';
import template from '@/app/(data)/template';




function GetTemplateIcon(templateSlug:string){
  return template.find((item)=>item.slug==templateSlug)?.icon;
}
function GetTemplateName(templateSlug:string){
  return template.find((item)=>item.slug==templateSlug)?.name;
}
function truncateResponse(response:string|null){
  if(response){
    return response.length>30?response.slice(0,150)+'...':response;
  }
  return '';
}

const copyToClipboard = (text: string | null) => {
  if (text) {
    navigator.clipboard.writeText(text).then(() => {
      alert('Copied to clipboard!');
    }).catch(err => {
      console.error('Failed to copy: ', err);
    });
  }
};


export interface HISTORY { id: number; formData: string | null; aiResponse: string | null; templateSlug: string; createdBy: string | null; createdAt: string | null; }

const history: React.FC =  () => {
  const [history, setHistory] = useState<HISTORY[]>([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const results: HISTORY[] = await db.select().from(AIOutput).execute() || [];
        setHistory(results);
      } catch (error) {
        console.error('Failed to fetch history:', error);
      }
    };

    fetchHistory();
  }, []);
  return (
    <div className='p-6'>
      <h1 className='text-2xl font-bold'>History</h1>
      <p className='mt-4'>Welcome to the dashboard. You can navigate to the history page from here.</p>
      <div className='mt-6'>
      <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Icon</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Template Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">AI Response</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Length</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created At</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {history.map((result) => (
            <tr key={result.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <img src={GetTemplateIcon(result.templateSlug)} alt="Template Icon" className="h-8 w-8"/>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {GetTemplateName(result.templateSlug)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {result.id}
              </td>
              <td className="px-6 py-4 ">
                {truncateResponse(result.aiResponse)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {result.aiResponse?.length}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {result.createdAt?.split('T')[0]}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      type="button"
                      onClick={() => copyToClipboard(result.aiResponse)}
                      className="px-4 py-2  text-primary hover:cursor-pointer bg-transparent"
                    >
                      Copy
                    </button>
                  </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
      </div>
    </div>
  );
};

export default history;
