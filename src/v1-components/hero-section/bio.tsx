import React from 'react';

// Updated props for more granular control
interface BioProps {
  highlighting?: boolean; // Use lighter color for intro phrase? Defaults to false.
  length?: 'short' | 'medium' | 'long'; // Length of supporting sentence. Defaults to 'short'.
  textColor?: string; // Optional text color prop (Tailwind class)
  fontSize?: string; // Optional font size prop (Tailwind class)
}

// Define content snippets
const highlightedPhrase = 'I am a product designer who can engineer';
const mainCorePhrase = 'intuitive dashboards and real-time tools that make data useful.';
const plainPhrase =
  'I build clean, intuitive dashboards and real-time tools that make data useful.';

const supportContent = {
  short: '',
  medium: ' I focus on creating engaging user experiences.', // Note the leading space
  // Use JSX for the version with links
  long: (
    <React.Fragment>
      {' '}
      At{' '}
      <a
        href="https://www.whop.com"
        target="_blank"
        rel="noopener noreferrer"
        className=" underline"
      >
        Whop
      </a>
      , I created an interactive leaderboard displayed in ~90% of user sessions. Before that, I
      built financial and social insight dashboards for{' '}
      <a
        href="https://www.stride.zone"
        target="_blank"
        rel="noopener noreferrer"
        className="underline"
      >
        Stride
      </a>
      .
    </React.Fragment>
  ),
};

const Bios: React.FC<BioProps> = ({
  highlighting = false, // Default to no highlight
  length = 'short', // Default to short
  textColor = 'text-gray-11', // Default text color
  fontSize = 'text-xl', // Default font size
}) => {
  const paragraphClasses = `${textColor} font-medium ${fontSize}`;
  const highlightClass = `text-gray-5`; // Lighter color class

  // Select the appropriate supporting content based on length
  const selectedSupport = supportContent[length];

  // Determine the main content based on highlighting
  let mainContent;
  if (highlighting) {
    mainContent = (
      <React.Fragment>
        <span className={highlightClass}>{highlightedPhrase}</span> {mainCorePhrase}
      </React.Fragment>
    );
  } else {
    mainContent = plainPhrase;
  }

  return (
    <div className="max-w-md">
      <p className={paragraphClasses}>
        {/* Combine main content and supporting content */}
        {mainContent}
        {selectedSupport}
      </p>
    </div>
  );
};

export default Bios;
