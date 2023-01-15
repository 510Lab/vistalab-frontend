"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { BsFillPlusCircleFill } from "react-icons/bs";

function UploadCard({ setIsUpload, project_id, cycle_id }) {
  const { data: session } = useSession();
  const router = useRouter();

  const [isSubmit, setIsSubmit] = useState(false);
  const [processingMsg, setProcessingMsg] = useState("Processing...");

  const [form, setForm] = useState({ id: project_id, cycle: cycle_id, work: "", plan: "", remark: "" });
  const onUpdateInput = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmit(true);
    setProcessingMsg("Processing...");
    for (const item of Object.keys(form)) {
      if (form[item] === "" && item !== "remark") {
        setProcessingMsg("表单中有未填项");
        console.error("表单中有未填项");
        return;
      }
    }
    fetch(`${process.env.BACKEND_URL}project/submit`, {
      method: "POST",
      body: new URLSearchParams(form),
      headers: { "Content-Type": "application/x-www-form-urlencoded", Authorization: session.user.token },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status) {
          setProcessingMsg("添加成功");
        } else {
          setProcessingMsg(data.message);
          console.error(data.message);
        }
      })
      .catch((error) => {
        setProcessingMsg("添加失败");
        console.error(error);
      });
  };

  return (
    <div className='frame fixed top-0 left-0 w-screen h-screen bg-black/20 flex items-center justify-center'>
      {isSubmit ? (
        <div className='flex flex-col items-center justify-center gap-4 bg-white p-5 rounded-md'>
          <h1 className='title text-3xl'>{processingMsg}</h1>
          {processingMsg !== "Processing..." && (
            <button
              onClick={() => {
                setIsSubmit(false);
                setIsUpload(false);
                router.refresh();
              }}
              className='btn px-2 py-1'
            >
              确认
            </button>
          )}
        </div>
      ) : (
        <div className='w-full max-w-xs bg-white p-5 rounded-md flex flex-col items-center gap-2'>
          <h1 className='title text-2xl w-fit'>添加进度</h1>
          <form onSubmit={handleSubmit} className='flex flex-col gap-2 w-full'>
            <div className='flex flex-col w-full'>
              <label htmlFor='work' className='text-slate-800'>
                本周期工作
              </label>
              <textarea
                required
                type='text'
                maxLength={200}
                name='work'
                value={form.work}
                onChange={onUpdateInput}
                className='bg-gray-100 rounded-md p-2 outline-none'
              />
            </div>

            <div className='flex flex-col w-full'>
              <label htmlFor='plan' className='text-slate-800'>
                下周期计划
              </label>
              <textarea
                required
                type='number'
                name='plan'
                maxLength={200}
                value={form.plan}
                onChange={onUpdateInput}
                className='bg-gray-100 rounded-md p-2 outline-none'
              />
            </div>

            <div className='flex flex-col w-full'>
              <label htmlFor='remark' className='text-slate-800'>
                备注与意见
              </label>
              <textarea
                type='date'
                name='remark'
                maxLength={200}
                value={form.remark}
                onChange={onUpdateInput}
                className='bg-gray-100 rounded-md p-2 outline-none'
              />
            </div>

            <div className='w-full gap-2 flex flex-row items-center justify-between'>
              <button type='button' onClick={() => setIsUpload(false)} className='w-full btn py-2 px-2'>
                取消
              </button>
              <button type='submit' className='w-full btn py-2 px-2'>
                添加
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default function UploadCycle({ project_id, cycle_id }) {
  const { data: session } = useSession();
  const [isUpload, setIsUpload] = useState(false);

  return (
    <>
      {session && (
        <button
          onClick={() => setIsUpload(true)}
          className='flex flex-row items-center gap-1 text-gray-600 font-bold hover:text-gray-800'
        >
          <BsFillPlusCircleFill />
        </button>
      )}
      {isUpload && <UploadCard setIsUpload={setIsUpload} project_id={project_id} cycle_id={cycle_id} />}
    </>
  );
}
