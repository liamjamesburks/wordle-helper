import './footer-styles.css';

import { DuplicateIcon } from "@heroicons/react/outline";
import { GlobeIcon } from "@heroicons/react/outline";
import { LinkIcon } from "@heroicons/react/outline";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Footer = () => {

    const copyToClipboard = (event) => {
        const id = event.target.id;

        let url;
        if (id.indexOf('#') >= 0) {
            url = event.target.parentElement.id;
            console.log(event.target.parentElement.id);
        } else {
            url = event.target.id;
        }
        
        navigator.clipboard.writeText(url).then(()=>{
            if (url.indexOf("liamjames") >= 0) {
                toast("Email Copied to Clipboard",
                    {
                        position: "bottom-right",
                        autoClose: 2000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: false,
                        progress: undefined
                    });
            } else {
                window.open(url);
            }
        })
    }

    return (
        <div className="footer-container">
            <div className="centred">
                <h6 className="larger lighter"><strong>Copyright &copy;</strong> Liam Burks</h6>
            </div>
            <span className="line" />

            <div id="liamjamesburks@gmail.com" className="footer-item-container" onClick={copyToClipboard}>
                <p id="p#1" className="lighter footer-item-detail link">Email</p>
                <DuplicateIcon id="i#1" className="footer-icon"/>
            </div>

            {/*<div id="www.linkedin.com/in/liam-burks-47b2391a0" className="footer-item-container" onClick={copyToClipboard}>*/}
            {/*    <p id="p#2" className="lighter footer-item-detail link">LinkedIn</p>*/}
            {/*    <LinkIcon id="i#2" name="www.linkedin.com/in/liam-burks-47b2391a0" className="footer-icon"/>*/}
            {/*</div>*/}

            <div id="https://www.nytimes.com/games/wordle/index.html" className="footer-item-container" onClick={copyToClipboard}>
                <p id="p#3" className="lighter footer-item-detail link">Wordle</p>
                <GlobeIcon id="i#3" name="https://www.nytimes.com/games/wordle/index.html" className="footer-icon"/>
            </div>

            <ToastContainer
                toastStyle={
                    {
                        backgroundColor: "#000051",
                        color: "#f8fdff",
                        borderRadius: "12px"
                    }
                }
            />
        </div>
    )
}

export default Footer;
