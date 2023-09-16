import React, { useState } from 'react';
import { Container, Grow, Grid , Paper , AppBar, TextField , Button} from '@material-ui/core';
import { useDispatch} from 'react-redux';
import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import useStyle from './styles' ; 
// import { getPosts } from '../../actions/posts';
import Pagination from '../Pagination' ; 
import {useHistory , useLocation} from 'react-router-dom' ; 
import ChipInput from 'material-ui-chip-input' ; 
import { getPostBySearch  } from '../../actions/posts';


// FUNCDING PARAMS IN THE WEBSITE 
function useQuery() 
{
  return new URLSearchParams(useLocation().search) ; 
}

export default function Home() {

  const classes = useStyle() ; 
  const dispatch = useDispatch() ; 
  const history = useHistory() ;
  const query = useQuery()  ; 


  const [currentId , setCurrentId ] = useState(null) ;
  const [search , setSearch] = useState('') ; 
  const [tags , setTags] = useState([]) ;

  // QUERY SE PAGE KI VALUE NIKALEGA, NI TO 1 
  const page = query.get('page') || 1 ; 
  const searchQuery = query.get('searchQuery');


  // FUNCTION OF SEARCH POST 
  const searchPost = () => {


    // AGAR HUMKO SERCH YAA TAGS DALE HO TO 
    // TAGS MAI ARRAY NI SEND KARNGE , UNKI JAON KAR DENGE WITH , . 
    if(search.trim() || tags)
    {
       dispatch(getPostBySearch({search , tags:tags.join(',')})) ;
       
       history.push(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`)

    } else {
      history.push('/posts') ; 
    }
  }

  // FUNCTION OF HANDLE KEY PRESS 
  const handleKeyPress = (e) => 
  {
    if(e.keyCode === 13)
      searchPost() ; 
  }

  // ADD AND DELETE OF TAGS ( CHIP INPUT)
  const handleAddChip = (tag) => {setTags([...tags , tag])} ; 
  const handleDeleteChip = (tagToDelete) => {setTags(tags.filter((tag) => tag !== tagToDelete))}

  return (

    <Grow in>
          <Container maxWidth="xl">

            <Grid container justifyContent="space-between" alignItems="stretch" spacing={3} className={classes.gridContainer}>

              {/* SHOW ALL THE POSTS */}
              <Grid item xs={12} sm={6} md={9}>
                <Posts setCurrentId={setCurrentId} />
              </Grid>

              {/* TO SHOW FORM */}
              <Grid item xs={12} sm={6} md={3}>

                {/* FOR THE SEARCH FORM */}
                <AppBar position="static" color="inherit" className={classes.Search}>

                  <TextField name="search" variant="outlined" label="Search Memories" fullWidth value={search} onChange={(e) => setSearch(e.target.value)} onKeyDown={handleKeyPress}/>

                  <ChipInput value={tags} onAdd={(chip) => handleAddChip(chip)} onDelete={(chip) => handleDeleteChip(chip)} label="Search Tags" variant="outlined" style={{margin : '10px 0'}} /> 

                  <Button onClick={searchPost} variant="contained" color="primary" className={classes.searchButton}> Search</Button>
                </AppBar>

                {/* FOR THE CREATION FORM */}
                <Form setCurrentId={setCurrentId} currentId={currentId}/>

                {/* PAGINATION  */}
                {(! searchQuery && !tags.length) && (
                <Paper className={classes.pagination} elevation={6}>
                    <Pagination page={page}/>
                </Paper>
                 )}

              </Grid>

            </Grid>
          </Container>
      </Grow>
  )
}
