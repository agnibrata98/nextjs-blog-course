export const endpoints = {
    auth: {
      login: "/login",
      register: "/register",
      update: "/update-password",
    },
    blogs: {
      allBlogs: "/allBlog",
      blogDetails: "/blogdetails",
      addComment: "/blog",
      like: "/blog/like",
      unlike: "/blog/unlike",
      showAllCategory: "/showallcategory",
      postByCategory: "/category/post",
      letestPost: "/letest-post",
      blogimages: "/blog/images",
      showcomment:"/comment"
    },
    content: {
      service: "/service",
      testimonial: "/testimonial",
      testimonialphotos: "/testimonials/photos",
      team: "/team",
      teamphoto: "/team/photo",
      banner: "/banner",
      bannerphoto: "/banner/photo",
      contact: "/contact/create",
      
    },
    course: {
      course: "/course",
      coursephoto: "/course/photo",
      
    },
    crud: {
      allstudent: "/allstudent",
      addstudent: "/student",
      editstudent: "/edit",
      updatestudent: "/update",
      deletestudent: "/delete",
    },
  };
  