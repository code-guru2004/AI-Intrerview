'use client'
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import React, { use, useEffect, useState } from 'react'
import QuestionSection from './_components/QuestionSection';
import RecordAnswerSection from './_components/RecordAnswerSection';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

function StartInterview({params}) {
    const actualParams = use(params);
    const interviewId = actualParams.interviewId;
    //console.log(interviewId);
    
    const [interviewData , setInterviewData] = useState();
    const [mockInterviewQuestion , setMockInterviewQuestion] = useState()
    const [activeQuestionIndex,setActiveQuestionIndex]=useState(0)
    useEffect(() => {
        //console.log(interviewId);
        GetInterviewDetails()
    }, [])
    
        
    
    const GetInterviewDetails= async()=>{
        const res = await db.select().from(MockInterview).where(eq(MockInterview.mockId,interviewId));
        //console.log("interview",res[0]?.jsonMockResp);
        const jsonMockRes = JSON.parse(res[0]?.jsonMockResp)

        setMockInterviewQuestion(jsonMockRes)
        setInterviewData(res[0]);
    }
  return (
    <div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
            {/* Questions */}
            <QuestionSection 
            mockInterviewQuestion={mockInterviewQuestion} 
            activeQuestionIndex={activeQuestionIndex}
            />

            {/* Video and Mic */}
            <RecordAnswerSection
            mockInterviewQuestion={mockInterviewQuestion} 
            activeQuestionIndex={activeQuestionIndex}
            interviewData={interviewData}
            />
        </div>
        <div className='flex justify-center  md:justify-end gap-5 my-5'>
            { activeQuestionIndex>0 &&
                <Button onClick={()=>setActiveQuestionIndex(prev=>prev-1)} className="bg-sky-600 text-white">Previous Question</Button>
            }
            { activeQuestionIndex<(process.env.NEXT_PUBLIC_QUESTION_COUNT-1)&&
                <Button onClick={()=>setActiveQuestionIndex(prev=>prev+1)} className="bg-green-600 text-white">Next Question</Button>
            }
            {
                activeQuestionIndex===(process.env.NEXT_PUBLIC_QUESTION_COUNT-1)&&
                <Link href={`/dashboard/interview/${interviewId}/feedback`}>
                    <Button className="bg-red-600 text-white hover:text-slate-100">End Interview</Button>
                </Link>
            }
        </div>
    </div>
  )
}

export default StartInterview