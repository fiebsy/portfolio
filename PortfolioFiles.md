# Portfolio Website Plan

## Overview
A minimalist portfolio website for Derick Fiebiger, Design Engineer, featuring:
- Hero section with primary information
- Works section with expandable project cards
- Skills section highlighting technical expertise

## Color Scheme
- Main palette: Utilizing the existing fuego and gray color schemes
- Dark-themed design with minimal contrast elements

## File Structure

```
/
├── src/
│   ├── app/
│   │   ├── layout.tsx            # Root layout with font providers
│   │   ├── page.tsx              # Main page component
│   │   └── globals.css           # Global styles and font imports
│   ├── components/
│   │   ├── Hero.tsx              # Hero section with primary info
│   │   ├── WorkCard.tsx          # Individual work/project card
│   │   ├── WorkModal.tsx         # Modal for displaying project details
│   │   ├── Works.tsx             # Works section with project cards
│   │   ├── Skills.tsx            # Skills section component
│   │   ├── SkillBar.tsx          # Skill level indicator component
│   │   └── TechStack.tsx         # Tech stack component for skills section
│   └── hooks/
│       └── useModal.ts           # Custom hook for modal functionality
├── public/
│   └── images/
│       └── placeholder.jpg       # Placeholder for project thumbnails
├── tailwind.config.ts           # Tailwind configuration with custom colors and fonts
└── package.json                 # Project dependencies
```

## Key Implementation Details

### Fonts Integration
- DM Sans for primary text
- DM Mono for code/technical text

### Component Structure

#### Hero Section
- Name (Derick Fiebiger)
- Title (Design Engineer)
- Short bio
- Location (Minneapolis, MN)
- Availability badge ("Available remote or onsite")

#### Works Section
- Employer/project name with date range
- Grayscale thumbnails in a grid layout
- Click interaction to open modal with "Hello World" placeholder
- Companies featured: Whop, Pickaxe, Zus

#### Skills Section
- Skill bars with experience level indicators (e.g., 5y product design, 1.5y engineering)
- Tech stack display: React, Typescript, Firebase, Bigquery, Figma, Lottie
- Secondary skills: Data visualization, Animations, Product design, Front-end

### Responsive Design
- Mobile-first approach
- Simple grid layouts that adapt to screen sizes
- Minimal animations and transitions

### Next Steps
1. Set up Next.js with Tailwind CSS
2. Add font configurations to globals.css and tailwind.config.ts
3. Create basic component structure
4. Implement modal functionality
5. Style components according to the dark theme
6. Add responsive design considerations
7. Test on multiple devices
