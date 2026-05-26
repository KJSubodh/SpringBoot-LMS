import { Link } from 'react-router-dom';
import {
    BookOpen,
    Heart,
    Mail,
    Phone,
    MapPin,
    Clock,
    ChevronUp
} from 'lucide-react';
import { useState, useEffect } from 'react';

// Font Awesome Imports for Social Media
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faFacebookF,
    faXTwitter,
    faInstagram,
    faLinkedinIn,
    faGithub
} from '@fortawesome/free-brands-svg-icons';

export default function Footer() {
    const [showScrollTop, setShowScrollTop] = useState(false);

    // Handle Scroll to Top Visibility
    useEffect(() => {
        const handleScroll = () => {
            setShowScrollTop(window.scrollY > 300);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const currentYear = new Date().getFullYear();

    // Social Media Configuration
    const socialLinks = [
        { icon: faFacebookF, url: "#", label: "Facebook", hoverColor: "hover:bg-blue-600" },
        { icon: faXTwitter, url: "#", label: "X", hoverColor: "hover:bg-black" },
        { icon: faInstagram, url: "#", label: "Instagram", hoverColor: "hover:bg-pink-600" },
        { icon: faLinkedinIn, url: "#", label: "LinkedIn", hoverColor: "hover:bg-blue-700" },
        { icon: faGithub, url: "#", label: "Github", hoverColor: "hover:bg-slate-700" },
    ];

    return (
        <>
            {/* Scroll to Top Button */}
            {showScrollTop && (
                <button
                    onClick={scrollToTop}
                    className="fixed bottom-6 right-6 z-40 p-3 bg-indigo-600 rounded-full shadow-lg hover:bg-indigo-500 transition-all duration-300 hover:scale-110 shadow-indigo-500/20"
                    aria-label="Scroll to top"
                >
                    <ChevronUp className="h-5 w-5 text-white" />
                </button>
            )}

            <footer className="bg-slate-900 border-t border-slate-800 mt-auto">
                <div className="container mx-auto px-6 py-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

                        {/* Column 1 - Brand Info */}
                        <div className="space-y-4 text-center lg:text-left flex flex-col items-center lg:items-start">
                            <Link to="/" className="flex items-center justify-center lg:justify-start space-x-2 group w-full lg:w-auto">
                                <div className="bg-indigo-600 p-2 rounded-lg group-hover:bg-indigo-500 transition-colors">
                                    <BookOpen className="h-6 w-6 text-white" />
                                </div>
                                <span className="font-bold text-2xl text-white">
                                    LMS <span className="text-indigo-400">Pro</span>
                                </span>
                            </Link>
                            <p className="text-slate-400 text-sm leading-relaxed max-w-xs lg:max-w-none">
                                A professional library management solution designed to streamline your daily operations with ease and efficiency.
                            </p>
                        </div>

                        {/* Column 2 - Quick Navigation */}
                        <div className="text-center lg:text-left">
                            <h3 className="text-white font-semibold text-lg mb-6 border-b border-slate-800 pb-2 inline-block lg:block">
                                Quick Links
                            </h3>
                            <ul className="space-y-3 flex flex-col items-center lg:items-start">
                                {['Dashboard', 'Books', 'Users', 'Authors', 'Categories'].map((item) => (
                                    <li key={item}>
                                        <Link
                                            to={item === 'Dashboard' ? '/' : `/${item.toLowerCase()}`}
                                            className="text-slate-400 hover:text-indigo-400 text-sm transition-colors flex items-center"
                                        >
                                            {item}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Column 3 - Contact Details */}
                        <div className="text-center lg:text-left">
                            <h3 className="text-white font-semibold text-lg mb-6 border-b border-slate-800 pb-2 inline-block lg:block">
                                Contact Us
                            </h3>
                            <ul className="space-y-4 flex flex-col items-center lg:items-start">
                                {/* Address */}
                                <li className="flex flex-col md:flex-row items-center gap-3 text-slate-400 text-sm max-w-[250px] lg:max-w-none">
                                    <MapPin className="h-5 w-5 text-indigo-400 shrink-0" />
                                    <span>123 Library Street, Knowledge City, 400001</span>
                                </li>

                                {/* Email */}
                                <li className="flex items-center gap-3 text-slate-400 text-sm">
                                    <Mail className="h-5 w-5 text-indigo-400 shrink-0" />
                                    <a href="mailto:support@lmspro.com" className="hover:text-indigo-400 transition-colors">
                                        support@lmspro.com
                                    </a>
                                </li>

                                {/* Phone */}
                                <li className="flex items-center gap-3 text-slate-400 text-sm">
                                    <Phone className="h-5 w-5 text-indigo-400 shrink-0" />
                                    <a href="tel:+1234567890" className="hover:text-indigo-400 transition-colors">
                                        +1 (234) 567-890
                                    </a>
                                </li>
                            </ul>
                        </div>

                        {/* Column 4 - Social Media */}
                        <div className="text-center lg:text-left flex flex-col items-center lg:items-start">
                            <h3 className="text-white font-semibold text-lg mb-6 border-b border-slate-800 pb-2 inline-block lg:block">
                                Connect With Us
                            </h3>
                            <p className="text-slate-400 text-sm mb-6 max-w-xs lg:max-w-none">
                                Follow us on social media for the latest updates and news.
                            </p>
                            <div className="flex flex-wrap justify-center lg:justify-start gap-7">
                                {socialLinks.map((social, index) => (
                                    <a
                                        key={index}
                                        href={social.url}
                                        className={`group flex items-center justify-center w-10 h-10 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition-all duration-300 ${social.hoverColor}`}
                                        aria-label={social.label}
                                    >
                                        <FontAwesomeIcon icon={social.icon} className="h-5 w-5" />
                                    </a>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>

                {/* Bottom Copyright Bar */}
                <div className="border-t border-slate-800 py-6 bg-slate-950/50">
                    <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-slate-500 text-xs">
                            &copy; {currentYear} LMS Pro. Built for modern libraries.
                        </p>
                        <div className="flex items-center gap-6">
                            <Link to="/privacy" className="text-slate-500 hover:text-indigo-400 text-xs transition-colors">Privacy Policy</Link>
                            <Link to="/terms" className="text-slate-500 hover:text-indigo-400 text-xs transition-colors">Terms of Service</Link>
                            <div className="flex items-center gap-2 text-slate-500">
                                <Heart className="h-3 w-3 text-red-500 fill-red-500 animate-pulse" />
                                <span className="text-xs">Handcrafted in India</span>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}