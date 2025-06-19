import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

interface AuthFormContainerProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  logo?: React.ReactNode; // Optional logo or app name element
  footer?: React.ReactNode; // Optional footer for links like "Forgot password?"
  className?: string;
}

const AuthFormContainer: React.FC<AuthFormContainerProps> = ({
  title,
  description,
  children,
  logo,
  footer,
  className = '',
}) => {
  console.log("Rendering AuthFormContainer with title:", title);

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center bg-background text-foreground py-12 px-4 sm:px-6 lg:px-8 ${className}`}>
      <Card className=\"w-full max-w-md shadow-xl\">
        {logo && <div className=\"flex justify-center pt-6\">{logo}</div>}
        <CardHeader className=\"text-center\">\n          <CardTitle className=\"text-2xl font-bold tracking-tight text-gray-900\">{title}</CardTitle>
          {description && (\n            <CardDescription className=\"mt-2 text-sm text-gray-600\">\n              {description}\n            </CardDescription>\n          )}\n        </CardHeader>\n        <CardContent className=\"px-6 py-8 sm:px-10\">\n          {children}\n        </CardContent>\n        {footer && (\n          <div className=\"px-6 pb-6 text-center text-sm text-gray-600\">\n            {footer}\n          </div>\n        )}\n      </Card>\n    </div>\n  );\n};\n\nexport default AuthFormContainer;