import { useState } from "react";

export default function Contact() {
  const [status, setStatus] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Message sent successfully!");
    setTimeout(() => setStatus(""), 3000);
  };

  return (
    <section id="contact" className="section-padding">
      <div className="container mx-auto">
        <div className="max-w-xl mx-auto">
          <span className="text-sm uppercase tracking-widest mb-4 inline-block">
            Contact
          </span>
          <h2 className="text-3xl md:text-4xl font-medium mb-8">Get in Touch</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block mb-2 text-sm">
                Name
              </label>
              <input
                type="text"
                id="name"
                required
                className="w-full p-3 border bg-transparent focus:outline-none focus:ring-1 focus:ring-black transition-all"
              />
            </div>
            <div>
              <label htmlFor="email" className="block mb-2 text-sm">
                Email
              </label>
              <input
                type="email"
                id="email"
                required
                className="w-full p-3 border bg-transparent focus:outline-none focus:ring-1 focus:ring-black transition-all"
              />
            </div>
            <div>
              <label htmlFor="message" className="block mb-2 text-sm">
                Message
              </label>
              <textarea
                id="message"
                required
                rows={4}
                className="w-full p-3 border bg-transparent focus:outline-none focus:ring-1 focus:ring-black transition-all"
              />
            </div>
            <button
              type="submit"
              className="w-full py-4 bg-black text-white hover:bg-neutral-800 transition-colors duration-300"
            >
              Send Message
            </button>
            {status && (
              <p className="text-center text-sm text-neutral-600">{status}</p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}