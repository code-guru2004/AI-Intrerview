'use client'
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { useUser } from '@clerk/nextjs'
import { desc, eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react'
import InterviewCard from './InterviewCard';

function InterviewList() {
    const {user}=useUser();
    const [allInterview,setAllInterview]=useState([])
    useEffect(()=>{
        GetInterviewList()
    },[])
    const GetInterviewList=async()=>{
        const result = await db.select().from(MockInterview).where(eq(MockInterview.createdBy,user?.primaryEmailAddress?.emailAddress)).orderBy(desc(MockInterview.id))
        console.log(result);
        setAllInterview(result)
    }
  return (
    <div>
        <h2 className='font-bold text-xl text-primary mb-5'>Previous Interview</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2'>
            {
                allInterview&&allInterview.map((interview,index)=>(
                    <div key={index}>
                        <InterviewCard
                            interviewInfo={interview}
                        />
                    </div>
                ))
            }
        </div>
    </div>
  )
}

export default InterviewList