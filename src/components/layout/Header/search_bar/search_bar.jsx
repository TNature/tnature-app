import React from 'react'
import styles from './search_bar.module.scss'
import { Search } from 'react-bootstrap-icons'

const Searchbar = () => {
  return (
    <div className={styles.Searchbar}>
      
        <input
        placeholder={'What are you looking for?'}
        />
        <div>
            <Search
            
            />
        </div>
      
    </div>
  )
}

export default Searchbar
