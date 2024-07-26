import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar } from "./ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { LogOut, User2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setAuthUser } from "@/redux/authSlice";

export function ProfilePopover() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { authUser } = useSelector((store) => store.auth);
  const logoutHandler = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/v1/user/logout", {
        withCredentials: true,
      });

      if (res.data.success) {
        dispatch(setAuthUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Avatar className="cursor-pointer">
          <AvatarImage src={authUser?.profile?.profilePhoto} alt="@shadcn" />
        </Avatar>
      </PopoverTrigger>
      <PopoverContent className="w-80 sm:w-72 md:w-80 lg:w-96">
        <div className="grid gap-4">
          <div className="flex items-center gap-3 sm:gap-2 space-y-2">
            <Avatar className="cursor-pointer">
              <AvatarImage
                src={authUser?.profile?.profilePhoto}
                alt="@shadcn"
              />
            </Avatar>
            <div>
              <h4 className="font-medium text-lg sm:text-base">
                {authUser?.fullname}
              </h4>
              {authUser?.role === "student" && (
                <p className="text-sm text-gray-500">{authUser?.profile.bio}</p>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-3 text-gray-600">
            {authUser?.role === "student" && (
              <Link
                to="/profile"
                className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 p-2 rounded-md transition-colors"
              >
                <User2 />
                <p className="text-sm">View Profile</p>
              </Link>
            )}
            <div
              onClick={logoutHandler}
              className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 p-2 rounded-md transition-colors"
            >
              <LogOut />
              <p className="text-sm">Logout</p>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
