import React from 'react'
import { useNavigation } from 'react-router-dom'

const SubmitMe = ({text}) => {
    const navigation = useNavigation();
    const isSubmitting = navigation.state === "submitting";
  return (
    <div>
        <button
        type='submit'
        className='btn btn-primary btn-block'
        disabled = {isSubmitting}
        >
        {
            isSubmitting?(
                <>
                    <span className='loading loading-spinner'></span>
                    sending...
                </>
            ) : (
                text || "submit"
            )
        }

        </button>
    </div>
  )
}

export default SubmitMe