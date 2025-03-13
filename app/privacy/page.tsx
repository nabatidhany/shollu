import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PrivacyPolicy() {
  return (
    <div className="max-w-2xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Privacy Policy</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            This Privacy Policy explains how we collect, use, and protect your personal data when you use our event application.
          </p>
          
          <h2 className="text-xl font-semibold">1. Information We Collect</h2>
          <p>We collect the following data during event registration:</p>
          <ul className="list-disc pl-5">
            <li>Full Name</li>
            <li>WhatsApp Number</li>
            <li>Gender</li>
            <li>Date of Birth</li>
            <li>Masjid Selection</li>
          </ul>
          
          <h2 className="text-xl font-semibold">2. How We Use Your Information</h2>
          <p>Your data is used solely for event management, including:</p>
          <ul className="list-disc pl-5">
            <li>Attendance tracking</li>
            <li>Generating participant lists</li>
            <li>Event notifications</li>
          </ul>
          
          <h2 className="text-xl font-semibold">3. Data Protection</h2>
          <p>We ensure that your data is stored securely and will not be shared with third parties without your consent.</p>
          
          <h2 className="text-xl font-semibold">4. Your Rights</h2>
          <p>You have the right to request access, correction, or deletion of your personal data by contacting the event organizer.</p>
          
          <h2 className="text-xl font-semibold">5. Changes to This Policy</h2>
          <p>We may update this Privacy Policy as needed. Any changes will be notified via the application.</p>
        </CardContent>
      </Card>
    </div>
  );
}
