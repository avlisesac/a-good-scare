import React from 'react'

import Button from 'react-bootstrap/Button'

const WatchListButton = ({inUserWatchList, setInUserWatchList}) => {
    const variant = inUserWatchList ? 'primary' : 'outline-primary'

    const handleClick = () => {
        setInUserWatchList(!inUserWatchList)
    }

    return(
        <Button 
            variant={variant} 
            size="sm"
            onClick = {handleClick}
        >
            <i className="fas fa-list"></i> Want to Watch
        </Button>
    )
}

export default WatchListButton