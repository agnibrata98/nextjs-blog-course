import { allCategoriesQuery } from '@/customHooks/cms.query.hooks'
import { CircularProgress, Container, Grid, Paper, Typography } from '@mui/material';
import Link from 'next/link';
import React from 'react'

const BlogCategories = () => {
    const { data: blogCategoriesData, isPending: blogCategoriesDataPending } = allCategoriesQuery()

    console.log(blogCategoriesData, "blogCategoriesData");

    const blogCategories = blogCategoriesData?.data || [];

    if (blogCategoriesDataPending) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </div>
        )
    }
  return (
    <>
        {/* <div>BlogCategories</div>
        <Container>
            <Grid container spacing={2} justifyContent="center">
            {Array.isArray(blogCategories) && blogCategories.length > 0 ? (
                blogCategories.map((category, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Link href={`/cms/blog-categories/${category._id}`} key={index}>
                            <Paper elevation={3} style={{ padding: '20px' }}>
                                <Typography variant="h5">{category.category}</Typography>
                            </Paper>
                        </Link>
                    </Grid>
                ))
            ) : (
                <Typography variant="body1">No categories found</Typography>
            )}
            </Grid>
        </Container> */}
        <div>
            <Typography
                variant="h4"
                align="center"
                gutterBottom
                sx={{ fontWeight: "bold", marginBottom: "20px", marginTop: "20px" }}
            >
                Blog Categories
            </Typography>
            <Container>
                <Grid container spacing={3} justifyContent="center" style={{ marginTop: "100px" }}>
                {Array.isArray(blogCategories) && blogCategories.length > 0 ? (
                    blogCategories.map((category, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Link
                        href={`/cms/blog-categories/${category._id}`}
                        key={index}
                        //   underline="none"
                        style={{ textDecoration: "none" }}
                        >
                        <Paper
                            elevation={6}
                            sx={{
                            padding: "20px",
                            borderRadius: "10px",
                            transition: "transform 0.3s ease, box-shadow 0.3s ease",
                            "&:hover": {
                                transform: "translateY(-5px)",
                                boxShadow: "0 8px 20px rgba(0, 0, 0, 0.2)",
                            },
                            }}
                        >
                            <Typography
                            variant="h6"
                            align="center"
                            sx={{
                                fontWeight: "bold",
                                color: "primary.main",
                            }}
                            >
                            {category.category}
                            </Typography>
                        </Paper>
                        </Link>
                    </Grid>
                    ))
                ) : (
                    <Typography variant="body1" align="center" color="text.secondary">
                    No categories found
                    </Typography>
                )}
                </Grid>
            </Container>
        </div>
    </>
  )
}

export default BlogCategories