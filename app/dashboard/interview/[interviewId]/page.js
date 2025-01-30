'use client'
import { Button } from '@/components/ui/button'
import { db } from '@/utils/db'
import { MockInterview } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import { WebcamIcon } from 'lucide-react'
import React, { use, useEffect, useState } from 'react'
import Webcam from 'react-webcam'

function Interview({params}) {
    const [interviewData , setInterviewData] = useState();
    const [webcamEnable , setWebcamEnable] = useState(false)
    const actualParams = use(params);
    const interviewId = actualParams.interviewId;
    useEffect(() => {
    //console.log(interviewId);
    GetInterviewDetails()
}, [])

    

    const GetInterviewDetails= async()=>{
        const res = await db.select().from(MockInterview).where(eq(MockInterview.mockId,interviewId));
        //console.log("interview",res);
        setInterviewData(res[0]);
    }

  return (
    <div className='my-10 flex justify-center flex-col items-center'>
        <h2 className='font-bold text-2xl'>Let's Get Started</h2>

        <div>
            {
                webcamEnable ? 
                <Webcam
                onUserMedia={()=>setWebcamEnable(true)}
                onUserMediaError={()=>setWebcamEnable(false)}
                style={{
                    height:300,
                    width:300
                }}/> : 
                <WebcamIcon className='h-72 w-full my-7 p-10 bg-secondary rounded-lg border'/>
            }
            <Button className="bg-primary text-white" onClick={()=>setWebcamEnable(true)}>Start Webcam</Button>
        </div>
    </div>
  )
}

export default Interview