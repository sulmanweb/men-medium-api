import userView from './user.view'

const index = (posts) => {
  const arr = [];
  for (let post of posts) {
    arr.push(_post_public(post))
  }
  return arr;
};

const _post_public = (post) => {
  return {
    id: post._id,
    createdBy: userView._userSelf(post.createdBy),
    title: post.title,
  }
};

const _post = (post) => {
  return {
    id: post._id,
    createdBy: userView._userSelf(post.createdBy),
    title: post.title,
    body: post.body,
    publish: post.publish
  }
};

export default {index, _post_public, _post}