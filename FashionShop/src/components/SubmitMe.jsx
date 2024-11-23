import React from 'react'
import { useNavigation } from 'react-router-dom'

const SubmitMe = ({text}) => {
    const navigation = useNavigation();
    console.log("navigation",navigation);
    
    const isSubmitting = navigation.state === "submitting";
  return (
    <div>
        <button
        type='submit'
        className='btn btn-outline w-full'
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