'use client'
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import React, { use, useEffect, useState } from 'react'
import QuestionSection from './_components/QuestionSection';
import RecordAnswerSection from './_components/RecordAnswerSection';

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
            <QuestionSection mockInterviewQuestion={mockInterviewQuestion} activeQuestionIndex={activeQuestionIndex}/>

            {/* Video and Mic */}
            <RecordAnswerSection/>
        </div>
    </div>
  )
}

export default StartInterview