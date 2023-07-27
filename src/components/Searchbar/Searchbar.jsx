import { Component } from "react";
import { SearchbarHeader, SearchbarForm, SearchbarButton, SearchbarInput } from "./Searchbar-style"
import PropTypes from 'prop-types';


export class Searchbar extends Component   {
   
    state = {
    value:'',
}

      handleChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    });
  };

    render() {
        return(
            <SearchbarHeader className="searchbar">
                <SearchbarForm  onSubmit={this.props.handleSubmit}>
                    <SearchbarButton type="submit" className="button"></SearchbarButton>
     
                    <SearchbarInput
                        className="input"
                        name="value"
                        type="text"
                        autoComplete="off"
                        autoFocus
                        placeholder="Search images and photos"
                        onChange={this.handleChange}
                        value={this.state.value}
                  
                    />
                </SearchbarForm>
            </SearchbarHeader>
        )
   }
   
}


Searchbar.propTypes = {
    handleSubmit: PropTypes.func.isRequired
}