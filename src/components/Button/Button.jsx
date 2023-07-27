import { ButtonLoadMore } from "./Button-style"
import PropTypes from 'prop-types';


export const Button = ({ handleClick }) => {
    return (
        <>
            <ButtonLoadMore type="button" onClick={handleClick}>Load More</ButtonLoadMore>
        </>
    )
}


Button.propTypes = {
    handleClick: PropTypes.func.isRequired,
}