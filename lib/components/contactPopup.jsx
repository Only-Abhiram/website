
"use client";

import React, { useState } from "react";
import { createPortal } from "react-dom";
export default function ContactModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const [form, setForm] = useState({
    name: "",
    contact: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!response.ok) throw new Error("Failed to send");

      setStatus("success");
      setForm({ name: "", contact: "", message: "" });
    } catch {
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Trigger */}
      <button
        onClick={() => {
          setIsOpen(true);
          setStatus("");
        }}
        className="
          px-3 py-2 rounded-lg
          border border-[#f1f5f9]
          text-sm font-medium 
          transition-all duration-300
          hover:bg-[#d4d4d4] hover:text-[#111]
          hover:cursor-pointer
        "
      >
        Message ↗
      </button>
      {/* Modal */}
      {isOpen &&
        createPortal(
          <div
            onClick={() => setIsOpen(false)}
            className="
        fixed inset-0 z-[9999]
        flex items-center justify-center
        bg-black/70 backdrop-blur-md
        p-4 sm:p-6
      "
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="
          relative
          w-full max-w-[440px]
          max-h-[calc(100dvh-32px)]
          overflow-y-auto
          rounded-2xl
          border border-white/20
          bg-white/10
          p-6 sm:p-8
          shadow-2xl
          text-[#d4d4d4]
          overscroll-contain
        "
            >
              {/* Close */}
              <button
                onClick={() => setIsOpen(false)}
                aria-label="Close"
                className="
            absolute right-5 top-5
            text-xl text-[#aaa]
            hover:text-white transition
          "
              >
                ×
              </button>

              <h2 className="text-2xl font-semibold">
                Let's connect.
              </h2>

              <p className="mt-2 text-sm text-[#999]">
                Have an idea, opportunity or just want to say hello?
                Drop me a message.
              </p>

              {status === "success" ? (
                <div className="py-12 text-center">
                  <p className="text-lg font-medium">
                    Message sent successfully!
                  </p>
                  <p className="mt-2 text-sm text-[#999]">
                    Thanks for reaching out. I'll get back to you.
                  </p>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="mt-6 border border-white/40 rounded-lg px-6 py-2 text-sm"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-7 space-y-5">

                  {/* Name */}
                  <div>
                    <label className="mb-2 block text-sm">
                      Your name
                    </label>
                    <input
                      required
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Saul Good Man"
                      className="
                      w-full rounded-lg
                      border border-white/20
                      bg-white/5
                      px-4 py-3
                      text-sm text-white
                      placeholder:text-[#777]
                      outline-none
                      focus:border-white/60
                      transition
                    "
                    />
                  </div>

                  {/* Contact */}
                  <div>
                    <label className="mb-2 block text-sm">
                      Contact
                    </label>
                    <input
                      required
                      name="contact"
                      value={form.contact}
                      onChange={handleChange}
                      placeholder="Email, phone or social handle"
                      className="
                      w-full rounded-lg
                      border border-white/20
                      bg-white/5
                      px-4 py-3
                      text-sm text-white
                      placeholder:text-[#777]
                      outline-none
                      focus:border-white/60
                      transition
                    "
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label className="mb-2 block text-sm">
                      Message
                    </label>
                    <textarea
                      required
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      rows={4}
                      maxLength={2000}
                      placeholder="What's on your mind?"
                      className="
                      w-full resize-none rounded-lg
                      border border-white/20
                      bg-white/5
                      px-4 py-3
                      text-sm text-white
                      placeholder:text-[#777]
                      outline-none
                      focus:border-white/60
                      transition
                    "
                    />
                  </div>

                  {status === "error" && (
                    <p className="text-sm text-white">
                      Couldn't send your message. Please try again.
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="
                w-full rounded-lg
                bg-[#d4d4d4]
                px-5 py-3
                text-sm font-semibold text-[#111]
                transition-all duration-300
                hover:bg-white
                disabled:opacity-50
              "
                  >
                    {loading ? "Sending..." : "Send Message ↗"}
                  </button>
                </form>
              )}
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
