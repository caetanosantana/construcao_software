const user = {
  name: "Nome do Professor",
  email: "professor@exemplo.com",
  avatar: "https://example.com/avatar.jpg",
  userType: "teacher",
} as const;

export const getUserInfo = () => {
  const {userType, ...info} = user;
  return info;
}

export const getUserType = () => {
  // FIXME: Após implementar o Auth, verificar o tipo do usuário
  const {userType} = user;

  return userType;
}