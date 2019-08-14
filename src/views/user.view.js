const auth = (user, token) => {
  return {
    token: token,
    user: _userSelf(user)
  }
};

const _userSelf = (user) => {
  return {
    id: user._id,
    email: user.email,
    name: user.name
  }
};

export default {auth, _userSelf}