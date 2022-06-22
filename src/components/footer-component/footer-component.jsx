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
            if ((url.indexOf("liamjames") >= 0) || url.indexOf("helper") >= 0) {
                toast("Link Copied to Clipboard",
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
            <span className="line-bigger" />

            <div id="liamjamesburks@gmail.com" className="footer-item-container" onClick={copyToClipboard}>
                <p id="p#1" className="lighter footer-item-detail link">My Email</p>
                <DuplicateIcon id="i#1" className="footer-icon"/>
            </div>

            <div id="https://www.nytimes.com/games/wordle/index.html" className="footer-item-container" onClick={copyToClipboard}>
                <p id="p#3" className="lighter footer-item-detail link">Wordle</p>
                <GlobeIcon id="i#3" name="https://www.nytimes.com/games/wordle/index.html" className="footer-icon"/>
            </div>

            <span className="line" />
            <div id="https://react-wordle-helper.netlify.app/" className="footer-item-container" onClick={copyToClipboard}>
                <p id="p#3" className="lighter footer-item-detail link">Share Us With Your Friends</p>
                <LinkIcon id="i#3" name="https://react-wordle-helper.netlify.app/" className="footer-icon"/>
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
