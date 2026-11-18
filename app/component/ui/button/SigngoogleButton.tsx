import Link from "next/link";
import { REGISTER_GOOGLE_URL } from "@/lib/config";

type SigngoogleButtonProps = {
  className?: string;
  ariaLabel?: string;
  signupSource?: string;
};

export default function SigngoogleButton({
  className = "",
  ariaLabel = "Sign up with Google",
  signupSource = "",
}: SigngoogleButtonProps) {
  return (
    <Link
      href={`${REGISTER_GOOGLE_URL}`}
      target="_blank"
      aria-label={ariaLabel}
      data-source={signupSource}
      className={`bg-indigo-600 text-white text-sm px-4 py-3 rounded-xl flex items-center justify-center gap-3 ${className}`.trim()}
    >
      <svg viewBox="0 0 48 48" className="w-5 h-5 sm:w-6 sm:h-6 inline-block rounded-sm bg-white p-1" aria-hidden>
        <g>
          <path fill="#4285F4" d="M43.6 20.5H42V20.4H24v7.2h11.2C33.9 32.1 29.4 35 24 35c-6.1 0-11-4.9-11-11s4.9-11 11-11c2.6 0 5 .9 6.9 2.5l5.8-5.8C33.5 7.1 28.9 5 24 5 12.9 5 4 13.9 4 25s8.9 20 20 20c11 0 20-8.9 20-20 0-1.3-.1-2.7-.4-4z" />
          <path fill="#34A853" d="M6.3 14.1l5.9 4.3C14.2 15.1 18.7 12 24 12c2.6 0 5 .9 6.9 2.5l5.8-5.8C33.5 7.1 28.9 5 24 5c-7.1 0-13.1 4.1-16.1 10.1z" />
          <path fill="#FBBC05" d="M24 44c5.3 0 10.1-1.8 13.8-4.9l-6.4-5.2C29.5 35.7 26.9 36.7 24 36.7c-5.4 0-9.9-3.6-11.5-8.5l-6.1 4.7C7 39.1 14.9 44 24 44z" />
          <path fill="#EA4335" d="M43.6 20.5H42V20.4H24v7.2h11.2c-1.1 3.1-3.6 5.7-6.6 7.1l6.4 5.2C39.9 37.1 44 31.9 44 25c0-1.3-.1-2.7-.4-4z" />
        </g>
      </svg>
      Sign up with Google
    </Link>
  );
}
