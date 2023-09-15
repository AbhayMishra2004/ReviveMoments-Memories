import React, { useEffect, useRef, useState } from 'react';
import useStyle from './styles';
import { Pagination, PaginationItem } from '@material-ui/lab';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux' ;
import { getPosts } from '../actions/posts'; 

const Paginate = ({page}) => {

    const dispatch = useDispatch() ; 

    // STATE KE POSTS SE NUMBER OF PAGES NIKAL LIYE . 
    const { numberOfPages} = useSelector((state) =>state.posts) ; 

    // DISPATCH GET POST 
    // JAB BHI UPDATE KARENGE CURRENT ID CHANGE HOGI , THEN HUM GET POST KARENGE .

    /******************************* IMPORTANT ************************************/
    // ISKI VAJAH SE CREATOR BY POST FUNCTION KAAM NI KAR RA , YE IMMEDIATLY GET POSTS KO DISPATCH KAR DETA HAI . 
    useEffect(() => {
        console.log("mai aaya hu") ; 
        if(page)
            dispatch(getPosts(page));
    }, [page]) 

    const classes = useStyle();

    return (
        <Pagination
            classes={{ ul: classes.ul }}
            count={numberOfPages}
            page={Number(page) || 1}
            variant="outlined"
            color="primary"
            renderItem={(item) => (
                <PaginationItem {...item} component={Link} to={`/posts?page=${item.page}`} />
            )}
        />
    );
};

export default Paginate;
