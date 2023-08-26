/* eslint-disable no-plusplus */
import React from 'react';

import './App.scss';

import postsFromServer from './api/posts';
import commentsFromServer from './api/comments';
import usersFromServer from './api/users';

import { Post } from './types/Post';
import { User } from './types/User';
import { Comment } from './types/Comment';
import { PostList } from './components/PostList';

function getUser(userId: number): User | undefined {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || undefined;
}

function getComments(id: number): Comment[] | null {
  const foundComments = [];

  for (let i = 0; i < commentsFromServer.length; i++) {
    if (id === commentsFromServer[i].postId) {
      foundComments.push(commentsFromServer[i]);
    }
  }

  if (foundComments.length) {
    return foundComments;
  }

  return null;
}

export const posts: Post[] = postsFromServer.map(post => ({
  ...post,
  user: getUser(post.userId),
  comments: getComments(post.id),
}));

export const App: React.FC = () => (
  <section className="App">
    <h1 className="App__title">Static list of posts</h1>

    <PostList posts={posts} />
  </section>
);
