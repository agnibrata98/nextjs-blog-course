import { allBlogsAPICall } from "@/api/functions/allBlogs.api";
import { allCommentsAPICall } from "@/api/functions/allComments.api";
import { blogDetailsAPICall } from "@/api/functions/blogDetails.api";
import { addCommentProps, allCategoryProps, categoryPostProps, IallBlogsProps, IbannerProps, IblogDetailsProps, ICommentProps, IcontactProps, IcoursesProps, IlatestBlogsProps, IservicesProps, IteamMemberProps, ItestimonialProps } from "@/typeScript/cms.interface";
import { useMutation, UseMutationResult, useQuery, UseQueryResult } from "@tanstack/react-query";
import { useGlobalHooks } from "./globalHooks/globalHooks";
import { addCommentFn } from "@/api/functions/addComments.api";
import { addLikesFn } from "@/api/functions/addLikes.api";
import { addUnlikesFn } from "@/api/functions/addUnlikes.api";
import { allCategoriesAPICall } from "@/api/functions/allCategories.api";
import { blogsByCategoryAPICall } from "@/api/functions/blogsByCategory.api";
import { latestBlogsAPICall } from "@/api/functions/latestBlogs.api";
import { allServicesAPICall } from "@/api/functions/allServices.api";
import { allTestimonialsAPICall } from "@/api/functions/testimonials.api";
import { allTeammembersAPICall } from "@/api/functions/teamMembers.api";
import { allCoursesAPICall } from "@/api/functions/allCourses.api";
import { allBannersAPICall } from "@/api/functions/allBanners.api";
import { addContactFn } from "@/api/functions/addContact.api";

// for all-blogs query
export const allBlogsQuery = (): UseQueryResult<IallBlogsProps, unknown> => {
  return useQuery({
    queryKey: ["BLOGS", "ADD-COMMENT"],
    queryFn: allBlogsAPICall
  });
};

  // for blog-details query
export const blogDetailsQuery = (
    id: string
  ): UseQueryResult<IblogDetailsProps, unknown> => {
    return useQuery({
      queryKey: ["BLOG-DETAILS", id, "ADD-COMMENT"],
      queryFn: () => blogDetailsAPICall(id)
    });
  };

  // for comments fetching
export const allCommentsQuery = (
    id: string
  ): UseQueryResult<ICommentProps, unknown> => {
    return useQuery({
      queryKey: ["BLOG-DETAILS", id, "ADD-COMMENT", "COMMENTS"],
      queryFn: () => allCommentsAPICall(id)
    });
  };

  // for add-comment query
export const addCommentMutation = (id: string) => {
    const { queryClient } = useGlobalHooks();
    return useMutation({
        mutationFn: (payload: addCommentProps) => addCommentFn(id, payload),
        onSuccess: data => {
        // queryClient.invalidateQueries({ queryKey: ["BLOGS"] });
        queryClient.invalidateQueries({ queryKey: ["ADD-COMMENT"] });
        console.log(data, "data of comments adding");
        }
    });
};

  //for add likes query
export const addLikesMutation = (id: string) => {
    const { queryClient } = useGlobalHooks();
    return useMutation({
        mutationFn: () => addLikesFn(id),
        onSuccess: data => {
        // queryClient.invalidateQueries({ queryKey: ["BLOGS"] });
        queryClient.invalidateQueries({ queryKey: ["ADD-LIKES"] });
        console.log(data.likes, "data of likes adding");
        }
    });
};

// for add unlikes query
export const addUnlikesMutation = (id: string) => {
    const { queryClient } = useGlobalHooks();
    return useMutation({
        mutationFn: () => addUnlikesFn(id),
        onSuccess: data => {
        // queryClient.invalidateQueries({ queryKey: ["BLOGS"] });
        queryClient.invalidateQueries({ queryKey: ["ADD-UNLIKES"] });
        console.log(data.unlikes, "data of unlikes adding");
        }
    });
};

// for showing all category

export const allCategoriesQuery = (): UseQueryResult<allCategoryProps, unknown> => {
  return useQuery({
    queryKey: ["ALL-CATEGORIES"],
    queryFn: allCategoriesAPICall
  });
};

// for fetching blogs by category
export const categoryBlogsQuery = (categoryId: string): UseQueryResult<categoryPostProps, unknown> => {
  return useQuery({
    queryKey: ["CATEGORY_BLOGS", categoryId],
    queryFn: () => blogsByCategoryAPICall(categoryId),
    enabled: !!categoryId, // Only run the query if categoryId exists
  });
};

// for latest-blogs query
export const latestBlogsQuery = (): UseQueryResult<IlatestBlogsProps, unknown> => {
  return useQuery({
    queryKey: ["LATEST-BLOGS"],
    queryFn: latestBlogsAPICall
  });
};

///////////////////////////// for page-content query /////////////////////////////

// for services query
export const allServicesQuery = (): UseQueryResult<IservicesProps, unknown> => {
  return useQuery({
    queryKey: ["ALL-SERVICES"],
    queryFn: allServicesAPICall
  });
};

// for testimonials query
export const allTestimonialsQuery = (): UseQueryResult<ItestimonialProps, unknown> => {
  return useQuery({
    queryKey: ["ALL-TESTIMONIALS"],
    queryFn: allTestimonialsAPICall
  });
};

// for team query
export const allTeamMembersQuery = (): UseQueryResult<IteamMemberProps, unknown> => {
  return useQuery({
    queryKey: ["ALL-Team-MEMBERS"],
    queryFn: allTeammembersAPICall
  });
};

// for courses query
export const allCoursesQuery = (): UseQueryResult<IcoursesProps, unknown> => {
  return useQuery({
    queryKey: ["ALL-COURSES"],
    queryFn: allCoursesAPICall
  });
};

// for banner query
export const allBannersQuery = (): UseQueryResult<IbannerProps, unknown> => {
  return useQuery({
    queryKey: ["BANNERS"],
    queryFn: allBannersAPICall
  });
};

// for creating contact query
export const createContactMutation = (): UseMutationResult<IcontactProps, unknown> => {
  const { queryClient } = useGlobalHooks()
  // const cookie = new Cookies()
  return useMutation<IcontactProps, void, unknown>({
      mutationFn: addContactFn,
      onSuccess: (res: IcontactProps) => {
          const { success, message } = res || {}
          if (success) {
              // cookie.set("token", token, { path: "/", secure: true })
              console.log(res, "res");
          }
          queryClient.invalidateQueries({ queryKey: ["CREATE_CONTACT"] })
      }
  })
}