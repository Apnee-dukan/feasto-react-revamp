import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { X, Eye, EyeOff } from "lucide-react";
import axios from "axios";
import OtpModal from "./OtpModal";
import toast from "react-hot-toast";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal = ({ isOpen, onClose }: LoginModalProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [otpModalOpen, setOtpModalOpen] = useState(false);
  const [userId, setUserId] = useState("");
  const [signupError, setSignupError] = useState("");
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [signupData, setSignupData] = useState({
    f_name: "",
    email: "",
    mobile: "",
    code_mobile: "+60",
    password: "",
    confirmPassword: "",
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const documenturl = "https://feasto.com.my/web/api/";
    const API_HEADER = {
      headers: {
        "x-api-key": "Sdrops!23",
        "Access-Control-Allow-Origin": "*",
        crossdomain: true,
      },
    };
    const URL =
      documenturl +
      "auth/validate?email=" +
      loginData.email +
      "&password=" +
      loginData.password;
    axios
      .get(URL, API_HEADER)
      .then((res) => {
        console.log(res);
        if (res.data.status) {
          localStorage.setItem("userid", res.data.result[0].id);
          let userName = res.data.result[0].f_name;
          if (res.data.result[0].l_name) {
            userName += " " + res.data.result[0].l_name;
          }
          let userDetails = {
            name: userName,
            mobile: res.data.result[0].mobile,
          };
          localStorage.setItem("userDetails", JSON.stringify(userDetails));
          window.location.href = document.referrer;
          // this.setState({ list: res.message })
        } else {
          // this.setState({ loginError: res.data.message });
          console.log(res);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // OTP handler
  const handleOtpVerify = (otpCode: string) => {
    console.log("OTP Entered:", otpCode);
    if (userId) {
      const documenturl = "https://feasto.com.my/web/api/";
      const API_HEADER = {
        headers: {
          "x-api-key": "Sdrops!23",
          "Access-Control-Allow-Origin": "*",
          crossdomain: true,
        },
      };
      const URL =
        documenturl + "customer/customer/otpVerification?user_id=" + userId + "&otp=" + otpCode;
      axios
        .get(URL, API_HEADER)
        .then((res) => {
          console.log(res);
          if (res.data.status) {
            toast.success("OTP Verified Successfully!");
            setOtpModalOpen(false);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
    setOtpModalOpen(false);
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    const documenturl = "https://feasto.com.my/web/api/";
    const API_HEADER = {
      headers: {
        "x-api-key": "Sdrops!23",
        "Access-Control-Allow-Origin": "*",
        crossdomain: true,
      },
    };
    const URL =
      documenturl + "customer/customer/signup";
    axios
      .post(URL, signupData, API_HEADER)
      .then((res) => {
        if (res.data.success) {
          setUserId(res.data.user_id);
          onClose();
          setOtpModalOpen(true);       
        } else {
          setSignupError("User Already Registered!");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-orange-600 text-xl font-bold">
              Welcome to Feasto
            </DialogTitle>
          </DialogHeader>

          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>

            <TabsContent value="login" className="space-y-4 mt-6">
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <Label htmlFor="login-email">Email</Label>
                  <Input
                    id="login-email"
                    type="email"
                    placeholder="Enter your email"
                    value={loginData.email}
                    onChange={(e) =>
                      setLoginData({ ...loginData, email: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="login-password">Password</Label>
                  <div className="relative">
                    <Input
                      id="login-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={loginData.password}
                      onChange={(e) =>
                        setLoginData({ ...loginData, password: e.target.value })
                      }
                      required
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>
                <div className="text-right">
                  <a
                    href="#"
                    className="text-sm text-orange-600 hover:underline"
                  >
                    Forgot Password?
                  </a>
                </div>
                <Button
                  type="submit"
                  className="w-full bg-orange-600 hover:bg-orange-700"
                >
                  Login
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="signup" className="space-y-4 mt-6">
              <form onSubmit={handleSignup} className="space-y-4">
                <div>
                  <Label htmlFor="signup-name">Full Name</Label>
                  <Input
                    id="signup-name"
                    type="text"
                    placeholder="Enter your full name"
                    value={signupData.f_name}
                    onChange={(e) =>
                      setSignupData({ ...signupData, f_name: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="signup-email">Email</Label>
                  <Input
                    id="signup-email"
                    type="email"
                    placeholder="Enter your email"
                    value={signupData.email}
                    onChange={(e) =>
                      setSignupData({ ...signupData, email: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="signup-phone">Phone Number</Label>
                  <div className="flex gap-2">
                    <select
                      className="border rounded px-3 py-2"
                      value={signupData.code_mobile || "+60"}
                      onChange={(e) =>
                        setSignupData({
                          ...signupData,
                          code_mobile: e.target.value,
                        })
                      }
                    >
                      <option value="+60">🇲🇾 +60 (Malaysia)</option>
                      <option value="+91">🇮🇳 +91 (India)</option>
                      <option value="+1">🇺🇸 +1 (USA)</option>
                      <option value="+44">🇬🇧 +44 (UK)</option>
                      <option value="+61">🇦🇺 +61 (Australia)</option>
                    </select>
                    <Input
                      id="signup-phone"
                      type="tel"
                      placeholder="Enter phone number"
                      value={signupData.mobile}
                      onChange={(e) =>
                        setSignupData({ ...signupData, mobile: e.target.value })
                      }
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="signup-password">Password</Label>
                  <div className="relative">
                    <Input
                      id="signup-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={signupData.password}
                      onChange={(e) =>
                        setSignupData({
                          ...signupData,
                          password: e.target.value,
                        })
                      }
                      required
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>
                <div>
                  <Label htmlFor="signup-confirm-password">
                    Confirm Password
                  </Label>
                  <Input
                    id="signup-confirm-password"
                    type="password"
                    placeholder="Confirm your password"
                    value={signupData.confirmPassword}
                    onChange={(e) =>
                      setSignupData({
                        ...signupData,
                        confirmPassword: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                {signupError && (
                  <p className="text-red-600 text-sm">{signupError}</p>
                )}
                <Button
                  type="submit"
                  className="w-full bg-orange-600 hover:bg-orange-700"
                >
                  Sign Up
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
      <OtpModal
        isOpen={otpModalOpen}
        onClose={() => setOtpModalOpen(false)}
        email={signupData.code_mobile + signupData.mobile}
        onVerifyOtp={handleOtpVerify}
      />
    </>
  );
};

export default LoginModal;
