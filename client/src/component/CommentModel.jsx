import axios from 'axios'
import React, { useState } from 'react'

function CommentModel({onClose, name, description, id }) {
    const [comment, setComment] = useState('')
    const sendComment = ()=>{
        if(comment != ''){
            axios.put(`https://univ-tasks.onrender.com/api/v1/tasks/reviews/${id}`,{
                review:comment
            }).then(res=>{
                console.log(res);
                setComment('')
            }).catch(err=>console.log(err))
        }
    }
    const handleComment = (event)=>{
        setComment(event.target.value)
    }
    return (
        <div className='modee__comment task__name'>
            <div>
                <div>{name} {description}</div>
                <input type='text' placeholder='Enter Comment' value={comment} onChange={(event)=>handleComment(event)} />
                <button type='submit' onClick={()=>sendComment()}>Send</button>
            </div>
            <div>
                <button onClick= {onClose}>X</button>
            </div>
        </div>
    )
}

export default CommentModel
