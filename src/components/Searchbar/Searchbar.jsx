import {  useState } from "react";
import { SearchbarHeader, SearchbarForm, SearchbarButton, SearchbarInput } from "./Searchbar-style"
import PropTypes from 'prop-types';


export const Searchbar = ({handleSubmit}) => {
   

const [value, setValue] = useState('')
    
    
const handleChange = ({ target : {name , value}}) => {
  if (name === 'value') setValue(value)
};


    return(
        <SearchbarHeader className="searchbar">
            <SearchbarForm  onSubmit={handleSubmit}>
                <SearchbarButton type="submit" className="button"></SearchbarButton>

                <SearchbarInput
                    className="input"
                    name="value"
                    type="text"
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                    onChange={handleChange}
                    value={value}
                
                />
            </SearchbarForm>
        </SearchbarHeader>
    )
}
   



Searchbar.propTypes = {
    handleSubmit: PropTypes.func.isRequired
}