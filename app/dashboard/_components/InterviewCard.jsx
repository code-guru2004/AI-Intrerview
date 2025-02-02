import { Button } from '@/components/ui/button'
import { Tally1 } from 'lucide-react';
import Link from 'next/link'
import React from 'react'

function InterviewCard({interviewInfo}) {
  //console.log(interviewInfo);
  
  return (
    <div className='border shadow-sm rounded-lg p-3  cursor-pointer transition-all '>
        <h2 className='font-semibold text-primary'>{interviewInfo?.jobPosition}</h2>
        <h2 className='text-sm text-slate-700 font-mono overflow-hidden flex items-center '>{interviewInfo?.jobExperience} Years of Experience <strong className='text-red-700 mx-1'>|</strong> {interviewInfo?.jobDescription}</h2>
        <p className='text-sm text-slate-500 font-serif'>{interviewInfo?.createdAt}</p>
        <div className='flex gap-2'>
            <Link href={"/dashboard/interview/"+interviewInfo?.mockId+"/feedback"}>
                <Button size="sm" className="bg-slate-200 text-black hover:text-white">Feedback</Button>
            </Link>
            <Link href={"/dashboard/interview/"+interviewInfo?.mockId+"/start"}>
              <Button size="sm" className="bg-primary text-white hover:text-white">Start</Button>
            </Link>
        </div>
    </div>
  )
}

export default InterviewCard