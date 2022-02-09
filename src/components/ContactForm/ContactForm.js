import React, { useState } from "react";
import emailjs from "emailjs-com";
import "./ContactForm.css";

const ContactForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && email && message) {
      const serviceId = "service_bagnxso";
      const templateId = "template_jykjolz";
      const userId = "user_UGROIPtXhjPaFHijGnEbJ";
      const templateParams = {
        name,
        email,
        message,
      };

      emailjs
        .send(serviceId, templateId, templateParams, userId)
        .then((response) => console.log(response))
        .then((error) => console.log(error));

      setName("");
      setEmail("");
      setMessage("");
      setEmailSent(true);
    } else {
      alert("Please fill in all fields");
    }
  };

  return (
    <div className="contact-form">
      <div className="header-wrapper">
        <h1>Contact Us</h1>
      </div>
      <form className="form-container" onSubmit={handleSubmit}>
        <h2>We'd Love to Hear From You</h2>
        <p>
          If you have questions about your order, our products or our website,
          send us a message and we'll get back to you as soon as we can.
        </p>
        <label>
          Your Name:
          <input
            type="text"
            className="form-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>
          Email:
          <input
            type="text"
            className="form-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          Message:
          <textarea
            value={message}
            className="form-input"
            onChange={(e) => setMessage(e.target.value)}
          />
        </label>
        <button className="send-btn" type="submit">
          Send Message
        </button>
        {emailSent && <p>Thanks for getting in touch!</p>}
      </form>
    </div>
  );
};

export default ContactForm;
