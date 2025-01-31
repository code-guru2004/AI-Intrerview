"use client";
import { db } from "@/utils/db";
import { UserAnswer } from "@/utils/schema";
import { eq } from "drizzle-orm";
import React, { use, useEffect, useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronsUpDown } from "lucide-react"
import Link from "next/link";
import { Button } from "@/components/ui/button";

function FeedBack({ params }) {
  const actualParams = use(params);
  const interviewId = actualParams.interviewId;

  const [feedbackList, setFeedbackList] = useState([]);
    const [rating,setRating] = useState(0)

  useEffect(() => {
    setRating(0)
    getFeedback();
  }, []);

  useEffect(()=>{
    //var rate=0;
    setRating(0)
    feedbackList &&
    feedbackList.map((item,index) => {
            setRating(prev=>prev+parseFloat(item?.rating))
    });
    //setRating(rating/5.0)
  },[feedbackList])

  const getFeedback = async () => {
    
    const result = await db
      .select()
      .from(UserAnswer)
      .where(eq(UserAnswer.mockIdRef, interviewId))
      .orderBy(UserAnswer.id);
    setFeedbackList(result);
    setRating(0)
    //console.log(result);
  };
  return (
    <div className="p-10">
      <h2 className="text-3xl font-bold text-green-500">Congratulations🎊</h2>
      <h2 className="text-[1.7rem] font-bold text-blue-500">You have completed your interview.</h2>
      <h2 className="text-2xl font-bold ">Here is your interview feedback</h2>
      <h2 className="text-primary text-lg mt-3">
      🎯Your overall interview rating: {rating<3?<strong className="text-red-500">{rating}/10</strong>:<strong className="text-green-800">{rating}/10</strong>}
      </h2>
      <h2 className="text-sm text-slate-500 mt-3">📈Show your given answer and Which area you need to improve</h2>
      <div>
        {feedbackList &&
          feedbackList.map((item,index) => (
            <Collapsible key={index} className="p-2 bg-secondary rounded-lg my-2 text-left ">
              <CollapsibleTrigger className="w-full flex text-left justify-between items-center">
                {item?.question} <ChevronsUpDown className="sm:w-10 md:w-4"/>
              </CollapsibleTrigger>
              <CollapsibleContent className="flex flex-col gap-2">
                <div className={`${(item?.rating < 3 || item?.rating===1/5)?'text-red-500':'text-green-600'} rounded-md border px-4 py-2 font-mono text-sm shadow-sm w-full`}>
                    <h2>🎖️Rating:{item?.rating}</h2>
                </div>
                <div className="rounded-md border border-yellow-500 px-4 py-2 font-mono text-sm shadow-sm bg-yellow-100 ">
                    <h2 className="font-bold">📝Your Answer: </h2>
                    <p>{item?.userAnswer}</p>
                </div>
                <div className="rounded-md border border-green-500 px-4 py-2 font-mono text-sm shadow-sm bg-green-100 ">
                    <h2 className="font-bold">✅Correct Answer: </h2>
                    <p className="text-green-900">{item?.correctAnswer}</p>
                </div>
                <div className="rounded-md border border-sky-500 px-4 py-2 font-mono text-sm shadow-sm bg-sky-100 ">
                    <h2 className="font-bold">⚠️Feedback: </h2>
                    <p className="text-sky-900">{item?.feedback}</p>
                </div>
              </CollapsibleContent>
            </Collapsible>
          ))}
      </div>
      <Link href={"/dashboard"}>
        <Button className="bg-primary text-white hover:text-slate-200">Go To Home</Button>
      </Link>
    </div>
  );
}

export default FeedBack;
