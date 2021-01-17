import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ImageCarousel from './ImageCarousel';

import styled from '@emotion/styled';
import postService from '../services/post.service';

interface LikeProps {
  liked: boolean;
}

const LikeIcon = styled(FavoriteIcon)<LikeProps>`
 color: ${({ liked }) => liked && 'red'};
`

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    margin: '5% 0',
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
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

interface PostCardInterface {
  id: string
  userId: string
  title: string
  subheader: string
  imageUrls: string[]
  content: string
  likes: string[]
}
const PostCard: React.FunctionComponent<PostCardInterface> = ({
  id, userId, title, subheader, imageUrls, content, likes
}) => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState<boolean>(false);
  const [liked, setLiked] = React.useState<boolean>(false);

  useEffect(() => {
    const index = likes.findIndex((likeUserId) => likeUserId === userId)
    if (index === -1) {
      setLiked(false)
    } else {
      setLiked(true)
    }
  }, [likes])

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
      } catch (e) {
        console.log(e)
      }
      return
    }
    try {
      await postService.likePost(formData)
      setLiked(true)
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={title}
        subheader={subheader}
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
        <Typography>{likes.length}</Typography>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high
          heat. Add chicken, shrimp and chorizo, and cook, stirring occasionally until lightly
          browned, 6 to 8 minutes. Transfer shrimp to a large plate and set aside, leaving chicken
          and chorizo in the pan. Add pimentón, bay leaves, garlic, tomatoes, onion, salt and
          pepper, and cook, stirring often until thickened and fragrant, about 10 minutes. Add
          saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
        </CardContent>
      </Collapse>
    </Card>
  );
}
export default PostCard