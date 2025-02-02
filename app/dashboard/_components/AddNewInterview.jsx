"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { chatSession } from "@/utils/GeminiAiModals";
import { BadgeAlert, LoaderCircle } from "lucide-react";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { v4 as uuidv4 } from 'uuid';
import moment from "moment";
import { useRouter } from "next/navigation";

function AddNewInterview() {
    const [loading,setLoading] = useState(false)
    const [open, setOpen] = useState(false);
    const [jobPosition,setJobPosition]=useState()
    const [jobExperience,setJobExperience]=useState()
    const [jobDescription,setJobDescription]=useState()
    const [jsonResponse , setJsonResponse] = useState([])

    const route = useRouter();
    const {user} = useUser();

    const onsubmitForm=async (e)=>{
        e.preventDefault();
        setLoading(true)
        const InputPrompt="Job position: "+jobPosition+ ", Job Description: "+jobDescription+", Year of Experience: "+jobExperience+". Depends on the information please give me "+process.env.NEXT_PUBLIC_QUESTION_COUNT+" interview asked questions with proper answers in JSON Format. Give question and answers as field in JSON."

        const result = await chatSession.sendMessage(InputPrompt);
        const MockJSONres = (result.response.text()).replace('```json','').replace('```','')
        //console.log(JSON.parse(MockJSONres));
        setJsonResponse(MockJSONres)

        if(MockJSONres){

          const res = await db.insert(MockInterview).values({
            mockId:uuidv4(),
            jsonMockResp:MockJSONres,
            jobPosition:jobPosition,
            jobDescription:jobDescription,
            jobExperience:jobExperience,
            createdBy:user?.primaryEmailAddress?.emailAddress,
            createdAt:moment().format('DD-MM-YYYY'),
          }).returning({mockId: MockInterview.mockId});
  
          //console.log("Inserted Mock Id: ",res);

          if(res){
            setOpen(false);
            route.push(`/dashboard/interview/${res[0]?.mockId}`)
          }
        }
        
        setLoading(false)
        setOpen(false);
        
    }
  return (
    <div>
      <div
        className="p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all flex flex-col items-center justify-between"
        onClick={() =>{
          setOpen(true)
        setLoading(false) }}
      >
        <h2 className="font-bold text-lg text-center">+ Add New</h2>
        <p className="text-xs flex items-center gap-1"><BadgeAlert className="text-sm text-red-600 w-5"/> Here you can attend interview as per your Job Role</p>
      </div>

      <Dialog open={open} onOpenChange={() => setOpen(!open)}>
        <DialogContent className="sm:max-w-[425px] md:max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              Hey! Tell us more about your job interview
            </DialogTitle>
            <DialogDescription>
              Put all details about your job poisition/role
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={onsubmitForm}>

          <div className="grid gap-4 py-4">
            <div className="flex flex-col items-start gap-4">
              <Label htmlFor="jobPosition" className="text-gray-700">
                Job Role/Position
              </Label>
              <Input
                id="jobPosition"
                placeholder="Ex. FullStack Dev, Frontend Engineer"
                className="col-span-3"
                required
                onChange={(e)=>setJobPosition(e.target.value)}
              />
            </div>
            <div className="flex flex-col items-start gap-4">
              <Label htmlFor="jobDescription" className="text-right">
                Job Description
              </Label>
              <Textarea placeholder="Write a details about your tech stack" required onChange={(e)=>setJobDescription(e.target.value)}/>
            </div>
            <div className="flex flex-col items-start gap-4">
              <Label htmlFor="jobExperience" className="text-gray-700">
                Job Experience
              </Label>
              <Input
                id="jobExperience"
                placeholder="Ex. 1 year"
                className="col-span-3"
                type="number"
                required
                max='50'
                onChange={(e)=>setJobExperience(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter className="mt-5">
            <Button type="submit" className="bg-primary text-white outline-none border-none hover:text-white flex" disabled={loading}>
              {loading ? 
              <>
              <LoaderCircle className="animate-spin"/> Preparing...
              </>:"Start Interview"}
            </Button>
            <Button
                type="button"
                onClick={() => setOpen(false)}
                className="inline-block rounded-md px-4 py-2 text-sm text-gray-500 hover:text-gray-700 focus:relative"
            >
              Cancel
            </Button>
          </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddNewInterview;
