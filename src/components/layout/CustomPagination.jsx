import React, { useEffect, useState } from 'react'
import Pagination from 'react-js-pagination';
import { useNavigate, useSearchParams } from 'react-router-dom'

const CustomPagination = ({resPerPage,filteredProductsCount}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate();
    let [searchParams] = useSearchParams();
    const page = Number(searchParams.get('page')) || 1;
    useEffect(()=>{
        setCurrentPage(page);
    },[page]);
    const setCurrentPageNo=(pageNumber)=>{
      setCurrentPage(pageNumber);
      if(searchParams.has('page')){
        searchParams.set('page',pageNumber)
      }else{
        searchParams.append('page',pageNumber)

      }
      const path = window.location.pathname + '?' + searchParams.toString()
      navigate(path)
    }
  return (
        <div className='d-flex justify-content-center mt-5'>
        {filteredProductsCount > resPerPage && (
          <Pagination
          activePage={currentPage}
          itemsCountPerPage={resPerPage}
          totalItemsCount={filteredProductsCount}
          onChange={setCurrentPageNo}
          nextPageText={'Next'}
          prevPageText={'Prev'}
          firstPageText={'First'}
          lastPageText={'Last'}
          itemClass='page-item'
          linkClass='page-link'
        />
    )}
  </div>
  )
}


export default CustomPagination
