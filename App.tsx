
import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import Loader from './components/Loader';
import TopicOverview from './components/TopicOverview';
import LearningPathItem from './components/LearningPathItem';
import { getLearningNexus } from './services/geminiService';
import { TopicDetails } from './types';

const App: React.FC = () => {
    const [topicDetails, setTopicDetails] = useState<TopicDetails | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [isDarkMode, setIsDarkMode] = useState<boolean>(true);

    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDarkMode]);

    const toggleDarkMode = () => {
        setIsDarkMode(prev => !prev);
    };

    const handleSearch = useCallback(async (query: string) => {
        setIsLoading(true);
        setError(null);
        setTopicDetails(null);
        try {
            const data = await getLearningNexus(query);
            setTopicDetails(data);
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("An unknown error occurred.");
            }
        } finally {
            setIsLoading(false);
        }
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100 transition-colors duration-300">
            <main className="container mx-auto max-w-4xl px-4">
                <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
                <SearchBar onSearch={handleSearch} isLoading={isLoading} />
                
                <div className="mt-4">
                    {isLoading && <Loader />}
                    {error && (
                        <div className="text-center p-8 bg-red-100 dark:bg-red-900/50 border border-red-400 dark:border-red-600 rounded-lg">
                            <h3 className="text-xl font-semibold text-red-700 dark:text-red-300">An Error Occurred</h3>
                            <p className="text-red-600 dark:text-red-400 mt-2">{error}</p>
                        </div>
                    )}
                    {topicDetails && (
                        <div className="space-y-12">
                            <TopicOverview details={topicDetails} />
                            <div>
                                <h3 className="text-2xl font-bold text-center mb-8 text-gray-800 dark:text-gray-200">
                                    Your Personalized Learning Path
                                </h3>
                                <div className="flex flex-col">
                                    {topicDetails.learningPath.map((resource, index) => (
                                        <LearningPathItem key={index} resource={resource} index={index} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                     {!isLoading && !error && !topicDetails && (
                        <div className="text-center py-16 px-6">
                            <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200">Unlock Your Learning Potential</h2>
                            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                                Enter any topic above to generate a curated, step-by-step learning path. From programming languages to historical events, Learning Nexus is your personal guide to knowledge.
                            </p>
                        </div>
                    )}
                </div>
            </main>
            <footer className="text-center py-6 mt-12 text-sm text-gray-500 dark:text-gray-400">
                <p>&copy; {new Date().getFullYear()} Learning Nexus. Powered by Generative AI.</p>
            </footer>
        </div>
    );
};

export default App;