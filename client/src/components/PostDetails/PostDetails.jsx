import React , {useEffect} from 'react' ; 
import { Paper, Typography, CircularProgress ,Divider} from '@material-ui/core/';
import {useDispatch , useSelector} from 'react-redux' 
import moment from 'moment' ; 
import {useParams, useHistory, Link} from 'react-router-dom' ; 
import { getPost, getPostBySearch, getPostsByCreator } from '../../actions/posts' ; 
import useStyles from './styles' ; 
import CommentSection from './CommentSection';


export default function PostDetails() {

    const defaultImage = 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'; 
    const classes = useStyles() ;
    const dispatch = useDispatch() ; 
    const history = useHistory() ; 

    const {post , posts , isLoading} = useSelector((state) => state.posts) ;
    const {id} = useParams() ; 

    // GET POST BY ID 
    useEffect(() => {
        dispatch(getPost(id)) ; 
    } , [id , dispatch]) ;   // dispatch warning hatane ke liye 

    
    // SEARCH BY TAGS TO RECOMMENT POSTS 
    useEffect(() => {
        if (post) { 
            dispatch(getPostBySearch({ search: 'none', tags: post?.tags.join(',') }));
        }
    }, [post, dispatch]); // dispatch warning hatane ke liye 

    // FOR OPEN THE RECOMMEND POST 
    const openPost = (id) => history.push(`/posts/${id}`) ; 

    // IF THEIR IS NO POST 
    if(! post) return null ; 

    // IF LOADING 
    if(isLoading)
    {
        return (
            <Paper elevation={6} className={classes.loadingPaper}>
                <CircularProgress size="7em" />
            </Paper>
        )
    }

    // RECOMMEND POSTS MAI CURRENT POST NAHI AANA CHAIYE 
    const recommendedPosts = posts?.filter(({ _id }) => _id !== post._id);

    // // CREATOR POSTS HANDLER 
    const creatorPostsHandler = async () =>
    {
        const creatorId = post.creator ; 
        dispatch(getPostsByCreator(creatorId , history)) ; 
    }


    console.log(recommendedPosts) ; 

  return (

      <Paper elevation={6} className={classes.mainCard}>

        <div className={classes.card}>

              <div className={classes.section}>

                {/* TITLE OF THE POST */}
                <Typography variant="h3" component="h2"> {post.title} </Typography>

                {/* TAGS OF THE POST */}
                  <Typography gutterBottom variant="h6" color="textSecondary" component="h2" >
                    {
                        post.tags.map((tag) => (
                            <Link to={`/tags/${tag}`} key={post.tags} className={classes.tags}>
                                {`#${tag} `}
                            </Link>
                        ))
                    }
                </Typography>

                {/* MESSAGE OF THE POST */}
                <Typography gutterBottom variant="body1" component="p">
                    {post.message}
                </Typography>

                {/* CREATOR NAME */}
                <Typography variant="h6">
                    Created by : 
                      <Link to={`/creators/${post.creator}`} className={classes.creator} onClick={creatorPostsHandler}> 
                        {` ${post.name}`}
                    </Link>
                </Typography>

                {/* TIME  */}
                <Typography variant="body1"> {moment(post.createdAt).fromNow()}</Typography>

                {/* DIVIDER */}
                <Divider className={classes.divider}/> 

                {/* COMMENT SECTION */}
                <CommentSection post={post}/>

                {/* DIVIDER */}
                <Divider className={classes.divider} />
              </div>

              {/* IMAGE SECTION */}
              <div className={classes.imageSection}>
                <img src={post.selectedFile || defaultImage} alt={post.title} className={classes.media} />
              </div>
        </div>

        {/* RECOMMENDATION OF POSTS */}
          {(

              <div className={classes.section}>

                  <Typography variant="h5" gutterBottom> {recommendedPosts?.length ? 'You might also like' : null} </Typography>

                <Divider />

                {/* RECOMMEND POST CARDS */}
                <div className={classes.recommendedPosts}>
                    {
                        recommendedPosts?.map(({title, name, message, likes , selectedFile , _id}) => (
                            
                        <Paper onClick={() => openPost(_id)} key={_id} className={classes.recommend} elevation={6}>

                            <div>
                            <Typography variant="h6" gutterBottom> {title}</Typography>
                            <Typography variant="subtitle2" gutterBottom> {name}</Typography>
                            <Typography variant="subtitle2" gutterBottom> {`${message.split(" ").slice(0 , 40).join(" ")}...`}</Typography>
                            <Typography variant="subtitle1" gutterBottom> Likes : {likes.length}</Typography>
                            </div>

                                <img src={selectedFile || defaultImage} className={classes.img} alt={name} width="200px" />

                        </Paper>
                    ))}
                </div>
            </div>
        )}

    </Paper>

    


  )
}
