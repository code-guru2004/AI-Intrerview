import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Webcam from 'react-webcam'
import useSpeechToText from 'react-hook-speech-to-text';
import { Mic, Mic2Icon, MicOff } from 'lucide-react';
import { ToastAction } from '@/components/ui/toast';
import { useToast } from '@/hooks/use-toast';

function RecordAnswerSection() {
    const { toast } = useToast()
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

      const [userAnswer , setUserAnswer] = useState("");

      useEffect(()=>{
        results.map((result)=>setUserAnswer(prevAns=>prevAns+result?.transcript))
      },[results])

      const SaveUserAnswer=()=>{
        if(isRecording){
            stopSpeechToText()
            if(userAnswer?.length<10){
                toast({
                    variant: "destructive",
                    title: "Alert",
                    description: "Your answer is not appropiate.",
                    action: <ToastAction altText="Try again">Try again</ToastAction>,
                  })
                return;
            }
        }
        else{
            startSpeechToText();
        }
      }
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

        <Button className={`bg-primary text-white hover:text-slate-100 ${isRecording&&'bg-secondary text-red-700 hover:bg-slate-300 hover:text-purple-800'}`} onClick={SaveUserAnswer}>
            {
                isRecording ? 
                <h2 className='flex items-center gap-1'>
                    <MicOff /> Stop Recording
                </h2> : 
                <h2 className='flex items-center gap-1'>
                    <Mic />
                    Start Recording
                </h2>

            }
           
        </Button>

        <Button onClick={()=>console.log(userAnswer)
        }>Show</Button>
    </div>
  )
}

export default RecordAnswerSection