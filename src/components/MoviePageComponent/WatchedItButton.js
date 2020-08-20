import React from 'react'
import Button from 'react-bootstrap/Button'

const WatchedItButton = ({userSeenMovie, setUserSeenMovie, inUserWatchList, setInUserWatchList}) => {
    const variant = userSeenMovie ? 'primary' : 'outline-primary'

    const handleClick = () => {
        setUserSeenMovie(!userSeenMovie)
        if(inUserWatchList && !userSeenMovie){
            setInUserWatchList(false)
        }
    }

    return(
        <Button
            variant={variant}
            size="sm"
            className="mr-2"
            onClick={ handleClick }
        >
            <i className="fas fa-eye"></i> Watched It
        </Button>
    )
}

export default WatchedItButton