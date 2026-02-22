"use client"

import { Mail, MapPin, User, Shield, Copyright, AlertCircle } from "lucide-react"

export default function ImprintWindow() {
    return (
        <div className="max-w-2xl mx-auto py-6 px-4">

            {/* Header */}
            <div className="mb-8">
                <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Legal Notice</p>
                <h1 className="text-2xl font-bold text-gray-800">Imprint</h1>
                <p className="text-xs text-gray-400 mt-1">Information in accordance with § 5 TMG (German Telemedia Act)</p>
                <div className="mt-3 h-px bg-gray-200" />
            </div>

            {/* Section — Identity */}
            <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                    <User size={14} className="text-gray-400" />
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Responsible Person</p>
                </div>
                <div className="flex flex-col gap-3 pl-2">
                    <div>
                        <p className="text-xs text-gray-400 uppercase tracking-widest mb-0.5">Full Name</p>
                        <p className="text-gray-800 text-sm font-medium">Lucas Mouette</p>
                    </div>
                    <div>
                        <p className="text-xs text-gray-400 uppercase tracking-widest mb-0.5">Status</p>
                        <p className="text-gray-800 text-sm font-medium">Private individual / B.Sc Student</p>
                    </div>
                </div>
            </div>

            <div className="h-px bg-gray-100 mb-8" />

            {/* Section — Address */}
            <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                    <MapPin size={14} className="text-gray-400" />
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Address</p>
                </div>
                <div className="pl-2">
                    <p className="text-gray-800 text-sm font-medium">Laimer Platz 2</p>
                    <p className="text-gray-800 text-sm font-medium">80689 Munich</p>
                    <p className="text-gray-800 text-sm font-medium">Germany</p>
                </div>
            </div>

            <div className="h-px bg-gray-100 mb-8" />

            {/* Section — Contact */}
            <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                    <Mail size={14} className="text-gray-400" />
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Contact</p>
                </div>
                <div className="flex flex-col gap-3 pl-2">
                    <div>
                        <p className="text-xs text-gray-400 uppercase tracking-widest mb-0.5">Email</p>
                        <a
                            href="mailto:mouettelucas@gmail.com"
                            className="text-indigo-500 text-sm font-medium hover:text-indigo-600 transition-colors"
                        >
                            mouettelucas@gmail.com
                        </a>
                    </div>
                    <div>
                        <p className="text-xs text-gray-400 uppercase tracking-widest mb-0.5">Phone</p>
                        <a
                            href="tel:+4915770628982"
                            className="text-indigo-500 text-sm font-medium hover:text-indigo-600 transition-colors"
                        >
                            +49 15 77 06 28 982
                        </a>
                    </div>
                </div>
            </div>

            <div className="h-px bg-gray-100 mb-8" />

            {/* Section — Privacy / GDPR */}
            <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                    <Shield size={14} className="text-gray-400" />
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Privacy Policy (GDPR)</p>
                </div>
                <div className="flex flex-col gap-4 pl-2">
                    <div>
                        <p className="text-xs text-gray-400 uppercase tracking-widest mb-0.5">Data Collection</p>
                        <p className="text-gray-700 text-sm">
                            This website does not collect, store, or process any personal data. No cookies are used and no tracking or analytics tools are implemented.
                        </p>
                    </div>
                    <div>
                        <p className="text-xs text-gray-400 uppercase tracking-widest mb-0.5">Hosting</p>
                        <p className="text-gray-700 text-sm">
                            This website is hosted on Vercel Inc., 340 Pine Street, San Francisco, CA 94104, USA. Vercel may process server logs including IP addresses for security and operational purposes. See Vercel&apos;s privacy policy at vercel.com/legal/privacy-policy.
                        </p>
                    </div>
                    <div>
                        <p className="text-xs text-gray-400 uppercase tracking-widest mb-0.5">Your Rights (GDPR Art. 15–22)</p>
                        <p className="text-gray-700 text-sm">
                            You have the right to access, rectification, erasure, restriction of processing, data portability, and to object to processing of your personal data. To exercise these rights, contact: mouettelucas@gmail.com
                        </p>
                    </div>
                    <div>
                        <p className="text-xs text-gray-400 uppercase tracking-widest mb-0.5">Supervisory Authority</p>
                        <p className="text-gray-700 text-sm">
                            You have the right to lodge a complaint with the Bavarian State Office for Data Protection Supervision (BayLDA): www.lda.bayern.de
                        </p>
                    </div>
                </div>
            </div>

            <div className="h-px bg-gray-100 mb-8" />

            {/* Section — Liability */}
            <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                    <AlertCircle size={14} className="text-gray-400" />
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Liability Disclaimer</p>
                </div>
                <div className="flex flex-col gap-4 pl-2">
                    <div>
                        <p className="text-xs text-gray-400 uppercase tracking-widest mb-0.5">Liability for Content</p>
                        <p className="text-gray-700 text-sm">
                            The contents of this website have been created with the utmost care. However, I cannot guarantee the accuracy, completeness, or timeliness of the content. As a private individual, I am responsible for my own content under § 7 TMG. I am not obligated to monitor transmitted or stored third-party information.
                        </p>
                    </div>
                    <div>
                        <p className="text-xs text-gray-400 uppercase tracking-widest mb-0.5">Liability for Links</p>
                        <p className="text-gray-700 text-sm">
                            This website contains links to external websites. I have no influence over the content of those sites and therefore cannot accept any liability. The respective provider or operator of the linked pages is always responsible for their content.
                        </p>
                    </div>
                </div>
            </div>

            <div className="h-px bg-gray-100 mb-8" />

            {/* Section — Copyright */}
            <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                    <Copyright size={14} className="text-gray-400" />
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Copyright</p>
                </div>
                <div className="pl-2">
                    <p className="text-gray-700 text-sm">
                        The content and works on this website are subject to German copyright law. Duplication, processing, distribution, or any form of commercialisation of such material beyond the scope of copyright law requires the written consent of the author. Downloads and copies of this site are only permitted for private, non-commercial use.
                    </p>
                    <p className="text-gray-500 text-xs mt-3">© {new Date().getFullYear()} Lucas Mouette. All rights reserved.</p>
                </div>
            </div>

            {/* Footer */}
            <div className="h-px bg-gray-100 mb-6" />
            <p className="text-xs text-gray-300 italic">
                Last updated: {new Date().toLocaleDateString("en-GB", { year: "numeric", month: "long", day: "numeric" })}
            </p>
        </div>
    )
}