"use client"
import { db } from '@/utils/db'
import { MockInterview } from '@/utils/schema'
import { useUser } from '@clerk/nextjs'
import { desc, eq } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'
import InterviewCard from '../_components/InterviewCard'

function Interviews() {
  const {user} = useUser()
  const [allInterviews, setAllInterviews] = useState([])
  useEffect(()=>{
    GetInterviews();
  },[])
  const GetInterviews=async()=>{
    const result = await db.select().from(MockInterview).where(eq(MockInterview.createdBy,user?.primaryEmailAddress?.emailAddress)).orderBy(desc(MockInterview.id))
    //console.log(result);
    setAllInterviews(result)
  }
  return (
    <div className='p-5'>
      <h2 className='text-primary text-2xl mb-10 font-serif shadow'>All Interviews</h2>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2'>
            {
                allInterviews&&allInterviews.map((interview,index)=>(
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

export default Interviews