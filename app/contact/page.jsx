"use client";
import React, { useState } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from "../../components/ui/select";
import { FaPhoneAlt, FaEnvelope, FaMapMarker } from "react-icons/fa";
import { motion } from "framer-motion";
import emailjs from "emailjs-com";

// Simple Toast Component
const Toast = ({ message, type }) => {
  return (
    <div
      className={`fixed bottom-6 right-6 px-4 py-3 rounded-lg shadow-lg transition-all duration-500
      ${type === "success" ? "bg-[#27272c] text-green-400" : "bg-[#27272c] text-red-400"}`}
    >
      {message}
    </div>
  );
};

const info = [
  { icon: <FaPhoneAlt />, title: "Phone", description: "+91 8777-692-898" },
  { icon: <FaEnvelope />, title: "Personal Email", description: "aritrabiswas9788@gmail.com" },
  { icon: <FaEnvelope />, title: "Institute Email", description: "22je0163@iitism.ac.in" },
  { icon: <FaMapMarker />, title: "Address", description: "9/1 M.C. Ghosh Lane, Howrah, West Bengal, India - 711101" },
];

const Contact = () => {
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null); // { message, type }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .send(
        "service_tjcrkhd", // your service ID
        "template_1t4xtce", // your template ID
        {
          firstname: form.firstname,
          lastname: form.lastname,
          email: form.email,
          phone: form.phone,
          service: form.service,
          message: form.message,
        },
        "OLe80DNh4ncqMXBNX" // your public key
      )
      .then(() => {
        setToast({ message: "✅ Message sent successfully!", type: "success" });
        setLoading(false);
        setForm({ firstname: "", lastname: "", email: "", phone: "", service: "", message: "" });
        setTimeout(() => setToast(null), 3000); // hide toast after 3s
      })
      .catch((err) => {
        console.error("EmailJS error:", err);
        setToast({ message: "❌ Failed to send message. Try again.", type: "error" });
        setLoading(false);
        setTimeout(() => setToast(null), 3000);
      });
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.4, delay: 1.5, ease: "easeIn" } }}
      className="min-h-[calc(100vh-100px)] py-6"
    >
      <div className="container mx-auto">
        <div className="flex flex-col xl:flex-row gap-[30px]">
          {/* Left Form */}
          <div className="xl:h-[45%] order-2 xl:order-none">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-10 bg-[#27272c] rounded-xl">
              <h3 className="text-2xl text-white">
                Let's Work Together<span className="text-accent">.</span>
              </h3>
              <p className="text-sm text-white/60">
                Lets work together to create something amazing. Whether you have a project in mind, need assistance, or
                just want to say hello, I'm here to help.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input name="firstname" value={form.firstname} onChange={handleChange} placeholder="Firstname" />
                <Input name="lastname" value={form.lastname} onChange={handleChange} placeholder="Lastname" />
                <Input name="email" type="email" value={form.email} onChange={handleChange} placeholder="Email" />
                <Input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone" />
              </div>

              <Select onValueChange={(val) => setForm({ ...form, service: val })}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a service" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Select a service</SelectLabel>
                    <SelectItem value="web">Web Development</SelectItem>
                    <SelectItem value="ui">UI/UX Design</SelectItem>
                    <SelectItem value="webapp">Web App Development</SelectItem>
                    <SelectItem value="mobile">Mobile App Development</SelectItem>
                    <SelectItem value="ai">Machine Learning/AI</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>

              <Textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                className="h-[200px]"
                placeholder="Type your message here."
              />

              <Button type="submit" size="md" className="max-w-40" disabled={loading}>
                {loading ? (
                  <div className="flex items-center gap-2">
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                    </svg>
                    Sending...
                  </div>
                ) : (
                  "Send message"
                )}
              </Button>
            </form>
          </div>

          {/* Right Info */}
          <div className="flex-1 flex items-center xl:justify-end order-1 xl:order-none mb-8 xl:mb-0">
            <ul className="flex flex-col gap-10">
              {info.map((item, index) => (
                <li key={index} className="flex items-center gap-6">
                  <div className="text-accent w-[52px] h-[52px] xl:w-[65px] xl:h-[65px] bg-[#27272c] rounded-md flex items-center justify-center">
                    <div className="text-[28px]">{item.icon}</div>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-white/60 text-sm">{item.title}</h4>
                    <p className="text-md">{item.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      {toast && <Toast message={toast.message} type={toast.type} />}
    </motion.section>
  );
};

export default Contact;
