'use server';

import { db, makers_table } from '@/db';
import { revalidatePath } from 'next/cache';
import { getMakerByUsername } from './getMakers';

export type TUserData = {
  data: {
    viewer: {
      user: {
        name: string;
        profileImage: string;
        twitterUsername: string;
        url: string;
        username: string;
        websiteUrl: string;
        madePosts: {
          totalCount: number;
          nodes: Array<{
            commentsCount: number;
            createdAt: string;
            dailyRank: number | null;
            description: string;
            featuredAt: string | null;
            id: string;
            isCollected: boolean;
            isVoted: boolean;
            monthlyRank: number | null;
            name: string;
            reviewsCount: number;
            reviewsRating: number;
            scheduledAt: string;
            slug: string;
            tagline: string;
            url: string;
            userId: string;
            votesCount: number;
            website: string;
            weeklyRank: number | null;
            yearlyRank: number | null;
            makers: Array<{
              coverImage: string;
              createdAt: string;
              headline: string;
              id: string;
              isFollowing: boolean;
              isMaker: boolean;
              isViewer: boolean;
              name: string;
              profileImage: string;
              twitterUsername: string;
              url: string;
              username: string;
              websiteUrl: string;
              madePosts: {
                totalCount: number;
                nodes: Array<{
                  commentsCount: number;
                  createdAt: string;
                  dailyRank: number | null;
                  description: string;
                  featuredAt: string | null;
                  id: string;
                  isCollected: boolean;
                  isVoted: boolean;
                  monthlyRank: number | null;
                  name: string;
                  reviewsCount: number;
                  reviewsRating: number;
                  scheduledAt: string;
                  slug: string;
                  tagline: string;
                  url: string;
                  userId: string;
                  votesCount: number;
                  website: string;
                  weeklyRank: number | null;
                  yearlyRank: number | null;
                }>;
              };
            }>;
          }>;
        };
        submittedPosts: {
          totalCount: number;
        };
        isMaker: boolean;
      };
    };
    topics: {
      totalCount: number;
    };
  };
};

export const getUserData = async (token: string) => {
  const baseUrl = 'https://api.producthunt.com/v2/api/graphql';

  const query = `
  query User {
    viewer {
        user {
            name
            profileImage
            twitterUsername
            url
            username
            websiteUrl
            madePosts {
                totalCount
                nodes {
                    commentsCount
                    createdAt
                    dailyRank
                    description
                    featuredAt
                    id
                    isCollected
                    isVoted
                    monthlyRank
                    name
                    reviewsCount
                    reviewsRating
                    scheduledAt
                    slug
                    tagline
                    url
                    userId
                    votesCount
                    website
                    weeklyRank
                    yearlyRank
                    makers {
                        coverImage
                        createdAt
                        headline
                        id
                        isFollowing
                        isMaker
                        isViewer
                        name
                        profileImage
                        twitterUsername
                        url
                        username
                        websiteUrl
                        madePosts {
                            totalCount
                            nodes {
                                commentsCount
                                createdAt
                                dailyRank
                                description
                                featuredAt
                                id
                                isCollected
                                isVoted
                                monthlyRank
                                name
                                reviewsCount
                                reviewsRating
                                scheduledAt
                                slug
                                tagline
                                url
                                userId
                                votesCount
                                website
                                weeklyRank
                                yearlyRank
                            }
                        }
                    }
                }
            }
            submittedPosts {
                totalCount
            }
            isMaker
        }
    }
    topics {
        totalCount
    }
}
`;

  const response = await fetch(baseUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ query }),
  });

  if (!response.ok) {
    throw new Error(`Error fetching data: ${response.statusText}`);
  }

  const data = await response.json();

  const exists = await getMakerByUsername(data.data.viewer.user.username);

  if (!exists.length) {
    await db.insert(makers_table).values({
      username: data.data.viewer.user.username,
    });

    revalidatePath('/');
  }

  return data;
};
