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
    </div>
  )
}

export default QuestionSection