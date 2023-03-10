"use client";

import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react";

import { useStateContext } from "../../Provider/Provider";

export default function Login() {
  const { data: session } = useSession();
  const { avatarUrl } = useStateContext();

  if (session) {
    return (
      <div className='w-full flex flex-col gap-1 items-center'>
        <Image
          width={240}
          height={240}
          src={avatarUrl}
          alt='avatar'
          className='w-10 h-10 object-cover object-center rounded-full cursor-pointer'
        />
        <h1 className='text-gray-700 text-xl'>Hello, {session.user.nickname}</h1>
        <button type='button' onClick={() => signOut()} className='btn w-full py-2 text-xl'>
          退出
        </button>
      </div>
    );
  }

  return (
    <button type='button' onClick={() => signIn()} className='btn w-full p-3 text-xl'>
      登录
    </button>
  );
}
