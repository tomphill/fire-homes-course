import ContinueWithGoogleButton from "@/components/continue-with-google-button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Login() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-3xl font-bold">Login</CardTitle>
      </CardHeader>
      <CardContent>
        <ContinueWithGoogleButton />
      </CardContent>
    </Card>
  );
}
