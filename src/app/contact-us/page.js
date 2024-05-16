import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";


export default function Page() {
    return (
        <>
        <Navbar tabNumber={4} />
        <div className="contact-us">
            
            <form action="#">
                <h2>Contact Us</h2>
                <small>If you have any questions or concerns, please feel free to contact us. We are here to help.</small>
                <div className="form-group">
                    <label for="name">Name</label>
                    <input type="text" id="name" required />
                </div>
                <div className="form-group">
                    <label for="email">Email</label>
                    <input type="email" id="email" required />
                </div>
                <div className="form-group">
                    <label for="message">Message</label>
                    <textarea id="message" rows="6" required></textarea>
                </div>
                <div className="form-group">
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
        <Footer />
        </>
    )
}