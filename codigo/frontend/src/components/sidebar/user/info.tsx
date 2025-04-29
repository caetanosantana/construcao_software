import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getUserInfo } from "@/lib/user";

export const TeacherInfo = () => {
  const user = getUserInfo(); // Mock function to get user info
  
  return (
    <div className="flex items-center gap-2 p-4">
      <Avatar className="size-14 rounded-full">
        <AvatarImage src={user.avatar} alt={user.name} />
        <AvatarFallback className="rounded-lg">{user.name.at(0)?.toLocaleUpperCase()}</AvatarFallback>
      </Avatar>
      <div className="grid flex-1 text-left text-sm leading-tight">
        <span className="truncate font-semibold">{user.name}</span>
        <span className="truncate text-xs">{user.email}</span>
      </div>
    </div>
  );
};
