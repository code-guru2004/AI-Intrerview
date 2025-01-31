import { Lightbulb } from 'lucide-react'
import React from 'react'

function QuestionSection({mockInterviewQuestion,activeQuestionIndex}) {
    //console.log(mockInterviewQuestion);
    
  return mockInterviewQuestion&&(
    <div className='p-5 border rounded-lg my-10'>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
        {
            mockInterviewQuestion && mockInterviewQuestion.map((question,index)=>(
                <h2 className={`p-2  rounded-full text-xs md:text-sm text-center cursor-pointer ${activeQuestionIndex===index?'bg-primary text-white':'bg-secondary'}`} key={index}>Question #{index+1}</h2>
            ))
        }

        </div>
        <h2 className='my-5 text-md md:text-base'>{mockInterviewQuestion[0]?.question}</h2>

        <div className='border rounded-lg p-5 bg-blue-100 border-blue-700 text-blue-700 mt-20'>
            <h2 className='flex gap-1 text-sm items-center justify-start'>
                <Lightbulb className='w-4'/>
                <strong>NOTE:</strong>
            </h2>
            <h2 className='text-sm'>{process.env.NEXT_PUBLIC_INFO}</h2>
        </div>
    </div>
  )
}

export default QuestionSection