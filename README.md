# Social Support Registration Application

A modern, multilingual React application for government social support applications with AI-powered writing assistance. Built with React 19, Material-UI, and comprehensive form validation.

## 🌟 Features

- **Multilingual Support**: English and Arabic with RTL support
- **AI Writing Assistance**: OpenAI-powered help for situation descriptions
- **Form Validation**: Real-time validation with react-hook-form and yup
- **Responsive Design**: Mobile-first approach with Material-UI components
- **Data Persistence**: Automatic localStorage backup
- **Accessibility**: WCAG compliant with proper ARIA labels
- **Modern React**: Built with React 19 and latest best practices

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn package manager
- OpenAI API key (for AI writing assistance)

### Installation

1. **Extract the repository**
   ```bash
   extract zip
   cd social-support-registration
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Edit the `.env` file and add your OpenAI API key (see OpenAI Setup section below).

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

## 🔑 OpenAI API Setup

### 1. Create OpenAI Account
1. Visit [OpenAI Platform](https://platform.openai.com)
2. Sign up for an account or log in
3. Complete the verification process

### 2. Generate API Key
1. Go to [API Keys page](https://platform.openai.com/api-keys)
2. Click "Create new secret key"
3. Give it a descriptive name (e.g., "Social Support App")
4. Copy the generated key (save it securely - you won't see it again)

### 3. Set up Billing (Required)
1. Go to [Billing page](https://platform.openai.com/account/billing)
2. Add a payment method
3. Set up usage limits for safety

### 4. Configure Environment
Add your API key to the `.env` file:
```env
VITE_OPENAI_API_KEY=sk-your-actual-api-key-here
```

## ⚙️ Environment Configuration

### Required Environment Variables

Create a `.env` file in the root directory:

```env
# OpenAI API Configuration
VITE_OPENAI_API_KEY=sk-your-openai-api-key-here
```

### Environment File Security
- Never commit `.env` files to version control
- Use different `.env` files for different environments
- Keep API keys secure and rotate them regularly

## 🛠️ Technology Stack

### Core Technologies
- **React 19.1.1** - Latest React with modern hooks and features
- **TypeScript** - Type-safe development
- **Vite 7.1.10** - Fast build tool and development server
- **Material-UI (MUI) 7.3.4** - Comprehensive React component library

### Form Management
- **react-hook-form 7.54.2** - Performant form library
- **@hookform/resolvers 3.10.0** - Form validation resolvers
- **yup 1.6.1** - Schema validation library

### Internationalization
- **react-i18next 15.1.5** - React integration for i18next
- **i18next 24.1.0** - Internationalization framework
- **i18next-http-backend 3.0.3** - Backend plugin for loading translations

### RTL Support
- **@mui/system 7.3.4** - MUI system for theming
- **stylis-plugin-rtl 2.2.0** - RTL support for styled components

### AI Integration
- **OpenAI API** - GPT-powered writing assistance

### Development Tools
- **ESLint** - Code linting
- **@types/react** - TypeScript definitions
- **@vitejs/plugin-react** - Vite React plugin

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── PersonalInfo.tsx
│   ├── FamilyFinancialInfo.tsx
│   ├── SituationDescription.tsx
│   ├── LanguageSelector.tsx
│   └── ErrorBoundary.tsx
├── context/            # React context providers
│   └── ApplicationContext.tsx
├── hooks/              # Custom React hooks
│   └── useApplication.ts
├── schema/             # Yup schema
│   └── applicationFormSchema.ts
├── services/           # API Calls
│   └── registrationService.ts
├── theme/              # MUI theme configuration
│   └── RTLThemeProvider.tsx
├── types/              # TypeScript type definitions
│   └── applicationFormDataType.d.ts
├── utils/              # Utility functions
│   └── i18n.ts
├── App.tsx            # Main application component
└── main.tsx           # Application entry point

public/
└── locales/           # Translation files
    ├── en/translation.json
    └── ar/translation.json
```

## 🎨 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🌍 Supported Languages

- **English (en)** - Default language
- **Arabic (ar)** - العربية (with RTL support)

## 📱 Responsive Breakpoints

- **Mobile**: < 600px
- **Tablet**: 600px - 960px
- **Desktop**: > 960px

## 🔧 Customization

### Adding New Languages
1. Create translation file in `public/locales/[language-code]/translation.json`
2. Add language option to `LanguageSelector.tsx`
3. Update RTL detection in `RTLThemeProvider.tsx` if needed

### Modifying Form Fields
1. Update schema definitions in `src/schema/*.ts`
2. Update component JSX and translation files

### Styling Customization
- Modify MUI theme in `src/theme/RTLThemeProvider.tsx`
- Update component-specific styles using MUI's `sx` prop
- Add custom CSS in component files

## 🚦 Development Guidelines

### Code Style
- Use TypeScript for type safety
- Follow React hooks patterns
- Implement proper error boundaries
- Use semantic HTML elements

### Performance
- Lazy load components when possible
- Memoize expensive computations
- Optimize re-renders with useCallback/useMemo

### Accessibility
- Maintain ARIA labels
- Ensure keyboard navigation
- Test with screen readers
- Maintain color contrast ratios

## 🔍 Troubleshooting

### Common Issues

**OpenAI API Not Working**
- Verify API key is correct in `.env` file
- Check billing is set up on OpenAI platform
- Ensure you have sufficient credits

**Translation Not Loading**
- Check translation files exist in `public/locales/`
- Verify i18next configuration
- Clear browser cache

**Build Errors**
- Run `npm install` to ensure dependencies are installed
- Check TypeScript errors in the console
- Verify environment variables are set correctly

**RTL Issues**
- Check if language is properly detected
- Verify stylis-plugin-rtl is installed
- Test theme direction switching
