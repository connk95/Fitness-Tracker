import { CardContent, Card, Typography } from "@mui/material";
import { Linkify } from "../utilities/utilities";
import { Comment } from "../redux/comment/comment.type";

interface CommentCardProps {
  comment: Comment;
}

export const CommentCard: React.FC<CommentCardProps> = ({ comment }) => {
  return (
    <Card
      sx={{
        my: 1,
        backgroundColor: "#ebe9e1",
        borderRadius: 0,
        border: 0,
      }}
    >
      <CardContent>
        <Linkify sx={{ mb: 1 }}>{comment.text}</Linkify>
        <Typography sx={{ fontSize: 14 }}>
          {new Date(comment.createdAt).toLocaleDateString()} at{" "}
          {comment.createdAt.slice(11, 16)}
        </Typography>
        <Typography sx={{ fontSize: 14 }}>
          by {comment.user.username}
        </Typography>
      </CardContent>
    </Card>
  );
};
