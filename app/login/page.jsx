'use client';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'

const Login = () => {
  const { register, handleSubmit, errors } = useForm()
  const [error, setError] = useState('')

  const onSubmit = async (data) => {
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>
        Email:
        <input type="email" name="email"/>
      </label>
      <br />
      <label>
        Password:
        <input type="password" name="password"/>
      </label>
      <br />
      <button type="submit">Log In</button>
    </form>
  )
}

export default Login
