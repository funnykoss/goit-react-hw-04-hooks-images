
import { Component } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import s from "./Searchbar.module.css";


export default class Searchbar extends Component{
    state = {
       searchInput:'',
    }
    handlerSubmit = event => {
          
        event.preventDefault();
      
        if (this.state.searchInput.trim() === ''){
            return toast.error('введите запрос')
        }
        this.props.onSubmit(this.state.searchInput)
        this.setState({searchInput:''})
    }

    handlerOnChange = event => {
      this.setState({ searchInput: event.currentTarget.value.toLowerCase() })   
    }
  render() {
    return (
      <header className={s.Searchbar}>
      <form onSubmit={ this.handlerSubmit }
      className={s.SearchForm}>
    <button type="submit" className={s.SearchFormButton}>
      <span className={s.SearchFormButtonLabel}>Search</span>
    </button>

    <input
      className={s.SearchFormInput}
      type="text"
      autoComplete="off"
      autoFocus
      placeholder="Search images and photos"
      value={this.state.searchInput}
      onChange={this.handlerOnChange}
    />
  </form>
</header>
    )
}
}






