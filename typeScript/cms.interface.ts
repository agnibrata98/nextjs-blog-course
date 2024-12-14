// for all blogs
interface Photo {
    data: string;
    contentType: string;
  }
  export interface IallBlogsProps {
    _id: string;
    title: string;
    postText: string;
    photo: Photo;
    category: string;
    comments: string[];
    comment_count: number;
    createdAt: string;
  }
  
  export interface allBlogsProps extends IallBlogsProps {
    data: IallBlogsProps;
  }

  // for latest post
  export interface IlatestBlogsProps {
    status: boolean;
    data: [
      {
        _id: string;
        title: string;
        postText: string;
        photo: Photo;
        category: string;
        comments: string[];
        // comment_count: number;
        createdAt: string;
        updatedAt: string;
        likes: number;
        unlikes: number;
      }
    ]
  }
  export interface latestBlogsProps extends IlatestBlogsProps {
    data: IlatestBlogsProps['data'];
  }
  
  // for blog-details
  export interface IblogDetailsProps {
    _id: string ;
    title: string;
    postText: string;
    photo: Photo;
    category: string;
    comments: string[] | null | undefined;
    createdAt: string | number | Date;
    updatedAt: string | number | Date;
    unlikes: number;
    likes:number;
  }
  export interface blogDetailsProps extends IblogDetailsProps {
    data: IblogDetailsProps;
  }
  
  //for fetching comments
  export interface ICommentProps {
    comment:object,
    post: {
        comment: {
            _id: string,
            title: string,
            postText: string,
            status: boolean,
            likes: number,
            category: string,
            comments: [
                {comment: string,
                createdAt: string,
                email: string,
                name: string,
                updatedAt: string,
                _id: string}
            ],
            createdAt: string,
            updatedAt: string,
            unlikes: number,
            
        }
    }
  }
  
  export interface commentProps extends ICommentProps {
    data: ICommentProps | undefined;
  }
  
  // for adding comment
  export interface IAddCommentProps {
    status: number;
    message: string;
    _id: string;
    name: string;
    email: string;
    comment: string;
    blog: string;
   
    user: {
      name: string,
      email: string,
    }
    createdAt: string | number | Date;
    updatedAt: string | number | Date;
  }
  
  export interface addCommentProps extends IAddCommentProps {
    data: IAddCommentProps;
  }
  
  // for adding likes
  export interface IAddLikesProps extends blogDetailsProps {
    data : blogDetailsProps;
  }
  
  // for adding dislikes
  export interface IAddUnlikesProps extends blogDetailsProps {
    data : blogDetailsProps;
  }
  
  // for showing all category
  export interface IAllCategoryProps {
    status: string;
    data: [
      {
        _id: string;
        category: string;
      }
    ]
    // _id: string;
    // category: string;
  }
  export interface allCategoryProps extends Omit<IAllCategoryProps, 'data'> {
    data: IAllCategoryProps['data'];
  }
  
  // for category post
  export interface IAllCategoryPostProps {
    _id: string;
  }
  
  export interface ICategoryPostProps {
    status: string;
    data: [
      {
        _id: string;
        title: string;
        postText: string;
        photo: {
          data: Array<Array<number>>;
          contentType: string;
        };
        likes: number;
        unlikes: number;
        createdAt: string;
        updatedAt: string;
        
      }
    ]
  }
  export interface categoryPostProps extends ICategoryPostProps {
    categoryWiseNewData: ICategoryPostProps;
  }



  // for page content part

  // for services
  export interface IservicesProps {
    status: boolean;
    data: [
      {
        _id: string;
        name: string;
        slug: string;
        details: string;
        createdAt: string;  
        updatedAt: string;
      }
    ]
  }
  export interface servicesProps extends IservicesProps {
    data: IservicesProps['data'];
  }


  // for testimonial
  export interface ItestimonialProps {
    success: boolean;
    counTotal: number;
    message: string;
    testimonials: [
      {
        _id: string;
        name: string;
        slug: string;
        position: string;
        talk: string;
        createdAt: string;
        updatedAt: string;
      }
    ]
  }
  export interface testimonialProps extends ItestimonialProps {
    data: ItestimonialProps['testimonials'];
  }

  // for team members 
  export interface IteamMemberProps {
    success: boolean;
    counTotal: number;
    message: string;
    TeamMember: [
      {
        _id: string;
        name: string;
        slug: string;
        possession: string;
        createdAt: string;
        updatedAt: string;
      }
    ]
  }

  export interface teamMemberProps extends IteamMemberProps {
    data: IteamMemberProps['TeamMember'];
  }

  // for courses
  export interface IcoursesProps {
    success: boolean;
    counTotal: number;
    message: string;
    Courses: [
      {
        _id: string;
        name: string;
        slug: string;
        requirement: string;
        duration: string;
        fees: string;
        createdAt: string;
        updatedAt: string;
      }
    ]
  }

  export interface coursesProps extends IcoursesProps {
    data: IcoursesProps['Courses'];
  }

  // for banner 
  export interface IbannerProps {
    success: boolean;
    counTotal: number;
    message: string;
    bannerdata: [
      {
        _id: string;
        title: string;
        description: string;
        status: boolean;
        createdAt: string;
        updatedAt: string;
      }
    ]
  }

  export interface bannerProps extends IbannerProps {
    data: IbannerProps['bannerdata'];
  }

  // for contact
  export interface IcontactProps {
    success: boolean;
    // message: string;
        _id: string;
        name: string;
        email: string;
        phone: string;
        message: string;
        createdAt: string;
        updatedAt: string;
      
    
  }
  export interface contactProps extends IcontactProps {
    data: IcontactProps;
  }
  