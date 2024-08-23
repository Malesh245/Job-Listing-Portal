import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import { setAuthUser, setLoading } from "@/redux/authSlice";
import { RadioGroup } from "../ui/radio-group";

const SuperAdminLogin = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });
  const navigate = useNavigate();
  const { loading, authUser } = useSelector((store) => store.auth);
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        "http://localhost:8000/api/v1/user/login-superadmin",
        input,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        dispatch(setAuthUser(res.data.user));
        navigate("/superadmin/dashboard");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="flex items-center justify-center max-w-7xl mx-auto">
      <form
        onSubmit={handleSubmit}
        className="w-1/2 border border-gray-200 rounded-md p-4 my-10"
      >
        <h2 className="font-bold text-xl mb-4 text-center">
          Super Admin Login
        </h2>
        <RadioGroup className="flex items-center gap-4">
          <div className="flex items-center space-x-2">
            <Input
              type="radio"
              name="role"
              value="super admin"
              checked={input.role === "super admin"}
              onChange={changeEventHandler}
              className="cursor-pointer"
            />
            <Label htmlFor="r1">super admin</Label>
          </div>
        </RadioGroup>
        <div>
          <div className="my-2">
            <Label>Email</Label>
            <Input
              type="email"
              name="email"
              value={input.email}
              onChange={changeEventHandler}
              placeholder="example@gmail.com"
            />
          </div>
          <div className="my-2">
            <Label>Password</Label>
            <Input
              type="password"
              name="password"
              value={input.password}
              onChange={changeEventHandler}
              placeholder="password"
            />
          </div>

          {loading ? (
            <Button className="w-full my-4">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </Button>
          ) : (
            <Button type="submit" className="w-full my-4">
              Login
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default SuperAdminLogin;
