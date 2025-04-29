export const getUserInfo = () => {
  return {
    name: "Nome do Professor",
    email: "professor@exemplo.com",
    avatar: "https://example.com/avatar.jpg",
  } as const;
}