import React from 'react'
import Button from 'react-bootstrap/Button'

const RatingButton = ({recommend, userRecommended, setUserRecommended, userSeenMovie}) => {
    const symbol = recommend ? <i className="fas fa-thumbs-up"></i> : <i className="fas fa-thumbs-down"></i>
    const text = recommend ? "Check it Out" : "Don't Bother"

    const returnVariant = (recommend, userRecommended) => {
        if(userRecommended === null){
            return 'outline-secondary'
        }

        if(userRecommended){
            if(recommend){
                return 'secondary'
            }
            return 'outline-secondary'
        }

        if(!userRecommended){
            if(recommend){
                return 'outline-secondary'
            }
            return 'secondary'
        }
    }

    const variant = returnVariant(recommend, userRecommended)

    const handleClick = () => {
        if(recommend) {
            setUserRecommended(true)
        } else {
            setUserRecommended(false)
        }
    }

    return(
        <Button 
            size="sm" 
            variant={variant} 
            className="mr-2"
            onClick = { handleClick }
            disabled={!userSeenMovie}
        >
            { symbol } { text }
        </Button>
    )
}

export default RatingButton