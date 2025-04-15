"use client";

import { signOutAction } from "@/app/actions";
import { AnimatePresence, motion } from "framer-motion";
import { KeyRound, List, Plus, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function TrackerButton() {
  const [isAddOnClick, setIsAddOnClick] = useState(false);
  const [isListOnClick, setIsListOnClick] = useState(false);
  const [isResetOnClick, setIsResetOnClick] = useState(false);
  const [isLogoutOnClick, setIsLogoutOnClick] = useState(false);

  const btnStyle =
    "border py-1 px-[.3rem] bg-background hover:bg-muted cursor-pointer transition-all duration-300";
  const btnSize = 20;

  const btnContainerStyle =
    "flex align-middle items-center content-center gap-2 cursor-pointer font-semibold";
  return (
    <div className="py-6 [&_p]:my-6 flex justify-center gap-6 text-sm">
      <div className={`text-primary ${btnContainerStyle}`}>
        <button
          onClick={() => {
            setIsAddOnClick(!isAddOnClick);
            setIsListOnClick(false);
            setIsResetOnClick(false);
            setIsLogoutOnClick(false);
          }}
          type="button"
          className={`border-primary text-primary ${btnStyle}`}
        >
          <Plus size={btnSize} />
        </button>
        <AnimatePresence>
          {isAddOnClick && (
            <Link href="/protected/add-problem">
              <motion.span
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.3 }}
                className="self-center hover:border-b hover:border-primary"
              >
                Add Problem
              </motion.span>
            </Link>
          )}
        </AnimatePresence>
      </div>
      <div className={`text-secondary ${btnContainerStyle}`}>
        <button
          onClick={() => {
            setIsAddOnClick(false);
            setIsListOnClick(!isListOnClick);
            setIsResetOnClick(false);
            setIsLogoutOnClick(false);
          }}
          type="button"
          className={`border-secondary text-secondary ${btnStyle}`}
        >
          <List size={btnSize} />
        </button>
        <AnimatePresence>
          {isListOnClick && (
            <Link href="/protected/list-problems">
              <motion.span
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.3 }}
                className="self-center hover:border-b hover:border-secondary"
              >
                List Problems
              </motion.span>
            </Link>
          )}
        </AnimatePresence>
      </div>
      <div className={`text-violet-500 ${btnContainerStyle}`}>
        <button
          onClick={() => {
            setIsAddOnClick(false);
            setIsListOnClick(false);
            setIsResetOnClick(!isResetOnClick);
            setIsLogoutOnClick(false);
          }}
          type="button"
          className={`border-violet-500 text-violet-500 ${btnStyle}`}
        >
          <KeyRound size={btnSize} />
        </button>
        <AnimatePresence>
          {isResetOnClick && (
            <Link href="/protected/reset-password">
              <motion.span
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.3 }}
                className="self-center hover:border-b hover:border-violet-500"
              >
                Reset Password
              </motion.span>
            </Link>
          )}
        </AnimatePresence>
      </div>
      <div className={`text-destructive ${btnContainerStyle}`}>
        <button
          onClick={() => {
            setIsAddOnClick(false);
            setIsListOnClick(false);
            setIsResetOnClick(false);
            setIsLogoutOnClick(!isLogoutOnClick);
          }}
          type="button"
          className={`border-destructive text-destructive ${btnStyle}`}
        >
          <X size={btnSize} />
        </button>
        <AnimatePresence>
          {isLogoutOnClick && (
            <form action={signOutAction}>
              <motion.button
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.3 }}
                className="self-center hover:border-b hover:border-destructive cursor-pointer"
              >
                Sign out
              </motion.button>
            </form>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
