import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import CookieSettings from '@/components/common/CookieSettings';
import { Cookie, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const CookiePolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/10 to-accent/10 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Button variant="ghost" asChild className="mb-6">
              <Link to="/" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Home
              </Link>
            </Button>
            
            <div className="flex items-center gap-3 mb-6">
              <Cookie className="h-8 w-8 text-primary" />
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">Cookie Policy</h1>
            </div>
            
            <p className="text-xl text-muted-foreground">
              Learn about how we use cookies and manage your preferences
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Policy Content */}
          <Card>
            <CardContent className="p-4 sm:p-6 lg:p-8 prose prose-lg max-w-none">
              <h2>What are cookies?</h2>
              <p>
                Cookies are small text files that are placed on your computer or mobile device when you visit a website. 
                They are widely used to make websites work more efficiently and to provide information to website owners.
              </p>

              <h2>How we use cookies</h2>
              <p>
                We use cookies to enhance your browsing experience, analyze site traffic, and personalize content. 
                Our cookies fall into the following categories:
              </p>

              <h3>Necessary Cookies</h3>
              <p>
                These cookies are essential for the website to function properly. They enable basic functions like 
                page navigation, access to secure areas, and remember your cookie preferences. The website cannot 
                function properly without these cookies.
              </p>

              <h3>Analytics Cookies</h3>
              <p>
                These cookies help us understand how visitors interact with our website by collecting and reporting 
                information anonymously. This includes information about the number of visitors, where visitors come 
                from, and the pages they visit.
              </p>

              <h3>Marketing Cookies</h3>
              <p>
                These cookies are used to deliver advertisements that are relevant to you and your interests. They may 
                be used to limit the number of times you see an advertisement and help measure the effectiveness of 
                advertising campaigns.
              </p>

              <h3>Functional Cookies</h3>
              <p>
                These cookies enable enhanced functionality and personalization, such as remembering your preferences, 
                language settings, and other customizations you have made to the website.
              </p>

              <h2>Third-party cookies</h2>
              <p>
                Some cookies on our website are set by third-party services that appear on our pages. These may include 
                social media plugins, analytics services, and advertising networks. We do not control these cookies, 
                and you should check the relevant third party's website for more information.
              </p>

              <h2>Managing your cookies</h2>
              <p>
                You can control and manage cookies in various ways. Please note that removing or blocking cookies may 
                impact your user experience and parts of our website may no longer be fully accessible.
              </p>

              <h2>Browser settings</h2>
              <p>
                Most web browsers allow you to control cookies through their settings. You can set your browser to 
                refuse cookies, or to alert you when cookies are being sent. However, if you select this setting 
                you may be unable to access certain parts of our website.
              </p>

              <h2>Contact us</h2>
              <p>
                If you have any questions about our use of cookies, please contact us at privacy@example.com.
              </p>

              <p className="text-sm text-muted-foreground">
                Last updated: {new Date().toLocaleDateString()}
              </p>
            </CardContent>
          </Card>

          {/* Cookie Settings Component */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Manage Your Cookie Preferences</h2>
            <CookieSettings />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookiePolicy;