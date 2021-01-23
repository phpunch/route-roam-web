import React, { useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ImageCarousel from './ImageCarousel';

import CommentIcon from '@material-ui/icons/Comment';

import styled from '@emotion/styled';
import postService from '../services/post.service';
import { UserContext } from '../contexts/UserContext';
import CommentController from './Comment/CommentController';
import { Menu, MenuItem, Popover } from '@material-ui/core';

interface LikeProps {
  liked: boolean;
}

const LikeIcon = styled(FavoriteIcon) <LikeProps>`
 color: ${({ liked }) => liked && 'red'};
`

const Selection = styled(Typography)`
  padding: 10px;
`

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    marginBottom: '1vh',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
}));

interface PostCardInterface {
  id: string
  userId: string
  title: string
  imageUrls: string[]
  content: string
  likesBy: string[]
}
const PostCard: React.FunctionComponent<PostCardInterface> = ({
  id, userId, title, imageUrls, content, likesBy
}) => {
  const classes = useStyles();
  const { currentUser } = useContext(UserContext)
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [expanded, setExpanded] = React.useState<boolean>(false);
  const [liked, setLiked] = React.useState<boolean>(false);
  const [numLiked, setNumLiked] = React.useState<number>(likesBy ? likesBy.length : 0);

  const open = Boolean(anchorEl);

  useEffect(() => {
    const index = likesBy.findIndex((likeUserId) => likeUserId === currentUser)
    if (index === -1) {
      setLiked(false)
      return
    }
    setLiked(true)

  }, [likesBy])

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleLikeButton = async () => {
    const formData = new FormData()
    formData.append("postId", id)
    if (liked) {
      try {
        await postService.unlikePost(formData)
        setLiked(false)
        setNumLiked(numLiked - 1)
      } catch (e) {
        console.log(e)
      }
      return
    }
    try {
      await postService.likePost(formData)
      setLiked(true)
      setNumLiked(numLiked + 1)
    } catch (e) {
      console.log(e)
    }
  }

  const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setAnchorEl(event.currentTarget);
  };


  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDeletePost = async () => {
    try {
      await postService.deletePost(id)
    } catch (e) {
      console.log(e)
    }
  }


  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar>
            {title}
          </Avatar>
        }
        action={
          <>
            <IconButton aria-label="settings" onClick={handleClick}>
              <MoreVertIcon />
            </IconButton>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            >
              <MenuItem>Edit</MenuItem>
              <MenuItem onClick={handleDeletePost}>Delete</MenuItem>
            </Menu>
          </>

        }
        title={title}
      />
      <ImageCarousel imageUrls={imageUrls} />


      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {content}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites" onClick={handleLikeButton}>
          <LikeIcon liked={liked} />
        </IconButton>
        <Typography>{numLiked}</Typography>
        <IconButton
          className={classes.expand}
          onClick={handleExpandClick}
        >
          <CommentIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <CommentController postId={id} />
        </CardContent>
      </Collapse>
    </Card>
  );
}
export default PostCard