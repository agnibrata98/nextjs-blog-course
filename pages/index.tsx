import localFont from "next/font/local";
import { allBannersQuery, createContactMutation } from "@/customHooks/cms.query.hooks";
import { Box, Button, Card, CardContent, CircularProgress, Container, Grid, Paper, TextField, Typography } from "@mui/material";
import { FieldValues, useForm } from "react-hook-form";
import { contactProps } from "@/typeScript/cms.interface";
import toast from "react-hot-toast";
import ErrorPage from "@/ui/errors/Error";
import Carousel from 'react-material-ui-carousel'
import image1 from "@/public/images/carousel1.jpg"
import image2 from "@/public/images/carousel2.jpg"
import image3 from "@/public/images/carousel3.jpg"


interface CarouselItem {
  name: string;
  description: string;
  image: string; // Use `string` if the `image` is a URL or a path to the image
}


var services = [
  {
      id: 1,
      title: "World class coaching",
      subtitle: "Aerobic",
      description: "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica",
      // image: CardImage1
  },
  {
      id: 2,
      title: "Best body building techniques",
      subtitle: "Body Building",
      description: "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica",
      // image: CardImage2,
  },
  {
      id: 3,
      title: "In-house expert trainer",
      subtitle: "Yoga",
      description: "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica",
      // image: CardImage3
  },
  {
      id: 4,
      title: "In-house expert trainer",
      subtitle: "Yoga",
      description: "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica",
      // image: CardImage3
  },
  
]


var carouselItems: CarouselItem[] = [
  {
      name: "Random Name #1",
      description: "Probably the most random thing you have ever seen!",
      image: 'http://online.hbs.edu/Style%20Library/api/resize.aspx?imgpath=/PublishingImages/overhead-view-of-business-strategy-meeting.jpg&w=1200&h=630'
  },
  {
      name: "Random Name #2",
      description: "Hello World!",
      image: "https://savvycomsoftware.com/wp-content/uploads/2020/02/IMG_9741.jpg"
  },
  {
    name: "Random Name #3",
    description: "Hello World!",
    image: "http://online.hbs.edu/Style%20Library/api/resize.aspx?imgpath=/PublishingImages/overhead-view-of-business-strategy-meeting.jpg&w=1200&h=630"
  }
]

export default function Home() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<contactProps>();

  // const { data: bannersData, isPending: isBannersDataPending, isError: isBannersDataError, error: bannersDataError } = allBannersQuery()

  // console.log(bannersData, "bannersData");

  const { mutate: contactMutate, isPending: contactPending, error: contactError, isError } = createContactMutation()


  const onSubmit = async (formData: FieldValues) => {
    const { name, email, phone, message} = formData as { name: string ,email: string; phone: string, message: string };
    const formdata = new FormData();
    formdata.append("name", name);
    formdata.append("email", email);
    formdata.append("phone", phone);
    formdata.append("message", message);
    // formdata.append("city", city);
    // formdata.append("class", classs);

    contactMutate(formData, {
      onSuccess: (data) => {
        // console.log(data, "data");
            toast.success(data.message);
        },
        onError: (error) => {
            console.log(error, "error");
        },
    });
  };
  
  if (isError) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <ErrorPage errorMessage={(contactError as Error).message || 'An error occurred'} />
      </Box>
  );
}
  return (
    <>

    {/* carousel section */}
    <Carousel 
      autoPlay 
      // infiniteLoop 
      interval={2000}  
      animation='slide'
      duration={1000}
      swipe={true}
    >
           {carouselItems.map((item : CarouselItem) => {
            return(
                <>
                
                <img src={item.image} height="100%" width="100%"/>
                
                
                </>
            )
           })}
    </Carousel>

      {/* services section */}
      <Container maxWidth="lg" sx={{ mt: 8 }}>
        <Typography variant="h4" textAlign="center" mb={4}>
          Our Services
        </Typography>
        <Grid container spacing={4}>
          {services.map((service) => (
            <Grid item xs={12} sm={6} md={3} key={service.id}>
              <Box
                sx={{
                  transition: "transform 0.3s, box-shadow 0.3s",
                  "&:hover": {
                    transform: "translateY(-10px)",
                    boxShadow: "0px 15px 30px rgba(0,0,0,0.2)",
                    borderRadius: "16px", // Rounded corners
                  },
                }}
              >
                <Card
                  sx={{
                    height: "250px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    borderRadius: "16px", // Rounded corners
                    overflow: "hidden", // Prevents content from spilling outside
                    boxShadow: "0px 5px 15px rgba(0,0,0,0.1)", // Subtle shadow
                    background: "linear-gradient(145deg, #f5f5f5, #e0e0e0)", // Light gradient background
                  }}
                >
                  <CardContent
                    sx={{
                      p: 3, // Padding inside the card
                      textAlign: "center", // Center-align text
                    }}
                  >
                    <Typography
                      variant="h6"
                      gutterBottom
                      sx={{
                        fontWeight: 700, // Bold title
                        color: "primary.main", // Use theme's primary color
                      }}
                    >
                      {service.title}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      color="text.secondary"
                      gutterBottom
                      sx={{ fontStyle: "italic" }} // Italic subtitle
                    >
                      {service.subtitle}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {service.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Box>

            </Grid>
          ))}
        </Grid>
      </Container>

      {/* contact section */}
      <Container maxWidth="lg" sx={{ mt: 8, mb: 8 }}>
        <Paper elevation={4} sx={{ borderRadius: "16px", overflow: "hidden" }}>
          <Grid container>
            {/* Image Section */}
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  height: "100%",
                  width: "100%",
                  backgroundImage: `url("https://vhub.ai/wp-content/uploads/2023/04/Contact-us-1024x576.png")`, // Replace with your image URL
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  minHeight: "400px",
                }}
              />
            </Grid>

            {/* Form Section */}
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  p: 4,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  height: "100%",
                  bgcolor: "background.paper",
                }}
              >
                <Typography variant="h4" mb={3} color="primary">
                  Contact Us
                </Typography>
                <Typography variant="body1" mb={4} color="text.secondary">
                  Feel free to reach out with any questions or inquiries!
                </Typography>
                <form 
                // onSubmit={handleSubmit}
                >
                  <TextField
                    label="Name"
                    // name="name"
                    fullWidth
                    margin="normal"
                    required
                    variant="outlined"
                    {...register('name', {
                      required: 'Name is required',
                      minLength: { value: 3, message: 'Name must be at least 3 characters' },
                    })}
                    error={!!errors.name}
                    helperText={errors.name ? errors.name.message : ''}
                  />
                  <TextField
                    label="Email"
                    // name="email"
                    type="email"
                    fullWidth
                    margin="normal"
                    required
                    variant="outlined"
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                        message: 'Invalid email format',
                      },
                    })}
                    error={!!errors.email}
                    helperText={errors.email ? errors.email.message : ''}
                  />
                  <TextField
                    label="Phone"
                    // name="phone"
                    type="tel"
                    fullWidth
                    margin="normal"
                    required
                    variant="outlined"
                    {...register('phone', {
                      required: 'Mobile is required',
                      pattern: {
                        value: /\d{9}$/,
                        message: 'Invalid mobile format',
                      },
                    })}
                    error={!!errors.phone}
                    helperText={errors.phone ? errors.phone.message : ''}
                  />
                  <TextField
                    label="Message"
                    // name="message"
                    fullWidth
                    margin="normal"
                    required
                    variant="outlined"
                    multiline
                    rows={4}
                    {...register('message', {
                      required: 'Message is required',
                      minLength: { value: 10, message: 'Message must be at least 10 characters' },
                    })}
                    error={!!errors.message}
                    helperText={errors.message ? errors.message.message : ''}
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{
                      mt: 3,
                      py: 1.5,
                      fontSize: "1rem",
                      textTransform: "none",
                    }}
                    onClick={handleSubmit(onSubmit)}
                  >
                    {contactPending ? <CircularProgress size={24} /> : 'Submit'}
                  </Button>
                </form>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </>
  );
}
