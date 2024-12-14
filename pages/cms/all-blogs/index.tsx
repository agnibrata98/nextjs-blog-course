import { allBlogsQuery } from '@/customHooks/cms.query.hooks';
import { allBlogsProps } from '@/typeScript/cms.interface';
import { Card, CardActions, CardContent, CardMedia, CircularProgress, Container, Grid, Typography } from '@mui/material';
import Link from 'next/link';
import React from 'react';

const AllBlogs = () => {
  // all blogs query 
  const { data, isPending } = allBlogsQuery();

  if (isPending) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <>
      <div
        style={{
          marginTop: '4rem',
          marginBottom: '4rem',
          backgroundColor: '#fafafa',
          padding: '2rem',
          borderRadius: '10px',
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h4"
            gutterBottom
            style={{
              textAlign: 'center',
              fontSize: '2.5rem',
              fontWeight: 'bold',
              marginBottom: '2rem',
              color: '#333',
            }}
          >
            Blog Posts
          </Typography>
          <Grid container spacing={4}>
            {Array.isArray(data) && data.length > 0 ? (
              data.map((item: allBlogsProps) => (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  key={item._id}
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  <Card
                    sx={{
                      maxWidth: 360,
                      borderRadius: '15px',
                      boxShadow: '0px 8px 15px rgba(0, 0, 0, 0.15)',
                      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-10px)',
                        boxShadow: '0px 12px 25px rgba(0, 0, 0, 0.2)',
                      },
                      backgroundColor: '#fff',
                    }}
                  >
                    <CardMedia
                      sx={{
                        height: 200,
                        objectFit: 'cover',
                        borderTopLeftRadius: '15px',
                        borderTopRightRadius: '15px',
                      }}
                      image={`data:${item.photo.contentType};base64,${item.photo.data}`}
                      title={item.title}
                    />
                    <CardContent>
                      <Typography
                        gutterBottom
                        variant="h6"
                        component="div"
                        style={{
                          fontSize: '1.25rem',
                          fontWeight: 'bold',
                          color: '#333',
                          marginBottom: '0.5rem',
                        }}
                      >
                        {item.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        style={{
                          marginBottom: '1rem',
                          fontSize: '0.9rem',
                          color: '#666',
                        }}
                      >
                        {new Date(item.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </Typography>
                      <Typography
                        variant="body2"
                        style={{
                          textAlign: 'justify',
                          lineHeight: '1.6',
                          color: '#555',
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
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '0 16px 16px 16px',
                      }}
                    >
                      <Link
                        href={`/cms/all-blogs/${item._id}`}
                        style={{
                          color: '#007BFF',
                          textDecoration: 'none',
                          fontWeight: 'bold',
                          fontSize: '0.95rem',
                          transition: 'color 0.3s ease',
                          // '&:hover': {
                          //   color: '#0056b3',
                          // },
                        }}
                      >
                        Read More
                      </Link>
                      <Typography
                        style={{
                          fontSize: '0.9rem',
                          color: '#888',
                          fontWeight: '500',
                        }}
                      >
                        Comments: {item.comment_count}
                      </Typography>
                    </CardActions>
                  </Card>
                </Grid>
              ))
            ) : (
              <Typography
                variant="body1"
                color="text.secondary"
                style={{
                  textAlign: 'center',
                  fontSize: '1rem',
                  marginTop: '2rem',
                }}
              >
                No blogs available
              </Typography>
            )}
          </Grid>
        </Container>
      </div>
    </>
  );
};

export default AllBlogs;
