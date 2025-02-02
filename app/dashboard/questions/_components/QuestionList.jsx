"use client";
import React from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { CircleHelp, Plus } from "lucide-react";

function QuestionList({ questionList }) {
  return (
    <div className="p-5 flex flex-col gap-4">
      
      {questionList &&
        questionList.map((question, index) => (
          <Collapsible key={index} className="w-full bg-secondary p-2 rounded">
            <CollapsibleTrigger className="font-bold flex items-center gap-1 justify-between w-full">
                <p className="flex items-start gap-1 text-left justify-start">
                  <CircleHelp className="w-5 text-primary"/> {question?.question} 
                </p>
                <Plus className="text-red-500"/>
              </CollapsibleTrigger>
            <CollapsibleContent className="space-y-1">
              <div className="rounded-md border px-4 py-2 font-mono text-sm shadow-sm bg-green-100 text-yellow-800">
              🤔Topics: {question?.focus}
              </div>
              <div className="rounded-md border px-4 py-2 font-mono text-sm shadow-sm bg-blue-100 text-blue-900">
              🟰 {question?.answer}
              </div>
            </CollapsibleContent>
          </Collapsible>
        ))}
    </div>
  );
}

export default QuestionList;
