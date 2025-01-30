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
        //console.log("interview",res[0].jobPosition);
        setInterviewData(res[0]);
    }

    function capitalizeFirstLetter(str) {
        if (!str) return str; // Handle empty strings
        return str.charAt(0).toUpperCase() + str.slice(1);
      }

  return (
    <div className='my-10 flex justify-center flex-col items-center'>
        <h2 className='font-bold text-2xl'>Let's Get Started</h2>

        <div className='flex flex-col items-center'>
            {
                webcamEnable ? 
                <Webcam
                onUserMedia={()=>setWebcamEnable(true)}
                onUserMediaError={()=>setWebcamEnable(false)}
                mirrored={true}
                style={{
                    height:300,
                    width:300
                    
                }}/> : 
                <WebcamIcon className='h-72 w-full my-7 p-10 bg-secondary rounded-lg border'/>
            }
            <Button className="bg-primary text-white w-full" onClick={()=>setWebcamEnable(true)}>Start Webcam</Button>
        </div>

        <div className='flex flex-col my-5 items-center gap-2'>
            <h2><strong>Job Position/Role: </strong>{capitalizeFirstLetter(interviewData?.jobPosition)}</h2>
            <h2><strong>Job Description: </strong>{capitalizeFirstLetter(interviewData?.jobDescription)}</h2>
            <h2><strong>Years of Experience: </strong>{capitalizeFirstLetter(interviewData?.jobExperience)}</h2>
        </div>
    </div>
  )
}

export default Interview