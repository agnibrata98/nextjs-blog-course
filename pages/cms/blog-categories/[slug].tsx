import { categoryBlogsQuery } from '@/customHooks/cms.query.hooks';
import { Card, CardActions, CardContent, CardMedia, CircularProgress, Container, Grid, Typography } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

const BlogsByCategory = () => {
  // router navigation
  const router = useRouter();

  // for query params
  const { slug } = router.query;

  // query hooks for blogs by category
  const { data: blogsByCategoryData, isPending: blogsByCategoryDataPending } = categoryBlogsQuery(slug as string);

  const blogsByCategory = blogsByCategoryData?.data || [];
  
  if (blogsByCategoryDataPending) {
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
        backgroundColor: '#f9f9f9',
        padding: '2rem',
        borderRadius: '15px',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h4"
          gutterBottom
          align="center"
          style={{
            fontWeight: 'bold',
            color: '#333',
            marginBottom: '2rem',
          }}
        >
          Blog Posts by Category
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {Array.isArray(blogsByCategory) && blogsByCategory.length > 0 ? (
            blogsByCategory.map((item) => (
              <Grid item xs={12} sm={6} md={4} key={item._id}>
                <Card
                  sx={{
                    borderRadius: '20px',
                    overflow: 'hidden',
                    transition: 'transform 0.3s, box-shadow 0.3s',
                    '&:hover': {
                      transform: 'translateY(-10px)',
                      boxShadow: '0 6px 20px rgba(0, 0, 0, 0.2)',
                    },
                  }}
                >
                  <CardMedia
                    sx={{
                      height: 200,
                      backgroundPosition: 'center',
                      backgroundSize: 'cover',
                    }}
                    image={`data:${item.photo.contentType};base64,${Buffer.from(item.photo.data as any).toString(
                      'base64',
                    )}`}
                    title={item.title}
                  />
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="h6"
                      component="div"
                      sx={{
                        fontWeight: 'bold',
                        color: '#333',
                        fontSize: '1.2rem',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                      }}
                    >
                      {item.title}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: '0.9rem',
                        color: '#777',
                        marginBottom: '0.5rem',
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
                      color="text.secondary"
                      sx={{
                        textAlign: 'justify',
                        fontSize: '0.95rem',
                        lineHeight: 1.6,
                        color: '#555',
                        overflow: 'hidden',
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
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
                      padding: '0 16px 16px',
                    }}
                  >
                    <Link href={`/cms/all-blogs/${item._id}`} passHref>
                      <Typography
                        sx={{
                          fontSize: '0.95rem',
                          fontWeight: 'bold',
                          color: '#1976d2',
                          cursor: 'pointer',
                          textDecoration: 'none',
                          '&:hover': {
                            textDecoration: 'underline',
                          },
                        }}
                      >
                        Read More
                      </Typography>
                    </Link>
                  </CardActions>
                </Card>
              </Grid>
            ))
          ) : (
            <Typography variant="body1" align="center" style={{ color: '#777' }}>
              No blogs available
            </Typography>
          )}
        </Grid>
      </Container>
    </div>
  );
};

export default BlogsByCategory;
