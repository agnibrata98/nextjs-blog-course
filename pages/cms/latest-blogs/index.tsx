import { latestBlogsQuery } from '@/customHooks/cms.query.hooks';
import { latestBlogsProps } from '@/typeScript/cms.interface';
import { Card, CardActions, CardContent, CardMedia, CircularProgress, Container, Grid, Typography, Button } from '@mui/material';
import Link from 'next/link';
import React from 'react';

const LatestBlogs = () => {
  const { data: latestBlogsData, isPending: latestBlogsDataPending } = latestBlogsQuery();
  const latestAllBlogData = latestBlogsData?.data || [];
  // console.log(latestBlogsData,  'latestBlogsData');

  if (latestBlogsDataPending) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <div
      style={{
        marginTop: '4rem',
        marginBottom: '4rem',
        backgroundColor: '#f9fafc',
        padding: '3rem 1rem',
        borderRadius: '10px',
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          style={{
            fontWeight: 'bold',
            marginBottom: '2rem',
            color: '#333',
          }}
        >
          Latest Blog Posts
        </Typography>
        <Grid container spacing={3} justifyContent="center">
          {Array.isArray(latestAllBlogData) && latestAllBlogData.length > 0 ? (
            latestAllBlogData.map((item) => (
              <Grid item xs={12} sm={6} md={4} key={item._id}>
                <Card
                  sx={{
                    borderRadius: '12px',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                    transition: 'transform 0.3s, box-shadow 0.3s',
                    '&:hover': {
                      transform: 'scale(1.05)',
                      boxShadow: '0 6px 25px rgba(0, 0, 0, 0.2)',
                    },
                    backgroundColor: '#ffffff',
                  }}
                >
                  <CardMedia
                    sx={{
                      height: 200,
                      backgroundSize: 'cover',
                      borderTopLeftRadius: '12px',
                      borderTopRightRadius: '12px',
                    }}
                    image={`data:${item.photo.contentType};base64,${item.photo.data}`}
                    title={item.title}
                  />
                  <CardContent
                    sx={{
                      padding: '1.5rem',
                      color: '#333',
                    }}
                  >
                    <Typography
                      variant="h6"
                      gutterBottom
                      sx={{
                        fontWeight: 'bold',
                        fontSize: '1.25rem',
                        color: '#2c3e50',
                        textAlign: 'center',
                      }}
                    >
                      {item.title}
                    </Typography>
                    <Typography
                      variant="caption"
                      display="block"
                      gutterBottom
                      sx={{
                        color: '#7f8c8d',
                        textAlign: 'center',
                        marginBottom: '1rem',
                      }}
                    >
                      {new Date(item.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}{' '}
                      at{' '}
                      {new Date(item.createdAt).toLocaleTimeString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        textAlign: 'justify',
                        lineHeight: 1.6,
                        color: '#34495e',
                        marginBottom: '1.5rem',
                      }}
                      dangerouslySetInnerHTML={{
                        __html:
                          item.postText.replace(/<\/?[^>]+(>|$)/g, '').length > 100
                            ? `${item.postText.replace(/<\/?[^>]+(>|$)/g, '').slice(0, 100)}...`
                            : item.postText,
                      }}
                    />
                  </CardContent>
                  <CardActions
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      paddingBottom: '1rem',
                    }}
                  >
                    <Link
                      href={`/cms/all-blogs/${item._id}`}
                      passHref
                      style={{ textDecoration: 'none' }}
                    >
                      <Button
                        variant="contained"
                        color="primary"
                        sx={{
                          borderRadius: '20px',
                          textTransform: 'none',
                          padding: '0.5rem 1.5rem',
                          boxShadow: 'none',
                          '&:hover': {
                            backgroundColor: '#0056b3',
                          },
                        }}
                      >
                        Read More
                      </Button>
                    </Link>
                  </CardActions>
                </Card>
              </Grid>
            ))
          ) : (
            <Typography variant="body2" color="text.secondary">
              No blogs available
            </Typography>
          )}
        </Grid>
      </Container>
    </div>
  );
};

export default LatestBlogs;



