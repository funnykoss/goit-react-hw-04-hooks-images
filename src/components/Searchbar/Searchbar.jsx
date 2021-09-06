
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import s from "./Searchbar.module.css";


export default function Searchbar (props){
  const [searchInput, setSearchInput] = useState('');
    const handlerSubmit = event => {
          
        event.preventDefault();
      
        if (searchInput.trim() === ''){
            return toast.error('введите запрос')
        }
        props.onSubmit(searchInput)
        setSearchInput('')
    }

   const  handlerOnChange = event => {
      setSearchInput(event.currentTarget.value.toLowerCase() )   
    }
    return (
      <header className={s.Searchbar}>
      <form onSubmit={ handlerSubmit }
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
      value={searchInput}
      onChange={handlerOnChange}
    />
  </form>
</header>
    )
}







