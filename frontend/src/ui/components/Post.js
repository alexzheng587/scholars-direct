import Chip from '@material-ui/core/Chip';
import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';
import Typography from '@material-ui/core/Typography';

let example = {
    "title": "How to solve this calculus problem?",
    "student": "Bob103",
    "description": "I need help with math 101 homework, here is the question: x+y=z....",
    "time": ["Monday 9AM to 5PM","Tuesday 9AM to 5PM"],
    "status": "in progress",
    "tags": ["math", "calculus", "math101"],
    "img": 'www.sdadaddadadad.com/dasd'
};
const useStyles = makeStyles({
    root: {
        maxWidth: 345,
        margin: '10px 10px',
    },
    bullet: {
        display: 'inline-block',
        margin: '3px 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
        margin: '3px 2px',
    },
});
function Post(props) {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image="/static/images/cards/contemplative-reptile.jpg"
                    title="Contemplative Reptile"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {props.post.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {props.post.description}
                    </Typography>
                    <div>
                        {generateTags(props.post.tags)}
                    </div>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary">
                    View
                </Button>
                <Button size="small" color="primary">
                    Contact student
                </Button>
            </CardActions>
        </Card>
    );
}

function generateTags(array) {

    return array.map((item) => {return <Chip label={item}/>});
}
export default Post;