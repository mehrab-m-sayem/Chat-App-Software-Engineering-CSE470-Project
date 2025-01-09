import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
    return (
        <div className="bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-white min-h-screen">
            <div className="container mx-auto px-4">
                <header className="text-center py-16">
                    <h1 className="text-4xl font-bold mb-4">Welcome to BRACU CHATAPP</h1>
                </header>
                <section id="features" className="mb-16">
                    <h2 className="text-3xl font-bold mb-6">Features</h2>
                    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                        <div className="card bg-base-100 shadow-xl">
                            <div className="card-body text-primary dark:text-accent">
                                <h3 className="card-title">Real-Time Messaging</h3>
                                <p>Chat instantly across the globe.</p>
                            </div>
                        </div>
                        <div className="card bg-base-100 shadow-xl">
                            <div className="card-body text-primary dark:text-accent">
                                <h3 className="card-title">Media Sharing</h3>
                                <p>Share images and files easily.</p>
                            </div>
                        </div>
                        <div className="card bg-base-100 shadow-xl">
                            <div className="card-body text-primary dark:text-accent">
                                <h3 className="card-title">Integrated Gaming</h3>
                                <p>Play games directly in the chat app.</p>
                            </div>
                        </div>
                        <div className="card bg-base-100 shadow-xl">
                            <div className="card-body text-primary dark:text-accent">
                                <h3 className="card-title">Customizable Profiles</h3>
                                <p>Customize your profile to express yourself.</p>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="text-center py-16">
                    <h2 className="text-3xl font-bold mb-6">Get Started</h2>
                    <Link to="/login" className="btn btn-primary mr-4">Login</Link>
                    <Link to="/signup" className="btn btn-secondary">Register</Link>
                </section>
                <footer className="text-center py-8">
                    <p>© 2025 BRACU CHATAPP. All rights reserved.</p>
                </footer>
            </div>
        </div>
    );
};

export default LandingPage;
