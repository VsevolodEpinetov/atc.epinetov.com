import React, { useEffect, useState } from 'react';
import PostService from '../../pages/api/PostsService';

import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";

import { Skeleton } from '@mui/material';
import { useFetching } from '../../lib/hooks/useFetching';

import NewsCard from './NewsCard';

const NewsFeed = ({ }) => {
  const [posts, setPosts] = useState([]);
  const [fetchPosts, arePostsLoading, postError] = useFetching(async (page) => {
    const data = await PostService.getAll(page);
    setPosts(data)
  })

  useEffect(() => {
    fetchPosts();
  }, [])

  return (
    <GridItem xs={12} sm={12} md={12}>
      <GridContainer>
        {
          arePostsLoading && Array(4).fill('1').map((a, id) =>
            <GridItem xs={12} sm={6} md={3} key={`skeleton-${id}`}>
              <Skeleton animation="wave" height={250} />
            </GridItem>
          )
        }
        {
          postError && <>{postError}</>
        }
        {
          !arePostsLoading &&
          posts.map((p, id) =>
            <GridItem xs={12} sm={6} md={3} key={`post-${id}`}>
              <NewsCard post={p} postID={id} />
            </GridItem>
          )
        }
      </GridContainer>
    </GridItem>
  );
};

export default NewsFeed;