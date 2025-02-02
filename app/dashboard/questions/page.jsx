"use client"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { db } from '@/utils/db';
import { chatSession } from '@/utils/GeminiAiModals';
import { PrepareQuestions } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import moment from "moment";
import { Search } from 'lucide-react';
import { eq } from 'drizzle-orm';
import QuestionList from './_components/QuestionList';

function QuestionsPage() {
    const [open, setOpen] = useState(false);
    const [searchText,setSearchText]=useState("");
    const [questions,setQuestions]=useState();
    const [questionId,setQuestionId]=useState("")
    const {user} = useUser();
    const [loading, setLoading] = useState(false)
    const [questionList,setQuestionList]=useState([]);

    const getAllQuestions=async(e)=>{
        e.preventDefault();
        setLoading(true);
        setQuestionList([]);
        setQuestionId("");
        setQuestions("")
        const prompt = "Give me 10 interview questions"+searchText+"OS for interview in JSON format where different fields like question, focus, answer are given. Please don't give repeated questions.";

        const result = await chatSession.sendMessage(prompt)
        const questionJSONres = (result.response.text()).replace('```json','').replace('```','')
        //console.log(questionJSONres);
        setQuestions(questionJSONres);

        if(questionJSONres){
            const resp = await db.insert(PrepareQuestions).values({
                jsonQuestionResp: questionJSONres,
                questionTopic: searchText,
                createdBy: user?.primaryEmailAddress?.emailAddress,
                createdAt: moment().format("DD-MM-YYYY"),
                questionId: uuidv4(),
            }).returning({questionId:PrepareQuestions.questionId})

            //console.log(resp[0]?.questionId);
            
            if(resp){
                setQuestionId(resp[0]?.questionId)
                setLoading(false)
            }
        }
    }
    useEffect(()=>{
        if(questionId !== ""){
            //console.log(questionId);
            getQuestionsFromDB()
        }
     },[questionId]);

    const getQuestionsFromDB=async ()=>{
        const result = await db.select().from(PrepareQuestions).where(eq(PrepareQuestions.questionId,questionId));
        const jsonQuestionRes = JSON.parse(result[0]?.jsonQuestionResp)
        //console.log(jsonQuestionRes);
        setQuestionList(jsonQuestionRes);
    }
return (
    <div className='p-10'>
        <div className='mx-auto'>
            <h2 className='text-lg lg:text-3xl font-bold flex flex-col md:flex-row gap-3 items-center mb-4 '>🔎Search Topic To Get <p className='text-primary font-sans'> Interview Questions❓</p></h2>
            <form onSubmit={getAllQuestions} className='flex flex-col md:flex-row w-full justify-between gap-4 items-center '>
                <div className='w-full'>
                    <Input placeholder="🔍 Search Here" onChange={(e)=>setSearchText(e.target.value)} className="w-full"/>
                </div>
                <div>
                    <Button type="submit" className={`bg-primary text-white hover:text-slate-200 flex`}  disabled={loading} ><Search/>
                    {
                        loading?"Searching":"Search"
                    }
                    </Button>
                </div>
            </form>
        </div>
        <div className='mt-5'>
            {/* <p>{questionId}</p> */}{}
            {
                questionList.length>0? (<p className='text-gray-600'>All Questions as per your search👇. Tap on the questions to see answers⚠️.</p>):(<p className='w-full text-center mt-[20vh]'>⚠️ No Questions</p>)
            }
            <QuestionList questionList={questionList}/>
        </div>
    </div>
  )
}

export default QuestionsPage