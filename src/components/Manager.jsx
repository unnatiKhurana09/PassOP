import React, { useEffect } from 'react'
import { useRef } from 'react';
import { useState } from 'react';
import {v4 as uuidv4} from 'uuid';

const Manager = () => {
    const ref = useRef()
    const passwordRef = useRef()
    const [form, setform] = useState({ site: "", username: "", password: "" });
    const [passwordArray, setPasswordArray] = useState([])

    useEffect(() => {
        let passwords = localStorage.getItem("passwords");
        if (passwords) {
            setPasswordArray(JSON.parse(passwords))
        }
    }, [])

    const showPassword = () => {
        passwordRef.current.type = "text"
        console.log(ref.current.src);
        if (ref.current.src.includes('/crosseye.jpg')) {
            ref.current.src = './eye.png'
            passwordRef.current.type = "password"
        } else {
            ref.current.src = './crosseye.jpg'
            passwordRef.current.type = "text"
        }
    }

    const savePassword = () => {
        if(form.site.length!=0 && form.username.length!=0 && form.password.length!=0){
            setform({ site: "", username: "", password: "" })
            setPasswordArray([...passwordArray, {...form, id: uuidv4()}])
            localStorage.setItem("passwords", JSON.stringify([...passwordArray, {...form, id: uuidv4()}]))
            console.log([...passwordArray, form])
        }
    }

    const deletePassword = (id) => {
        let c = confirm("Do you really want to delete this password?")
        if(c){
            setPasswordArray(passwordArray.filter(item=>item.id!==id))
            localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item=>item.id!==id)))
        }
    }

    const editPassword = (id) => {
        setform(passwordArray.filter(item=>item.id===id)[0])
        setPasswordArray(passwordArray.filter(item=>item.id!==id))
    }

    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }

    return (
        <>
            <div className="absolute inset-0 -z-10 h-full w-full bg-green bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"><div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-500 opacity-20 blur-[110px]"></div></div>

            <div className="md:mycontainer">
                <h1 className='text-4xl font-bold text-center'>
                    <span className="text-green-600">&lt;</span>
                    <span>Pass</span>
                    <span className="text-green-600">OP/&gt;</span>
                </h1>
                <p className='text-green-800 text-center text-lg'>Your own Password Manager</p>

                <div className=" flex flex-col p-4 gap-6 justify-center items-center">
                    <input value={form.site} onChange={handleChange} placeholder="Enter website URL" type="text" className='rounded-full border border-green-600 border-2 w-full text-black px-4 py-1' name='site' id='site'/>

                    <div className="flex flex-col md:flex-row w-full justify-between gap-6 ">
                        <input value={form.username} onChange={handleChange} placeholder="Enter Username" type="text" className='rounded-full border border-green-600 border-2 w-full text-black px-4 py-1' name='username' id='username'/>

                        <div className="relative">
                            <input value={form.password} onChange={handleChange} placeholder='Enter Password' type="password" className='rounded-full border border-green-600 border-2 w-full text-black px-4 py-1' name='password' ref={passwordRef} id='password'/>
                            <span className="absolute right-1 top-1 cursor-pointer" onClick={showPassword}>
                                <img ref={ref} className="p-1" width={30} src="./eye.png" alt="" />
                            </span>
                        </div>
                    </div>

                    <button className='flex justify-center items-center bg-green-500 hover:bg-green-400 rounded-full px-4 py-2 w-fit gap-2 border border-green-900 border-2' onClick={savePassword}>
                        <lord-icon
                            src="https://cdn.lordicon.com/jgnvfzqg.json"
                            trigger="hover">
                        </lord-icon>
                        Add Password
                    </button>
                </div>
                <div className="passwords">
                    <h2 className='font-bold py-2 text-2xl'>Your Passwords</h2>

                    {passwordArray.length === 0 && <div> No passwords to show</div>}
                    {passwordArray.length != 0 &&

                        <table className="table-auto w-full overflow-hidden rounded-xl mb-4">
                            <thead className='bg-green-600 text-white'>
                                <tr>
                                    <th className='py-2 px-2'>Site</th>
                                    <th className='py-2 px-2'>Username</th>
                                    <th className='py-2 px-2'>Password</th>
                                    <th className='py-2 px-2'>Actions</th>
                                </tr>
                            </thead>
                            <tbody className='bg-green-200'>
                                {passwordArray.map((item, index) => {
                                    return <tr key={index}>
                                        <td className='py- border border-white text-center px-2 w-32'><a href={item.site} target='_blank'>{item.site}</a></td>
                                        <td className='py-1 border border-white text-center w-32 px-2'>{item.username}</td>
                                        <td className='py-1 border border-white text-center w-32 px-2'>{item.password}</td>
                                        <td className='py-1 border border-white text-center w-32 px-2'>
                                            <span className='cursor-pointer mx-2' onClick={() => {deletePassword(item.id)}}>
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/skkahier.json"
                                                    trigger="hover"
                                                    style={{ "width": "22px", "height": "22px" }}>
                                                </lord-icon>
                                            </span>
                                            <span className='cursor-pointer mx-2' onClick={() => {editPassword(item.id)}}>
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/ifsxxxte.json"
                                                    trigger="hover"
                                                    style={{ "width": "22px", "height": "22px" }}>
                                                </lord-icon>
                                            </span>
                                        </td>
                                    </tr>
                                })}
                            </tbody>
                        </table>}
                </div>
            </div>
        </>
    )
}

export default Manager
