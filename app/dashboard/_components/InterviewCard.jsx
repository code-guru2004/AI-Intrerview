import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

function InterviewCard({interviewInfo}) {
  return (
    <div className='border shadow-sm rounded-lg p-3  cursor-pointer transition-all '>
        <h2 className='font-semibold text-primary'>{interviewInfo?.jobPosition}</h2>
        <h2 className='text-sm text-slate-700 font-mono'>{interviewInfo?.jobExperience} Years of Experience</h2>
        <p className='text-sm text-slate-500 font-serif'>{interviewInfo?.createdAt}</p>
        <div className='flex gap-2'>
            <Link href={"/dashboard"}>
                <Button size="sm" className="bg-slate-200 text-black hover:text-white">Feedback</Button>
            </Link>
            <Button size="sm" className="bg-primary text-white hover:text-white">Start</Button>
        </div>
    </div>
  )
}

export default InterviewCard