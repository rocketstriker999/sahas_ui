import React from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { InputTextarea } from 'primereact/inputtextarea';
import Navbar from '../common/Navbar';

const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted');
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-column justify-content-center align-items-center min-h-screen bg-gray-100 p-4">
        <div className="flex flex-wrap surface-card shadow-3 border-round w-11 md:w-10 overflow-hidden">
          {/* Left Panel */}
          <div className="w-full lg:w-5 bg-indigo-800 p-5 lg:p-6 flex flex-column justify-content-between text-white gap-2 md:gap-3">
            <h2 className="font-bold m-0 mb-2 text-base md:text-lg">Get in Touch</h2>
            <p className="m-0 text-xs md:text-sm">We'd love to hear from you. Our friendly team is always ready to assist you.</p>
            <div className="m-0">
              <h4 className="font-semibold text-base md:text-lg m-0 my-3">Classes Locations</h4>
              <div className="flex flex-column gap-2">
                <div className="bg-indigo-700 border-round p-2 shadow-2 text-center hover:shadow-4 transition-all w-full">
                  <p className="font-bold text-sm md:text-base text-white">Waghodia Branch</p>
                  <p className="text-xs md:text-sm line-height-2" style={{ letterSpacing: "0.5px" }}>FF9 Sharnam /complex,Opp. HDFC Bank,Near Crystal School,Waghodia Dabhoi ring Road.</p>
                  <p className="text-xs line-height-2">+91 9265352165</p>
                </div>
                <div className="bg-indigo-700 border-round p-2 shadow-2 text-center hover:shadow-4 transition-all w-full">
                  <p className="font-bold text-sm md:text-base text-white">Karelibaug Branch</p>
                  <p className="text-xs line-height-2" style={{ letterSpacing: "0.5px" }}>E 110 Vrundavan Township,Beside Tasty Restaurant,Near Sangam Cross Road,Karelibaug</p>
                  <p className="text-xs line-height-2">+91 9265347133</p>
                </div>
                <div className="bg-indigo-700 border-round p-2 shadow-2 text-center hover:shadow-4 transition-all w-full">
                  <p className="font-bold text-sm md:text-base text-white">Sayajigunj Branch</p>
                  <p className="text-xs line-height-2" style={{ letterSpacing: "0.5px" }}>3rd Floor (347,348,349),Iscon Janmahal,Opposite Vadodara Railway Station,Above Vitcos Bus Stand Beside Msu,Sayajigunj - Vadodara</p>
                  <p className="text-xs line-height-2">+91 9265343871</p>
                </div>
                {/* <div className="w-full">
                    <p className="font-semibold text-sm">Waghodia Branch</p>
                    <p className="text-sm line-height-2">FF9 Sharnam /complex,Opp. HDFC Bank,Near Crystal School,Waghodia Dabhoi ring Road.</p>
                    <p className="text-sm line-height-2">+91 9265352165</p>
                  </div>
                  <Divider />
                  <div className="w-full">
                    <p className="font-semibold text-sm">Karelibaug Branch</p>
                    <p className="text-sm line-height-2	">E 110 Vrundavan Township,Beside Tasty Restaurant,Near Sangam Cross Road,Karelibaug</p>
                    <p className="text-sm line-height-2">+91 9265347133</p>
                  </div>
                  <Divider />

                  <div className="w-full">
                    <p className="font-semibold text-sm">Sayajigunj Branch</p>
                    <p className="text-sm line-height-2	">3rd Floor (347,348,349),Iscon Janmahal,Opposite Vadodara Railway Station,Above Vitcos Bus Stand Beside Msu,Sayajigunj - Vadodara</p>
                    <p className="text-sm line-height-2">+91 9265343871</p>
                  </div>
                  <Divider /> */}
              </div>
            </div>
            <div className="m-0">
              <h4 className="font-semibold text-base md:text-lg m-0 my-3">Phone</h4>
              <p className="m-1 text-sm md:text-base">Mon-Fri, 8am - 5pm</p>
              <p className="m-1 font-semibold text-sm md:text-base">+91 84962 41111</p>
            </div>
            <div className="flex justify-content-start gap-3 mt-2 m-0">
              <i className="pi pi-facebook text-white cursor-pointer hover:text-gray-300 text-lg"></i>
              <i className="pi pi-instagram text-white cursor-pointer hover:text-gray-300 text-lg"></i>
              <i className="pi pi-linkedin text-white cursor-pointer hover:text-gray-300 text-lg"></i>
            </div>
          </div>
          {/* Right Panel - Form */}
          <div className="w-full lg:w-7 p-5 lg:p-6 flex flex-column align-items-center">
            <h2 className="mb-2 font-bold text-lg md:text-2xl">Level Up Your Brand</h2>
            <p className="text-gray-700 mb-5 text-sm md:text-base flex flex-column md:flex-row align-items-center">
              Reach out anytime at <span className="text-indigo-700 font-semibold ml-2">support@sahasintitute.com</span>
            </p>
            <form onSubmit={handleSubmit} className="w-full">
              <div className="mb-4">
                <label htmlFor="name" className="block text-600	 mb-2 font-semibold text-sm md:text-base">
                  Name
                </label>
                <InputText id="name" name="name" className="w-full text-xs md:text-sm" placeholder="Your name" required />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-600	 mb-2 font-semibold text-sm md:text-base">
                  Email
                </label>
                <InputText
                  id="email"
                  name="email"
                  type="email"
                  className="w-full text-xs md:text-sm"
                  placeholder="Your Email"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="phone" className="block text-600	 mb-2 font-semibold text-sm md:text-base">
                  Phone Number
                </label>
                <InputText id="phone" name="phone" className="w-full text-xs md:text-sm" placeholder="Your Phone Number" />
              </div>
              <div className="mb-4">
                <label htmlFor="query" className="block text-600	mb-2 font-semibold text-sm md:text-base">
                  How Can We Help?
                </label>
                <InputTextarea
                  id="query"
                  name="query"
                  className="w-full text-xs md:text-sm"
                  rows={4}
                  placeholder="Tell us a little about the project..."
                />
              </div>
              <Button
                type="submit"
                label="Submit"
                className="w-full bg-indigo-700 text-white font-semibold text-sm md:text-base hover:bg-indigo-800"
              />
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;