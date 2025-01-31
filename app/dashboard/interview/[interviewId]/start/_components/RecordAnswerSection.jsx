import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Webcam from 'react-webcam'
import useSpeechToText from 'react-hook-speech-to-text';
import { Mic, Mic2Icon } from 'lucide-react';

function RecordAnswerSection() {
    const {
        error,
        interimResult,
        isRecording,
        results,
        startSpeechToText,
        stopSpeechToText,
      } = useSpeechToText({
        continuous: true,
        useLegacyResults: false
      });

      const [userAnswer , setUserAnswer] = useState("")
      useEffect(()=>{
        results.map((result)=>setUserAnswer(prevAns=>prevAns+result?.transcript))
      },[results])
  return (
    <div className='flex flex-col items-center'>
        <div className='flex flex-col justify-center items-center bg-secondary rounded-lg p-5 my-10'>

        <Image src={"/webcamImg.png"} width={100} height={100} alt='webcam' className='absolute'/>
        <Webcam 
            mirrored={true}
            style={{
                width:'100%',
                height:300,
                zIndex:10,
            }}
        />
        </div>

        <Button className="bg-primary text-white hover:text-slate-100" onClick={isRecording?stopSpeechToText:startSpeechToText}>
            {
                isRecording ? 
                <h2>
                    <Mic/> 'Recording...'
                </h2> : "Record Answer"

            }
           
        </Button>

        <Button onClick={()=>console.log(userAnswer)
        }>Show</Button>
        <p>{userAnswer}</p>
    </div>
  )
}

export default RecordAnswerSection