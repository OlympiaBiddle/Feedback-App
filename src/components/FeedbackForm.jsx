import React from "react"
import {useState, useContext, useEffect} from 'react'
import Card from "./shared/Card"
import Button from './Button'
import RatingSelect from './RatingSelect'
import FeedbackContext from "../context/FeedbackContext"

function FeedbackForm() {
    const [text, setText] = useState('')
    //ratings
    const [rating, setRating] = useState('10')
    //disable submit button until user enter 10 characters minimum
    const [btnDisabled, setBtnDisabled] = useState(true)
    const [message, setMessage] = useState('')

    const { addFeedback, feedbackEdit, updateFeedback } = useContext(FeedbackContext)
    
    useEffect(() => {
        if (feedbackEdit.edit === true) {
          setBtnDisabled(false)
          setText(feedbackEdit.item.text)
          setRating(feedbackEdit.item.rating)
        }
      }, [feedbackEdit])


    const handleTextChange =(e) =>{
        if(text===''){
            setBtnDisabled(true)
            setMessage(null)
        } else if(text !=='' && text.trim().length <= 10){
            setBtnDisabled(true)
            setMessage("Text must be at least 10 characters")
            } else {
                setMessage(null)
                setBtnDisabled(false)
                }

        setText(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if(text.trim().length > 10){
            const newFeedback = {
                text,
                rating
            }

            if(feedbackEdit.edit === true){
                updateFeedback(feedbackEdit.item.id, newFeedback)
            } else{
                addFeedback(newFeedback)
            }
            setText('')
        }
    }

  return (
    <Card>
        <form onSubmit = {handleSubmit}>
            <h2>How would your rate your service with us?</h2>
            {/* @todo - rating select component*/}
            <RatingSelect select ={(rating) => setRating(rating)}/>
            <div className="input-group">
                <input 
                    onChange = {handleTextChange}
                    type="text"
                    placeholder="Write a review"
                  />
                <Button type="submit" isDisabled = {btnDisabled} version = "secondary">Send</Button>
            </div>
            {/*message to be displayed when user fails to enter 10 characters*/}
            {message && <div className="message">{message}</div>}
        </form>
    </Card>
  )
}

export default FeedbackForm