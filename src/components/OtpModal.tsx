import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";

interface OtpModalProps {
  isOpen: boolean;
  onClose: () => void;
  email: string;
  onVerifyOtp: (otp: string) => void;
}

const OtpModal: React.FC<OtpModalProps> = ({ isOpen, onClose, email, onVerifyOtp }) => {
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [resendCount, setResendCount] = useState(0);

  const handleChange = (value: string, index: number) => {
    if (!/^\d*$/.test(value)) return; // allow only digits
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      const next = document.getElementById(`otp-${index + 1}`);
      if (next) (next as HTMLElement).focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const otpCode = otp.join("");
    if (otpCode.length === 6) {
      onVerifyOtp(otpCode);
    } else {
      alert("Please enter all 6 digits of the OTP");
    }
  };

  const handleResend = () => {
    setResendCount(resendCount + 1);
    // console.log("Resend OTP to:", email);
    // Trigger resend OTP API here
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md w-full max-w-[95vw]">
        <DialogHeader className="text-center">
          <DialogTitle className="text-xl font-bold text-orange-600">
            OTP Verification
          </DialogTitle>
          <p className="text-sm text-gray-500 mt-1">Enter the 6-digit code sent to <strong>{email}</strong></p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
          <div className="flex justify-between gap-2">
            {otp.map((digit, index) => (
              <Input
                key={index}
                id={`otp-${index}`}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(e.target.value, index)}
                className="text-center text-xl w-10 h-12 md:w-12 md:h-14"
              />
            ))}
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
            <Button
              type="submit"
              className="w-full sm:w-auto bg-orange-600 hover:bg-orange-700"
            >
              Verify OTP
            </Button>
            <button
              type="button"
              onClick={handleResend}
              className="text-sm text-orange-600 hover:underline"
            >
              Resend OTP{resendCount > 0 ? ` (${resendCount})` : ""}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default OtpModal;
