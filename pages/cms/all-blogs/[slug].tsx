import {
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    CircularProgress,
    Container,
    Divider,
    Grid,
    List,
    ListItem,
    ListItemText,
    TextField,
    Typography,
    Tooltip,
  } from "@mui/material";
  import ThumbDownIcon from "@mui/icons-material/ThumbDown";
  import ThumbUpIcon from "@mui/icons-material/ThumbUp";
  import CommentIcon from "@mui/icons-material/Comment";
  import { useRouter } from "next/router";
  import React, { useState } from "react";
  import { useForm } from "react-hook-form";
  import { addCommentProps } from "@/typeScript/cms.interface";
  import { addCommentMutation, addLikesMutation, addUnlikesMutation, allCommentsQuery, blogDetailsQuery } from "@/customHooks/cms.query.hooks";
import toast from "react-hot-toast";
  
  const BlogDetails = () => {
    // state management
    const [visibleComments, setVisibleComments] = useState(10); // Show 10 comments initially

    // for react hook forms
    const { register, handleSubmit, formState: { errors } } = useForm<addCommentProps>();

    // functions for show more comments
  const showMoreComments = () => {
    setVisibleComments((prev) => prev + 10); // Load 10 more comments on each click
  };

  // router navigation
    const router = useRouter();
    // for query params
    const { slug } = router.query;
  
    // query hooks for blogdetails
    const { data: blogData, isPending: isBlogPending, refetch: blogsRefetch, isError: isBlogDetailsError, error: bolgDetailsError } = blogDetailsQuery(slug as string);
    // query hooks for all comments
    const { data: commentsData, isPending: isCommentsPending, refetch: commentsRefetch, isError: isCommentsFetchingError, error: commentsFetchingError } = allCommentsQuery(slug as string);
  
    // mutation hooks for add comment, likes, unlikes
    const { mutate: commentMutation,isPending: isCommentMutationPending, isError: isCommentMutationError, error: commentMutationError } = addCommentMutation(slug as string);
    const { mutate: likesMutation, isPending: addLikesPending, isError: isAddLikesError, error: addLikesError  } = addLikesMutation(slug as string);
    const { mutate: unlikesMutation, isPending: addUnLikesPending, isError: isAddUnLikesError, error: addUnLikesError } = addUnlikesMutation(slug as string);


  
  
    /// on submit function for add comment
    const onSubmit = (e: addCommentProps) => {
        if(localStorage.getItem("user")!=null   ){
            let user: Partial<addCommentProps> = JSON.parse(localStorage.getItem("user") as string);
            let email = user.email??"";
            let name = user.name?? "";
            let comment = e.comment;
    
            const payload: Partial<addCommentProps> = {
                name: name,
                email: email,
                comment: e.comment,
            }
            commentMutation(payload as addCommentProps, {
                onSuccess: () => {
                  // console.log(payload, "payload");
                  toast.success("Comment added successfully");
                  blogsRefetch();
                  commentsRefetch();
                },
                onError: (error: any) => {
                  // console.log(error, "error");
                  toast.error("Error adding comment:", error.message);
                }
            })
      }}
        
      // on likes add
    const onLikesAdd = (p: void) => {
        likesMutation(p,{
            onSuccess: () => {
                blogsRefetch();
            },
            onError: (error: any) => {
                // console.log(error, "error");
                toast.error("Error adding likes");
            }
        }) 
    }

    // on unlikes add
    const onUnlikesAdd = (p: void) => {
        unlikesMutation(p,{
            onSuccess: () => {
                blogsRefetch();
            },
            onError: (error: any) => {
                // console.log(error, "error");
                toast.error("Error adding unlikes");
            }
        }) 
    }
  
    if (isBlogPending || isCommentsPending) {
      return (
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
          <CircularProgress />
        </Box>
      );
    }
  
    // extracting image source from blogData in base64 format
    const imageSrc = blogData?.photo
      ? `data:${blogData.photo.contentType};base64,${Buffer.from(blogData.photo.data).toString("base64")}`
      : null;
  
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Card variant="outlined" sx={{ p: 2, borderRadius: 4, boxShadow: 3 }}>
          {imageSrc && (
            <Box mb={3}>
              <img
                src={imageSrc}
                alt="Blog"
                style={{
                  width: "100%",
                  height: "auto",
                  borderRadius: "8px",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                }}
              />
            </Box>
          )}
          <CardContent>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>
              {blogData?.title}
            </Typography>
  
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              Created At:{" "}
              {blogData?.createdAt ? new Date(blogData.createdAt).toLocaleString() : "N/A"}
            </Typography>
            <Typography variant="subtitle2" color="text.secondary" mb={2}>
              Updated At:{" "}
              {blogData?.updatedAt ? new Date(blogData.updatedAt).toLocaleString() : "N/A"}
            </Typography>
  
            <Divider sx={{ mb: 3 }} />
  
            <Typography
              variant="body1"
              gutterBottom
              dangerouslySetInnerHTML={{
                __html: blogData?.postText ? blogData.postText.replace(/<\/?[^>]+(>|$)/g, "") : "N/A",
              }}
              sx={{ lineHeight: 1.8 }}
            />
  
            <Divider sx={{ my: 3 }} />
  
            <Grid container spacing={2} alignItems="center">
              <Grid item>
                <Tooltip title="Like">
                  <Button
                    startIcon={<ThumbUpIcon />}
                    onClick={()=>onLikesAdd()}
                    variant="contained"
                    color="primary"
                  >
                    {blogData?.likes}
                  </Button>
                </Tooltip>
              </Grid>
              <Grid item>
                <Tooltip title="Dislike">
                  <Button
                    startIcon={<ThumbDownIcon />}
                    onClick={()=>onUnlikesAdd()}
                    variant="contained"
                    color="secondary"
                  >
                    {blogData?.unlikes}
                  </Button>
                </Tooltip>
              </Grid>
              <Grid item>
                <Chip
                  icon={<CommentIcon />}
                  label={`${blogData?.comments?.length || 0} Comments`}
                  color="default"
                />
              </Grid>
            </Grid>
  
            <Divider sx={{ my: 3 }} />
  
            <Typography variant="h6" gutterBottom>
              Add a Comment
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", gap: "1rem" }}>
              <TextField
                fullWidth
                label="Comment"
                {...register("comment", { required: "Comment is required" })}
                error={!!errors.comment}
                helperText={errors.comment?.message}
              />
              <Button type="submit" variant="contained" color="primary">
                {isCommentMutationPending ? <CircularProgress size={24} color="inherit" /> :'Submit'}
              </Button>
            </form>
  
            <Divider sx={{ my: 3 }} />
  
            <Typography variant="h6" gutterBottom>
              Comments
            </Typography>
            <List>
              {commentsData?.post?.comment?.comments &&
              commentsData.post.comment.comments.length > 0 ? (
                commentsData.post.comment.comments
                  .slice(0, visibleComments) // Limit displayed comments
                  .map((comment) => (
                    <ListItem key={comment._id}>
                      <ListItemText
                        primary={comment.comment}
                        secondary={`By: ${comment.name} | Email: ${comment.email}`}
                      />
                    </ListItem>
                  ))
              ) : (
                <Typography variant="body2" color="text.secondary">
                  No comments yet.
                </Typography>
              )}
          </List>
        {commentsData?.post?.comment?.comments &&
          visibleComments < commentsData.post.comment.comments.length && (
            <Box mt={2} display="flex" justifyContent="center">
              <Button
                variant="outlined"
                color="primary"
                onClick={showMoreComments}
              >
                Read More
              </Button>
            </Box>
          )}
          </CardContent>
        </Card>
      </Container>
    );
  };
  
  export default BlogDetails;
  