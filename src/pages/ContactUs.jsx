import ContactDetails from "../components/core/ContactPage/ContactDetails"
import ContactUsForm from "../components/core/ContactPage/ContactUsForm"
import Footer from '../components/core/Homeapge/Footer'

const Contact = () => {
  return (
    <div className="mt-24">
      <div className="mx-auto mt-20 flex w-11/12 max-w-maxContent flex-col justify-between  text-white lg:flex-row">
        {/* Contact Details */}
        <div className="lg:w-[35%] transition-transform duration-300 hover:scale-105">
          <ContactDetails />
        </div>

        {/* Contact Form */}
        <div className="lg:w-[40%] pr-24">
          <ContactUsForm/>
        </div>
      </div>
      <div className="relative mx-auto my-20 flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 bg-richblack-900 text-white">
        {/* Reviws from Other Learner */}
        <h1 className="text-center text-4xl font-semibold mt-8">
          {/* Reviews from other learners */}
        </h1>
        {/* <ReviewSlider /> */}
      </div>
      <Footer />
      
    </div>
  )
}

export default Contact