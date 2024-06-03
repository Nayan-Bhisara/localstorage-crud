import React, { useState } from 'react'
import './crud.css'

const Crud = () => {

    const [name,setName] = useState("")
    const [phone,setPhone] = useState("")
    let datas = localStorage.getItem("users") ? JSON.parse(localStorage.getItem("users")) : []
    const [record,setRecord] = useState(datas)
    const [status,setStatus] = useState("deactive")
    const [mdelet,setMdelet] = useState([])
    const [mstatus,setMstatus] = useState([])
    const [edit,setEdit] = useState("")


    const handlesubmit = (e) =>{
        e.preventDefault();

        if(!name || !phone){
            alert("All fild are required..")
            return false
        }

        let obj = {
            id : Date.now(),name,phone,status
        }

        if(edit){
            let all = [...record]
            let eup = all.map((val) => {
                if(val.id == edit){
                    return {
                        ...val,
                        name : name,
                        phone : phone,
                    }
                }
                return val
            })
            setRecord(eup)
            localStorage.setItem("users",JSON.stringify(eup))
            setEdit("")
        }else{
            let newlist = [...record,obj]
            localStorage.setItem("users",JSON.stringify(newlist))
            setRecord(newlist)
        }
        setName("")
        setPhone("")
    }

    const dataEdit = (id) => {
        let all = [...record]
        let editdata = all.find(val => val.id == id)
        setEdit(id)
        setName(editdata.name)
        setPhone(editdata.phone)
    }

    const dataDelet =(id)=>{
        let dd = record.filter(item => item.id != id)

        localStorage.setItem("users",JSON.stringify(dd))
        setRecord(dd)
    }

    const dataStatus = (id,status)=>{
        if(status === "deactive"){
            let dstatus = record.map((val)=>{
                if(val.id == id){
                    val.status = "active"
                }
                return val;
            })
            localStorage.setItem("users",JSON.stringify(dstatus))
            setRecord(dstatus)
        }else{
            let dstatus = record.map((val)=>{
                if(val.id == id){
                    val.status = "deactive"
                }
                return val;
            })
            localStorage.setItem("users",JSON.stringify(dstatus))
            setRecord(dstatus)
        }
    }


    const handleChangedelet=(id,checked)=>{
        let all2 = [...mdelet]
        if(checked){
            all2.push(id)
        }else{
            all2 = all2.filter(val => val != id)
        }
        setMdelet(all2)
    }

    const multipleDlet=()=>{
        if(mdelet.length > 0){
            let d2 = record.filter(val => !mdelet.includes(val.id))
            localStorage.setItem("users",JSON.stringify(d2))
            setRecord(d2)
        }
    }

    // Status edit

    const handleChangestatus = (id,checked) => {
        let all = [...mstatus]
        if(checked){
            all.push(id)
        }else{
            all = all.filter(val => val !=id)
        }
        setMstatus(all)
    }

    const multipleStatusedit = () => {
        let multipleStatusedit = record.map((val) => {
            if(mstatus.includes(val.id)){
                if(val.status === "active"){
                    val.status = "deactive"
                }else{
                    val.status = "active"
                }
            }
            return val
        })
        localStorage.setItem("users",JSON.stringify(multipleStatusedit))
        setMdelet(multipleStatusedit)
        setMstatus([])
    }

  return (
    <div align="center" className='main'>
        <h1>:: Add User Data ::</h1>
        <form onSubmit={handlesubmit} className='form'><br/>
            Name : {""}<input type='text' placeholder='Enter Youre Name' onChange={(e)=>setName(e.target.value)} value={name}></input><br/><br/>
            Phone : {""}<input type='number' placeholder='Enter Youre Phone' onChange={(e)=>setPhone(e.target.value)} value={phone}></input><br/><br/>
            <input className='btn' type='submit'></input>
        </form>

        <h1>:: View User Data ::</h1>
        <table>
            <thead>
                <tr>
                    <td>Id</td>
                    <td>Name</td>
                    <td>Phone</td>
                    <td>Status</td>
                    <td>Action</td>
                    <td><button className='mdbtn' onClick={()=>multipleDlet()}>Delet</button></td>
                    <td>
                        <button className='mdbtn' onClick={()=>multipleStatusedit()}>Status Edit</button>
                    </td>
                </tr>
            </thead>
            <tbody>
                {
                    record.map((val)=>{
                        return(
                            <tr key={val.id}>
                                <td>{val.id}</td>
                                <td>{val.name}</td>
                                <td>{val.phone}</td>
                                <td>
                                    {
                                        val.status === "deactive" ? (
                                            <button className='btn' style={{color:"#ed5650",cursor:"pointer",}} onClick={()=> dataStatus(val.id,val.status)}>{val.status}</button>
                                        ) : (
                                            <button className='btn' style={{color:"green",cursor:"pointer",}} onClick={()=> dataStatus(val.id,val.status)}>{val.status}</button>
                                        )
                                    }
                                </td>
                                <td>
                                    <button className='btn' style={{color:"black",cursor:"pointer"}} onClick={()=> dataDelet(val.id)}>Delet</button>
                                    <button className='btn' style={{color:"black",cursor:"pointer"}} onClick={()=> dataEdit(val.id)}>Edit</button>
                                </td>
                                <td><input type="checkbox" onChange={(e)=>handleChangedelet(val.id,e.target.checked)}/></td>
                                <td><input type="checkbox" checked={mstatus.includes(val.id)} onChange={(e)=>handleChangestatus(val.id,e.target.checked)}/></td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    </div>

)
}

export default Crud
