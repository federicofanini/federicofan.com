# CV Components

This folder contains modular components for rendering Federico Fanini's CV page.

## Components

- **`cv-header.tsx`** - Professional header with name, title, and contact information
- **`cv-profile.tsx`** - Professional profile summary
- **`cv-skills.tsx`** - Core technical skills organized by category
- **`cv-experience.tsx`** - Work experience with detailed highlights
- **`cv-projects.tsx`** - Technical projects showcase
- **`cv-education.tsx`** - Educational background
- **`cv-strengths.tsx`** - Key professional strengths
- **`cv-languages.tsx`** - Language proficiency levels
- **`cv-interests.tsx`** - Professional interests and focus areas
- **`cv-download-button.tsx`** - Floating action buttons for PDF export

## PDF Export

The CV page supports two methods for PDF export:

### 1. Direct Download (Recommended)

- Uses `jspdf` and `html2canvas` to generate a PDF from the rendered page
- Click the "Download PDF" button (blue button, bottom-right)
- Automatically generates `Federico_Fanini_CV.pdf`
- High-quality output with proper pagination

### 2. Print to PDF

- Uses native browser print functionality
- Click the "Print" button (outlined button, bottom-right)
- Opens browser print dialog
- Select "Save as PDF" as the printer
- Uses optimized print CSS for professional formatting

## Customization

To update CV content, edit the respective component files. Each component is self-contained and uses:

- `BlurFade` for smooth animations
- Consistent typography and spacing
- Tabler icons for visual elements
- Shadcn UI components (Badge, Button, etc.)

## Styling

Print-specific styles are defined in `/src/app/cv/print.css` and include:

- Optimized page breaks
- Professional typography
- Proper contrast for printing
- Hidden UI elements (buttons, nav, etc.)

## Dependencies

- `jspdf` - PDF generation
- `html2canvas` - HTML to canvas conversion
- `@tabler/icons-react` - Icon library
- Shadcn UI components
