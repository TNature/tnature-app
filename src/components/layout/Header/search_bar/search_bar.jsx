import React, { useState, useRef, useEffect } from 'react'
import styles from './search_bar.module.scss'
import { Search } from 'react-bootstrap-icons'
import { useRouter } from 'next/router'
import { useData } from '@/context/DataContext'
import Link from 'next/link'

const Searchbar = () => {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const router = useRouter();
  const { products } = useData();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = () => {
    if (query.trim()) {
      setIsFocused(false);
      router.push(`/shop?search=${encodeURIComponent(query)}`);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const filteredProducts = products ? products.filter(p => p.name.toLowerCase().includes(query.toLowerCase())).slice(0, 5) : [];

  return (
    <div className={styles.SearchWrapper} ref={dropdownRef}>
      <div className={styles.Searchbar}>
          <input
            placeholder={'What are you looking for?'}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
          />
          <div onClick={handleSearch} style={{ cursor: 'pointer' }}>
              <Search />
          </div>
      </div>
      
      {isFocused && query.trim() !== "" && (
        <div className={styles.Dropdown}>
          {filteredProducts.length > 0 ? (
            filteredProducts.map(product => (
              <Link key={product.id} href={`/product/${product.id}`} className={styles.DropdownItem} onClick={() => setIsFocused(false)}>
                {product.image ? <img src={product.image} alt={product.name} width="40" height="40" /> : <div style={{width: 40, height: 40, backgroundColor: '#eee', borderRadius: '4px'}} />}
                <div className={styles.Details}>
                  <span className={styles.Name}>{product.name}</span>
                  <span className={styles.Price}>₹{product.price}</span>
                </div>
              </Link>
            ))
          ) : (
            <div className={styles.NoResults}>No products found</div>
          )}
        </div>
      )}
    </div>
  )
}

export default Searchbar
