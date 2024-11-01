import React from 'react'
import Header from '../../Components/Header'
import Footer from '../../Components/Footer'
import './landing_page.css'

function Landing_page() {
    return (
        <>
            <Header />
            <div className='intro_container'>
                <div className='intro_text'>
                    <h2>The easiest way to live stream and record</h2>
                    <p>weStream is a professional live streaming and recording studio in your browser. Record your content, or stream live to Facebook, YouTube, and other platforms and chat with you love ones.</p>
                    <button className='get_start_btn'>Get started-it's free!</button>
                </div>
            </div>
            <div className='sec__container' style={{ backgroundImage: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTkyMCIgaGVpZ2h0PSI3OTAiIHZpZXdCb3g9IjAgMCAxOTIwIDc5MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxwYXRoCiAgICAgICAgZD0iTTIxNjUgNDkwQzE3MDguMTEgMjgzLjA0OSAxMTA3IDEwMDQuNSA1MDAuMDQyIDcyMS42NDlDMTg4LjgyIDU3Ni42MTUgMTIzMS44NCAyNjMuNzg4IDEwMjUuOCAxMjQuMjg0QzgxOS43NjEgLTE1LjIyMDggNDE4LjY3MSAyMDkuNjczIDM4MCAyNDEuNUMyNDIuNSAzNTQuNjYzIDUwMC4wNDIgNDkwIDUwMC4wNDIgMjY3LjM2NUM1MDAuMDQyIDg4LjUxMzQgLTI4MS40OTEgLTExOC45NTUgLTU4NyA4OC41MTMzIgogICAgICAgIHN0cm9rZT0iI0U0RUNGRiIgc3Ryb2tlLXdpZHRoPSIzIiAvPgo8L3N2Zz4=" }}>
                <div className='sec__container_exa left_to_right'>
                    <div className='img_box'><img src="https://streamyard.com/next-static/_next/static/images/learn_more_image_guests_2x-779d420491bf19b54ee234f8c8776300.webp" alt="" /></div>
                    <div className='text_box'>
                        <h3>Go live or record podcasts with remote guests</h3>
                        <p>It's easy for guests to join from their browser or phone in a few clicks. No software downloads.</p>
                    </div>
                </div>
                <div className='sec__container_exa right_to_left'>
                    <div className='img_box'><img src="https://streamyard.com/next-static/_next/static/images/learn_more_image_onair_2x-8c822b310c6ab6ca43a1e300c71b7a10.webp" alt="" /></div>
                    <div className='text_box'>
                        <h3>Move your webinars to weStream On-Air</h3>
                        <p>weStream On-Air is a live webinar platform. We're redefining webinar stability, simplicity, and production quality. You can even embed it on your website for a fully white-label experience.</p>
                    </div>
                </div>
                <div className='sec__container_exa '>
                    <div className='img_box'><img src="https://streamyard.com/next-static/_next/static/images/learn_more_image_multistreaming_2x-83949da5c47b3bf09ba58732434fe77f.webp" alt="" /></div>
                    <div className='text_box'>
                        <h3>Multistream to all platforms at once</h3>
                        <p>Stream to Facebook, YouTube, Instagram, LinkedIn, X (Twitter), Twitch, and more. Make your audience feel special by featuring their comments on screen.</p>
                    </div>
                </div>
            </div>
            <div className='last_container'>
                <div className='ls_container_content'>
                    <h3>Get creating.</h3>
                    <button className='get_start_btn'>Get started-it's free!</button>
                    <p>Join millions of weStream users and start streaming or podcasting today.</p>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Landing_page
